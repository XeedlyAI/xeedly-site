import type { Metadata } from "next";
import {
  LandingHero,
  ProblemSection,
  SetupFeeSection,
  LandingCTA,
  type ProblemSignal,
} from "@/components/products/ProductLanding";
import { PropertyJobzSystems } from "@/components/products/PropertyJobzSystems";
import { PropertyJobzRevenue } from "@/components/products/PropertyJobzRevenue";
import { PropertyJobzAI } from "@/components/products/PropertyJobzAI";

export const metadata: Metadata = {
  title: "PropertyJobz — HOA Vendor Management Platform",
  description:
    "Turn HOA vendor management into a managed marketplace. Vendor verification, preferred vendor program, RFP and job management. New revenue stream for management companies. Setup from $500.",
  alternates: { canonical: "/products/propertyjobz" },
  openGraph: {
    title: "PropertyJobz — HOA Vendor Management Platform",
    description:
      "Turn HOA vendor management into a managed marketplace. New revenue stream for management companies. Setup from $500.",
    url: "/products/propertyjobz",
  },
};

const PROBLEM_SIGNALS: ProblemSignal[] = [
  {
    severity: "red",
    title: "Unverified vendors on your properties",
    body:
      "Insurance lapses go unnoticed. License expirations slip through. One uninsured vendor incident can expose your management company and your communities to significant liability.",
  },
  {
    severity: "amber",
    title: "No structured vendor program",
    body:
      "Vendors get work through word of mouth and personal relationships. No formal qualification process. No competitive bidding. No way for board members to see who's been vetted and who hasn't.",
  },
  {
    severity: "amber",
    title: "Manual everything",
    body:
      "RFPs via email. Job tracking via spreadsheet. Vendor compliance via memory. Every step is a manual process that scales linearly with the number of communities you manage.",
  },
];

export default function PropertyJobzPage() {
  return (
    <>
      {/* 1. Hero */}
      <LandingHero
        eyebrow="PropertyJobz"
        headlineBefore="Turn vendor management"
        headlineAfter="into a revenue engine."
        subhead="HOA management companies already manage vendor relationships. PropertyJobz turns that work into a structured, automated marketplace — where vendors pay for verified access to your communities, and every job is tracked from RFP to completion."
      />

      {/* 2. The Problem */}
      <ProblemSection
        eyebrow="The Current Reality"
        signals={PROBLEM_SIGNALS}
      />

      {/* 3. Three Systems */}
      <PropertyJobzSystems />

      {/* 4. Revenue Model — why vendors pay */}
      <PropertyJobzRevenue />

      {/* 5. AI Assistant */}
      <PropertyJobzAI />

      {/* 6. Getting Started — setup fee card */}
      <SetupFeeSection
        eyebrow="Get Started"
        includes="tenant configuration, vendor registry import, community mapping, preferred vendor program setup, training session."
        note="Setup takes approximately two weeks. Your vendor program can be accepting applications within days of launch."
      />

      {/* 7. Final CTA */}
      <LandingCTA
        headlineBefore="Ready to stop"
        headlineAfter="giving away revenue?"
        subhead="Two revenue streams. $1,000 combined setup. We only earn when you earn."
        secondaryLabel="See Pricing →"
        secondaryHref="/pricing"
      />
    </>
  );
}
