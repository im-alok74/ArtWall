import {
  FOUNDING_COHORT_SIZE,
  getNextFounderNumber,
} from "@/features/waitlist/roster";
import { WaitlistForm } from "@/features/waitlist/waitlist-form";
import { SectionHeading } from "@/shared/section-heading";

const promises = [
  "A permanent, numbered place on the wall",
  "First access when we open, before the public",
  "A say in what we build — founding artists are asked, not surveyed",
  "Free certification for your first works",
] as const;

/**
 * Joining, framed as taking a numbered place rather than submitting a form.
 *
 * Async Server Component: the next available number is read from the database
 * (through a tag-invalidated cache) so it is genuinely live, and the form
 * itself is the only client island on the page.
 */
export async function JoinSection() {
  const next = await getNextFounderNumber();
  const remaining = Math.max(0, FOUNDING_COHORT_SIZE - next + 1);

  return (
    <section className="section-y max-w-wall mx-auto px-5 md:px-12 lg:px-16">
      <SectionHeading
        eyebrow="Founding Artists"
        title="Be one of the first five hundred."
        description="Not a mailing list. A founding cohort with numbered places, kept in the order people arrived."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <div className="border-border bg-wall-charcoal/50 rounded-xl border p-6">
            <p className="text-muted-foreground text-label tracking-wider uppercase">
              Next place
            </p>
            <p className="font-heading text-display-s text-ember mt-2 tracking-tight tabular-nums">
              #{next}
            </p>
            <p className="text-muted-foreground text-small mt-2">
              {remaining} of {FOUNDING_COHORT_SIZE} founding places remain.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {promises.map((promise) => (
              <li key={promise} className="text-body flex gap-3">
                <span
                  aria-hidden
                  className="bg-ember mt-2.5 size-1.5 shrink-0 rounded-full"
                />
                <span className="text-muted-foreground">{promise}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-border bg-wall-charcoal/50 rounded-xl border p-6 sm:p-8">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
