import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { layers, problem } from "@/config/platform";
import { Reveal, RevealGroup, RevealItem } from "@/shared/reveal";

/**
 * The one paragraph of argument the home page is allowed.
 *
 * The home page's job is to make people wander, not to pitch — so this band
 * states the problem, names the three layers, and gets out of the way with a
 * single door to the full case. It sits above the four rooms deliberately:
 * someone who wants the reasoning should not have to scroll past four
 * invitations to play with something first.
 */
export function PlatformTeaser() {
  return (
    <section
      id="why"
      className="section-y border-border max-w-wall mx-auto border-t px-5 md:px-12 lg:px-16"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal className="flex flex-col gap-6">
          <p className="text-label text-ember tracking-[0.18em] uppercase">
            Why this exists
          </p>
          <h2 className="font-heading text-h2 tracking-tight text-balance">
            {problem.leakage.value}% of what a buyer pays never reaches the
            person who made it.
          </h2>
          <p className="text-muted-foreground text-body-lg text-balance">
            India has {problem.artists.value} million artists and artisans, a
            market flooded with fakes, and nothing a first-time buyer can check.
            ArtWall answers that in three connected layers.
          </p>
          <Link
            href="/platform"
            className="text-ember hover:text-ember-glow text-body group inline-flex items-center gap-2 self-start transition-colors"
          >
            See how it works
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>

        <RevealGroup as="ol" stagger={0.08} className="flex flex-col">
          {layers.map((layer) => (
            <RevealItem
              as="li"
              key={layer.id}
              className="border-border flex gap-6 border-t py-6 first:border-t-0 first:pt-0 last:pb-0"
            >
              <span className="font-heading text-ember text-label pt-1 tabular-nums">
                {layer.index}
              </span>
              <div className="flex flex-col gap-1.5">
                <Link
                  href={`/platform#${layer.id}`}
                  className="font-heading text-h4 hover:text-ember tracking-tight transition-colors"
                >
                  {layer.name}
                </Link>
                <span className="text-muted-foreground text-body">
                  {layer.claim}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
