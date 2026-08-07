"use client";

import { motion } from "framer-motion";

import { economics, problem } from "@/config/platform";
import { duration, ease, transition, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CountUp } from "@/shared/count-up";
import { Reveal, RevealGroup, RevealItem } from "@/shared/reveal";
import { SectionHeading } from "@/shared/section-heading";

const stats = [problem.artists, problem.leakage, problem.trust];

interface SplitBarProps {
  label: string;
  /** Fraction of the sale price that reaches the artist, 0–1. */
  share: number;
  caption: string;
  tone: "legacy" | "artwall";
  delay: number;
}

/**
 * One rupee of a sale, drawn to scale.
 *
 * The filled portion is what the artist keeps; the unfilled remainder is
 * everything the chain takes first. Two of these stacked is the entire
 * argument for the company, and it needs no sentence under it.
 *
 * Animates `scaleX` rather than `width` — the bar is the one element on this
 * screen most likely to be on-screen while the visitor is still scrolling, and
 * a transform costs the compositor nothing where a width change re-lays out
 * the row on every frame.
 */
function SplitBar({ label, share, caption, tone, delay }: SplitBarProps) {
  const isArtwall = tone === "artwall";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <span
          className={cn(
            "text-label tracking-[0.14em] uppercase",
            isArtwall ? "text-ember" : "text-muted-foreground"
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "font-heading text-h4 tabular-nums",
            isArtwall ? "text-ember" : "text-ink-muted"
          )}
        >
          <CountUp to={Math.round(share * 100)} seconds={duration.scene} />%
        </span>
      </div>

      <div
        className="bg-wall-elevated relative h-3 overflow-hidden rounded-full"
        role="img"
        aria-label={`${label}: the artist keeps ${Math.round(share * 100)} percent of the sale price.`}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: share }}
          viewport={viewportOnce}
          transition={{ duration: duration.scene, ease: ease.standard, delay }}
          style={{ originX: 0 }}
          className={cn(
            "absolute inset-0 rounded-full",
            isArtwall
              ? "from-ember to-ember-glow bg-linear-to-r"
              : "bg-terracotta"
          )}
        />
      </div>

      <p className="text-muted-foreground text-small">{caption}</p>
    </div>
  );
}

/**
 * The problem, stated before anything is sold.
 *
 * Order matters here: the scale of the workforce, then the size of the leak,
 * then the absence of any way to check. A visitor who reads only the three
 * numbers should already understand why the rest of the page exists.
 */
export function TheGap() {
  return (
    <section
      id="the-gap"
      className="section-y border-border max-w-wall mx-auto border-t px-5 md:px-12 lg:px-16"
    >
      <Reveal>
        <SectionHeading
          eyebrow="The gap"
          title="Forty-two million makers. Almost none of the money."
          description="India has the largest creative workforce on earth. It has no infrastructure a first-time buyer can trust, and no path that pays the person who did the work."
        />
      </Reveal>

      <RevealGroup
        as="dl"
        stagger={0.09}
        className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8"
      >
        {stats.map((stat) => (
          <RevealItem key={stat.label} className="flex flex-col gap-3">
            <dt className="font-heading text-display-s tracking-tight tabular-nums">
              {stat.value > 0 ? (
                <>
                  <CountUp to={stat.value} seconds={duration.scene} />
                  {/* "85%" closes up; "42 million" needs the space. */}
                  <span className="text-ember">
                    {stat.unit === "%" ? "%" : ` ${stat.unit}`}
                  </span>
                </>
              ) : (
                <span className="text-ember">Nowhere</span>
              )}
            </dt>
            <dd className="flex flex-col gap-2">
              <span className="text-body font-medium">{stat.label}</span>
              <span className="text-muted-foreground text-small">
                {stat.line}
              </span>
            </dd>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* The split, drawn to scale. */}
      <Reveal className="border-border bg-wall-charcoal/40 mt-16 rounded-xl border p-6 sm:p-10">
        <div className="flex flex-col gap-2">
          <p className="text-label text-muted-foreground tracking-[0.18em] uppercase">
            Where a rupee goes
          </p>
          <h3 className="font-heading text-h3 max-w-xl tracking-tight text-balance">
            Same buyer. Same price. Different maker&rsquo;s share.
          </h3>
        </div>

        <div className="mt-10 flex flex-col gap-10">
          <SplitBar
            label="Through the existing chain"
            share={economics.legacyArtistShare}
            caption="Distributors, agents, and gallery commissions are taken before the artist is paid — and nothing comes back on a resale."
            tone="legacy"
            delay={0}
          />
          <SplitBar
            label="On ArtWall"
            share={economics.artistShare}
            caption={`Paid out of escrow on delivery, plus ${Math.round(
              economics.resaleRoyalty * 100
            )}% of every resale for as long as the work exists.`}
            tone="artwall"
            delay={0.18}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ ...transition.moderate, delay: 0.5 }}
          className="border-border text-muted-foreground text-small mt-10 border-t pt-6"
        >
          Figures are ArtWall&rsquo;s published commercial terms. The
          existing-chain share reflects intermediary cuts of up to 85% of the
          buyer&rsquo;s price.
        </motion.p>
      </Reveal>
    </section>
  );
}
