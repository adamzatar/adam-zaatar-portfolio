"use client";

import { useEffect, useState } from "react";

export function useTimeOfDay(cycleMinutes = 3) {
  const [phase, setPhase] = useState(() => {
    const elapsed = Date.now() / 60000;
    return ((elapsed % cycleMinutes) + cycleMinutes) / cycleMinutes % 1;
  });

  useEffect(() => {
    if (cycleMinutes <= 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsedMinutes = (now - start) / 60000;
      const nextPhase = ((elapsedMinutes % cycleMinutes) + cycleMinutes) / cycleMinutes % 1;
      setPhase(nextPhase);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [cycleMinutes]);

  return phase;
}
