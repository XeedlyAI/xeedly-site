import type { MetadataRoute } from "next";
import { ARTICLES } from "@/data/blog";
import { SILO_ORDER } from "@/types/blog";

const SITE_URL = "https://xeedly.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    lastModified: string;
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly", lastModified: "2026-05-30" },
    { path: "/platform", priority: 0.9, changeFrequency: "weekly", lastModified: "2026-05-17" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly", lastModified: "2026-05-17" },
    { path: "/products/propertydocz", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-04-24" },
    { path: "/products/propertyjobz", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-04-24" },
    { path: "/case-studies", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-05-06" },
    { path: "/case-studies/pando", priority: 0.75, changeFrequency: "monthly", lastModified: "2026-04-22" },
    { path: "/case-studies/core-hoa", priority: 0.75, changeFrequency: "monthly", lastModified: "2026-04-22" },
    { path: "/case-studies/propertydocz", priority: 0.75, changeFrequency: "monthly", lastModified: "2026-04-23" },
    { path: "/case-studies/propertyjobz", priority: 0.75, changeFrequency: "monthly", lastModified: "2026-04-23" },
    { path: "/case-studies/sovvrn", priority: 0.75, changeFrequency: "monthly", lastModified: "2026-04-22" },
    { path: "/case-studies/xeedly-platform", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-04-22" },
    { path: "/case-studies/zion-concrete", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-05-06" },
    { path: "/blog", priority: 0.85, changeFrequency: "weekly", lastModified: "2026-05-17" },
    { path: "/manifesto", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-05-17" },
    { path: "/booking", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-04-22" },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-05-01" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly", lastModified: "2026-05-17" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-04-22" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-04-15" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-05-01" },
  ];

  const staticEntries = pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: new Date(`${p.lastModified}T00:00:00`),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // Silo index pages — updated when new articles are added
  const siloEntries = SILO_ORDER.map((silo) => ({
    url: `${SITE_URL}/blog/${silo}`,
    lastModified: new Date("2026-05-17T00:00:00"),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  // Individual article pages
  const articleEntries = ARTICLES.map((a) => ({
    url: `${SITE_URL}/blog/${a.silo}/${a.slug}`,
    lastModified: new Date(`${a.lastReviewedDate}T00:00:00`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...siloEntries, ...articleEntries];
}
