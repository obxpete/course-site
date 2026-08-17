# Wireframing: Structure Before Style

*Finishing Strong · About 40 minutes*

## Where we're headed

Wireframing came up briefly back in Lesson 2 as a way to agree on structure before anyone debates a color palette. This lesson gives it a full treatment: the fidelity spectrum from napkin sketch to clickable prototype, the shared visual vocabulary every wireframe uses, and the judgment calls that make one actually useful to a team instead of just another deliverable nobody reads.

## Concepts & Terminology

A **wireframe** is a two-dimensional sketch of a screen's layout, prioritizing space and content over visual design. It answers "what goes where, and how important is it?" before anyone answers "what color is it?" — deliberately, because those are different conversations, and mixing them tends to derail both.

### The fidelity spectrum

Design work moves through increasing levels of detail, and skipping straight to the end is one of the most common — and most expensive — mistakes a team can make:

1. **Sketch** — pen and paper or a whiteboard. Minutes per screen, meant to be thrown away. Ideal for exploring several layout ideas fast, before committing to any of them.
2. **Wireframe** — a low-fidelity digital layout: boxes, placeholder text, labeled navigation. Structure and content hierarchy are real; color, imagery, and copy are not.
3. **Mockup** — a high-fidelity, fully styled screen: real colors, fonts, imagery, and (ideally) real copy. This is what the finished product will actually look like, but it's still a static image.
4. **Prototype** — a clickable simulation, usually built from mockups, that lets someone click through a flow (sign up → confirm email → land on dashboard) without any code existing yet.

Each stage answers a different question, and each is progressively more expensive to change. A sketch costs a redraw; a prototype costs re-linking screens; production code costs a deploy. The whole point of moving through the spectrum in order is spending the cheap stages catching problems the expensive stages can't afford to.

### Information architecture

**Information architecture** is the organization of content by importance and relationship, decided *before* layout — which items belong on the same screen, which belong in a submenu, which don't belong in the product at all. **Card sorting** is a lightweight technique for testing whether your organization actually makes sense to someone who isn't you: write each piece of content on a card, and ask a real user to group them the way they'd expect to find them. The groupings that surprise you are exactly the ones worth listening to.

### A shared visual vocabulary

Every wireframe uses the same handful of conventions, precisely so a viewer can tell placeholder from real content at a glance:

- An **X-box** (a rectangle with a diagonal cross through it) stands in for an image that doesn't exist yet.
- **Greeked text** ("lorem ipsum...", or repeated gray bars) stands in for real copy, without letting anyone get distracted proofreading a placeholder sentence.
- Labeled gray rectangles stand in for navigation, buttons, and form fields — present, sized correctly, but unstyled.

<figure class="lesson-figure" role="img" aria-label="A low-fidelity wireframe mockup showing a header, sidebar navigation, an image placeholder, text placeholder lines, and a button — structure only, no visual design">
  <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-body);">
    <text x="0" y="16" font-size="11" fill="var(--ink-faint)" font-family="var(--font-mono)">A WIREFRAME: STRUCTURE FIRST, DESIGN LATER</text>
    <rect x="20" y="26" width="600" height="40" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <text x="34" y="50" font-size="12" fill="var(--ink-soft)" font-family="var(--font-mono)">LOGO</text>
    <rect x="460" y="38" width="50" height="16" fill="none" stroke="var(--line)" stroke-width="1.5"/>
    <rect x="522" y="38" width="50" height="16" fill="none" stroke="var(--line)" stroke-width="1.5"/>
    <rect x="20" y="76" width="140" height="164" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <rect x="36" y="94" width="108" height="8" fill="var(--line)"/>
    <rect x="36" y="118" width="90" height="8" fill="var(--line)"/>
    <rect x="36" y="142" width="100" height="8" fill="var(--line)"/>
    <rect x="36" y="166" width="80" height="8" fill="var(--line)"/>
    <rect x="176" y="76" width="444" height="164" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <rect x="192" y="90" width="180" height="90" fill="none" stroke="var(--line)" stroke-width="1.5"/>
    <line x1="192" y1="90" x2="372" y2="180" stroke="var(--line)" stroke-width="1"/>
    <line x1="372" y1="90" x2="192" y2="180" stroke="var(--line)" stroke-width="1"/>
    <rect x="392" y="94" width="204" height="8" fill="var(--line)"/>
    <rect x="392" y="112" width="204" height="8" fill="var(--line)"/>
    <rect x="392" y="130" width="140" height="8" fill="var(--line)"/>
    <rect x="192" y="196" width="100" height="28" rx="4" fill="none" stroke="var(--accent-gold)" stroke-width="1.5"/>
    <text x="242" y="215" font-size="11" text-anchor="middle" fill="var(--accent-gold)">Button</text>
  </svg>
  <figcaption>No colors, no real copy, no logo — just boxes standing in for content, so everyone agrees on layout before anyone touches a color palette.</figcaption>
</figure>

### Designing responsively, from the start

Sketch for the smallest screen first (mobile-first), then work up to tablet and desktop breakpoints — it's far easier to add room on a bigger screen than to cram an already-dense desktop layout into a phone. Once a layout stabilizes, it maps directly onto a CSS grid: a two-column wireframe is a `col-md-6` / `col-md-6` Bootstrap row (Lesson 8) waiting to happen.

## Technology

- **Figma** — the current industry standard for digital wireframing and prototyping, with a usable free tier and real-time collaboration.
- **Balsamiq** — deliberately hand-drawn-looking wireframes, which (by design) discourage stakeholders from reacting to visual polish before structure is settled.
- **Excalidraw** — a free, fast, sketch-style whiteboard tool, well suited to the earliest "sketch" stage or a quick remote whiteboarding session.
- Plain **pen and paper** or a physical whiteboard remains completely legitimate for the sketch stage — the tool matters far less than the discipline of sketching before coding.

## Soft Skills

- **Get feedback early and often.** A wireframe costs minutes to redo; a built page costs hours. Show work before it feels "ready" — that's the entire point of a cheap stage.
- **Don't fall in love with your first sketch.** Expect to redraw the same screen three or four times before the structure actually feels right; that's normal iteration, not failure.
- **Present wireframes as explicitly not final design**, out loud, every time. Skipping this reminder is the single most common way a structure conversation accidentally turns into a color-palette argument.
- **Involve a real user when you can.** A five-minute walkthrough with one actual user — not a stakeholder, not a teammate — reliably surfaces problems a room full of internal opinions will miss entirely.

## Try It

The interactive below describes several design artifacts — sort each into the fidelity stage it belongs to: Sketch, Wireframe, Mockup, or Prototype.

## Recap

- A wireframe prioritizes structure and content over visual design — it answers "what goes where" before "what color is it."
- The fidelity spectrum (Sketch → Wireframe → Mockup → Prototype) moves from cheap-to-change to expensive-to-change, on purpose.
- Information architecture and card sorting organize content by importance before anyone lays out a single pixel.
- A stabilized wireframe maps directly onto a CSS grid system like Bootstrap's — structure work isn't wasted once code starts.
