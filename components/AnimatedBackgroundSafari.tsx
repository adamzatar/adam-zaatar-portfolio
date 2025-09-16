// components/AnimatedBackgroundSafari.tsx
"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackgroundSafari() {
  const trailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Snake trail with fewer dots for Safari
    const coords = Array.from({ length: 8 }, () => ({
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
        const scale = 1 - i * 0.08;
        const opacity = 1 - i * 0.12;

        // Translate3d → GPU-friendly, avoids Safari layout thrash
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
      {/* Gradient cycle (lighter + slower for Safari) */}
      <div className="absolute inset-0 animate-gradient bg-[length:300%_300%]" />

      {/* Drifting translucent clouds */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`cloud-${i}`}
          className="cloud"
          style={{
            top: `${10 + i * 20}%`,
            animationDelay: `${i * 40}s`,
            opacity: 0.35,
          }}
        />
      ))}

      {/* Sun & Moon synced with gradient cycle */}
      <div className="sunmoon" />

      {/* Floating light particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={`particle-${i}`}
            className="absolute block w-1.5 h-1.5 rounded-full bg-white/60 blur-[1px] animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${20 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      {/* Snake trail — fewer dots, lighter blending */}
      {Array.from({ length: 8 }).map((_, i) => (
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