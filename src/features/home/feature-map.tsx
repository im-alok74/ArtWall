import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { navItems } from "@/config/nav";
import { SectionHeading } from "@/shared/section-heading";

/**
 * The doors out of the home page.
 *
 * With each experience on its own route, the home page's job is no longer to
 * contain everything — it is to make each door worth opening. Cards are plain
 * links so they prefetch, work without JavaScript, and are keyboard-navigable
 * for free.
 */
export function FeatureMap() {
  return (
    <section
      id="rooms"
      className="section-y border-border max-w-wall mx-auto border-t px-5 md:px-12 lg:px-16"
    >
      <SectionHeading
        eyebrow="Four rooms"
        title="Wander before you commit to anything."
        description="Nothing here asks for your email. Look around first — that is rather the point."
      />

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group border-border bg-wall-charcoal/40 hover:border-ember/40 hover:bg-wall-charcoal/70 flex h-full flex-col justify-between gap-8 rounded-xl border p-6 transition-colors sm:p-8"
            >
              <div className="flex flex-col gap-2">
                <span className="font-heading text-h4 tracking-tight">
                  {item.label}
                </span>
                <span className="text-muted-foreground text-body">
                  {item.description}
                </span>
              </div>
              <ArrowUpRight
                aria-hidden
                className="text-muted-foreground group-hover:text-ember size-5 transition-colors"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
