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
      {/* === Animated Gradient Backdrop === */}
      <div className="absolute inset-0 animate-gradient bg-[length:400%_400%]" />

      {/* === Layered Clouds (Parallax Drift + Tint) === */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="cloud-far"
          style={{ top: "8%", left: "-20%", animationDelay: "0s" }}
        />
        <div
          className="cloud-mid"
          style={{ top: "22%", left: "-30%", animationDelay: "20s" }}
        />
        <div
          className="cloud-near"
          style={{ top: "38%", left: "-25%", animationDelay: "40s" }}
        />
      </div>

      {/* === Sun & Moon (Synced with Gradient) === */}
      <div className="sunmoon" />

      {/* === Floating Particles (Aurora shimmer) === */}
      <div className="absolute inset-0">
        {Array.from({ length: 45 }).map((_, i) => (
          <span
            key={`particle-${i}`}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${18 + Math.random() * 25}s`,
              filter: "hue-rotate(20deg)", // subtle aurora tint
            }}
          />
        ))}
      </div>

      {/* === Snake Trail (Glowing comet effect) === */}
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