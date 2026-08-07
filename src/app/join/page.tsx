import type { Metadata } from "next";

import { JoinSection } from "@/features/waitlist/join-section";

export const metadata: Metadata = {
  title: "Founding Artists",
  description:
    "Join the first five hundred artists on ArtWall. A numbered place, first access at launch, and free certification for your first works.",
};

export default function JoinPage() {
  return <JoinSection />;
}
