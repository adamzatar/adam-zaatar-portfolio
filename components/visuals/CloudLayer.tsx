"use client";

import { useMemo } from "react";

import { CloudBadge } from "@/components/visuals/CloudBadge";
import { skillClouds, type SkillCloud } from "@/components/visuals/SkillCloudMeta";

export type CloudLayerProps = {
  seed?: number;
  onBadgeClick?: (skill: SkillCloud) => void;
};

type Cloud = {
  id: string;
  top: number;
  width: number;
  height: number;
  blur: number;
  opacity: number;
  duration: number;
  delay: number;
  scale: number;
  direction: 1 | -1;
  zIndex: number;
  badge?: SkillCloud;
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LAYERS: Array<{ id: string; count: number; zIndex: number; direction: 1 | -1; speed: number }> = [
  { id: "near", count: 6, zIndex: -15, direction: 1, speed: 60 },
  { id: "mid", count: 7, zIndex: -16, direction: -1, speed: 90 },
  { id: "far", count: 6, zIndex: -17, direction: 1, speed: 120 },
];

export function CloudLayer({ seed = 42, onBadgeClick }: CloudLayerProps) {
  const clouds = useMemo(() => {
    const rng = mulberry32(seed >>> 0);
    const badges = [...skillClouds];
    let badgeIndex = 0;

    return LAYERS.flatMap((layer) =>
      Array.from({ length: layer.count }, (_, idx) => {
        const width = 220 + rng() * 220;
        const height = 120 + rng() * 100;
        const top = -15 + rng() * 70;
        const blur = 10 + rng() * 10;
        const opacity = 0.22 + rng() * 0.28;
        const delay = rng() * 20;
        const duration = layer.speed + rng() * 35;
        const scale = 0.75 + rng() * 0.45;
        const badge = badgeIndex < badges.length && idx === 0 ? badges[badgeIndex++] : undefined;

        return {
          id: `${layer.id}-${idx}`,
          top,
          width,
          height,
          blur,
          opacity,
          delay,
          duration,
          scale,
          direction: layer.direction,
          zIndex: layer.zIndex,
          badge,
        } satisfies Cloud;
      })
    );
  }, [seed]);

  return (
    <div className="absolute inset-0 pointer-events-auto" aria-hidden>
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute pointer-events-none"
          style={{
              top: `${cloud.top}%`,
              left: cloud.direction > 0 ? "-30%" : "130%",
              width: `${cloud.width}px`,
              height: `${cloud.height}px`,
              opacity: cloud.opacity,
              borderRadius: "9999px",
              background:
                "radial-gradient(60% 60% at 45% 40%, rgba(255,255,255,0.55), rgba(255,255,255,0.15) 70%, transparent)",
              filter: `blur(${cloud.blur}px)`,
              transform: `scale(${cloud.scale})`,
              animation: `${cloud.direction > 0 ? "cloud-drift" : "cloud-drift-reverse"} ${cloud.duration}s linear infinite ${cloud.delay}s, cloud-bob ${cloud.duration * 0.6}s ease-in-out infinite ${cloud.delay / 2}s`,
              willChange: "transform, opacity, filter",
              zIndex: cloud.zIndex,
            }}
        >
          {cloud.badge ? (
            <div className="pointer-events-auto">
              <CloudBadge
                label={cloud.badge.label}
                tagline={cloud.badge.tagline}
                onClick={() => onBadgeClick?.(cloud.badge!)}
              />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
