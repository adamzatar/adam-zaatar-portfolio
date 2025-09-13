// lib/showcase.ts

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demo?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    slug: "bowdoin-marketplace",
    title: "Bowdoin Marketplace",
    description:
      "A campus-wide platform for Bowdoin students to buy, sell, and trade items. Built with Next.js, PostgreSQL, and Prisma, featuring authentication and modern UI.",
    image: "/images/projects/bowdoin-marketplace.png",
    tags: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS"],
    demo: "https://bowdoin-marketplace.vercel.app",
    github: "https://github.com/adamzatar/bowdoin-marketplace",
  },
  {
    slug: "palprep",
    title: "PalPrep",
    description:
      "An iOS app helping students practice SAT and ACT problems with adaptive difficulty. Includes analytics dashboard and streak-based gamification.",
    image: "/images/projects/palprep.png",
    tags: ["Swift", "iOS", "Core Data", "Charts"],
    demo: "https://palprep.app",
    github: "https://github.com/adamzatar/palprep",
  },
  {
    slug: "cutaway",
    title: "Cutaway",
    description:
      "A web app that allows users to explore layered architectural cutaways. Includes smooth animations, zoom/pan interactions, and structured content management.",
    image: "/images/projects/cutaway.png",
    tags: ["React", "Three.js", "TypeScript"],
    demo: "https://cutaway.vercel.app",
    github: "https://github.com/adamzatar/cutaway",
  },
];