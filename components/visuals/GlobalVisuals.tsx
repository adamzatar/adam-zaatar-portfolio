// components/visuals/GlobalVisuals.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { useTimeOfDay } from "@/hooks/useTimeOfDay";
import Sun from "@/components/visuals/Sun";
// Legacy full-moon component is kept in the repo but not used here:
// import Moon from "@/components/visuals/Moon";
import CrescentMoon from "@/components/visuals/CrescentMoon";
import { CloudLayer } from "@/components/visuals/CloudLayer";
import { RainLayer } from "@/components/visuals/RainLayer";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Shared orbit timing (Sun + Moon).
 *
 * 3 minutes → very slow ambient loop
 * 2 minutes → slightly faster, more noticeable
 * 1 minute  → aggressive “show-off” loop
 */
const ORBIT_CYCLE_MINUTES = 2;

// Orbit parameters — elliptical path that stays comfortably on-screen.
const ORBIT_RADIUS_X_VW = 24; // horizontal reach
const ORBIT_RADIUS_Y_VH = 11; // vertical reach
const SUN_CENTER_OFFSET_X_VW = 2;
const SUN_CENTER_OFFSET_Y_VH = 5;
const MOON_CENTER_OFFSET_X_VW = -2;
const MOON_CENTER_OFFSET_Y_VH = 5;
const MOON_PHASE_OFFSET = 0.5; // perfect opposition

