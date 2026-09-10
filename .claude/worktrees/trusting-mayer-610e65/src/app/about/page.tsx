import { AboutHero } from "@/components/about/AboutHero";
import { Thesis } from "@/components/about/Thesis";
import { HowWeBuild } from "@/components/about/HowWeBuild";
import { WhyThisMatters } from "@/components/about/WhyThisMatters";
import { AboutCTA } from "@/components/about/AboutCTA";
import { BlogPostsCallout } from "@/components/blog/BlogPostsCallout";
import { ARTICLES } from "@/data/blog";

export const metadata = {
  title: "About — XeedlyAI",
  description:
    "One founder. One thesis. Every business needs an intelligence layer.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Thesis />
      <HowWeBuild />
      <WhyThisMatters />
      <BlogPostsCallout
        articles={ARTICLES}
        silo="principal-life"
        eyebrow="More from Shad"
        heading="The founder's deeper thinking."
        body="Briefings on building businesses that catalyze the people who build them — instead of consuming them."
        theme="wash"
        seeAllLabel="Read PRINCIPAL-LIFE"
      />
      <AboutCTA />
    </>
  );
}
