# CIS 365 Course Site — instructions for Claude Code

Static, no-build course site (HTML/CSS/Vue 3 via CDN). See `README.md` for the full
file layout and design rationale — this file is conventions and gotchas only.

## Conventions

- No build step. Edit HTML/CSS/JS directly; lesson content is Markdown in `content/lessons/`.
- New interactive widget types go in `js/components/` and must be registered in
  `lesson.html`'s `COMPONENT_MAP`.
- Lesson manifest is `content/lessons/manifest.json`. IDs are **not** sequential — use
  `findIndex`-based position for lesson numbering, never `parseInt(id) + 1`.
- After adding/editing lessons, regenerate the search index:
  `node scripts/build-search-index.js`.

## Gotchas (hard-won, don't relearn these)

- **Quiz JSON format**: must be `{ "lessonId": "XX", "questions": [...] }`. A bare
  array causes a silent Vue render failure that empties the lesson content div.
- **`js/` permissions**: do not run `sudo chmod` on files in this repo from Claude
  Code — it has previously broken the process's filesystem access (macOS TCC) and
  required a session restart.
- **Google OAuth via Supabase** — two failure modes seen in production, check these
  before assuming a code regression:
  1. `Error 400: redirect_uri_mismatch` → Google Cloud Console's OAuth client is
     missing Supabase's callback URL (`https://tbiiixiaoxtdbqdsrfuo.supabase.co/auth/v1/callback`)
     in Authorized redirect URIs.
  2. Redirects to `localhost:3000` after sign-in → Supabase's Site URL defaults to
     `localhost:3000`; `js/data-store.js`'s `signInWithGoogle` passes
     `redirectTo: window.location.href` to override it — don't remove that.
- **Quiz score sync display bug** (`js/data-store.js` `pullRemote()`): a better score
  synced down from Supabase updates `bestScore`/`score`, but `getBestQuizScore()` (used
  by both the lesson tab-rail chip and the home page lesson-card badge) reads from the
  local `attempts[]` array instead, so the synced win doesn't show until the user
  retakes the quiz on that device. Known, not yet fixed.
- **`manifest.json` has two lesson-id lists** that aren't cross-validated: the flat
  `lessons` array (drives prev/next + `lessonNumber()`) and each module's `lessons` id
  array (drives the tab-rail + home page cards). An id present in one but not the other
  is either orphaned or renders with a blank title and no error.
- **`scripts/build-search-index.js`** aborts the entire index build if any single
  manifest entry's `file` is missing/renamed — no per-lesson try/catch, so one bad
  entry breaks search for all 14 lessons, not just the offending one.
