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
