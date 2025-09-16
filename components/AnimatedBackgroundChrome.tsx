"use client";

import { useEffect, useRef } from "react";
import { useDayCycle } from "@/hooks/useDayCycle";

export default function AnimatedBackgroundChrome() {
  const trailRef = useRef<HTMLDivElement[]>([]);
  const { gradient, sunMoon, progress } = useDayCycle();

  useEffect(() => {
    // Chrome comet trail
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

    return () => window.removeEventListener("mousemove", handleMouse);
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

      {/* === Painterly Clouds === */}
      <div className="absolute inset-0 -z-40 pointer-events-none overflow-hidden">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={`cloud-${idx}`}
            className="absolute cloud-group"
            style={{
              top: `${20 + idx * 15}%`,
              left: `${-40 - idx * 20}%`,
              animation: `drift ${180 + idx * 60}s linear infinite`,
              opacity: 0.5 + idx * 0.1,
            }}
          >
            {/* Layered blobs per cloud */}
            {Array.from({ length: 5 }).map((__, j) => (
              <div
                key={`blob-${idx}-${j}`}
                className="absolute rounded-full bg-white/60 dark:bg-white/20 blur-3xl"
                style={{
                  width: `${120 + Math.random() * 80}px`,
                  height: `${60 + Math.random() * 40}px`,
                  left: `${j * 40}px`,
                  top: `${Math.sin(j) * 15}px`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* === Sun & Moon Orbit === */}
      <div
        className="sunmoon absolute -z-30 rounded-full w-12 h-12 shadow-lg"
        style={{
          left: `${sunMoon.x * 100}%`,
          top: `${sunMoon.y * 100}%`,
          background: sunMoon.color,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* === Starfield === */}
      <div
        className={`starfield absolute inset-0 -z-20 ${
          progress > 0.75 ? "active" : ""
        }`}
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
              animationDelay: `${Math.random() * 8}s`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* === Aurora Particles (super slow, glowing at night) === */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/40 dark:bg-white/60"
            style={{
              width: `${4 + Math.random() * 4}px`,
              height: `${4 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${90 + Math.random() * 40}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 50}s`,
              boxShadow:
                progress > 0.7
                  ? `0 0 6px 2px rgba(255,255,255,0.6)`
                  : "none",
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

      {/* === Animations === */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-40px) translateX(20px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }

        @keyframes drift {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(160vw);
          }
        }

        .trail-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: screen;
        }
      `}</style>
    </div>
  );
}