# APIs & JSON: How Applications Talk to Each Other

*Building Blocks · About 50 minutes*

<div class="lesson-audio">
  <audio controls preload="metadata" src="../../audio/05.mp3">
    Your browser does not support the audio element.
  </audio>
  <span class="lesson-audio__label">Lesson overview · ~75 sec</span>
</div>

## Where we're headed

Nearly every app you use talks to at least one other system behind the scenes — checking a weather forecast, loading a friend's profile, processing a payment. This lesson covers the pattern that makes that possible, and the practical realities — authentication, errors, and browser security — you'll hit the first time you use it for real.

## Concepts & Terminology

An **API (Application Programming Interface)** is, at its simplest, a way for one piece of software to request information or action from another. You can think of it as being like a webpage — except instead of returning a visual page for a human, it returns structured data for a program to use. APIs power single-page applications talking to their own servers, and they power entirely separate systems talking to each other (server-to-server).

**JSON (JavaScript Object Notation)** is the data format most APIs speak. It's readable by humans and easy to parse by machines, and despite the name, it's used far beyond JavaScript — for configuration files, for database storage, and as the universal language of data exchange between systems.

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

**Postman** is a widely used tool for exploring and testing APIs without writing any code — you can send a request to an API endpoint and inspect exactly what comes back. It's an excellent way to understand an API before you start writing code that depends on it. (The request tester below gives you the same core idea right on this page, with no account needed.)

Try it below: pick a preset or paste any public API URL, send a `GET` request, and look at the response — notice the structure, the status code, and how it maps to the JSON pattern above.

## HTTP Status Codes

Every API response includes a **status code** — a three-digit number that tells you whether your request succeeded or failed, and why. The ones you'll hit most often:

| Code | Meaning | Common cause |
|------|---------|--------------|
| 200 | OK | Success |
| 201 | Created | A new resource was saved |
| 400 | Bad Request | Your request was malformed — check the parameters |
| 401 | Unauthorized | Missing or invalid credentials — check your API key |
| 403 | Forbidden | Valid credentials, but not allowed to access this resource |
| 404 | Not Found | The URL or resource ID doesn't exist |
| 429 | Too Many Requests | You've hit the rate limit — slow down or wait |
| 500 | Server Error | The API itself is broken — not your fault, but handle it gracefully |

Reading the status code first saves a lot of debugging time. A `401` and a `404` require completely different fixes.

## API Authentication

Most real APIs require you to prove who you are before they'll return data. The two most common methods:

**API keys** — a long string the API provider gives you, sent with every request:

```
# As a query parameter (simpler, but the key shows up in URLs and logs)
https://api.example.com/data?api_key=YOUR_KEY_HERE

# As a request header (more secure — preferred)
Authorization: Bearer YOUR_KEY_HERE
```

**Bearer tokens** are exactly what they sound like: whoever holds ("bears") the token is granted access. They usually come from an authentication step — your app sends credentials, gets back a token, and includes that token in every subsequent request header.

Keep API keys out of your code — they belong in environment variables (a `.env` file), not committed to GitHub where anyone can find them.

## CORS: The Error You Will Hit

If you call a third-party API from browser JavaScript and see this in the console:

```
Access to fetch at 'https://api.example.com/data' from origin 'http://localhost:3000'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

That's **CORS (Cross-Origin Resource Sharing)** — a browser security rule that blocks pages on one domain from making requests to a different domain, unless that server explicitly permits it. The browser is working correctly; the API isn't configured to allow your origin.

The fix is almost always on the server side: either the API must send `Access-Control-Allow-Origin` headers (often configurable in the API provider's dashboard), or you route the request through your own backend instead of calling the API directly from the browser. Many public APIs already allow any origin — these work fine from a browser. Private APIs often do not.

## Chaining API Calls

Real applications often need one API response to feed into the next — you can't fetch a user's playlist until you know their user ID:

```javascript
async function getLatestPost(username) {
  // Step 1: get the user's ID
  const userRes = await fetch(`https://api.example.com/users/${username}`);
  const user = await userRes.json();

  // Step 2: use that ID to fetch their latest post
  const postRes = await fetch(`https://api.example.com/posts?userId=${user.id}`);
  const posts = await postRes.json();

  return posts[0];
}
```

`async/await` makes chained calls read like sequential steps instead of nested callbacks. Each `await` pauses until the response arrives before continuing. Check the status code at each step — a silent failure in step one will produce a confusing error in step two.

## Soft Skills

APIs are also a lesson in professional communication — a well-designed API is, in a sense, a promise to everyone who uses it. A few principles that apply just as much to human collaboration as to API design:

- Be predictable. Consistent naming and structure let other people (and your future self) guess correctly instead of guessing wrong.
- Document what you build. An API without documentation is a locked door with no sign on it.
- Version thoughtfully. Changing behavior out from under people who depend on you erodes trust fast — in software and in teams.

## Try It

Using the request tester above, fetch `https://jsonplaceholder.typicode.com/todos/1` and identify the HTTP status code and every field name in the JSON response. Then try `https://jsonplaceholder.typicode.com/todos/999` — notice both the status code and how the response body changes.

## Recap

- An API lets software request data or trigger actions in another system; JSON is the common data format.
- HTTP status codes (200, 401, 404, 429, 500) tell you exactly what happened with a request — read them first.
- API keys and Bearer tokens are the two most common authentication methods; keep them out of version control.
- CORS blocks browser-to-API requests unless the server permits it — route through your own backend when it doesn't.
- `async/await` makes chaining multiple API calls readable; check status codes at each step.
