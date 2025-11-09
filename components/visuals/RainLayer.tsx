"use client";

import { useEffect, useMemo, useState } from "react";

export type RainLayerProps = {
  seed?: number;
  intensity?: number;
  burst?: { seed: number; strength: number } | null;
};

type Drop = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  height: number;
  opacity: number;
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function RainLayer({ seed = 42, intensity = 120, burst = null }: RainLayerProps) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduced(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const disabled = reduced || intensity <= 0;

  const baseDrops = useMemo<Drop[]>(() => {
    if (disabled) return [];
    const rng = mulberry32(seed >>> 0);
    const count = clamp(Math.round(intensity), 0, 200);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rng() * 100,
      duration: 0.9 + rng() * 1.1,
      delay: rng() * 2,
      height: 14 + rng() * 18,
      opacity: 0.45 + (rng() * 0.35),
    }));
  }, [disabled, seed, intensity]);

  const burstDrops = useMemo<Drop[]>(() => {
    if (disabled || !burst || burst.strength <= 0) return [];
    const rng = mulberry32((burst.seed ^ 0x9e3779b9) >>> 0);
    const count = clamp(Math.round(burst.strength), 0, 120);
    return Array.from({ length: count }, (_, i) => ({
      id: 1_000 + i,
      left: rng() * 100,
      duration: 0.7 + rng() * 1.0,
      delay: rng() * 1.2,
      height: 18 + rng() * 24,
      opacity: 0.55 + rng() * 0.35,
    }));
  }, [burst, disabled]);

  if (disabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {[...baseDrops, ...burstDrops].map((drop) => (
        <div
          key={drop.id}
          className="raindrop"
          style={{
            left: `${drop.left}%`,
            top: "-12%",
            height: `${drop.height}px`,
            opacity: drop.opacity,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
