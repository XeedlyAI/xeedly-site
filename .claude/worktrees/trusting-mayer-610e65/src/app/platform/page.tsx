import { PlatformHero } from "@/components/platform/PlatformHero";
import { Pipeline } from "@/components/platform/Pipeline";
import { LiveDemo } from "@/components/platform/LiveDemo";
import { ThreeTiersDeep } from "@/components/platform/ThreeTiersDeep";
import { DeploymentModel } from "@/components/platform/DeploymentModel";
import { OperationsIsMarketing } from "@/components/platform/OperationsIsMarketing";
import { PlatformCTA } from "@/components/platform/PlatformCTA";
import { BlogPostsCallout } from "@/components/blog/BlogPostsCallout";
import { ARTICLES } from "@/data/blog";

export const metadata = {
  title: "Platform — XeedlyAI",
  description:
    "Intelligence architecture, deployed in weeks. Event ingestion, signal detection, proactive delivery — same architecture across any vertical.",
};

export default function PlatformPage() {
  return (
    <>
      <PlatformHero />
      <Pipeline />
      <LiveDemo />
      <ThreeTiersDeep />
      <BlogPostsCallout
        articles={ARTICLES}
        silo="principal-intelligence"
        eyebrow="Deeper Reading"
        heading="How the architecture actually works."
        body="Briefings on operational intelligence, the three-tier delivery model, and the build-vs-buy calculation that's changed in the last 18 months."
        theme="light"
        seeAllLabel="Read PRINCIPAL-INTELLIGENCE"
      />
      <DeploymentModel />
      <OperationsIsMarketing />
      <PlatformCTA />
    </>
  );
}
