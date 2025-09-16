"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import AppImage from "@/components/AppImage";
import { type ImageKey } from "@/lib/images";
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

// ----------------------------
// Props
// ----------------------------
export interface ProjectCardProps {
  title: string;
  description: string;
  image: ImageKey | string;
  alt: string;
  technologies: string[];
  demoLink?: string;
  codeLink?: string;
  imageComponent?: React.ReactNode;
}

// ----------------------------
// Tech style map
// ----------------------------
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

// ----------------------------
// Component
// ----------------------------
export default function ProjectCard({
  title,
  description,
  image,
  alt,
  technologies,
  demoLink,
  codeLink,
  imageComponent,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="group relative bg-white dark:bg-[#161b22] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Banner Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {imageComponent ? (
            imageComponent
          ) : (
            <AppImage
              image={image as ImageKey}
              alt={alt}
              fill
              className="object-cover"
            />
          )}
        </motion.div>
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {description}
        </p>

        {/* Tech Stack Bubbles */}
        <div className="flex flex-wrap gap-2 pt-2">
          {technologies.map((tech) => {
            const style = techStyles[tech] || {
              color: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
            };
            return (
              <span
                key={tech}
                className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full shadow-md ${style.color}`}
              >
                {style.icon && <span className="text-sm">{style.icon}</span>}
                {tech}
              </span>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-3">
          {demoLink && (
            <Button asChild variant="primary" size="sm" className="flex-1">
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
            <Button asChild variant="secondary" size="sm" className="flex-1">
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