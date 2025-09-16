// hooks/useDayCycle.ts
"use client";

import { useEffect, useState, useMemo } from "react";

/**
 * useDayCycle
 * Global animation hook that synchronizes:
 * - Gradient backgrounds
 * - Sun/Moon position & color
 * - Particles (hue shifts)
 * - Navbar logo gradient
 * - Progress bar color
 *
 * Runs on a single RAF loop → reduces CPU/GPU overhead vs many independent animations.
 */
export function useDayCycle(cycleDuration = 120_000) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now(); 

    const animate = (now: number) => {
      const elapsed = (now - start) % cycleDuration;
      setProgress(elapsed / cycleDuration); // normalized [0,1]
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [cycleDuration]);

  const values = useMemo(() => {
    // 🌅 Sunrise (0.00 → 0.25)
    if (progress < 0.25) {
      return {
        gradient: ["#ffedd5", "#fde68a"],
        sunMoon: { x: 0.15, y: 0.65, color: "#fde68a" },
        colors: { primary: "#f59e0b", secondary: "#fbbf24", accent: "#fef3c7" },
      };
    }
    // 🌞 Day (0.25 → 0.50)
    if (progress < 0.5) {
      return {
        gradient: ["#93c5fd", "#3b82f6"],
        sunMoon: { x: 0.5, y: 0.25, color: "#facc15" },
        colors: { primary: "#3b82f6", secondary: "#22d3ee", accent: "#60a5fa" },
      };
    }
    // 🌇 Sunset (0.50 → 0.75)
    if (progress < 0.75) {
      return {
        gradient: ["#fca5a5", "#f87171"],
        sunMoon: { x: 0.8, y: 0.65, color: "#f97316" },
        colors: { primary: "#ef4444", secondary: "#f59e0b", accent: "#fb923c" },
      };
    }
    // 🌌 Night (0.75 → 1.00)
    return {
      gradient: ["#6366f1", "#312e81"],
      sunMoon: { x: 0.4, y: 0.8, color: "#6366f1" },
      colors: { primary: "#6366f1", secondary: "#22d3ee", accent: "#f472b6" },
    };
  }, [progress]);

  return { progress, ...values };
}