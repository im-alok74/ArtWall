import type { Metadata } from "next";

import { LivingMap } from "@/features/india/living-map";
import { getLitCities } from "@/features/waitlist/roster";
import { SectionHeading } from "@/shared/section-heading";

export const metadata: Metadata = {
  title: "Living Map",
  description:
    "India's art cities, lighting up one founding artist at a time — from Madhubani to Kochi, Srinagar to Santiniketan.",
};

export default async function IndiaPage() {
  const litCities = await getLitCities();

  return (
    <section className="section-y max-w-wall mx-auto px-5 md:px-12 lg:px-16">
      <SectionHeading
        eyebrow="Living map"
        title="A country that lights up one artist at a time."
        description="Twenty cities with traditions worth the world's attention. Each one stays dark until an artist from there takes a place on the wall."
      />

      <div className="mt-12 max-w-4xl">
        <LivingMap litCities={litCities} />
      </div>
    </section>
  );
}
