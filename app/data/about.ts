import type { ImageKey } from "@/lib/images";

type ListItem =
  | string
  | {
      label: string;
      href: string;
      before?: string;
      after?: string;
    };

type SectionBlock =
  | string
  | {
      type: "list";
      items: ListItem[];
    };

export type AboutPhotoKey = "hero" | "graduation" | "mma" | "petra";

export interface AboutPhoto {
  image: ImageKey;
  alt: string;
  caption?: string | null;
  aspect?: "portrait" | "landscape" | "panorama";
  fit?: "cover" | "contain";
  objectPosition?: string;
  size?: "sm" | "md" | "lg";
}

export interface AboutSection {
  id: string;
  title: string;
  body: SectionBlock[];
  photoKey?: AboutPhotoKey;
}

export interface AboutPullQuote {
  id: string;
  text: string;
  sectionId: string;
}

export interface AboutPageContent {
  heroTitle: string;
  heroKicker: string;
  heroBody: string[];
  sections: AboutSection[];
  pullQuotes: AboutPullQuote[];
  photos: Record<AboutPhotoKey, AboutPhoto>;
}

export const aboutPageContent: AboutPageContent = {
  heroTitle: "About",
  heroKicker: "Adam Zaatar",
  heroBody: [
    "I’m Adam Zaatar, a Jordanian student at Bowdoin College studying economics and computer science.",
    "I grew up in Amman, went to a boarding school on scholarship, moved to the U.S. for college, and now split my time between building systems, studying markets, and training MMA.",
    "I’m fluent in Arabic and English, and intermediate–conversational in German.",
  ],
  sections: [
    {
      id: "background",
      title: "Background",
      photoKey: "graduation",
      body: [
        "I was born and raised in Amman and later attended King’s Academy, a boarding high school in Jordan, on scholarship. Living on campus from a young age meant taking full responsibility for my own time, work, and day-to-day life.",
        "At King’s, I helped organize and lead a Model United Nations conference, coordinating people, logistics, and deadlines under pressure. That experience made me comfortable stepping into ambiguous situations and taking ownership when there isn’t an obvious owner.",
        "I graduated in 2023 and came to Bowdoin College in Maine as an international student. Starting over in a new country and system has shaped how I think about resilience, risk, and opportunity.",
      ],
    },
    {
      id: "economics",
      title: "Economics: questions that don’t go away",
      body: [
        "Economics, for me, started with irritation at how messy the world looked.",
        "Why do profit margins in some industries stay abnormally high while wages and living standards feel stuck? Why do supposedly competitive markets still end up with a handful of firms quietly setting the tone for prices? Why does a shock in one part of the world translate into empty shelves and higher rents thousands of miles away?",
        "I’m interested in the places where theory says one thing and lived reality clearly says another:",
        {
          type: "list",
          items: [
            "markets where prices move faster than information,",
            "sectors where firms report record earnings during a crisis,",
            "policies that are meant to protect consumers but end up entrenching incumbents.",
          ],
        },
        "Economics gives me a language and a set of tools to interrogate those patterns instead of hand-waving them away. It’s how I think about power, incentives, and who actually benefits when we say the economy is doing well.",
      ],
    },
    {
      id: "computer-science",
      title: "Computer science: the machinery underneath",
      body: [
        "If economics explains who gets what and why, computer science explains how the machinery actually runs.",
        "Most of daily life now sits on top of invisible systems:",
        {
          type: "list",
          items: [
            "payment rails settling millions of transactions a second,",
            "recommendation engines shaping what people watch, buy, and read,",
            "routing and scheduling algorithms deciding which package arrives and which ride gets matched,",
            "cloud infrastructure scaling resources up and down in real time based on patterns most people never see.",
          ],
        },
        "I’m drawn to the fact that a tiny implementation detail in an algorithm can change how billions of dollars, or millions of people, move through the world.",
        "When a cloud region goes down, a pricing model shifts, or a security assumption breaks, I want to understand the whole stack of decisions that led there: the protocol, the architecture, the trade-offs, and the economic logic behind all of it.",
        "That’s why I study economics and computer science together. One describes behavior and incentives; the other describes the systems we’ve built to execute those incentives at scale. The interesting work, to me, sits exactly in that intersection.",
      ],
    },
    {
      id: "training",
      title: "Training",
      photoKey: "mma",
      body: [
        "Outside of class, I train at First Class Fitness & MMA in Brunswick, Maine. I bike there and back most days, year-round.",
        "MMA gives me direct, non-negotiable feedback. Preparation, focus, and discipline either show up or they don’t. Small details in timing and positioning matter, and you feel the cost of every mistake.",
        "Over time, I’ve built close relationships with professional fighters and fellow students, and developed a deep level of humility and respect toward my coaches, especially as I progress through the Brazilian Jiu-Jitsu belt system under black belt Tim Fawber.",
        "This technical, demanding, and honest environment lines up with how I like to approach work: serious preparation, composure under pressure, and a willingness to confront weaknesses instead of avoiding them.",
      ],
    },
    {
      id: "information-diet",
      title: "Staying plugged into the world",
      body: [
        "A software manager once told me that staying informed matters if I want to understand the technical and business constraints around engineering work.",
        "Since then, I’ve built a simple routine into my day:",
        {
          type: "list",
          items: [
            {
              before: "I listen to the ",
              label: "AI Daily Brief",
              href: "https://nam02.safelinks.protection.outlook.com/?url=https%3A%2F%2Faidailybrief.ai%2F&data=05%7C02%7Cazaatar%40bowdoin.edu%7C75fa31c479ca4c19b64008de1b0e2087%7C984e32e5f98a4600aa3227c3f948abe3%7C0%7C0%7C638977944638835207%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=rPASGja6IkcWuWtWWGjo%2By%2BuiyUQjAdjoEYZesjShk8%3D&reserved=0",
              after: " podcast on Spotify (usually at 1.5x) to stay on top of what’s moving in AI, tech, and policy.",
            },
            {
              before: "I read the ",
              label: "TLDR newsletter",
              href: "https://nam02.safelinks.protection.outlook.com/?url=https%3A%2F%2Ftldr.tech%2F&data=05%7C02%7Cazaatar%40bowdoin.edu%7C75fa31c479ca4c19b64008de1b0e2087%7C984e32e5f98a4600aa3227c3f948abe3%7C0%7C0%7C638977944638868548%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=Nc%2Bgw0DG9xa54wP3rRnl9ihIgBbWy%2FDtARqRk5Z5nPs%3D&reserved=0",
              after: " for a concise daily sweep of AI, economics, and technology headlines.",
            },
          ],
        },
        "On top of that, I keep up with politics and macro news because none of this exists in a vacuum. Regulation, elections, shocks, and policy decisions change the constraints that engineers and product teams operate under.",
        "I care about those links, so I treat this as part of my actual work, not a side hobby.",
      ],
    },
    {
      id: "how-i-work",
      title: "How I work",
      body: [
        "A few principles quietly shape how I like to operate:",
        {
          type: "list",
          items: [
            "Start from the person on the other side. Whether it’s a student using an app, a professor reading my work, or a future customer, I work backward from what problem we’re actually solving for them.",
            "Own the problem end-to-end. If I’m involved in something, I want to understand it deeply and see it through.",
            "Invent, then simplify. I enjoy complex ideas, but I don’t want unnecessarily complex systems.",
            "Be precise with resources. Whether it’s time, money, or complexity, I care about efficiency.",
            "Keep learning on my own. I’m comfortable saying I don’t know this yet and then closing that gap quickly.",
          ],
        },
        "Right now, I’m looking for environments where I can work with ambitious, principled people, earn trust by taking real responsibility, and keep building at the intersection of markets, infrastructure, and security.",
      ],
    },
  ],
  pullQuotes: [
    {
      id: "econ-vs-reality",
      text: "I’m interested in the places where theory says one thing and lived reality clearly says another.",
      sectionId: "economics",
    },
    {
      id: "intersection",
      text: "The interesting work, to me, sits exactly in the intersection of markets, infrastructure, and security.",
      sectionId: "computer-science",
    },
    {
      id: "informed",
      text: "If I want to be useful in this space, staying informed isn’t optional; it’s part of the job.",
      sectionId: "information-diet",
    },
  ],
  photos: {
    hero: {
      image: "profileProfessional",
      alt: "Professional portrait of Adam Zaatar",
      caption: null,
      aspect: "portrait",
      fit: "contain",
    },
    graduation: {
      image: "gradCloak",
      alt: "Graduation photo at King’s Academy",
      caption: "King’s Academy, Class of 2023.",
      aspect: "landscape",
      fit: "cover",
    },
    mma: {
      image: "mmaPortrait",
      alt: "Adam training MMA",
      caption: null,
      aspect: "portrait",
      fit: "cover",
      objectPosition: "center top",
    },
    petra: {
      image: "petraLandscape",
      alt: "Adam and his sister in Petra, Jordan",
      caption: "My sister and I, Petra, Jordan.",
      aspect: "portrait",
      fit: "cover",
      objectPosition: "center top",
      size: "sm",
    },
  },
};
