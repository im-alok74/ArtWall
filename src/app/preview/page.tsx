import type { Metadata } from "next";

import { PreviewSection } from "@/features/preview/preview-section";

export const metadata: Metadata = {
  title: "See it hung",
  description:
    "Put your own artwork on a gallery, museum, hotel, café or living-room wall. Your image never leaves your device.",
};

export default function PreviewPage() {
  return <PreviewSection />;
}
