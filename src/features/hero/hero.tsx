import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { primaryCta } from "@/config/nav";
import { EmberClock } from "@/features/hero/ember-clock";
import { MultilingualWelcome } from "@/features/hero/multilingual-welcome";
import { UnlitWall } from "@/features/hero/unlit-wall";
import { Magnetic } from "@/shared/magnetic";

/**
 * The first five seconds.
 *
 * The whole section is a Server Component; only the three genuinely
 * interactive pieces (wall, clock, welcome) are client islands. That keeps the
 * headline — our LCP element — in the server-rendered HTML, so it paints
 * immediately and does not wait on hydration.
 *
 * The single idea of this screen is arrival: a dark room, a wall of empty
 * frames, one ember counting toward Diwali. Everything else is deliberately
 * withheld until the next scroll (§12, "one hero motion idea per screen").
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-16 text-center"
    >
      <UnlitWall />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <EmberClock />

        <h1 className="font-heading text-h1 sm:text-display-s lg:text-display-l max-w-4xl tracking-tight text-balance">
          Art lives on the wall.
        </h1>

        <MultilingualWelcome />

        <p className="text-muted-foreground text-body-lg max-w-lg text-balance">
          India&rsquo;s home for artists is being built — exhibitions, fair
          pricing, and proof your work is yours. The wall is still dark. It
          lights up one artist at a time.
        </p>

        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <Magnetic>
            <Link
              href={primaryCta.href}
              className="bg-ember text-wall-black hover:bg-ember-glow text-body inline-flex h-12 items-center rounded-md px-6 font-medium transition-colors"
            >
              Take your place
            </Link>
          </Magnetic>

          <Link
            href="/wall"
            className="text-muted-foreground hover:text-foreground border-border hover:border-ink/30 text-body inline-flex h-12 items-center rounded-md border px-6 transition-colors"
          >
            See the wall
          </Link>
        </div>
      </div>

      <a
        href="#rooms"
        aria-label="Explore what's here"
        className="text-muted-foreground hover:text-foreground absolute bottom-8 left-1/2 hidden -translate-x-1/2 transition-colors md:block"
      >
        <ArrowDown className="size-5 motion-safe:animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
