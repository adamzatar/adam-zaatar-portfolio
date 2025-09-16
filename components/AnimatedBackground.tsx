"use client";

import dynamic from "next/dynamic";

// Lazy-load to keep the main bundle lean
const AnimatedSky = dynamic(() => import("@/components/AnimatedSky"), {
  ssr: false,
  // Super lightweight fallback that never blocks content
  loading: () => (
    <div className="pointer-events-none absolute inset-0 -z-50 bg-gradient-to-b from-[var(--bg)] to-[var(--surface)]" />
  ),
});

/**
 * AnimatedBackground
 * Mounts the sky system behind page content. Safe to include per page.
 */
export default function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-50"
      // ensure a stacking context that sits behind page content
    >
      <AnimatedSky />
    </div>
  );
}