import type { Metadata } from "next";

import { CertificateDemo } from "@/features/certificate/certificate-demo";
import { SectionHeading } from "@/shared/section-heading";

export const metadata: Metadata = {
  title: "Certification",
  description:
    "How ArtWall proves a physical artwork is yours — explained in four steps, without a single word of crypto jargon.",
};

export default function CertificatePage() {
  return (
    <section className="section-y max-w-wall mx-auto px-5 md:px-12 lg:px-16">
      <SectionHeading
        eyebrow="Certification"
        title="Proof that the work is yours."
        description="Forged and unverifiable 'originals' are the reason Indian art prices stay soft. Here is exactly how we fix that for your work — in four steps, no jargon."
      />

      <div className="mt-12 max-w-4xl">
        <CertificateDemo />
      </div>
    </section>
  );
}
