# The Developer Toolkit: Git Workflows, Markdown & npm

*Building Blocks · About 45 minutes*

## Where we're headed

This lesson rounds out your everyday toolkit with two things you'll use constantly: Markdown, for writing readable documentation, and npm, for installing and managing code other people have already written.

## Concepts & Terminology

**Markdown** is a lightweight way to format text using plain, readable symbols instead of a word processor's toolbar — `#` for a heading, `**bold**` for bold text, `- ` for a bullet list. It converts cleanly into styled HTML, which is exactly why it's the standard format for documentation across the developer world. (This entire course, in fact, is written in Markdown.)

A **README file** is the Markdown document that greets anyone who opens a code repository — explaining what the project is, how to run it, and how to contribute. A clear README is often the single highest-leverage piece of writing a developer produces, because it's the first thing every future collaborator (including a future version of you) will read.

**npm (Node Package Manager)** is two things at once: the world's largest registry of open-source JavaScript packages, and the command-line tool used to install and manage them in a project. Instead of writing every piece of functionality from scratch, developers routinely install a well-tested package that already solves the problem.

## Technology

A few npm commands you'll use often:

```bash
npm init -y          # start a new project with a default package.json
npm install express  # add a package to your project
npm list              # see what's installed
```

Every npm project keeps track of its installed packages in a `package.json` file — think of it as a packing list for your project, so anyone who clones your repository can run one command (`npm install`) and get the exact same set of tools you were using.

Try writing a short README for a real or imaginary project, using at least a heading, a bulleted list, and a fenced code block like the one above. VS Code will render it for you as you type — open the file and use the built-in Markdown preview to see it rendered live.

## Soft Skills

Documentation is a form of communication with your future collaborators, and that includes future-you. A few habits worth building now:

- Write the README *before* you consider a project "done" — not as an afterthought.
- Keep commit messages and documentation in plain, specific language: "Fix login redirect bug" tells a future reader far more than "fix stuff."
- When you install a new package, take thirty seconds to skim its README. It will save you far more than thirty seconds later.

## Try It

Use the live editor below to draft a README — no account needed. Include a one-sentence description, a "how to run this" section, and a short list of technologies used, and watch it render as you type.

## Recap

- Markdown is a plain-text formatting standard used throughout the developer world, especially for documentation.
- A good README is one of the most valuable things a developer can write.
- npm is both a package registry and the tool used to install and manage those packages.
- `package.json` records exactly which packages a project depends on.
