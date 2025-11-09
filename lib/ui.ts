"use client";

import { Variants } from "framer-motion";

/* =============================
   🎨 DESIGN TOKENS — CORE SYSTEM
   ============================= */
export const gradients = {
  // Main hero gradient — tuned for accessibility and vibrancy
  heroText:
    "bg-gradient-to-r from-[#5f7aff] via-[#7d6dff] to-[#43d7bd] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(100,120,255,0.25)]",

  // Surface tint used behind translucent UI elements
  surface:
    "bg-[color-mix(in_oklab,var(--surface) 88%,transparent)] dark:bg-[color-mix(in_oklab,var(--surface) 72%,transparent)]",
  
  // Subtle gradient layer for cards or elevated content
  card:
    "bg-gradient-to-br from-[color-mix(in_oklab,var(--surface) 90%,transparent)] to-[color-mix(in_oklab,var(--surface) 70%,transparent)] dark:from-[color-mix(in_oklab,var(--surface) 75%,transparent)] dark:to-[color-mix(in_oklab,var(--surface) 55%,transparent)]",

  // Accent ribbon for CTAs or key highlights
  accent:
    "bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]",
};

/* =============================
   ☁️ SHADOWS & DEPTH SYSTEM
   ============================= */
export const shadows = {
  // Strong elevation used for cards or modal surfaces
  card:
    "shadow-[0_18px_40px_rgba(20,26,61,0.18),0_8px_18px_rgba(0,0,0,0.08)] dark:shadow-[0_18px_42px_rgba(0,0,0,0.45)]",

  // Soft elevation for floating elements (buttons, chips)
  soft:
    "shadow-[0_8px_22px_rgba(20,26,61,0.14)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]",

  // Lightning accent shadow for “charged” or rain variants
  charged:
    "shadow-[0_0_40px_4px_rgba(120,140,255,0.3)] dark:shadow-[0_0_50px_6px_rgba(150,160,255,0.25)]",
};

/* =============================
   🟦 RADII, SPACING & STRUCTURE
   ============================= */
export const radii = {
  card: "rounded-3xl",
  chip: "rounded-full",
  section: "rounded-2xl",
};

/* =============================
   🧱 BASE COMPONENT PRESETS
   ============================= */
export const buttonBase =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] rounded-full active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

export const cardBase =
  "relative overflow-hidden border border-[color-mix(in_oklab,var(--border) 55%,transparent)] backdrop-blur-xl supports-[backdrop-filter]:backdrop-blur-lg rounded-3xl transition-all duration-300 hover:shadow-[0_14px_36px_rgba(0,0,0,0.25)]";

export const chipBase =
  "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-[color-mix(in_oklab,var(--border) 50%,transparent)] bg-[color-mix(in_oklab,var(--surface) 88%,transparent)] dark:bg-[color-mix(in_oklab,var(--surface) 72%,transparent)] transition-all duration-300 hover:scale-[1.03]";

/* =============================
   ✍️ TYPOGRAPHY & TEXT TOKENS
   ============================= */
export const textStyles = {
  muted: "text-foreground/70",
  secondary: "text-foreground/85",
  accent: "text-[var(--primary)]",
  glow: "text-[var(--accent)] drop-shadow-[0_0_12px_rgba(100,255,255,0.3)]",
};

/* =============================
   ⚙️ MOTION PRESETS
   ============================= */
export const fadeUp = (delayIndex = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 26,
      delay: delayIndex * 0.08,
    },
  },
});

export const fadeIn = (delayIndex = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: delayIndex * 0.1 },
  },
});

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/* =============================
   🌈 DYNAMIC UTILITIES
   ============================= */
export const hoverGlow =
  "hover:shadow-[0_0_24px_rgba(100,120,255,0.3)] dark:hover:shadow-[0_0_32px_rgba(150,150,255,0.25)] transition-shadow duration-300";

export const rainOverlay =
  "absolute inset-0 bg-[linear-gradient(to-bottom,rgba(255,255,255,0.05)_0%,transparent_100%)] pointer-events-none mix-blend-overlay opacity-70";

export const lightningFlash =
  "animate-pulse bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]";

/* =============================
   ✅ EXPORT SUMMARY
   ============================= */
export const ui = {
  gradients,
  shadows,
  radii,
  buttonBase,
  cardBase,
  chipBase,
  textStyles,
  fadeUp,
  fadeIn,
  staggerContainer,
  hoverGlow,
  rainOverlay,
  lightningFlash,
};

export default ui;