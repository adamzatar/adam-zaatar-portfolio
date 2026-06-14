export const EMAIL = "azaatar@bowdoin.edu";
export const GITHUB_URL = "https://github.com/adamzatar";
export const LINKEDIN_URL = "https://www.linkedin.com/in/adam-zaatar-09b106304";
export const CLICKERASE_URL = "https://huggingface.co/spaces/azaatar/clickerase";

export const focusAreas = [
  "Backend systems",
  "Applied AI",
  "Finance-oriented software",
  "Economics research",
] as const;

export const atAGlance = [
  {
    title: "Bowdoin College",
    body: "Computer Science and Economics student with a German minor.",
  },
  {
    title: "Backend Java training",
    body: "Software Engineering Intern at ProgressSoft in Amman, Summer 2026.",
  },
  {
    title: "Research and campus work",
    body: "Economics research PDFs, Bowdoin Orient web staff work, and student organization leadership.",
  },
] as const;

export const selectedWork = [
  {
    title: "ClickErase",
    status: "Live demo",
    body: "Built an AI image editing app where a user uploads an image, clicks an object, and the app generates a segmentation mask and removes the object with inpainting. Built in Python with Gradio and Hugging Face Spaces.",
    href: CLICKERASE_URL,
    cta: "Open demo",
  },
  {
    title: "Economics research archive",
    status: "PDFs available",
    body: "Research papers and financial literacy reports with source PDFs available to inspect, including work on lobbying, behavioral economics, and student financial literacy programs.",
    href: "/research",
    cta: "Read research",
  },
] as const;

export const experienceItems = [
  {
    title: "Software Engineering Intern",
    organization: "ProgressSoft",
    date: "Summer 2026",
    body: "Backend-focused Java internship at a payments software company in Amman, focused on enterprise Java, Spring Boot, persistence, security, Docker, testing, and code review.",
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
    date: "Fall 2025",
    body: "Supported introductory computer science students through course support, debugging help, and office hours.",
  },
] as const;

export const featuredProjects = [
  // TODO: Add a ClickErase screenshot or before/after image once a stable capture exists.
  {
    title: "ClickErase",
    status: "Demo available",
    description:
      "A click-to-remove image editing tool. I built the upload flow, click selection workflow, segmentation mask generation, and inpainting path in a Gradio app deployed on Hugging Face Spaces.",
    technologies: ["Python", "Gradio", "Computer vision", "Hugging Face Spaces"],
    href: CLICKERASE_URL,
    cta: "Open demo",
  },
] as const;

export const softwareProjects = [
  {
    title: "Bowdoin Marketplace",
    status: "In progress",
    description:
      "A campus marketplace prototype for student buying and selling. I explored listing flows, campus trust questions, and the shape of a student-only exchange. The repository is public, but the project is still ongoing.",
    technologies: ["Next.js", "PostgreSQL", "Prisma"],
    href: "https://github.com/adamzatar/Bowdoin-Marketplace",
    cta: "Repository",
  },
  {
    title: "Vector",
    status: "Prototype",
    description:
      "A SwiftUI and Vapor authentication prototype. I used it to explore passkeys, biometric fallback, and account security flows. The public code is useful as a prototype, with documentation still limited.",
    technologies: ["SwiftUI", "Vapor", "Authentication"],
    href: "https://github.com/adamzatar/Vector",
    cta: "Repository",
  },
  {
    title: "Cutaway",
    status: "Prototype",
    description:
      "A SwiftUI and AVFoundation experiment around multi-angle video workflows. It is best read as a learning project for media handling and app structure unless a public demo is added later.",
    technologies: ["SwiftUI", "AVFoundation"],
    href: "https://github.com/adamzatar/Cutaway",
    cta: "Repository",
  },
  {
    title: "IntCalculator.java",
    status: "Small Java project",
    description:
      "A command-line integer calculator focused on parsing input, handling operator precedence, and evaluating expressions. It is a small project, but it is easy to inspect and discuss.",
    technologies: ["Java"],
    href: "https://github.com/adamzatar/IntCalculator.java",
    cta: "Repository",
  },
] as const;

export const researchItems = [
  {
    title: "AI Layoffs and Investor Reactions: Early Evidence from Public-Firm Layoff Announcements",
    status: "PDF available",
    methods: "Event study, cumulative abnormal returns, manual disclosure coding, public-firm layoff announcements",
    description:
      "This paper asks whether public firms that explicitly connect layoffs to AI adoption receive different stock-market reactions than firms announcing ordinary layoffs. I built a sample of public-firm layoff announcements, manually coded strict AI-cited layoffs, and estimated cumulative abnormal returns around announcement dates. The results do not show a statistically reliable AI-layoff premium, which makes the paper useful for thinking about AI narratives, investor attention, and finance.",
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
      "This paper asks when corporate lobbying crosses from political participation into social irresponsibility. It uses policy examples and secondary sources to compare harmful lobbying with transparent advocacy. The PDF lets readers inspect the argument structure, examples, and distinctions I used to evaluate lobbying’s role in democratic decision-making.",
    file: "/research/Research Paper - Behavioral Economics.pdf",
  },
  {
    title: "Economic Statistics Paper (ECON2557)",
    status: "PDF available",
    methods: "OLS regression, producer price data, corporate profit data",
    description:
      "This paper studies whether post-COVID price increases were connected to changes in corporate profits, using producer price indices and profit measures. I used OLS regressions to test the relationship and discuss the limits of the data. The PDF shows the model choices, results, interpretation, and caveats.",
    file: "/research/Zaatar_ECON2557_Paper.pdf",
  },
  {
    title: "Second-Phase Report",
    status: "PDF available",
    methods: "Curriculum design, peer benchmarking, implementation planning",
    description:
      "This report turns financial literacy research into possible course structures. It asks how a student financial literacy program could be taught at different levels of depth, from a semester-long course to a shorter bootcamp. The PDF includes syllabi, assignments, grading models, and implementation tradeoffs.",
    file: "/research/Second-Phase Report_ Models of the Class.pdf",
  },
  {
    title: "Financial Literacy Programs at Peer Institutions",
    status: "PDF available",
    methods: "Peer institution review, program comparison, curriculum research",
    description:
      "This report looks at how peer colleges approach financial literacy and what Bowdoin could learn from them. It compares program formats, topics, and delivery models across institutions. The PDF gives readers the source material behind the later course-design work and shows how the recommendations were grounded.",
    file: "/research/Financial Literacy Programs at Peer Institutions.pdf",
  },
] as const;
