"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { primaryCta } from "@/config/nav";
import { mission } from "@/config/platform";
import { duration, ease, viewportOnce } from "@/lib/motion";
import { Magnetic } from "@/shared/magnetic";
import { Reveal, RevealGroup, RevealItem } from "@/shared/reveal";
import { SectionHeading } from "@/shared/section-heading";

/**
 * Mission and 2030, at the end rather than the beginning.
 *
 * A mission statement placed before the evidence is a claim; placed after the
 * three layers and the artist's own number, it reads as the conclusion of an
 * argument the visitor has already followed. That ordering is the only reason
 * this section is last.
 */
export function Vision() {
  return (
    <section
      id="mission"
      className="section-y border-border max-w-wall mx-auto border-t px-5 md:px-12 lg:px-16"
    >
      <Reveal>
        <SectionHeading eyebrow="Our mission" title={mission.statement} />
      </Reveal>

      <div className="mt-24 grid gap-12 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-20">
        {/* The year, treated as a monument rather than a label. */}
        <Reveal className="flex flex-col gap-4">
          <p className="text-label text-ember tracking-[0.18em] uppercase">
            Vision
          </p>
          <p className="font-heading text-display-s lg:text-display-l leading-none tracking-tight tabular-nums">
            {mission.visionYear}
          </p>
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: duration.slow, ease: ease.standard }}
            style={{ originX: 0 }}
            className="bg-ember h-px w-full"
          />
          <p className="text-body-lg text-balance">{mission.visionStatement}</p>
        </Reveal>

        <RevealGroup as="ul" stagger={0.09} className="flex flex-col">
          {mission.pillars.map((pillar) => (
            <RevealItem
              as="li"
              key={pillar.title}
              className="border-border flex flex-col gap-2 border-t py-8 first:border-t-0 first:pt-0"
            >
              <h3 className="font-heading text-h4 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground text-body max-w-2xl">
                {pillar.line}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* The one ask on the page. */}
      <Reveal className="border-ember/25 bg-ember/[0.04] mt-24 flex flex-col items-start gap-6 rounded-xl border p-8 sm:p-12">
        <h3 className="font-heading text-h3 lg:text-h2 max-w-2xl tracking-tight text-balance">
          The wall is still dark. It lights up one artist at a time.
        </h3>
        <p className="text-muted-foreground text-body-lg max-w-xl">
          Founding artists are being added now, ahead of launch. Nothing is
          charged, and nothing is listed until you say so.
        </p>
        <Magnetic>
          <Link
            href={primaryCta.href}
            className="bg-ember text-wall-black hover:bg-ember-glow text-body group inline-flex h-12 items-center gap-2 rounded-md px-6 font-medium transition-colors"
          >
            {primaryCta.label}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}
