"use client";

import dynamic from "next/dynamic";
import * as React from "react";

/**
 * AnimatedBackground mounts:
 *  - AnimatedSky (background painterly sky) behind the page content
 *  - CursorTrail (interactive snake trail) above the page content
 *
 * Notes:
 *  - Both are client-side only (ssr: false) to avoid hydration mismatch
 *  - Background ignores pointer events and sits at -z-50
 *  - Trail is its own fixed overlay with pointer-events: none
 *  - Toggle globally via NEXT_PUBLIC_ENABLE_ANIMATED_BG (default: enabled)
 */

// Lazy-load the heavy visuals to keep TTI snappy
const AnimatedSky = dynamic(() => import("@/components/AnimatedSky"), {
  ssr: false,
  loading: () => (
    <div className="pointer-events-none absolute inset-0 -z-50 bg-gradient-to-b from-[var(--bg)] to-[var(--surface)]" />
  ),
});

// CursorTrail is tiny but still CSR-only to avoid SSR pointer assumptions
const CursorTrail = dynamic(() => import("@/components/CursorTrail"), {
  ssr: false,
  loading: () => null,
});

export type AnimatedBackgroundProps = {
  /** Force enable/disable regardless of env flag. */
  enabled?: boolean;
  /** Show/hide the cursor trail overlay (still respects prefers-reduced-motion internally). */
  showTrail?: boolean;
  /** Number of dots in the cursor trail. */
  trailCount?: number;
  /** Optional extra class on the sky wrapper (position is fixed). */
  className?: string;
};

export default function AnimatedBackground({
  enabled,
  showTrail = true,
  trailCount = 10,
  className = "",
}: AnimatedBackgroundProps) {
  // Default to env flag if `enabled` prop is not provided
  const envEnabled =
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_ENABLE_ANIMATED_BG !== "false";

  const isEnabled = enabled ?? envEnabled;

  // Avoid rendering anything if disabled (saves runtime cost)
  if (!isEnabled) return null;

  return (
    <>
      {/* SKY LAYER — behind everything */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-50 ${className}`}
      >
        <AnimatedSky />
      </div>

      {/* CURSOR TRAIL — top overlay; never captures clicks */}
      {showTrail && <CursorTrail count={trailCount} />}
    </>
  );
}