// components/visuals/CrescentMoon.tsx
"use client";

import * as React from "react";
import clsx from "clsx";
import { motion } from "@/components/motion/serverSafeMotion";
import {
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionStyle,
} from "framer-motion";

export interface CrescentMoonProps {
  /** Visual diameter of the moon. Numbers are treated as px. */
  size?: number | string;

  /** Overall brightness / glow multiplier. 1 = baseline. */
  intensity?: number; // 0.4..1.6

  /** Base hue (in degrees). Cool silvery = ~220–240, warm ~40–60. */
  hue?: number;

  /**
   * Phase controller.
   * 0   = "full-ish" (thick crescent)
   * 0.5 = medium crescent
   * 1   = razor-thin crescent
   */
  phase?: number;

  /** Which side is illuminated. */
  orientation?: "waxing" | "waning";

  /** Enable scroll-linked vertical parallax. */
  parallax?: boolean;

  /** Enable subtle breathing / shimmer animations. */
  animate?: boolean;

  /** Extra Tailwind / custom classes. */
  className?: string;
}

type CSSVars = { [key: `--${string}`]: string | number | undefined };
type MoonStyle = MotionStyle & CSSVars;

const clamp = (v: number, a: number, b: number) =>
  Math.min(b, Math.max(a, v));

export function CrescentMoon({
  size = 260,
  intensity = 1.0,
  hue = 225,
  phase = 0.7,
  orientation = "waxing",
  parallax = true,
  animate = true,
  className,
}: CrescentMoonProps) {
  const reduceMotion = useReducedMotion();
  const animateEnabled = animate && !reduceMotion;

  const dim = typeof size === "number" ? `${size}px` : size;
  const baseIntensity = clamp(intensity, 0.4, 1.6);

  // Normalize phase → 0..1 (0 = thick, 1 = very thin)
  const phaseClamped = clamp(phase, 0, 1);

  // Shadow disc offset in "moon radii"
  // 0   → almost centered (thicker)
  // 0.85 → further offset (thin crescent)
  const shadowOffset = 0.35 + phaseClamped * 0.5; // 0.35..0.85 radius
  const litOnRight = orientation === "waxing";
  const offsetX = shadowOffset * (litOnRight ? 1 : -1);

  // Base moon colors
  const moonHue = hue;
  const lit = `hsl(${moonHue} 22% ${78 + 6 * baseIntensity}%)`;
  const mid = `hsl(${moonHue} 20% ${60 + 4 * baseIntensity}%)`;
  const dark = `hsl(${moonHue} 30% ${36 + 6 * baseIntensity}%)`;

  // Halo color
  const haloTint = `hsl(${moonHue + 8} 45% ${72 + 6 * baseIntensity}%)`;

  const styleVars: CSSVars = {
    "--moon-size": dim,
    "--moon-intensity": baseIntensity,
    "--moon-hue": moonHue,
  };

  // Tiny breathing scale based on intensity
  const baseScale = 0.98 + 0.04 * baseIntensity;
  const scale = animateEnabled ? baseScale : 1;

  // Scroll-linked parallax (kept very subtle)
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [6, -6]);

  const motionStyle: MoonStyle = {
    ...styleVars,
    width: dim,
    height: dim,
  };

  if (parallax) {
    motionStyle.y = parallaxY;
  }

  // Edge sharpness controls — keeps thin crescents crisp instead of fuzzy.
  const taperedPhase = Math.pow(phaseClamped, 0.9);

  // Unique IDs so gradients/masks don't collide if rendered multiple times
  const id = React.useId();
  const gradientId = `crescent-gradient-${id}`;
  const maskId = `crescent-mask-${id}`;

  return (
    <motion.div
      aria-hidden="true"
      role="presentation"
      className={clsx(
        "relative pointer-events-none select-none",
        "flex items-center justify-center",
        className,
      )}
      style={motionStyle}
      animate={animateEnabled ? { scale } : { scale: 1 }}
      transition={{
        duration: 1.1,
        ease: [0.17, 0.67, 0.29, 0.99],
      }}
    >
      {/* Soft outer halo */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: "none",
          borderRadius: "9999px",
          background: `
            radial-gradient(
              circle at ${litOnRight ? "72%" : "28%"} 32%,
              ${haloTint} 0%,
              transparent 55%
            ),
            radial-gradient(
              circle at 50% 62%,
              ${haloTint} 0%,
              transparent 72%
            )
          `,
          filter: "blur(30px)",
          mixBlendMode: "screen",
          opacity: 0.7 * baseIntensity,
        }}
      />

      {/* Actual crescent moon – SVG with a true cut-out shape (no full disc behind) */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="block overflow-visible"
      >
        <defs>
          {/* Lit gradient across the lunar disc */}
          <radialGradient
            id={gradientId}
            cx="50%"
            cy="45%"
            r="55%"
            fx={litOnRight ? "70%" : "30%"}
            fy="38%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.98} />
            <stop offset="32%" stopColor={lit} stopOpacity={1} />
            <stop offset="68%" stopColor={mid} stopOpacity={1} />
            <stop offset="100%" stopColor={dark} stopOpacity={1} />
          </radialGradient>

          {/* Mask: lit disc minus shadow disc = crescent only
              NOTE: maskUnits/userSpaceOnUse fixes Safari/WebKit quirks. */}
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
          >
            {/* Start fully transparent */}
            <rect x="0" y="0" width="100" height="100" fill="black" />
            {/* Visible lit disc */}
            <circle cx="50" cy="50" r="45" fill="white" />
            {/* Subtract shadow disc */}
            <circle
              cx={50 + offsetX * 45}
              cy="50"
              r="45"
              fill="black"
            />
          </mask>
        </defs>

        {/* Only the masked crescent is visible */}
        <g mask={`url(#${maskId})`}>
          {/* Lit body */}
          <circle cx="50" cy="50" r="46" fill={`url(#${gradientId})`} />

          {/* Subtle crater clusters */}
          <g
            fill={`rgba(0, 0, 0, ${0.18 + 0.04 * baseIntensity})`}
            stroke="rgba(0, 0, 0, 0.2)"
            strokeWidth={0.4}
          >
            <ellipse cx="43" cy="34" rx="3.6" ry="2.8" />
            <ellipse cx="58" cy="46" rx="4" ry="3" />
            <ellipse cx="52" cy="61" rx="3.2" ry="2.4" />
            <ellipse cx="47" cy="52" rx="3.4" ry="2.6" />
            <ellipse cx="62" cy="36" rx="3.2" ry="2.3" />
          </g>

          {/* Lighter crater rims */}
          <g
            fill={`rgba(255,255,255,${0.24 + 0.06 * baseIntensity})`}
            stroke="rgba(0,0,0,0.2)"
            strokeWidth={0.25}
          >
            <ellipse cx="39" cy="40" rx="2.2" ry="1.8" />
            <ellipse cx="53" cy="38" rx="2.3" ry="1.7" />
            <ellipse cx="49" cy="68" rx="2.5" ry="1.9" />
          </g>
          {/* Soft rim glow kept inside the mask */}
          <circle
            cx="50"
            cy="50"
            r={45 - taperedPhase * 3}
            fill="none"
            stroke={`rgba(255,255,255,${0.25 + 0.35 * (1 - taperedPhase)})`}
            strokeWidth={2.8 - taperedPhase * 1.4}
            style={{ mixBlendMode: "screen", opacity: 0.8 }}
          />
        </g>
     </svg>
    </motion.div>
  );
}

export default CrescentMoon;
