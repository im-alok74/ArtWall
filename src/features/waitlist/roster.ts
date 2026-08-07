import "server-only";

import { unstable_cache } from "next/cache";

import { countWaitlistEntries, listLitCities } from "@/features/waitlist/store";

export const ROSTER_TAG = "waitlist-roster";

/** Places held for the founding cohort. */
export const FOUNDING_COHORT_SIZE = 500;

/**
 * How many founding places are taken.
 *
 * Cached and tag-invalidated rather than queried per request: the number
 * changes rarely but is read on every page view, so this keeps the pages
 * static-fast while staying correct the moment someone joins (the action
 * revalidates `ROSTER_TAG`). The time-based ceiling is a safety net for writes
 * that happen outside the app, such as a manual insert.
 */
export const getRosterCount = unstable_cache(
  async () => countWaitlistEntries(),
  ["waitlist-roster-count"],
  { tags: [ROSTER_TAG], revalidate: 300 }
);

export async function getNextFounderNumber(): Promise<number> {
  return (await getRosterCount()) + 1;
}

/** Cities with at least one founding artist, for the Living Map. */
export const getLitCities = unstable_cache(
  async () => listLitCities(),
  ["waitlist-lit-cities"],
  { tags: [ROSTER_TAG], revalidate: 300 }
);
