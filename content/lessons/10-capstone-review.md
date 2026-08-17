# Capstone Review: Architecture & Your Next Steps

*Finishing Strong · About 40 minutes*

<div class="lesson-audio">
  <audio controls preload="metadata" src="../../audio/10.mp3">
    Your browser does not support the audio element.
  </audio>
  <span class="lesson-audio__label">Lesson overview · ~75 sec</span>
</div>

## Where we're headed

This final lesson ties the whole stack together — front-end, back-end, data, and the cloud infrastructure underneath all of it — and points toward where to go once this course ends.

## Concepts & Terminology

Zooming all the way out, a typical modern web application looks like this:

1. A **browser** (the front-end) renders HTML, CSS, and JavaScript, often built with a framework like Vue, React, or plain Bootstrap-enhanced HTML.
2. That front-end makes **API requests**, formatted as JSON, to a **server** (the back-end) — commonly built with Node.js and Express, though Python and Java are equally common elsewhere in the industry.
3. The server reads from and writes to a **database** — a SQL database like PostgreSQL for structured, relational data, or a NoSQL/document database for more flexible, less structured data.
4. All of it runs on **cloud infrastructure** — rented, on-demand computing resources rather than hardware the organization owns and maintains directly.

<figure class="lesson-figure" role="img" aria-label="Diagram of the full stack architecture: a browser front-end talks to a server over a JSON API, the server reads and writes a database, and all three run on cloud infrastructure">
  <svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-body);">
    <text x="0" y="16" font-size="11" fill="var(--ink-faint)" font-family="var(--font-mono)">THE WHOLE STACK, IN ONE PICTURE</text>
    <rect x="10" y="30" width="620" height="170" rx="8" fill="none" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="24" y="46" font-size="10" fill="var(--ink-faint)" font-family="var(--font-mono)">CLOUD INFRASTRUCTURE</text>
    <rect x="40" y="80" width="160" height="80" rx="6" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <text x="120" y="110" font-size="12" text-anchor="middle" fill="var(--ink)" font-weight="600">Browser</text>
    <text x="120" y="128" font-size="10" text-anchor="middle" fill="var(--ink-faint)">Vue / React /</text>
    <text x="120" y="141" font-size="10" text-anchor="middle" fill="var(--ink-faint)">Bootstrap</text>
    <rect x="255" y="80" width="160" height="80" rx="6" fill="var(--accent-gold-soft)" stroke="var(--accent-gold)" stroke-width="1.5"/>
    <text x="335" y="110" font-size="12" text-anchor="middle" fill="var(--ink)" font-weight="600">Server</text>
    <text x="335" y="128" font-size="10" text-anchor="middle" fill="var(--ink)">Node.js +</text>
    <text x="335" y="141" font-size="10" text-anchor="middle" fill="var(--ink)">Express</text>
    <rect x="470" y="80" width="140" height="80" rx="6" fill="var(--accent-sage-soft)" stroke="var(--accent-sage)" stroke-width="1.5"/>
    <text x="540" y="110" font-size="12" text-anchor="middle" fill="var(--ink)" font-weight="600">Database</text>
    <text x="540" y="128" font-size="10" text-anchor="middle" fill="var(--ink)">SQL /</text>
    <text x="540" y="141" font-size="10" text-anchor="middle" fill="var(--ink)">NoSQL</text>
    <line x1="200" y1="120" x2="255" y2="120" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <text x="227" y="112" font-size="9.5" text-anchor="middle" fill="var(--ink-soft)">JSON API</text>
    <line x1="415" y1="120" x2="470" y2="120" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <text x="442" y="112" font-size="9.5" text-anchor="middle" fill="var(--ink-soft)">queries</text>
  </svg>
  <figcaption>Every lesson in this course fits somewhere in this picture — Lessons 2, 3, and 8 live in the browser box; 5 and 7 live on the arrows and the server; 11 lives in the database; 13 and 14 are what "cloud infrastructure" means underneath all of it.</figcaption>
</figure>

This is the same three-layer architecture from Lesson 2 (presentation, business logic, data storage), just with specific, current technology names attached to each layer.

**Service models** are a useful way to describe how much of that stack you're renting versus building yourself: **IaaS** (infrastructure as a service) rents raw computing power; **PaaS** (platform as a service) also handles the runtime environment; **SaaS** (software as a service) is a complete, ready-to-use application. Most projects today mix all three — a database might be a managed PaaS product, while a specific business tool is pure SaaS.

## Technology

A few tools and services that make this architecture achievable on a student or small-team budget, all with meaningful free tiers:

- **Static hosting**: Cloudflare Pages, Netlify, or GitHub Pages for front-end code.
- **Backend-as-a-service**: platforms like Supabase or Firebase provide a database, a ready-made REST API, and authentication without writing a custom backend from scratch — a fast way to add real data persistence to a lightweight project.
- **Version control and CI**: GitHub, connected directly to your hosting provider, so every push to your main branch can automatically redeploy your site.

## Soft Skills

As you look past this course:

- **Build something real**, even small. A working project you can explain in an interview outweighs a long list of topics you've only read about.
- **Keep a running README** of what you've built and why — it becomes both a portfolio and a record of your own growth.
- **Stay comfortable not knowing everything.** No developer, at any level, knows the whole stack cold. Knowing how to find the answer, quickly and reliably, is the actual skill.

## Try It

Sketch the architecture (front-end, API, database, hosting) for one small application idea of your own — a club sign-up form, a simple event calendar, a class notes-sharing tool. You don't need to build it yet; just identify which piece from this course maps to which layer.

## Recap

- A modern web application layers front-end, API, database, and cloud infrastructure.
- IaaS, PaaS, and SaaS describe how much of that stack you rent versus build.
- Free-tier hosting and backend-as-a-service tools make real, deployed projects achievable on a student budget.
- The most valuable next step is building something real, however small, and documenting it clearly.
