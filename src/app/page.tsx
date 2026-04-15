type PlaceholderProps = {
  id: string;
  bg: string;
  title: string;
  note: string;
  tone?: "dark" | "light";
};

function Placeholder({ id, bg, title, note, tone = "light" }: PlaceholderProps) {
  const subColor = tone === "dark" ? "text-[#94a3b8]" : "text-[#64748b]";
  return (
    <section id={id} className={`${bg} py-24 md:py-32`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          {title}
        </h2>
        <p className={`mt-4 text-sm font-mono ${subColor}`}>{note}</p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO — Dark section, main headline, subhead, CTAs */}
      <Placeholder
        id="hero"
        bg="section-dark"
        tone="dark"
        title="XeedlyAI"
        note="HERO — Coming in Prompt 2"
      />

      {/* THREE TIER — The Intelligence Stack: Glance → Briefing → Deep */}
      <Placeholder
        id="three-tier"
        bg="section-white"
        title="The Intelligence Stack"
        note="THREE TIER — Coming in Prompt 2"
      />

      {/* INTELLIGENCE CONSOLE — Interactive query demo (the signature piece) */}
      <Placeholder
        id="console"
        bg="section-blue-wash"
        title="Intelligence Console"
        note="INTELLIGENCE CONSOLE — Coming in Prompt 2"
      />

      {/* PRODUCTS — Sovvrn, Propertyolio, PropertyDocz, PropertyJobz cards */}
      <Placeholder
        id="products"
        bg="section-white"
        title="Products"
        note="PRODUCTS — Coming in Prompt 2"
      />

      {/* BUILT DIFFERENT — Three differentiator cards */}
      <Placeholder
        id="built-different"
        bg="section-lavender-wash"
        title="Built Different"
        note="BUILT DIFFERENT — Coming in Prompt 2"
      />

      {/* FOOTER CTA — Dark section, closing headline, CTA button */}
      <Placeholder
        id="cta"
        bg="section-dark"
        tone="dark"
        title="Ready to deploy intelligence?"
        note="FOOTER CTA — Coming in Prompt 2"
      />
    </>
  );
}
