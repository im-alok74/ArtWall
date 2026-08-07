"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Sparkles, X } from "lucide-react";

import { primaryCta } from "@/config/nav";
import type { WallTile as Tile } from "@/features/waitlist/store";
import { GenesisTile } from "@/features/wall/genesis-tile";
import { WallTile } from "@/features/wall/wall-tile";
import { transition } from "@/lib/motion";

interface InteractiveWallProps {
  tiles: readonly Tile[];
  taken: number;
  cohortSize: number;
  /** Total frames drawn; genesis art fills whatever artists have not claimed. */
  visibleFrames?: number;
}

/**
 * The Wall.
 *
 * Genesis art holds every place that no artist has taken yet, so the wall is
 * never empty — and each artwork that arrives permanently replaces one of ours.
 * The tiles animate in on a capped cascade rather than all at once, which reads
 * as a wall being hung rather than a page loading.
 *
 * Search is the "find myself" path: type a name and everything else dims,
 * leaving your own tile ringed. It runs client-side over the already-loaded
 * roster — no request per keystroke, instant feedback — and `useDeferredValue`
 * keeps typing smooth even while several hundred tiles re-render.
 */
export function InteractiveWall({
  tiles,
  taken,
  cohortSize,
  visibleFrames = 120,
}: InteractiveWallProps) {
  const [claiming, setClaiming] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const trimmed = deferredQuery.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!trimmed) return null;
    return new Set(
      tiles
        .filter(
          (tile) =>
            tile.name.toLowerCase().includes(trimmed) ||
            tile.city?.toLowerCase().includes(trimmed) ||
            String(tile.founderNumber) === trimmed.replace("#", "")
        )
        .map((tile) => tile.founderNumber)
    );
  }, [tiles, trimmed]);

  const yourNumber = taken + 1;
  const genesisCount = Math.max(0, visibleFrames - tiles.length);

  return (
    <div className="flex flex-col gap-6">
      {/* Find yourself */}
      <div className="flex flex-col gap-2 sm:max-w-sm">
        <label htmlFor="wall-search" className="sr-only">
          Find an artist on the wall
        </label>
        <div className="relative">
          <Search
            aria-hidden
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <input
            id="wall-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find yourself — name, city or #number"
            className="border-border bg-background placeholder:text-muted-foreground text-body h-11 w-full rounded-md border pr-9 pl-9"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 p-1 transition-colors"
            >
              <X className="size-4" aria-hidden />
            </button>
          )}
        </div>
        <p
          aria-live="polite"
          className="text-muted-foreground text-caption min-h-4"
        >
          {matches &&
            (matches.size === 0
              ? "Nobody by that name on the wall yet."
              : `${matches.size} ${matches.size === 1 ? "artist" : "artists"} found.`)}
        </p>
      </div>

      <div className="border-border bg-wall-charcoal/40 relative overflow-hidden rounded-xl border p-2 sm:p-3">
        <motion.ul
          layout
          className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 sm:gap-2 lg:grid-cols-10"
        >
          {tiles.map((tile, index) => (
            <WallTile
              key={tile.founderNumber}
              tile={tile}
              index={index}
              dimmed={matches ? !matches.has(tile.founderNumber) : false}
              highlighted={matches?.has(tile.founderNumber) ?? false}
            />
          ))}

          {/* Your place — the next free frame */}
          <motion.li layout className="aspect-square">
            <button
              type="button"
              onClick={() => setClaiming((open) => !open)}
              aria-expanded={claiming}
              className="border-ember/60 bg-ember/10 hover:bg-ember/20 group relative size-full rounded-md border transition-colors"
            >
              <span className="sr-only">
                Claim place number {yourNumber} on the wall
              </span>
              <Sparkles
                aria-hidden
                className="text-ember/80 absolute inset-0 m-auto size-4 transition-transform group-hover:scale-110"
              />
            </button>
          </motion.li>

          {/* Genesis art holds everything not yet claimed */}
          {Array.from({ length: genesisCount }).map((_, index) => (
            <motion.li
              layout
              key={`genesis-${index}`}
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: matches ? 0.12 : 1 }}
              transition={{
                duration: 0.4,
                delay: Math.min(index * 0.004, 0.4),
              }}
              className="border-ink/8 aspect-square overflow-hidden rounded-md border"
            >
              <GenesisTile
                seed={(index + tiles.length) * 2654435761}
                className="size-full"
              />
            </motion.li>
          ))}
        </motion.ul>
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
            <div className="border-border bg-wall-charcoal/60 mx-auto flex max-w-xl flex-col gap-4 rounded-xl border p-6 text-center">
              <h3 className="font-heading text-h4">
                Place #{yourNumber} is yours
              </h3>
              <p className="text-muted-foreground text-small">
                Upload one artwork — and your photo, if you want people to see
                the face behind it. It goes on the wall straight away.
              </p>
              <Link
                href={primaryCta.href}
                className="bg-ember text-wall-black hover:bg-ember-glow text-body inline-flex h-11 items-center justify-center rounded-md font-medium transition-colors"
              >
                Take your place
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
