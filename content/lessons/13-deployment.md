# Deployment: Taking Your App Live

*Finishing Strong · About 50 minutes*

<div class="lesson-audio">
  <audio controls preload="metadata" src="../../audio/13.mp3">
    Your browser does not support the audio element.
  </audio>
  <span class="lesson-audio__label">Lesson overview · ~75 sec</span>
</div>

## Where we're headed

Building an app on your laptop is one thing. Making it available to anyone with a browser — reliably, securely, and at whatever scale it needs — is a different skill set. This lesson covers the full journey from local code to live URL: choosing the right hosting platform, managing secrets in production, automating your deploy pipeline, and knowing what to watch once things are running.

## Concepts & Terminology

### Static vs. Server Hosting

The first deployment decision is whether your app needs a server process running at all times.

**Static hosting** serves pre-built HTML, CSS, and JavaScript files. There is no server-side code — the browser downloads the files and runs everything. This course's site is an example: it's plain HTML, CSS, and JavaScript with no Node process behind it.

**Server (dynamic) hosting** runs a process — a Node.js app, a Python API, a Next.js server — that handles requests at runtime. You need this for anything that executes code on each request: a REST API, server-side rendering, database queries, scheduled jobs.

The practical rule: if you can `npm run build` and get a folder of files, use static hosting. If you have an `app.listen()` or similar server process, use server hosting.

### Static Hosting Platforms

- **GitHub Pages** — free hosting for public repos, served directly from a branch. No build step in the simplest form; supports custom domains. Great for course projects and portfolios.
- **Netlify** — static hosting with a generous free tier, automatic deploys from GitHub, form handling, and serverless functions if you need a little backend logic.
- **Vercel** — optimized for Next.js but works for any static site or serverless API. Extremely fast edge network; generous free tier.

All three provide HTTPS automatically.

### Server Hosting Platforms

- **Render** — runs Node.js, Python, Ruby, and other server processes. Free tier for web services (with a cold-start delay on inactivity); straightforward dashboard. Good first choice for a full-stack app.
- **Railway** — similar to Render; developer-friendly with a project-based dashboard. Easy to add a managed database alongside your app.
- **Fly.io** — deploys containerized apps globally; more control, slightly steeper learning curve. Good for apps that need to run in a specific region or need persistent volumes.

### Environment Variables in Production

Your `.env` file stays on your laptop — it never gets deployed. Every hosting platform has a dashboard (or CLI) for setting environment variables in production:

- In Render: **Dashboard → your service → Environment → Add environment variable**
- In Netlify: **Site settings → Build & deploy → Environment variables**
- In Vercel: **Project settings → Environment variables**

Set the same variables your `.env` defines — `DATABASE_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, etc. — through the dashboard. The running process reads them the same way: `process.env.DATABASE_URL`.

Never upload a `.env` file to a server or commit it to a repository.

### Build Steps

Many projects require a **build step** before deployment: a command that transforms source code into the files a server or browser actually runs. Common examples:

```bash
npm run build          # React, Vue, Vite projects — compiles JSX/TS/SCSS into plain JS/CSS
npm run build:css      # Tailwind CSS — purges unused styles for a smaller bundle
tsc                    # TypeScript compiler — converts .ts files to .js
```

The output is usually a `dist/` or `build/` folder. That folder is what you deploy — not your source files.

For static hosting (Netlify, Vercel), you tell the platform what build command to run and which folder to publish; it runs the build automatically on every push. For server hosting (Render, Railway), you typically deploy the whole repo and specify a start command (`node server.js` or `npm start`).

### CI/CD: Automated Pipelines

**CI/CD** stands for Continuous Integration / Continuous Deployment. In practice it means: every time you push code, an automated pipeline runs your tests and, if they pass, deploys the updated app.

The most common tool is **GitHub Actions** — a YAML file in `.github/workflows/` that defines what to do on each push:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
      - run: npm run build
      # Deploy step depends on your hosting platform
```

Most platforms (Netlify, Vercel, Render) also offer direct GitHub integration that triggers a deploy on every push without you writing the YAML yourself — often the right starting point.