export default function GlobalVisuals() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobileViewport(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Shared, SSR-aware time-of-day phase ∈ [0,1)
  const phaseRaw = useTimeOfDay(ORBIT_CYCLE_MINUTES);
  const phase = ((phaseRaw ?? 0) % 1 + 1) % 1;

  // Env-driven feature flags
  const dynamicEffectsEnabled =
    process.env.NEXT_PUBLIC_EFFECTS_ENABLED !== "0";
  const rainOn = process.env.NEXT_PUBLIC_RAIN_ENABLED === "1";
  const seed = (Number(process.env.NEXT_PUBLIC_RAIN_SEED ?? 42) >>> 0) || 42;

  // Base orbit angle for the sun
  const sunAngle = phase * Math.PI * 2;

  // Sun orbit: gentle ellipse around the center of the viewport.
  const sunOffsetX =
    Math.cos(sunAngle) * ORBIT_RADIUS_X_VW + SUN_CENTER_OFFSET_X_VW; // vw
  const sunOffsetY =
    Math.sin(sunAngle) * ORBIT_RADIUS_Y_VH + SUN_CENTER_OFFSET_Y_VH; // vh

  // Moon orbit: opposite the sun so both are always visible simultaneously.
  const moonPhaseOrbit = (phase + MOON_PHASE_OFFSET) % 1;
  const moonAngle = moonPhaseOrbit * Math.PI * 2;
  const moonOffsetX =
    Math.cos(moonAngle) * ORBIT_RADIUS_X_VW + MOON_CENTER_OFFSET_X_VW; // vw
  const moonOffsetY =
    Math.sin(moonAngle) * ORBIT_RADIUS_Y_VH + MOON_CENTER_OFFSET_Y_VH; // vh

  // Day/night light curve: 1 at "noon", 0 near "midnight".
  const dayStrength = clamp01((Math.cos(sunAngle) + 1) / 2);
  const nightStrength = 1 - dayStrength;

  // Slightly different curve used for overall light warmth.
  const light = clamp01(0.55 + 0.45 * Math.cos(sunAngle - Math.PI / 2));

  // Sun elevation (for rain/atmosphere).
  const sunElevation = clamp01(
    0.5 + 0.5 * Math.sin(sunAngle - Math.PI / 2),
  );

  // Hue drives sky palette; the Sun/Moon components handle their own detailed coloring.
  const hue = (phase * 360 + 360) % 360;

  const skyPalette = useMemo(() => {
    const top = `hsl(${(hue + 240) % 360} 65% ${38 + light * 12}%)`;
    const mid = `hsl(${(hue + 180) % 360} 72% ${52 + light * 18}%)`;
    const bottom = `hsl(${(hue + 40) % 360} 78% ${68 + light * 20}%)`;
    return { top, mid, bottom };
  }, [hue, light]);

  // Push sky + weather channels into CSS custom properties
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;

    // Sky gradient stops
    root.style.setProperty("--sky-top", skyPalette.top);
    root.style.setProperty("--sky-mid", skyPalette.mid);
    root.style.setProperty("--sky-bottom", skyPalette.bottom);
    root.style.setProperty("--sky-hue", hue.toFixed(2));

    // Vertical light focus for radial sky glow
    root.style.setProperty("--sun-y", `${15 + 10 * Math.sin(sunAngle)}%`);

    // Global light channel used by other components
    root.style.setProperty("--light-intensity", light.toFixed(3));

    // Extra channels for weather / atmospherics
    root.style.setProperty("--sun-elevation", sunElevation.toFixed(3));

    // Night channels (for stars / aurora, etc.)
    root.style.setProperty("--night-intensity", nightStrength.toFixed(3));
    root.style.setProperty("--nightness", nightStrength.toFixed(3));

    // Cloudiness: slightly clearer at noon, denser toward night.
    const cloudiness = dynamicEffectsEnabled
      ? clamp01(0.15 + (1 - dayStrength) * 0.85)
      : 0;
    root.style.setProperty("--cloudiness", cloudiness.toFixed(3));

    // Rain enabled as a numeric flag for CSS (0/1)
    const rainEnabled = dynamicEffectsEnabled && rainOn ? 1 : 0;
    root.style.setProperty("--rain-enabled", rainEnabled.toString());

    // Optional: expose normalized phase for other animated layers
    root.style.setProperty("--sun-phase", phase.toFixed(3));
  }, [
    sunAngle,
    light,
    sunElevation,
    dayStrength,
    nightStrength,
    dynamicEffectsEnabled,
    rainOn,
    mounted,
    phase,
    skyPalette,
    hue,
  ]);

  if (!mounted) return null;

  // -------------------------------
  // Visual intensities / strengths
  // -------------------------------

  // Sun & Moon visual intensities (color/brightness).
  const sunVisualIntensity = 1 + dayStrength * 0.6; // 1 → 1.6
  const moonVisualIntensity = 0.85 + nightStrength * 0.5; // 0.85 → 1.35

  // Crescent thickness: thicker near evening, thinner at deep night.
  const moonCrescentPhase = clamp01(0.35 + nightStrength * 0.5);

  // Simple orientation: waxing in the first half, waning in the second.
  const moonOrientation: "waxing" | "waning" =
    phase < 0.5 ? "waxing" : "waning";

  const heavyVisualsDisabled = prefersReducedMotion || isMobileViewport;

  if (heavyVisualsDisabled) {
    return null;
  }

  return (
    <div className="effects-layer pointer-events-none" aria-hidden="true">
      {/* Sun orbit (day driver) */}
      <div
        className="sun-orbit"
        style={{
          // Compose with the base translate(-50%, -50%) in CSS
          transform: `translate(-50%, -50%) translate(${sunOffsetX}vw, ${sunOffsetY}vh)`,
        }}
      >
        <Sun
          className="-translate-x-1/2 -translate-y-1/2"
          size={260}
          intensity={sunVisualIntensity}
          strength={1}
          glow={0.55 + light * 0.45}
          flare={0.22 + light * 0.25}
          parallax={false}
        />
      </div>

      {/* Crescent moon orbit (night driver) */}
      <div
        className="moon-orbit"
        style={{
          // Same centered orbit container; separate offsets so it can oppose the sun.
          transform: `translate(-50%, -50%) translate(${moonOffsetX}vw, ${moonOffsetY}vh)`,
        }}
      >
        <CrescentMoon
          className="-translate-x-1/2 -translate-y-1/2"
          size={220}
          intensity={moonVisualIntensity}
          hue={50} // warm, golden crescent to distinguish from the sun & keep it readable
          phase={moonCrescentPhase}
          orientation={moonOrientation}
          parallax={false} // orbit owns motion → zero jitter
          animate
        />
      </div>

      {/* Clouds respond to --cloudiness via CSS; gated by env for perf */}
      {dynamicEffectsEnabled ? <CloudLayer seed={seed} /> : null}

      {/* Rain tied to env flags; intensity still numeric count of drops */}
      {dynamicEffectsEnabled && rainOn ? (
        <RainLayer
          seed={(seed ^ 0x9e3779b9) >>> 0}
          intensity={140}
          burst={null}
        />
      ) : null}
    </div>
  );
}
