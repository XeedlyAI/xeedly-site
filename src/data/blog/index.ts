// Articles registry — add new articles here as they ship.
// Source: docs/content/EDITORIAL-CALENDAR.md
// Newest first so the list flows in reverse-chronological order by default.

import type { Article, SiloId } from "@/types/blog";
import { article as vendorCompliance } from "./articles/vendor-compliance-at-scale-property-management";
import { article as buildVsBuy } from "./articles/building-intelligence-platforms-vs-buying-bi-tools";
import { article as catalystNotCage } from "./articles/catalyst-not-cage-business-purpose";
import { article as multiUnitBottleneck } from "./articles/multi-unit-bottleneck-constraint-at-five-units";
import { article as threeTierModel } from "./articles/three-tier-intelligence-model-glance-briefing-deep";
import { article as buildBusinessRunsWithoutYou } from "./articles/build-a-business-that-runs-without-you";
import { article as hoaDocumentRevenue } from "./articles/hoa-document-revenue-management-companies-lose";
import { article as whatIsOperationalIntelligence } from "./articles/what-is-operational-intelligence";

export const ARTICLES: Article[] = [
  vendorCompliance,
  buildVsBuy,
  catalystNotCage,
  multiUnitBottleneck,
  threeTierModel,
  buildBusinessRunsWithoutYou,
  hoaDocumentRevenue,
  whatIsOperationalIntelligence,
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
