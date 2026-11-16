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
  id?: string;
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
  relatedLink?: { href: string; label: string };
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
    title: "Gibbons Summer Research Fellow",
    organization: "Bowdoin College",
    date: "Summer 2025",
    body: "During my Summer 2025 fellowship, I compared peer financial literacy programs and proposed course models for Bowdoin. I revised both reports in November 2026.",
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
    date: "Fall 2026 to present",
    body: "I help introductory computer science students in labs and office hours find and fix bugs in their own code.",
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
  id: "clickerase",
  title: "ClickErase",
  status: "Live demo",
  tagline: "Click an object in a photo and it disappears.",
  description:
    "Click an object in a photo and ClickErase removes it. MobileSAM generates the mask and LaMa fills in the background. It runs on Hugging Face Spaces. Final project for Deep Learning for Computer Vision (CSCI 3485), Spring 2026; solo.",
  technologies: ["Python", "MobileSAM", "LaMa", "Gradio"],
  href: CLICKERASE_URL,
  cta: "Open demo",
  sourceHref: CLICKERASE_REPO_URL,
  sourceCta: "Source",
  relatedLink: {
    href: "/projects#computer-vision-labs",
    label: "Computer vision course labs",
  },
} as const satisfies FeaturedProject;

export const operatingSystemsCourse = {
  label:
    "Operating Systems (CSCI 3310), Spring 2026, Professor Sean Barker",
  threadDescription:
    "Our group built a C++ user-level thread library on Linux using getcontext, makecontext and swapcontext, with FIFO ready, lock and condition queues. I wrote the Mesa-style condition variables. Our group used interrupt disable and enable for atomicity, returned -1 on errors instead of crashing, and ran our SSTF disk scheduler on the library.",
  pagerDescription:
    "Our group built an external C++ pager on Linux that manages page tables, faults, swap and physical frames for multiple processes. I wrote the demand paging with global second-chance (clock) replacement. Our group tracked reference and dirty bits in software through protection faults and deferred zero-fills and disk writes until unavoidable.",
  note: "Group project. A teammate wrote the test suites. Source is private under course policy.",
} as const;

