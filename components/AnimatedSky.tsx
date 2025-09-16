"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useDayCycle } from "@/hooks/useDayCycle";

/* ---------- Strong types for CSS custom properties ---------- */
type CSSVarName = `--${string}`;
type CSSVars = Record<CSSVarName, string | number>;
type StyleWithVars = React.CSSProperties & CSSVars;

/* ---------- Public preset type ---------- */
export type SkyPreset = {
  clouds?: {
    count?: number;
    blobsPerCloud?: number;
    durationSec?: [number, number];
    tintAlpha?: number;
  };
  particles?: {
    count?: number;
    sizePx?: [number, number];
    driftVW?: [number, number];
    driftVH?: [number, number];
    durationSec?: [number, number];
    delaySec?: [number, number];
  };
  trail?: {
    count?: number; // cursor trail dots
  };
};

/* ---------- Helpers ---------- */
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function cloudTint(progress: number, alpha = 0.58) {
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
  const { gradient, sunMoon, progress } = useDayCycle(); // continuous now ✅

  // ------- CONFIG (stable, with sensible defaults)
  const cloudsConf = useMemo(
    () => ({
      count: preset.clouds?.count ?? 4,
      blobsPerCloud: preset.clouds?.blobsPerCloud ?? 7,
      durationSec: preset.clouds?.durationSec ?? [180, 300] as [number, number],
      tintAlpha: preset.clouds?.tintAlpha ?? 0.58,
    }),
    [preset.clouds]
  );

  const particlesConf = useMemo(
    () => ({
      count: preset.particles?.count ?? 16,
      sizePx: preset.particles?.sizePx ?? [3, 6] as [number, number],
      driftVW: preset.particles?.driftVW ?? [2, 5.5] as [number, number],
      driftVH: preset.particles?.driftVH ?? [4, 10] as [number, number],
      durationSec: preset.particles?.durationSec ?? [70, 120] as [number, number],
      delaySec: preset.particles?.delaySec ?? [0, 60] as [number, number],
    }),
    [preset.particles]
  );

  const trailConf = useMemo(
    () => ({
      count: preset.trail?.count ?? 10,
    }),
    [preset.trail]
  );

  const tint = useMemo(() => cloudTint(progress, cloudsConf.tintAlpha), [progress, cloudsConf.tintAlpha]);

  // ------- PARTICLES (stable seeds)
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
      left: r(3, 97),
      top: r(5, 95),
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
      const scale = [0.9, 1.05, 1.2][z];
      const dur = r(cloudsConf.durationSec[0], cloudsConf.durationSec[1]);
      const topPreset = [18, 35, 58, 72, 26, 45][i] ?? r(20, 76);
      const delay = r(0, 180);
      const blobs = Array.from({ length: cloudsConf.blobsPerCloud }, () => ({
        x: r(-50, 180),
        y: r(-24, 42),
        w: r(140, 260),
        h: r(70, 150),
        blur: r(16, 30),
        alpha: r(0.35, 0.7), // make sure they’re VISIBLE ✅
      }));
      return { top: topPreset, scale, dur, delay, z, blobs };
    });
  }, [cloudsConf]);

  // ------- NIGHT GLOW for particles
  const nightGlow = progress >= 0.78 ? 0.6 : progress >= 0.7 ? 0.35 : 0;

  // ------- CURSOR TRAIL (snakey)
  const trailRef = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    const coords = Array.from({ length: trailConf.count }, () => ({
      x: innerWidth / 2,
      y: innerHeight / 2,
    }));

    const onMove = (e: MouseEvent) => {
      coords.unshift({ x: e.clientX, y: e.clientY });
      coords.pop();
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      trailRef.current.forEach((dot, i) => {
        if (!dot) return;
        const p = coords[i];
        const scale = 1 - i * (1 / trailConf.count) * 0.7;
        const opacity = 1 - i * (1 / trailConf.count) * 0.85;
        dot.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${scale})`;
        dot.style.opacity = `${opacity}`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [trailConf.count]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-50 overflow-hidden">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 -z-50 transition-[background] duration-[1200ms]"
        style={
          {
            background: `radial-gradient(100% 120% at 50% 50%, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
          } as React.CSSProperties
        }
      />

      {/* CLOUDS (now actually visible) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
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

      {/* SUN / MOON (continuous orbit) */}
      <div
        className="absolute -z-30 rounded-full"
        style={
          {
            left: `${sunMoon.x * 100}%`,
            top: `${sunMoon.y * 100}%`,
            width: "50px",
            height: "50px",
            transform: "translate(-50%, -50%)",
            background: sunMoon.color,
            boxShadow: "0 0 48px rgba(255,255,255,0.45), 0 0 16px rgba(255,255,255,0.25)",
          } as React.CSSProperties
        }
      />

      {/* PARTICLES (slow drift) */}
      <div className="absolute inset-0 -z-20">
        {particles.map((p, i) => {
          const particleStyle: StyleWithVars = {
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
          return <span key={i} className="drift-particle" style={particleStyle} />;
        })}
      </div>

      {/* CURSOR SNAKE TRAIL (interactive candy) */}
      <div className="absolute inset-0 -z-10">
        {Array.from({ length: trailConf.count }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) trailRef.current[i] = el;
            }}
            className="trail-dot"
          />
        ))}
      </div>
    </div>
  );
}