# Requirements Gathering: From Idea to Spec

*Finishing Strong · About 45 minutes*

<div class="lesson-audio">
  <audio controls preload="metadata" src="../../audio/15.mp3">
    Your browser does not support the audio element.
  </audio>
  <span class="lesson-audio__label">Lesson overview · ~75 sec</span>
</div>

## Where we're headed

An early lesson introduced requirements gathering as an ongoing conversation, not a one-time meeting. Now that you've built real pieces of a full stack application, this lesson gives it the depth it deserves: the frameworks that turn "build me a sign-up page" into something a developer can actually build and a stakeholder can actually sign off on — and the habits that keep a project from quietly drifting off course.

## Concepts & Terminology

Vague requirements are expensive in a specific, predictable way: a misunderstanding caught in a five-minute conversation costs five minutes. The same misunderstanding, discovered after a feature is built, costs the build time, the rework, and — often worse — the trust of whoever was waiting on it. Requirements gathering is the discipline of catching that misunderstanding early, on purpose.

### Cards, conversations, confirmation

A useful shorthand for the ongoing nature of requirements work:

- **Cards** capture a requirement briefly enough to fit on an index card or sticky note — just enough to remember what to talk about, not a full specification.
- **Conversations** fill in the detail a card can't hold: edge cases, constraints, who actually uses this, what happens when it fails.
- **Confirmation** checks that everyone — developer, designer, and stakeholder — agreed on the same thing, usually by defining what "done" concretely looks like.

### Functional vs. non-functional requirements

A **functional requirement** describes something the system *does*: "Users can reset their password by email." A **non-functional requirement** describes a quality the system must *have* while doing it: "Password reset emails arrive within 60 seconds," or "The login page loads in under 2 seconds on a typical connection." Teams routinely nail the functional requirements and quietly skip the non-functional ones — and then get surprised when a technically-correct feature is too slow, too fragile, or too confusing to actually use.

### User stories and INVEST

A **user story** is a short, structured way to write a requirement from the user's point of view:

> As a **[type of user]**, I need **[some capability]**, so that **[some benefit]**.

The "so that" clause matters more than it looks — it's the actual goal, and it gives the developer room to propose a better solution than the one literally requested. A well-formed story is often checked against the **INVEST** criteria: **I**ndependent (doesn't depend on another story being built first), **N**egotiable (a conversation starter, not a locked contract), **V**aluable (delivers something a user or the business actually cares about), **E**stimable (a developer can roughly size the effort), **S**mall (fits in a single work session or sprint), and **T**estable (there's a clear way to check it's done).

### Acceptance criteria

**Acceptance criteria** are the specific, testable conditions that confirm a story is actually finished. A common format borrowed from behavior-driven development:

```
Given a registered user on the login page
When they enter a valid email and an incorrect password
Then they see "Incorrect password" and remain on the login page
```

Given / When / Then forces the vague ("login should handle errors well") into the concrete (exactly what error, exactly when, exactly what the user sees) — which is what makes a story testable in the first place.

### Prioritizing with MoSCoW

Not every requirement matters equally, and pretending otherwise is how small projects grow unmanageable scope. **MoSCoW** sorts requirements into four buckets:

- **Must have** — the project fails without it.
- **Should have** — important, but the project survives without it at launch.
- **Could have** — nice to have if time allows; the first thing cut under a deadline.
- **Won't have (this time)** — explicitly out of scope, so it stops resurfacing in every conversation.

<figure class="lesson-figure" role="img" aria-label="Diagram of the cards, conversations, confirmation cycle for gathering requirements">
  <svg viewBox="0 0 640 140" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-body);">
    <text x="0" y="16" font-size="11" fill="var(--ink-faint)" font-family="var(--font-mono)">HOW A REQUIREMENT GETS SHARPER OVER TIME</text>
    <rect x="10" y="40" width="180" height="56" rx="6" fill="var(--paper)" stroke="var(--line)" stroke-width="1.5"/>
    <text x="100" y="64" font-size="12" text-anchor="middle" fill="var(--ink)" font-weight="600">Card</text>
    <text x="100" y="80" font-size="10" text-anchor="middle" fill="var(--ink-faint)">"users need to reset passwords"</text>
    <rect x="230" y="40" width="180" height="56" rx="6" fill="var(--accent-gold-soft)" stroke="var(--accent-gold)" stroke-width="1.5"/>
    <text x="320" y="64" font-size="12" text-anchor="middle" fill="var(--ink)" font-weight="600">Conversation</text>
    <text x="320" y="80" font-size="10" text-anchor="middle" fill="var(--ink)">email link? security questions?</text>
    <rect x="450" y="40" width="180" height="56" rx="6" fill="var(--accent-sage-soft)" stroke="var(--accent-sage)" stroke-width="1.5"/>
    <text x="540" y="64" font-size="12" text-anchor="middle" fill="var(--ink)" font-weight="600">Confirmation</text>
    <text x="540" y="80" font-size="10" text-anchor="middle" fill="var(--ink)">acceptance criteria, signed off</text>
    <line x1="190" y1="68" x2="230" y2="68" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <line x1="410" y1="68" x2="450" y2="68" stroke="var(--ink-soft)" stroke-width="1.5"/>
  </svg>
  <figcaption>The same requirement gets sharper at each stage — a card is a reminder to talk, a conversation surfaces the real constraints, and confirmation locks down what "done" means before anyone writes code.</figcaption>
</figure>

## Technology

**GitHub Issues** (Lesson 1) is often the only requirements tool a small team needs: a title (the card), a description and comment thread (the conversation), and a checklist of acceptance criteria that gets checked off (confirmation). A well-written issue might look like:

```markdown
### User story
As a returning customer, I need to reset my forgotten password,
so that I can log back into my account without contacting support.

### Acceptance criteria
- [ ] "Forgot password?" link sends a reset email within 60 seconds
- [ ] Reset link expires after 30 minutes
- [ ] User sees a confirmation message after successfully resetting
```

As a team and its backlog grow, dedicated tools like **Jira**, **Linear**, or **Notion** add features GitHub Issues doesn't — sprint planning, custom workflows, reporting — but the underlying discipline (a clear story, explicit acceptance criteria, a visible priority) is identical no matter which tool holds it.

## Soft Skills

- **Ask "why," not just "what."** A stakeholder asking for a specific button is really asking to solve a problem — understanding the problem sometimes reveals a simpler solution than the one requested.
- **Write requirements that are testable.** "The app should be fast" can't be verified by anyone. "The homepage loads in under 2 seconds on a standard connection" can.
- **Protect scope deliberately.** New ideas during a project are normal — write them down as a new card for later (or mark them "Won't have this time") rather than silently expanding the work already in progress.
- **Get sign-off in writing**, even informally. A comment on a GitHub issue counts. Verbal agreements are remembered differently by everyone in the room, and that gap surfaces at the worst possible time — after the feature is built.

## Try It

The interactive below lists small feature requests for a hypothetical class sign-up app — sort each one using MoSCoW.

## Recap

- Requirements gathering is continuous: cards start the conversation, conversations surface detail, confirmation locks in what "done" means.
- Functional requirements describe what a system does; non-functional requirements describe the qualities it must have while doing it — both matter.
- User stories ("As a... I need... so that...") checked against INVEST, plus Given/When/Then acceptance criteria, turn a vague idea into something testable.
- MoSCoW (Must/Should/Could/Won't) prioritizes requirements honestly instead of treating everything as equally urgent.
