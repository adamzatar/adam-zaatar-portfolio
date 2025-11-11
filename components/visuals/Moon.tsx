// components/visuals/Moon.tsx
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

export interface MoonProps {
  /** Visual diameter of the moon. Numbers are treated as px. */
  size?: number | string;

  /** Overall brightness / glow multiplier. 1 = baseline. */
  intensity?: number; // 0.4..1.6

  /** Base hue (in degrees). Cool silvery = ~220–240; warm crescent ≈ 40–55. */
  hue?: number;

  /**
   * Crescent phase controller.
   * 0   → thick, bold crescent / almost full disc
   * 0.5 → medium crescent
   * 1   → razor thin crescent
   *
   * For `variant="full"` we only use this as a very subtle limb shading factor.
   */
  phase?: number;

  /** Which side is illuminated. */
  orientation?: "waxing" | "waning";

  /** Enable scroll-linked vertical parallax. */
  parallax?: boolean;

  /** Enable subtle breathing / shimmer animations. */
  animate?: boolean;

  /**
   * External “presence” of the moon, for crossfades with the Sun.
   * 0 = fully hidden, 1 = fully present.
   */
  strength?: number; // 0..1

  /**
   * Visual style: cool full moon vs warm crescent.
   * - "full"     → cratered, silvery disc.
   * - "crescent" → yellow/golden crescent.
   */
  variant?: "full" | "crescent";

  className?: string;
}

type CSSVars = { [key: `--${string}`]: string | number | undefined };
type MoonStyle = MotionStyle & CSSVars;

const clamp = (v: number, a: number, b: number) =>
  Math.min(b, Math.max(a, v));

