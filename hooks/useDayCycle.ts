// hooks/useDayCycle.ts
"use client";

import { useEffect, useMemo, useState } from "react";

/** Small color helpers */
type RGB = [number, number, number];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const mix = (c1: RGB, c2: RGB, t: number): RGB => [
  Math.round(lerp(c1[0], c2[0], t)),
  Math.round(lerp(c1[1], c2[1], t)),
  Math.round(lerp(c1[2], c2[2], t)),
];

const Dawn: RGB   = [255, 237, 213]; // #ffedd5
const Noon: RGB   = [147, 197, 253]; // #93c5fd
const Sunset: RGB = [252, 165, 165]; // #fca5a5
const Night: RGB  = [ 99, 102, 241]; // #6366f1

/** Piecewise gradient & sun color mix across the day */
function gradientFor(p: number): [string, string] {
  // two-stop gradient (center + rim) that morphs over time
  // 0–0.25 dawn→noon, 0.25–0.5 noon→sunset, 0.5–0.75 sunset→night, 0.75–1 night→dawn
  let a: RGB, b: RGB, t: number;

  if (p < 0.25)      { a = Dawn;  b = Noon;   t = (p - 0.00) / 0.25; }
  else if (p < 0.50) { a = Noon;  b = Sunset; t = (p - 0.25) / 0.25; }
  else if (p < 0.75) { a = Sunset;b = Night;  t = (p - 0.50) / 0.25; }
  else               { a = Night; b = Dawn;   t = (p - 0.75) / 0.25; }

  const inner = mix(a, b, t);
  const outer = mix(b, a, t * 0.6 + 0.2); // keep some contrast
  const fmt = (c: RGB) => `rgb(${c[0]},${c[1]},${c[2]})`;
  return [fmt(inner), fmt(outer)];
}

/** Elliptical sun/moon path across the sky (continuous) */
function sunMoonFor(p: number) {
  // angle where 0 = left horizon rising, 0.5 = right horizon setting
  // shift so noon is near top
  const angle = (p * 360 - 90) * (Math.PI / 180); // -90° at dawn
  const rx = 0.42; // ellipse radius x
  const ry = 0.32; // ellipse radius y
  const cx = 0.5;  // center of ellipse
  const cy = 0.52;

  const x = cx + rx * Math.cos(angle);
  const y = cy + ry * Math.sin(angle);

  // sun/moon color roughly tied to time
  // brighter warm midday, cool at night
  const sun = [250, 204, 21] as RGB; // amber-400
  const warm = [249, 115, 22] as RGB; // orange-500
  const cool = [147, 197, 253] as RGB; // sky-300

  // map to phases
  let color: RGB;
  if (p < 0.25)      color = mix(warm, sun, p / 0.25);
  else if (p < 0.50) color = mix(sun, warm, (p - 0.25) / 0.25);
  else if (p < 0.75) color = mix(warm, cool, (p - 0.50) / 0.25);
  else               color = mix(cool, warm, (p - 0.75) / 0.25);

  return { x, y, color: `rgb(${color[0]},${color[1]},${color[2]})` };
}

/**
 * useDayCycle
 * Single, cheap RAF that exposes:
 * - progress [0..1]
 * - gradient [inner, outer] that smoothly blends all day
 * - sunMoon {x,y,color} continuous orbit
 * - colors palette (optional accents)
 */
export function useDayCycle(cycleDurationMs = 120_000) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const elapsed = (now - start) % cycleDurationMs;
      setProgress(elapsed / cycleDurationMs);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [cycleDurationMs]);

  const gradient = useMemo(() => gradientFor(progress), [progress]);
  const sunMoon = useMemo(() => sunMoonFor(progress), [progress]);
  const colors = useMemo(() => {
    // optional accents you can use elsewhere
    const [inner] = gradient;
    return { primary: inner, secondary: gradient[1], accent: inner };
  }, [gradient]);

  return { progress, gradient, sunMoon, colors };
}