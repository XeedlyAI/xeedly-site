"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// ---------------------------------------------------------------------------
// Build Tier catalog
// ---------------------------------------------------------------------------

type BuildTier = {
  id: string;
  name: string;
  sub: string;
  accent: string;
  accentTint: string;
  fixedTotal?: number; // dollars
  minTotal?: number;
  maxTotal?: number;
};

const BUILD_TIERS: BuildTier[] = [
  {
    id: "vendor_build_495",
    name: "Rapid Launch",
    sub: "$495 · one-time",
    accent: "#14b8a6",
    accentTint: "rgba(20,184,166,0.1)",
    fixedTotal: 495,
  },
  {
    id: "vendor_build_995",
    name: "Standard Launch",
    sub: "$995 · one-time",
    accent: "#14b8a6",
    accentTint: "rgba(20,184,166,0.1)",
    fixedTotal: 995,
  },
  {
    id: "vendor_build_1495",
    name: "Full Launch",
    sub: "$1,495 · one-time",
    accent: "#14b8a6",
    accentTint: "rgba(20,184,166,0.1)",
    fixedTotal: 1495,
  },
  {
    id: "digital_foundation",
    name: "Digital Foundation",
    sub: "$2,500 · 50/50 split",
    accent: "#0A8FD4",
    accentTint: "rgba(10,143,212,0.12)",
    fixedTotal: 2500,
  },
  {
    id: "operational_systems",
    name: "Operational Systems",
    sub: "$4K–$7K · enter amount",
    accent: "#14b8a6",
    accentTint: "rgba(20,184,166,0.1)",
    minTotal: 4000,
    maxTotal: 7000,
  },
  {
    id: "intelligence_platform",
    name: "Intelligence Platform",
    sub: "$5K–$25K · enter amount",
    accent: "#8b5cf6",
    accentTint: "rgba(139,92,246,0.1)",
    minTotal: 5000,
    maxTotal: 25000,
  },
  {
    id: "propertydocz_setup",
    name: "PropertyDocz",
    sub: "$500 · one-time",
    accent: "#38b6ff",
    accentTint: "rgba(56,182,255,0.1)",
    fixedTotal: 500,
  },
  {
    id: "propertyjobz_setup",
    name: "PropertyJobz",
    sub: "$500 · one-time",
    accent: "#38b6ff",
    accentTint: "rgba(56,182,255,0.1)",
    fixedTotal: 500,
  },
  {
    id: "property_combined",
    name: "Property Combined",
    sub: "$1,000 · one-time",
    accent: "#38b6ff",
    accentTint: "rgba(56,182,255,0.1)",
    fixedTotal: 1000,
  },
];

// ---------------------------------------------------------------------------
// Service tiers
// ---------------------------------------------------------------------------

type ServiceTier = {
  key: "foundation" | "growth" | "authority";
  label: string;
  price: string;
  monthlyCents: number;
};

const SERVICE_TIERS: ServiceTier[] = [
  { key: "foundation", label: "Foundation", price: "$199/mo", monthlyCents: 19900 },
  { key: "growth", label: "Growth", price: "$299/mo", monthlyCents: 29900 },
  { key: "authority", label: "Authority", price: "$499/mo", monthlyCents: 49900 },
];

// ---------------------------------------------------------------------------
// SOW defaults
// ---------------------------------------------------------------------------

type LineItem = {
  id: string;
  section: "build" | "service";
  description: string;
  quantity: number;
  unit_price: number; // cents
  amount: number; // cents
};

