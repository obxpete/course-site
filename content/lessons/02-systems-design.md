# Systems Design: MVC, SDLC & Agile Thinking

*Foundations · About 50 minutes*

<div class="lesson-audio">
  <audio controls preload="metadata" src="../../audio/02.mp3">
    Your browser does not support the audio element.
  </audio>
  <span class="lesson-audio__label">Lesson overview · ~75 sec</span>
</div>

## Where we're headed

Before you write code, it helps to know the shape that code is likely to take. This lesson introduces two ideas that show up in almost every professional codebase: a pattern for organizing an application (MVC), and a philosophy for managing how it gets built (Agile).

## Concepts & Terminology

**Basic software architecture** divides most applications into three layers:

- **Presentation** — what the user actually sees and interacts with.
- **Business/Application logic** — the rules and processes that decide what should happen.
- **Persistent data storage** — where information lives between visits, typically a database.

**MVC (Model–View–Controller)** is one common way to organize those layers inside your code:

- **Model** — the data and the rules for working with it.
- **View** — the template or interface shown to the user.
- **Controller** — the code that connects the two, responding to user actions and deciding what happens next.

**SDLC (Software Development Lifecycle)** describes the stages a project moves through, from idea to finished product. The classic **Waterfall** approach moves through requirements, development, and testing in strict sequence, like a row of dominoes — each stage must finish before the next begins.

**Agile** is a more iterative alternative, built on a simple, realistic assumption: requirements *will* change while a project is being built, so the process should expect that rather than fight it. Agile teams defer decisions until the last responsible moment, stay driven by actual user needs rather than by the technology itself, and often practice **Domain-Driven Design (DDD)** — building software around a deep, evolving understanding of the problem it's meant to solve, rather than locking in one rigid technical approach from day one.

## Technology

Take a look at how these ideas show up in a real editor:

- In VS Code, notice how a typical project is organized into folders that roughly map to "model," "view," and "controller" responsibilities, even when a framework doesn't enforce that structure explicitly.
- Explore the Source Control panel again — it's where Agile's "small, frequent changes" philosophy meets Git's commit history in practice.

## Soft Skills

Good requirements gathering is one of the most consistently underrated skills in software development. A few habits that separate a smooth project from a doomed one:

- **Define the problem, not the solution, first.** A request to "build a blog" often really means "help me build an audience" — and those two problem statements lead to very different applications.
- **Write user stories**: a short description of what a person does, how they do it, and why, small enough to fit on a sticky note. Start with a handful and refine as you learn more.
- **Use story cards** to keep functional requirements concrete: *As a [type of user], I need [some capability], so that [some benefit].*
- **Wireframe before you design.** A wireframe is a simple, low-fidelity sketch of a screen's layout and content — deliberately ignoring color and imagery — so stakeholders can agree on structure and functionality before anyone debates a color palette.

## Try It

Pick an app you use daily (a class portal, a rideshare app, a food delivery app). Write one user story for a feature it has, in the format above. Then sketch — on paper or in a free tool like Excalidraw — a rough wireframe of that one screen.

## Recap

- Applications typically separate presentation, business logic, and data storage.
- MVC is a common pattern for organizing those layers within code.
- Waterfall is sequential; Agile is iterative and expects requirements to change.
- User stories and wireframes turn vague requests into buildable, testable requirements.
