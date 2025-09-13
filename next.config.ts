// next.config.ts

const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },

  // ✅ LAN dev access
  allowedDevOrigins: ["http://139.140.206.189:3000"],

  // ❌ remove turbopack.enabled (invalid)
  // ✅ just configure Turbopack root if needed
  turbopack: {
    root: __dirname, // tells Next.js where your workspace root is
  },
};

export default nextConfig;