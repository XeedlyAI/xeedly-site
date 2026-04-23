import type { Metadata } from "next";
import { PricingHero } from "@/components/pricing/PricingHero";
import { GrowthTiers } from "@/components/pricing/GrowthTiers";
import { DigitalFoundation } from "@/components/pricing/DigitalFoundation";
import { OperationalSystems } from "@/components/pricing/OperationalSystems";
import { IntelligenceTiers } from "@/components/pricing/IntelligenceTiers";
import { PropertyProducts } from "@/components/pricing/PropertyProducts";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { PRICING_FAQS } from "@/data/pricing-faqs";
import { PricingCTA } from "@/components/pricing/PricingCTA";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Growth Systems from $297/mo. Digital Foundation from $2,500. Operational Systems from $4K. Intelligence Platforms deployed per-vertical.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — XeedlyAI",
    description:
      "Four tiers from marketing automation to full intelligence platforms. Transparent pricing.",
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

      {/* 1. Growth Systems — section-white */}
      <section className="section-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GrowthTiers />
        </div>
      </section>

      {/* 2. Digital Foundation — section-blue-wash (self-contained section) */}
      <DigitalFoundation />

      {/* 3. Operational Systems — section-white (self-contained section) */}
      <OperationalSystems />

      {/* 4. Intelligence Platforms — section-lavender-wash */}
      <section className="section-lavender-wash py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <IntelligenceTiers />
        </div>
      </section>

      {/* 5. Property Products — section-warm-wash (self-contained) */}
      <PropertyProducts />

      <PricingFAQ />
      <PricingCTA />
    </>
  );
}
