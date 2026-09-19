export const EMAIL = "azaatar@bowdoin.edu";
export const GITHUB_URL = "https://github.com/adamzatar";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/adam-zaatar-09b106304/";
export const CLICKERASE_URL =
  "https://huggingface.co/spaces/azaatar/clickerase";
export const CLICKERASE_REPO_URL = "https://github.com/adamzatar/clickerase";
export const DURABLE_RUNNER_REPO_URL =
  "https://github.com/adamzatar/durable-runner";
export const TECHNICAL_BID_REVIEW_REPO_URL =
  "https://github.com/adamzatar/technical-bid-review";
export const EVENTGUARD_REPO_URL = "https://github.com/adamzatar/EventGuard";
export const PORTFOLIO_REPO_URL =
  "https://github.com/adamzatar/adam-zaatar-portfolio";
export const THREAD_SIM_SOURCE_URL = `${PORTFOLIO_REPO_URL}/blob/main/lib/demos/threadSimulation.ts`;
export const THREAD_UI_SOURCE_URL = `${PORTFOLIO_REPO_URL}/blob/main/components/demos/ThreadDemo.tsx`;
export const PAGER_SIM_SOURCE_URL = `${PORTFOLIO_REPO_URL}/blob/main/lib/demos/pagerSimulation.ts`;
export const PAGER_UI_SOURCE_URL = `${PORTFOLIO_REPO_URL}/blob/main/components/demos/PagerDemo.tsx`;

export type ProjectMediaData =
  | {
      kind: "technical-bid-review" | "durable-runner" | "operating-systems";
      alt: string;
    }
  | {
      kind: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      /** Where to anchor the crop when the image is shown at 16:9. */
      position?: string;
    };

export type FeaturedProject = {
  title: string;
  status?: string;
  /** One sentence for the home page preview. */
  tagline: string;
  description: string;
  /** One concrete result worth showing next to the description. */
  proof?: string;
  technologies: readonly string[];
  href: string;
  cta: string;
  sourceHref?: string;
  sourceCta?: string;
  media?: ProjectMediaData;
};

export const experienceItems = [
  {
    title: "Software Engineering Intern",
    organization: "ProgressSoft Corporation",
    date: "Jun–Aug 2026",
    body: "A 10-week internship at a payments software company in Amman. I wrote Java and Spring Boot code and went through regular code review with my mentor and team lead.",
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
    body: "Support introductory computer science students with debugging help and office hours.",
  },
] as const;

export const technicalBidReviewProject = {
  title: "Technical Bid Review",
  tagline:
    "Checks vendor proposals against a technical spec, with code verifying what the model claims.",
  description:
    "Technical Bid Review checks vendor proposals against a technical specification. A model finds evidence and proposes a status for each requirement, while normal code checks the citations and numeric comparisons before a reviewer sees the result.",
  proof:
    "On a frozen ten-case holdout, all ten classifications were correct and validation caught one bad citation.",
  technologies: ["Python", "FastAPI", "PostgreSQL", "OpenAI API"],
  href: "/projects/technical-bid-review",
  cta: "Read the case study",
  sourceHref: TECHNICAL_BID_REVIEW_REPO_URL,
  sourceCta: "Source",
  media: {
    kind: "technical-bid-review",
    alt: "Example requirement check: a vendor offers 1,850 kW against a 2,000 kW minimum, so the requirement is marked non-compliant.",
  },
} as const satisfies FeaturedProject;

export const durableRunnerProject = {
  title: "Durable Runner",
  tagline:
    "A task runner where a frozen worker can come back late and have its write rejected.",
  description:
    "Durable Runner is a TypeScript task runner with separate workers coordinating through PostgreSQL. If a worker stops responding, another worker can claim the task after its lease expires. A version number prevents the first worker from writing a late result after ownership changes.",
  proof:
    "In local failure testing, none of 4,750 deliberately stale writes were accepted.",
  technologies: ["TypeScript", "Node.js", "PostgreSQL", "Fastify"],
  href: "/projects/durable-runner",
  cta: "Read the case study",
  sourceHref: DURABLE_RUNNER_REPO_URL,
  sourceCta: "Source",
  media: {
    kind: "durable-runner",
    alt: "Stale-worker sequence: Worker A claims the task, freezes, Worker B takes over and completes, and A's late write is rejected when it resumes.",
  },
} as const satisfies FeaturedProject;

