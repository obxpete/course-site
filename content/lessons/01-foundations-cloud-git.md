# Foundations: Version Control, GitHub & the Cloud

*Foundations · About 50 minutes*

## Where we're headed

Before writing a single line of application code, every developer needs two things: a safety net for their work, and a shared understanding of where that work actually runs. This lesson covers both — version control with Git, and the basics of cloud computing.

## Concepts & Terminology

**Version control** is software for tracking every change made to a project over time. Instead of a folder full of files named `final`, `final-v2`, and `final-REALLY-final`, version control keeps a complete, searchable history of exactly what changed, when, and why.

**Git** is the version control system almost the entire industry has standardized on. It tracks changes locally on your machine as a series of **commits** — small, labeled snapshots of your project.

**GitHub** is a cloud-hosted home for Git repositories. Where Git tracks history, GitHub gives that history a place to live online, so it can be shared, backed up, and worked on by more than one person at a time. Pushing and pulling synchronize your local copy with the shared copy on GitHub; cloning downloads a full copy of someone else's repository so you can work with it too.

**Cloud computing** means running software and storing data on someone else's servers, accessed over the internet, rather than on hardware you own and maintain. It is less about *where* the computing physically happens and more about *how* you pay for and access it — on demand, and only for what you use, instead of buying and maintaining your own equipment.

Owning your own servers (sometimes called being **on-premises**) comes with real overhead most organizations would rather not manage directly: power, physical security, staffing, equipment refreshes, and real estate. Cloud providers absorb that overhead and resell computing capacity as a service.

## Technology

**GitHub Codespaces** gives you a full, cloud-hosted instance of Visual Studio Code — no local installation required. It's genuinely useful once you're working on a real, multi-file project, and to collaborate in real time with an instructor or classmate.

This is the one lesson in the course where trying things hands-on means creating a free account — Git and GitHub are the actual subject here. Every other lesson's "Try It" runs directly on this page with no sign-up at all.

Try it now (optional, but recommended for this lesson specifically):

1. Create a free account at [github.com](https://github.com) if you don't already have one.
2. Open any public repository and click the green **Code** button, then choose **Codespaces → Create codespace on main**.
3. Explore the interface — notice the file explorer, the built-in terminal, and the source control panel that shows you what's changed.

## Soft Skills

Working with distributed teams — often across time zones — is now a standard part of a developer's day. A little Git discipline goes a long way toward making that work smoothly:

- Commit early and often, with short, honest messages describing *why* a change was made, not just what changed.
- Pull before you push, so you're always building on the latest shared version of the project.
- Treat merge conflicts as a normal, expected part of collaboration — not a sign that something went wrong.

## Try It

Open a Codespace, create a new file called `notes.md`, write one sentence about something you learned today, and commit it with a message like `Add first lesson notes`. That's the entire Git workflow you'll repeat, in more sophisticated forms, for the rest of your career.

## Recap

- Version control (Git) tracks every change to a project as a history of commits.
- GitHub hosts that history in the cloud so teams can collaborate.
- Cloud computing is a way of accessing computing resources on demand, shifting overhead away from the organization using them.
- GitHub Codespaces gives you a complete cloud development environment in your browser.
