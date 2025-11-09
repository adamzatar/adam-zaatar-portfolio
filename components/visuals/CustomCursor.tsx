"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function useClientCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq) {
      setEnabled(!mq.matches);
      const handler = (event: MediaQueryListEvent) => setEnabled(!event.matches);
      mq.addEventListener?.("change", handler);
      return () => mq.removeEventListener?.("change", handler);
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const handleMove = (event: MouseEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        x.set(event.clientX);
        y.set(event.clientY);
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [enabled, x, y]);

  return { x, y, enabled };
}

export default function CustomCursor() {
  const { x, y, enabled } = useClientCursor();
  const cursorEnabled = process.env.NEXT_PUBLIC_CURSOR_ENABLED !== "0";

  const configs = useMemo(() => (
    [
      { stiffness: 320, damping: 22, mass: 0.55 },
      { stiffness: 260, damping: 26, mass: 0.65 },
      { stiffness: 215, damping: 30, mass: 0.8 },
      { stiffness: 185, damping: 34, mass: 0.95 },
      { stiffness: 160, damping: 38, mass: 1.1 },
      { stiffness: 140, damping: 42, mass: 1.25 },
    ] as const
  ), []);

  const trail0X = useSpring(x, configs[0]);
  const trail0Y = useSpring(y, configs[0]);
  const trail1X = useSpring(trail0X, configs[1]);
  const trail1Y = useSpring(trail0Y, configs[1]);
  const trail2X = useSpring(trail1X, configs[2]);
  const trail2Y = useSpring(trail1Y, configs[2]);
  const trail3X = useSpring(trail2X, configs[3]);
  const trail3Y = useSpring(trail2Y, configs[3]);
  const trail4X = useSpring(trail3X, configs[4]);
  const trail4Y = useSpring(trail3Y, configs[4]);
  const trail5X = useSpring(trail4X, configs[5]);
  const trail5Y = useSpring(trail4Y, configs[5]);

  const trailX = [trail0X, trail1X, trail2X, trail3X, trail4X, trail5X];
  const trailY = [trail0Y, trail1Y, trail2Y, trail3Y, trail4Y, trail5Y];

  if (!cursorEnabled || !enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-9999" aria-hidden>
      <motion.div
        className="cursor-dot"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {trailX.map((trail, index) => (
        <motion.div
          key={`trail-${index}`}
          className="cursor-trail-dot"
          style={{
            x: trail,
            y: trailY[index],
            translateX: "-50%",
            translateY: "-50%",
            opacity: 0.55 - index * 0.08,
            filter: `hue-rotate(${index * 15}deg)`
          }}
          animate={{
            scale: [1 - index * 0.1, 1 - index * 0.1 + 0.04, 1 - index * 0.1],
          }}
          transition={{ repeat: Infinity, duration: 1.4 + index * 0.25, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        className="cursor-ring"
        style={{
          x: trailX[2],
          y: trailY[2],
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      />
    </div>
  );
}
