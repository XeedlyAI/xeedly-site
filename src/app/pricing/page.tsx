import type { Metadata } from "next";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingTabs } from "@/components/pricing/PricingTabs";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { PRICING_FAQS } from "@/data/pricing-faqs";
import { PricingCTA } from "@/components/pricing/PricingCTA";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Automated Growth Systems start at $297/mo. Intelligence Platforms are deployed per-vertical. Transparent, month-to-month pricing for both product lines.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — XeedlyAI",
    description:
      "Growth Systems from $297/mo. Intelligence Platforms deployed in 2–4 weeks.",
    url: "/pricing",
  },
};

export default function PricingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PricingHero />
      <PricingTabs />
      <PricingFAQ />
      <PricingCTA />
    </>
  );
}
