# Developer Resources, Testing & Debugging

*Finishing Strong · About 45 minutes*

## Where we're headed

No developer memorizes everything — the job is as much about knowing where to look as it is about knowing the answer outright. This lesson is a curated map of the reference tools and debugging habits that make you self-sufficient.

## Concepts & Terminology

**Browser developer tools** (open with F12, or right-click → Inspect) are the single most-used debugging tool in front-end work. Three panels matter most starting out:

- **Console** — shows errors, warnings, and anything you deliberately log with `console.log()`.
- **Network** — shows every request your page makes, including API calls, and what came back.
- **Elements** — shows the live HTML and CSS of the page, editable in real time for quick experiments.

A **URL** breaks down into predictable parts — protocol, domain name, path, and optional query parameters — and understanding that structure makes both debugging and API work much clearer.

## Technology

A working reference list, worth bookmarking:

- [MDN Web Docs](https://developer.mozilla.org/) — the most authoritative reference for HTML, CSS, and JavaScript.
- [Stack Overflow](https://stackoverflow.com/) — the classic Q&A site for developer problems; still useful, though increasingly supplemented by AI coding assistants.
- [CodePen](https://codepen.io/) and [StackBlitz](https://stackblitz.com/) — browser-based sandboxes for quick front-end and full stack experiments.
- [Can I Use](https://caniuse.com/) — checks whether a given web feature is supported across browsers before you rely on it.
- [DevDocs](https://devdocs.io/) — a fast, combined reference across many languages and frameworks at once.

For visual assets, use sources that are clearly free to use and appropriately licensed, and keep imagery understated and professional — a good default for any portfolio or client project, not only for this course.

## Soft Skills

**Testing and debugging** is a mindset as much as a toolkit:

- Reproduce the bug reliably before trying to fix it. A fix for a bug you can't consistently trigger is a guess, not a fix.
- Change one thing at a time. Debugging five changes at once makes it impossible to know which one mattered.
- Write the error message down (or paste it somewhere you can search it) rather than trying to hold it in your head — exact wording matters.

## A note on Regular Expressions

A **regular expression (regex)** is a compact pattern language for matching text — useful for validating a phone number format, extracting a date, or searching across a large codebase. Regex has a well-earned reputation for being hard to read at a glance; treat it as a tool to reach for deliberately, test carefully (sites like [regex101.com](https://regex101.com/), or the tester built into this lesson, show you a live match), and comment generously so a future reader — including you — doesn't have to decode it cold.

## Try It

First, open your browser's developer tools on any website you use regularly — find one network request in the Network tab and identify its method (GET/POST), status code, and response format. Then use the regex tester below (no account needed) to change the pattern and see which words it matches.

## Recap

- Browser developer tools (Console, Network, Elements) are the front-line debugging toolkit.
- A short list of trustworthy references — MDN, Can I Use, DevDocs — beats a long list of unreliable ones.
- Reliable reproduction and one-change-at-a-time discipline make debugging tractable.
- Regular expressions are powerful but should be used deliberately, tested live, and documented clearly.
