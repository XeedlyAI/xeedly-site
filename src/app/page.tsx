import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { IntelligenceStack } from "@/components/home/IntelligenceStack";
import { IntelligenceConsole } from "@/components/home/IntelligenceConsole";
import { Products } from "@/components/home/Products";
import { CaseStudiesPreview } from "@/components/home/CaseStudiesPreview";
import { GrowthSystems } from "@/components/home/GrowthSystems";
import { BuiltDifferent } from "@/components/home/BuiltDifferent";
import { FooterCTA } from "@/components/home/FooterCTA";

export const metadata: Metadata = {
  title: "AI intelligence platforms for operational businesses",
  description:
    "Your business generates thousands of signals. You're missing most of them. XeedlyAI turns operational data into daily intelligence.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <IntelligenceStack />
      <IntelligenceConsole />
      <Products />
      <CaseStudiesPreview />
      <GrowthSystems />
      <BuiltDifferent />
      <FooterCTA />
    </>
  );
}
