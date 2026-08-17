# Developer Resources, Testing & Debugging

*Finishing Strong · About 45 minutes*

<div class="lesson-audio">
  <audio controls preload="metadata" src="../../audio/09.mp3">
    Your browser does not support the audio element.
  </audio>
  <span class="lesson-audio__label">Lesson overview · ~75 sec</span>
</div>

## Where we're headed

No developer memorizes everything — the job is as much about knowing where to look as it is about knowing the answer outright. This lesson is a curated map of the reference tools and debugging habits that make you self-sufficient.

## Concepts & Terminology

**Browser developer tools** (open with F12, or right-click → Inspect) are the single most-used debugging tool in front-end work. Three panels matter most starting out:

- **Console** — shows errors, warnings, and anything you deliberately log with `console.log()`.
- **Network** — shows every request your page makes, including API calls, and what came back.
- **Elements** — shows the live HTML and CSS of the page, editable in real time for quick experiments.

A **URL** breaks down into predictable parts — protocol, domain name, path, and optional query parameters — and understanding that structure makes both debugging and API work much clearer.

<figure class="lesson-figure" role="img" aria-label="Diagram breaking a URL into its four parts: protocol, domain, path, and query string">
  <svg viewBox="0 0 640 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-body);">
    <text x="0" y="16" font-size="11" fill="var(--ink-faint)" font-family="var(--font-mono)">ANATOMY OF A URL</text>
    <text x="20" y="50" font-size="15" font-family="var(--font-mono)">
      <tspan fill="var(--accent-gold)">https://</tspan><tspan fill="var(--accent-sage)">api.example.com</tspan><tspan fill="var(--accent-berry)">/users/42</tspan><tspan fill="var(--ink-soft)">?active=true</tspan>
    </text>
    <line x1="20" y1="60" x2="88" y2="60" stroke="var(--accent-gold)" stroke-width="2"/>
    <text x="20" y="78" font-size="10" fill="var(--accent-gold)">protocol</text>
    <line x1="90" y1="60" x2="226" y2="60" stroke="var(--accent-sage)" stroke-width="2"/>
    <text x="90" y="78" font-size="10" fill="var(--accent-sage)">domain</text>
    <line x1="228" y1="60" x2="304" y2="60" stroke="var(--accent-berry)" stroke-width="2"/>
    <text x="228" y="78" font-size="10" fill="var(--accent-berry)">path</text>
    <line x1="306" y1="60" x2="408" y2="60" stroke="var(--ink-soft)" stroke-width="2"/>
    <text x="306" y="78" font-size="10" fill="var(--ink-soft)">query string</text>
  </svg>
  <figcaption>The query string is the part you'll build dynamically most often — exactly what an API call appends to send parameters like `?active=true`.</figcaption>
</figure>

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
