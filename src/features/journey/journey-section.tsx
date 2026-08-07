import {
  Award,
  Frame,
  Handshake,
  Infinity as InfinityIcon,
  Lightbulb,
  Paintbrush,
} from "lucide-react";

import { JourneyStep } from "@/features/journey/journey-step";
import { SectionHeading } from "@/shared/section-heading";

/**
 * An artwork's life, end to end.
 *
 * The argument this section makes: ArtWall is not a shop, it is the whole arc —
 * and the two stages artists are usually robbed of (proof it is theirs, and a
 * record that outlives them) are the two we take most seriously.
 */
const iconClass = "size-4";

const steps = [
  {
    icon: <Lightbulb className={iconClass} aria-hidden />,
    title: "Idea",
    body: "It starts somewhere unglamorous — a sketchbook on a train, a colour you cannot stop thinking about.",
  },
  {
    icon: <Paintbrush className={iconClass} aria-hidden />,
    title: "Create",
    body: "Weeks of work nobody watches. The part that never fits in a caption.",
  },
  {
    icon: <Frame className={iconClass} aria-hidden />,
    title: "Exhibit",
    body: "A wall, real or digital, where the work is seen properly instead of scrolled past.",
  },
  {
    icon: <Award className={iconClass} aria-hidden />,
    title: "Certify",
    body: "A seal that proves this is yours and this is real — readable by a buyer who has never heard of a blockchain.",
  },
  {
    icon: <Handshake className={iconClass} aria-hidden />,
    title: "Collector",
    body: "Someone takes it home, and you know exactly who, for how much, and what share reached you.",
  },
  {
    icon: <InfinityIcon className={iconClass} aria-hidden />,
    title: "Legacy",
    body: "Years later the trail still leads back to you. That is the part galleries were never built to give you.",
  },
] as const;

export function JourneySection() {
  return (
    <section
      id="journey"
      className="section-y border-border max-w-wall mx-auto border-t px-5 md:px-12 lg:px-16"
    >
      <SectionHeading
        eyebrow="The Journey"
        title="From a sketch nobody saw to a record that outlives you."
        description="Six stages every serious piece of art goes through. Most platforms handle one of them."
      />

      <ol className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <JourneyStep
            key={step.title}
            index={index}
            icon={step.icon}
            title={step.title}
            body={step.body}
          />
        ))}
      </ol>
    </section>
  );
}
