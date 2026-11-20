import type { Metadata } from "next";
import { DesksHero } from "@/components/desks/DesksHero";
import { DeskStories } from "@/components/desks/DeskStories";
import { DeskPrimitives } from "@/components/desks/DeskPrimitives";
import { DeskCatalog } from "@/components/desks/DeskCatalog";
import { DesksHowItWorks } from "@/components/desks/DesksHowItWorks";
import { DeskSprintOffer } from "@/components/desks/DeskSprintOffer";
import { FAQSection } from "@/components/sections/faq-section";
import { DesksCTA } from "@/components/desks/DesksCTA";
import { DESK_FAQS, DESK_SPRINT } from "@/data/desks";

export const metadata: Metadata = {
  title: "Desks: A Phone-First App for Every Role",
  description:
    "One business, one brain, a desk for everyone who touches it. The Desk Sprint: one role's app built on your data, live in 21 days. $5,950 through Cyber Monday, then $995 a month.",
  alternates: { canonical: "/desks" },
  openGraph: {
    title: "Desks — XeedlyAI",
    description:
      "A phone-first desk for the field, the board, the treasurer, the contractor or the rep, built on the data you already have. The Desk Sprint, $5,950 through Cyber Monday.",
    url: "/desks",
  },
};

const SITE_URL = "https://xeedly.com";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: DESK_SPRINT.name,
  serviceType: "Custom business software: role-based mobile web app on existing data",
  description:
    "Consult, build and deploy one phone-first desk for one role in your business, on your existing data, under your brand, live in 21 days or less. Then monthly upkeep, changes, a weekly report and a question-answering agent.",
  provider: { "@type": "Organization", name: "XeedlyAI", url: SITE_URL },
  areaServed: "United States",
  url: `${SITE_URL}/desks`,
  offers: [
    {
      "@type": "Offer",
      name: "Desk Sprint (launch price)",
      price: DESK_SPRINT.salePrice,
      priceCurrency: "USD",
      priceValidUntil: DESK_SPRINT.saleEnds,
      availability: "https://schema.org/LimitedAvailability",
      url: `${SITE_URL}/desks#offer`,
    },
    {
      "@type": "Offer",
      name: "Maintain and grow",
      price: DESK_SPRINT.monthly,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: DESK_SPRINT.monthly,
        priceCurrency: "USD",
        unitText: "month",
      },
      url: `${SITE_URL}/desks#offer`,
    },
  ],
};

export default function DesksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <DesksHero />
      <DeskStories />
      <DeskPrimitives />
      <DeskCatalog />
      <DesksHowItWorks />
      <DeskSprintOffer />
      <FAQSection title="Questions, answered plainly" items={DESK_FAQS} />
      <DesksCTA />
    </>
  );
}
