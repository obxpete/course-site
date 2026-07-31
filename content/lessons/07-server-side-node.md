# The Server Side: Node.js & Express

*Going Deeper · About 55 minutes*

<div class="lesson-audio">
  <audio controls preload="metadata" src="../../audio/07.mp3">
    Your browser does not support the audio element.
  </audio>
  <span class="lesson-audio__label">Lesson overview · ~75 sec</span>
</div>

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

The sandbox below launches a real, running Node.js server in a new tab, pre-loaded with this code — no account or local setup required to edit and run it. (If you'd rather build it yourself step by step: `npm init -y`, then `npm install express`, then run `node server.js` — the sandbox is doing exactly that for you.)

From here, try adding a second route that returns a small JSON object instead of plain text — that's the shape almost every real API takes.

### Middleware

**Middleware** is a function that runs between receiving a request and sending a response. The `app.use()` calls at the top of most Express files are middleware — they can parse request bodies, log activity, check authentication, compress responses, and more. Middleware functions run in order; each one calls `next()` to pass control to the next function in the chain, or sends a response early to short-circuit it.

```javascript
app.use(express.json());            // parse JSON request bodies
app.use((req, res, next) => {      // custom logging middleware
  console.log(`${req.method} ${req.url}`);
  next();
});
```

Understanding middleware is the key to reading real Express apps — most of the interesting behavior in a production server happens before the route handler ever runs.

## Soft Skills

Working on "the backend" tends to reward a specific kind of patience: errors are often less visible than in the browser, and debugging usually means reading logs carefully rather than watching something break on screen. A few habits that help:

- Read error messages fully before assuming what they mean — the actual problem is often further down the message than expected.
- Keep functions small and focused; a route handler that does five different things is five different places a bug can hide.
- Refactor early. Moving repeated code into its own module (a separate `.js` file you `require` elsewhere) keeps a growing project readable.

## Try It

In the sandbox, add a third route of your own, then visit it in the preview pane that opens alongside the editor to see the response.

## Recap

- Node.js runs JavaScript outside the browser, including on a server.
- Express is the standard framework for defining server routes on top of Node.js.
- Routes pair an HTTP action (GET, POST, PUT, DELETE) with a URL path.
- Small, focused functions and careful log-reading make backend debugging far more manageable.
