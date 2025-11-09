"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { HOME_DATA } from "@/app/data/home";

// -----------------------------------------------------------------------------
// Component: BuildDiagram
// Animated conceptual flow between build phases
// -----------------------------------------------------------------------------
export default function BuildDiagram() {
  const nodes = useMemo(
    () =>
      HOME_DATA.diagram.map((node, index) => ({
        ...node,
        x: 120 + index * 160,
        y: 120,
      })),
    []
  );

  const connectorPath = useMemo(() => {
    if (nodes.length < 2) return "";
    return nodes
      .slice(0, -1)
      .map((node, idx) => {
        const next = nodes[idx + 1];
        const offset = 40;
        return `M${node.x + offset} ${node.y} L${next.x - offset} ${next.y}`;
      })
      .join(" ");
  }, [nodes]);

  const startX = nodes.length ? nodes[0].x + 40 : 0;
  const endX = nodes.length ? nodes[nodes.length - 1].x - 40 : 0;
  const span = Math.max(0, endX - startX);
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 560 240"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Workflow diagram: Plan → Build → Observe → Feedback"
      className="overflow-visible"
    >
      {/* Background Gradient */}
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="var(--accent)" floodOpacity="0.25" />
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="url(#bgGlow)" rx="16" />

      {/* Connecting Lines */}
      {connectorPath ? (
        <motion.path
          d={connectorPath}
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      ) : null}

      {/* Flowing Pulse */}
      {span > 0 ? (
        <motion.circle
          cx={startX}
          cy={120}
          r="6"
          fill="var(--accent)"
          opacity={0.8}
          filter="url(#softShadow)"
          animate={{ cx: [startX, endX] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      ) : null}

      {/* Node Circles */}
      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
        >
          <circle
            cx={n.x}
            cy={n.y}
            r="34"
            fill="var(--surface)"
            stroke="var(--primary)"
            strokeWidth="2"
            filter="url(#softShadow)"
          />
          <text
            x={n.x}
            y={n.y + 5}
            textAnchor="middle"
            fontSize="16"
            fill="var(--foreground)"
            fontWeight={600}
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {n.label}
          </text>
        </motion.g>
      ))}
    </motion.svg>
  );
}
