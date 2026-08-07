"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { ease, transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The three layers, drawn.
 *
 * Each diagram is a loop rather than a scroll-triggered one-shot, because each
 * one describes a *process* — a match being made, money being held and
 * released, a record being extended. A process that plays once and freezes
 * reads as a screenshot; a process that keeps turning reads as a machine.
 *
 * All three are decorative: every fact they illustrate is also written in the
 * prose beside them, so they carry `aria-hidden` and cost a screen reader
 * nothing. Under `prefers-reduced-motion` each renders its resolved end state —
 * the match found, the payment released, the certificate extended — so a
 * visitor who opts out of animation still sees the conclusion rather than an
 * empty frame.
 */

function DiagramFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "border-border bg-wall-black/60 relative aspect-[4/3] w-full overflow-hidden rounded-xl border sm:aspect-[16/11]",
        className
      )}
    >
      {/* A faint wall grain so the panel reads as a surface, not a void. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 15%, rgb(232 163 61 / 0.10), transparent 55%), radial-gradient(circle at 85% 85%, rgb(62 108 196 / 0.10), transparent 55%)",
        }}
      />
      {children}
    </div>
  );
}

/* ───────────────────────── 01 · Exhibition Engine ───────────────────────── */

const venues = [
  { name: "Hotel lobby", fit: 71 },
  { name: "Gallery", fit: 88 },
  { name: "Coworking floor", fit: 94 },
  { name: "Café", fit: 64 },
  { name: "Studio", fit: 58 },
  { name: "Office atrium", fit: 79 },
] as const;

/** The index the engine settles on — the highest fit in the list above. */
const BEST_MATCH = 2;

/**
 * A work being matched to a wall.
 *
 * The scan steps through candidate spaces quickly and then dwells on the one
 * it picks, which is the honest shape of the thing: evaluation is cheap, the
 * decision is what matters.
 */
export function ExhibitionDiagram() {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  /* Derived rather than stored: opting out of motion is not a state change to
     be synchronised, it is simply a different answer to "which one is lit". */
  const active = prefersReducedMotion ? BEST_MATCH : step;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const dwelling = step === BEST_MATCH;
    const timer = setTimeout(
      () => setStep((current) => (current + 1) % venues.length),
      dwelling ? 2600 : 620
    );

    return () => clearTimeout(timer);
  }, [step, prefersReducedMotion]);

  return (
    <DiagramFrame>
      {/* Extra bottom padding reserves a clear strip for the match badge, so
          it never lands on top of the last row of candidate walls. */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-4 pb-12 sm:gap-3 sm:p-6 sm:pb-14">
        {venues.map((venue, index) => {
          const isActive = index === active;
          const isMatch = isActive && index === BEST_MATCH;

          return (
            <motion.div
              key={venue.name}
              animate={{
                borderColor: isActive
                  ? isMatch
                    ? "rgb(232 163 61 / 0.75)"
                    : "rgb(233 231 225 / 0.30)"
                  : "rgb(233 231 225 / 0.10)",
                backgroundColor: isMatch
                  ? "rgb(232 163 61 / 0.10)"
                  : "rgb(28 30 36 / 0.55)",
              }}
              transition={transition.base}
              className="relative flex flex-col justify-between overflow-hidden rounded-lg border p-2 sm:p-3"
            >
              {/* The artwork itself, hung only on the wall that wins. */}
              <AnimatePresence>
                {isMatch && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 240, damping: 18 }}
                    className="border-ember/70 from-ember/45 to-terracotta/40 absolute top-2 right-2 h-7 w-5 rounded-[3px] border bg-linear-to-br sm:h-9 sm:w-7"
                  />
                )}
              </AnimatePresence>

              <span className="text-caption text-ink-muted leading-tight">
                {venue.name}
              </span>

              <span
                className={cn(
                  "text-caption font-medium tabular-nums transition-colors",
                  isMatch ? "text-ember" : "text-ink-muted/60"
                )}
              >
                {venue.fit}
              </span>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {active === BEST_MATCH && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={transition.moderate}
            className="bg-ember text-wall-black text-caption absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-medium"
          >
            Matched · 94% wall fit
          </motion.div>
        )}
      </AnimatePresence>
    </DiagramFrame>
  );
}

