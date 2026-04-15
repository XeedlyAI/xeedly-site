import { PlatformHero } from "@/components/platform/PlatformHero";
import { Pipeline } from "@/components/platform/Pipeline";
import { LiveDemo } from "@/components/platform/LiveDemo";
import { ThreeTiersDeep } from "@/components/platform/ThreeTiersDeep";
import { DeploymentModel } from "@/components/platform/DeploymentModel";
import { PlatformCTA } from "@/components/platform/PlatformCTA";

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
      <DeploymentModel />
      <PlatformCTA />
    </>
  );
}
