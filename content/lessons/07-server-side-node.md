# The Server Side: Node.js & Express

*Going Deeper · About 55 minutes*

## Where we're headed

Everything so far has run in the browser. This lesson introduces the other half of full stack development: code that runs on a server, handling requests before a browser ever sees them.

## Concepts & Terminology

**Node.js** lets you run JavaScript outside the browser — on a server, on your own laptop, anywhere. This is what makes JavaScript a genuine full stack language: the same syntax you used to make a webpage interactive can also power the server that webpage talks to.

**Express** is the most widely used framework for building a web server with Node.js. On its own, Node.js gives you the building blocks; Express gives you a clean, well-worn way to define **routes** — the specific URLs your server responds to, and what it does for each one (fetch data, save data, render a page).

A **route** typically corresponds to an action and a path, such as:

- `GET /users` — retrieve a list of users
- `POST /users` — create a new user
- `GET /users/:id` — retrieve one specific user

This `GET` / `POST` / `PUT` / `DELETE` vocabulary comes from HTTP itself, and you'll see it again in the next lesson on APIs.

## Technology

A minimal Express server:

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

To build this yourself:

1. In a Codespace terminal, run `npm init -y` to start a project.
2. Run `npm install express`.
3. Create `server.js` with the code above, then run `node server.js`.
4. Visit the forwarded port in your browser to see it respond.

From here, try adding a second route that returns a small JSON object instead of plain text — that's the shape almost every real API takes.

## Soft Skills

Working on "the backend" tends to reward a specific kind of patience: errors are often less visible than in the browser, and debugging usually means reading logs carefully rather than watching something break on screen. A few habits that help:

- Read error messages fully before assuming what they mean — the actual problem is often further down the message than expected.
- Keep functions small and focused; a route handler that does five different things is five different places a bug can hide.
- Refactor early. Moving repeated code into its own module (a separate `.js` file you `require` elsewhere) keeps a growing project readable.

## Try It

Extend the server above with a route at `/students` that responds with a small JSON array of two or three sample student names, using the same JSON structure from the previous lesson.

## Recap

- Node.js runs JavaScript outside the browser, including on a server.
- Express is the standard framework for defining server routes on top of Node.js.
- Routes pair an HTTP action (GET, POST, PUT, DELETE) with a URL path.
- Small, focused functions and careful log-reading make backend debugging far more manageable.
