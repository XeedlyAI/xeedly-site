import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductNavigator } from "@/components/products/ProductNavigator";
import {
  SovvrnSection,
  PropertyolioSection,
  PropertyDoczSection,
  PropertyJobzSection,
} from "@/components/products/IntelligenceProducts";
import { Transformation } from "@/components/products/Transformation";
import { GrowthDivider } from "@/components/products/GrowthDivider";
import {
  AIAdEngine,
  SEOAutopilot,
  AICommunication,
} from "@/components/products/GrowthProducts";
import { ReviewPayment } from "@/components/products/ReviewPayment";
import { GrowthSystemsCTA } from "@/components/products/GrowthSystemsCTA";

export const metadata = {
  title: "Products — XeedlyAI",
  description:
    "Purpose-built products. One intelligence architecture. Sovvrn, Propertyolio, PropertyDocz, PropertyJobz, plus Automated Growth Systems.",
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductNavigator />
      <SovvrnSection />
      <PropertyolioSection />
      <PropertyDoczSection />
      <PropertyJobzSection />
      <Transformation />
      <GrowthDivider />
      <AIAdEngine />
      <SEOAutopilot />
      <AICommunication />
      <ReviewPayment />
      <GrowthSystemsCTA />
    </>
  );
}
