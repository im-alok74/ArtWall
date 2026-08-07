import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { layers } from "@/config/platform";
import { Earnings } from "@/features/platform/earnings";
import { LayerStack } from "@/features/platform/layer-stack";
import { TheGap } from "@/features/platform/the-gap";
import { Vision } from "@/features/platform/vision";
import { Reveal, RevealGroup, RevealItem } from "@/shared/reveal";

export const metadata: Metadata = {
  title: "The Platform",
  description:
    "India has 42 million artists and artisans, and up to 85% of what a buyer pays never reaches them. ArtWall answers that with three connected layers: an AI Exhibition Engine, bank-grade escrow with fraud detection built for Indian art, and provenance that pays royalties for the life of the work.",
  alternates: { canonical: "/platform" },
};

/**
 * The argument page.
 *
 * Every other route on this site is an experience — hang a work, find your
 * archetype, take a place on the wall. This one is the reasoning underneath
 * them, in the order an unconvinced person needs it: the size of the problem,
 * the machine that answers it, the money it puts back in an artist's hands,
 * and only then what we say we are for.
 *
 * The headline is server-rendered and unanimated — it is the LCP element, and
 * a fade-up on the largest text on the page would mean measuring our own
 * paint as slower than it is.
 */
export default function PlatformPage() {
  return (
    <>
      <section className="section-y max-w-wall relative mx-auto overflow-hidden px-5 pt-32 md:px-12 lg:px-16">
        {/* A single wash of ember behind the statement, no more. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 55% at 25% 0%, rgb(232 163 61 / 0.10), transparent 70%)",
          }}
        />

        <p className="text-label text-ember tracking-[0.18em] uppercase">
          The platform
        </p>

        <h1 className="font-heading text-h1 lg:text-display-s mt-6 max-w-4xl tracking-tight text-balance">
          Built to fix one specific thing.
        </h1>

        <Reveal delay={0.05}>
          <p className="text-muted-foreground text-lead mt-8 max-w-2xl text-balance">
            Forty-two million Indians make things by hand. Middlemen absorb up
            to 85% of what a buyer pays, counterfeits circulate unchallenged,
            and a first-time buyer has nowhere to check anything. ArtWall exists
            for that, and nothing else.
          </p>
        </Reveal>

        <RevealGroup
          as="ul"
          stagger={0.08}
          className="mt-14 grid gap-px sm:grid-cols-3"
        >
          {layers.map((layer) => (
            <RevealItem
              as="li"
              key={layer.id}
              className="border-border flex flex-col gap-2 border-t pt-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <span className="font-heading text-ember text-label tabular-nums">
                {layer.index}
              </span>
              <Link
                href={`#${layer.id}`}
                className="font-heading text-h4 hover:text-ember tracking-tight transition-colors"
              >
                {layer.name}
              </Link>
              <span className="text-muted-foreground text-small">
                {layer.claim}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>

        <a
          href="#the-gap"
          className="text-muted-foreground hover:text-foreground text-small mt-16 inline-flex items-center gap-2 transition-colors"
        >
          Start with the problem
          <ArrowDown aria-hidden className="size-4" />
        </a>
      </section>

      <TheGap />
      <LayerStack />
      <Earnings />
      <Vision />
    </>
  );
}
