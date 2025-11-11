"use client";

import { useMemo } from "react";

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface OrbitalCloudsClientProps {
  ambient?: boolean; // If true, render larger, slower clouds for global background
}

/**
 * OrbitalCloudsClient — seeded cloud generator
 * - Stable across renders using Mulberry32 PRNG.
 * - Optional ambient mode for soft, full-sky background drift.
 * - Rain layer preserved for conditional rendering.
 */
export default function OrbitalCloudsClient({ ambient = false }: OrbitalCloudsClientProps) {
  const seed = Number(process.env.NEXT_PUBLIC_RAIN_SEED ?? 42) >>> 0;
  const rainEnabled = process.env.NEXT_PUBLIC_RAIN_ENABLED === "1";

  /* -------------------------------
     CLOUDS — seeded and layered
  -------------------------------- */
  const clouds = useMemo(() => {
    const rand = mulberry32(seed || 1);
    const count = ambient ? 5 : 10;

    return Array.from({ length: count }, (_, i) => {
      const top = ambient ? rand() * 60 - 10 : rand() * 50 - 25; // ambient sits higher
      const scale = ambient ? 1.8 + rand() * 0.8 : 1 + rand() * 0.3;
      const duration = ambient ? 180 + rand() * 60 : 50 + rand() * 20;
      const width = ambient ? 600 + rand() * 400 : 250 + rand() * 200;
      const height = ambient ? 220 + rand() * 120 : 120 + rand() * 60;
      const delay = rand() * 12;
      const opacity = ambient ? 0.25 + rand() * 0.25 : 0.45 + rand() * 0.3;
      const blur = ambient ? 4 + rand() * 6 : 2 + rand() * 3;

      return {
        id: `cloud-${ambient ? "ambient" : "local"}-${i}`,
        top,
        scale,
        duration,
        width,
        height,
        delay,
        opacity,
        blur,
        zTier: ambient ? -1 : 0,
      };
    });
  }, [seed, ambient]);

  /* -------------------------------
     RAIN — deterministic & optional
  -------------------------------- */
  const rain = useMemo(() => {
    if (!rainEnabled) return [] as Array<never>;
    const rand = mulberry32((seed ^ 0x9e3779b9) >>> 0);
    return Array.from({ length: 80 }, (_, i) => {
      const left = rand() * 100;
      const duration = 1.3 + rand() * 0.7;
      const delay = rand() * 2.2;
      return {
        id: `drop-${i}`,
        left,
        duration,
        delay,
      };
    });
  }, [rainEnabled, seed]);

  /* -------------------------------
     RENDER — clouds + rain layers
  -------------------------------- */
  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none overflow-hidden ${
        ambient ? "-z-20" : "-z-10"
      }`}
    >
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute rounded-full"
          style={{
            top: `${cloud.top}%`,
            left: "-25%",
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            background: `radial-gradient(circle at 40% 40%, rgba(255,255,255,${
              cloud.opacity
            }) 75%, transparent 100%)`,
            filter: `blur(${cloud.blur}rem) saturate(105%)`,
            animation: `cloud-drift ${cloud.duration}s linear infinite`,
            animationDelay: `${cloud.delay}s`,
            transform: `scale(${cloud.scale})`,
            opacity: cloud.opacity,
            zIndex: cloud.zTier,
            willChange: "transform, opacity, filter",
          }}
        />
      ))}

      {rain.map((drop) => (
        <div
          key={drop.id}
          className="absolute bg-white/30"
          style={{
            left: `${drop.left}%`,
            width: "1.5px",
            height: "18px",
            animation: `rainFall ${drop.duration}s linear infinite`,
            animationDelay: `${drop.delay}s`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
