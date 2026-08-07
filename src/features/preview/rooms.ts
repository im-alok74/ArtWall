/**
 * The rooms an artwork can be previewed in.
 *
 * Each room is described as CSS (gradients + geometry) rather than a
 * photograph. Three reasons that is the better engineering call here:
 *
 *  1. Weight — five licensed interior photographs would add megabytes to a page
 *     whose entire argument is that it loads instantly on an Indian 4G phone.
 *  2. Consistency — a generated room can be lit to match the brand exactly,
 *     where stock photography drags in someone else's colour grade.
 *  3. Focus — an abstract room keeps attention on the artwork, which is the
 *     whole point. A photorealistic sofa competes with the painting.
 *
 * If real photography is added later, only this table and the room renderer
 * change; the upload and framing logic is untouched.
 */
export interface Room {
  id: string;
  label: string;
  /** Short line shown under the preview — sets the scene. */
  caption: string;
  /** The wall surface behind the artwork. */
  wall: string;
  /** Floor/foreground band. */
  floor: string;
  /** Ambient light wash over the scene. */
  light: string;
  /** Frame treatment that suits the room. */
  frame: "thin-dark" | "wide-light" | "none";
}

export const rooms: readonly Room[] = [
  {
    id: "gallery",
    label: "Gallery",
    caption: "A white-cube gallery, lit from above.",
    wall: "linear-gradient(180deg, #EFEDE8 0%, #E2DFD8 100%)",
    floor: "linear-gradient(180deg, #CFCAC1 0%, #B8B2A8 100%)",
    light:
      "radial-gradient(60% 45% at 50% 8%, rgb(255 250 235 / 0.85), transparent 70%)",
    frame: "thin-dark",
  },
  {
    id: "museum",
    label: "Museum",
    caption: "A deep-toned museum hall.",
    wall: "linear-gradient(180deg, #2A3038 0%, #1D222A 100%)",
    floor: "linear-gradient(180deg, #171B21 0%, #101317 100%)",
    light:
      "radial-gradient(55% 40% at 50% 10%, rgb(255 226 170 / 0.35), transparent 72%)",
    frame: "wide-light",
  },
  {
    id: "hotel",
    label: "Luxury hotel",
    caption: "A warm hotel suite at dusk.",
    wall: "linear-gradient(180deg, #3B322A 0%, #2A231D 100%)",
    floor: "linear-gradient(180deg, #241D18 0%, #191411 100%)",
    light:
      "radial-gradient(65% 50% at 50% 15%, rgb(232 163 61 / 0.28), transparent 74%)",
    frame: "wide-light",
  },
  {
    id: "cafe",
    label: "Café",
    caption: "An afternoon café wall.",
    wall: "linear-gradient(180deg, #C9B79E 0%, #B29B7E 100%)",
    floor: "linear-gradient(180deg, #7C6349 0%, #5D4936 100%)",
    light:
      "radial-gradient(70% 55% at 35% 12%, rgb(255 236 196 / 0.6), transparent 72%)",
    frame: "thin-dark",
  },
  {
    id: "home",
    label: "Minimal home",
    caption: "A quiet room at home.",
    wall: "linear-gradient(180deg, #E8E3DA 0%, #D6CFC3 100%)",
    floor: "linear-gradient(180deg, #B9AE9D 0%, #9C9081 100%)",
    light:
      "radial-gradient(60% 50% at 70% 10%, rgb(255 248 232 / 0.7), transparent 70%)",
    frame: "none",
  },
];
