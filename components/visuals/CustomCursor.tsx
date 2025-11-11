// components/visuals/CustomCursor.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { usePointerType } from "@/lib/hooks/usePointerType";

/* -----------------------------
   Math helpers (branch-light)
------------------------------*/
const clamp = (n: number, min: number, max: number) =>
  n < min ? min : n > max ? max : n;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Hue wrap-aware mix */
const mixHue = (a: number, b: number, t: number) => {
  const d = ((b - a + 540) % 360) - 180; // prefer-const ✓
  return (a + d * t + 360) % 360;
};
/** Minimal type for style writes in onUpdate (no `any`) */
type UpdatableStyles = { filter?: string };

/* -----------------------------
   Tunables – quick feel console
------------------------------*/
const CFG = {
  HUE: {
    baseStep: 9,
    ampMin: 8,
    ampMax: 12,
    baseDrift: 200,
    skyInfluence: 0.22, // 0..1 – blend toward theme hue if available
  },
  GLOW: {
    base: 0.35,
    speedScale: 1 / 2200,
    edgeScale: 0.38,
    oledShadowScale: 0.85,
    oledBlurScale: 0.88,
  },
  RING: {
    stiffness: 700,
    damping: 23,
    mass: 0.33,
    idleBreathAmp: 0.045,
    speedGainScale: 1 / 1400,
    edgePulseGain: 0.18,
    clickPulseMax: 0.28,
    clickPulseDecay: 0.86,
  },
  BURST: {
    add: 0.22,
    decay: 0.9,
    max: 0.5,
    thresholdSpeed: 600,
  },
  EDGE: {
    radius: 160,
    boostLerp: 0.15,
  },
  IDLE: {
    awakenRate: 1 / 1200,
    melt: 0.85,
  },
  TRAIL: {
    baseDur: 1.6,
    stepDur: 0.2,
    sizes: [14, 17, 20, 17, 14, 12] as const,
  },
  Z: {
    container: 2147483647,
    head: 2147483600,
    ring: 2147483500,
    dots: 2147483000,
  },
} as const;

