# Systems Design: MVC, Components & Agile Thinking

*Foundations · About 50 minutes*

<div class="lesson-audio">
  <audio controls preload="metadata" src="../../audio/02.mp3">
    Your browser does not support the audio element.
  </audio>
  <span class="lesson-audio__label">Lesson overview · ~75 sec</span>
</div>

## Where we're headed

Before you write code, it helps to know the shape that code is likely to take. This lesson introduces the two most common patterns for organizing an application — one that dominates the backend, one that dominates the frontend — and a philosophy for managing how it gets built.

## Concepts & Terminology

**Basic software architecture** divides most applications into three layers:

- **Presentation** — what the user actually sees and interacts with.
- **Business/Application logic** — the rules and processes that decide what should happen.
- **Persistent data storage** — where information lives between visits, typically a database.

These three layers have to exist in every application. The question is how you organize the code that implements them.

### On the backend: MVC

**MVC (Model–View–Controller)** is the dominant pattern for organizing server-side code, used by virtually every major backend framework — Express, Django, Ruby on Rails, Laravel, Spring. It maps directly onto the three layers:

- **Model** — the data and the rules for working with it (reads from and writes to the database).
- **View** — the template or response returned to the user (HTML, JSON, or both).
- **Controller** — the code that sits between the two, receiving a request and deciding which model to query and which view to return.

When a user submits a form, that HTTP request hits a **controller**, which calls the right **model** (to read or write data), then passes the result to a **view** (to format the response). Everything flows through the controller.

<figure class="lesson-figure" role="img" aria-label="Diagram of the MVC request cycle: a browser request goes to the controller, which reads or writes through the model and passes data to the view, which sends a response back to the browser">
  <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-body);">
    <text x="0" y="16" font-size="11" fill="var(--ink-faint)" font-family="var(--font-mono)">THE MVC REQUEST CYCLE</text>
    <rect x="270" y="26" width="100" height="44" rx="6" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <text x="320" y="53" font-size="13" text-anchor="middle" fill="var(--ink)">Browser</text>
    <rect x="270" y="116" width="100" height="44" rx="6" fill="var(--accent-gold-soft)" stroke="var(--accent-gold)" stroke-width="1.5"/>
    <text x="320" y="143" font-size="13" text-anchor="middle" fill="var(--ink)" font-weight="600">Controller</text>
    <rect x="60" y="206" width="120" height="44" rx="6" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <text x="120" y="233" font-size="13" text-anchor="middle" fill="var(--ink)">Model</text>
    <rect x="460" y="206" width="120" height="44" rx="6" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <text x="520" y="233" font-size="13" text-anchor="middle" fill="var(--ink)">View</text>
    <line x1="320" y1="70" x2="320" y2="116" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <text x="330" y="96" font-size="10.5" fill="var(--ink-soft)">1. request</text>
    <line x1="280" y1="160" x2="150" y2="206" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <text x="140" y="192" font-size="10.5" fill="var(--ink-soft)">2. read / write data</text>
    <line x1="360" y1="160" x2="480" y2="206" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <text x="368" y="192" font-size="10.5" fill="var(--ink-soft)">3. pass data to render</text>
    <path d="M520,206 L370,70" fill="none" stroke="var(--accent-sage)" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="450" y="134" font-size="10.5" fill="var(--accent-sage)">4. response</text>
  </svg>
  <figcaption>A controller never touches the database or the response format directly — it orchestrates the model (data) and the view (presentation) in between.</figcaption>
</figure>

### On the frontend: Component-Based Architecture

Backend MVC was designed when servers rendered complete HTML pages for every request. The modern frontend works differently: a JavaScript framework loads once, then updates the page in-place in response to user actions. For this, a different pattern dominates.

**Component-based architecture** breaks the UI into small, self-contained pieces — each one owns its own HTML template, styles, and behavior. A page is assembled from components the way HTML is assembled from elements, except each component can have its own state and can be reused anywhere.

A minimal example in Vue:

```javascript
const Counter = {
  data() { return { count: 0 } },
  template: `<button @click="count++">Clicked {{ count }} times</button>`
}
```

React, Vue, and Alpine all use this model. The specific syntax differs; the idea is the same: small, reusable pieces that manage their own slice of the UI, composed together to build something larger.

### Where they meet

In a full-stack application, both patterns coexist. The backend (Node/Express, Django, Rails) uses MVC to organize its routes, database access, and API responses. The frontend (React, Vue) uses components to build the interface that consumes those responses. They communicate through a JSON API — the backend returns data, the frontend renders it.

Understanding which pattern belongs where prevents a lot of confusion when reading professional codebases.

**SDLC (Software Development Lifecycle)** describes the stages a project moves through, from idea to finished product. The classic **Waterfall** approach moves through requirements, development, and testing in strict sequence — each stage must finish before the next begins. **Agile** is a more iterative alternative, built on a simple, realistic assumption: requirements *will* change while a project is being built, so the process should expect that rather than fight it. Agile teams defer decisions until the last responsible moment, stay driven by actual user needs, and often practice **Domain-Driven Design (DDD)** — building software around a deep, evolving understanding of the problem it's meant to solve.

## Technology

In VS Code, notice how a typical backend project organizes its code into folders named `models`, `controllers`, and `routes` — frameworks like Express, Django, and Rails all use this convention. A typical frontend project, by contrast, has a `components` folder full of self-contained `.vue`, `.jsx`, or `.html` files, each one handling its own piece of the UI.

Explore the Source Control panel too — it's where Agile's "small, frequent changes" philosophy meets Git's commit history in practice.

## Soft Skills

Good requirements gathering is one of the most consistently underrated skills in software development. A few habits that separate a smooth project from a doomed one:

- **Define the problem, not the solution, first.** A request to "build a blog" often really means "help me build an audience" — and those two problem statements lead to very different applications.
- **Write user stories**: a short description of what a person does, how they do it, and why, small enough to fit on a sticky note. Start with a handful and refine as you learn more.
- **Use story cards** to keep functional requirements concrete: *As a [type of user], I need [some capability], so that [some benefit].* Lesson 15 covers requirements gathering in full, including how to prioritize and write acceptance criteria for stories like this.
- **Wireframe before you design.** A wireframe is a simple, low-fidelity sketch of a screen's layout and content — deliberately ignoring color and imagery — so stakeholders can agree on structure before anyone debates a color palette. Lesson 16 covers this in full, including the fidelity spectrum from napkin sketch to clickable prototype.

## Try It

The interactive below lists code snippets — classify each one as a Model, View, or Controller in an MVC backend, or as a Component in a frontend application.

## Recap

- Applications separate presentation, business logic, and data storage — MVC and component-based architecture are the two dominant patterns for how.
- MVC organizes backend code: models talk to the database, controllers route requests, views return responses.
- Component-based architecture organizes frontend code: small, reusable pieces each own their template, state, and behavior.
- In a full-stack application, both patterns coexist and communicate through a JSON API.
- Agile expects requirements to change and builds that expectation into the process.