export default function Moon({
  size = 280,
  intensity = 1.0,
  hue = 225,
  phase = 0.8,
  orientation = "waxing",
  parallax = true,
  animate = true,
  strength = 1,
  variant = "full",
  className,
}: MoonProps) {
  const reduceMotion = useReducedMotion();
  const animateEnabled = animate && !reduceMotion;

  const dim = typeof size === "number" ? `${size}px` : size;

  const baseIntensity = clamp(intensity, 0.4, 1.6);
  const moonStrength = clamp(strength, 0, 1);

  // Normalize phase → [0,1].
  const phaseClamped = clamp(phase, 0, 1);

  // For crescent: how far the shadow disc is shifted.
  // 0   → almost centered (thick)
  // 1   → further offset (thin crescent)
  const crescentAmount = phaseClamped;
  const offsetPct = 10 + crescentAmount * 40; // 10% → 50%

  // Orientation: which side is illuminated.
  const litOnRight = orientation === "waxing";

  // Base moon colors (hue comes from GlobalVisuals; e.g. 225 = cool, 48 = warm).
  const moonHue = hue;
  const moonLit = `hsl(${moonHue} 18% ${82 + 4 * baseIntensity}%)`;
  const moonMid = `hsl(${moonHue} 18% ${60 + 4 * baseIntensity}%)`;
  const moonDark = `hsl(${moonHue} 26% ${32 + 6 * baseIntensity}%)`;

  // Halo color.
  const haloTint = `hsl(${moonHue + 10} 42% ${74 + 4 * baseIntensity}%)`;

  // Crater tints.
  const craterLight = `hsl(${moonHue + 6} 22% ${88 + 2 * baseIntensity}%)`;
  const craterDark = `hsl(${moonHue - 8} 28% ${38 + 4 * baseIntensity}%)`;

  const styleVars: CSSVars = {
    "--moon-size": dim,
    "--moon-intensity": baseIntensity,
    "--moon-hue": moonHue,
  };

  // Tiny breathing scale based on intensity + strength.
  const baseScale = 0.98 + 0.04 * baseIntensity + 0.02 * moonStrength;
  const scale = animateEnabled ? baseScale : 1;

  // Optional scroll-linked parallax (only applied when parallax=true
  // to avoid double-transform jitter against the orbit container).
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [6, -6]);

  const motionStyle: MoonStyle = {
    ...styleVars,
    width: dim,
    height: dim,
    opacity: moonStrength,
  };

  if (parallax) {
    motionStyle.y = parallaxY;
  }

  // Positions for lit side and rim highlight.
  const litSideX = litOnRight ? "80%" : "20%";
  const rimSideX = litOnRight ? "90%" : "10%";

  // Directional shift for the dark occluding disc (crescent only).
  const shadowTranslateX = `${litOnRight ? -offsetPct : offsetPct}%`;

  // Shared crater base — used only in full-moon variant.
  const craterBase: React.CSSProperties = {
    position: "absolute",
    borderRadius: "9999px",
    mixBlendMode: "soft-light",
    filter: "blur(0.3px)",
  };

  // Intentional crater layout, biased toward the lit side (full moon only).
  const craterConfigs = [
    {
      top: "32%",
      left: litOnRight ? "58%" : "24%",
      size: 18,
      depth: 1.0,
    },
    {
      top: "48%",
      left: litOnRight ? "66%" : "22%",
      size: 22,
      depth: 0.9,
    },
    {
      top: "40%",
      left: litOnRight ? "47%" : "33%",
      size: 14,
      depth: 0.8,
    },
    {
      top: "60%",
      left: litOnRight ? "52%" : "28%",
      size: 16,
      depth: 0.75,
    },
    {
      top: "36%",
      left: litOnRight ? "70%" : "18%",
      size: 12,
      depth: 0.7,
    },
  ] as const;

  const isFull = variant === "full";
  const isCrescent = variant === "crescent";

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
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(
              circle at ${litSideX} 36%,
              ${haloTint} 0%,
              transparent 52%
            ),
            radial-gradient(
              circle at 50% 60%,
              ${haloTint} 0%,
              transparent 70%
            )
          `,
          filter: "blur(32px)",
          mixBlendMode: "screen",
          opacity: 0.7 * baseIntensity * (0.6 + 0.4 * moonStrength),
        }}
      />

      {/* Core lunar body: clipped circle; everything stays inside this disc. */}
      <div className="absolute inset-[10%] rounded-full overflow-hidden">
        {isFull && (
          <>
            {/* Full, cratered disc */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  radial-gradient(
                    circle at 30% 30%,
                    ${moonLit} 0%,
                    ${moonLit} 30%,
                    ${moonMid} 55%,
                    ${moonDark} 90%
                  )
                `,
                boxShadow: `
                  0 0 24px rgba(15,23,42,0.85),
                  0 0 48px rgba(15,23,42,0.75)
                `,
                filter: `brightness(${
                  0.94 + 0.22 * baseIntensity * moonStrength
                })`,
              }}
            />

            {/* Micro texture */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  radial-gradient(circle at 32% 34%, ${craterDark} 0.5px, transparent 5px),
                  radial-gradient(circle at 46% 46%, ${craterLight} 0.5px, transparent 4px),
                  radial-gradient(circle at 54% 62%, ${craterDark} 1px, transparent 6px),
                  radial-gradient(circle at 64% 40%, ${craterDark} 1.5px, transparent 5px),
                  radial-gradient(circle at 38% 60%, ${craterLight} 0.75px, transparent 5px)
                `,
                mixBlendMode: "soft-light",
                opacity: 0.75,
                filter: "blur(0.4px)",
              }}
            />

            {/* Hero craters – circular / ring-based, fully inside the disc */}
            {craterConfigs.map((crater, index) => {
              const { top, left, size, depth } = crater;
              const sizePx = size;
              const innerR = sizePx * 0.4;
              const outerR = sizePx * 0.7;

              return (
                <span
                  key={`crater-${index}`}
                  style={{
                    ...craterBase,
                    top,
                    left,
                    width: `${sizePx}%`,
                    height: `${sizePx}%`,
                    background: `
                      radial-gradient(
                        circle at 50% 50%,
                        ${craterDark} 0,
                        ${craterDark} ${innerR}%,
                        ${craterLight} ${outerR}%,
                        transparent 100%
                      )
                    `,
                    opacity: 0.65 * depth,
                    boxShadow: `
                      inset 0 0 6px rgba(0,0,0,0.7),
                      0 0 6px rgba(15,23,42,0.45)
                    `,
                  }}
                />
              );
            })}
          </>
        )}

        {isCrescent && (
          <>
            {/* Base lit disc (warm, golden if hue is ~48 from GlobalVisuals) */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  radial-gradient(
                    circle at 50% 50%,
                    ${moonLit} 0%,
                    ${moonMid} 38%,
                    ${moonDark} 72%,
                    transparent 78%
                  )
                `,
                boxShadow: `
                  0 0 20px rgba(15,23,42,0.8),
                  0 0 40px rgba(15,23,42,0.7)
                `,
                filter: `brightness(${
                  0.96 + 0.24 * baseIntensity * moonStrength
                })`,
              }}
            />

            {/* Dark occluding disc to carve the crescent shape */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  radial-gradient(
                    circle at 50% 50%,
                    rgba(3, 6, 23, 0.98) 0%,
                    rgba(3, 6, 23, 0.98) 60%,
                    transparent 70%
                  )
                `,
                transform: `translateX(${shadowTranslateX})`,
                transition: "transform 900ms ease-out",
              }}
            />

            {/* Subtle surface texture, toned down so the crescent stays clean */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  radial-gradient(circle at 40% 40%, ${craterDark} 0.4px, transparent 4px),
                  radial-gradient(circle at 60% 60%, ${craterLight} 0.5px, transparent 4.5px)
                `,
                mixBlendMode: "soft-light",
                opacity: 0.45,
                filter: "blur(0.4px)",
              }}
            />
          </>
        )}
      </div>

      {/* Rim highlight hugging the lit edge (works for both full & crescent) */}
      <div
        className="absolute inset-[9%] rounded-full"
        style={{
          background: `
            radial-gradient(
              circle at ${rimSideX} 50%,
              rgba(255,255,255,0.98) 0%,
              rgba(255,255,255,0.45) 14%,
              transparent 36%
            )
          `,
          mixBlendMode: "screen",
          opacity: 0.95 * (0.7 + 0.3 * moonStrength),
          filter: "blur(3px)",
        }}
      />

      {/* Tiny star cluster around the moon */}
      <div
        className="pointer-events-none absolute inset-[4%]"
        style={{
          background: `
            radial-gradient(circle at 18% 24%, rgba(255,255,255,0.9) 0.6px, transparent 2px),
            radial-gradient(circle at 78% 22%, rgba(255,255,255,0.8) 0.9px, transparent 2.6px),
            radial-gradient(circle at 44% 80%, rgba(255,255,255,0.7) 0.7px, transparent 2.2px),
            radial-gradient(circle at 82% 64%, rgba(255,255,255,0.6) 0.6px, transparent 2px)
          `,
          opacity: 0.4 * (0.5 + 0.5 * moonStrength),
          filter: "blur(0.4px)",
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  );
}