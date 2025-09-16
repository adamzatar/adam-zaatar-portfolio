// components/AnimatedBackground.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Lazy-load AnimatedSky to reduce bundle size
const AnimatedSky = dynamic(() => import("./AnimatedSky"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-50 bg-gradient-to-b from-[var(--bg)] to-[var(--surface)]" />
  ),
});

export default function AnimatedBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <div className="absolute inset-0 -z-50">
      <AnimatedSky />
    </div>
  );
}