import type { Metadata } from "next";
import { CaseStudiesOverview } from "@/components/case-studies/CaseStudiesOverview";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real XeedlyAI deployments: Pando Midwest Investments (property investment), Core HOA (property management), Sovvrn (restaurant intelligence). Same architecture, proven across verticals.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return <CaseStudiesOverview />;
}