/* ------------------------------------------
   Pointer gating + rAF-throttled coordinates
-------------------------------------------*/
function useClientCursor(activate: boolean) {
  const x = useMotionValue<number>(0);
  const y = useMotionValue<number>(0);

  useEffect(() => {
    if (!activate) return;

    let raf: number | null = null;
    const onMove = (e: PointerEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [activate, x, y]);

  return { x, y };
}

/* ------------------------------------------
   Main: physics + visuals (head, trail, ring)
-------------------------------------------*/
export default function CustomCursor() {
  const envEnabled = process.env.NEXT_PUBLIC_CURSOR_ENABLED !== "0";
  const { isCoarse } = usePointerType();
  const prefersReducedMotion = useReducedMotion();
  const active = envEnabled && !prefersReducedMotion && !isCoarse;
  const hideNativeCursor = process.env.NEXT_PUBLIC_CURSOR_HIDE_NATIVE === "1";

  // Toggle html[data-cursor="assist" | "immersive"] for CSS hooks (no default cursor hiding)
  useEffect(() => {
    const html = document.documentElement;
    if (active) {
      html.setAttribute("data-cursor", hideNativeCursor ? "immersive" : "assist");
    } else {
      html.removeAttribute("data-cursor");
    }
    return () => html.removeAttribute("data-cursor");
  }, [active, hideNativeCursor]);

  // Core motion values (typed as number to avoid literal-narrowing TS issues)
  const t = useMotionValue<number>(0); // ms timeline
  const speed = useMotionValue<number>(0);
  const accel = useMotionValue<number>(0);
  const glow = useMotionValue<number>(CFG.GLOW.base);
  const ringScaleMV = useMotionValue<number>(1);
  const ringOpacityMV = useMotionValue<number>(0.7);

  // Live cursor position (rAF-throttled in the hook)
  const { x, y } = useClientCursor(active);

  // Previous-frame refs & transient state (no re-renders)
  const prevX = useRef(0);
  const prevY = useRef(0);
  const prevSpeed = useRef(0);
  const dirX = useRef(0);
  const dirY = useRef(0);
  const burst = useRef(0);
  const idleAmt = useRef(0);
  const edgeBoost = useRef(0);
  const vw = useRef(0);
  const vh = useRef(0);

  // Cache viewport size (no per-frame layout reads)
  useEffect(() => {
    if (!active) return;
    const update = () => {
      vw.current = window.innerWidth;
      vh.current = window.innerHeight;
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [active]);

  // Optional theme "sky" hue (blends cursor hue toward site theme)
  const skyHue: MotionValue<number> = useMotionValue<number>(CFG.HUE.baseDrift);
  useEffect(() => {
    // Cheap + one-time read; safe even if inactive
    const root = document.documentElement;
    const readHue = (name: string) => {
      const v = getComputedStyle(root).getPropertyValue(name).trim();
      const m = v.match(/(-?\d+(\.\d+)?)/);
      return m ? parseFloat(m[1]) : null;
    };
    const candidate =
      readHue("--sky-hue") ?? readHue("--accent-h") ?? readHue("--primary-h");
    if (candidate != null && Number.isFinite(candidate)) {
      skyHue.set(((candidate % 360) + 360) % 360);
    }
  }, [skyHue]);

  // OLED ghosting mitigation toggles
  const oled = useRef(false);
  useEffect(() => {
    try {
      oled.current =
        window.matchMedia("(dynamic-range: high)").matches ||
        window.matchMedia("(color-gamut: p3)").matches;
    } catch {
      oled.current = false;
    }
  }, []);

  // Click reward (ring pop)
  const clickPulse = useRef(0);
  useEffect(() => {
    if (!active) return;
    const onDown = () => {
      clickPulse.current = Math.min(
        clickPulse.current + CFG.RING.clickPulseMax,
        CFG.RING.clickPulseMax,
      );
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, [active]);

  /* ---------------------------
     Springs: trail + ring
  ----------------------------*/
  const baseConfigs = useMemo(
    () =>
      ([
        { stiffness: 360, damping: 20, mass: 0.5 },
        { stiffness: 300, damping: 24, mass: 0.6 },
        { stiffness: 240, damping: 28, mass: 0.75 },
        { stiffness: 200, damping: 32, mass: 0.9 },
        { stiffness: 170, damping: 36, mass: 1.05 },
        { stiffness: 150, damping: 40, mass: 1.2 },
      ] as const),
    [],
  );

  const trail0X = useSpring(x, baseConfigs[0]);
  const trail0Y = useSpring(y, baseConfigs[0]);
  const trail1X = useSpring(trail0X, baseConfigs[1]);
  const trail1Y = useSpring(trail0Y, baseConfigs[1]);
  const trail2X = useSpring(trail1X, baseConfigs[2]);
  const trail2Y = useSpring(trail1Y, baseConfigs[2]);
  const trail3X = useSpring(trail2X, baseConfigs[3]);
  const trail3Y = useSpring(trail2Y, baseConfigs[3]);
  const trail4X = useSpring(trail3X, baseConfigs[4]);
  const trail4Y = useSpring(trail3Y, baseConfigs[4]);
  const trail5X = useSpring(trail4X, baseConfigs[5]);
  const trail5Y = useSpring(trail4Y, baseConfigs[5]);

  const trailX = [trail0X, trail1X, trail2X, trail3X, trail4X, trail5X];
  const trailY = [trail0Y, trail1Y, trail2Y, trail3Y, trail4Y, trail5Y];

  // Magnetic ring follows the middle trail with a tight spring
  const ringX = useSpring(trail2X, {
    stiffness: CFG.RING.stiffness,
    damping: CFG.RING.damping,
    mass: CFG.RING.mass,
  });
  const ringY = useSpring(trail2Y, {
    stiffness: CFG.RING.stiffness,
    damping: CFG.RING.damping,
    mass: CFG.RING.mass,
  });

  // Per-dot chroma params: ±8°–12° amp, phase shift
  const chroma = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const amp = CFG.HUE.ampMin + ((i * 7) % 9); // 8..16 (clamped to 12)
        const phase = (Math.PI / 5) * i;
        const base = 18 + i * CFG.HUE.baseStep;
        return { amp, phase, base };
      }),
    [],
  );

  /* ---------------------------
     rAF physics engine
  ----------------------------*/
  useAnimationFrame((_now, delta) => {
    if (!active) return;

    t.set(t.get() + delta);

    // Current pointer
    const cx = x.get();
    const cy = y.get();

    // Velocity (px/s)
    const vx = ((cx - prevX.current) / Math.max(delta, 1)) * 1000;
    const vy = ((cy - prevY.current) / Math.max(delta, 1)) * 1000;
    const vMag = Math.hypot(vx, vy);

    // Smoothed speed + accel
    const s = lerp(speed.get(), vMag, 0.22);
    speed.set(s);
    const a = ((s - prevSpeed.current) / Math.max(delta, 1)) * 1000;
    accel.set(a);

    // Direction flip → elastic burst
    const dot = dirX.current * vx + dirY.current * vy; // negative on reversal
    const dirMag = Math.hypot(dirX.current, dirY.current) * Math.hypot(vx, vy);
    const turningHard = dirMag > 1e-3 && dot < 0 && s > CFG.BURST.thresholdSpeed;
    if (turningHard) {
      burst.current = Math.min(burst.current + CFG.BURST.add, CFG.BURST.max);
    }
    burst.current *= CFG.BURST.decay;

    // Update normalized direction
    const n = Math.hypot(vx, vy) || 1;
    dirX.current = vx / n;
    dirY.current = vy / n;

    // Idle shimmer
    const paused = s < 20;
    if (paused) {
      idleAmt.current = clamp(idleAmt.current + delta * CFG.IDLE.awakenRate, 0, 1);
    } else {
      idleAmt.current *= CFG.IDLE.melt;
    }

    // Edge proximity (cached viewport sizes)
    const edgeDist = Math.min(cx, cy, vw.current - cx, vh.current - cy);
    const edge = clamp(1 - edgeDist / CFG.EDGE.radius, 0, 1);
    edgeBoost.current = lerp(edgeBoost.current, edge, CFG.EDGE.boostLerp);

    // Ring scale target from speed + idle breath + burst + click pulse
    const speedGain = clamp(s * CFG.RING.speedGainScale, 0, 0.32);
    const breatheAmp = CFG.RING.idleBreathAmp * (1 + 0.65 * idleAmt.current);
    const breathe = paused ? breatheAmp * Math.sin(t.get() / 620) : 0;
    clickPulse.current *= CFG.RING.clickPulseDecay;

    const ringTarget = 1 + speedGain + breathe + burst.current * 0.85 + clickPulse.current;
    ringScaleMV.set(ringTarget);

    // Ring opacity: brighten near edges, dim slightly at very high speed
    const baseOp = paused ? 0.92 : 0.78 - clamp(s / 6000, 0, 0.12);
    const edgeOp = edgeBoost.current * (CFG.RING.edgePulseGain + 0.05);
    ringOpacityMV.set(clamp(baseOp + edgeOp, 0.55, 1));

    // Glow strength (OLED-safe scaling)
    const glowTarget = clamp(
      CFG.GLOW.base + s * CFG.GLOW.speedScale + edgeBoost.current * CFG.GLOW.edgeScale,
      0.25,
      0.95,
    );
    glow.set(lerp(glow.get(), glowTarget, 0.18));

    // Remember for next frame
    prevX.current = cx;
    prevY.current = cy;
    prevSpeed.current = s;
  });

  const sizes = CFG.TRAIL.sizes;
  const headSize = 16;
  const ringSize = 44;

  // Render after all hooks are declared (no conditional hooks)
  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" aria-hidden style={{ zIndex: CFG.Z.container }}>
      {/* Head dot (crisp) */}
      <motion.div
        className="cursor-dot"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: headSize,
          height: headSize,
          borderRadius: 999,
          position: "fixed",
          pointerEvents: "none",
          willChange: "transform, filter, opacity",
          zIndex: CFG.Z.head,
        }}
        onUpdate={(latest) => {
          const time = t.get();
          const { base, phase } = chroma[0];
          const trailHue = base + 6 + Math.sin(time / 1100 + phase) * 10;
          const blendedHue = mixHue(trailHue, skyHue.get(), CFG.HUE.skyInfluence * 0.8);
          const g = clamp(glow.get() * 1.1, 0.25, 1.05);
          const shadowScale = oled.current ? CFG.GLOW.oledShadowScale : 1;

          (latest as UpdatableStyles).filter = `hue-rotate(${blendedHue}deg)
            drop-shadow(0 0 ${18 * g * shadowScale}px
              hsla(${blendedHue},95%,65%,${0.55 + g * 0.45}))`;
        }}
      />

      {/* Trailing dots (depth + inertia). Visuals via CSS classes; we update filter only. */}
      {trailX.map((tx, i) => {
        const ty = trailY[i];
        const baseScale = 1 - i * 0.08;
        return (
          <motion.div
            key={`trail-${i}`}
            className="cursor-trail-dot"
            style={{
              x: tx,
              y: ty,
              translateX: "-50%",
              translateY: "-50%",
              width: sizes[i],
              height: sizes[i],
              borderRadius: 999,
              position: "fixed",
              pointerEvents: "none",
              willChange: "transform, filter, opacity",
              zIndex: CFG.Z.dots,
              opacity: 0.85 - i * 0.07,
            }}
            animate={{
              scale: [baseScale, baseScale + 0.05, baseScale],
            }}
            transition={{
              repeat: Infinity,
              duration: CFG.TRAIL.baseDur + i * CFG.TRAIL.stepDur,
              ease: "easeInOut",
            }}
            onUpdate={(latest) => {
              const { amp, phase, base } = chroma[i];
              const time = t.get();
              const breathe =
                Math.sin(time / 1200 + phase) * clamp(amp, CFG.HUE.ampMin, CFG.HUE.ampMax);
              const laggedHue = (base + i * CFG.HUE.baseStep + breathe) % 360;

              const blendedHue = mixHue(
                laggedHue,
                skyHue.get(),
                CFG.HUE.skyInfluence * (0.6 + 0.4 * edgeBoost.current),
              );

              const gBase = glow.get() * (1.1 - i * 0.08);
              const blurBase =
                (0.45 + i * 0.18) * (oled.current ? CFG.GLOW.oledBlurScale : 1);
              const shadowScale = oled.current ? CFG.GLOW.oledShadowScale : 1;

              (latest as UpdatableStyles).filter = `hue-rotate(${blendedHue}deg)
                drop-shadow(0 0 ${(16 * gBase + i * 2.2) * shadowScale}px
                  hsla(${blendedHue},95%,60%,${0.45 + gBase * 0.4}))
                blur(${blurBase}px)`;
            }}
          />
        );
      })}

      {/* Magnetic ring (focus) */}
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
          borderRadius: 999,
          position: "fixed",
          pointerEvents: "none",
          willChange: "transform, filter, opacity",
          zIndex: CFG.Z.ring,
          scale: ringScaleMV,
          opacity: ringOpacityMV,
        }}
        onUpdate={(latest) => {
          const time = t.get();
          const k = clamp(speed.get() / 1400, 0, 1);
          const baseHue = mixHue(
            CFG.HUE.baseDrift + Math.sin(time / 1400) * 16 + k * 30,
            skyHue.get(),
            CFG.HUE.skyInfluence,
          );

          const rim = clamp(0.35 + glow.get() * 0.75, 0.35, 1);
          const wobble = edgeBoost.current * 3 * Math.sin(time / 260); // tiny ripple near edges
          const hue = (baseHue + wobble + 360) % 360;
          const shadowScale = oled.current ? CFG.GLOW.oledShadowScale : 1;

          (latest as UpdatableStyles).filter = `hue-rotate(${hue}deg)
            drop-shadow(0 0 ${26 * rim * shadowScale}px
              hsla(${hue},95%,62%,${0.35 + rim * 0.4}))`;
        }}
        transition={{
          type: "spring",
          stiffness: CFG.RING.stiffness,
          damping: CFG.RING.damping,
          mass: CFG.RING.mass,
        }}
      />
    </div>
  );
}
