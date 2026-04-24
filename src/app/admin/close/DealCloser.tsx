"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// ---------------------------------------------------------------------------
// Product catalog — exact mirror of /api/admin/close-deal switch statement
// ---------------------------------------------------------------------------

type DealType =
  | "growth_starter"
  | "growth_growth"
  | "growth_scale"
  | "digital_foundation"
  | "operational_systems"
  | "intelligence_platform"
  | "propertydocz_setup"
  | "propertyjobz_setup"
  | "property_combined";

type Product = {
  id: DealType;
  name: string;
  sub: string; // sub-label shown on the card
  accent: string; // left-border hex
  accentTint: string; // selected bg tint
  structure: "subscription" | "split" | "one-time";
  fixedTotal?: number; // dollars
  minTotal?: number;
  maxTotal?: number;
  hasMonthly?: boolean; // split products with optional maintenance
  hasCustomMonthly?: boolean; // intelligence_platform only
};

const PRODUCTS: Product[] = [
  {
    id: "growth_starter",
    name: "GS Starter",
    sub: "$297/mo · subscription",
    accent: "#38b6ff",
    accentTint: "rgba(56,182,255,0.1)",
    structure: "subscription",
    fixedTotal: 297,
  },
  {
    id: "growth_growth",
    name: "GS Growth",
    sub: "$597/mo · subscription",
    accent: "#38b6ff",
    accentTint: "rgba(56,182,255,0.1)",
    structure: "subscription",
    fixedTotal: 597,
  },
  {
    id: "growth_scale",
    name: "GS Scale",
    sub: "$997/mo · subscription",
    accent: "#38b6ff",
    accentTint: "rgba(56,182,255,0.1)",
    structure: "subscription",
    fixedTotal: 997,
  },
  {
    id: "digital_foundation",
    name: "Digital Foundation",
    sub: "$2,500 · 50/50 split",
    accent: "#0A8FD4",
    accentTint: "rgba(10,143,212,0.12)",
    structure: "split",
    fixedTotal: 2500,
    hasMonthly: true,
  },
  {
    id: "operational_systems",
    name: "Operational Systems",
    sub: "$4K–$7K · enter amount",
    accent: "#14b8a6",
    accentTint: "rgba(20,184,166,0.1)",
    structure: "split",
    minTotal: 4000,
    maxTotal: 7000,
    hasMonthly: true,
  },
  {
    id: "intelligence_platform",
    name: "Intelligence Platform",
    sub: "$5K–$25K · enter amount",
    accent: "#8b5cf6",
    accentTint: "rgba(139,92,246,0.1)",
    structure: "split",
    minTotal: 5000,
    maxTotal: 25000,
    hasMonthly: true,
    hasCustomMonthly: true,
  },
  {
    id: "propertydocz_setup",
    name: "PropertyDocz",
    sub: "$500 · one-time",
    accent: "#38b6ff",
    accentTint: "rgba(56,182,255,0.1)",
    structure: "one-time",
    fixedTotal: 500,
  },
  {
    id: "propertyjobz_setup",
    name: "PropertyJobz",
    sub: "$500 · one-time",
    accent: "#38b6ff",
    accentTint: "rgba(56,182,255,0.1)",
    structure: "one-time",
    fixedTotal: 500,
  },
  {
    id: "property_combined",
    name: "Property Combined",
    sub: "$1,000 · one-time",
    accent: "#38b6ff",
    accentTint: "rgba(56,182,255,0.1)",
    structure: "one-time",
    fixedTotal: 1000,
  },
];

// ---------------------------------------------------------------------------
// Result shape from /api/admin/close-deal
// ---------------------------------------------------------------------------

