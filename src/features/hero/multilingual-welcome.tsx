"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * "This wall is for you," in the languages artists actually think in.
 *
 * `lang` is set per line so screen readers switch pronunciation rules and so
 * the browser picks the right script font. The English line is last and is
 * where the sequence rests.
 *
 * Translations need a native-speaker pass before launch — a welcome that is
 * subtly wrong in someone's mother tongue does the opposite of belonging.
 */
const welcomes = [
  { lang: "hi", text: "यह दीवार आपके लिए है" },
  { lang: "bn", text: "এই দেয়াল আপনার জন্য" },
  { lang: "ta", text: "இந்தச் சுவர் உங்களுக்கானது" },
  { lang: "te", text: "ఈ గోడ మీ కోసం" },
  { lang: "mr", text: "ही भिंत तुमच्यासाठी आहे" },
  { lang: "gu", text: "આ દીવાલ તમારા માટે છે" },
  { lang: "kn", text: "ಈ ಗೋಡೆ ನಿಮಗಾಗಿ" },
  { lang: "pa", text: "ਇਹ ਕੰਧ ਤੁਹਾਡੇ ਲਈ ਹੈ" },
  { lang: "en", text: "This wall is for you" },
] as const;

const STEP_MS = 900;

/**
 * Cycles the welcome once through Indian scripts and settles on English.
 *
 * Why it exists: it is the cheapest, fastest signal that this platform was
 * built in India for Indian artists — before a single word of copy has to
 * claim it.
 *
 * Accessibility: only the settled English line is exposed to assistive tech
 * (the cycling copies are `aria-hidden`), so a screen reader hears one clear
 * sentence instead of nine. Under `prefers-reduced-motion` the cycle is skipped
 * entirely and the final line renders immediately.
 *
 * Performance: no web fonts are loaded for these scripts. Indian devices carry
 * Indic system fonts, and shipping eight Noto families to animate one line for
 * eight seconds would be an indefensible trade against our LCP budget.
 */
export function MultilingualWelcome() {
  const prefersReducedMotion = useReducedMotion();
  const settledIndex = welcomes.length - 1;

  // Starts at 0 (Hindi) on both server and client, so the markup is
  // deterministic and hydration-safe. The interval advances it; it is never
  // set synchronously during an effect, which would cascade renders.
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let next = 0;
    const id = setInterval(() => {
      next += 1;
      setStep(next);
      if (next >= settledIndex) clearInterval(id);
    }, STEP_MS);

    return () => clearInterval(id);
  }, [prefersReducedMotion, settledIndex]);

  // Reduced motion skips the whole cycle and rests on English immediately.
  const index = prefersReducedMotion
    ? settledIndex
    : Math.min(step, settledIndex);
  const current = welcomes[index];

  return (
    // A fixed min-height reserves the line so swapping scripts of different
    // heights never nudges the copy below it. `mode="wait"` means only one
    // language is ever mounted, so no absolute positioning is needed.
    <p className="text-muted-foreground text-body flex min-h-8 items-center justify-center">
      {/* The stable, announced version. */}
      <span className="sr-only">{welcomes[settledIndex].text}</span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current.lang}
          lang={current.lang}
          aria-hidden
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.28 }}
          className="block text-center"
        >
          {current.text}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
