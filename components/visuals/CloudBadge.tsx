// components/visuals/CloudBadge.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export type CloudBadgeProps = {
  label: string;
  icon?: string; // e.g. ☁️, 🤖, ⚙️
  tagline?: string;
  color?: string; // e.g. Tailwind gradient or solid CSS string
  glow?: boolean; // enable extra glow
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * CloudBadge
 * - Small floating glowing badge with icon + label.
 * - Used across CloudLayer, RainLayer, and any overlay interactions.
 */
export const CloudBadge: React.FC<CloudBadgeProps> = ({
  label,
  icon,
  tagline,
  color = "from-sky-400/40 to-blue-600/40",
  glow = true,
  onClick,
  size = "md",
  className = "",
}) => {
  const sizeClasses =
    size === "sm"
      ? "text-[0.65rem] px-2 py-0.5"
      : size === "lg"
      ? "text-sm px-3 py-1.5"
      : "text-xs px-2.5 py-1";

  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        scale: 1.08,
        y: -3,
        boxShadow: glow
          ? "0 0 15px rgba(255,255,255,0.45), 0 0 25px rgba(255,255,255,0.25)"
          : "0 0 8px rgba(255,255,255,0.25)",
      }}
      whileTap={{ scale: 0.96 }}
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 5.5 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`relative inline-flex items-center gap-1 select-none cursor-pointer
        rounded-full border border-white/20 backdrop-blur-md
        bg-gradient-to-r ${color}
        text-white/90 font-medium shadow-[0_1px_6px_rgba(0,0,0,0.25)]
        transition-all duration-300 pointer-events-auto
        ${sizeClasses} ${className}`}
      title={tagline}
      aria-label={tagline ? `${label} — ${tagline}` : label}
    >
      {icon && (
        <span
          className="text-[0.9em] leading-none"
          style={{
            textShadow: glow ? "0 0 4px rgba(255,255,255,0.6)" : undefined,
          }}
        >
          {icon}
        </span>
      )}
      <span
        className="leading-none"
        style={{
          textShadow: glow
            ? "0 0 6px rgba(255,255,255,0.45)"
            : "0 0 2px rgba(255,255,255,0.2)",
        }}
      >
        {label}
      </span>

      {/* Glow ring */}
      {glow && (
        <motion.span
          className="absolute inset-0 rounded-full bg-white/5 blur-md -z-10"
          animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.06, 1] }}
          transition={{ duration: 4.2 + Math.random() * 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};