export const eventGuardProject = {
  title: "EventGuard",
  tagline:
    "A payment-file importer I built during my internship at ProgressSoft in Amman.",
  description:
    "I built EventGuard during my internship at ProgressSoft in Amman. It imports payment files, keeps rejected rows with the reason they failed, and saves each import and its payment rows together in PostgreSQL.",
  proof:
    "107 passing tests, including a JDBC integration test against a real database.",
  technologies: ["Java 21", "Spring Boot", "JDBC", "PostgreSQL"],
  href: "/projects/eventguard",
  cta: "Read the case study",
  sourceHref: EVENTGUARD_REPO_URL,
  sourceCta: "Source",
  media: {
    kind: "image",
    src: "/images/progresssoft/progresssoft-internship-adam-zaatar.jpg",
    alt: "Adam Zaatar outside ProgressSoft in Amman",
    width: 1200,
    height: 1500,
    position: "50% 35%",
  },
} as const satisfies FeaturedProject;

export const clickEraseProject = {
  title: "ClickErase",
  status: "Live demo",
  tagline: "Click an object in a photo and it disappears.",
  description:
    "Click an object in a photo and ClickErase removes it. MobileSAM generates the mask and LaMa fills in the background. It runs on Hugging Face Spaces.",
  technologies: ["Python", "MobileSAM", "LaMa", "Gradio"],
  href: CLICKERASE_URL,
  cta: "Open demo",
  sourceHref: CLICKERASE_REPO_URL,
  sourceCta: "Source",
} as const satisfies FeaturedProject;

