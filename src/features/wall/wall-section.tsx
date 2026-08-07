import { CollaborativeCanvas } from "@/features/wall/collaborative-canvas";
import { InteractiveWall } from "@/features/wall/interactive-wall";
import {
  FOUNDING_COHORT_SIZE,
  getRosterCount,
} from "@/features/waitlist/roster";
import { SectionHeading } from "@/shared/section-heading";

/**
 * The Wall.
 *
 * Reads the live roster count on the server and hands it to the one client
 * island that needs interactivity, so the copy and the frames are in the
 * initial HTML and only the claim behaviour costs JavaScript.
 */
export async function WallSection() {
  const taken = await getRosterCount();

  return (
    <section className="section-y max-w-wall mx-auto px-5 md:px-12 lg:px-16">
      <SectionHeading
        eyebrow="The Wall"
        title="One wall. One place each."
        description="Every tile you see is ours — abstract work we made, holding the wall until artists arrive. Each time someone joins, one of ours is replaced by one of theirs. The wall was only ever ours on loan."
      />

      <div className="mt-12">
        <InteractiveWall taken={taken} cohortSize={FOUNDING_COHORT_SIZE} />
      </div>

      <div className="border-border mt-24 border-t pt-16">
        <SectionHeading
          eyebrow="One stroke each"
          title="A painting nobody signs alone."
          description="Every artist leaves exactly one brush stroke here. One rule, no exceptions — including for us."
        />
        <div className="mt-8 max-w-3xl">
          <CollaborativeCanvas />
        </div>
      </div>
    </section>
  );
}
