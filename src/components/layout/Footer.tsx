import Link from "next/link";
import Image from "next/image";
import { CONTACT, MAILTO, TEL } from "@/lib/contact";

const PRODUCT_LINKS = [
  { href: "https://sovvrn.com", label: "Sovvrn", external: true },
  { href: "/products#propertyolio", label: "Propertyolio" },
  { href: "/products#propertydocz", label: "PropertyDocz" },
  { href: "/products#propertyjobz", label: "PropertyJobz" },
];

const COMPANY_LINKS = [
  { href: "/platform", label: "Platform" },
  { href: "/products", label: "Products" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="section-dark relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage: "url(/topo-bg.svg)",
          backgroundSize: "cover",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center mb-5" aria-label="XeedlyAI home">
              <Image
                src="/images/logos/xeedly-logo-new@2x.png"
                alt="XeedlyAI"
                width={820}
                height={350}
                className="h-14 md:h-16 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-[#94a3b8]">
              AI-native intelligence platforms and automated growth systems
              for operational businesses.
            </p>
          </div>

          <div className="md:col-span-2 text-left">
            <div
              className="rounded-lg border px-4 py-3 h-full"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <div className="font-mono text-[11px] font-semibold tracking-[0.08em] uppercase text-[#64748b] mb-3">
                Products
              </div>
              <ul className="space-y-2.5">
                {PRODUCT_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#f1f5f9] hover:text-[#38b6ff] transition-colors"
                      {...(l.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-2 text-left">
            <div
              className="rounded-lg border px-4 py-3 h-full"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <div className="font-mono text-[11px] font-semibold tracking-[0.08em] uppercase text-[#64748b] mb-3">
                Company
              </div>
              <ul className="space-y-2.5">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#f1f5f9] hover:text-[#38b6ff] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-4 text-left">
            <div
              className="rounded-lg border px-4 py-3 h-full"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <div className="font-mono text-[11px] font-semibold tracking-[0.08em] uppercase text-[#64748b] mb-3">
                Contact
              </div>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={MAILTO}
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#f1f5f9] hover:text-[#38b6ff] transition-colors break-all"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={TEL}
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#f1f5f9] hover:text-[#38b6ff] transition-colors"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64748b]">
                    {CONTACT.locationShort}
                  </span>
                </li>
                <li>
                  <a
                    href={CONTACT.calendar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#38b6ff] hover:text-[#f1f5f9] transition-colors"
                  >
                    Book a Demo →
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start justify-start gap-4 text-left">
          <p className="text-[12px] text-[#64748b] font-mono">
            © 2026 XeedlyAI. AI intelligence platforms for operational
            businesses.
          </p>
          <ul className="flex items-center gap-6">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64748b] hover:text-[#94a3b8] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
