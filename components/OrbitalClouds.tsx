"use client";

type Props = {
  className?: string;
  opacity?: number;
  blur?: number;
  speed?: number;
  variant?: "rain" | "clouds";
  seed?: string | number;
  count?: number;
};

/**
 * Hydration-safe placeholder:
 * - Reads env toggles but never generates random client-vs-server markup.
 * - Returns a single inert <div> so SSR and client trees match exactly.
 * - You can re-enable effects later by swapping this file back to the animated version.
 */
export default function OrbitalClouds({ className }: Props) {
  const effectsEnabled =
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_EFFECTS_ENABLED !== "0";

  // Even if enabled, keep it inert for now to guarantee hydration stability.
  // (Set NEXT_PUBLIC_EFFECTS_ENABLED=1 and restore the real implementation later.)
  return (
    <div
      aria-hidden
      className={className ?? ""}
      style={{ pointerEvents: "none" }}
      data-orbitalclouds={effectsEnabled ? "placeholder" : "disabled"}
    />
  );
}
