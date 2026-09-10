export type ShowcaseAsset =
  | {
      type: "auto-scroll";
      src: string;
      alt: string;
      url: string;
      width: number;
      height: number;
      label: string;
    }
  | {
      type: "interaction";
      src: string;
      poster?: string;
      url: string;
      label: string;
      caption?: string;
    };

export type CaseStudyShowcase = {
  slug: string;
  headline: string;
  subheadline: string;
  assets: ShowcaseAsset[];
};

export const SHOWCASE_ASSETS: Record<string, CaseStudyShowcase> = {
  "core-hoa": {
    slug: "core-hoa",
    headline: "See it live.",
    subheadline:
      "The actual site, scrolling in real-time. Every section built to convert homeowners, board members, and property managers.",
    assets: [
      {
        type: "auto-scroll",
        src: "/showcase/core-hoa/full-page.png",
        alt: "Core HOA website — full page auto-scrolling preview showing hero, community listings, services, and contact sections",
        url: "corehoa.com",
        width: 1440,
        height: 6767,
        label: "Full Site Preview",
      },
    ],
  },
  "zion-concrete": {
    slug: "zion-concrete",
    headline: "Built to convert.",
    subheadline:
      "Eleven service pages, two regions, one Intelligence Console — a flatwork contractor's entire digital presence, auto-scrolling below.",
    assets: [
      {
        type: "auto-scroll",
        src: "/showcase/zion-concrete/full-page.png",
        alt: "Zion Concrete Specialists website — full page auto-scrolling preview showing hero, services, service areas, process, and contact sections",
        url: "zioncs.com",
        width: 1440,
        height: 8800,
        label: "Full Site Preview",
      },
    ],
  },
  "xeedly-platform": {
    slug: "xeedly-platform",
    headline: "Experience the platform.",
    subheadline:
      "The Intelligence Console isn't a mockup — it's a live AI endpoint. Watch the full journey from query to booking.",
    assets: [
      {
        type: "auto-scroll",
        src: "/showcase/xeedly-platform/full-page.png",
        alt: "XeedlyAI website — full page auto-scrolling preview showing the intelligence platform homepage",
        url: "xeedly.com",
        width: 1440,
        height: 9600,
        label: "Full Site",
      },
      {
        type: "interaction",
        src: "/showcase/xeedly-platform/console-journey.mp4",
        url: "xeedly.com",
        label: "Intelligence Console",
        caption: "Query → AI Response → Signal Cards → Booking",
      },
    ],
  },
  pando: {
    slug: "pando",
    headline: "The deal pipeline, live.",
    subheadline:
      "From agent submission to investor deals room. Every surface built for the people who use it.",
    assets: [
      {
        type: "auto-scroll",
        src: "/showcase/pando/full-page.png",
        alt: "Pando Midwest Investments website — full page auto-scrolling preview",
        url: "ownpando.com",
        width: 1440,
        height: 7800,
        label: "Marketing Site",
      },
    ],
  },
  sovvrn: {
    slug: "sovvrn",
    headline: "Intelligence before first shift.",
    subheadline:
      "The morning briefing, command center, and voice AI — built for operators who don't have time for dashboards.",
    assets: [
      {
        type: "auto-scroll",
        src: "/showcase/sovvrn/full-page.png",
        alt: "Sovvrn restaurant intelligence platform — full page auto-scrolling preview",
        url: "sovvrn.vercel.app",
        width: 1440,
        height: 8400,
        label: "Platform Preview",
      },
    ],
  },
};
