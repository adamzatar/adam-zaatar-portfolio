// components/visuals/SkillCloudMeta.ts

/**
 * SkillCloud metadata — powers the CloudLayer, RainLayer, and interactive badges.
 * Each entry defines how a skill appears in the 3D/cloud visualization layer.
 */

export type SkillCategory = "cloud" | "ai" | "security" | "tooling";

export type SkillCloud = {
  id: string; // stable identifier
  label: string; // short name shown on badge/cloud
  tagline: string; // tooltip or alt text
  confidence: number; // 0–1 scale for weighting (rain intensity, placement)
  category: SkillCategory; // primary grouping
  icon: string; // emoji/symbol for visual identity
  color: string; // Tailwind or CSS color string
  zone?: "near" | "mid" | "far"; // controls depth/scale layering
};

/**
 * Structured skill metadata.
 * Grouped for clarity, but exported as a single flat array for easy mapping.
 */
export const skillClouds: SkillCloud[] = [
  /* 🌩️ CLOUD */
  {
    id: "aws",
    label: "AWS",
    tagline: "Scalable infrastructure with EC2, Lambda, and S3",
    confidence: 0.95,
    category: "cloud",
    icon: "☁️",
    color: "from-yellow-400 to-orange-500",
    zone: "near",
  },
  {
    id: "azure",
    label: "Azure",
    tagline: "Microsoft Azure Cloud Fundamentals certification (in progress)",
    confidence: 0.7,
    category: "cloud",
    icon: "☁️",
    color: "from-sky-400 to-blue-600",
    zone: "mid",
  },
  {
    id: "finops",
    label: "FinOps",
    tagline: "Optimizing cloud spend & architecture efficiency",
    confidence: 0.85,
    category: "cloud",
    icon: "💰",
    color: "from-lime-400 to-emerald-600",
    zone: "far",
  },

  /* 🤖 AI & DATA */
  {
    id: "pytorch",
    label: "PyTorch",
    tagline: "Deep learning and experimentation workflows",
    confidence: 0.8,
    category: "ai",
    icon: "🤖",
    color: "from-orange-500 to-red-600",
    zone: "mid",
  },
  {
    id: "langchain",
    label: "LangChain",
    tagline: "Building contextual AI systems with LLM orchestration",
    confidence: 0.75,
    category: "ai",
    icon: "💬",
    color: "from-indigo-400 to-violet-600",
    zone: "far",
  },
  {
    id: "ai",
    label: "AI",
    tagline: "Applied AI & machine learning in system design",
    confidence: 0.82,
    category: "ai",
    icon: "🧠",
    color: "from-fuchsia-400 to-pink-600",
    zone: "mid",
  },

  /* 🔐 SECURITY */
  {
    id: "zero_trust",
    label: "Zero Trust",
    tagline: "Principle of least privilege and zero trust network design",
    confidence: 0.78,
    category: "security",
    icon: "🔐",
    color: "from-cyan-400 to-blue-700",
    zone: "mid",
  },
  {
    id: "iam",
    label: "IAM",
    tagline: "Designing secure identity and token-based access systems",
    confidence: 0.72,
    category: "security",
    icon: "🧩",
    color: "from-blue-500 to-indigo-700",
    zone: "far",
  },
  {
    id: "securityplus",
    label: "Security+",
    tagline: "Learning secure API design, IAM, and encryption principles",
    confidence: 0.6,
    category: "security",
    icon: "🛡️",
    color: "from-sky-500 to-indigo-600",
    zone: "far",
  },

  /* ⚙️ TOOLING & DEVOPS */
  {
    id: "terraform",
    label: "Terraform",
    tagline: "Infrastructure as Code for scalable deployments",
    confidence: 0.78,
    category: "tooling",
    icon: "⚙️",
    color: "from-violet-500 to-purple-700",
    zone: "mid",
  },
  {
    id: "docker",
    label: "Docker",
    tagline: "Containerizing and shipping reliable systems",
    confidence: 0.9,
    category: "tooling",
    icon: "🐳",
    color: "from-sky-400 to-cyan-600",
    zone: "near",
  },
  {
    id: "github_actions",
    label: "GitHub Actions",
    tagline: "Automated CI/CD workflows with Vercel integration",
    confidence: 0.88,
    category: "tooling",
    icon: "🧠",
    color: "from-gray-400 to-gray-700",
    zone: "mid",
  },
  {
    id: "nextjs",
    label: "Next.js",
    tagline: "Frontend excellence with modern React architecture",
    confidence: 0.95,
    category: "tooling",
    icon: "🚀",
    color: "from-neutral-200 to-neutral-600",
    zone: "near",
  },
];