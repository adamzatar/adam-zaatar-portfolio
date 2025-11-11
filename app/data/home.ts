// -----------------------------------------------------------------------------
// data/home.ts
// Static content source for the Home page.
// Centralized content ensures separation of copy and presentation layers.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface Pillar {
  title: string;
  blurb: string;
  icon?: string;
}

export interface BuildStep {
  title: string;
  description: string;
  phase: "plan" | "build" | "observe";
  icon?: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  description?: string;
  type: "input" | "process" | "output";
  connections?: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  image?: string;
}

import type { ImageKey } from "@/lib/images";

export interface Certification {
  name: string;
  provider: string;
  year: number | string;
  status: "complete" | "in-progress";
  credentialUrl?: string;
  image?: ImageKey;
}

export interface CTA {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "ghost";
  icon?: string;
}

// -----------------------------------------------------------------------------
// Pillars — Core Areas of Focus
// -----------------------------------------------------------------------------

export const PILLARS: readonly Pillar[] = [
  {
    title: "Cloud Architecture",
    blurb:
      "Engineer scalable, observable, and cost-efficient infrastructure using AWS, Azure, and Terraform. Every system starts with guardrails and IaC discipline.",
    icon: "☁️",
  },
  {
    title: "AI Platform Engineering",
    blurb:
      "Design model pipelines and serving infrastructure that prioritize versioning, reliability, and transparent feedback loops.",
    icon: "🤖",
  },
  {
    title: "Identity & Cybersecurity",
    blurb:
      "Apply zero-trust principles, passkey authentication, and privacy-first design to secure digital ecosystems by default.",
    icon: "🔐",
  },
  {
    title: "Observability & Reliability",
    blurb:
      "Integrate telemetry, metrics, and alerts early to ensure issues surface before users notice. Reliability is a feature.",
    icon: "📈",
  },
  {
    title: "FinOps & Optimization",
    blurb:
      "Deliver sustainable scale through cost modeling, governance policies, and transparent financial operations.",
    icon: "💰",
  },
  {
    title: "Developer Experience",
    blurb:
      "Ship reproducible builds, typed APIs, and CI/CD workflows that enable speed without sacrificing safety.",
    icon: "⚙️",
  },
] as const;

// -----------------------------------------------------------------------------
// How I Build — Sequential Process
// -----------------------------------------------------------------------------

export const BUILD_STEPS: readonly BuildStep[] = [
  {
    title: "Plan for Scale",
    description:
      "Map out architecture, risk models, and cost forecasts before deployment. Every project starts with clarity and intent.",
    phase: "plan",
    icon: "🧭",
  },
  {
    title: "Build Securely",
    description:
      "Use infrastructure as code, typed contracts, and automation pipelines for reproducible, auditable environments.",
    phase: "build",
    icon: "🔒",
  },
  {
    title: "Observe and Iterate",
    description:
      "Implement monitoring, alerting, and continuous improvement loops. Data drives iteration and resilience.",
    phase: "observe",
    icon: "📊",
  },
] as const;

// -----------------------------------------------------------------------------
// Build Diagram — Conceptual Representation Nodes
// -----------------------------------------------------------------------------

export const BUILD_DIAGRAM: readonly DiagramNode[] = [
  {
    id: "inputs",
    label: "Inputs",
    type: "input",
    description: "User events, metrics, and configuration sources entering the system.",
    connections: ["processing"],
  },
  {
    id: "processing",
    label: "Processing Layer",
    type: "process",
    description: "Cloud workloads, pipelines, and secure compute forming the system’s core logic.",
    connections: ["outputs"],
  },
  {
    id: "outputs",
    label: "Outputs",
    type: "output",
    description: "APIs, dashboards, and data insights powering operational decisions.",
  },
] as const;

// -----------------------------------------------------------------------------
// Featured Projects — Highlight 3
// -----------------------------------------------------------------------------

