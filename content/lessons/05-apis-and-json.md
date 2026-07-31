# APIs & JSON: How Applications Talk to Each Other

*Building Blocks · About 50 minutes*

<div class="lesson-audio">
  <audio controls preload="metadata" src="../../audio/05.mp3">
    Your browser does not support the audio element.
  </audio>
  <span class="lesson-audio__label">Lesson overview · ~75 sec</span>
</div>

## Where we're headed

Nearly every app you use talks to at least one other system behind the scenes — checking a weather forecast, loading a friend's profile, processing a payment. This lesson covers the pattern that makes that possible.

## Concepts & Terminology

An **API (Application Programming Interface)** is, at its simplest, a way for one piece of software to request information or action from another. You can think of it as being like a webpage — except instead of returning a visual page for a human, it returns structured data for a program to use. APIs power single-page applications talking to their own servers, and they power entirely separate systems talking to each other (server-to-server).

**JSON (JavaScript Object Notation)** is the data format most APIs speak. It's readable by humans and easy to parse by machines, and despite the name, it's used far beyond JavaScript — for configuration files, for database storage, and as the universal language of data exchange between systems. If data isn't sitting in a database, there's a good chance it's sitting in a JSON file.

A JSON example:

```json
{
  "students": [
    { "firstName": "Rivka", "lastName": "Klein" },
    { "firstName": "Tova", "lastName": "Berman" },
    { "firstName": "Leah", "lastName": "Adler" }
  ]
}
```

## Technology

**Postman** is a widely used tool for exploring and testing APIs without writing any code — you can send a request to an API endpoint and inspect exactly what comes back. It's an excellent way to understand an API before you start writing code that depends on it. (Postman itself now asks you to sign in for its full desktop app — the request tester below gives you the same core idea, right on this page, with no account needed.)

Try it below: pick a preset or paste any public API URL, send a `GET` request, and look at the response — notice the structure, the status code, and how it maps to the JSON pattern above.

## Soft Skills

APIs are also a lesson in professional communication — a well-designed API is, in a sense, a promise to everyone who uses it. A few principles that apply just as much to human collaboration as to API design:

- Be predictable. Consistent naming and structure let other people (and your future self) guess correctly instead of guessing wrong.
- Document what you build. An API without documentation is a locked door with no sign on it.
- Version thoughtfully. Changing behavior out from under people who depend on you erodes trust fast — in software and in teams.

## Try It

Using the request tester above, fetch `https://jsonplaceholder.typicode.com/todos/1` and identify: the HTTP status code returned, and the field names in the JSON response.

## Recap

- An API lets software request data or trigger actions in another system.
- JSON is the common data format behind most modern APIs.
- Postman is a practical tool for exploring an API before writing code against it.
- Predictable structure and good documentation make an API (and a teammate) trustworthy.
