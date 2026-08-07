import type { ArchetypeId } from "@/features/archetype/archetypes";

export interface Choice {
  text: string;
  archetype: ArchetypeId;
}

export interface Question {
  prompt: string;
  choices: readonly Choice[];
}

/**
 * Five questions, scored by tally.
 *
 * Written as situations rather than self-assessments. "How creative are you?"
 * measures self-esteem; "you walk into an old haveli — what pulls you in first?"
 * measures attention, which is the thing that actually differs between artists.
 * Nobody can game it toward a flattering answer because no option is the
 * obviously superior one.
 *
 * Every archetype appears at least three times across the set, so no result is
 * unreachable and none is disproportionately likely.
 */
export const questions: readonly Question[] = [
  {
    prompt: "You walk into an old haveli. What pulls you in first?",
    choices: [
      {
        text: "The fading frescoes on the courtyard walls",
        archetype: "keeper",
      },
      {
        text: "A narrow staircase you cannot see the end of",
        archetype: "wanderer",
      },
      {
        text: "The smell of old oil lamps and sandalwood",
        archetype: "alchemist",
      },
      { text: "The silence between the rooms", archetype: "quiet-eye" },
    ],
  },
  {
    prompt: "A piece is nearly finished. What decides that it's done?",
    choices: [
      { text: "It finally matches what I first saw", archetype: "storyteller" },
      {
        text: "Taking anything else away would break it",
        archetype: "quiet-eye",
      },
      { text: "The proportions finally sit right", archetype: "builder" },
      {
        text: "The material stopped fighting me",
        archetype: "alchemist",
      },
    ],
  },
  {
    prompt: "Someone offers you a week anywhere, to work. You pick —",
    choices: [
      {
        text: "A workshop with someone who still does it the old way",
        archetype: "keeper",
      },
      {
        text: "A city I've never been to, with a sketchbook",
        archetype: "wanderer",
      },
      {
        text: "An empty studio, a locked door, no phone",
        archetype: "quiet-eye",
      },
      {
        text: "A foundry, a kiln, a press — somewhere with machines",
        archetype: "alchemist",
      },
    ],
  },
  {
    prompt: "What do you most want someone to do in front of your work?",
    choices: [
      { text: "Recognise something they'd forgotten", archetype: "keeper" },
      {
        text: "Wonder what happened just before this",
        archetype: "storyteller",
      },
      { text: "Stay longer than they meant to", archetype: "quiet-eye" },
      { text: "Try to work out how it was made", archetype: "builder" },
    ],
  },
  {
    prompt: "Your sketchbook, honestly, is mostly —",
    choices: [
      { text: "Faces and figures, half-finished", archetype: "storyteller" },
      { text: "Places, from the corner of a café", archetype: "wanderer" },
      { text: "Grids, plans and measurements", archetype: "builder" },
      { text: "Notes on materials I want to try", archetype: "alchemist" },
    ],
  },
];
