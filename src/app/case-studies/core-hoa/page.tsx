import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-studies/CaseStudyTemplate";
import { CORE_HOA } from "@/data/case-studies";

export const metadata: Metadata = {
  title: CORE_HOA.seoTitle,
  description: CORE_HOA.seoDescription,
  alternates: { canonical: `/case-studies/${CORE_HOA.slug}` },
};

export default function CoreHoaCaseStudyPage() {
  return <CaseStudyTemplate slug={CORE_HOA.slug} />;
}
