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
    "Digital Foundation from $2,500. Ongoing plans from $199/mo. Operational Systems from $4K. Intelligence Platforms deployed per-vertical.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — XeedlyAI",
    description:
      "From foundation to intelligence platform. Transparent pricing across every tier.",
    url: "/pricing",
  },
};

/**
 * Flywheel connector — narrative bridges between pricing tiers.
 * Operations IS marketing. Each tier compounds the others.
 */
function FlywheelConnector({
  eyebrow,
  text,
}: {
  eyebrow: string;
  text: string;
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10 md:py-14 text-center">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64748b]">
          {eyebrow}
        </div>
        <p className="mt-3 text-[15px] leading-[1.7] text-[#334155]">{text}</p>
      </div>
    </section>
  );
}

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

      {/* 1. Digital Foundation — entry point for everything */}
      <DigitalFoundation />

      {/* Flywheel connector 1 */}
      <FlywheelConnector
        eyebrow="The Flywheel"
        text="Operations IS marketing. When you're easy to find, fast to respond, and impossible to forget — growth takes care of itself. Start with the foundation. Grow in the direction you need."
      />

      {/* 2. Growth Systems — ongoing plans (Maintain / Get Found / Get Chosen) */}
      <section className="section-white pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GrowthTiers />
        </div>
      </section>

      {/* Flywheel connector 2 */}
      <FlywheelConnector
        eyebrow="Two Paths, One Destination"
        text="Growth Systems make you easy to find and choose. Operational Systems make your business run like clockwork. Together, they compound — because the better your operations, the less you need to spend on marketing. And when you do invest in growth, it sticks."
      />

      {/* 3. Operational Systems */}
      <OperationalSystems />

      {/* Flywheel connector 3 */}
      <FlywheelConnector
        eyebrow="The Intelligence Layer"
        text="Every system you build generates operational data. Every piece of data becomes a signal. When you're ready to connect it all — that's the platform."
      />

      {/* 4. Intelligence Platforms */}
      <section className="section-lavender-wash py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <IntelligenceTiers />
        </div>
      </section>

      {/* 5. Property Products */}
      <PropertyProducts />

      <PricingFAQ />
      <PricingCTA />
    </>
  );
}
