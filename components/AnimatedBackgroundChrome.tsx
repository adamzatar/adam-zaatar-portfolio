"use client";

import { useEffect, useRef } from "react";
import { useDayCycle } from "@/hooks/useDayCycle";

export default function AnimatedBackgroundChrome() {
  const trailRef = useRef<HTMLDivElement[]>([]);
  const { gradient, sunMoon, progress } = useDayCycle();

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
      {/* === Dynamic Gradient Backdrop === */}
      <div
        className="absolute inset-0 -z-50 transition-colors duration-[2000ms]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${gradient[0]}, ${gradient[1]})`,
        }}
      />

      {/* === Parallax Clouds (now visible & slower) === */}
      <div className="absolute inset-0 -z-40 pointer-events-none">
        <div
          className="cloud-far"
          style={{ top: "12%", left: "-30%", animationDelay: "0s", opacity: 0.5 }}
        />
        <div
          className="cloud-mid"
          style={{ top: "32%", left: "-35%", animationDelay: "45s", opacity: 0.55 }}
        />
        <div
          className="cloud-near"
          style={{ top: "55%", left: "-20%", animationDelay: "90s", opacity: 0.6 }}
        />
        <div
          className="cloud-near"
          style={{ top: "72%", left: "-40%", animationDelay: "120s", opacity: 0.65 }}
        />
      </div>

      {/* === Sun & Moon Orbit === */}
      <div
        className="sunmoon absolute -z-30"
        style={{
          left: `${sunMoon.x * 100}%`,
          top: `${sunMoon.y * 100}%`,
          background: sunMoon.color,
        }}
      />

      {/* === Starfield === */}
      <div
        className={`starfield absolute inset-0 -z-20 ${
          progress > 0.75 ? "active" : ""
        }`}
        aria-hidden="true"
      >
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="star"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              transform: `translateZ(${Math.random() * 3}px)`,
            }}
          />
        ))}
      </div>

      {/* === Aurora Particles (super slow & elegant) === */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={`particle-${i}`}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              // 🚀 snail speed (60–90s)
              animationDuration: `${60 + Math.random() * 30}s`,
              animationDelay: `${Math.random() * 40}s`,
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