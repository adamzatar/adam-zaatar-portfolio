"use client";

import { useEffect, useRef } from "react";
import { useDayCycle } from "@/hooks/useDayCycle";

export default function AnimatedBackgroundSafari() {
  const trailRef = useRef<HTMLDivElement[]>([]);
  const { gradient, sunMoon, progress } = useDayCycle();

  useEffect(() => {
    // Safari: fewer dots for smooth FPS
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
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div className="absolute inset-0 -z-50 overflow-hidden">
      {/* === Gradient Backdrop === */}
      <div
        className="absolute inset-0 -z-50 transition-colors duration-[2500ms]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${gradient[0]}, ${gradient[1]})`,
        }}
      />

      {/* === Clouds (slower & visible) === */}
      <div className="absolute inset-0 -z-40 pointer-events-none">
        <div className="cloud-far" style={{ top: "15%", left: "-25%", animationDelay: "0s", opacity: 0.45 }} />
        <div className="cloud-mid" style={{ top: "35%", left: "-35%", animationDelay: "60s", opacity: 0.5 }} />
        <div className="cloud-near" style={{ top: "60%", left: "-40%", animationDelay: "120s", opacity: 0.55 }} />
      </div>

      {/* === Sun & Moon === */}
      <div
        className="sunmoon absolute -z-30"
        style={{
          left: `${sunMoon.x * 100}%`,
          top: `${sunMoon.y * 100}%`,
          background: sunMoon.color,
        }}
      />

      {/* === Starfield (night only, fewer stars) === */}
      <div
        className={`starfield absolute inset-0 -z-20 ${progress > 0.75 ? "active" : ""}`}
        aria-hidden="true"
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="star"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* === Aurora Particles (snail drift) === */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={`particle-${i}`}
            className="particle"
            style={
              {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                "--duration": `${60 + Math.random() * 40}s`, // 🐌 snail speed
                "--delay": `${Math.random() * 30}s`,
                filter: `hue-rotate(${progress * 360}deg)`,
              } as React.CSSProperties & { "--duration"?: string; "--delay"?: string }
            }
          />
        ))}
      </div>

      {/* === Cursor Comet Trail === */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
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
    </div>
  );
}