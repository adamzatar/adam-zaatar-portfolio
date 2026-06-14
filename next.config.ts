import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  allowedDevOrigins: ["http://139.140.206.189:3000"],

  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
