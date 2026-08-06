---
name: add-lesson
description: Add a new lesson to the CIS 365 course site (content markdown, manifest entry, quiz JSON, optional widget, search index). Use when the user asks to add, create, or scaffold a new lesson or module for this course site.
---

# Adding a lesson to the course site

Follow these steps in order — each one has caused a real bug before when skipped
or done out of order.

1. **Pick an id.** Two-digit string (e.g. `"14"`). IDs do not need to be
   sequential or contiguous — `manifest.json` order and `findIndex`-based
   position drive lesson numbering, not the id itself.

2. **Write the content.** `content/lessons/<id>-slug.md`. Plain Markdown, no
   HTML needed — `markdown-render.js` handles rendering.

3. **Add the manifest entry.** `content/lessons/manifest.json` — insert the
   `{id, title, ...}` entry in the module and position where it should appear
   in navigation. Position in the array is what determines the displayed
   lesson number, not the id value.

4. **Write the quiz.** `content/quizzes/<id>.json`, shaped exactly as
   `{ "lessonId": "<id>", "questions": [...] }` — never a bare array. A bare
   array causes a silent Vue render failure that empties the lesson content
   div. (A `PostToolUse` hook in this repo's `.claude/settings.json` will
   block a bare-array write and explain why — this is documented in case it
   fires.)

5. **Optional: interactive widget.** New component types go in
   `js/components/`, then must be registered in `lesson.html`'s
   `COMPONENT_MAP` or the lesson page will silently not render it.

6. **Regenerate the search index.** Run `/regen-search` (or
   `node scripts/build-search-index.js` directly) — required after any
   content addition or edit, or the new lesson won't surface in ⌘K search.

7. **Optional: audio.** Narration files live in `audio/`, one per lesson,
   generated separately (ElevenLabs) — not required for the lesson to work.
