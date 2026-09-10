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
  SEOAutopilot,
  AICommunication,
} from "@/components/products/GrowthProducts";
import { ReviewPayment } from "@/components/products/ReviewPayment";
import { GrowthSystemsCTA } from "@/components/products/GrowthSystemsCTA";
import { BlogPostsCallout } from "@/components/blog/BlogPostsCallout";
import { ARTICLES } from "@/data/blog";

export const metadata = {
  title: "Products — XeedlyAI",
  description:
    "Purpose-built products. One intelligence architecture. Sovvrn, Propertyolio, PropertyDocz, PropertyJobz, plus AI-powered Growth Systems.",
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
      <BlogPostsCallout
        articles={ARTICLES}
        silo="multi-unit-ops"
        eyebrow="Deep Dives"
        heading="How leaders actually use these products."
        body="Briefings on the operational problems these products solve — from document revenue capture to vendor compliance at scale to the multi-unit bottleneck."
        theme="wash"
        seeAllLabel="Read MULTI-UNIT-OPS"
      />
      <Transformation />
      <GrowthDivider />
      <SEOAutopilot />
      <AICommunication />
      <ReviewPayment />
      <GrowthSystemsCTA />
    </>
  );
}
