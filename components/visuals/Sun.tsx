"use client";

import * as React from "react";
import clsx from "clsx";
import { motion } from "@/components/motion/serverSafeMotion";
import { useScroll, useTransform, useReducedMotion } from "framer-motion";

export interface SunProps {
  /** Visual diameter of the celestial body. Numbers are treated as px. */
  size?: number | string;

  /** Overall brightness multiplier. 1 = baseline. */
  intensity?: number; // 0.4..1.6

  /** Base solar hue in degrees. 40–52 is warm, natural daylight. */
  hue?: number;

  /** Legacy alias for glow (kept for compatibility). */
  rays?: number;

  /** Additional halo/glow strength. */
  glow?: number; // 0..1

  /** Subtle flare / bloom input. */
  flare?: number; // 0..1

  /** Enables breathing + parallax animation. Respects prefers-reduced-motion. */
  animate?: boolean;

  /** Extra Tailwind / custom classes. */
  className?: string;

  /** Fine-tune hue to match brand palette. */
  hueShift?: number;

  /** Enable gentle scroll-linked vertical parallax. */
  parallax?: boolean;

  /**
   * Optional normalized “presence” of the sun, for external crossfades.
   * 0 = fully off, 1 = fully present.
   *
   * This is how GlobalVisuals can fade the sun in/out against the moon,
   * without the Sun component knowing anything about lunar logic.
   */
  strength?: number; // 0..1
}

type CSSVarStyle = React.CSSProperties & {
  [key: `--${string}`]: string | number | undefined;
};

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function Sun({
  size = 320,
  intensity = 1.0,
  hue = 46,
  rays,
  glow,
  flare = 0.25,
  animate = true,
  className,
  hueShift = 0,
  parallax = true,
  strength = 1,
}: SunProps) {
  const reduceMotion = useReducedMotion();
  const animateEnabled = animate && !reduceMotion;

  const dim = typeof size === "number" ? `${size}px` : size;

  const baseIntensity = clamp(intensity, 0.4, 1.6);
  const sunStrength = clamp(strength, 0, 1);

  const glowLevel = clamp(
    typeof glow === "number"
      ? glow
      : typeof rays === "number"
      ? rays
      : 0.8,
    0,
    1,
  );

  const flareBoost = clamp(flare, 0, 1);

  // Color design: warm ambers with a tunable brand shift.
  const sunHueBase = hue;
  const sunHue = sunHueBase + hueShift;

  const coreColor = `hsl(${sunHue} 93% ${58 + 8 * baseIntensity}%)`;
  const coreHighlight = `hsl(${sunHue + 10} 98% ${74 + 6 * baseIntensity}%)`;
  const haloColor = `hsl(${sunHue - 6} 90% ${52 + 6 * baseIntensity}%)`;

  const styleVars: CSSVarStyle = React.useMemo(
    () => ({
      // Sun-side colors → consumed by .celestial-* CSS
      "--cb-core-color": coreColor,
      "--cb-core-highlight": coreHighlight,
      "--cb-halo-color": haloColor,

      // Solar mix knobs
      "--cb-sun-strength": sunStrength,
      "--cb-glow": glowLevel,
      "--cb-flare": flareBoost,
      "--cb-intensity": baseIntensity,

      // Legacy vars used elsewhere in the visual system
      "--sun-h": sunHue,
      "--sun-bright": baseIntensity,
      "--sun-glow":
        0.5 + 0.4 * sunStrength * (0.4 + glowLevel * 0.6),
      "--sun-flare": 0.2 + 0.5 * flareBoost * sunStrength,

      width: dim,
      height: dim,
    }),
    [
      coreColor,
      coreHighlight,
      haloColor,
      sunStrength,
      glowLevel,
      flareBoost,
      baseIntensity,
      sunHue,
      dim,
    ],
  );

  // Very gentle “breathing” scale — slightly fuller at higher intensity/strength.
  const scale = animateEnabled
    ? 0.96 + 0.06 * baseIntensity + 0.04 * sunStrength
    : 1;

  // Optional scroll-linked parallax (tiny offset only).
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [8, -8]);

  return (
    <motion.div
      aria-hidden="true"
      role="presentation"
      className={clsx(
        "celestial-body pointer-events-none select-none",
        "flex items-center justify-center",
        className,
      )}
      style={{
        ...styleVars,
        y: parallax ? parallaxY : 0,
        // Single, clear opacity control driven by GlobalVisuals.
        opacity: sunStrength,
      }}
      animate={animateEnabled ? { scale } : { scale: 1 }}
      transition={{
        duration: 1.1,
        ease: [0.17, 0.67, 0.29, 0.99],
      }}
    >
      {/* Outer glow / corona (Sun) */}
      <div className="celestial-halo" />

      {/* Soft, rotating coronal rays (see .celestial-rays in globals.css) */}
      <div className="celestial-rays" />

      {/* Solar core with limb darkening + hotspot */}
      <div className="celestial-core" />
    </motion.div>
  );
}