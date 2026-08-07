/**
 * Genesis tiles — the handcrafted art the wall is made of before artists
 * arrive.
 *
 * The brief is explicit that the wall must never look empty, and it is right:
 * an empty grid reads as an unfinished product, while a wall of real abstract
 * work reads as a gallery that is already alive. Crucially this is not fake
 * data — no invented artist, no borrowed artwork. It is generative art we made,
 * openly labelled as ours, and the narrative depends on it being ours: each
 * tile is later *replaced* by a real artist, until the wall belongs entirely to
 * the community.
 *
 * Palette and forms are drawn from Indian material culture — indigo, madder,
 * turmeric, terracotta, copper, lime-washed wall, handmade paper.
 *
 * Rendered as inline SVG with a deterministic seed rather than as images:
 * hundreds of tiles cost no network requests, scale to any size, animate on the
 * GPU, and stay byte-cheap on a 4G connection. A seeded generator (not
 * Math.random) means the server and client draw exactly the same wall, so
 * hydration matches and a returning visitor sees the wall they remember.
 */

const PIGMENTS = [
  "#2E4374", // indigo
  "#B5573B", // terracotta
  "#C98A2E", // turmeric
  "#7D4A5C", // madder
  "#3F6B5E", // verdigris
  "#8C6239", // copper
  "#4A4E57", // slate
  "#A8603D", // rust
] as const;

const GROUNDS = ["#151619", "#191A1E", "#131417", "#1C1D22"] as const;

/** Small deterministic PRNG (mulberry32) — same seed, same tile, every time. */
function rng(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface GenesisTileProps {
  seed: number;
  className?: string;
}

export function GenesisTile({ seed, className }: GenesisTileProps) {
  const random = rng(seed);
  const ground = GROUNDS[Math.floor(random() * GROUNDS.length)];
  const pigment = PIGMENTS[Math.floor(random() * PIGMENTS.length)];
  const accent = PIGMENTS[Math.floor(random() * PIGMENTS.length)];
  const form = Math.floor(random() * 5);

  // Pre-draw the values each form needs so the JSX below stays readable.
  const a = random();
  const b = random();
  const c = random();

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="100" height="100" fill={ground} />

      {form === 0 && (
        // Brush sweep
        <path
          d={`M${8 + a * 10} ${70 + b * 15} C ${30} ${20 + c * 30}, ${65} ${80 - c * 40}, ${92 - a * 8} ${25 + b * 20}`}
          stroke={pigment}
          strokeWidth={6 + a * 10}
          strokeLinecap="round"
          fill="none"
          opacity={0.55 + b * 0.3}
        />
      )}

      {form === 1 && (
        // Layered fields — lime-washed wall
        <>
          <rect
            y={30 + a * 20}
            width="100"
            height={40 + b * 25}
            fill={pigment}
            opacity={0.5}
          />
          <rect
            y={55 + c * 20}
            width="100"
            height={30}
            fill={accent}
            opacity={0.35}
          />
        </>
      )}

      {form === 2 && (
        // Clay disc
        <circle
          cx={35 + a * 30}
          cy={35 + b * 30}
          r={18 + c * 20}
          fill={pigment}
          opacity={0.6}
        />
      )}

      {form === 3 && (
        // Folded paper / geometry
        <path
          d={`M0 ${100 - a * 55} L${40 + b * 25} ${10 + c * 30} L100 ${100 - b * 40} Z`}
          fill={pigment}
          opacity={0.5}
        />
      )}

      {form === 4 && (
        // Warp and weft — textile
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <rect
              key={i}
              x={i * 20 + a * 6}
              width={4 + b * 5}
              height="100"
              fill={pigment}
              opacity={0.28 + (i % 2) * 0.22}
            />
          ))}
          <rect
            y={40 + c * 30}
            width="100"
            height={5 + a * 6}
            fill={accent}
            opacity={0.5}
          />
        </>
      )}

      {/* Ground tone over everything, so tiles sit back and never shout */}
      <rect width="100" height="100" fill={ground} opacity="0.22" />
    </svg>
  );
}