const FULL_SERVICE_BUILD_ITEMS: Omit<LineItem, "id">[] = [
  { section: "build", description: "Custom-coded website built on Next.js — fully portable, client owns all code", quantity: 1, unit_price: 0, amount: 0 },
  { section: "build", description: "XeedlyAI design system — branded, conversion-optimized, professionally designed", quantity: 1, unit_price: 0, amount: 0 },
  { section: "build", description: "AI Intelligence Console — embedded AI that answers visitor questions and qualifies leads", quantity: 1, unit_price: 0, amount: 0 },
  { section: "build", description: "Custom Google Calendar booking system — no third-party dependencies", quantity: 1, unit_price: 0, amount: 0 },
  { section: "build", description: "Stripe payment gateway integration", quantity: 1, unit_price: 0, amount: 0 },
  { section: "build", description: "Client admin panel — manage content, bookings, and site data independently", quantity: 1, unit_price: 0, amount: 0 },
  { section: "build", description: "Core30 content build — 30 foundational content pieces establishing topical authority", quantity: 1, unit_price: 0, amount: 0 },
  { section: "build", description: "Google Business Profile optimization and full content alignment", quantity: 1, unit_price: 0, amount: 0 },
  { section: "build", description: "AI search visibility architecture — structured data, schema markup, LLM-readable site structure", quantity: 1, unit_price: 0, amount: 0 },
  { section: "build", description: "Local listing site submissions and NAP consistency audit", quantity: 1, unit_price: 0, amount: 0 },
  { section: "build", description: "Initial backlink foundation", quantity: 1, unit_price: 0, amount: 0 },
  { section: "build", description: "GA4, Google Search Console, and heatmap analytics setup", quantity: 1, unit_price: 0, amount: 0 },
  { section: "build", description: "Brand and go-to-market strategy defined and embedded in site architecture", quantity: 1, unit_price: 0, amount: 0 },
  { section: "build", description: "Vercel hosting setup and configuration included", quantity: 1, unit_price: 0, amount: 0 },
  { section: "build", description: "2-week build timeline from payment receipt", quantity: 1, unit_price: 0, amount: 0 },
];

const FULL_SERVICE_ONGOING_ITEMS: Omit<LineItem, "id">[] = [
  { section: "service", description: "Continuous site evolution — ongoing improvements, never static", quantity: 1, unit_price: 0, amount: 0 },
  { section: "service", description: "Review automation — AI-powered review requests and optional auto-response", quantity: 1, unit_price: 0, amount: 0 },
  { section: "service", description: "Lead capture with email and SMS notification — optional CRM connection available", quantity: 1, unit_price: 0, amount: 0 },
  { section: "service", description: "Core30 content process continuation — ongoing content that ranks in search and AI", quantity: 1, unit_price: 0, amount: 0 },
  { section: "service", description: "Google Business Profile management and posting cadence", quantity: 1, unit_price: 0, amount: 0 },
  { section: "service", description: "Ongoing backlink building", quantity: 1, unit_price: 0, amount: 0 },
  { section: "service", description: "AI search monitoring and optimization", quantity: 1, unit_price: 0, amount: 0 },
  { section: "service", description: "Monthly performance reporting", quantity: 1, unit_price: 0, amount: 0 },
  { section: "service", description: "Strategic partnership — proactive opportunity and threat identification", quantity: 1, unit_price: 0, amount: 0 },
];

function defaultTerms(serviceAmount: string): string {
  return `Build fee is due upon receipt and triggers the start of your project. Monthly service fee of ${serviceAmount}/mo begins 30 days from the date build payment is received. A 6-month minimum commitment applies at promotional pricing, after which billing continues month-to-month with 30 days written notice to cancel. Client owns all code and site assets upon payment in full. Payment constitutes acceptance of this scope of work.`;
}

let _itemId = 0;
function nextId(): string {
  return `item-${++_itemId}`;
}

function withIds(items: Omit<LineItem, "id">[]): LineItem[] {
  return items.map((i) => ({ ...i, id: nextId() }));
}

// ---------------------------------------------------------------------------
// Result type
// ---------------------------------------------------------------------------

