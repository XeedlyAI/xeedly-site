// Articles registry — add new articles here as they ship.
// Source: docs/content/EDITORIAL-CALENDAR.md
// Newest first so the list flows in reverse-chronological order by default.

import type { Article, SiloId } from "@/types/blog";

// Newest batch — Phase 1 matrix final completers
import { article as marginEquation } from "./articles/margin-equation";
import { article as productivityNotIdentity } from "./articles/productivity-responsibility-not-identity";
import { article as whySuccessDoesntFulfill } from "./articles/why-success-doesnt-fulfill";
import { article as restaurantOperatorMorningBriefing } from "./articles/restaurant-operator-morning-briefing";
import { article as realEstatePipelineIntelligence } from "./articles/real-estate-pipeline-intelligence";
import { article as signalEnginesVsReports } from "./articles/signal-engines-vs-reports";
import { article as morningBriefingReplaces7am } from "./articles/morning-briefing-replaces-7am-meeting";
import { article as businessSignalsMostMissed } from "./articles/business-signals-most-missed";

// Previous matrix completers
import { article as singleSourceOfTruth } from "./articles/single-source-of-truth-problem";
import { article as leadingVsOperating } from "./articles/leading-vs-operating";
import { article as founderModeTrap } from "./articles/founder-mode-trap";
import { article as chainFramework } from "./articles/desire-priorities-decisions-actions-happiness";
import { article as eventBus101 } from "./articles/event-bus-101";
import { article as crossSystemCorrelation } from "./articles/cross-system-correlation";

// Home Services Operator articles (HS-1 through HS-8)
import { article as contractorOperatingStack } from "./articles/contractor-operating-stack";
import { article as reviewsRoutingResponseTime } from "./articles/reviews-routing-response-time";
import { article as aiVoiceAgentsHomeServices } from "./articles/ai-voice-agents-home-services";
import { article as vendorComplianceContractorSide } from "./articles/vendor-compliance-contractor-side";
import { article as multiCrewQuoteToCash } from "./articles/multi-crew-quote-to-cash";
import { article as fieldServiceIntelligence } from "./articles/field-service-intelligence";
import { article as getOnHoaPreferredVendorList } from "./articles/get-on-hoa-preferred-vendor-list";
import { article as multiTruckOperationsTrap } from "./articles/multi-truck-operations-trap";

// Multi-Unit Principal articles (#1 through #8)
import { article as vendorCompliance } from "./articles/vendor-compliance-at-scale-property-management";
import { article as buildVsBuy } from "./articles/building-intelligence-platforms-vs-buying-bi-tools";
import { article as catalystNotCage } from "./articles/catalyst-not-cage-business-purpose";
import { article as multiUnitBottleneck } from "./articles/multi-unit-bottleneck-constraint-at-five-units";
import { article as threeTierModel } from "./articles/three-tier-intelligence-model-glance-briefing-deep";
import { article as buildBusinessRunsWithoutYou } from "./articles/build-a-business-that-runs-without-you";
import { article as hoaDocumentRevenue } from "./articles/hoa-document-revenue-management-companies-lose";
import { article as whatIsOperationalIntelligence } from "./articles/what-is-operational-intelligence";

export const ARTICLES: Article[] = [
  marginEquation,
  productivityNotIdentity,
  whySuccessDoesntFulfill,
  restaurantOperatorMorningBriefing,
  realEstatePipelineIntelligence,
  signalEnginesVsReports,
  morningBriefingReplaces7am,
  businessSignalsMostMissed,
  singleSourceOfTruth,
  leadingVsOperating,
  founderModeTrap,
  chainFramework,
  eventBus101,
  crossSystemCorrelation,
  contractorOperatingStack,
  reviewsRoutingResponseTime,
  aiVoiceAgentsHomeServices,
  vendorComplianceContractorSide,
  multiCrewQuoteToCash,
  fieldServiceIntelligence,
  getOnHoaPreferredVendorList,
  multiTruckOperationsTrap,
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
