"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeUp, transition, viewportOnce } from "@/lib/motion";

interface JourneyStepProps {
  index: number;
  /**
   * The already-rendered icon element, not the component.
   *
   * Component *references* cannot cross the Server/Client boundary — they are
   * functions, and functions are not serialisable. Rendered elements are, so
   * the parent Server Component does the rendering and passes the result.
   */
  icon: ReactNode;
  title: string;
  body: string;
}

/**
 * One stage of the journey, revealed as it scrolls into view.
 *
 * The reveal is staggered by index so the six stages arrive in narrative order
 * rather than all at once — the motion is doing the storytelling work, which is
 * the only justification this system accepts for animating anything.
 *
 * `viewportOnce` means it never re-triggers on scroll-back; a section that
 * re-animates every pass reads as twitchy rather than considered.
 *
 * Under reduced motion the global MotionConfig drops the transform and the step
 * simply appears — no information is carried by the movement alone.
 */
export function JourneyStep({ index, icon, title, body }: JourneyStepProps) {
  return (
    <motion.li
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ ...transition.moderate, delay: (index % 3) * 0.08 }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <span className="border-ember/30 bg-ember/10 text-ember flex size-9 shrink-0 items-center justify-center rounded-full border">
          {icon}
        </span>
        <span className="text-muted-foreground text-label tracking-wider tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="font-heading text-h4 tracking-tight">{title}</h3>
      <p className="text-muted-foreground text-body">{body}</p>
    </motion.li>
  );
}