type InvoiceResult = {
  invoice_number: string;
  deal_id: string;
  pdf_url: string;
  stripe_invoice_url: string;
  email_sent: boolean;
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function DealCloser({
  stripeReturnSuccess,
  stripeReturnCancelled,
  stripeReturnDealId,
}: {
  stripeReturnSuccess: boolean;
  stripeReturnCancelled: boolean;
  stripeReturnDealId?: string;
}) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1
  const [buildTier, setBuildTier] = useState<BuildTier | null>(null);
  const [customTotal, setCustomTotal] = useState("");
  const [fullServiceIncluded, setFullServiceIncluded] = useState(true);

  // Step 2
  const [serviceTier, setServiceTier] = useState<ServiceTier>(SERVICE_TIERS[0]);

  // Step 3
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });

  // Step 4
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [terms, setTerms] = useState("");
  const [comparableValue, setComparableValue] = useState("Comparable to $3,500/mo elsewhere");
  const [sowInitialized, setSowInitialized] = useState(false);

  // Step 5
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvoiceResult | null>(null);

  // ------------------------------------------------------------------
  // Derived
  // ------------------------------------------------------------------
  const resolvedBuildTotal = useMemo<number | null>(() => {
    if (!buildTier) return null;
    if (buildTier.fixedTotal) return buildTier.fixedTotal;
    const n = parseFloat(customTotal);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [buildTier, customTotal]);

  const buildAmountCents = useMemo(
    () => (resolvedBuildTotal ? Math.round(resolvedBuildTotal * 100) : 0),
    [resolvedBuildTotal],
  );

  // ------------------------------------------------------------------
  // Validation
  // ------------------------------------------------------------------
  const canProceedStep1 = !!buildTier && !!resolvedBuildTotal;
  const canProceedStep2 = !!serviceTier;
  const canProceedStep3 =
    customer.name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim());

  // ------------------------------------------------------------------
  // SOW initialization (called when entering step 4)
  // ------------------------------------------------------------------
  const initSow = useCallback(() => {
    if (sowInitialized) return;

    const serviceDollars = `$${(serviceTier.monthlyCents / 100).toLocaleString("en-US")}`;

    if (fullServiceIncluded) {
      const buildItems = withIds(FULL_SERVICE_BUILD_ITEMS);
      if (buildItems.length > 0) {
        buildItems[0] = {
          ...buildItems[0],
          unit_price: buildAmountCents,
          amount: buildAmountCents,
        };
      }
      const serviceItems = withIds(FULL_SERVICE_ONGOING_ITEMS);
      if (serviceItems.length > 0) {
        serviceItems[0] = {
          ...serviceItems[0],
          unit_price: serviceTier.monthlyCents,
          amount: serviceTier.monthlyCents,
        };
      }
      setLineItems([...buildItems, ...serviceItems]);
    } else {
      setLineItems(
        withIds([
          {
            section: "build" as const,
            description: `${buildTier?.name ?? "Build"} — website build`,
            quantity: 1,
            unit_price: buildAmountCents,
            amount: buildAmountCents,
          },
          {
            section: "service" as const,
            description: `${serviceTier.label} service tier — monthly`,
            quantity: 1,
            unit_price: serviceTier.monthlyCents,
            amount: serviceTier.monthlyCents,
          },
        ]),
      );
    }

    setTerms(defaultTerms(serviceDollars));
    setSowInitialized(true);
  }, [sowInitialized, fullServiceIncluded, buildAmountCents, buildTier, serviceTier]);

  // ------------------------------------------------------------------
  // SOW line item management
  // ------------------------------------------------------------------
  function updateLineItem(id: string, field: keyof LineItem, value: string) {
    setLineItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (field === "description") return { ...item, description: value };
        const n = parseInt(value, 10) || 0;
        if (field === "quantity") {
          return { ...item, quantity: n, amount: n * item.unit_price };
        }
        if (field === "unit_price") {
          return { ...item, unit_price: n, amount: item.quantity * n };
        }
        return item;
      }),
    );
  }

  function removeLineItem(id: string) {
    setLineItems((prev) => prev.filter((i) => i.id !== id));
  }

  function addLineItem(section: "build" | "service") {
    setLineItems((prev) => [
      ...prev,
      {
        id: nextId(),
        section,
        description: "",
        quantity: 1,
        unit_price: 0,
        amount: 0,
      },
    ]);
  }

  // ------------------------------------------------------------------
  // Submit
  // ------------------------------------------------------------------
  async function submitInvoice() {
    if (!buildTier || !resolvedBuildTotal) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: customer.name.trim(),
            company: customer.company.trim() || undefined,
            email: customer.email.trim(),
            phone: customer.phone.trim() || undefined,
          },
          build_tier: buildTier.id,
          service_tier: serviceTier.key,
          build_amount: buildAmountCents,
          service_amount: serviceTier.monthlyCents,
          full_service_included: fullServiceIncluded,
          line_items: lineItems.map(({ id: _id, ...rest }) => rest),
          comparable_value: comparableValue.trim() || undefined,
          terms,
          notes: customer.notes.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create invoice");
        setSubmitting(false);
        return;
      }
      setResult(data);
      setStep(5);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep(1);
    setBuildTier(null);
    setCustomTotal("");
    setFullServiceIncluded(true);
    setServiceTier(SERVICE_TIERS[0]);
    setCustomer({ name: "", email: "", phone: "", company: "", notes: "" });
    setLineItems([]);
    setTerms("");
    setComparableValue("Comparable to $3,500/mo elsewhere");
    setSowInitialized(false);
    setResult(null);
    setError(null);
  }

  // ------------------------------------------------------------------
  // Computed for invoice preview
  // ------------------------------------------------------------------
  const buildItems = lineItems.filter((i) => i.section === "build");
  const serviceItems = lineItems.filter((i) => i.section === "service");
  const buildSubtotal = buildItems.reduce((s, i) => s + i.amount, 0);
  const serviceSubtotal = serviceItems.reduce((s, i) => s + i.amount, 0);

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen">
      <TopBar step={step} onReset={reset} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-24 pt-6">
        {stripeReturnSuccess && (
          <ReturnBanner
            tone="success"
            title="Payment received"
            body={`Deal ${stripeReturnDealId ?? ""} — status will update automatically.`}
          />
        )}
        {stripeReturnCancelled && (
          <ReturnBanner
            tone="warn"
            title="Checkout cancelled"
            body="The customer closed checkout without paying. The payment link is still valid."
          />
        )}

        <AnimatePresence mode="wait">
          {/* ============================================================ */}
          {/* STEP 1: Build Tier Selection                                 */}
          {/* ============================================================ */}
          {step === 1 && (
            <Step k="s1">
              <SectionLabel n={1} label="Build Tier" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {BUILD_TIERS.map((t) => {
                  const active = buildTier?.id === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setBuildTier(t);
                        setSowInitialized(false);
                      }}
                      className="relative rounded-xl p-4 text-left transition-all"
                      style={{
                        background: active ? t.accentTint : "rgba(255,255,255,0.03)",
                        borderLeft: `3px solid ${t.accent}`,
                        border: `1px solid ${active ? t.accent : "rgba(255,255,255,0.08)"}`,
                        borderLeftWidth: 3,
                      }}
                    >
                      <div className="font-semibold text-white text-[14px] leading-tight">
                        {t.name}
                      </div>
                      <div className="mt-1.5 font-mono text-[10.5px] text-[#94a3b8] leading-[1.45]">
                        {t.sub}
                      </div>
                    </button>
                  );
                })}
              </div>

              {buildTier && !buildTier.fixedTotal && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
                  <InputField
                    label={`Total amount (${buildTier.minTotal?.toLocaleString()}–${buildTier.maxTotal?.toLocaleString()} typical)`}
                    type="number"
                    inputMode="decimal"
                    placeholder={`e.g. ${buildTier.minTotal ?? 5000}`}
                    value={customTotal}
                    onChange={setCustomTotal}
                    prefix="$"
                  />
                </motion.div>
              )}

              {/* Full Service Toggle */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setFullServiceIncluded(!fullServiceIncluded);
                    setSowInitialized(false);
                  }}
                  className="w-full flex items-center gap-3 rounded-lg p-4 transition-all"
                  style={{
                    background: fullServiceIncluded
                      ? "rgba(20,184,166,0.12)"
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${fullServiceIncluded ? "#14b8a6" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  <div
                    className="flex-shrink-0 w-11 h-6 rounded-full relative transition-colors"
                    style={{ background: fullServiceIncluded ? "#14b8a6" : "#334155" }}
                  >
                    <div
                      className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
                      style={{ left: fullServiceIncluded ? 22 : 2 }}
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-[14px] font-bold text-white tracking-tight">
                      FULL SERVICE INCLUDED
                    </div>
                    <div className="font-mono text-[10px] text-[#94a3b8] mt-0.5">
                      SOW includes complete deliverable list regardless of tier
                    </div>
                  </div>
                </button>
                <div className="mt-2 font-mono text-[10px] text-[#64748b] px-1">
                  Promo pricing includes our complete service stack.
                </div>
              </div>

              <StepButton
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                label="Next: service tier →"
              />
            </Step>
          )}

          {/* ============================================================ */}
          {/* STEP 2: Service Tier Selection                               */}
          {/* ============================================================ */}
          {step === 2 && (
            <Step k="s2">
              <SectionLabel n={2} label="Service Tier" />
              <div className="grid grid-cols-3 gap-3">
                {SERVICE_TIERS.map((t) => {
                  const active = serviceTier.key === t.key;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => {
                        setServiceTier(t);
                        setSowInitialized(false);
                      }}
                      className="rounded-xl p-4 text-left transition-all"
                      style={{
                        background: active
                          ? "rgba(20,184,166,0.12)"
                          : "rgba(255,255,255,0.03)",
                        border: `1px solid ${active ? "#14b8a6" : "rgba(255,255,255,0.08)"}`,
                      }}
                    >
                      <div className="text-[15px] font-semibold text-white">{t.label}</div>
                      <div className="font-mono text-[12px] text-[#94a3b8] mt-1">{t.price}</div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 font-mono text-[10px] text-[#64748b] px-1">
                Monthly service begins 30 days from build payment date. 6-month minimum, then month-to-month.
              </div>

              <div className="flex gap-3 mt-6">
                <BackButton onClick={() => setStep(1)} />
                <StepButton
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  label="Next: customer info →"
                  flex
                />
              </div>
            </Step>
          )}

          {/* ============================================================ */}
          {/* STEP 3: Customer Info                                        */}
          {/* ============================================================ */}
          {step === 3 && (
            <Step k="s3">
              <SectionLabel n={3} label="Customer Info" />
              <div className="space-y-3">
                <InputField
                  label="Name *"
                  value={customer.name}
                  onChange={(v) => setCustomer({ ...customer, name: v })}
                  placeholder="Sarah Chen"
                  autoFocus
                />
                <InputField
                  label="Email *"
                  type="email"
                  value={customer.email}
                  onChange={(v) => setCustomer({ ...customer, email: v })}
                  placeholder="sarah@fleetco.com"
                />
                <InputField
                  label="Phone (recommended for SMS)"
                  type="tel"
                  inputMode="tel"
                  value={customer.phone}
                  onChange={(v) => setCustomer({ ...customer, phone: v })}
                  placeholder="+18015550123"
                />
                <InputField
                  label="Company"
                  value={customer.company}
                  onChange={(v) => setCustomer({ ...customer, company: v })}
                  placeholder="Fleet Co"
                />
                <TextareaField
                  label="Note (internal)"
                  value={customer.notes}
                  onChange={(v) => setCustomer({ ...customer, notes: v })}
                  placeholder="Wants fleet focus · 30 locations"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <BackButton onClick={() => setStep(2)} />
                <StepButton
                  onClick={() => {
                    initSow();
                    setStep(4);
                  }}
                  disabled={!canProceedStep3}
                  label="Next: scope of work →"
                  flex
                />
              </div>
            </Step>
          )}

          {/* ============================================================ */}
          {/* STEP 4: Scope of Work Builder                                */}
          {/* ============================================================ */}
          {step === 4 && (
            <Step k="s4">
              <SectionLabel n={4} label="Scope of Work" />

              {/* Build items */}
              <SowSection
                title="Build Deliverables"
                items={buildItems}
                onUpdate={updateLineItem}
                onRemove={removeLineItem}
                onAdd={() => addLineItem("build")}
              />

              {/* Service items */}
              <SowSection
                title="Ongoing Service Deliverables"
                items={serviceItems}
                onUpdate={updateLineItem}
                onRemove={removeLineItem}
                onAdd={() => addLineItem("service")}
              />

              {/* Comparable value */}
              <div className="mt-6">
                <InputField
                  label="Comparable Value Statement (optional)"
                  value={comparableValue}
                  onChange={setComparableValue}
                  placeholder="Comparable to $3,500/mo elsewhere"
                />
              </div>

              {/* Terms */}
              <div className="mt-4">
                <TextareaField
                  label="Terms & Conditions"
                  value={terms}
                  onChange={setTerms}
                  rows={5}
                />
              </div>

              <div className="flex gap-3 mt-6">
                <BackButton onClick={() => setStep(3)} />
                <StepButton
                  onClick={() => setStep(5)}
                  disabled={lineItems.length === 0}
                  label="Next: preview invoice →"
                  flex
                />
              </div>
            </Step>
          )}

          {/* ============================================================ */}
          {/* STEP 5: Invoice Preview + Send  (or Result)                  */}
          {/* ============================================================ */}
          {step === 5 && !result && (
            <Step k="s5">
              <SectionLabel n={5} label="Invoice Preview" />

              {/* Preview card */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {/* Header */}
                <div className="bg-[#0f172a] px-6 py-5 flex items-start justify-between">
                  <div>
                    <Image
                      src="/images/logos/xeedly-logo-bright-blue.png"
                      alt="XeedlyAI"
                      width={140}
                      height={36}
                      className="h-9 w-auto"
                    />
                    <div className="text-[9px] text-[#64748b] mt-2">AI-Native Business Intelligence</div>
                    <div className="font-mono text-[8px] text-[#64748b] mt-1">xeedly.com | shad@xeedly.com</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[18px] font-bold text-white tracking-[2px]">INVOICE</div>
                    <div className="font-mono text-[9px] text-[#64748b] mt-1">Draft preview</div>
                    <div className="font-mono text-[9px] text-[#64748b]">Due: Upon Receipt</div>
                  </div>
                </div>
                <div className="h-[2px] bg-[#38b6ff]" />

                {/* Billing */}
                <div className="px-6 py-4 flex gap-6 bg-white/[0.02]">
                  <div className="flex-1">
                    <div className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-[#64748b] mb-2">From</div>
                    <div className="text-[12px] text-white leading-[1.6]">XeedlyAI</div>
                    <div className="text-[10px] text-[#64748b]">shad@xeedly.com</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-[#64748b] mb-2">Bill To</div>
                    <div className="text-[12px] text-white leading-[1.6]">{customer.name}</div>
                    {customer.company && <div className="text-[11px] text-white">{customer.company}</div>}
                    <div className="text-[10px] text-[#64748b]">{customer.email}</div>
                    {customer.phone && <div className="text-[10px] text-[#64748b]">{customer.phone}</div>}
                  </div>
                </div>

                {/* Comparable value banner */}
                {comparableValue.trim() && (
                  <div className="mx-6 my-3 px-4 py-2 rounded bg-[#38b6ff]/10 text-center">
                    <span className="text-[11px] font-semibold text-[#38b6ff]">{comparableValue}</span>
                  </div>
                )}

                {/* Line items table */}
                <div className="px-6 pb-4">
                  {/* Header */}
                  <div className="flex bg-[#0f172a] rounded-t px-3 py-2">
                    <div className="flex-1 font-mono text-[8px] font-bold text-white uppercase tracking-[0.1em]">Description</div>
                    <div className="w-12 font-mono text-[8px] font-bold text-white uppercase tracking-[0.1em] text-center">Qty</div>
                    <div className="w-20 font-mono text-[8px] font-bold text-white uppercase tracking-[0.1em] text-right">Unit</div>
                    <div className="w-20 font-mono text-[8px] font-bold text-white uppercase tracking-[0.1em] text-right">Amount</div>
                  </div>

                  {/* Build items */}
                  {buildItems.length > 0 && (
                    <>
                      <div className="flex bg-[#f8fafc]/5 px-3 py-1.5 border-b border-white/5">
                        <span className="font-mono text-[8px] font-bold text-[#38b6ff] uppercase tracking-[0.1em]">Build Deliverables</span>
                      </div>
                      {buildItems.map((item, i) => (
                        <div
                          key={item.id}
                          className="flex px-3 py-1.5 border-b border-white/5"
                          style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.02)" : "transparent" }}
                        >
                          <div className="flex-1 text-[10px] text-[#cbd5e1] pr-2">{item.description}</div>
                          <div className="w-12 font-mono text-[10px] text-[#cbd5e1] text-center">{item.quantity}</div>
                          <div className="w-20 font-mono text-[10px] text-[#cbd5e1] text-right">{fmtCents(item.unit_price)}</div>
                          <div className="w-20 font-mono text-[10px] text-white text-right">{fmtCents(item.amount)}</div>
                        </div>
                      ))}
                    </>
                  )}

                  {/* Build total */}
                  <div className="flex px-3 py-2 border-t border-white/10">
                    <div className="flex-1 text-[10px] font-semibold text-[#94a3b8]">Build Total</div>
                    <div className="w-20 font-mono text-[10px] font-bold text-white text-right">{fmtCents(buildSubtotal)}</div>
                  </div>

                  {/* Total due now */}
                  <div className="flex bg-[#0f172a] rounded-b px-3 py-2.5">
                    <div className="flex-1 font-mono text-[11px] font-bold text-white">TOTAL DUE NOW</div>
                    <div className="w-20 font-mono text-[11px] font-bold text-white text-right">{fmtCents(buildSubtotal)}</div>
                  </div>

                  {/* Monthly service note */}
                  <div className="flex px-3 py-2.5 border-t border-white/5">
                    <div className="flex-1 text-[10px] text-[#94a3b8]">Monthly service (begins 30 days after build payment)</div>
                    <div className="w-20 font-mono text-[10px] font-semibold text-[#38b6ff] text-right">{fmtCents(serviceTier.monthlyCents)}/mo</div>
                  </div>
                </div>

                {/* Service deliverables — listed as included scope, not priced line items */}
                {serviceItems.length > 0 && (
                  <div className="px-6 pb-4">
                    <div className="font-mono text-[8px] font-bold text-[#38b6ff] uppercase tracking-[0.1em] mb-2">
                      Ongoing Service Deliverables — included at {serviceTier.price}
                    </div>
                    <div className="space-y-1">
                      {serviceItems.map((item) => (
                        <div key={item.id} className="flex items-start gap-2">
                          <span className="text-[#38b6ff] text-[8px] mt-0.5">✓</span>
                          <span className="text-[10px] text-[#cbd5e1]">{item.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment options preview */}
                <div className="px-6 pb-4 grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
                    <div className="font-mono text-[8px] font-bold text-[#64748b] uppercase tracking-[0.1em]">Card</div>
                    <div className="text-[9px] text-[#94a3b8] mt-1">Stripe Secure Checkout</div>
                  </div>
                  <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
                    <div className="font-mono text-[8px] font-bold text-[#64748b] uppercase tracking-[0.1em]">ACH Transfer</div>
                    <div className="text-[9px] text-[#14b8a6] font-bold mt-0.5">Preferred &gt;$1,000</div>
                  </div>
                  <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
                    <div className="font-mono text-[8px] font-bold text-[#64748b] uppercase tracking-[0.1em]">Venmo</div>
                    <div className="text-[9px] text-[#94a3b8] mt-1">@XeedlyAI</div>
                  </div>
                </div>

                {/* Terms preview */}
                <div className="px-6 pb-4">
                  <div className="font-mono text-[8px] font-bold text-[#64748b] uppercase tracking-[0.1em] mb-2">Terms</div>
                  <div className="text-[9px] text-[#94a3b8] leading-[1.6]">{terms}</div>
                </div>

                {/* Partnership */}
                <div className="px-6 py-4 border-t border-white/5 text-center">
                  <div className="text-[10px] italic text-[#94a3b8] leading-[1.6]">
                    We don&apos;t deliver a website and disappear. Your site is a living system — we build it, grow it, and never stop. You own the code. Always.
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 text-[12px] text-[#ef4444] font-mono">{error}</div>
              )}

              <div className="flex gap-3 mt-6">
                <BackButton onClick={() => setStep(4)} label="← Edit SOW" disabled={submitting} />
                <button
                  type="button"
                  onClick={submitInvoice}
                  disabled={submitting}
                  className="flex-1 px-5 py-3.5 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] disabled:opacity-60 text-[#0f172a] text-[15px] font-bold transition-all"
                >
                  {submitting ? "Generating invoice..." : "Send Invoice"}
                </button>
              </div>
            </Step>
          )}

          {/* ============================================================ */}
          {/* RESULT                                                       */}
          {/* ============================================================ */}
          {step === 5 && result && (
            <Step k="result">
              <div
                className="rounded-xl p-6 md:p-8"
                style={{
                  background: "rgba(20,184,166,0.08)",
                  border: "1px solid rgba(20,184,166,0.3)",
                  borderLeft: "3px solid #14b8a6",
                }}
              >
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#14b8a6]">
                  Invoice Sent
                </div>
                <div className="mt-3 text-[18px] font-bold text-white">
                  {result.invoice_number}
                </div>
                <div className="mt-1 text-[13px] text-[#94a3b8]">
                  Sent to {customer.name} · {customer.email}
                </div>
                <div className="mt-4 space-y-2 font-mono text-[12px]">
                  <div className="text-[#f1f5f9]">
                    {result.email_sent ? "✓" : "⚠"} Email{" "}
                    {result.email_sent ? "delivered" : "stub (Resend not configured)"}
                  </div>
                  {result.pdf_url && (
                    <div>
                      <a
                        href={result.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#38b6ff] hover:underline"
                      >
                        View PDF →
                      </a>
                    </div>
                  )}
                  {result.stripe_invoice_url && (
                    <div>
                      <a
                        href={result.stripe_invoice_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#38b6ff] hover:underline"
                      >
                        Stripe Invoice →
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-4 font-mono text-[10px] text-[#64748b]">
                  Deal ID: {result.deal_id}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="flex-1 px-5 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] text-[14px] font-semibold transition-colors"
                >
                  Create another invoice
                </button>
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-[13px] font-semibold text-[#38b6ff] hover:text-white border border-[#38b6ff]/40 hover:bg-[#38b6ff]/10 transition-colors"
                >
                  View dashboard →
                </Link>
              </div>
            </Step>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fmtCents(n: number): string {
  if (!n && n !== 0) return "—";
  return `$${(n / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ---------------------------------------------------------------------------
// Shared presentational components
// ---------------------------------------------------------------------------

function Step({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <motion.div
      key={k}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function TopBar({ step, onReset }: { step: number; onReset: () => void }) {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }
  return (
    <div className="sticky top-0 z-10 bg-[#0f172a]/90 backdrop-blur border-b border-white/5">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#38b6ff]">
            XeedlyAI · Invoice
          </span>
          <span className="font-mono text-[10px] text-[#64748b]">step {step} / 5</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onReset}
            className="font-mono text-[10px] text-[#64748b] hover:text-[#f1f5f9] transition-colors"
          >
            ↻ reset
          </button>
          <Link
            href="/admin/dashboard"
            className="font-mono text-[10px] text-[#64748b] hover:text-[#38b6ff] transition-colors"
          >
            dashboard →
          </Link>
          <button
            type="button"
            onClick={logout}
            className="font-mono text-[10px] text-[#64748b] hover:text-[#f1f5f9] transition-colors"
          >
            sign out
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ n, label }: { n: number; label: string }) {
  return (
    <div className="mt-6 mb-4 flex items-center gap-3">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#38b6ff]/10 font-mono text-[11px] font-bold text-[#38b6ff]">
        {n}
      </span>
      <h2 className="text-[15px] font-semibold text-white tracking-tight">{label}</h2>
    </div>
  );
}

function StepButton({
  onClick,
  disabled,
  label,
  flex,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  flex?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${flex ? "flex-1" : "w-full"} mt-6 px-5 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] disabled:opacity-40 text-[#0f172a] text-[14px] font-semibold transition-all`}
    >
      {label}
    </button>
  );
}

function BackButton({
  onClick,
  label = "← Back",
  disabled,
}: {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="px-5 py-3 rounded-lg text-[13px] font-semibold text-[#94a3b8] hover:text-white border border-white/10 hover:border-white/20 transition-colors"
    >
      {label}
    </button>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  autoFocus,
  prefix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoFocus?: boolean;
  prefix?: string;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b] mb-1.5">
        {label}
      </span>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[13px] text-[#64748b] pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type={type}
          inputMode={inputMode}
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${prefix ? "pl-7" : "pl-3"} pr-3 py-2.5 text-[14px] text-white bg-white/[0.04] border border-white/10 rounded-lg focus:outline-none focus:border-[#38b6ff]/50 focus:bg-white/[0.06] transition-colors placeholder:text-[#475569]`}
        />
      </div>
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b] mb-1.5">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2.5 text-[14px] text-white bg-white/[0.04] border border-white/10 rounded-lg focus:outline-none focus:border-[#38b6ff]/50 focus:bg-white/[0.06] transition-colors placeholder:text-[#475569] resize-none"
      />
    </label>
  );
}

function ReturnBanner({
  tone,
  title,
  body,
}: {
  tone: "success" | "warn";
  title: string;
  body: string;
}) {
  const color = tone === "success" ? "#14b8a6" : "#f59e0b";
  return (
    <div
      className="rounded-xl p-4 mb-4"
      style={{
        background: `${color}14`,
        border: `1px solid ${color}40`,
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div
        className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em]"
        style={{ color }}
      >
        {title}
      </div>
      <div className="mt-1 text-[12px] text-[#cbd5e1]">{body}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SOW Section — editable line items table
// ---------------------------------------------------------------------------

function SowSection({
  title,
  items,
  onUpdate,
  onRemove,
  onAdd,
}: {
  title: string;
  items: LineItem[];
  onUpdate: (id: string, field: keyof LineItem, value: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="mt-4">
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#38b6ff] mb-2">
        {title}
      </div>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-2 rounded-lg bg-white/[0.03] border border-white/5 p-3"
          >
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={item.description}
                onChange={(e) => onUpdate(item.id, "description", e.target.value)}
                className="w-full text-[12px] text-white bg-transparent border-none outline-none placeholder:text-[#475569]"
                placeholder="Line item description"
              />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <input
                type="number"
                value={item.quantity || ""}
                onChange={(e) => onUpdate(item.id, "quantity", e.target.value)}
                className="w-10 text-[11px] font-mono text-[#94a3b8] bg-white/[0.04] border border-white/10 rounded px-1.5 py-1 text-center outline-none focus:border-[#38b6ff]/50"
                placeholder="1"
              />
              <input
                type="number"
                value={item.unit_price ? (item.unit_price / 100).toString() : ""}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  onUpdate(item.id, "unit_price", Number.isFinite(v) ? Math.round(v * 100).toString() : "0");
                }}
                className="w-20 text-[11px] font-mono text-[#94a3b8] bg-white/[0.04] border border-white/10 rounded px-1.5 py-1 text-right outline-none focus:border-[#38b6ff]/50"
                placeholder="$0"
              />
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="text-[#ef4444]/60 hover:text-[#ef4444] text-[14px] transition-colors px-1"
                title="Remove"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="mt-2 font-mono text-[10px] text-[#64748b] hover:text-[#38b6ff] transition-colors"
      >
        + Add line item
      </button>
    </div>
  );
}
