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
      state.quizzes[row.lesson_id] = { score: row.score, total: row.total, updatedAt: row.updated_at };
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

  window.CourseStore = {
    ready: initRemote(), // a promise callers may await if they want remote-hydrated state

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

    saveQuizResult(lessonId, score, total) {
      state.quizzes[lessonId] = { score, total, updatedAt: new Date().toISOString() };
      writeLocal(state);
      pushQuizResult(lessonId, score, total);
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
