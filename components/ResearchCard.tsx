"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, Variants } from "framer-motion";
import { FileText } from "lucide-react";

type ResearchCardProps = {
  title: string;
  description: string;
  paperUrl: string;
  delay?: number;
};

const fadeUp = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  },
});

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
      viewport={{ once: true, amount: 0.3 }}
    >
      <Card className="group p-8 rounded-2xl border border-border/50 bg-surface/90 
                       backdrop-blur-md shadow-subtle hover:shadow-card-hover 
                       transition-all duration-500 hover:-translate-y-2">
        {/* Title */}
        <h3
          className="text-xl sm:text-2xl font-bold text-text mb-3 
                     bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] 
                     bg-clip-text text-transparent"
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted text-base leading-relaxed mb-6 line-clamp-5">
          {description}
        </p>

        {/* Action */}
        <div className="flex justify-end">
          <Button asChild variant="primary" size="lg" className="gap-2">
            <a href={paperUrl} target="_blank" rel="noopener noreferrer">
              <FileText className="w-5 h-5" />
              Read Paper
            </a>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}