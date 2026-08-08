import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/projects",
  "/projects/eventguard",
  "/projects/thread-library",
  "/projects/virtual-memory-pager",
  "/research",
  "/resume",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/projects" ? 0.9 : 0.7,
  }));
}