export const systemDemoProjects = [
  {
    title: "Thread Library Visualizer",
    tagline: "Scheduling and lock contention, stepped through in the browser.",
    description:
      "I wrote the Mesa-style condition variables in our group's C++ thread library on Linux. Our group built the FIFO scheduling and locks; a teammate wrote the test suites. This separate public visualizer steps through scheduling and lock contention in the browser.",
    technologies: ["C++", "Linux", "ucontext", "TypeScript"],
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
      "I wrote the demand paging with second-chance replacement in our group's C++ virtual memory pager on Linux. A teammate wrote the test suites. This separate public visualizer runs a memory trace and shows each fault, eviction and page-table change.",
    technologies: ["C++", "Linux", "TypeScript"],
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

export type CourseProject = {
  id: string;
  title: string;
  courseLabel: string;
  description: string;
  technologies: readonly string[];
  note: string;
  relatedLink?: { href: string; label: string };
};

const distributedSystemsLabel =
  "Distributed Systems (CSCI 3325), Fall 2026 (in progress), Professor Sean Barker";
const distributedSystemsNote =
  "Group project, followed by an oral review. Source is private under course policy.";

export const courseProjects: readonly CourseProject[] = [
  {
    id: "web-server",
    title: "Web server",
    courseLabel: distributedSystemsLabel,
    description:
      "Our group built an HTTP/1.0 and HTTP/1.1 GET server in C using Linux sockets. It handles concurrent clients, returns 200/400/403/404 status codes and Date, Content-Length and Content-Type headers, and supports persistent HTTP/1.1 connections with a timeout that adapts to load. Requests containing .. receive 403. Our experiments compared buffer sizes for large-file transfers and the concurrent design's throughput and latency against a one-client-at-a-time baseline with 1 to 50 clients.",
    technologies: ["C", "Linux", "Sockets", "HTTP"],
    note: distributedSystemsNote,
  },
  {
    id: "online-bookstore",
    title: "Online bookstore",
    courseLabel: distributedSystemsLabel,
    description:
      "Our group built front-end, catalog and order servers in Java, communicating over gRPC with Protocol Buffers, with Java and Python clients. Inventory stays correct during concurrent purchases and periodic restocking, including when buyers compete for the last copy. Our group deployed the system across four machines and measured response time as concurrent clients increased.",
    technologies: ["Java", "Python", "gRPC", "Protocol Buffers"],
    note: distributedSystemsNote,
  },
  {
    id: "mapreduce",
    title: "MapReduce",
    courseLabel: distributedSystemsLabel,
    description:
      "Our group configured a Hadoop 3 cluster on Amazon-hosted machines and wrote Java MapReduce jobs. We built an inverted index over Project Gutenberg texts and a two-stage job joining impression and click logs to calculate click-through rates per referrer and ad.",
    technologies: ["Java", "Hadoop 3", "MapReduce", "AWS"],
    note: distributedSystemsNote,
  },
  {
    id: "computer-vision-labs",
    title: "Computer vision labs",
    courseLabel:
      "Deep Learning for Computer Vision (CSCI 3485), Spring 2026, Professor Jeová Farias",
    description:
      "I completed seven PyTorch labs, each an experiment with a written report: perceptron, multilayer perceptron and optimization, CNNs, transfer learning, object detection, U-Net and autoencoders for denoising and segmentation, and conditional GANs. ClickErase was my solo final project for the course.",
    technologies: ["Python", "PyTorch"],
    note: "Lab source is private under course policy.",
    relatedLink: {
      href: "/projects#clickerase",
      label: "ClickErase final project",
    },
  },
];

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
  revised?: string;
  auditNote?: string;
  methods: readonly string[];
  file: string;
};

export const researchItems: readonly ResearchItem[] = [
  {
    title:
      "AI Layoffs and Investor Reactions: Early Evidence from Public-Firm Layoff Announcements",
    kind: "paper",
    summary:
      "Using public-firm layoff announcements and an event-study design, I tested whether investors reacted differently when companies explicitly tied layoffs to AI. I did not find a statistically reliable AI-layoff premium.",
    description:
      "This paper asks whether public firms that explicitly connect layoffs to AI adoption receive different stock-market reactions than firms announcing ordinary layoffs. I built a sample of public-firm layoff announcements, manually coded strict AI-cited layoffs, and estimated cumulative abnormal returns around announcement dates. The results do not show a statistically reliable AI-layoff premium.",
    auditNote:
      "November 2026 audit: I reproduced every table from the stored data and the conclusion holds. I also found six problems that need correcting, including Figure 1 (a plotting step matched one company to another security's quotes), clusters described as industry-month that are calendar months, and a wild bootstrap in Table 4 that did not impose the null. Ten of the 18 AI-cited layoffs were announced alongside earnings, against 19% of other layoffs; restricting to standalone announcements leaves the result unchanged. A corrected version is in progress.",
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
    title: "Financial Literacy Programs at Peer Institutions (Revised)",
    kind: "report",
    revised: "Revised November 2026",
    summary:
      "A desk review of five liberal arts colleges and five university reference cases, checked in November 2026. I recommend a CXD-run online track for Bowdoin, live sessions timed to real deadlines, and evaluation that counts actions rather than satisfaction.",
    description:
      "Revised on 15 November 2026, this desk review covers Williams, Wellesley, Middlebury, Smith and Oberlin, with Yale, Stanford, Harvard, Dartmouth and TCU as university reference cases. I kept only programs confirmable on a school's own site or student newspaper. Offerings fall into four formats: self-paced online courses, short workshop series, peer coaching and one-credit courses. The research section uses peer-reviewed papers only: financial education reliably raises knowledge, with smaller and possibly fading effects on behavior, so teaching close to real decisions is the best-supported design. I recommend a modest start for Bowdoin: an online track run by Career Exploration and Development (CXD), a few live sessions timed to real deadlines, and evaluation that counts actions rather than satisfaction.",
    methods: ["Peer benchmarking"],
    file: "/research/Financial Literacy Programs at Peer Institutions.pdf",
  },
  {
    title: "Second-Phase Report: Models of the Class (Revised)",
    kind: "report",
    revised: "Revised November 2026",
    summary:
      "Compares six ways Bowdoin could teach personal finance, addressing Professor Nelson's questions about funding, earlier attempts, bottlenecks and evaluation. I recommend a CXD-run online track plus three short live sessions, with a half-credit course dependent on later demand.",
    description:
      "Revised on 15 November 2026, this report compares a full-credit course, a half-credit course, a January bootcamp, an online track, a workshop series and senior-spring sessions. It is organized around four questions Professor Nelson raised: funding, earlier attempts, bottlenecks and how to know whether it worked. I rank the models on cost, who must approve and staff them, reach, and whether their timing fits the research. I recommend starting with a CXD-run online track plus three short live sessions timed to real deadlines, with a half-credit course as a later step dependent on demand. The revision adds a module for international students that I did not find in any peer program's public materials.",
    methods: ["Curriculum design"],
    file: "/research/Second-Phase Report_ Models of the Class.pdf",
  },
];

export const researchPapers = researchItems.filter(
  (item) => item.kind === "paper",
);
export const researchReports = researchItems.filter(
  (item) => item.kind === "report",
);
