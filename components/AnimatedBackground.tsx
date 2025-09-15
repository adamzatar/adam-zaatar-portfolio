// components/AnimatedBackground.tsx
"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const trailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Initialize trail coordinates in center of screen
    const coords = Array.from({ length: 12 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));

    const handleMouse = (e: MouseEvent) => {
      coords.unshift({ x: e.clientX, y: e.clientY });
      coords.pop();
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });

    function animate() {
      const els = trailRef.current;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;
        const point = coords[i];
        const scale = 1 - i * 0.07;
        const opacity = 1 - i * 0.08;

        el.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) scale(${scale})`;
        el.style.opacity = `${opacity}`;
      }
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Smooth shifting gradient backdrop */}
      <div className="absolute inset-0 animate-gradient bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.15),rgba(249,115,22,0.05))]" />

      {/* Floating glowing particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 30}s`,
            }}
          />
        ))}
      </div>

      {/* Snake trail following mouse */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRef.current[i] = el;
          }}
          className="trail-dot"
        />
      ))}
    </div>
  );
}