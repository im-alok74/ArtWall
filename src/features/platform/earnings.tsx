"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";

import { economics } from "@/config/platform";
import { ease, transition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Reveal } from "@/shared/reveal";
import { SectionHeading } from "@/shared/section-heading";

const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const format = (value: number) => rupees.format(Math.round(value));

/**
 * A figure that eases to a new value instead of snapping.
 *
 * The rendered children are frozen at the first value on purpose. React
 * re-rendering the same string means it never touches the text node, which
 * leaves our per-frame `textContent` writes alone — pass the live value as
 * children instead and React overwrites every frame, killing the animation and
 * making the whole component pointless.
 */
function AnimatedRupees({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const current = useRef(value);
  /* State, not a ref: the initialiser runs exactly once and the value is read
     during render, which is precisely what a ref must never be used for. */
  const [initial] = useState(() => format(value));
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion) {
      current.current = value;
      node.textContent = format(value);
      return;
    }

    const controls = animate(current.current, value, {
      duration: 0.45,
      ease: ease.standard,
      onUpdate: (next) => {
        current.current = next;
        node.textContent = format(next);
      },
      onComplete: () => {
        current.current = value;
        node.textContent = format(value);
      },
    });

    return () => controls.stop();
  }, [value, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {initial}
    </span>
  );
}

interface OutcomeProps {
  label: string;
  amount: number;
  /** 0–1, relative to the larger of the two outcomes. */
  share: number;
  note: string;
  highlight?: boolean;
}

function Outcome({ label, amount, share, note, highlight }: OutcomeProps) {
  return (
    <div className="flex flex-col gap-3">
      <span
        className={cn(
          "text-label tracking-[0.14em] uppercase",
          highlight ? "text-ember" : "text-muted-foreground"
        )}
      >
        {label}
      </span>

      <AnimatedRupees
        value={amount}
        className={cn(
          "font-heading text-h3 lg:text-h2 tabular-nums",
          highlight ? "text-ember" : "text-ink-muted"
        )}
      />

      <div className="bg-wall-elevated h-2 overflow-hidden rounded-full">
        <motion.div
          animate={{ scaleX: share }}
          initial={false}
          transition={transition.slow}
          style={{ originX: 0 }}
          className={cn(
            "h-full w-full rounded-full",
            highlight
              ? "from-ember to-ember-glow bg-linear-to-r"
              : "bg-terracotta"
          )}
        />
      </div>

      <p className="text-muted-foreground text-small">{note}</p>
    </div>
  );
}

const PRICE_MIN = 5_000;
const PRICE_MAX = 500_000;
const PRICE_STEP = 5_000;
const RESALE_MAX = 5;

/**
 * What one artwork is worth to the person who made it.
 *
 * This is the only place on the site where a visitor can put their own number
 * in, and it is deliberately the artist's number rather than the buyer's. An
 * artist pricing a canvas at ₹40,000 does not need to be told the market is
 * unfair in the abstract; they need to see the difference on their own work.
 *
 * The resale row is the argument the existing chain cannot answer at all: on
 * the far side of the first sale, a gallery owes the artist nothing, and the
 * bar simply stops growing.
 */
export function Earnings() {
  const priceId = useId();
  const resalesId = useId();

  const [price, setPrice] = useState(40_000);
  const [resales, setResales] = useState(2);

  const { onArtwall, existing, royalties, difference, maximum } =
    useMemo(() => {
      const primaryArtwall = price * economics.artistShare;
      const primaryExisting = price * economics.legacyArtistShare;

      // Each resale is modelled at a modest step up from the previous sale.
      let royaltyTotal = 0;
      let lastPrice = price;
      for (let sale = 0; sale < resales; sale += 1) {
        lastPrice *= economics.resaleAppreciation;
        royaltyTotal += lastPrice * economics.resaleRoyalty;
      }

      const artwallTotal = primaryArtwall + royaltyTotal;

      return {
        onArtwall: artwallTotal,
        existing: primaryExisting,
        royalties: royaltyTotal,
        difference: artwallTotal - primaryExisting,
        maximum: Math.max(artwallTotal, primaryExisting),
      };
    }, [price, resales]);

  const sliderClass =
    "accent-ember h-1.5 w-full cursor-pointer appearance-none rounded-full bg-wall-elevated";

  return (
    <section
      id="earnings"
      className="section-y border-border max-w-wall mx-auto border-t px-5 md:px-12 lg:px-16"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Run your own number"
          title="What one work earns its maker, over its whole life."
          description="Set a price and how many times the piece changes hands. The difference is not a discount we are offering — it is the cost of the intermediaries the platform removes."
        />
      </Reveal>

      <Reveal className="border-border bg-wall-charcoal/40 mt-12 grid gap-12 rounded-xl border p-6 sm:p-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
        {/* Inputs */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor={priceId} className="text-body font-medium">
                Sale price
              </label>
              <output
                htmlFor={priceId}
                className="font-heading text-h4 text-ember tabular-nums"
              >
                {format(price)}
              </output>
            </div>
            <input
              id={priceId}
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
              className={sliderClass}
            />
            <div className="text-caption text-ink-muted flex justify-between">
              <span>{format(PRICE_MIN)}</span>
              <span>{format(PRICE_MAX)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor={resalesId} className="text-body font-medium">
                Times it is resold
              </label>
              <output
                htmlFor={resalesId}
                className="font-heading text-h4 text-ember tabular-nums"
              >
                {resales}
              </output>
            </div>
            <input
              id={resalesId}
              type="range"
              min={0}
              max={RESALE_MAX}
              step={1}
              value={resales}
              onChange={(event) => setResales(Number(event.target.value))}
              className={sliderClass}
            />
            <p className="text-caption text-ink-muted">
              Each resale modelled at {economics.resaleAppreciation}× the
              previous sale — deliberately conservative.
            </p>
          </div>
        </div>

        {/* Outcomes */}
        <div className="flex flex-col gap-10">
          <Outcome
            label="Through the existing chain"
            amount={existing}
            share={existing / maximum}
            note="One payment, taken last, after every intermediary in the chain. Nothing on any resale, ever."
          />

          <Outcome
            highlight
            label="On ArtWall"
            amount={onArtwall}
            share={onArtwall / maximum}
            note={
              resales > 0
                ? `Includes ${format(royalties)} of resale royalties, paid automatically on transfer.`
                : `Paid from escrow on delivery. Add a resale to see the ${Math.round(economics.resaleRoyalty * 100)}% royalty.`
            }
          />

          <div className="border-border flex flex-col gap-1 border-t pt-6">
            <span className="text-label text-muted-foreground tracking-[0.14em] uppercase">
              Difference to the artist
            </span>
            <AnimatedRupees
              value={difference}
              className="font-heading text-h2 text-ember tabular-nums"
            />
          </div>
        </div>
      </Reveal>

      <p className="text-muted-foreground text-small mt-6 max-w-2xl">
        An illustration, not a quote. It uses ArtWall&rsquo;s published artist
        share and resale royalty, and assumes the existing chain leaves the
        artist {Math.round(economics.legacyArtistShare * 100)}% of the
        buyer&rsquo;s price. Real outcomes vary with medium, market, and how
        often a work actually moves.
      </p>
    </section>
  );
}
