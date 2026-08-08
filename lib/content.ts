export const EMAIL = "azaatar@bowdoin.edu";
export const GITHUB_URL = "https://github.com/adamzatar";
export const LINKEDIN_URL = "https://www.linkedin.com/in/adamzaatar";
export const CLICKERASE_URL = "https://huggingface.co/spaces/azaatar/clickerase";
export const CLICKERASE_REPO_URL = "https://github.com/adamzatar/clickerase";
export const EVENTGUARD_REPO_URL = "https://github.com/adamzatar/EventGuard";
export const PORTFOLIO_REPO_URL = "https://github.com/adamzatar/adam-zaatar-portfolio";
export const THREAD_SIM_SOURCE_URL = `${PORTFOLIO_REPO_URL}/blob/main/lib/demos/threadSimulation.ts`;
export const THREAD_UI_SOURCE_URL = `${PORTFOLIO_REPO_URL}/blob/main/components/demos/ThreadDemo.tsx`;
export const PAGER_SIM_SOURCE_URL = `${PORTFOLIO_REPO_URL}/blob/main/lib/demos/pagerSimulation.ts`;
export const PAGER_UI_SOURCE_URL = `${PORTFOLIO_REPO_URL}/blob/main/components/demos/PagerDemo.tsx`;

export type ProjectMediaData =
  | {
      kind: "eventguard-architecture";
      alt: string;
    }
  | {
      kind: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
    };

export type FeaturedProject = {
  title: string;
  status: string;
  description: string;
  technologies: readonly string[];
  href: string;
  cta: string;
  sourceHref?: string;
  sourceCta?: string;
  note?: string;
  media?: ProjectMediaData;
};

export const focusAreas = [
  "Backend engineering",
  "Systems engineering",
  "Infrastructure software",
  "Applied AI",
  "Finance-oriented software",
] as const;

export const atAGlance = [
  {
    title: "Bowdoin College",
    body: "B.A. candidate in Computer Science and Economics, with a German minor.",
  },
  {
    title: "Graduation",
    body: "Expected May 2027.",
  },
  {
    title: "Systems work",
    body: "Built C/C++ operating-systems projects and separate public visualizers for the underlying concepts.",
  },
] as const;

export const experienceItems = [
  {
    title: "Software Engineering Intern",
    organization: "ProgressSoft Corporation",
    date: "Jun–Aug 2026",
    body: "Completed a 10-week software engineering internship at a payments software company in Amman. The work included Java, Spring Boot, testing, code review, and iterative refactoring.",
  },
  {
    title: "Gibbons Research Fellow",
    organization: "Bowdoin College",
    date: "Summer 2025",
    body: "Designed a financial literacy program for students, benchmarked peer schools, and wrote two course models.",
  },
  {
    title: "Web Staff and Data Desk",
    organization: "The Bowdoin Orient",
    date: "Bowdoin",
    body: "Web and plugin fixes, accessibility, and data work behind reported pieces.",
  },
  {
    title: "Founder and President",
    organization: "Bowdoin Martial Arts Club",
    date: "Bowdoin",
    body: "Funding, logistics, recruiting, and coordination with outside gym partners.",
  },
  {
    title: "Learning Assistant, CSCI 1101",
    organization: "Bowdoin College",
    date: "Fall 2026",
    body: "Will support introductory computer science students through course support, debugging help, and office hours.",
  },
] as const;

export const eventGuardProject = {
  title: "EventGuard",
  status: "Internship project",
  description:
    "A seven-module Java 21 and Spring Boot application for importing, processing, auditing, and persisting payment files, with ports-and-adapters boundaries, transactional JDBC persistence, a Spring MVC upload endpoint, and 107 passing tests.",
  technologies: ["Java 21", "Spring Boot", "Spring MVC", "JDBC", "PostgreSQL"],
  href: "/projects/eventguard",
  cta: "View case study",
  sourceHref: EVENTGUARD_REPO_URL,
  sourceCta: "Source",
  media: {
    kind: "eventguard-architecture",
    alt: "EventGuard request path from CLI and Spring MVC entry points through the application core to JDBC and PostgreSQL persistence",
  },
} as const satisfies FeaturedProject;

export const clickEraseProject = {
  title: "ClickErase",
  status: "Live application",
  description:
    "A Python image-editing application where a user clicks an object, MobileSAM generates a segmentation mask, and LaMa performs inpainting. The app is deployed on Hugging Face Spaces.",
  technologies: ["Python", "MobileSAM", "LaMa", "Gradio", "Hugging Face Spaces"],
  href: CLICKERASE_URL,
  cta: "Open demo",
  sourceHref: CLICKERASE_REPO_URL,
  sourceCta: "Source",
} as const satisfies FeaturedProject;

