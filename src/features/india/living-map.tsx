"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cities, project } from "@/features/india/cities";
import { cn } from "@/lib/utils";

interface LivingMapProps {
  /** Cities with at least one founding artist, by name. */
  litCities?: readonly string[];
}

/**
 * The Living Map — India's art cities, waiting to be lit.
 *
 * A city glows once a founding artist from it joins. Until then it sits dim but
 * present, which is the honest state and also the more moving one: you can see
 * exactly which places are still dark, and that yours could be the first.
 *
 * Accessibility: the map is a decorative rendering of a list that is also
 * available as real text beneath it. Each city is a focusable button with an
 * accessible name, so the information is reachable by keyboard and screen
 * reader without depending on hover or on seeing the layout.
 *
 * Performance: pure SVG, no map library, no tiles, no external requests. Twenty
 * circles and a handful of transitions — it costs essentially nothing and
 * scales to any screen size without a raster asset.
 */
export function LivingMap({ litCities = [] }: LivingMapProps) {
  const [active, setActive] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const lit = new Set(litCities);

  const activeCity = cities.find((city) => city.name === active);

  return (
    <div className="flex flex-col gap-6">
      <div className="border-border bg-wall-charcoal/30 relative overflow-hidden rounded-xl border">
        <svg
          viewBox="0 0 100 112"
          className="h-auto w-full"
          role="img"
          aria-label="Art cities across India"
        >
          {/* Faint links between neighbouring cities — a constellation, not a
              border. Drawn first so points sit above them. */}
          {cities.slice(0, -1).map((city, index) => {
            const a = project(city);
            const b = project(cities[index + 1]);
            return (
              <line
                key={city.name}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--color-ink)"
                strokeOpacity="0.06"
                strokeWidth="0.2"
              />
            );
          })}

          {cities.map((city, index) => {
            const { x, y } = project(city);
            const isLit = lit.has(city.name);
            const isActive = active === city.name;

            return (
              <g key={city.name}>
                {isLit && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={3.2}
                    fill="var(--color-ember)"
                    opacity={0.18}
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { opacity: [0.1, 0.25, 0.1] }
                    }
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 1.5 : 1.1}
                  fill={isLit ? "var(--color-ember)" : "var(--color-ink)"}
                  fillOpacity={isLit ? 1 : isActive ? 0.7 : 0.28}
                  className="transition-all"
                />
                {/* Generous invisible hit area — 1px dots are unclickable. */}
                <circle
                  cx={x}
                  cy={y}
                  r={3.5}
                  fill="transparent"
                  tabIndex={0}
                  role="button"
                  aria-label={`${city.name}, ${city.state} — ${city.known}${isLit ? ", has founding artists" : ", no artists yet"}`}
                  className="cursor-pointer focus:outline-none"
                  onMouseEnter={() => setActive(city.name)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(city.name)}
                  onBlur={() => setActive(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Readout. Fixed height so hovering never reflows the page. */}
        <div className="border-border min-h-16 border-t px-5 py-4">
          {activeCity ? (
            <>
              <p className="text-body">
                {activeCity.name}
                <span className="text-muted-foreground">
                  {" "}
                  &middot; {activeCity.state}
                </span>
              </p>
              <p className="text-muted-foreground text-small">
                {activeCity.known}
              </p>
            </>
          ) : (
            <p className="text-muted-foreground text-small">
              Hover or tab through a city.{" "}
              {lit.size === 0
                ? "None are lit yet — the first artist from a city lights it."
                : `${lit.size} of ${cities.length} lit so far.`}
            </p>
          )}
        </div>
      </div>

      {/* The same information as plain text — never trapped in the graphic. */}
      <details className="text-muted-foreground text-small">
        <summary className="hover:text-foreground cursor-pointer transition-colors">
          View all {cities.length} cities as a list
        </summary>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <li key={city.name}>
              <span
                className={cn(
                  lit.has(city.name) ? "text-ember" : "text-foreground"
                )}
              >
                {city.name}
              </span>
              <span className="text-muted-foreground"> — {city.known}</span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
