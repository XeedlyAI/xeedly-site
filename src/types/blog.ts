// XeedlyAI Blog — Type definitions for The Xeedly Briefings
// See docs/content/OUTPUT-CONTRACT.md for spec.

export type SiloId =
  | "principal-intelligence"
  | "multi-unit-ops"
  | "principal-life";

export type ArticleClass =
  | "front-door"
  | "high-intent-commercial"
  | "magnetizer"
  | "completer";

export type CalloutSeverity = "info" | "good" | "warn" | "crit";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading3"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | {
      type: "callout";
      severity: CalloutSeverity;
      title: string;
      body: string;
    }
  | { type: "quote"; text: string; cite?: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      aspect?: "16:9" | "4:3" | "1:1";
    }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "divider" };

export type ArticleSection = {
  heading: string; // H2
  blocks: ArticleBlock[];
};

export type Faq = { q: string; a: string };

export type Article = {
  slug: string;
  silo: SiloId;
  articleClass: ArticleClass;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  publishDate: string; // YYYY-MM-DD
  lastReviewedDate: string;
  author: string;
  readingTimeMinutes: number;
  heroImage: string;
  thumbnailImage: string;
  directAnswer: string;
  sections: ArticleSection[];
  trustSignals: {
    heading: string;
    body: string;
    caseStudies?: { slug: string; label: string }[];
  };
  faq: Faq[];
  cta: {
    heading: string;
    body: string;
    primaryAction: { label: string; href: string };
  };
  internalLinks: {
    pillar: string;
    laterals: string[]; // slugs (may include not-yet-published)
  };
};

export type Silo = {
  id: SiloId;
  name: string; // Display name in mono uppercase
  pillarPath: string;
  buyerState: string;
  oneLiner: string;
  voiceRegister: string;
  description: string;
};

export const SILOS: Record<SiloId, Silo> = {
  "principal-intelligence": {
    id: "principal-intelligence",
    name: "PRINCIPAL-INTELLIGENCE",
    pillarPath: "/platform",
    buyerState: "Curious about intelligence platforms",
    oneLiner:
      "For leaders who want to understand intelligence platforms before evaluating them.",
    voiceRegister:
      "Sharp, educational, direct — like a coach explaining the playbook.",
    description:
      "What operational intelligence is, how it works, and why dashboards don't deliver it.",
  },
  "multi-unit-ops": {
    id: "multi-unit-ops",
    name: "MULTI-UNIT-OPS",
    pillarPath: "/products",
    buyerState: "In operational pain",
    oneLiner:
      "Tactical, vertical-specific solutions for leaders running multi-unit, multi-tenant, or multi-property businesses.",
    voiceRegister:
      "Tactical, specific, peer-to-peer — like a fellow principal who's been there.",
    description:
      "How leaders actually run multi-unit and multi-tenant businesses better.",
  },
  "principal-life": {
    id: "principal-life",
    name: "PRINCIPAL-LIFE",
    pillarPath: "/manifesto",
    buyerState: "Reflective about purpose",
    oneLiner:
      "For leaders asking why they built this — and whether the way they're building it is sustainable.",
    voiceRegister:
      "Full conviction. Founder voice. Catalyst-not-cage.",
    description:
      "The business as catalyst, not cage. Why you build is the question that shapes how you build.",
  },
};

export const SILO_ORDER: SiloId[] = [
  "principal-intelligence",
  "multi-unit-ops",
  "principal-life",
];
