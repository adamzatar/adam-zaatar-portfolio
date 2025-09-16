// components/AnimatedBackground.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Lazy-load to reduce bundle size
const AnimatedBackgroundChrome = dynamic(
  () => import("./AnimatedBackgroundChrome"),
  { ssr: false, loading: () => <FallbackBackground /> }
);

const AnimatedBackgroundSafari = dynamic(
  () => import("./AnimatedBackgroundSafari"),
  { ssr: false, loading: () => <FallbackBackground /> }
);

// Fallback gradient always behind content
function FallbackBackground() {
  return (
    <div className="absolute inset-0 -z-50 bg-gradient-to-b from-[var(--bg)] to-[var(--surface)]" />
  );
}

export default function AnimatedBackground() {
  const [engine, setEngine] = useState<"safari" | "chrome" | null>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent;

      const isSafari =
        /^((?!chrome|crios|android|fxios).)*safari/i.test(ua) ||
        /\b(iPad|iPhone|iPod)\b/.test(ua);

      const isChromeLike =
        /\b(Chrome|Chromium|Edg)\b/i.test(ua) && !isSafari;

      if (isSafari) setEngine("safari");
      else if (isChromeLike) setEngine("chrome");
      else setEngine("safari"); // fallback to lightweight mode
    }
  }, []);

  if (!engine) {
    return <FallbackBackground />;
  }

  return (
    <div className="absolute inset-0 -z-50">
      {engine === "safari" ? (
        <AnimatedBackgroundSafari />
      ) : (
        <AnimatedBackgroundChrome />
      )}
    </div>
  );
}