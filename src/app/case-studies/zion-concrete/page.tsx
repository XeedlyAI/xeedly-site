import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-studies/CaseStudyTemplate";
import { ZION_CONCRETE } from "@/data/case-studies";

export const metadata: Metadata = {
  title: ZION_CONCRETE.seoTitle,
  description: ZION_CONCRETE.seoDescription,
  alternates: { canonical: `/case-studies/${ZION_CONCRETE.slug}` },
};

export default function ZionConcreteCaseStudyPage() {
  return <CaseStudyTemplate slug={ZION_CONCRETE.slug} />;
}
