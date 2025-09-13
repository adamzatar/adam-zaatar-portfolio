"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  SiSwift,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiFirebase,
  SiDocker,
  SiAmazon,
  SiRedis,
  SiNodedotjs,
  SiStripe,
  SiVercel,
  SiXcode,
  SiTypescript,
  SiJavascript,
  SiExpress,
} from "react-icons/si";
import { ReactElement } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  technologies: string[];
  demoLink?: string;
  codeLink?: string;
}

const techStyles: Record<string, { color: string; icon?: ReactElement }> = {
  Swift: { color: "bg-orange-500 text-white", icon: <SiSwift /> },
  SwiftUI: { color: "bg-pink-500 text-white", icon: <SiSwift /> },
  UIKit: { color: "bg-purple-500 text-white" },
  Xcode: { color: "bg-blue-600 text-white", icon: <SiXcode /> },
  Firebase: { color: "bg-yellow-500 text-black", icon: <SiFirebase /> },

  TypeScript: { color: "bg-blue-500 text-white", icon: <SiTypescript /> },
  JavaScript: { color: "bg-yellow-400 text-black", icon: <SiJavascript /> },
  "Next.js": { color: "bg-black text-white", icon: <SiNextdotjs /> },
  React: { color: "bg-cyan-500 text-white", icon: <SiReact /> },
  Node: { color: "bg-green-600 text-white", icon: <SiNodedotjs /> },
  "Node.js": { color: "bg-green-600 text-white", icon: <SiNodedotjs /> },
  Express: { color: "bg-gray-800 text-white", icon: <SiExpress /> },
  Vercel: { color: "bg-black text-white", icon: <SiVercel /> },

  PostgreSQL: { color: "bg-sky-800 text-white", icon: <SiPostgresql /> },
  Prisma: { color: "bg-indigo-500 text-white", icon: <SiPrisma /> },
  MongoDB: { color: "bg-green-700 text-white", icon: <SiMongodb /> },
  Redis: { color: "bg-red-600 text-white", icon: <SiRedis /> },

  TailwindCSS: { color: "bg-teal-400 text-white", icon: <SiTailwindcss /> },
  Stripe: { color: "bg-indigo-700 text-white", icon: <SiStripe /> },
  AWS: { color: "bg-orange-600 text-white", icon: <SiAmazon /> },
  Docker: { color: "bg-blue-700 text-white", icon: <SiDocker /> },
};

export default function ProjectCard({
  title,
  description,
  image,
  alt,
  technologies,
  demoLink,
  codeLink,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="group relative bg-surface rounded-xl overflow-hidden shadow-md border border-border hover:shadow-xl transition-shadow"
    >
      {/* Banner Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-text">{title}</h3>
        <p className="text-muted text-sm leading-relaxed">{description}</p>

        {/* Tech Stack Bubbles */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="flex flex-wrap gap-2"
        >
          {technologies.map((tech) => {
            const style = techStyles[tech] || { color: "bg-muted text-text" };
            return (
              <motion.span
                key={tech}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-border shadow-sm ${style.color}`}
              >
                {style.icon && <span className="text-sm">{style.icon}</span>}
                {tech}
              </motion.span>
            );
          })}
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-2">
          {demoLink && (
            <Button asChild variant="primary" size="md" className="flex-1">
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${title}`}
              >
                Live Demo
              </a>
            </Button>
          )}
          {codeLink && (
            <Button asChild variant="outline" size="md" className="flex-1">
              <a
                href={codeLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code of ${title}`}
              >
                Source Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}