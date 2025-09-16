// components/AnimatedBackgroundChrome.tsx
"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackgroundChrome() {
  const trailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Chrome can handle more dots smoothly
    const coords = Array.from({ length: 14 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));

    const handleMouse = (e: MouseEvent) => {
      coords.unshift({ x: e.clientX, y: e.clientY });
      coords.pop();
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });

    function animate() {
      trailRef.current.forEach((el, i) => {
        if (!el) return;
        const point = coords[i];
        const scale = 1 - i * 0.06;
        const opacity = 1 - i * 0.07;

        // GPU-friendly transform
        el.style.transform = `translate3d(${point.x}px,${point.y}px,0) scale(${scale})`;
        el.style.opacity = `${opacity}`;
      });
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated multi-phase gradient backdrop */}
      <div className="absolute inset-0 animate-gradient bg-[length:400%_400%]" />

      {/* Drifting layered clouds */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`cloud-${i}`}
          className="cloud"
          style={{
            top: `${5 + i * 20}%`,
            animationDelay: `${i * 25}s`,
            opacity: 0.45 - i * 0.1,
          }}
        />
      ))}

      {/* Sun & Moon synced with gradient */}
      <div className="sunmoon" />

      {/* Floating glowing particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 45 }).map((_, i) => (
          <span
            key={`particle-${i}`}
            className="absolute block w-1.5 h-1.5 rounded-full bg-white/80 blur-[2px] animate-shimmer"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${18 + Math.random() * 25}s`,
            }}
          />
        ))}
      </div>

      {/* Snake trail with glowing comet effect */}
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => {
            if (el) trailRef.current[i] = el;
          }}
          className="trail-dot"
        />
      ))}
    </div>
  );
}