export const PROJECTS: readonly Project[] = [
  {
    slug: "bowdoin-marketplace",
    title: "Bowdoin Marketplace",
    description:
      "A secure campus marketplace built with serverless AWS architecture, Cognito auth, and Postgres-backed APIs. Research-backed to model trust, supply, and efficiency.",
    stack: ["Next.js", "Node", "PostgreSQL", "AWS Cognito", "Prisma", "OpenTelemetry"],
    cta: { label: "View Project →", href: "/projects/bowdoin-marketplace" },
    featured: true,
    image: "/images/projects/bowdoin-marketplace.png",
  },
  {
    slug: "vector-2fa",
    title: "Vector 2FA",
    description:
      "Cross-platform authentication app integrating passkeys, biometrics, and encrypted vaults. Balances privacy, security, and user experience.",
    stack: ["SwiftUI", "Vapor", "Security Frameworks", "AWS SES"],
    cta: { label: "Explore Project →", href: "/projects/vector-2fa" },
    image: "/images/projects/vector-2fa.png",
  },
  {
    slug: "cutaway",
    title: "Cutaway",
    description:
      "Lightweight iOS creator tool for multi-angle content with local-first architecture. Designed for speed, privacy, and creative autonomy.",
    stack: ["SwiftUI", "AVFoundation"],
    cta: { label: "See Demo →", href: "/projects/cutaway" },
    image: "/images/projects/cutaway.png",
  },
] as const;

// -----------------------------------------------------------------------------
// Learning — Certifications and Ongoing Education
// -----------------------------------------------------------------------------

export const CERTIFICATIONS: readonly Certification[] = [
  {
    name: "Artificial Intelligence A–Z",
    provider: "Udemy",
    year: 2025,
    status: "complete",
    credentialUrl: "/images/AIcertificate.jpg",
    image: "certificate",
  },
  {
    name: "Foundation Stock Trading",
    provider: "Udemy",
    year: 2025,
    status: "complete",
    credentialUrl: "/images/stocktradingcertificate.jpg",
    image: "stockTradingCertificate",
  },
  {
    name: "Git & GitHub Masterclass",
    provider: "Udemy",
    year: 2025,
    status: "complete",
    credentialUrl: "/images/gitcertificate.png",
    image: "gitCertificate",
  },
  {
    name: "AWS Solutions Architect – Associate",
    provider: "Amazon Web Services",
    year: "in progress",
    status: "in-progress",
  },
  {
    name: "CompTIA Security+",
    provider: "CompTIA",
    year: "in progress",
    status: "in-progress",
  },
  {
    name: "Azure Fundamentals",
    provider: "Microsoft",
    year: "in progress",
    status: "in-progress",
  },
] as const;

// -----------------------------------------------------------------------------
// Skills Universe — Visual Layer Metadata
// -----------------------------------------------------------------------------

export interface SkillNode {
  id: string;
  label: string;
  category: "cloud" | "ai" | "security" | "frontend" | "backend" | "devops" | "finance";
  strength?: number;
}

export const SKILL_UNIVERSE: readonly SkillNode[] = [
  { id: "aws", label: "AWS", category: "cloud", strength: 0.95 },
  { id: "azure", label: "Azure", category: "cloud", strength: 0.75 },
  { id: "terraform", label: "Terraform", category: "cloud", strength: 0.8 },
  { id: "pytorch", label: "PyTorch", category: "ai", strength: 0.7 },
  { id: "langchain", label: "LangChain", category: "ai", strength: 0.6 },
  { id: "security+", label: "Security+", category: "security", strength: 0.8 },
  { id: "iam", label: "IAM", category: "security", strength: 0.7 },
  { id: "nextjs", label: "Next.js", category: "frontend", strength: 0.9 },
  { id: "typescript", label: "TypeScript", category: "frontend", strength: 0.85 },
  { id: "nodejs", label: "Node.js", category: "backend", strength: 0.8 },
  { id: "postgresql", label: "PostgreSQL", category: "backend", strength: 0.75 },
  { id: "github-actions", label: "GitHub Actions", category: "devops", strength: 0.7 },
  { id: "finops", label: "FinOps", category: "finance", strength: 0.9 },
] as const;

// -----------------------------------------------------------------------------
// Final CTA — Closing Call to Action
// -----------------------------------------------------------------------------

export const FINAL_CTA: readonly CTA[] = [
  {
    label: "📄 View Resume",
    href: "/resume/AdamZaatar_CV_2025.pdf",
    variant: "primary",
  },
  {
    label: "🚀 Explore Projects",
    href: "/projects",
    variant: "outline",
  },
  {
    label: "💬 Contact Me",
    href: "/contact",
    variant: "outline",
  },
] as const;

// -----------------------------------------------------------------------------
// Unified Export — Easier Imports in Server Components
// -----------------------------------------------------------------------------

export const HOME_DATA = {
  pillars: PILLARS,
  buildSteps: BUILD_STEPS,
  diagram: BUILD_DIAGRAM,
  projects: PROJECTS,
  certifications: CERTIFICATIONS,
  finalCTA: FINAL_CTA,
  skills: SKILL_UNIVERSE,
} as const;

export type HomeData = typeof HOME_DATA;
