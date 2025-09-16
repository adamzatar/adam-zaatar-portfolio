"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useDayCycle } from "@/hooks/useDayCycle";

export type SkyPreset = {
  clouds?: {
    count?: number;
    blobsPerCloud?: number;
    durationRangeSec?: [number, number];
    tintStrength?: number;
  };
  particles?: {
    count?: number;
    sizePx?: [number, number];
    driftVW?: [number, number];
    driftVH?: [number, number];
    durationSec?: [number, number];
    delaySec?: [number, number];
  };
};

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function cloudTint(progress: number, strength = 0.55) {
  const warm = [255, 223, 186];
  const white = [255, 255, 255];
  const golden = [255, 196, 160];
  const blue = [180, 200, 255];

  let c = white;
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
  return `rgba(${c.map(Math.round).join(",")}, ${strength})`;
}

export default function AnimatedSky(preset?: SkyPreset) {
  const { gradient, sunMoon, progress } = useDayCycle();

  // ✅ Memoize configs to avoid re-creation each render
  const cloudsConf = useMemo(
    () => ({
      count: preset?.clouds?.count ?? 4,
      blobsPerCloud: preset?.clouds?.blobsPerCloud ?? 7,
      durationRangeSec: preset?.clouds?.durationRangeSec ?? [150, 280],
      tintStrength: preset?.clouds?.tintStrength ?? 0.55,
    }),
    [preset?.clouds]
  );

  const particlesConf = useMemo(
    () => ({
      count: preset?.particles?.count ?? 14,
      sizePx: preset?.particles?.sizePx ?? [3, 6],
      driftVW: preset?.particles?.driftVW ?? [2, 6],
      driftVH: preset?.particles?.driftVH ?? [4, 10],
      durationSec: preset?.particles?.durationSec ?? [60, 120],
      delaySec: preset?.particles?.delaySec ?? [0, 60],
    }),
    [preset?.particles]
  );

  const tint = useMemo(() => cloudTint(progress, cloudsConf.tintStrength), [progress, cloudsConf]);

  type Particle = {
    left: number;
    top: number;
    size: number;
    dx: number;
    dy: number;
    dur: number;
    delay: number;
  };

  const particles = useMemo<Particle[]>(() => {
    const r = (min: number, max: number) => min + Math.random() * (max - min);
    return Array.from({ length: particlesConf.count }, () => ({
      left: r(2, 98),
      top: r(2, 98),
      size: r(particlesConf.sizePx[0], particlesConf.sizePx[1]),
      dx: r(particlesConf.driftVW[0], particlesConf.driftVW[1]),
      dy: r(particlesConf.driftVH[0], particlesConf.driftVH[1]),
      dur: r(particlesConf.durationSec[0], particlesConf.durationSec[1]),
      delay: r(particlesConf.delaySec[0], particlesConf.delaySec[1]),
    }));
  }, [particlesConf]);

  type Blob = { x: number; y: number; w: number; h: number; blur: number; alpha: number };
  type Cloud = { top: number; scale: number; dur: number; delay: number; z: number; blobs: Blob[] };

  const clouds = useMemo<Cloud[]>(() => {
    const r = (min: number, max: number) => min + Math.random() * (max - min);
    return Array.from({ length: cloudsConf.count }, (_, i) => {
      const z = i % 3;
      const scale = [0.9, 1.05, 1.2][z];
      const dur = r(cloudsConf.durationRangeSec[0], cloudsConf.durationRangeSec[1]);
      const topPreset = [18, 35, 58, 72][i] ?? r(20, 75);
      const delay = r(0, 120);
      const blobs = Array.from({ length: cloudsConf.blobsPerCloud }, () => ({
        x: r(-40, 160),
        y: r(-20, 40),
        w: r(120, 240),
        h: r(60, 140),
        blur: r(14, 32),
        alpha: r(0.25, 0.6),
      }));
      return { top: topPreset, scale, dur, delay, z, blobs };
    });
  }, [cloudsConf]);

  const nightGlow = progress >= 0.78 ? 0.6 : progress >= 0.7 ? 0.35 : 0;

  return (
    <div className="pointer-events-none absolute inset-0 -z-50 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 -z-50 transition-[background] duration-[2000ms]"
        style={{ background: `radial-gradient(circle at 50% 50%, ${gradient[0]}, ${gradient[1]})` }}
      />

      {/* Clouds */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="absolute inset-0 -z-40">
        {clouds.map((c, idx) => (
          <div
            key={idx}
            className="cloud-cluster"
            style={{
              top: `${c.top}%`,
              ["--cluster-scale" as string]: c.scale,
              ["--cloud-duration" as string]: `${c.dur}s`,
              ["--cloud-delay" as string]: `${c.delay}s`,
              ["--cloud-tint" as string]: tint,
              ["--z-tier" as string]: c.z.toString(),
            }}
          >
            {c.blobs.map((b, j) => (
              <div
                key={j}
                className="cloud-blob"
                style={{
                  left: `${b.x}px`,
                  top: `${b.y}px`,
                  width: `${b.w}px`,
                  height: `${b.h}px`,
                  ["--blob-blur" as string]: `${b.blur}px`,
                  ["--blob-alpha" as string]: b.alpha.toString(),
                }}
              />
            ))}
          </div>
        ))}
      </motion.div>

      {/* Sun / Moon */}
      <div
        className="absolute -z-30 size-12 rounded-full shadow-lg"
        style={{
          left: `${sunMoon.x * 100}%`,
          top: `${sunMoon.y * 100}%`,
          background: sunMoon.color,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 40px rgba(255,255,255,0.45)",
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 -z-20">
        {particles.map((p, i) => (
          <span
            key={i}
            className="drift-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              ["--dx" as string]: `${p.dx}vw`,
              ["--dy" as string]: `${p.dy}vh`,
              ["--dur" as string]: `${p.dur}s`,
              ["--delay" as string]: `${p.delay}s`,
              ["--glowOpacity" as string]: nightGlow.toString(),
            }}
          />
        ))}
      </div>
    </div>
  );
}