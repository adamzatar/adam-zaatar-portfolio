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

  // ✅ LAN dev access (Bowdoin IP)
  allowedDevOrigins: ["http://139.140.206.189:3000"],

  // ✅ Turbopack safe defaults
  turbopack: {
    root: __dirname,
  },

  // ✅ Client-side rendering & dynamic import fallback safety
  webpack: (config, { isServer }) => {
    // Allow top-level await (needed for shaders or lazy imports)
    config.experiments = { ...config.experiments, topLevelAwait: true };

    // Handle WebGL / shader imports safely
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: "asset/source",
    });

    // Optional: prevent server from trying to import client-only visuals
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        "three": false, // or mark as external if you're using it
      };
    }

    return config;
  },

  // ✅ Handle legacy /images/projects/* references
  async rewrites() {
    return [
      { source: "/images/projects/:file*", destination: "/images/:file*" },
      { source: "/images/projects/bowdoin-marketplace.png", destination: "/images/bowdoinmarketplace.png" },
      { source: "/images/projects/personal-portfolio.png", destination: "/images/personalportfolio.png" },
      { source: "/images/projects/profile.png", destination: "/images/profile.png" },
      { source: "/images/projects/profilepic.png", destination: "/images/profilepic.png" },
      { source: "/images/projects/palprep.png", destination: "/images/palprep.jpg" },
      { source: "/images/projects/certificate.jpg", destination: "/images/certificate.jpg" },
      { source: "/images/projects/cutaway.png", destination: "/images/cutaway.png" },
      { source: "/images/projects/vector.png", destination: "/images/vector.png" },
      { source: "/images/projects/instagram-clone.png", destination: "/images/instagramclone.png" },
      { source: "/images/projects/twitter-clone.png", destination: "/images/twitterclone.png" },
    ];
  },
};

export default nextConfig;