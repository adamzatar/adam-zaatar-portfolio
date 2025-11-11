// hooks/useTimeOfDay.ts
"use client";

import { useCallback, useEffect, useState } from "react";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * useTimeOfDay
 *
 * Returns a normalized phase ∈ [0, 1) that loops every `cycleMinutes`.
 *
 * Semantic mapping (by design):
 *   phase ≈ 0.00 → dawn
 *   phase ≈ 0.25 → noon
 *   phase ≈ 0.50 → dusk
 *   phase ≈ 0.75 → midnight
 *
 * Notes:
 * - Deterministic across reloads (based on real clock via Date.now()).
 * - Frame-synced with requestAnimationFrame for smooth motion.
 * - Respects `prefers-reduced-motion` (returns a static snapshot).
 */
export function useTimeOfDay(cycleMinutes = 3): number {
  // Prevent degenerate / zero-length cycles.
  const safeCycle = Math.max(0.5, cycleMinutes);

  const computePhase = useCallback(() => {
    // Current time in minutes.
    const minutes = Date.now() / 60000;

    // Raw loop phase over [0, 1) with period = safeCycle minutes.
    const raw = (minutes % safeCycle) / safeCycle;

    // Rotate so "noon" sits at phase ≈ 0.25 and "midnight" at ≈ 0.75.
    // Conceptually:
    //   0.00 → dawn
    //   0.25 → noon
    //   0.50 → dusk
    //   0.75 → midnight
    const semantic = (raw + 0.25) % 1;

    return semantic;
  }, [safeCycle]);

  // SSR-safe initial snapshot (no window / media queries here).
  const [phase, setPhase] = useState<number>(() => computePhase());

  useEffect(() => {
    // If somehow safeCycle is invalid, bail.
    if (!safeCycle) return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduceMotion = mql.matches;

    // If the user prefers reduced motion, just take a static snapshot.
    if (reduceMotion) {
      setPhase(computePhase());
      return;
    }

    let frameId: number;

    const tick = () => {
      setPhase(computePhase());
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    // React to OS-level motion preference changes.
    const handleChange = () => {
      if (mql.matches) {
        if (frameId) cancelAnimationFrame(frameId);
        setPhase(computePhase());
      } else {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    // Modern browsers.
    mql.addEventListener?.("change", handleChange);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      mql.removeEventListener?.("change", handleChange);
    };
  }, [safeCycle, computePhase]);

  return clamp01(phase);
}