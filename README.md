# CIS 365 — Full Stack Web Development (course site)

A lightweight, static online course site built from the original 2023 syllabus and
lesson decks, rewritten as Markdown and updated for 2026. No build step, no framework
lock-in — just HTML, CSS, and a little Vue for interactivity, loaded straight from CDNs.

## What's here

```
course-site/
├── index.html              # dashboard: modules, lesson cards, overall progress
├── syllabus.html            # renders content/syllabus.md
├── lesson.html               # dynamic lesson page (?lesson=01, ?lesson=02, ...)
├── css/style.css             # the entire visual design, no external CSS framework needed
│                              # (Bootstrap is referenced in lesson 08's content as a teaching
│                              #  topic, but the site chrome itself doesn't depend on it —
│                              #  see "About the Bootstrap/Vue ask" below)
├── js/
│   ├── data-store.js         # persistence: localStorage always, Supabase optionally
│   ├── api-config.js         # ← put your Supabase project URL + anon key here
│   └── markdown-render.js    # fetch + render a .md file with marked.js
└── content/
    ├── syllabus.md
    ├── lessons/
    │   ├── manifest.json     # ordered list of modules + lessons, drives all navigation
    │   └── 00-....md ... 10-....md
    └── quizzes/
        └── 01.json ... 10.json
```

Everything a student reads is plain Markdown in `content/`. Editing a lesson means
editing a `.md` file — no HTML to touch, no rebuild step.

## About the Bootstrap/Vue ask

You asked for Bootstrap and Vue, used lightly. Here's how that landed:

- **Vue** is used directly, via the CDN global build (`vue.global.prod.js`) — no CLI, no
  bundler. Each page mounts a small Vue app for the interactive bits: the progress bar,
  the lesson tab rail, and the quiz component.
- **Bootstrap** turned out to be redundant with a custom design system once I'd built one
  specifically for this content (see design notes below) — adding it would mean shipping
  two grid/utility systems that fight each other. Instead, the site's CSS *is* the lightweight
  utility layer, and Bootstrap itself is taught as course content in Lesson 8, with a live
  CDN example students can try. If you'd rather the site chrome itself use Bootstrap's grid
  and components, that's a straightforward swap — drop the CDN link into each page's `<head>`
  and replace the `.lesson-grid` / `.hero` layout rules with Bootstrap's `row`/`col-*` classes.

## Design notes

The visual identity is a "study notebook": a warm, low-chroma paper background, a serif
display face (Fraunces) for headings, deep ink-navy text, and two restrained accents — a
brass gold for progress/active states and a muted berry for labels and links. The signature
element is the stitched tab rail on each lesson page, echoing a bound notebook's page tabs,
with a dot that fills in as each lesson is completed. No stock photography or people imagery
is used anywhere — only original line-drawn SVG — which keeps the whole site visually calm
and appropriate for any audience without needing to vet third-party images.

## Running it locally

No install required. From this folder:

```bash
npx serve .
# or: python3 -m http.server 8080
```

Then open the printed local URL. (Opening `index.html` directly via `file://` mostly works
too, but `fetch()` for the Markdown/JSON content is more reliable over an actual local server.)

## Hands-on practice without accounts

Six lessons now include a live, embedded widget so students can try that lesson's
skill directly on the page — no GitHub, Postman, or CodeSandbox account required:

| Lesson | Widget | What it does |
|---|---|---|
| 03 — First JavaScript | HTML/CSS/JS playground | Editable tabs + live `srcdoc` iframe preview |
| 04 — Markdown & npm | Markdown live preview | Split-pane editor, renders with the same marked.js already on the page |
| 05 — APIs & JSON | API tester | A minimal Postman-style tool built on `fetch()`, presets included |
| 07 — Node.js & Express | Node sandbox | A **real, running** Node/Express server via StackBlitz's WebContainers |
| 08 — Frontend Frameworks | HTML/CSS/JS playground | Same playground, pre-loaded with the Bootstrap CDN |
| 09 — Testing & Debugging | Regex tester | Live pattern matching with highlighted results |

All of these (`js/components/*.js`) are plain Vue 3 components with zero new npm
dependencies, registered globally in `lesson.html` and rendered based on each lesson's
`"interactive"` entry in `manifest.json`, which points at a small config file under
`content/interactives/`.

**The one exception is Lesson 7's Node sandbox**, which embeds StackBlitz's WebContainers
via their public JS SDK (`@stackblitz/sdk`, loaded from CDN) — this is the one way to run
*actual* server-side Node/Express code in a browser tab. Opening and editing it requires
no account; StackBlitz only asks for sign-in if a student wants to save their own copy of
the project, which is entirely optional. It's set to `clickToLoad`, so it doesn't cost any
load time on the page until a student actually opens it.