/* ────────────────────── 02 · Escrow and the fraud layer ─────────────────── */

/** One full pass of the escrow story, in seconds. */
const ESCROW_CYCLE = 5;

/**
 * Money held, work checked, money released.
 *
 * The three animations share one cycle length and are phased by `times` rather
 * than by chained delays, so the payment can never arrive before the check has
 * cleared — a drift that would quietly invert the whole claim.
 */
export function EscrowDiagram() {
  const prefersReducedMotion = useReducedMotion();

  const loop = {
    duration: ESCROW_CYCLE,
    ease: ease.standard,
    repeat: Infinity,
    repeatDelay: 0.4,
  } as const;

  return (
    <DiagramFrame>
      <svg
        viewBox="0 0 320 220"
        className="absolute inset-0 h-full w-full"
        role="presentation"
      >
        {/* Rails */}
        <line
          x1="52"
          y1="176"
          x2="160"
          y2="176"
          stroke="rgb(233 231 225 / 0.15)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
        <line
          x1="160"
          y1="176"
          x2="268"
          y2="176"
          stroke="rgb(233 231 225 / 0.15)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />

        {/* Endpoints */}
        <circle cx="52" cy="176" r="6" fill="rgb(233 231 225 / 0.35)" />
        <circle cx="268" cy="176" r="6" fill="var(--color-ember)" />
        <text
          x="52"
          y="200"
          textAnchor="middle"
          className="fill-ink-muted text-[10px]"
        >
          Buyer
        </text>
        <text
          x="160"
          y="200"
          textAnchor="middle"
          className="fill-ink-muted text-[10px]"
        >
          Escrow
        </text>
        <text
          x="268"
          y="200"
          textAnchor="middle"
          className="fill-ember text-[10px]"
        >
          Artist
        </text>

        {/* The escrow vault, holding the work under inspection. */}
        <rect
          x="112"
          y="34"
          width="96"
          height="106"
          rx="10"
          fill="rgb(28 30 36 / 0.85)"
          stroke="rgb(233 231 225 / 0.18)"
        />
        <rect
          x="132"
          y="54"
          width="56"
          height="66"
          rx="4"
          fill="rgb(181 87 59 / 0.30)"
          stroke="rgb(232 163 61 / 0.35)"
        />

        {/* The authentication sweep. */}
        {!prefersReducedMotion && (
          <motion.rect
            x="132"
            width="56"
            height="2"
            fill="var(--color-ember-glow)"
            initial={{ y: 54, opacity: 0 }}
            animate={{ y: [54, 118, 54], opacity: [0, 1, 1, 0] }}
            transition={{ ...loop, times: [0.24, 0.42, 0.56, 0.62] }}
          />
        )}

        {/* Cleared. */}
        <motion.g
          initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
          animate={
            prefersReducedMotion ? undefined : { opacity: [0, 0, 1, 1, 0] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { ...loop, times: [0, 0.6, 0.66, 0.9, 0.97] }
          }
        >
          <circle cx="196" cy="46" r="11" fill="var(--color-ember)" />
          <path
            d="M191 46.5l3.5 3.5 6.5-7"
            stroke="var(--color-wall-black)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.g>

        {/* The payment: buyer → escrow, held, then released to the artist. */}
        {prefersReducedMotion ? (
          <circle cx="268" cy="176" r="5" fill="var(--color-ember-glow)" />
        ) : (
          <motion.circle
            r="5"
            cy="176"
            fill="var(--color-ember-glow)"
            initial={{ cx: 52, opacity: 0 }}
            animate={{
              cx: [52, 160, 160, 268, 268],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{ ...loop, times: [0, 0.2, 0.66, 0.86, 1] }}
          />
        )}
      </svg>

      {/* Hidden on phones: at 390px this caption lands on top of the drawing
          it is annotating, and the prose directly above already says it. */}
      <div className="text-caption text-ink-muted absolute top-4 left-4 hidden flex-col gap-1 sm:flex">
        <span className="text-ember tracking-[0.14em] uppercase">Held</span>
        <span className="max-w-36 leading-tight">
          Funds do not move until the work clears authentication
        </span>
      </div>
    </DiagramFrame>
  );
}

/* ──────────────────────── 03 · Provenance and royalty ───────────────────── */

const PROVENANCE_CYCLE = 5.4;

const events = [
  { x: 92, label: "Made" },
  { x: 152, label: "Shown" },
  { x: 212, label: "Sold" },
] as const;

/**
 * A record that only ever gets longer.
 *
 * The fourth block is the resale that has not happened yet; it stamps in, and
 * the royalty traces back along the arc to the person who made the thing. That
 * return path is the whole point of the layer, so it is the only element here
 * drawn in full-strength amber.
 */
export function ProvenanceDiagram() {
  const prefersReducedMotion = useReducedMotion();

  const loop = {
    duration: PROVENANCE_CYCLE,
    ease: ease.standard,
    repeat: Infinity,
    repeatDelay: 0.5,
  } as const;

  return (
    <DiagramFrame>
      <svg
        viewBox="0 0 320 220"
        className="absolute inset-0 h-full w-full"
        role="presentation"
      >
        {/* The chain rail */}
        <line
          x1="44"
          y1="132"
          x2="292"
          y2="132"
          stroke="rgb(233 231 225 / 0.14)"
          strokeWidth="1.5"
        />

        {/* The artist, at the origin and still on the record. */}
        <circle cx="44" cy="132" r="9" fill="var(--color-ember)" />
        <text
          x="44"
          y="158"
          textAnchor="middle"
          className="fill-ember text-[10px]"
        >
          Artist
        </text>

        {/* Events already written. */}
        {events.map((event) => (
          <g key={event.label}>
            <rect
              x={event.x - 18}
              y={114}
              width="36"
              height="36"
              rx="6"
              fill="rgb(28 30 36 / 0.9)"
              stroke="rgb(233 231 225 / 0.22)"
            />
            <text
              x={event.x}
              y={168}
              textAnchor="middle"
              className="fill-ink-muted text-[9px]"
            >
              {event.label}
            </text>
          </g>
        ))}

        {/* The resale, stamping itself onto the end of the chain. */}
        <motion.g
          initial={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 1.6 }
          }
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0, 1, 1, 1], scale: [1.6, 1, 1, 1] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { ...loop, times: [0.05, 0.22, 0.9, 1] }
          }
          style={{ originX: "272px", originY: "132px" }}
        >
          <rect
            x="254"
            y="114"
            width="36"
            height="36"
            rx="6"
            fill="rgb(232 163 61 / 0.16)"
            stroke="var(--color-ember)"
          />
          <text
            x="272"
            y="168"
            textAnchor="middle"
            className="fill-ember text-[9px]"
          >
            Resold
          </text>
        </motion.g>

        {/* The royalty, returning along the arc to the maker. */}
        <motion.path
          d="M272 108 C 240 48, 90 48, 48 108"
          fill="none"
          stroke="var(--color-ember)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{
            pathLength: prefersReducedMotion ? 1 : 0,
            opacity: prefersReducedMotion ? 1 : 0,
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : { pathLength: [0, 1, 1, 1], opacity: [0, 1, 1, 0] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { ...loop, times: [0.28, 0.58, 0.88, 1] }
          }
        />

        <motion.text
          x="160"
          y="42"
          textAnchor="middle"
          className="fill-ember text-[11px] font-medium"
          initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
          animate={
            prefersReducedMotion ? undefined : { opacity: [0, 0, 1, 1, 0] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { ...loop, times: [0, 0.5, 0.62, 0.88, 1] }
          }
        >
          royalty paid
        </motion.text>
      </svg>

      {/* Hidden on phones: at 390px this caption lands on top of the drawing
          it is annotating, and the prose directly above already says it. */}
      <div className="text-caption text-ink-muted absolute top-4 left-4 hidden flex-col gap-1 sm:flex">
        <span className="text-ember tracking-[0.14em] uppercase">
          Permanent
        </span>
        <span className="max-w-36 leading-tight">
          One record, extended at every event in the work&rsquo;s life
        </span>
      </div>
    </DiagramFrame>
  );
}

export const layerDiagrams = {
  exhibition: ExhibitionDiagram,
  escrow: EscrowDiagram,
  provenance: ProvenanceDiagram,
} as const;
