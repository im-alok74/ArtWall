"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { siteConfig } from "@/config/site";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function remaining(target: string): Remaining {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

/**
 * The clock is an external, always-moving source, so it is read through
 * `useSyncExternalStore` rather than mirrored into state by an effect. That
 * gives a correct server snapshot (`null`) with no hydration mismatch.
 *
 * The snapshot is memoised per second: `getSnapshot` must return a
 * referentially stable value between ticks or React will re-render forever.
 */
let cached: { key: number; value: Remaining } | null = null;

function getSnapshot(): Remaining {
  const key = Math.floor(Date.now() / 1000);
  if (!cached || cached.key !== key) {
    cached = { key, value: remaining(siteConfig.launchAt) };
  }
  return cached.value;
}

function subscribe(onStoreChange: () => void) {
  const id = setInterval(onStoreChange, 1000);
  return () => clearInterval(id);
}

const getServerSnapshot = (): Remaining | null => null;

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
] as const;

/**
 * The Ember Clock — the countdown to launch, led by a breathing amber seed.
 *
 * The ember is the emotional half and the numerals are the factual half: the
 * pulse says "a light is coming", the digits say exactly when. Tabular numerals
 * keep the seconds column from jittering the layout as digits change, which is
 * the detail that separates a considered countdown from a nervous one.
 */
export function EmberClock() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-muted-foreground text-label flex items-center gap-2.5 tracking-[0.18em] uppercase">
        <motion.span
          aria-hidden
          className="bg-ember size-1.5 shrink-0 rounded-full"
          style={{ boxShadow: "0 0 12px var(--color-ember)" }}
          animate={
            prefersReducedMotion ? undefined : { opacity: [0.45, 1, 0.45] }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        Launching Diwali 2026
      </p>

      {/* Height is reserved so the numbers arriving after hydration shift
          nothing below them. */}
      <div className="flex min-h-14 items-start gap-5 sm:gap-7">
        {time === null
          ? null
          : units.map((unit) => (
              <div key={unit.key} className="flex flex-col items-center gap-1">
                <span className="font-heading text-h3 leading-none tabular-nums">
                  {String(time[unit.key]).padStart(2, "0")}
                </span>
                <span className="text-muted-foreground text-caption tracking-wider uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}
