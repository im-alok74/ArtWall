"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { layers } from "@/config/platform";
import {
  ExhibitionDiagram,
  EscrowDiagram,
  ProvenanceDiagram,
} from "@/features/platform/diagrams";
import { fadeUp, transition, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "@/shared/reveal";
import { SectionHeading } from "@/shared/section-heading";

const diagramFor = {
  exhibition: ExhibitionDiagram,
  escrow: EscrowDiagram,
  provenance: ProvenanceDiagram,
} as const;

/**
 * The three layers, told in order.
 *
 * The single design idea here is the rail down the left: one amber line that
 * draws itself as you descend past all three panels. The pitch is that these
 * are *connected* layers rather than three features on a list, and an
 * unbroken line that survives the whole scroll says that more plainly than a
 * paragraph claiming it does.
 *
 * The rail is spring-smoothed rather than bound directly to scroll progress,
 * because a raw scroll binding stutters on trackpads and jumps on a mouse
 * wheel. It is desktop-only: on a phone the panels already stack in a single
 * column, so a line beside them adds nothing but paint.
 */
export function LayerStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.6"],
  });

  const railProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      id="how-it-works"
      className="section-y border-border max-w-wall mx-auto border-t px-5 md:px-12 lg:px-16"
    >
      <Reveal>
        <SectionHeading
          eyebrow="How it works"
          title="Three layers, and each one needs the other two."
          description="Discovery without proof produces fakes. Proof without a market produces certificates nobody wants. A market without discovery produces silence. So we built all three, connected."
        />
      </Reveal>

      <div ref={containerRef} className="relative mt-20">
        {/* The connective rail. */}
        <div
          aria-hidden
          className="bg-border absolute top-2 bottom-2 left-0 hidden w-px lg:block"
        >
          <motion.div
            style={{ scaleY: railProgress, originY: 0 }}
            className="bg-ember h-full w-full"
          />
        </div>

        <div className="flex flex-col gap-24 lg:gap-32 lg:pl-16">
          {layers.map((layer, index) => {
            const Diagram = diagramFor[layer.id as keyof typeof diagramFor];
            const diagramFirst = index % 2 === 1;

            return (
              <article
                key={layer.id}
                id={layer.id}
                className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* The rail's node for this layer. */}
                <motion.span
                  aria-hidden
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={transition.spring}
                  className="bg-ember absolute top-2 -left-16 hidden size-2.5 rounded-full lg:block"
                />

                <Reveal
                  className={cn(
                    "flex flex-col gap-5",
                    diagramFirst && "lg:order-2"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-heading text-ember text-h4 tabular-nums">
                      {layer.index}
                    </span>
                    <span className="bg-border h-px flex-1" />
                  </div>

                  <h3 className="font-heading text-h3 tracking-tight text-balance">
                    {layer.name}
                  </h3>

                  <p className="text-ember text-body-lg text-balance">
                    {layer.claim}
                  </p>

                  <p className="text-muted-foreground text-body">
                    {layer.body}
                  </p>

                  <RevealGroup
                    as="ul"
                    stagger={0.07}
                    className="mt-2 flex flex-col gap-3"
                  >
                    {layer.mechanics.map((mechanic) => (
                      <RevealItem
                        as="li"
                        key={mechanic}
                        className="text-body flex items-start gap-3"
                      >
                        <span
                          aria-hidden
                          className="bg-ember/70 mt-2.5 size-1.5 shrink-0 rounded-full"
                        />
                        <span className="text-muted-foreground">
                          {mechanic}
                        </span>
                      </RevealItem>
                    ))}
                  </RevealGroup>

                  {layer.notThis && (
                    <motion.p
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportOnce}
                      className="border-ember/40 text-small text-muted-foreground mt-2 border-l-2 pl-4"
                    >
                      {layer.notThis}
                    </motion.p>
                  )}
                </Reveal>

                <Reveal
                  delay={0.1}
                  className={cn(diagramFirst && "lg:order-1")}
                >
                  <div className="lg:sticky lg:top-28">
                    <Diagram />
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
