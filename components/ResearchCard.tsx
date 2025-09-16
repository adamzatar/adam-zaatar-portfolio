"use client";

import { Button } from "@/components/ui/Button";
import { motion, Variants } from "framer-motion";
import { FileText } from "lucide-react";

type ResearchCardProps = {
  title: string;
  description: string;
  paperUrl: string;
  delay?: number;
};

// ----------------------------
// Motion Variants
// ----------------------------
const fadeUp = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: "easeOut", delay },
  },
});

// ----------------------------
// Component
// ----------------------------
export function ResearchCard({
  title,
  description,
  paperUrl,
  delay = 0,
}: ResearchCardProps) {
  return (
    <motion.div
      variants={fadeUp(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl 
                 bg-white dark:bg-[#161b22] border border-border 
                 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)/8] via-transparent to-[var(--secondary)/8] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Title */}
        <h3
          className="text-xl sm:text-2xl font-bold mb-3 
                     bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] 
                     bg-clip-text text-transparent"
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted text-base leading-relaxed flex-1 mb-6 line-clamp-5">
          {description}
        </p>

        {/* Action */}
        <div className="flex justify-end mt-auto">
          <Button
            asChild
            variant="primary"
            size="sm"
            className="gap-2 transform group-hover:-translate-y-0.5 transition-transform duration-300"
          >
            <a href={paperUrl} target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4" />
              Read Paper
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}