<figure class="lesson-figure" role="img" aria-label="Diagram of a CI/CD pipeline: a push to GitHub triggers automated tests; if they pass the app is built and deployed, and if they fail the pipeline stops before anything reaches production">
  <svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-body);">
    <text x="0" y="16" font-size="11" fill="var(--ink-faint)" font-family="var(--font-mono)">A TYPICAL CI/CD PIPELINE</text>
    <rect x="0" y="40" width="130" height="50" rx="6" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <text x="65" y="70" font-size="12" text-anchor="middle" fill="var(--ink)">git push</text>
    <rect x="185" y="40" width="130" height="50" rx="6" fill="var(--accent-gold-soft)" stroke="var(--accent-gold)" stroke-width="1.5"/>
    <text x="250" y="70" font-size="12" text-anchor="middle" fill="var(--ink)" font-weight="600">Run tests</text>
    <rect x="370" y="40" width="120" height="50" rx="6" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <text x="430" y="70" font-size="12" text-anchor="middle" fill="var(--ink)">Build</text>
    <rect x="530" y="40" width="110" height="50" rx="6" fill="var(--accent-sage-soft)" stroke="var(--accent-sage)" stroke-width="1.5"/>
    <text x="585" y="70" font-size="12" text-anchor="middle" fill="var(--ink)" font-weight="600">Deploy</text>
    <line x1="130" y1="65" x2="185" y2="65" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <line x1="315" y1="65" x2="370" y2="65" stroke="var(--accent-sage)" stroke-width="1.5"/>
    <text x="322" y="58" font-size="9.5" fill="var(--accent-sage)">pass</text>
    <line x1="490" y1="65" x2="530" y2="65" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <path d="M250,90 L250,140" fill="none" stroke="var(--accent-berry)" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="258" y="118" font-size="9.5" fill="var(--accent-berry)">fail</text>
    <rect x="150" y="140" width="200" height="36" rx="6" fill="var(--accent-berry-soft)" stroke="var(--accent-berry)" stroke-width="1.5"/>
    <text x="250" y="163" font-size="11" text-anchor="middle" fill="var(--accent-berry)">pipeline stops here — nothing deploys</text>
  </svg>
  <figcaption>Running tests before build and deploy is the entire point of CI/CD: a broken change never reaches production, because the pipeline stops on failure instead of continuing anyway.</figcaption>
</figure>

### Custom Domains

Deploying to Netlify gives you a URL like `hungry-babbage-abc123.netlify.app`. Connecting your own domain requires two steps:

1. **Add the domain to the platform** — in the hosting dashboard, add your custom domain. The platform will give you a DNS record to set.
2. **Update DNS** — in your domain registrar (Namecheap, Google Domains, Cloudflare, etc.), add the record the platform specifies. Usually a `CNAME` pointing to the platform's domain, or an `A` record pointing to its IP address.

DNS changes propagate in minutes to hours. HTTPS certificates provision automatically once the domain resolves correctly.

### Monitoring and Logs

After deploying, three things to watch:

- **Logs** — every hosting platform exposes your server's stdout/stderr. Check logs immediately after a deploy to confirm the process started cleanly.
- **Error tracking** — services like **Sentry** (free tier available) catch unhandled exceptions in production and show you the stack trace, the user's browser, and the request that triggered it — far more useful than a generic "something went wrong" report.
- **Uptime monitoring** — tools like **UptimeRobot** ping your app every few minutes and alert you if it stops responding. Free tier covers several endpoints.

## Technology

| Task | Tool |
|------|------|
| Static hosting | Netlify, Vercel, GitHub Pages |
| Server hosting | Render, Railway, Fly.io |
| CI/CD pipeline | GitHub Actions |
| Error tracking | Sentry |
| Uptime monitoring | UptimeRobot |
| Managed database | Supabase, Neon, PlanetScale (from Lesson 11) |

## Soft Skills

Deployment is where confidence meets discipline:

- **Staging before production** — maintain a separate staging environment that mirrors production. Deploy there first, test it, then promote to production. The cost of an extra environment is far less than the cost of debugging a broken production app.
- **Don't deploy on Fridays** — a reliable industry heuristic. If a deploy breaks something Friday evening, your weekend is gone and your users are affected until Monday. Deploy early in the week when the team is available to respond.
- **Roll back fast, investigate later** — if a deploy breaks something, revert first and ask questions second. Every platform has a one-click rollback or previous-deploy list. Restoring service is the priority; understanding the root cause can wait until things are stable.
- **Automate as early as possible** — manual deploy steps get skipped under pressure. A CI/CD pipeline that runs tests before every deploy catches regressions that a rushed manual process misses.
- **Read the logs before you declare success** — a successful deploy notification means the platform accepted your code; it does not mean your app is running correctly. Check the logs.

## Try It

The interactive below lists tools, commands, and scenarios — classify each as Static Hosting, Server Hosting, CI/CD, or Environment Config.

## Recap

- Static hosting serves pre-built files; server hosting runs a process. Match the platform to your app.
- Netlify, Vercel, and GitHub Pages cover most static needs. Render and Railway are the easiest starting points for full-stack apps.
- Production environment variables go in the hosting platform's dashboard — never in a committed file.
- A build step (`npm run build`) transforms source code into deployable output; most platforms run it automatically.
- CI/CD pipelines (GitHub Actions) automate testing and deployment on every push.
- After deploying: read the logs, set up error tracking, and add uptime monitoring before you call it done.