export const systemDemoProjects = [
  {
    title: "Thread Library Visualizer",
    status: "Interactive demo",
    description:
      "The original C/C++ project implements a user-level thread library with ucontext context switching, FIFO scheduling, locks, condition variables under Mesa semantics, and interrupt masking. This public TypeScript demo visualizes those concepts without exposing course source code.",
    technologies: ["C/C++", "ucontext", "Scheduling", "Synchronization"],
    href: "/projects/thread-library",
    cta: "Open demo",
    sourceHref: THREAD_SIM_SOURCE_URL,
    sourceCta: "Source",
    note: "Original C++ implementation private due to course policy.",
    media: {
      kind: "image",
      src: "/images/projects/thread-library-visualizer.webp",
      alt: "Public Thread Library Visualizer showing Coordinator ready, Worker B running, and Worker A blocked on a lock",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "Virtual Memory Pager Visualizer",
    status: "Interactive demo",
    description:
      "The original C/C++ pager implements demand paging, second-chance clock replacement, reference and dirty bits, swap, and disk I/O behavior. This public TypeScript demo makes the memory trace and replacement process visible.",
    technologies: ["C/C++", "Demand paging", "Clock replacement", "Swap"],
    href: "/projects/virtual-memory-pager",
    cta: "Open demo",
    sourceHref: PAGER_SIM_SOURCE_URL,
    sourceCta: "Source",
    note: "Original C++ implementation private due to course policy.",
    media: {
      kind: "image",
      src: "/images/projects/virtual-memory-pager-visualizer.webp",
      alt: "Public Virtual Memory Pager Visualizer showing populated frames, virtual pages, page table entries, hits, faults, and evictions after a completed trace",
      width: 1280,
      height: 720,
    },
  },
] as const satisfies readonly FeaturedProject[];

export const featuredProjects = [
  eventGuardProject,
  ...systemDemoProjects,
  clickEraseProject,
] as const satisfies readonly FeaturedProject[];

export const softwareProjects = [
  {
    title: "Bowdoin Marketplace",
    status: "In progress",
    description:
      "A campus marketplace prototype for student buying and selling. I explored listing flows, campus trust questions, and the shape of a student-only exchange. The repository is public, but the project is still ongoing.",
    technologies: ["Next.js", "PostgreSQL", "Prisma"],
    href: "https://github.com/adamzatar/Bowdoin-Marketplace",
    cta: "Source",
  },
  {
    title: "Vector",
    status: "Prototype",
    description:
      "A SwiftUI and Vapor authentication prototype. I used it to explore passkeys, biometric fallback, and account security flows.",
    technologies: ["SwiftUI", "Vapor", "Authentication"],
    href: "https://github.com/adamzatar/Vector",
    cta: "Source",
  },
  {
    title: "Cutaway",
    status: "Prototype",
    description:
      "A SwiftUI and AVFoundation experiment around multi-angle video workflows.",
    technologies: ["SwiftUI", "AVFoundation"],
    href: "https://github.com/adamzatar/Cutaway",
    cta: "Source",
  },
] as const;

export const researchItems = [
  {
    title: "AI Layoffs and Investor Reactions: Early Evidence from Public-Firm Layoff Announcements",
    status: "PDF available",
    methods: "Event study, cumulative abnormal returns, manual disclosure coding, public-firm layoff announcements",
    description:
      "This paper asks whether public firms that explicitly connect layoffs to AI adoption receive different stock-market reactions than firms announcing ordinary layoffs. I built a sample of public-firm layoff announcements, manually coded strict AI-cited layoffs, and estimated cumulative abnormal returns around announcement dates. The results do not show a statistically reliable AI-layoff premium.",
    file: "/research/AI Layoffs and Investor Reactions.pdf",
  },
  {
    title: "Private Answers, Public Losses: ChatGPT and the Decline of Stack Overflow",
    status: "PDF available",
    methods: "Stack Exchange Data Explorer, tag-month-account-age panel, fixed effects, digital economics",
    description:
      "This paper studies whether ChatGPT is associated with reduced public participation on Stack Overflow. It uses Stack Exchange Data Explorer data from January 2018 through December 2024 across ten programming tags and examines account age at the time of posting. The main result is that the post-ChatGPT decline is largest among newer accounts, especially accounts aged 8-30 days and 31-365 days, which supports the argument that private AI assistance may weaken entry into public knowledge production.",
    file: "/research/Private Answers, Public Losses_ ChatGPT and the Decline of Stack Overflow.pdf",
  },
  {
    title: "Who Rules? Lobbying’s Grip on Democracy",
    status: "PDF available",
    methods: "Policy research, source analysis, political economy",
    description:
      "This paper asks when corporate lobbying crosses from political participation into social irresponsibility. It uses policy examples and secondary sources to compare harmful lobbying with transparent advocacy.",
    file: "/research/Research Paper - Behavioral Economics.pdf",
  },
  {
    title: "Economic Statistics Paper (ECON2557)",
    status: "PDF available",
    methods: "OLS regression, producer price data, corporate profit data",
    description:
      "This paper studies whether post-COVID price increases were connected to changes in corporate profits, using producer price indices and profit measures. I used OLS regressions to test the relationship and discuss the limits of the data.",
    file: "/research/Zaatar_ECON2557_Paper.pdf",
  },
  {
    title: "Second-Phase Report",
    status: "PDF available",
    methods: "Curriculum design, peer benchmarking, implementation planning",
    description:
      "This report turns financial literacy research into possible course structures. It asks how a student financial literacy program could be taught at different levels of depth, from a semester-long course to a shorter bootcamp. It includes syllabi, assignments, grading models, and implementation tradeoffs.",
    file: "/research/Second-Phase Report_ Models of the Class.pdf",
  },
  {
    title: "Financial Literacy Programs at Peer Institutions",
    status: "PDF available",
    methods: "Peer institution review, program comparison, curriculum research",
    description:
      "This report looks at how peer colleges approach financial literacy and what Bowdoin could learn from them. It compares program formats, topics, and delivery models across institutions and compiles the source material used for the later course-design work.",
    file: "/research/Financial Literacy Programs at Peer Institutions.pdf",
  },
] as const;
