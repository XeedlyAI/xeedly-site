import { Hero } from "@/components/home/Hero";
import { IntelligenceStack } from "@/components/home/IntelligenceStack";
import { IntelligenceConsole } from "@/components/home/IntelligenceConsole";
import { Products } from "@/components/home/Products";
import { GrowthSystems } from "@/components/home/GrowthSystems";
import { BuiltDifferent } from "@/components/home/BuiltDifferent";
import { FooterCTA } from "@/components/home/FooterCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <IntelligenceStack />
      <IntelligenceConsole />
      <Products />
      <GrowthSystems />
      <BuiltDifferent />
      <FooterCTA />
    </>
  );
}
