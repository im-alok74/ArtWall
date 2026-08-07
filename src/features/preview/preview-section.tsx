import { ArtworkPreview } from "@/features/preview/artwork-preview";
import { SectionHeading } from "@/shared/section-heading";

export function PreviewSection() {
  return (
    <section
      id="preview"
      className="section-y border-border max-w-wall mx-auto border-t px-5 md:px-12 lg:px-16"
    >
      <SectionHeading
        eyebrow="See it hung"
        title="Your work, on a wall that isn't yours yet."
        description="Most artists have never seen their own painting in a gallery, a hotel lobby, or someone's home. Put it there now — it takes one tap, and the image never leaves your device."
      />

      <div className="mt-12">
        <ArtworkPreview />
      </div>
    </section>
  );
}
