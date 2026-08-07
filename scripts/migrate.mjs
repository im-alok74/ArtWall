/**
 * Apply SQL migrations in db/migrations, in filename order.
 *
 * Deliberately tiny: this project has one table and no need for a migration
 * framework's ceremony. Applied migrations are recorded in `_migrations`, so
 * re-running is safe and only new files execute.
 *
 * Usage:  node --env-file=.env scripts/migrate.mjs
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

import { neon } from "@neondatabase/serverless";

const DIR = join(import.meta.dirname, "..", "db", "migrations");

if (!process.env.DATABASE_URL) {
  console.error(
    "DATABASE_URL is not set. Run with:  node --env-file=.env scripts/migrate.mjs"
  );
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

await sql`
  create table if not exists _migrations (
    name       text primary key,
    applied_at timestamptz not null default now()
  )
`;

const applied = new Set(
  (await sql`select name from _migrations`).map((row) => row.name)
);

const files = (await readdir(DIR)).filter((f) => f.endsWith(".sql")).sort();
let count = 0;

for (const file of files) {
  if (applied.has(file)) {
    console.log(`· ${file} (already applied)`);
    continue;
  }

  const statements = (await readFile(join(DIR, file), "utf8"))
    // Strip full-line comments so they cannot swallow a statement.
    .replace(/^\s*--.*$/gm, "")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await sql.query(statement);
  }

  await sql`insert into _migrations (name) values (${file})`;
  console.log(`✓ ${file}`);
  count += 1;
}

console.log(
  count === 0 ? "Nothing to apply." : `Applied ${count} migration(s).`
);
