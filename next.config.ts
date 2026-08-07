import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudinary only. An open remote-image allowlist turns next/image into a
    // free image-resizing proxy for the whole internet, at our bandwidth cost.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
