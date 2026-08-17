# Requirements, Wireframes & Your First JavaScript

*Building Blocks · About 55 minutes*

<div class="lesson-audio">
  <audio controls preload="metadata" src="../../audio/03.mp3">
    Your browser does not support the audio element.
  </audio>
  <span class="lesson-audio__label">Lesson overview · ~75 sec</span>
</div>

## Where we're headed

This lesson pairs a deeper look at requirements gathering with your first hands-on JavaScript — the language that brings a webpage to life in the browser.

## Concepts & Terminology

Requirements gathering is rarely a one-time meeting; it's an ongoing conversation. A useful shorthand for that conversation is **cards, conversations, confirmation**:

- **Cards** capture a requirement briefly enough to fit on an index card or sticky note.
- **Conversations** fill in the detail a card can't hold on its own.
- **Confirmation** checks that everyone — developer, designer, and stakeholder — agreed on the same thing.

**Wireframing** continues to matter here: a two-dimensional sketch of a screen's layout, prioritizing space and content over visual design. It gives everyone a chance to walk through structure and functionality without getting distracted by colors or images, and often surfaces questions ("wait, where does this button actually go?") that would otherwise surface much later, and more expensively, in development.

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

## Technology

**JavaScript** is the programming language that runs inside a web browser (and, as you'll see in a later lesson, on servers too). It's what makes a webpage *do* things — respond to clicks, validate a form, update content without reloading the page.

A first JavaScript example:

```html
<script>
  var message = "Hello, world";
  alert(message);
</script>
```

A few starting points worth bookmarking as you experiment:

- [MDN Web Docs: JavaScript basics](https://developer.mozilla.org/en-US/docs/Web/JavaScript) — the standard, authoritative reference for JavaScript.
- [W3Schools JavaScript Tryit Editor](https://www.w3schools.com/js/tryit.asp?filename=tryjs_intro) — a live sandbox for quick experiments.

Modern JavaScript looks a little different from the example above — you'll more often see `let` and `const` in place of `var`, and arrow functions in place of longer function syntax — but the underlying idea (writing instructions the browser executes) hasn't changed.

## Soft Skills

Project work at any scale benefits from habits that are simple to state and easy to skip under deadline pressure:

- Project planning that includes both stakeholders and the people actually writing the code.
- Documentation written as you go, not reconstructed from memory afterward.
- A habit of testing your own work continuously, rather than treating testing as a separate phase at the end.

These aren't abstract ideals — they're the difference between a project that's maintainable six months later and one that quietly becomes unmaintainable the day the original developer moves on.

## Try It

Use the playground below — no account or setup needed. Change `message`, then try replacing the `alert()` call with code that updates the page's text directly instead.

## Recap

- Requirements gathering is continuous: cards, conversations, confirmation.
- Wireframes clarify structure and functionality before visual design begins.
- JavaScript runs in the browser and makes web pages interactive.
- Good project habits (planning, documentation, continuous testing) compound over the life of a project.