type CloseResult = {
  success: true;
  deal: { id: string };
  checkoutUrl: string;
  productName: string;
  upfrontAmount: string;
  delivery: { sms: boolean; email: boolean };
};

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
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [monthlyAmount, setMonthlyAmount] = useState<string>("");
  const [goliveDate, setGoliveDate] = useState<string>("");
  const [maintenanceDate, setMaintenanceDate] = useState<string>("");

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CloseResult | null>(null);

  // ------------------------------------------------------------------
  // Derived: resolved total (from fixed price OR user input)
  // ------------------------------------------------------------------
  const resolvedTotal = useMemo<number | null>(() => {
    if (!product) return null;
    if (product.fixedTotal) return product.fixedTotal;
    const n = parseFloat(totalAmount);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [product, totalAmount]);

  const upfront = useMemo(() => {
    if (!product || !resolvedTotal) return null;
    if (product.structure === "split") {
      return Math.round((resolvedTotal * 100) / 2) / 100;
    }
    return resolvedTotal;
  }, [product, resolvedTotal]);

  const golive = useMemo(() => {
    if (!product || !resolvedTotal || product.structure !== "split")
      return null;
    return Math.round(resolvedTotal * 100 - Math.round((resolvedTotal * 100) / 2)) / 100;
  }, [product, resolvedTotal]);

  // ------------------------------------------------------------------
  // Validation
  // ------------------------------------------------------------------
  const canProceedStep1 = useMemo(() => {
    if (!product) return false;
    if (!product.fixedTotal && !resolvedTotal) return false;
    return true;
  }, [product, resolvedTotal]);

  const canProceedStep2 = useMemo(() => {
    return (
      customer.name.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())
    );
  }, [customer]);

  // ------------------------------------------------------------------
  // Submit
  // ------------------------------------------------------------------
  async function submitDeal() {
    if (!product || !resolvedTotal) return;
    setSubmitting(true);
    setError(null);

    const body: Record<string, unknown> = {
      dealType: product.id,
      customerName: customer.name.trim(),
      customerEmail: customer.email.trim(),
      customerPhone: customer.phone.trim() || null,
      customerCompany: customer.company.trim() || null,
      notes: customer.notes.trim() || null,
      goliveDate: goliveDate || null,
      maintenanceStartDate: maintenanceDate || null,
    };

    if (!product.fixedTotal) body.totalAmount = resolvedTotal;
    if (product.hasCustomMonthly && monthlyAmount) {
      const m = parseFloat(monthlyAmount);
      if (Number.isFinite(m) && m > 0) body.monthlyAmount = m;
    }

    try {
      const res = await fetch("/api/admin/close-deal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as CloseResult | { error: string };
      if (!res.ok || !("success" in data)) {
        setError("error" in data ? data.error : "Failed to close deal");
        setSubmitting(false);
        return;
      }
      setResult(data);
      setStep(4);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep(1);
    setProduct(null);
    setTotalAmount("");
    setMonthlyAmount("");
    setGoliveDate("");
    setMaintenanceDate("");
    setCustomer({ name: "", email: "", phone: "", company: "", notes: "" });
    setResult(null);
    setError(null);
  }

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen">
      <TopBar step={step} onReset={reset} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-24 pt-6">
        {/* Stripe checkout return banners */}
        {stripeReturnSuccess && (
          <ReturnBanner
            tone="success"
            title="Stripe Checkout completed"
            body={`Deal ${stripeReturnDealId ?? ""} · The webhook will finalize status automatically.`}
          />
        )}
        {stripeReturnCancelled && (
          <ReturnBanner
            tone="warn"
            title="Checkout cancelled"
            body="The customer closed the Stripe checkout without paying. The payment link is still valid for 24h."
          />
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <SectionLabel n={1} label="Select Product" />
              <ProductGrid
                selected={product}
                onSelect={(p) => setProduct(p)}
              />

              {product && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-4"
                >
                  {!product.fixedTotal && (
                    <InputField
                      label={`Total amount (${product.minTotal?.toLocaleString()}–${product.maxTotal?.toLocaleString()} typical)`}
                      type="number"
                      inputMode="decimal"
                      placeholder={`e.g. ${product.minTotal ?? 5000}`}
                      value={totalAmount}
                      onChange={setTotalAmount}
                      prefix="$"
                    />
                  )}

                  {product.structure === "split" && resolvedTotal && (
                    <div className="rounded-lg bg-white/[0.04] border border-white/10 p-4">
                      <RowLabel
                        label="Upfront (50%, charged now)"
                        value={`$${upfront?.toLocaleString()}`}
                      />
                      <RowLabel
                        label="Go-live (50%, invoice later)"
                        value={`$${golive?.toLocaleString()}`}
                      />
                    </div>
                  )}

                  {product.structure === "split" && (
                    <>
                      <InputField
                        label="Schedule go-live invoice for (optional)"
                        type="date"
                        value={goliveDate}
                        onChange={setGoliveDate}
                      />
                      <InputField
                        label="Start maintenance on (optional)"
                        type="date"
                        value={maintenanceDate}
                        onChange={setMaintenanceDate}
                      />
                    </>
                  )}

                  {product.hasCustomMonthly && (
                    <InputField
                      label="Monthly managed amount (optional · $495–$995)"
                      type="number"
                      inputMode="decimal"
                      placeholder="e.g. 795"
                      value={monthlyAmount}
                      onChange={setMonthlyAmount}
                      prefix="$"
                    />
                  )}
                </motion.div>
              )}

              <StepButton
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                label="Next: customer info →"
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <SectionLabel n={2} label="Customer Info" />
              <p className="text-[12px] text-[#64748b] mb-4 font-mono">
                {/* TODO: pull from booking system when bookings are persisted. */}
                Enter customer details manually — booking prefill coming soon.
              </p>

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
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-lg text-[13px] font-semibold text-[#94a3b8] hover:text-white border border-white/10 hover:border-white/20 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 px-5 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] disabled:opacity-40 text-[#0f172a] text-[14px] font-semibold transition-all"
                >
                  Next: review →
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && product && resolvedTotal && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <SectionLabel n={3} label="Review & Send" />

              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5 space-y-4">
                <SummaryRow label="Product" value={product.name} mono />
                <SummaryRow
                  label={product.structure === "subscription" ? "Amount" : "Total"}
                  value={`$${resolvedTotal.toLocaleString()}${product.structure === "subscription" ? "/mo" : ""}`}
                />
                {product.structure === "split" && (
                  <>
                    <SummaryRow
                      label="Charged now (upfront 50%)"
                      value={`$${upfront?.toLocaleString()}`}
                    />
                    <SummaryRow
                      label="Go-live invoice (50%)"
                      value={`$${golive?.toLocaleString()} · ${goliveDate || "unscheduled"}`}
                    />
                    {product.hasMonthly && (
                      <SummaryRow
                        label="Maintenance / Managed"
                        value={`${
                          product.hasCustomMonthly
                            ? monthlyAmount
                              ? `$${parseFloat(monthlyAmount).toLocaleString()}/mo`
                              : "—"
                            : "$199/mo"
                        } · ${maintenanceDate || "not scheduled"}`}
                      />
                    )}
                  </>
                )}
                <hr className="border-white/5" />
                <SummaryRow label="Customer" value={customer.name} />
                <SummaryRow label="Email" value={customer.email} mono />
                {customer.phone && (
                  <SummaryRow label="Phone" value={customer.phone} mono />
                )}
                {customer.company && (
                  <SummaryRow label="Company" value={customer.company} />
                )}
                <hr className="border-white/5" />
                <SummaryRow
                  label="Delivery"
                  value={customer.phone ? "SMS + Email" : "Email only"}
                />
              </div>

              {error && (
                <div className="mt-4 text-[12px] text-[#ef4444] font-mono">
                  {error}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={submitting}
                  className="px-5 py-3 rounded-lg text-[13px] font-semibold text-[#94a3b8] hover:text-white border border-white/10 hover:border-white/20 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={submitDeal}
                  disabled={submitting}
                  className="flex-1 px-5 py-3.5 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] disabled:opacity-60 text-[#0f172a] text-[15px] font-bold transition-all"
                >
                  {submitting ? "Sending payment link..." : "Send Payment Link"}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && result && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div
                className="rounded-xl p-6 md:p-8"
                style={{
                  background: "rgba(20,184,166,0.08)",
                  border: "1px solid rgba(20,184,166,0.3)",
                  borderLeft: "3px solid #14b8a6",
                }}
              >
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#14b8a6]">
                  ✓ Payment Link Sent
                </div>
                <div className="mt-3 text-[18px] font-bold text-white">
                  {result.productName} — {result.upfrontAmount}
                </div>
                <div className="mt-1 text-[13px] text-[#94a3b8]">
                  Sent to {customer.name}
                </div>
                <div className="mt-4 space-y-1 font-mono text-[12px]">
                  <div className="text-[#f1f5f9]">
                    {result.delivery.email ? "✉️" : "⚠️"} {customer.email}
                    {!result.delivery.email && (
                      <span className="text-[#f59e0b] ml-2">
                        email stub (Resend not configured)
                      </span>
                    )}
                  </div>
                  {customer.phone && (
                    <div className="text-[#f1f5f9]">
                      {result.delivery.sms ? "📱" : "⚠️"} {customer.phone}
                      {!result.delivery.sms && (
                        <span className="text-[#f59e0b] ml-2">
                          SMS stub (Twilio not configured)
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {product?.structure === "split" && (
                  <div className="mt-5 pt-4 border-t border-white/10 space-y-1 text-[12px] text-[#cbd5e1]">
                    <div>
                      Go-live invoice:{" "}
                      <span className="font-mono text-white">
                        {goliveDate || "unscheduled (trigger manually later)"}
                      </span>
                    </div>
                    <div>
                      Maintenance:{" "}
                      <span className="font-mono text-white">
                        {maintenanceDate
                          ? `starts ${maintenanceDate}`
                          : "not scheduled"}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-5 font-mono text-[10px] text-[#64748b]">
                  Deal ID: {result.deal.id}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="flex-1 px-5 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] text-[14px] font-semibold transition-colors"
                >
                  Close another deal
                </button>
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-[13px] font-semibold text-[#38b6ff] hover:text-white border border-[#38b6ff]/40 hover:bg-[#38b6ff]/10 transition-colors"
                >
                  View dashboard →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Presentational helpers
// ---------------------------------------------------------------------------

function TopBar({
  step,
  onReset,
}: {
  step: number;
  onReset: () => void;
}) {
  return (
    <div className="sticky top-0 z-10 bg-[#0f172a]/90 backdrop-blur border-b border-white/5">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#38b6ff]">
            XeedlyAI · Close
          </span>
          <span className="font-mono text-[10px] text-[#64748b]">
            step {step} / 4
          </span>
        </div>
        <div className="flex items-center gap-3">
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
      <h2 className="text-[15px] font-semibold text-white tracking-tight">
        {label}
      </h2>
    </div>
  );
}

function ProductGrid({
  selected,
  onSelect,
}: {
  selected: Product | null;
  onSelect: (p: Product) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {PRODUCTS.map((p) => {
        const isActive = selected?.id === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p)}
            className="relative rounded-xl p-4 text-left transition-all"
            style={{
              background: isActive ? p.accentTint : "rgba(255,255,255,0.03)",
              borderLeft: `3px solid ${p.accent}`,
              border: `1px solid ${
                isActive ? p.accent : "rgba(255,255,255,0.08)"
              }`,
              borderLeftWidth: 3,
            }}
          >
            <div className="font-semibold text-white text-[14px] leading-tight">
              {p.name}
            </div>
            <div className="mt-1.5 font-mono text-[10.5px] text-[#94a3b8] leading-[1.45]">
              {p.sub}
            </div>
          </button>
        );
      })}
    </div>
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
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
        rows={3}
        className="w-full px-3 py-2.5 text-[14px] text-white bg-white/[0.04] border border-white/10 rounded-lg focus:outline-none focus:border-[#38b6ff]/50 focus:bg-white/[0.06] transition-colors placeholder:text-[#475569] resize-none"
      />
    </label>
  );
}

function RowLabel({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-[12px] text-[#94a3b8]">{label}</span>
      <span className="font-mono text-[13px] font-semibold text-white tabular-nums">
        {value}
      </span>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#64748b]">
        {label}
      </span>
      <span
        className={`text-[13px] text-white text-right ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function StepButton({
  onClick,
  disabled,
  label,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-6 w-full px-5 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] disabled:opacity-40 text-[#0f172a] text-[14px] font-semibold transition-all"
    >
      {label}
    </button>
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
