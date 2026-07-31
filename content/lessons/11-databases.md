# Databases: SQL, NoSQL & Managed Services

*Going Deeper · About 55 minutes*

<div class="lesson-audio">
  <audio controls preload="metadata" src="../../audio/11.mp3">
    Your browser does not support the audio element.
  </audio>
  <span class="lesson-audio__label">Lesson overview · ~75 sec</span>
</div>

## Where we're headed

Every application that stores data beyond a single session needs a database. This lesson covers the two dominant families of databases — relational and non-relational — how to query them, and the managed services that let you get a production-grade database running in minutes without managing a server.

## Concepts & Terminology

### Relational Databases and SQL

A **relational database** stores data in **tables** — named, structured grids with rows and columns, similar to a spreadsheet but designed for fast, precise querying at scale. Each table holds one type of entity: a `users` table holds users, an `orders` table holds orders.

Key concepts:

- **Row** — one record (one user, one order, one product).
- **Column** — one field, with a defined data type (text, number, date, boolean).
- **Primary key** — a column (usually `id`) that uniquely identifies each row. Every table should have one.
- **Foreign key** — a column that holds the primary key of a row in *another* table, creating a relationship. An `orders` table might have a `user_id` column pointing back to the `users` table.

**SQL (Structured Query Language)** is the standard language for working with relational databases. The four core operations map directly onto CRUD:

```sql
-- SELECT: retrieve rows
SELECT first_name, email FROM users WHERE active = true;

-- INSERT: add a new row
INSERT INTO users (first_name, email) VALUES ('Rivka', 'rivka@example.com');

-- UPDATE: modify existing rows
UPDATE users SET email = 'new@example.com' WHERE id = 42;

-- DELETE: remove rows
DELETE FROM users WHERE id = 42;
```

### JOINs

The power of a relational database is the ability to query across related tables. A **JOIN** combines rows from two tables where a condition is met — typically where a foreign key matches a primary key:

```sql
SELECT users.first_name, orders.total
FROM orders
JOIN users ON orders.user_id = users.id
WHERE orders.total > 100;
```

This returns every order over $100, with the first name of the user who placed it — even though that data lives in two separate tables.

### Indexes

An **index** is a data structure that makes a specific query faster, similar to the index at the back of a book. Without an index, the database reads every row to find a match; with one, it jumps directly to the matching rows. Primary keys are indexed automatically. For columns you query often — especially foreign keys — adding an index can make a significant performance difference.

### NoSQL: A Different Model

**NoSQL databases** (sometimes called "document databases") store data as flexible JSON-like documents rather than fixed-schema tables. There is no requirement that every record have the same shape, which makes them useful for data that varies record-to-record or evolves quickly.

The tradeoff: document databases give up some of the query power and consistency guarantees of relational databases in exchange for that flexibility. A few rules of thumb:

- **Use SQL** when your data is structured and relational — users, orders, inventory — and when consistency matters.
- **Use NoSQL** when your data is document-like, schema-less, or highly variable — user-generated content, product catalogs with wildly different attributes, real-time event streams.

Most real-world applications use one or both, depending on what each part of the system needs.

## Technology

You don't need to run your own database server to have a production-grade database. Managed database services handle the server, backups, scaling, and security for you:

- **Supabase** — an open-source backend built on PostgreSQL (a popular open-source SQL database). Gives you a database, a REST API, real-time subscriptions, and authentication out of the box. Generous free tier; this course's data store uses it.
- **PlanetScale** — MySQL-compatible, designed for large-scale applications with a branching workflow that makes schema changes safer.
- **Neon** — serverless PostgreSQL; scales to zero when not in use, bills only for actual usage.
- **Firebase Firestore** — Google's NoSQL document database with real-time sync built in; well suited to mobile apps and dashboards that need live updates.

For a new project on a student budget, Supabase or Firebase are the natural starting points.

## Soft Skills

Database decisions are some of the hardest to reverse later:

- Choose a schema carefully. Adding a column is easy; restructuring a table that millions of rows already depend on is not.
- Write migrations — versioned scripts that modify the database schema — so every change is tracked and reproducible, the same way Git tracks code changes.
- Never store sensitive data (passwords, payment numbers) in plain text. Passwords are hashed; payment processing is delegated to a service like Stripe rather than stored at all.
- Back up before you run any `UPDATE` or `DELETE` without a `WHERE` clause. `DELETE FROM users;` with no filter deletes every user. In production, that kind of mistake can end a job.

## Try It

The interactive below lists database operations — classify each one as SELECT, INSERT, UPDATE, or DELETE.

## Recap

- Relational databases store data in tables linked by primary and foreign keys; SQL is the language for querying them.
- The four core SQL operations — SELECT, INSERT, UPDATE, DELETE — map directly onto CRUD.
- JOINs let you query across related tables in a single operation.
- NoSQL databases trade relational structure for schema flexibility; use each where it fits the data.
- Managed services (Supabase, Neon, Firebase) provide production-grade databases without server management.
