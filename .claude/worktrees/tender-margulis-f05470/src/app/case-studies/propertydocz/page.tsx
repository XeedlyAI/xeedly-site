import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-studies/CaseStudyTemplate";
import { PROPERTYDOCZ } from "@/data/case-studies";

export const metadata: Metadata = {
  title: PROPERTYDOCZ.seoTitle,
  description: PROPERTYDOCZ.seoDescription,
  alternates: { canonical: `/case-studies/${PROPERTYDOCZ.slug}` },
};

export default function PropertyDoczCaseStudyPage() {
  return <CaseStudyTemplate slug={PROPERTYDOCZ.slug} />;
}
