export type ArchetypeId =
  "keeper" | "wanderer" | "alchemist" | "storyteller" | "quiet-eye" | "builder";

export interface Archetype {
  id: ArchetypeId;
  name: string;
  line: string;
  body: string;
  /** Kindred practices, to make the result feel specific rather than generic. */
  kinship: string;
}

/**
 * Six ways of making.
 *
 * Written as recognitions, not compliments. Every result names something true
 * and slightly uncomfortable as well as something flattering — a horoscope
 * that only praises you is forgettable, and Phase 1's psychology section is
 * explicit that specificity is what creates attachment, not flattery.
 */
export const archetypes: Record<ArchetypeId, Archetype> = {
  keeper: {
    id: "keeper",
    name: "The Keeper",
    line: "You are holding a door open for something older than you.",
    body: "Your work carries a lineage — a technique, a motif, a way of seeing handed to you by someone who mattered. You are careful with it, sometimes to a fault. The risk is reverence: the tradition survives you either way, so it can take your fingerprints on it.",
    kinship:
      "Miniature, Madhubani, Pattachitra, Warli, temple and textile craft",
  },
  wanderer: {
    id: "wanderer",
    name: "The Wanderer",
    line: "You make from what you noticed on the way somewhere else.",
    body: "Place is your material — light on a particular street, a face on a train. You work fast and from life. The risk is accumulation: you have far more beginnings than finished pieces, and the best of them deserve the second week you never give them.",
    kinship: "Plein air, street photography, travel sketchbooks, reportage",
  },
  alchemist: {
    id: "alchemist",
    name: "The Alchemist",
    line: "The material is the idea. You are arguing with it.",
    body: "You would rather find out what a substance does than illustrate something you already decided. Rust, resin, thread, pigment you ground yourself. The risk is legibility: what is obvious to your hands is not always obvious on a wall, and a title is not an explanation.",
    kinship: "Mixed media, sculpture, ceramics, experimental printmaking",
  },
  storyteller: {
    id: "storyteller",
    name: "The Storyteller",
    line: "Someone is always about to say something in your work.",
    body: "Your pieces have a before and an after. Figures, gestures, a held moment. People read your work rather than just look at it. The risk is over-explaining: the strongest frame you make is usually the one where you trusted the viewer more than you wanted to.",
    kinship: "Figurative painting, narrative illustration, portraiture, comics",
  },
  "quiet-eye": {
    id: "quiet-eye",
    name: "The Quiet Eye",
    line: "You remove until only the necessary thing is left.",
    body: "Restraint is your whole method — one tone, one gesture, a lot of held space. Your work rewards the person who stays. The risk is austerity: quiet is not the same as empty, and the difference is decided by a very small number of decisions you cannot afford to make carelessly.",
    kinship:
      "Minimal abstraction, monochrome, still life, contemplative photography",
  },
  builder: {
    id: "builder",
    name: "The Builder",
    line: "You think in structure. The composition comes before the subject.",
    body: "Grids, geometry, repetition, architecture — you are drawn to how a thing is put together. Your work holds up under long looking because the bones are right. The risk is control: the pieces of yours that people remember usually contain one thing you let go wrong.",
    kinship:
      "Geometric abstraction, architectural drawing, design, printmaking",
  },
};
