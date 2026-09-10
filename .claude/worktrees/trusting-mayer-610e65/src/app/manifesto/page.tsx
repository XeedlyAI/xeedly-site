import { ManifestoHero } from "@/components/manifesto/ManifestoHero";
import { TheChain } from "@/components/manifesto/TheChain";
import { FounderLetter } from "@/components/manifesto/FounderLetter";
import { ManifestoCTA } from "@/components/manifesto/ManifestoCTA";
import { BlogPostsCallout } from "@/components/blog/BlogPostsCallout";
import { ARTICLES } from "@/data/blog";

export const metadata = {
  title: "Manifesto — XeedlyAI",
  description:
    "We build software for people who refuse to be built by their businesses. Read why.",
};

export default function ManifestoPage() {
  return (
    <>
      <ManifestoHero />
      <TheChain />
      <FounderLetter />
      <BlogPostsCallout
        articles={ARTICLES}
        silo="principal-life"
        eyebrow="Continue Reading"
        heading="Where the manifesto goes next."
        body="Briefings that take these convictions further — into the cage, the catalyst, and the practical architecture of a business that runs without you in the middle of everything."
        theme="wash"
        seeAllLabel="Read PRINCIPAL-LIFE"
      />
      <ManifestoCTA />
    </>
  );
}
