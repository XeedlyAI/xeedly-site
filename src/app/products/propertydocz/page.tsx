import type { Metadata } from "next";
import {
  LandingHero,
  ProblemSection,
  SetupFeeSection,
  LandingCTA,
  Pipeline,
  LandingSection,
  type ProblemSignal,
} from "@/components/products/ProductLanding";
import { PropertyDoczSolution } from "@/components/products/PropertyDoczSolution";
import { RevenueOpportunity } from "@/components/products/RevenueOpportunity";

export const metadata: Metadata = {
  title: "PropertyDocz — HOA Document Fulfillment Platform",
  description:
    "Bring HOA document fulfillment in-house. AI-powered document generation, your pricing, your revenue. Stop splitting with third-party companies. Setup from $500.",
  alternates: { canonical: "/products/propertydocz" },
  openGraph: {
    title: "PropertyDocz — HOA Document Fulfillment Platform",
    description:
      "Bring HOA document fulfillment in-house. Your pricing, your revenue. Setup from $500.",
    url: "/products/propertydocz",
  },
};

const PROBLEM_SIGNALS: ProblemSignal[] = [
  {
    severity: "red",
    title: "Revenue leakage",
    body:
      "Every document request that goes to CondoCerts, HomewiseDocs, or any third-party fulfillment company is revenue leaving your business. You do the data work. They take the lion's share.",
  },
  {
    severity: "amber",
    title: "No pricing control",
    body:
      "Third-party companies set the document prices, the turnaround times, and the customer experience. Your management company's name is on the community, but someone else controls the document pipeline.",
  },
  {
    severity: "amber",
    title: "Trust and data issues",
    body:
      "Sending your community data to a third party for fulfillment creates trust gaps. Data accuracy depends on systems you don't control. Errors reflect on your company, not theirs.",
  },
];

const PIPELINE_STAGES = [
  {
    label: "Order Placed",
    sublabel: "Agent or homeowner via your subdomain",
  },
  {
    label: "Data Harvested",
    sublabel: "AI pulls from your systems",
  },
  {
    label: "Document Generated",
    sublabel: "PDF packages assembled automatically",
  },
  {
    label: "Delivered",
    sublabel: "Secure download + email notification",
  },
  {
    label: "Revenue Settled",
    sublabel: "Real-time, per-transaction",
  },
];

export default function PropertyDoczPage() {
  return (
    <>
      {/* 1. Hero */}
      <LandingHero
        eyebrow="PropertyDocz"
        headlineBefore="Stop giving your document revenue"
        headlineAfter="to someone else."
        subhead="HOA management companies generate thousands of document requests every year. Resale certificates, refinance packages, status letters. Right now, a third-party company is fulfilling those documents, controlling the pricing, and keeping most of the revenue. PropertyDocz changes that."
      />

      {/* 2. The Problem */}
      <ProblemSection
        eyebrow="The Current Reality"
        signals={PROBLEM_SIGNALS}
      />

      {/* 3. The Solution — client component (two-col with visual) */}
      <PropertyDoczSolution />

      {/* 4. How It Works — pipeline */}
      <LandingSection
        bg="section-white"
        eyebrow="From Order To Revenue"
        heading="The pipeline that replaces the middleman."
        maxW="max-w-6xl"
      >
        <Pipeline stages={PIPELINE_STAGES} />
        <p className="mt-10 text-center text-[13px] text-[#64748b] italic max-w-2xl mx-auto leading-[1.7]">
          Every step automated. Every stage visible. No third-party involved —
          from the moment an agent places an order to the moment revenue lands
          in your account.
        </p>
      </LandingSection>

      {/* 5. The Revenue Opportunity */}
      <RevenueOpportunity />

      {/* 6. Getting Started — setup fee card */}
      <SetupFeeSection
        eyebrow="Get Started"
        includes="tenant configuration, association data import, subdomain setup, agent portal configuration, training session."
        note="Setup takes approximately one week. Your first documents can be live within days of onboarding."
      />

      {/* 7. Final CTA */}
      <LandingCTA
        headlineBefore="Your communities. Your documents."
        headlineAfter="Your revenue."
        secondaryLabel="See PropertyDocz Case Study →"
        secondaryHref="/case-studies/propertydocz"
      />
    </>
  );
}
