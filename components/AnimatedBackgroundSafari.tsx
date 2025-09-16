// components/AnimatedBackgroundSafari.tsx
"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackgroundSafari() {
  const trailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Safari: fewer dots, lighter trail
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
        const scale = 1 - i * 0.1;
        const opacity = 1 - i * 0.15;

        // GPU-friendly, avoids Safari layout thrash
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
      {/* === Animated Gradient Backdrop (softer + slower for Safari) === */}
      <div className="absolute inset-0 animate-gradient bg-[length:300%_300%]" />

      {/* === Layered Clouds (lighter opacity, less movement for FPS) === */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="cloud-far"
          style={{ top: "8%", left: "-20%", animationDelay: "0s", opacity: 0.25 }}
        />
        <div
          className="cloud-mid"
          style={{ top: "26%", left: "-30%", animationDelay: "25s", opacity: 0.3 }}
        />
        <div
          className="cloud-near"
          style={{ top: "42%", left: "-25%", animationDelay: "50s", opacity: 0.35 }}
        />
      </div>

      {/* === Sun & Moon (synced with gradient cycle) === */}
      <div className="sunmoon" />

      {/* === Floating Particles (lighter count, subtle shimmer) === */}
      <div className="absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={`particle-${i}`}
            className="absolute block w-1.5 h-1.5 rounded-full bg-white/60 blur-[1px] animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 18}s`,
              animationDuration: `${22 + Math.random() * 20}s`,
              filter: "hue-rotate(15deg)", // subtle aurora tint
            }}
          />
        ))}
      </div>

      {/* === Snake Trail (reduced dots, smooth fade) === */}
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