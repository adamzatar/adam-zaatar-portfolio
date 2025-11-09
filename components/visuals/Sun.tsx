"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export default function Sun({
  className,
  glow = 0.75,
}: {
  className?: string;
  glow?: number;
}) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      className={clsx("w-[320px] h-[320px]", className)}
      initial={{ scale: 0.95, opacity: 0.9 }}
      animate={{
        scale: [0.95, 1, 0.95],
        opacity: [0.9, 1, 0.9],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="1" />
          <stop offset="70%" stopColor="var(--primary)" stopOpacity={glow} />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="150" r="100" fill="url(#sunGlow)" />
    </motion.svg>
  );
}