export const systemDemoProjects = [
  {
    title: "Thread Library Visualizer",
    tagline: "Scheduling and lock contention, stepped through in the browser.",
    description:
      "A C++ user-level thread library with FIFO scheduling, locks, and Mesa-style condition variables. The public visualizer steps through scheduling and lock contention in the browser.",
    technologies: ["C/C++", "ucontext", "TypeScript"],
    href: "/projects/thread-library",
    cta: "Open demo",
    sourceHref: THREAD_SIM_SOURCE_URL,
    sourceCta: "Visualizer source",
    media: {
      kind: "image",
      src: "/images/projects/thread-library-visualizer.webp",
      alt: "Thread Library Visualizer showing Coordinator ready, Worker B running, and Worker A blocked on a lock",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "Virtual Memory Pager Visualizer",
    tagline: "Page faults, evictions, and page-table changes on a live trace.",
    description:
      "A C++ pager with demand paging and second-chance clock replacement. The public visualizer runs a memory trace and shows each fault, eviction, and page-table change.",
    technologies: ["C/C++", "TypeScript"],
    href: "/projects/virtual-memory-pager",
    cta: "Open demo",
    sourceHref: PAGER_SIM_SOURCE_URL,
    sourceCta: "Visualizer source",
    media: {
      kind: "image",
      src: "/images/projects/virtual-memory-pager-visualizer.webp",
      alt: "Virtual Memory Pager Visualizer showing populated frames, virtual pages, page table entries, hits, faults, and evictions after a completed trace",
      width: 1280,
      height: 720,
    },
  },
] as const satisfies readonly FeaturedProject[];

export const mainProjects = [
  technicalBidReviewProject,
  durableRunnerProject,
  eventGuardProject,
] as const satisfies readonly FeaturedProject[];

export const softwareProjects = [
  {
    title: "Bowdoin Marketplace",
    status: "In progress",
    description:
      "A buy-and-sell marketplace for Bowdoin students, with listing flows and student-only access under development.",
    technologies: ["Next.js", "PostgreSQL", "Prisma"],
    href: "https://github.com/adamzatar/Bowdoin-Marketplace",
    cta: "Source",
  },
  {
    title: "Vector",
    status: "Prototype",
    description:
      "A SwiftUI and Vapor prototype exploring passkeys, biometric fallback, and account security flows.",
    technologies: ["SwiftUI", "Vapor"],
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

export type ResearchItem = {
  title: string;
  kind: "paper" | "report";
  /** Short editorial summary shown in lists. */
  summary: string;
  /** Longer description used in the PDF preview panel. */
  description: string;
  methods: readonly string[];
  file: string;
};

export const researchItems = [
  {
    title:
      "AI Layoffs and Investor Reactions: Early Evidence from Public-Firm Layoff Announcements",
    kind: "paper",
    summary:
      "Using public-firm layoff announcements and an event-study design, I tested whether investors reacted differently when companies explicitly tied layoffs to AI. I did not find a statistically reliable AI-layoff premium.",
    description:
      "This paper asks whether public firms that explicitly connect layoffs to AI adoption receive different stock-market reactions than firms announcing ordinary layoffs. I built a sample of public-firm layoff announcements, manually coded strict AI-cited layoffs, and estimated cumulative abnormal returns around announcement dates. The results do not show a statistically reliable AI-layoff premium.",
    methods: [
      "Event study",
      "Cumulative abnormal returns",
      "Manual disclosure coding",
    ],
    file: "/research/AI Layoffs and Investor Reactions.pdf",
  },
  {
    title:
      "Private Answers, Public Losses: ChatGPT and the Decline of Stack Overflow",
    kind: "paper",
    summary:
      "I pulled Stack Overflow posting data from 2018 through 2024 across ten programming tags to see how participation changed after ChatGPT launched. The drop is steepest among newer accounts, which fits the idea that private AI help is replacing public questions, though the paper does not establish that as the cause.",
    description:
      "This paper studies whether ChatGPT is associated with reduced public participation on Stack Overflow. It uses Stack Exchange Data Explorer data from January 2018 through December 2024 across ten programming tags and examines account age at the time of posting. The main result is that the post-ChatGPT decline is largest among newer accounts, especially accounts aged 8-30 days and 31-365 days, and the paper discusses whether private AI assistance could be one explanation for that pattern.",
    methods: [
      "Tag-month panel",
      "Fixed effects",
      "Stack Exchange Data Explorer",
    ],
    file: "/research/Private Answers, Public Losses_ ChatGPT and the Decline of Stack Overflow.pdf",
  },
  {
    title: "Inflation’s Corporate Side",
    kind: "paper",
    summary:
      "Did post-COVID price increases move with corporate profits? Across 96 industry-years of BEA profit data and FRED producer prices, the baseline and industry fixed-effects models show a positive association. Two alternative price-growth checks came back undefined, and nothing here establishes causation.",
    description:
      "This paper studies whether post-COVID price increases were connected to changes in corporate profits, using producer price indices and profit measures. I used OLS regressions with industry fixed effects to test the relationship and discuss the limits of the data.",
    methods: ["OLS", "Industry fixed effects", "BEA and FRED data"],
    file: "/research/Zaatar_ECON2557_Paper.pdf",
  },
  {
    title: "Who Rules? Lobbying’s Grip on Democracy",
    kind: "paper",
    summary:
      "An essay on when corporate lobbying stops being ordinary political participation and starts undermining accountability. It works through policy cases and secondary sources to separate harmful lobbying from transparent advocacy.",
    description:
      "This paper asks when corporate lobbying crosses from political participation into social irresponsibility. It uses policy examples and secondary sources to compare harmful lobbying with transparent advocacy.",
    methods: ["Political economy", "Policy analysis"],
    file: "/research/Research Paper - Behavioral Economics.pdf",
  },
  {
    title: "Financial Literacy Programs at Peer Institutions",
    kind: "report",
    summary:
      "A survey of how peer colleges teach financial literacy, comparing formats, topics, and delivery, and collecting the sources the course models were built on.",
    description:
      "This report looks at how peer colleges approach financial literacy and what Bowdoin could learn from them. It compares program formats, topics, and delivery models across institutions and compiles the source material used for the later course-design work.",
    methods: ["Peer benchmarking"],
    file: "/research/Financial Literacy Programs at Peer Institutions.pdf",
  },
  {
    title: "Second-Phase Report: Models of the Class",
    kind: "report",
    summary:
      "Turns that research into course models for Bowdoin, from a semester-long class to a short bootcamp, with syllabi, assignments, grading, and the tradeoffs of each.",
    description:
      "This report turns financial literacy research into possible course structures. It asks how a student financial literacy program could be taught at different levels of depth, from a semester-long course to a shorter bootcamp. It includes syllabi, assignments, grading models, and implementation tradeoffs.",
    methods: ["Curriculum design"],
    file: "/research/Second-Phase Report_ Models of the Class.pdf",
  },
] as const satisfies readonly ResearchItem[];

export const researchPapers = researchItems.filter(
  (item) => item.kind === "paper",
);
export const researchReports = researchItems.filter(
  (item) => item.kind === "report",
);
