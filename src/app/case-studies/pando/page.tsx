import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-studies/CaseStudyTemplate";
import { PANDO } from "@/data/case-studies";

export const metadata: Metadata = {
  title: PANDO.seoTitle,
  description: PANDO.seoDescription,
  alternates: { canonical: `/case-studies/${PANDO.slug}` },
};

export default function PandoCaseStudyPage() {
  return <CaseStudyTemplate slug={PANDO.slug} />;
}
