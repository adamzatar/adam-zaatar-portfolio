"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

/* --------------------------------------------
   Types for CSS custom properties (no `any`)
--------------------------------------------- */
type CSSVarName = `--${string}`;
type CSSVars = Record<CSSVarName, string | number>;
type StyleWithVars = React.CSSProperties & CSSVars;

export type CursorTrailProps = {
  /** Number of dots in the trail. Keep <= 24 for perf. */
  count?: number;
  /** Base dot size in px (the head of the trail). */
  size?: number;
  /** Base color of the trail (CSS color). */
  color?: string;
  /** Optional glow color; set "" to disable. */
  glowColor?: string;
  /** Overall opacity multiplier [0..1]. */
  opacity?: number;
  /** Smoothing factor (higher is “snakier”). Suggested 0.15–0.35. */
  follow?: number;
  /** Optional className for the overlay container. */
  className?: string;
  /** Force-disable the trail (in addition to prefers-reduced-motion). */
  disabled?: boolean;
  /** z-index for the overlay. */
  zIndex?: number;
};

/**
 * CursorTrail
 * A lightweight, transform-only cursor trail overlay.
 * - Fixed overlay, pointer-events: none → never captures clicks
 * - Uses pointer events (mouse/touch/pen)
 * - Respects prefers-reduced-motion
 * - Pauses when document is hidden
 */
export default function CursorTrail({
  count = 10,
  size = 14,
  color = "var(--secondary, #22d3ee)",
  glowColor = "rgba(34, 211, 238, 0.55)", // cyan-ish
  opacity = 0.9,
  follow = 0.22,
  className = "",
  disabled,
  zIndex = 40,
}: CursorTrailProps) {
  const prefersReduced = useReducedMotion();
  const dotsRef = React.useRef<HTMLDivElement[]>([]);
  const pointsRef = React.useRef<{ x: number; y: number }[] | null>(null);
  const headRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = React.useRef<number>(0);
  const activeRef = React.useRef<boolean>(false);

  const isDisabled = disabled || prefersReduced;

  // Initialize points at screen center on mount
  React.useEffect(() => {
    if (isDisabled || typeof window === "undefined") return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    pointsRef.current = Array.from({ length: count }, () => ({ x: cx, y: cy }));
    headRef.current = { x: cx, y: cy };
  }, [count, isDisabled]);

  // Pointer tracking
  React.useEffect(() => {
    if (isDisabled || typeof window === "undefined" || !pointsRef.current) return;

    const onPointerMove = (e: PointerEvent) => {
      headRef.current.x = e.clientX;
      headRef.current.y = e.clientY;
    };

    // Also support touchmove (in case pointer events are limited)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        headRef.current.x = e.touches[0].clientX;
        headRef.current.y = e.touches[0].clientY;
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [isDisabled]);

  // Animation loop (transform-only)
  React.useEffect(() => {
    if (isDisabled || typeof window === "undefined" || !pointsRef.current) return;

    const points = pointsRef.current;

    const tick = () => {
      if (document.hidden) {
        // If hidden, skip frame and schedule the next; keeps GPU idle
        rafRef.current = window.requestAnimationFrame(tick);
        return;
      }

      // Head eases toward pointer
      points[0].x += (headRef.current.x - points[0].x) * (follow + 0.08);
      points[0].y += (headRef.current.y - points[0].y) * (follow + 0.08);

      // Each subsequent point eases toward the previous point
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        curr.x += (prev.x - curr.x) * follow;
        curr.y += (prev.y - curr.y) * follow;
      }

      // Apply transforms (scale and opacity taper)
      const n = dotsRef.current.length;
      for (let i = 0; i < n; i++) {
        const el = dotsRef.current[i];
        if (!el) continue;
        const p = points[i];

        // Taper: head = 1, tail smaller
        const t = i / Math.max(1, n - 1);
        const scale = 1 - t * 0.7; // 1 → 0.3
        const alpha = opacity * (1 - t * 0.86); // front more visible

        // Compose transform string (GPU-friendly)
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${scale})`;
        el.style.opacity = `${alpha}`;
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    if (!activeRef.current) {
      activeRef.current = true;
      rafRef.current = window.requestAnimationFrame(tick);
    }

    const onVisibility = () => {
      // If we come back to foreground, re-kick RAF (some browsers cancel)
      if (!document.hidden && activeRef.current && rafRef.current === 0) {
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      activeRef.current = false;
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [follow, opacity, isDisabled]);

  if (isDisabled) return null;

  // Shared styles via CSS vars (no global CSS required, but plays nice if present)
  const containerStyle: React.CSSProperties = {
    zIndex,
  };

  const baseDot: StyleWithVars = {
    width: `${size}px`,
    height: `${size}px`,
    background: color,
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: "9999px",
    willChange: "transform, opacity",
    pointerEvents: "none",
    // Use box-shadow for glow (cheaper than animating filter)
    boxShadow: glowColor ? `0 0 ${Math.max(10, size)}px ${glowColor}` : "none",
    // Slight blur softens on high-dpi without being too heavy for Safari
    filter: "blur(0.5px)",
    // Blend a bit for vibrant themes, but safe default if not supported
    mixBlendMode: "screen",
  };

  return (
    <div
      className={`pointer-events-none fixed inset-0 ${className ?? ""}`}
      style={containerStyle}
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) dotsRef.current[i] = el;
          }}
          // Inline base styles so this component is fully self-contained
          style={baseDot}
        />
      ))}
    </div>
  );
}