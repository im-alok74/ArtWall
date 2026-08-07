import { CollaborativeCanvas } from "@/features/wall/collaborative-canvas";
import { getRecentJoins, getWallTiles } from "@/features/wall/data";
import { WallExperience } from "@/features/wall/wall-experience";
import { FOUNDING_COHORT_SIZE } from "@/features/waitlist/roster";
import { SectionHeading } from "@/shared/section-heading";

/**
 * The Wall.
 *
 * Reads the hanging works and the join history on the server and hands both to
 * one client island. Every artwork is therefore in the initial HTML —
 * crawlable, and visible before a byte of JavaScript arrives. The island adds
 * only the installation: the camera, the dust, the dissolve, and the search.
 *
 * The two reads are issued together rather than awaited in sequence; they are
 * independent queries and there is no reason for the second to wait on the
 * first.
 */
export async function WallSection() {
  const [tiles, events] = await Promise.all([getWallTiles(), getRecentJoins()]);

  return (
    <section className="section-y max-w-wall mx-auto px-5 md:px-12 lg:px-16">
      {/* On large screens this heading lives on the wall itself, so it is
          hidden there rather than said twice. */}
      <div className="lg:hidden">
        <SectionHeading
          eyebrow="The Wall"
          title="One wall. One place each."
          description="It begins as ours — a wall of Warli, Madhubani, Phad, Gond, and Ajrakh that we drew ourselves. As artists join, each piece of it dissolves into real work. The wall was only ever ours on loan."
        />
      </div>

      <div className="mt-12 lg:mt-0">
        <WallExperience
          tiles={tiles}
          events={events}
          cohortSize={FOUNDING_COHORT_SIZE}
        />
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
