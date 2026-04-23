import type { MetadataRoute } from "next";

const SITE_URL = "https://xeedly.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/platform", priority: 0.9, changeFrequency: "weekly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/case-studies", priority: 0.85, changeFrequency: "monthly" },
    { path: "/case-studies/pando", priority: 0.75, changeFrequency: "monthly" },
    { path: "/case-studies/core-hoa", priority: 0.75, changeFrequency: "monthly" },
    { path: "/case-studies/propertydocz", priority: 0.75, changeFrequency: "monthly" },
    { path: "/case-studies/propertyjobz", priority: 0.75, changeFrequency: "monthly" },
    { path: "/case-studies/sovvrn", priority: 0.75, changeFrequency: "monthly" },
    { path: "/case-studies/xeedly-platform", priority: 0.7, changeFrequency: "monthly" },
    { path: "/booking", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  return pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
