# Requirements, Wireframes & Your First JavaScript

*Building Blocks · About 55 minutes*

## Where we're headed

This lesson pairs a deeper look at requirements gathering with your first hands-on JavaScript — the language that brings a webpage to life in the browser.

## Concepts & Terminology

Requirements gathering is rarely a one-time meeting; it's an ongoing conversation. A useful shorthand for that conversation is **cards, conversations, confirmation**:

- **Cards** capture a requirement briefly enough to fit on an index card or sticky note.
- **Conversations** fill in the detail a card can't hold on its own.
- **Confirmation** checks that everyone — developer, designer, and stakeholder — agreed on the same thing.

**Wireframing** continues to matter here: a two-dimensional sketch of a screen's layout, prioritizing space and content over visual design. It gives everyone a chance to walk through structure and functionality without getting distracted by colors or images, and often surfaces questions ("wait, where does this button actually go?") that would otherwise surface much later, and more expensively, in development.

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

Open a Codespace and create an `index.html` file with a `<script>` tag. Use `alert()` to display a personalized greeting, then try changing it to write the message onto the page instead, using `document.write()` or, better, by updating an element's content directly.

## Recap

- Requirements gathering is continuous: cards, conversations, confirmation.
- Wireframes clarify structure and functionality before visual design begins.
- JavaScript runs in the browser and makes web pages interactive.
- Good project habits (planning, documentation, continuous testing) compound over the life of a project.
