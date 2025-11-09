"use client";

import { useEffect, useMemo, useState } from "react";

import { useTimeOfDay } from "@/hooks/useTimeOfDay";
import Sun from "@/components/visuals/Sun";
import { CloudLayer } from "@/components/visuals/CloudLayer";
import { RainLayer } from "@/components/visuals/RainLayer";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export default function GlobalVisuals() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const phase = useTimeOfDay(3);

  const effectsOn = process.env.NEXT_PUBLIC_EFFECTS_ENABLED === "1";
  const rainOn = process.env.NEXT_PUBLIC_RAIN_ENABLED === "1";
  const seed = Number(process.env.NEXT_PUBLIC_RAIN_SEED ?? 42) >>> 0;

  const angle = phase * Math.PI * 2;
  const sunOffsetX = Math.cos(angle) * 42;
  const sunOffsetY = Math.sin(angle) * 22;
  const hue = (phase * 360 + 360) % 360;
  const light = clamp01(0.55 + 0.45 * Math.cos(angle - Math.PI / 2));

  const skyPalette = useMemo(() => {
    const top = `hsl(${(hue + 240) % 360} 65% ${38 + light * 12}%)`;
    const mid = `hsl(${(hue + 180) % 360} 72% ${52 + light * 18}%)`;
    const bottom = `hsl(${(hue + 40) % 360} 78% ${68 + light * 20}%)`;
    return { top, mid, bottom };
  }, [hue, light]);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.style.setProperty("--sky-top", skyPalette.top);
    root.style.setProperty("--sky-mid", skyPalette.mid);
    root.style.setProperty("--sky-bottom", skyPalette.bottom);
    root.style.setProperty("--sun-y", `${15 + 10 * Math.sin(angle)}%`);
    root.style.setProperty("--light-intensity", light.toFixed(3));
  }, [angle, light, mounted, skyPalette]);

  if (!mounted) return null;

  const showEffects = effectsOn;

  return (
    <div className="effects-layer pointer-events-none">
      <div
        className="sun-orbit"
        style={{ transform: `translate(${sunOffsetX}vw, ${sunOffsetY}vh)` }}
      >
        <Sun className="-translate-x-1/2 -translate-y-1/2" glow={0.65 + light * 0.4} />
      </div>

      {showEffects ? <CloudLayer seed={seed} /> : null}

      {showEffects && rainOn ? (
        <RainLayer
          seed={(seed ^ 0x9e3779b9) >>> 0}
          intensity={140}
          burst={null}
        />
      ) : null}
    </div>
  );
}
