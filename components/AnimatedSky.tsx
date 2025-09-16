"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useDayCycle } from "@/hooks/useDayCycle";

/* ---------- Strong types for CSS custom properties ---------- */
type CSSVarName = `--${string}`;
type CSSVars = Record<CSSVarName, string | number>;
type StyleWithVars = React.CSSProperties & CSSVars;

/* ---------- Public preset type ---------- */
export type SkyPreset = {
  clouds?: {
    /** Total cloud groups. Keep small (3–6) for perf. */
    count?: number;
    /** Blobs per cloud group. 5–8 looks painterly. */
    blobsPerCloud?: number;
    /** Drift loop seconds [min, max]. */
    durationSec?: [number, number];
    /** Cloud tint alpha. */
    tintAlpha?: number;
  };
  particles?: {
    /** Particle count. 10–20 for calm vibe. */
    count?: number;
    /** Size range in px [min, max]. */
    sizePx?: [number, number];
    /** Horizontal drift amplitude in vw [min, max]. */
    driftVW?: [number, number];
    /** Vertical drift amplitude in vh [min, max]. */
    driftVH?: [number, number];
    /** Loop duration in seconds [min, max]. */
    durationSec?: [number, number];
    /** Staggered delay range in seconds [min, max]. */
    delaySec?: [number, number];
  };
};

/* ---------- Helpers ---------- */
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function cloudTint(progress: number, alpha = 0.60) {
  // Dawn warm → Noon white → Sunset warm → Night blue
  const warm: [number, number, number] = [255, 223, 186];
  const white: [number, number, number] = [255, 255, 255];
  const golden: [number, number, number] = [255, 196, 160];
  const blue: [number, number, number] = [180, 200, 255];

  let c: [number, number, number] = white;
  if (progress < 0.25) {
    const t = clamp01(progress / 0.25);
    c = [lerp(warm[0], white[0], t), lerp(warm[1], white[1], t), lerp(warm[2], white[2], t)];
  } else if (progress < 0.55) {
    const t = clamp01((progress - 0.25) / 0.3);
    c = [lerp(white[0], golden[0], t), lerp(white[1], golden[1], t), lerp(white[2], golden[2], t)];
  } else if (progress < 0.8) {
    const t = clamp01((progress - 0.55) / 0.25);
    c = [lerp(golden[0], warm[0], t), lerp(golden[1], warm[1], t), lerp(golden[2], warm[2], t)];
  } else {
    const t = clamp01((progress - 0.8) / 0.2);
    c = [lerp(warm[0], blue[0], t), lerp(warm[1], blue[1], t), lerp(warm[2], blue[2], t)];
  }
  return `rgba(${c.map(Math.round).join(",")}, ${alpha})`;
}

