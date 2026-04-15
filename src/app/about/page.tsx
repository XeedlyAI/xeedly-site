import { AboutHero } from "@/components/about/AboutHero";
import { Thesis } from "@/components/about/Thesis";
import { HowWeBuild } from "@/components/about/HowWeBuild";
import { AboutCTA } from "@/components/about/AboutCTA";

export const metadata = {
  title: "About — XeedlyAI",
  description:
    "One founder. One thesis. Every business needs an intelligence layer.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Thesis />
      <HowWeBuild />
      <AboutCTA />
    </>
  );
}
