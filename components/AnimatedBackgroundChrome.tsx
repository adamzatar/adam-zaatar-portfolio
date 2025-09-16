// components/AnimatedBackgroundChrome.tsx
"use client";

import { useEffect, useRef } from "react";
import { useDayCycle } from "@/hooks/useDayCycle";

export default function AnimatedBackgroundChrome() {
  const trailRef = useRef<HTMLDivElement[]>([]);
  const { gradient, sunMoon, progress } = useDayCycle(); // 🌗 synced animation state

  useEffect(() => {
    // Chrome can handle more trail dots
    const coords = Array.from({ length: 16 }, () => ({
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
        const scale = 1 - i * 0.055;
        const opacity = 1 - i * 0.065;

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
    <div className="absolute inset-0 -z-50 overflow-hidden">
      {/* === Dynamic Gradient Backdrop (synced to cycle) === */}
      <div
        className="absolute inset-0 -z-50 transition-colors duration-[2000ms]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${gradient[0]}, ${gradient[1]})`,
        }}
      />

      {/* === Parallax Clouds === */}
      <div className="absolute inset-0 -z-40 pointer-events-none">
        <div
          className="cloud-far"
          style={{ top: "10%", left: "-25%", animationDelay: "0s", opacity: 0.4 }}
        />
        <div
          className="cloud-mid"
          style={{ top: "28%", left: "-35%", animationDelay: "30s", opacity: 0.5 }}
        />
        <div
          className="cloud-near"
          style={{ top: "50%", left: "-20%", animationDelay: "60s", opacity: 0.55 }}
        />
        <div
          className="cloud-near"
          style={{ top: "70%", left: "-40%", animationDelay: "90s", opacity: 0.6 }}
        />
      </div>

      {/* === Sun & Moon Orbit (synced) === */}
      <div
        className="sunmoon absolute -z-30"
        style={{
          left: `${sunMoon.x * 100}%`,
          top: `${sunMoon.y * 100}%`,
          background: sunMoon.color,
        }}
      />

      {/* === Starfield (night mode) === */}
      <div
        className={`starfield absolute inset-0 -z-20 ${
          progress > 0.75 ? "active" : ""
        }`}
        aria-hidden="true"
      >
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="star"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              transform: `translateZ(${Math.random() * 3}px)`,
            }}
          />
        ))}
      </div>

      {/* === Aurora Particles === */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <span
            key={`particle-${i}`}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${18 + Math.random() * 25}s`,
              filter: `hue-rotate(${progress * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* === Cursor Comet Trail === */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={`trail-${i}`}
            ref={(el) => {
              if (el) trailRef.current[i] = el;
            }}
            className="trail-dot"
          />
        ))}
      </div>
    </div>
  );
}