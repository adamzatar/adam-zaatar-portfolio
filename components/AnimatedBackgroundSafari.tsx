// components/AnimatedBackgroundSafari.tsx
"use client";

import { useEffect, useRef } from "react";
import { useDayCycle } from "@/hooks/useDayCycle";

export default function AnimatedBackgroundSafari() {
  const trailRef = useRef<HTMLDivElement[]>([]);
  const { gradient, sunMoon, progress } = useDayCycle(); // 🎶 synced cycle

  useEffect(() => {
    // Safari: fewer dots for better FPS
    const coords = Array.from({ length: 6 }, () => ({
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
        const scale = 1 - i * 0.12;
        const opacity = 1 - i * 0.18;

        el.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) scale(${scale})`;
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
      {/* === Synced Gradient Backdrop === */}
      <div
        className="absolute inset-0 transition-colors duration-[2500ms]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${gradient[0]}, ${gradient[1]})`,
        }}
      />

      {/* === Clouds (lighter, Safari-friendly) === */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="cloud-far"
          style={{
            top: "12%",
            left: "-30%",
            animationDelay: "0s",
            opacity: 0.25,
          }}
        />
        <div
          className="cloud-mid"
          style={{
            top: "32%",
            left: "-35%",
            animationDelay: "35s",
            opacity: 0.3,
          }}
        />
        <div
          className="cloud-near"
          style={{
            top: "55%",
            left: "-40%",
            animationDelay: "70s",
            opacity: 0.35,
          }}
        />
      </div>

      {/* === Sun & Moon (synced orbit) === */}
      <div
        className="sunmoon"
        style={{
          left: `${sunMoon.x * 100}%`,
          top: `${sunMoon.y * 100}%`,
          background: sunMoon.color,
        }}
      />

      {/* === Starfield (night mode only) === */}
      <div
        className={`starfield ${progress > 0.75 ? "active" : ""}`}
        aria-hidden="true"
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="star"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              transform: `translateZ(${Math.random() * 2}px)`,
            }}
          />
        ))}
      </div>

      {/* === Floating Particles (aurora shimmer) === */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={`particle-${i}`}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${28 + Math.random() * 18}s`,
              filter: `hue-rotate(${progress * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* === Snake Trail (lighter) === */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => {
            if (el) trailRef.current[i] = el;
          }}
          className="trail-dot-safari"
        />
      ))}
    </div>
  );
}