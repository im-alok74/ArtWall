"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { WallTile as Tile } from "@/features/waitlist/store";
import { cn } from "@/lib/utils";

interface WallTileProps {
  tile: Tile;
  index: number;
  /** Dimmed when a search is active and this tile is not a match. */
  dimmed?: boolean;
  /** Ringed when it is the artist the visitor searched for. */
  highlighted?: boolean;
}

/**
 * One artist's place on the wall.
 *
 * Images go through `next/image` pointed at Cloudinary, so each tile is served
 * at roughly the size it is displayed, in AVIF or WebP, and lazily below the
 * fold. That is what keeps a wall of hundreds of photographs from becoming the
 * slow page the brief specifically warns against — the originals are already
 * compressed at upload, and this trims them again per viewport.
 *
 * Hover and focus both reveal the detail panel, so the information is reachable
 * without a mouse.
 */
export function WallTile({ tile, index, dimmed, highlighted }: WallTileProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: dimmed ? 0.18 : 1, scale: 1 }}
      transition={{
        duration: 0.4,
        // Cap the cascade so late tiles are not left waiting seconds.
        delay: Math.min(index * 0.012, 0.5),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative aspect-square overflow-hidden rounded-md",
        highlighted && "ring-ember z-10 ring-2 ring-offset-2 ring-offset-black"
      )}
    >
      <Image
        src={tile.artworkUrl}
        alt={
          tile.artworkTitle
            ? `${tile.artworkTitle} by ${tile.name}`
            : `Artwork by ${tile.name}`
        }
        fill
        sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 10vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Detail panel. Focusable so keyboard users can reach it too. */}
      <div
        tabIndex={0}
        className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
      >
        <p className="text-caption truncate font-medium text-white">
          {tile.name}
        </p>
        {tile.city && (
          <p className="text-caption truncate text-white/70">{tile.city}</p>
        )}
        <p className="text-ember text-caption tabular-nums">
          #{tile.founderNumber}
        </p>
      </div>

      {tile.selfieUrl && (
        <Image
          src={tile.selfieUrl}
          alt=""
          width={28}
          height={28}
          className="absolute top-1.5 right-1.5 size-6 rounded-full border border-white/40 object-cover opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </motion.li>
  );
}
