export const siteConfig = {
  name: "ArtWall",
  legalName: "Artwall Labs Pvt Ltd",
  tagline: "Art lives on the wall.",
  positioning: "Reimagining and revolutionising India's art economy.",
  description:
    "India's digital home for artists. Exhibitions, a fair marketplace, and tamper-proof certification — launching Diwali 2026.",
  url: "https://www.artwalllabs.com",

  /**
   * When the platform goes live. Everything that counts down reads this one
   * constant.
   *
   * NOTE FOR THE FOUNDERS: the current teaser says both "Diwali 2026" and
   * "October", but Diwali 2026 (Lakshmi Puja) actually falls on 8 November
   * 2026. The live countdown implies ~19 October. Those cannot both be true —
   * pick one and set it here. The value below matches the countdown currently
   * running on artwalllabs.com; change the date and every surface follows.
   */
  launchAt: "2026-10-19T00:00:00+05:30",

  contact: {
    email: "artwalllabs@gmail.com",
    phone: "+91 82093 95894",
    /** E.164 without punctuation, for tel: and wa.me links. */
    phoneDigits: "918209395894",
  },

  social: {
    instagram: "https://instagram.com/artwalllabs",
    x: "https://x.com/artwalllabs",
    linkedin: "https://linkedin.com/company/artwalllabs",
    youtube: "https://youtube.com/@artwalllabs",
    whatsapp: "https://wa.me/918209395894",
  },

  credentials: {
    recognition: "DPIIT Recognised · Startup India, Govt. of India",
    origin: "Designed & built in Rajasthan",
  },

  /** Engineering, cloud, and blockchain partner. */
  techPartner: { name: "StackFox", url: "https://stackfox.in" },
} as const;
