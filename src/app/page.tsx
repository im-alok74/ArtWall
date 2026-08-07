import { FeatureMap } from "@/features/home/feature-map";
import { PlatformTeaser } from "@/features/home/platform-teaser";
import { Hero } from "@/features/hero/hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlatformTeaser />
      <FeatureMap />
    </>
  );
}
