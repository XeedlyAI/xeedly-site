import { ManifestoHero } from "@/components/manifesto/ManifestoHero";
import { TheChain } from "@/components/manifesto/TheChain";
import { FounderLetter } from "@/components/manifesto/FounderLetter";
import { ManifestoCTA } from "@/components/manifesto/ManifestoCTA";

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
      <ManifestoCTA />
    </>
  );
}
