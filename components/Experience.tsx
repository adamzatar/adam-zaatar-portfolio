"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    category: "Programming",
    skills: [
      "Java",
      "Python",
      "C",
      "Swift",
      "R",
      "Go",
      "Rust",
      "Kotlin",
      "Scala",
      "JavaScript",
      "TypeScript",
      "PHP",
      "HTML/CSS",
      "SQL",
    ],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Angular",
      "Vue",
      "Django",
      "Flask",
      "Spring Boot",
      "Laravel",
      "TailwindCSS",
      "Bootstrap",
      "Vapor",
      "Prisma",
      "shadcn/ui",
      "Framer Motion",
    ],
  },
  {
    category: "Databases & Mobile",
    skills: [
      "SwiftUI",
      "UIKit",
      "Xcode",
      "React Native",
      "Flutter",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "Firestore",
      "SQLite",
      "Redis",
    ],
  },
  {
    category: "Cloud & Machine Learning",
    skills: [
      "AWS (EC2, S3, SES)",
      "Docker",
      "Kubernetes",
      "CI/CD (GitHub Actions)",
      "scikit-learn",
      "TensorFlow",
      "PyTorch",
    ],
  },
];

export default function Skills() {
  return (
    <section className="py-20 px-6 sm:px-12 lg:px-20 bg-surface">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-text mb-12 text-center sm:text-left"
        >
          Skills
        </motion.h2>

        <div className="grid gap-12 md:grid-cols-2">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative"
            >
              <h3 className="text-2xl font-semibold text-primary mb-4">
                {cat.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-muted text-text/90 rounded-md text-sm font-medium hover:bg-primary/10 transition"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>

              {/* Gradient divider between categories */}
              {idx < skillCategories.length - 1 && (
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-border to-transparent mt-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}