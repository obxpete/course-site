/**
 * CourseStore — small persistence layer for lesson progress & quiz scores.
 *
 * Always writes to localStorage immediately (so the UI never waits on a
 * network round trip). If js/api-config.js has Supabase credentials filled
 * in, it also signs the visitor in anonymously and mirrors writes to
 * Supabase, so progress can follow a student across devices/browsers once
 * they're signed in for real (see README.md for upgrading anonymous
 * sessions to email accounts).
 */
(function () {
  const LOCAL_KEY = "cis365.progress.v1";

  function readLocal() {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_KEY)) || { lessons: {}, quizzes: {} };
    } catch {
      return { lessons: {}, quizzes: {} };
    }
  }

  function writeLocal(data) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  }

  let state = readLocal();
  let supabase = null;
  let remoteReady = false;

  async function initRemote() {
    const cfg = window.COURSE_API_CONFIG || {};
    if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) return;
    if (!window.supabase) return; // supabase-js CDN script not loaded

    supabase = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session && session.user && !session.user.is_anonymous) {
        // A real (Google) sign-in just replaced the anonymous session. Push
        // whatever progress lived under the old anonymous user up under the
        // new identity first, then pull down anything already saved there
        // from another device, so neither side loses data.
        pushAllLocal().then(pullRemote);
      }
    });

    // Ensure we have a stable (anonymous) identity for RLS-scoped rows.
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      const { error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.warn("CourseStore: anonymous sign-in failed, staying local-only.", error.message);
        return;
      }
    }
    remoteReady = true;
    await pullRemote();
  }

  async function pullRemote() {
    if (!remoteReady) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [{ data: lessonRows }, { data: quizRows }] = await Promise.all([
      supabase.from("lesson_progress").select("lesson_id, completed_at").eq("user_id", user.id),
      supabase.from("quiz_results").select("lesson_id, score, total, updated_at").eq("user_id", user.id)
    ]);

    (lessonRows || []).forEach((row) => {
      state.lessons[row.lesson_id] = { completedAt: row.completed_at };
    });
    (quizRows || []).forEach((row) => {
      // Merge remote best score into local state without clobbering attempt history
      const local = state.quizzes[row.lesson_id];
      if (!local || row.score >= (local.bestScore ?? local.score ?? 0)) {
        state.quizzes[row.lesson_id] = {
          score: row.score,
          total: row.total,
          updatedAt: row.updated_at,
          bestScore: row.score,
          attempts: local?.attempts || [{ score: row.score, total: row.total, takenAt: row.updated_at }]
        };
      }
    });
    writeLocal(state);
  }

  async function pushLessonComplete(lessonId) {
    if (!remoteReady) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("lesson_progress").upsert({
      user_id: user.id,
      lesson_id: lessonId,
      completed_at: new Date().toISOString()
    });
  }

  async function pushQuizResult(lessonId, score, total) {
    if (!remoteReady) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("quiz_results").upsert({
      user_id: user.id,
      lesson_id: lessonId,
      score,
      total,
      updated_at: new Date().toISOString()
    });
  }

  // Re-pushes every locally-held lesson/quiz record under whoever is
  // currently signed in — used right after a Google sign-in so progress
  // earned anonymously isn't stranded under the old anonymous user id.
  async function pushAllLocal() {
    if (!remoteReady) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const lessonWrites = Object.entries(state.lessons).map(([lessonId, entry]) =>
      supabase.from("lesson_progress").upsert({
        user_id: user.id,
        lesson_id: lessonId,
        completed_at: entry.completedAt
      })
    );
    const quizWrites = Object.entries(state.quizzes).map(([lessonId, entry]) =>
      supabase.from("quiz_results").upsert({
        user_id: user.id,
        lesson_id: lessonId,
        score: entry.bestScore ?? entry.score,
        total: entry.total,
        updated_at: entry.updatedAt
      })
    );
    await Promise.all([...lessonWrites, ...quizWrites]);
  }

  window.CourseStore = {
    ready: initRemote(), // a promise callers may await if they want remote-hydrated state

    async getUser() {
      if (!supabase) return null;
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },

    async signInWithGoogle() {
      if (!supabase) return;
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.href }
      });
    },

    async signOut() {
      if (!supabase) return;
      await supabase.auth.signOut();
    },

    onAuthChange(callback) {
      if (!supabase) return { data: { subscription: { unsubscribe() {} } } };
      return supabase.auth.onAuthStateChange(callback);
    },

    isComplete(lessonId) {
      return Boolean(state.lessons[lessonId]);
    },

    markComplete(lessonId) {
      state.lessons[lessonId] = { completedAt: new Date().toISOString() };
      writeLocal(state);
      pushLessonComplete(lessonId);
    },

    getQuizResult(lessonId) {
      return state.quizzes[lessonId] || null;
    },

    getQuizHistory(lessonId) {
      return state.quizzes[lessonId]?.attempts || [];
    },

    getBestQuizScore(lessonId) {
      const entry = state.quizzes[lessonId];
      if (!entry) return null;
      if (entry.attempts && entry.attempts.length > 0) {
        const best = entry.attempts.reduce((b, a) => a.score > b.score ? a : b, entry.attempts[0]);
        return { score: best.score, total: best.total };
      }
      return { score: entry.score, total: entry.total };
    },

    saveQuizResult(lessonId, score, total) {
      const prev = state.quizzes[lessonId];
      const newAttempt = { score, total, takenAt: new Date().toISOString() };
      const attempts = prev?.attempts ? [...prev.attempts, newAttempt] : [newAttempt];
      const bestScore = attempts.reduce((b, a) => Math.max(b, a.score), 0);
      state.quizzes[lessonId] = { score, total, updatedAt: newAttempt.takenAt, attempts, bestScore };
      writeLocal(state);
      pushQuizResult(lessonId, bestScore, total); // always push best to remote
    },

    completedCount(lessonIds) {
      return lessonIds.filter((id) => this.isComplete(id)).length;
    },

    reset() {
      state = { lessons: {}, quizzes: {} };
      writeLocal(state);
    }
  };
})();
