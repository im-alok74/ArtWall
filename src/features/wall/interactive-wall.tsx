"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { primaryCta } from "@/config/nav";
import { GenesisTile } from "@/features/wall/genesis-tile";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
  SignatureCanvas,
  type SignatureValue,
} from "@/shared/signature-canvas";

interface InteractiveWallProps {
  /** How many founding places are already claimed. */
  taken: number;
  cohortSize: number;
  /** How many frames to actually render — the wall implies more than it draws. */
  visibleFrames?: number;
}

/**
 * The Wall — one place per artist, claimed by hand.
 *
 * The interaction: the next free frame is yours. Sign it and your mark appears
 * on the wall immediately, right where it would live. Nothing is saved until
 * you actually join, so this is a true preview rather than a fake commitment —
 * it answers "what would I get?" before asking for an email, which is the whole
 * argument of the pre-launch site.
 *
 * Why signing beats a form here: the artist makes something. That is the
 * difference between a visitor and a participant, and it is the moment we are
 * betting they remember tomorrow.
 *
 * Accessibility: the claim frame is a real <button> reachable by keyboard, and
 * the signature step is optional with a typed alternative — drawing is never
 * the only way through. Decorative empty frames are hidden from assistive tech
 * so a screen reader hears one meaningful control, not 60 empty cells.
 */
export function InteractiveWall({
  taken,
  cohortSize,
  visibleFrames = 60,
}: InteractiveWallProps) {
  const [signature, setSignature] = useState<SignatureValue | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [name, setName] = useState("");

  const yourNumber = taken + 1;
  const hasMark = (signature?.paths.length ?? 0) > 0 || name.trim().length > 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="border-border bg-wall-charcoal/40 relative overflow-hidden rounded-xl border p-2 sm:p-3">
        <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 sm:gap-2 lg:grid-cols-10">
          {Array.from({ length: visibleFrames }).map((_, index) => {
            // Claimed places are shown lit but anonymous: a founding artist's
            // name and work go public when they choose, not when they join.
            const isClaimed = index < taken;
            const isYours = index === taken;

            if (isClaimed) {
              return (
                <div
                  key={index}
                  aria-hidden
                  className="border-ember/25 bg-ember/10 aspect-square overflow-hidden rounded-md border"
                />
              );
            }

            if (isYours) {
              return (
                <button
                  key="yours"
                  type="button"
                  onClick={() => setClaiming(true)}
                  aria-expanded={claiming}
                  className={cn(
                    "border-ember/60 bg-ember/10 hover:bg-ember/20 group relative aspect-square rounded-md border transition-colors",
                    claiming && "bg-ember/20"
                  )}
                >
                  <span className="sr-only">
                    Claim place number {yourNumber} on the wall
                  </span>
                  {hasMark ? (
                    signature ? (
                      <svg
                        viewBox={signature.viewBox}
                        className="size-full p-1"
                        aria-hidden
                      >
                        {signature.paths.map((d, i) => (
                          <path
                            key={i}
                            d={d}
                            fill="none"
                            stroke="var(--color-ember)"
                            strokeWidth={8}
                            strokeLinecap="round"
                          />
                        ))}
                      </svg>
                    ) : (
                      <span
                        aria-hidden
                        className="text-ember font-heading text-caption flex size-full items-center justify-center p-1 leading-tight break-all"
                      >
                        {name.trim().slice(0, 12)}
                      </span>
                    )
                  ) : (
                    <Sparkles
                      aria-hidden
                      className="text-ember/70 absolute inset-0 m-auto size-4 transition-transform group-hover:scale-110"
                    />
                  )}
                </button>
              );
            }

            // Genesis art: ours for now, and replaced by a real artist's work
            // the moment someone takes this place.
            return (
              <div
                key={index}
                aria-hidden
                className="border-ink/8 aspect-square overflow-hidden rounded-md border"
              >
                <GenesisTile seed={index * 2654435761} className="size-full" />
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-muted-foreground text-small text-center">
        <span className="text-foreground font-medium tabular-nums">
          {taken}
        </span>{" "}
        of {cohortSize} founding places taken &middot; yours would be{" "}
        <span className="text-ember font-medium tabular-nums">
          #{yourNumber}
        </span>
      </p>

      <AnimatePresence initial={false}>
        {claiming && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={transition.moderate}
            className="overflow-hidden"
          >
            <div className="border-border bg-wall-charcoal/60 mx-auto flex max-w-xl flex-col gap-5 rounded-xl border p-6">
              <div>
                <h3 className="font-heading text-h4">
                  Place #{yourNumber} is yours
                </h3>
                <p className="text-muted-foreground text-small mt-1">
                  Leave your mark on it. Nothing is saved yet — this is just so
                  you can see it.
                </p>
              </div>

              <SignatureCanvas value={signature} onChange={setSignature} />

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="wall-name"
                  className="text-label text-muted-foreground tracking-wider uppercase"
                >
                  Or type your name
                </label>
                <input
                  id="wall-name"
                  type="text"
                  value={name}
                  maxLength={40}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="border-border bg-background placeholder:text-muted-foreground text-body h-11 rounded-md border px-3"
                />
              </div>

              <a
                href={primaryCta.href}
                className="bg-ember text-wall-black hover:bg-ember-glow text-body inline-flex h-11 items-center justify-center gap-2 rounded-md font-medium transition-colors"
              >
                Claim it for real
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
