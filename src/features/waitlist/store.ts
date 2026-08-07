import "server-only";

import type { WaitlistInput } from "@/features/waitlist/schema";
import { getSql } from "@/lib/db";

export interface WaitlistEntry extends WaitlistInput {
  userAgent: string | null;
}

/**
 * Persist a founding artist and return the place they were given.
 *
 * Idempotent by email: submitting twice returns the *same* founder number
 * rather than creating a duplicate or erroring. An artist who resubmits because
 * they were unsure it worked should be reassured, not punished — and their
 * place must not silently move.
 *
 * `ON CONFLICT ... DO UPDATE` (rather than `DO NOTHING`) is deliberate: it
 * makes the statement always return a row, so we never need a second round trip
 * to find out what number an existing artist holds.
 *
 * All values are passed as tagged-template parameters, so they are sent to
 * Postgres as bound parameters and cannot be interpolated into SQL text —
 * this is not string concatenation, and it is not vulnerable to injection.
 */
export async function saveWaitlistEntry(
  entry: WaitlistEntry
): Promise<{ founderNumber: number }> {
  const sql = getSql();

  const rows = (await sql`
    insert into waitlist_entries (name, email, role, practice, city, user_agent)
    values (
      ${entry.name},
      ${entry.email},
      ${entry.role},
      ${entry.practice ?? null},
      ${entry.city || null},
      ${entry.userAgent}
    )
    on conflict (email) do update
      set name     = excluded.name,
          role     = excluded.role,
          practice = excluded.practice,
          city     = excluded.city
    returning founder_number
  `) as { founder_number: number | string }[];

  // Postgres bigint arrives as a string in some driver configurations.
  return { founderNumber: Number(rows[0].founder_number) };
}

/**
 * Cities that already have at least one founding artist.
 *
 * Returns city names only — no names, no emails, nothing that identifies an
 * individual. A map that leaked "who joined from where" would be a privacy
 * problem dressed up as a feature.
 */
export async function listLitCities(): Promise<string[]> {
  try {
    const sql = getSql();
    const rows = (await sql`
      select distinct city from waitlist_entries
      where city is not null and city <> ''
    `) as { city: string }[];
    return rows.map((row) => row.city);
  } catch (error) {
    console.error("[waitlist] Could not read lit cities", error);
    return [];
  }
}

/**
 * How many places are already taken.
 *
 * Returns 0 when the database is unreachable or unconfigured: the join page
 * must still render. An unlit wall is the honest default here, and it is the
 * design we chose anyway.
 */
export async function countWaitlistEntries(): Promise<number> {
  try {
    const sql = getSql();
    const rows = (await sql`
      select count(*)::int as count from waitlist_entries
    `) as { count: number }[];
    return rows[0]?.count ?? 0;
  } catch (error) {
    console.error("[waitlist] Could not read roster count", error);
    return 0;
  }
}
