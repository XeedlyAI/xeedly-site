// Articles registry — add new articles here as they ship.
// Source: docs/content/EDITORIAL-CALENDAR.md

import type { Article, SiloId } from "@/types/blog";
import { article as whatIsOperationalIntelligence } from "./articles/what-is-operational-intelligence";

export const ARTICLES: Article[] = [
  whatIsOperationalIntelligence,
  // Add new articles here in publishing order (newest first for display).
];

export const ARTICLES_BY_SLUG: Record<string, Article> = ARTICLES.reduce(
  (acc, a) => {
    acc[a.slug] = a;
    return acc;
  },
  {} as Record<string, Article>,
);

export function getArticlesBySilo(silo: SiloId): Article[] {
  return ARTICLES.filter((a) => a.silo === silo).sort((a, b) =>
    b.publishDate.localeCompare(a.publishDate),
  );
}

export function getRecentArticles(limit = 3): Article[] {
  return [...ARTICLES]
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
    .slice(0, limit);
}

export function getLateralSiblings(article: Article, limit = 3): Article[] {
  const candidates = getArticlesBySilo(article.silo).filter(
    (a) => a.slug !== article.slug,
  );
  return candidates.slice(0, limit);
}