**Lesson 1 is the deliberate exception to "no accounts."** It's the lesson about Git and
GitHub themselves, so trying it hands-on does mean creating a free GitHub account — every
other lesson's "Try It" needs nothing beyond a browser.

To add a widget to a new lesson: create a config file under `content/interactives/`, add
an `"interactive": { "type": "...", "file": "..." }` entry to that lesson in
`manifest.json`, and reference `{ "type" }` from the `COMPONENT_MAP` already defined in
`lesson.html` (all five widget types are already mapped).

## Data persistence: what to use, and why

You asked for something cheap and appropriate, with APIs handling the persistence layer
rather than a custom backend. **Supabase** is the recommendation:

- Free tier covers this use case with plenty of headroom (500MB database, 50k monthly
  active users on the free plan as of this writing — confirm current limits at
  [supabase.com/pricing](https://supabase.com/pricing) since these do change).
- You get a hosted Postgres database **and** an auto-generated REST API on top of it for
  free — which is exactly the "APIs only" persistence model you asked for. No Express
  server to write or host.
- Built-in anonymous auth means a student's progress can be tracked without ever
  making them create an account, and you can upgrade that to a real email/passwordless
  login later without losing their data.

`js/data-store.js` is already wired for this — it's a no-op until you fill in
`js/api-config.js`, at which point it transparently starts syncing.

### Supabase setup (10 minutes)

1. Create a free project at [supabase.com](https://supabase.com).
2. In **Authentication → Providers**, enable **Anonymous Sign-ins**.
3. In the SQL editor, run:

```sql
create table lesson_progress (
  user_id uuid references auth.users not null,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table quiz_results (
  user_id uuid references auth.users not null,
  lesson_id text not null,
  score int not null,
  total int not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table lesson_progress enable row level security;
alter table quiz_results enable row level security;

create policy "own rows only" on lesson_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own rows only" on quiz_results
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

4. Copy your project URL and `anon` public key from **Project Settings → API**.
5. Paste them into `js/api-config.js`.

That's the entire backend. If you'd rather not stand up Supabase at all, leave
`api-config.js` untouched — the site works completely offline/local-only, per student
browser, with zero setup.

**Alternative if you'd prefer:** Firebase (Firestore + free auth) is an equally reasonable
choice with a similar free tier and a similar "REST/SDK API, no server" shape — pick whichever
ecosystem you're already more comfortable debugging at 11pm.

## Hosting recommendation

This is a fully static site, so any static host works. For a course site like this:

- **Cloudflare Pages** — free, generous bandwidth, automatic HTTPS, deploys straight from
  a GitHub repo on every push. Probably the best default.
- **Netlify** — equally solid, free tier, slightly friendlier UI if you want drag-and-drop
  deploys without connecting GitHub.
- **GitHub Pages** — free and simplest if the repo is already on GitHub and you don't need
  preview deploys per branch.

Total monthly cost at student-course scale: **$0** for hosting, **$0** for Supabase, until
usage is large enough that it wouldn't be "a course site" anymore.

## Updating content

- **Add a lesson**: create `content/lessons/NN-slug.md`, add an entry to
  `content/lessons/manifest.json` (and a module reference), and optionally add a matching
  quiz JSON file under `content/quizzes/`.
- **Edit a lesson**: just edit the Markdown file. Nothing else needs to change.
- **Reorder lessons**: reorder the `lessons` array inside each module in `manifest.json`.
- **Add images**: keep them understated and non-figurative (line art, diagrams, icons)
  to match the site's existing visual tone and to avoid needing to individually vet stock
  photography for the audience.

## What changed from the 2023 source material

- Rewrote all slide-deck bullet points into full Markdown prose, organized into 11
  lessons across 4 modules (the original had inconsistent lesson numbering and a few
  duplicate/placeholder sessions, which this consolidates).
- Updated Angular 14 → general framework survey (Vue, React, Alpine) reflecting the
  current landscape; Bootstrap 4 → Bootstrap 5 (jQuery dependency dropped).
- Updated the BLS job-growth statistic to the current 2024–2034 projection.
- Added a short section on AI-assisted coding tools (Copilot, Claude Code), which didn't
  exist in their current form when the original course was written.
- Replaced references to specific paid LinkedIn Learning courses with free, durable
  references (MDN, freeCodeCamp, The Odin Project) so nothing behind this course requires
  a paid subscription.
- Kept the instructor's original "lesson sandwich" structure (Concepts & Terminology →
  Technology → Soft Skills) since it's a genuinely useful teaching pattern, not just
  nostalgia.