/* ---------- Component ---------- */
export default function AnimatedSky(preset: SkyPreset = {}) {
  const { gradient, sunMoon, progress } = useDayCycle(); // continuous orbit + blended gradient

  // ------- CONFIG (stable, Safari-friendly)
  const cloudsConf = useMemo(
    () => ({
      count: preset.clouds?.count ?? 4,                    // keep it low for perf
      blobsPerCloud: preset.clouds?.blobsPerCloud ?? 6,    // painterly but light
      durationSec: (preset.clouds?.durationSec ?? [180, 300]) as [number, number],
      tintAlpha: preset.clouds?.tintAlpha ?? 0.60,
    }),
    [preset.clouds]
  );

  const particlesConf = useMemo(
    () => ({
      count: preset.particles?.count ?? 14,
      sizePx: (preset.particles?.sizePx ?? [3, 6]) as [number, number],
      driftVW: (preset.particles?.driftVW ?? [2.5, 5]) as [number, number],
      driftVH: (preset.particles?.driftVH ?? [4, 9]) as [number, number],
      durationSec: (preset.particles?.durationSec ?? [70, 120]) as [number, number],
      delaySec: (preset.particles?.delaySec ?? [0, 40]) as [number, number],
    }),
    [preset.particles]
  );

  const tint = useMemo(() => cloudTint(progress, cloudsConf.tintAlpha), [progress, cloudsConf.tintAlpha]);

  // ------- PARTICLES (stable seeds so they don't teleport on re-render)
  type Particle = { left: number; top: number; size: number; dx: number; dy: number; dur: number; delay: number };
  const particles = useMemo<Particle[]>(() => {
    const r = (min: number, max: number) => min + Math.random() * (max - min);
    return Array.from({ length: particlesConf.count }, () => ({
      left: r(4, 96),
      top: r(6, 94),
      size: r(particlesConf.sizePx[0], particlesConf.sizePx[1]),
      dx: r(particlesConf.driftVW[0], particlesConf.driftVW[1]),
      dy: r(particlesConf.driftVH[0], particlesConf.driftVH[1]),
      dur: r(particlesConf.durationSec[0], particlesConf.durationSec[1]),
      delay: r(particlesConf.delaySec[0], particlesConf.delaySec[1]),
    }));
  }, [particlesConf]);

  // ------- CLOUDS (stable seeds)
  type Blob = { x: number; y: number; w: number; h: number; blur: number; alpha: number };
  type Cloud = { top: number; scale: number; dur: number; delay: number; z: number; blobs: Blob[] };

  const clouds = useMemo<Cloud[]>(() => {
    const r = (min: number, max: number) => min + Math.random() * (max - min);
    return Array.from({ length: cloudsConf.count }, (_, i) => {
      const z = i % 3;
      const scale = [0.95, 1.05, 1.17][z];
      const dur = r(cloudsConf.durationSec[0], cloudsConf.durationSec[1]);
      const topPreset = [18, 34, 56, 72, 26, 45][i] ?? r(18, 76);
      const delay = r(0, 120);
      const blobs = Array.from({ length: cloudsConf.blobsPerCloud }, () => ({
        x: r(-48, 168),
        y: r(-24, 40),
        w: r(160, 260),
        h: r(80, 140),
        blur: r(14, 22),         // <= 22px blur for Safari perf
        alpha: r(0.48, 0.78),    // visible by default
      }));
      return { top: topPreset, scale, dur, delay, z, blobs };
    });
  }, [cloudsConf]);

  // ------- NIGHT GLOW for particles
  const nightGlow = progress >= 0.78 ? 0.5 : progress >= 0.7 ? 0.32 : 0;

  return (
    <div className="pointer-events-none absolute inset-0 -z-50 overflow-hidden" aria-hidden>
      {/* BACKDROP (blended radial; transitions are cheap) */}
      <div
        className="absolute inset-0 -z-50 transition-[background] duration-[900ms]"
        style={{ background: `radial-gradient(100% 120% at 50% 50%, ${gradient[0]} 0%, ${gradient[1]} 100%)` }}
      />

      {/* CLOUDS (painterly + slow drift) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 -z-40"
      >
        {clouds.map((c, idx) => {
          const clusterStyle: StyleWithVars = {
            top: `${c.top}%`,
            "--cluster-scale": c.scale,
            "--cloud-duration": `${c.dur}s`,
            "--cloud-delay": `${c.delay}s`,
            "--cloud-tint": tint,
            "--z-tier": c.z,
          };
          return (
            <div key={idx} className="cloud-cluster" style={clusterStyle}>
              {c.blobs.map((b, j) => {
                const blobStyle: StyleWithVars = {
                  left: `${b.x}px`,
                  top: `${b.y}px`,
                  width: `${b.w}px`,
                  height: `${b.h}px`,
                  "--blob-blur": `${b.blur}px`,
                  "--blob-alpha": b.alpha,
                };
                return <div key={j} className="cloud-blob" style={blobStyle} />;
              })}
            </div>
          );
        })}
      </motion.div>

      {/* SUN / MOON (continuous orbit from useDayCycle) */}
      <div
        className="absolute -z-30 rounded-full"
        style={{
          left: `${sunMoon.x * 100}%`,
          top: `${sunMoon.y * 100}%`,
          width: "48px",
          height: "48px",
          transform: "translate(-50%, -50%)",
          background: sunMoon.color,
          boxShadow: "0 0 40px rgba(255,255,255,0.35), 0 0 12px rgba(255,255,255,0.25)",
        }}
      />

      {/* PARTICLES (slow, elegant drift) */}
      <div className="absolute inset-0 -z-20">
        {particles.map((p, i) => {
          const style: StyleWithVars = {
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            "--dx": `${p.dx}vw`,
            "--dy": `${p.dy}vh`,
            "--dur": `${p.dur}s`,
            "--delay": `${p.delay}s`,
            "--glowOpacity": nightGlow,
          };
          return <span key={i} className="drift-particle" style={style} />;
        })}
      </div>
    </div>
  );
}