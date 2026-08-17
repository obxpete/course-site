# JavaScript Fundamentals: Variables, Logic & the DOM

*Building Blocks · About 65 minutes*

## Where we're headed

This lesson is a real, ground-up introduction to JavaScript — the language that turns a static page into something that responds, calculates, and updates itself while someone is looking at it. By the end you'll be able to store data in variables, make decisions with conditionals, repeat work with loops, package logic into reusable functions, and — the part that makes it feel like magic the first time — reach into a live webpage and change it.

## Concepts & Terminology

**JavaScript** is the programming language every browser runs natively. HTML gives a page structure and CSS gives it style; JavaScript gives it behavior — responding to clicks, validating input, updating content without a page reload. (You'll see this same language running on a server in Lesson 7 — one of JavaScript's more unusual traits is that it isn't confined to the browser at all.)

### Variables and data types

A **variable** is a named container for a value. Modern JavaScript declares variables with `let` (for values that will change) or `const` (for values that won't):

```javascript
let score = 0;               // will change as the game progresses
const playerName = "Rivka";  // won't change once set
```

JavaScript has a handful of core **data types**: `string` (text, in quotes), `number` (integers and decimals alike — JavaScript doesn't separate them), and `boolean` (`true` / `false`), plus two structures for grouping values: `array` (an ordered list, `[1, 2, 3]`) and `object` (named properties, `{ name: "Rivka", age: 21 }`). You'll meet arrays and objects constantly once you start working with APIs — a list of search results is almost always an array of objects.

You'll still see `var` in older code and tutorials — it's the original way to declare a variable, and it still works, but `let` and `const` fixed some confusing edge cases `var` had around scope, so modern code uses them almost exclusively.

### Operators and expressions

**Operators** combine values into new ones: arithmetic (`+ - * /`), comparison (`=== !== > <`), and logical (`&& || !`). One habit worth building early: use `===` (strict equality) instead of `==`. Plain `==` silently converts types before comparing — `"5" == 5` evaluates to `true` — which causes bugs that are genuinely hard to track down. `===` compares value and type together, with no surprise conversions.

### Control flow: decisions and repetition

An **`if` / `else` statement** runs different code depending on a condition:

```javascript
if (score >= 100) {
  console.log("You win!");
} else if (score > 0) {
  console.log("Keep going.");
} else {
  console.log("Game over.");
}
```

A **loop** repeats a block of code. The two you'll reach for most often:

```javascript
// for: when you know how many times to repeat
for (let i = 0; i < 5; i++) {
  console.log(`Round ${i + 1}`);
}

// for...of: when you're stepping through a list
const players = ["Rivka", "Tova", "Leah"];
for (const player of players) {
  console.log(player);
}
```

### Functions

A **function** packages a block of code so it can be run — and reused — on demand:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

greet("Rivka"); // "Hello, Rivka!"
```

Modern JavaScript also uses **arrow functions**, a shorter syntax that's especially common for short, one-off functions (like the ones you'll pass to `addEventListener`, below):

```javascript
const greet = (name) => `Hello, ${name}!`;
```

Both forms do the same job; arrow functions are just terser, and you'll see them constantly in real codebases — including the very next section.

### The DOM

The **DOM (Document Object Model)** is the browser's live, in-memory representation of a page — every element, nested inside its parent, structured exactly like the HTML that produced it. Critically, the DOM isn't a static snapshot: JavaScript can read it and change it, and the browser redraws the page immediately to match. This is the mechanism behind every dynamic web page you've ever used.

Three DOM methods cover most of what you'll do at first:

- **`document.querySelector(selector)`** — finds the first element matching a CSS selector (`"#greet"`, `".btn-primary"`, `"h1"`) and returns it.
- **`element.textContent = "..."`** — sets an element's visible text. Prefer this over `innerHTML` when you're just setting text — Lesson 12 covers why `innerHTML` with untrusted input is a real security risk (XSS).
- **`element.addEventListener("click", callback)`** — runs `callback` every time the element is clicked. `"click"` is the most common event, but the same pattern works for `"input"`, `"submit"`, `"keydown"`, and dozens more.

<figure class="lesson-figure" role="img" aria-label="Diagram of the DOM update loop: a click event triggers an event listener callback, which updates the DOM, which the browser then redraws">
  <svg viewBox="0 0 640 140" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-body);">
    <text x="0" y="16" font-size="11" fill="var(--ink-faint)" font-family="var(--font-mono)">HOW A CLICK BECOMES A CHANGE ON SCREEN</text>
    <rect x="0" y="40" width="140" height="56" rx="6" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <text x="70" y="64" font-size="11.5" text-anchor="middle" fill="var(--ink)">Click</text>
    <text x="70" y="80" font-size="11.5" text-anchor="middle" fill="var(--ink)">event</text>
    <rect x="175" y="40" width="150" height="56" rx="6" fill="var(--accent-gold-soft)" stroke="var(--accent-gold)" stroke-width="1.5"/>
    <text x="250" y="64" font-size="11.5" text-anchor="middle" fill="var(--ink)" font-weight="600">Event listener</text>
    <text x="250" y="80" font-size="11.5" text-anchor="middle" fill="var(--ink)" font-weight="600">callback runs</text>
    <rect x="360" y="40" width="140" height="56" rx="6" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <text x="430" y="64" font-size="11.5" text-anchor="middle" fill="var(--ink)">DOM</text>
    <text x="430" y="80" font-size="11.5" text-anchor="middle" fill="var(--ink)">updates</text>
    <rect x="535" y="40" width="105" height="56" rx="6" fill="var(--accent-sage-soft)" stroke="var(--accent-sage)" stroke-width="1.5"/>
    <text x="587" y="64" font-size="11.5" text-anchor="middle" fill="var(--ink)" font-weight="600">Browser</text>
    <text x="587" y="80" font-size="11.5" text-anchor="middle" fill="var(--ink)" font-weight="600">redraws</text>
    <line x1="140" y1="68" x2="175" y2="68" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <line x1="325" y1="68" x2="360" y2="68" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <line x1="500" y1="68" x2="535" y2="68" stroke="var(--ink-soft)" stroke-width="1.5"/>
  </svg>
  <figcaption>Every interactive page runs this same loop underneath — Vue and React (Lesson 8) just automate the "DOM updates" step for you, watching your data instead of making you call textContent by hand.</figcaption>
</figure>

## Technology

Here's everything above working together — a button that counts its own clicks:

```html
<button id="counter">Clicked 0 times</button>

<script>
  let clicks = 0;
  const button = document.querySelector("#counter");

  button.addEventListener("click", () => {
    clicks++;
    button.textContent = `Clicked ${clicks} times`;
  });
</script>
```

Walk through it in order: `clicks` is a variable holding state, `querySelector` finds the real element on the page, `addEventListener` registers a function to run on every click, and each time it runs, the function updates both the variable and the DOM. State, a selector, a listener, an update — that pattern is the backbone of interactive JavaScript, whether it's eight lines like this or a production Vue app with most of the wiring automated away.

A few starting points worth bookmarking as you experiment:

- [MDN Web Docs: JavaScript basics](https://developer.mozilla.org/en-US/docs/Web/JavaScript) — the standard, authoritative reference for JavaScript.
- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) — a deeper look at the tree structure behind every page.
- [W3Schools JavaScript Tryit Editor](https://www.w3schools.com/js/tryit.asp?filename=tryjs_intro) — a live sandbox for quick experiments.

## Soft Skills

- **Test in small steps.** Change one thing, run it, look at the result — don't write fifty lines before running any of them. When something breaks, you'll know exactly which line caused it.
- **Read error messages fully.** "Cannot read properties of null" almost always means `querySelector` didn't find anything — double-check the selector, and make sure the element actually exists in the HTML by the time your script runs.
- **Use `console.log()` liberally** while you're learning. Printing a variable's value at each step is the fastest way to see what your code is actually doing, as opposed to what you assumed it was doing. (Lesson 9 goes deeper on the browser's debugging tools.)

## Try It

Use the playground below — no account or setup needed. Start by changing what happens after 5 clicks, then try adding a second button with its own `addEventListener`, or a Reset button that sets `clicks` back to `0`.

## Recap

- JavaScript adds behavior to a page: variables store data, operators and conditionals make decisions, loops repeat work, and functions package logic for reuse.
- `let` / `const` replaced `var` in modern code; `===` avoids the surprises of `==`'s implicit type conversion.
- The DOM is the browser's live model of the page — `querySelector`, `textContent`, and `addEventListener` cover most day-to-day work.
- Event → listener → DOM update → redraw is the core loop behind every interactive webpage, including the frameworks built on top of it.
