"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * The Unlit Wall — the hero's living backdrop (Phase 1 #1, #3).
 *
 * A field of empty frames in near-darkness. Moving the cursor carries a warm
 * gallery spotlight across them, so the space reveals itself as you explore
 * rather than presenting itself all at once.
 *
 * Why the wall is empty: ArtWall has not launched, so there are no artists on
 * it yet. Filling it with stock art would be the exact trust violation the
 * brand is built against — and an unlit wall is a far stronger invitation than
 * a fake-busy one. Each frame is a place someone is about to take.
 *
 * Performance: this is the piece most likely to wreck the frame budget, so the
 * pointer handler never touches React state. It writes two CSS custom
 * properties on a single element, coalesced to one write per animation frame,
 * and the glow is painted by one composited radial-gradient layer rather than
 * by restyling ~200 individual tiles. Cost stays flat no matter how dense the
 * grid gets.
 *
 * Accessibility: entirely decorative — the whole field is `aria-hidden` and
 * carries no information that is not also in the hero copy. Touch devices never
 * fire the hover path, and reduced-motion users get the static resting glow via
 * the CSS media query in globals.css.
 */
export function UnlitWall() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const pending = useRef<{ x: number; y: number } | null>(null);

  const flush = useCallback(() => {
    frameRef.current = null;
    const root = rootRef.current;
    const next = pending.current;
    if (!root || !next) return;

    root.style.setProperty("--spot-x", `${next.x}%`);
    root.style.setProperty("--spot-y", `${next.y}%`);
    root.style.setProperty("--spot-opacity", "1");
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;
      const root = rootRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      pending.current = {
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      };

      frameRef.current ??= requestAnimationFrame(flush);
    },
    [flush]
  );

  const handlePointerLeave = useCallback(() => {
    rootRef.current?.style.setProperty("--spot-opacity", "0");
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="absolute inset-0 overflow-hidden"
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "38%",
          "--spot-opacity": "0",
        } as React.CSSProperties
      }
    >
      {/* The frames. auto-fill keeps density right at every width with no JS. */}
      <div className="grid h-full w-full grid-cols-[repeat(auto-fill,minmax(84px,1fr))] grid-rows-[repeat(auto-fill,minmax(84px,1fr))] gap-px">
        {Array.from({ length: 240 }).map((_, i) => (
          <div key={i} className="border-ink/7 bg-ink/2 border" />
        ))}
      </div>

      {/* The spotlight. One composited layer, moved by custom properties. */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--spot-opacity)",
          background:
            "radial-gradient(380px circle at var(--spot-x) var(--spot-y), rgb(232 163 61 / 0.13), transparent 72%)",
        }}
      />

      {/* Resting warmth, so the wall is never fully dead before first move. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 32%, rgb(232 163 61 / 0.055), transparent 70%)",
        }}
      />

      {/* Vignette: keeps the hero copy legible over the field. */}
      <div className="from-background via-background/55 pointer-events-none absolute inset-0 bg-linear-to-b to-transparent" />
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t to-transparent" />
    </div>
  );
}
