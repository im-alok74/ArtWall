"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";

import { transition } from "@/lib/motion";

interface Stroke {
  d: string;
  hue: string;
}

const PIGMENTS = [
  "#E8A33D",
  "#B5573B",
  "#2E4374",
  "#3F6B5E",
  "#7D4A5C",
  "#C98A2E",
] as const;

/**
 * The Collaborative Canvas — one stroke each, forever.
 *
 * Every artist gets exactly one mark. The constraint is the whole idea: a
 * canvas anyone can paint on endlessly becomes noise, while a canvas where you
 * get one stroke makes you think about where to put it. Over time the piece
 * belongs to thousands of people and to none of them.
 *
 * Current scope, stated plainly: strokes live in this browser session only.
 * Persisting them to a shared canvas needs moderation (anything a stranger can
 * draw on a public surface *will* eventually be drawn), rate limiting, and an
 * append-only store — none of which should be improvised. The interaction is
 * real and complete; the shared backing store is the next step, and the
 * component is shaped so that swapping local state for a server feed touches
 * nothing else.
 *
 * Accessibility: drawing is pointer-only by nature, so this is presented as an
 * optional flourish, never a gate. It carries no information needed elsewhere.
 */
export function CollaborativeCanvas() {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [spent, setSpent] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const liveRef = useRef<SVGPathElement>(null);
  const points = useRef<string[]>([]);
  const drawing = useRef(false);

  const toLocal = useCallback((event: React.PointerEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };
  }, []);

  function start(event: React.PointerEvent<SVGSVGElement>) {
    if (spent) return;
    const point = toLocal(event);
    if (!point) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.current = true;
    points.current = [`M ${point.x} ${point.y}`];
  }

  function move(event: React.PointerEvent<SVGSVGElement>) {
    if (!drawing.current) return;
    const point = toLocal(event);
    if (!point) return;
    points.current.push(`L ${point.x} ${point.y}`);
    liveRef.current?.setAttribute("d", points.current.join(" "));
  }

  function end() {
    if (!drawing.current) return;
    drawing.current = false;

    const d = points.current.join(" ");
    points.current = [];
    liveRef.current?.setAttribute("d", "");

    if (d.split("L").length < 3) return; // ignore an accidental tap

    setStrokes((previous) => [
      ...previous,
      { d, hue: PIGMENTS[previous.length % PIGMENTS.length] },
    ]);
    setSpent(true);
  }

  return (
    <div className="flex flex-col gap-4">
      <svg
        ref={svgRef}
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
        aria-hidden
        className="border-border bg-wall-charcoal h-48 w-full touch-none rounded-xl border sm:h-64"
        style={{ cursor: spent ? "default" : "crosshair" }}
      >
        {strokes.map((stroke, index) => (
          <motion.path
            key={index}
            d={stroke.d}
            fill="none"
            stroke={stroke.hue}
            strokeWidth={0.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={transition.slow}
          />
        ))}
        <path
          ref={liveRef}
          fill="none"
          stroke="var(--color-ember)"
          strokeWidth={0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p className="text-muted-foreground text-small">
        {spent ? (
          <>
            That&rsquo;s your stroke. One each — that&rsquo;s the whole rule.{" "}
            <button
              type="button"
              onClick={() => {
                setStrokes([]);
                setSpent(false);
              }}
              className="hover:text-foreground underline underline-offset-4 transition-colors"
            >
              Clear and try again
            </button>
          </>
        ) : (
          "Drag once to leave a single brush stroke. You only get one."
        )}
      </p>
    </div>
  );
}
