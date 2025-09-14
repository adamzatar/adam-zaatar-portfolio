// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,

  images: {
    // ✅ Serve optimized formats
    formats: ["image/avif", "image/webp"],

    // ✅ Allow external images if needed
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },

  // ✅ LAN dev access (your Bowdoin IP)
  allowedDevOrigins: ["http://139.140.206.189:3000"],

  // ✅ Turbopack config (safe default)
  turbopack: {
    root: __dirname,
  },

  // ✅ Handle legacy /images/projects/* references
  async rewrites() {
    return [
      // Generic: strip `/projects/`
      { source: "/images/projects/:file*", destination: "/images/:file*" },

      // Specific fixes for renamed/mismatched files
      { source: "/images/projects/bowdoin-marketplace.png", destination: "/images/bowdoinmarketplace.png" },
      { source: "/images/projects/personal-portfolio.png",  destination: "/images/personalportfolio.png" },
      { source: "/images/projects/profile.png",              destination: "/images/profile.png" }, // alias of profilepic
      { source: "/images/projects/profilepic.png",           destination: "/images/profilepic.png" },
      { source: "/images/projects/palprep.png",              destination: "/images/palprep.jpg" }, // placeholder
      { source: "/images/projects/certificate.jpg",          destination: "/images/certificate.jpg" },
      { source: "/images/projects/cutaway.png",              destination: "/images/cutaway.png" },
      { source: "/images/projects/vector.png",               destination: "/images/vector.png" },
      { source: "/images/projects/instagram-clone.png",      destination: "/images/instagramclone.png" },
      { source: "/images/projects/twitter-clone.png",        destination: "/images/twitterclone.png" },
    ];
  },
};

export default nextConfig;