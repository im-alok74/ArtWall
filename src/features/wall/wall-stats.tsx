"use client";

import { motion } from "framer-motion";

import { duration, ease } from "@/lib/motion";
import { CountUp } from "@/shared/count-up";

interface WallStatsProps {
  artists: number;
  cities: number;
  cohortSize: number;
}

/**
 * How full the wall is.
 *
 * Every figure here is counted from the database — artists who actually
 * joined, cities they actually named. There is no seeded baseline and no
 * rounded-up "community" number. A founding artist can see the count go up by
 * exactly one when they join, and that is only true if it was never inflated
 * to begin with. It also means the panel reads honestly small at the start,
 * which is the correct thing for it to do.
 */
export function WallStats({ artists, cities, cohortSize }: WallStatsProps) {
  const filled = Math.min(1, artists / cohortSize);

  return (
    <div className="border-border bg-wall-charcoal/80 flex w-full flex-col gap-4 rounded-lg border p-5 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="bg-ember size-1.5 animate-pulse rounded-full" />
        <span className="text-caption text-muted-foreground tracking-[0.14em] uppercase">
          The wall is growing
        </span>
      </div>

      <div className="flex flex-col">
        <span className="font-heading text-display-s leading-none tracking-tight tabular-nums">
          <CountUp to={artists} seconds={duration.scene} />
        </span>
        <span className="text-small text-muted-foreground mt-1">
          {artists === 1 ? "artist joined" : "artists joined"}
        </span>
      </div>

      <dl className="border-border grid grid-cols-2 gap-4 border-t pt-4">
        <div className="flex flex-col">
          <dt className="font-heading text-h4 tabular-nums">
            <CountUp to={artists} seconds={duration.scene} />
          </dt>
          <dd className="text-caption text-muted-foreground">
            {artists === 1 ? "Artwork live" : "Artworks live"}
          </dd>
        </div>
        <div className="flex flex-col">
          <dt className="font-heading text-h4 tabular-nums">
            <CountUp to={cities} seconds={duration.scene} />
          </dt>
          <dd className="text-caption text-muted-foreground">
            {cities === 1 ? "City" : "Cities"}
          </dd>
        </div>
      </dl>

      <div className="flex flex-col gap-2">
        <div className="bg-wall-elevated h-1 overflow-hidden rounded-full">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: Math.max(filled, 0.008) }}
            transition={{ duration: duration.scene, ease: ease.standard }}
            style={{ originX: 0 }}
            className="from-ember to-ember-glow h-full w-full rounded-full bg-linear-to-r"
          />
        </div>
        <span className="text-caption text-ink-muted tabular-nums">
          {artists} of {cohortSize} founding places filled
        </span>
      </div>
    </div>
  );
}
