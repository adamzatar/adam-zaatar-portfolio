// components/AnimatedBackground.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // 🎨 Base particle colors
    const colors = [
      { h: 48, s: 95, l: 55 },  // golden yellow
      { h: 16, s: 90, l: 55 },  // orange
      { h: 330, s: 75, l: 65 }, // pink
    ];

    // ✨ Background particles
    const particles = Array.from({ length: 120 }, () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.4,
        color,
      };
    });

    // 🐍 Snake follower trail
    const snakeLength = 20;
    const snake = Array.from({ length: snakeLength }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
    }));

    let hueShift = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Background particles ---
      particles.forEach((p) => {
        // Attraction toward mouse
        const dx = mouse.x * canvas.width - p.x;
        const dy = mouse.y * canvas.height - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx += dx * 0.00005;
          p.vy += dy * 0.00005;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.color.h}, ${p.color.s}%, ${p.color.l}%, ${p.alpha})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(${p.color.h}, ${p.color.s}%, ${p.color.l + 10}%, 0.9)`;
        ctx.fill();
      });

      // --- Snake follower ---
      // Add new head position
      const targetX = mouse.x * canvas.width;
      const targetY = mouse.y * canvas.height;

      // Smooth follow for head
      const head = snake[0];
      head.x += (targetX - head.x) * 0.2;
      head.y += (targetY - head.y) * 0.2;

      // Follow for other segments
      for (let i = 1; i < snake.length; i++) {
        const prev = snake[i - 1];
        const seg = snake[i];
        seg.x += (prev.x - seg.x) * 0.3;
        seg.y += (prev.y - seg.y) * 0.3;
      }

      hueShift += 1; // cycle colors

      // Draw snake
      snake.forEach((seg, i) => {
        const alpha = 1 - i / snake.length;
        ctx.beginPath();
        ctx.arc(seg.x, seg.y, 10 - i * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${(hueShift + i * 10) % 360}, 80%, 60%, ${alpha})`;
        ctx.shadowBlur = 25;
        ctx.shadowColor = `hsla(${(hueShift + i * 10) % 360}, 100%, 70%, ${alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", () => {});
    };
  }, [mouse]);

  return (
    <motion.div
      className="absolute inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Smooth gradient shift backdrop */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(250,204,21,0.15), rgba(249,115,22,0.05))",
            "radial-gradient(circle at 50% 50%, rgba(236,72,153,0.15), rgba(250,204,21,0.05))",
            "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.15), rgba(236,72,153,0.05))",
          ],
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear",
        }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
}