import type { Metadata } from "next";

import { JourneySection } from "@/features/journey/journey-section";

export const metadata: Metadata = {
  title: "The Journey",
  description:
    "Idea, create, exhibit, certify, collector, legacy — the six stages of an artwork's life, and the ones most platforms ignore.",
};

export default function JourneyPage() {
  return <JourneySection />;
}
