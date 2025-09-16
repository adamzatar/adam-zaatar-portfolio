// components/AnimatedBackground.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Lazy-load to split bundles
const AnimatedBackgroundChrome = dynamic(
  () => import("./AnimatedBackgroundChrome"),
  { ssr: false }
);
const AnimatedBackgroundSafari = dynamic(
  () => import("./AnimatedBackgroundSafari"),
  { ssr: false }
);

export default function AnimatedBackground() {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // User agent detection (client-side only)
    const ua = navigator.userAgent;
    // Safari detection: must include Safari, but not Chrome/Chromium/Android
    const isSafariBrowser =
      /^((?!chrome|android).)*safari/i.test(ua) ||
      /\b(iPad|iPhone|iPod)\b/.test(ua);

    setIsSafari(isSafariBrowser);
  }, []);

  if (isSafari) {
    return <AnimatedBackgroundSafari />;
  }

  return <AnimatedBackgroundChrome />;
}