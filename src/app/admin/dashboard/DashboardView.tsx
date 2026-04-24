"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
};

type DealStatus =
  | "closed"
  | "upfront_paid"
  | "in_progress"
  | "golive_invoiced"
  | "golive_paid"
  | "subscription_active"
  | "subscription_paused"
  | "completed"
  | "cancelled";

type Deal = {
  id: string;
  customer_id: string;
  deal_type: string;
  total_amount: number | null;
  upfront_amount: number | null;
  golive_amount: number | null;
  monthly_amount: number | null;
  status: DealStatus;
  stripe_checkout_session_id: string | null;
  stripe_upfront_invoice_id: string | null;
  stripe_golive_invoice_id: string | null;
  stripe_subscription_id: string | null;
  stripe_subscription_schedule_id: string | null;
  golive_scheduled_date: string | null;
  maintenance_start_date: string | null;
  golive_reminder_3_sent: boolean;
  golive_reminder_7_sent: boolean;
  golive_reminder_14_sent: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
  customers: Customer | null;
};

const STATUS_COLOR: Record<DealStatus, string> = {
  closed: "#f59e0b",
  upfront_paid: "#14b8a6",
  in_progress: "#38b6ff",
  golive_invoiced: "#8b5cf6",
  golive_paid: "#14b8a6",
  subscription_active: "#14b8a6",
  subscription_paused: "#f59e0b",
  completed: "#64748b",
  cancelled: "#ef4444",
};

const STATUS_LABEL: Record<DealStatus, string> = {
  closed: "Payment Pending",
  upfront_paid: "Upfront Paid",
  in_progress: "In Progress",
  golive_invoiced: "Go-Live Invoiced",
  golive_paid: "Go-Live Paid",
  subscription_active: "Active",
  subscription_paused: "Paused",
  completed: "Completed",
  cancelled: "Cancelled",
};

// Display the pipeline in this order
const PIPELINE: DealStatus[] = [
  "closed",
  "upfront_paid",
  "in_progress",
  "golive_invoiced",
  "golive_paid",
  "subscription_active",
  "completed",
];

function cents(n: number | null | undefined): string {
  if (!n && n !== 0) return "—";
  return `$${(n / 100).toLocaleString("en-US")}`;
}

function daysAgo(iso: string): number {
  const diff = Date.now() - new Date(iso).getTime();
  return Math.max(0, Math.floor(diff / 86_400_000));
}

export function DashboardView() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/deals", { cache: "no-store" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Failed to load deals (${res.status})`);
        setDeals([]);
      } else {
        const data = await res.json();
        setDeals(data.deals ?? []);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
      setDeals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const kpis = useMemo(() => {
    const active = deals.filter(
      (d) => d.status !== "completed" && d.status !== "cancelled",
    ).length;
    const upfrontPending = deals.filter((d) => d.status === "closed").length;
    const goliveInvoiced = deals.filter(
      (d) => d.status === "golive_invoiced",
    ).length;
    const subsActive = deals.filter(
      (d) => d.status === "subscription_active",
    ).length;
    const mrrCents = deals
      .filter((d) => d.status === "subscription_active")
      .reduce((sum, d) => sum + (d.monthly_amount ?? 0), 0);
    return { active, upfrontPending, goliveInvoiced, subsActive, mrrCents };
  }, [deals]);

  const byStatus = useMemo(() => {
    const map: Record<DealStatus, Deal[]> = {
      closed: [],
      upfront_paid: [],
      in_progress: [],
      golive_invoiced: [],
      golive_paid: [],
      subscription_active: [],
      subscription_paused: [],
      completed: [],
      cancelled: [],
    };
    for (const d of deals) map[d.status].push(d);
    return map;
  }, [deals]);

  async function sendGolive(dealId: string) {
    try {
      const res = await fetch(`/api/admin/deals/${dealId}/send-golive`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to send go-live invoice");
        return;
      }
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Network error");
    }
  }

  async function setMaintenance(deal: Deal) {
    const startDate = window.prompt(
      "Maintenance start date (YYYY-MM-DD) — leave blank to clear:",
      deal.maintenance_start_date?.slice(0, 10) ?? "",
    );
    if (startDate === null) return;

    let monthlyAmount: number | null = null;
    if (deal.deal_type === "intelligence_platform") {
      const raw = window.prompt(
        "Monthly managed amount in dollars (e.g. 795):",
        deal.monthly_amount ? (deal.monthly_amount / 100).toString() : "",
      );
      if (raw === null) return;
      const n = parseFloat(raw);
      if (Number.isFinite(n) && n > 0) monthlyAmount = n;
    }

    try {
      const res = await fetch(
        `/api/admin/deals/${deal.id}/set-maintenance`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startDate: startDate || null,
            monthlyAmount,
          }),
        },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to update maintenance");
        return;
      }
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Network error");
    }
  }

  return (
    <div className="min-h-screen">
      <TopBar onRefresh={load} loading={loading} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <KpiCell label="Active Deals" value={kpis.active.toString()} />
          <KpiCell
            label="Upfront Pending"
            value={kpis.upfrontPending.toString()}
            tint="amber"
          />
          <KpiCell
            label="Go-Live Pending"
            value={kpis.goliveInvoiced.toString()}
            tint="purple"
          />
          <KpiCell
            label="Active Subscriptions"
            value={kpis.subsActive.toString()}
            tint="teal"
          />
          <KpiCell
            label="MRR"
            value={cents(kpis.mrrCents)}
            tint="blue"
          />
        </div>

        {error && (
          <div className="mb-4 rounded-lg p-4 bg-[#ef4444]/10 border border-[#ef4444]/30 text-[13px] text-[#fca5a5] font-mono">
            {error}
          </div>
        )}

        {loading && deals.length === 0 && (
          <div className="py-20 text-center text-[13px] text-[#64748b] font-mono">
            loading deals…
          </div>
        )}

        {!loading && deals.length === 0 && !error && (
          <div className="py-20 text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
              No deals yet
            </div>
            <Link
              href="/admin/close"
              className="mt-4 inline-flex items-center px-5 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] text-[13px] font-semibold transition-colors"
            >
              Close your first deal →
            </Link>
          </div>
        )}

        {/* Pipeline — vertical column list on mobile, side-by-side on desktop */}
        <div className="space-y-6">
          {PIPELINE.filter((s) => byStatus[s].length > 0).map((status) => (
            <motion.section
              key={status}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background: STATUS_COLOR[status],
                    boxShadow: `0 0 8px ${STATUS_COLOR[status]}`,
                  }}
                />
                <h2
                  className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: STATUS_COLOR[status] }}
                >
                  {STATUS_LABEL[status]}
                </h2>
                <span className="font-mono text-[10px] text-[#64748b]">
                  · {byStatus[status].length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {byStatus[status].map((deal) => (
                  <DealCard
                    key={deal.id}
                    deal={deal}
                    onSendGolive={() => sendGolive(deal.id)}
                    onSetMaintenance={() => setMaintenance(deal)}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

function TopBar({
  onRefresh,
  loading,
}: {
  onRefresh: () => void;
  loading: boolean;
}) {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }
  return (
    <div className="sticky top-0 z-10 bg-[#0f172a]/90 backdrop-blur border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#38b6ff]">
            XeedlyAI · Dashboard
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="font-mono text-[10px] text-[#64748b] hover:text-[#f1f5f9] disabled:opacity-40 transition-colors"
          >
            {loading ? "↻ loading…" : "↻ refresh"}
          </button>
          <Link
            href="/admin/close"
            className="px-3.5 py-1.5 rounded-full bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] text-[12px] font-semibold transition-colors"
          >
            + Close deal
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

function KpiCell({
  label,
  value,
  tint = "blue",
}: {
  label: string;
  value: string;
  tint?: "blue" | "teal" | "amber" | "purple";
}) {
  const color =
    tint === "teal"
      ? "#14b8a6"
      : tint === "amber"
      ? "#f59e0b"
      : tint === "purple"
      ? "#8b5cf6"
      : "#38b6ff";
  return (
    <div
      className="rounded-lg px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
        {label}
      </div>
      <div
        className="mt-1 font-mono text-[20px] font-bold tabular-nums leading-none"
        style={{ color }}
      >
        {value}
      </div>
    </div>
  );
}

function DealCard({
  deal,
  onSendGolive,
  onSetMaintenance,
}: {
  deal: Deal;
  onSendGolive: () => void;
  onSetMaintenance: () => void;
}) {
  const color = STATUS_COLOR[deal.status];
  const customer = deal.customers;
  const days = daysAgo(deal.updated_at);

  const canSendGolive =
    deal.status === "upfront_paid" || deal.status === "in_progress";
  const canSetMaintenance =
    deal.status === "upfront_paid" ||
    deal.status === "in_progress" ||
    deal.status === "golive_paid";

  const remindersSent = [
    deal.golive_reminder_3_sent && "3d",
    deal.golive_reminder_7_sent && "7d",
    deal.golive_reminder_14_sent && "14d",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderLeft: `3px solid ${color}`,
        border: "1px solid rgba(255,255,255,0.08)",
        borderLeftWidth: 3,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[14px] font-semibold text-white leading-tight truncate">
            {customer?.name ?? "Unknown"}
          </div>
          {customer?.company && (
            <div className="mt-0.5 text-[11.5px] text-[#94a3b8] truncate">
              {customer.company}
            </div>
          )}
        </div>
        <span
          className="font-mono text-[9px] font-semibold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full whitespace-nowrap"
          style={{ color, background: `${color}1A` }}
        >
          {STATUS_LABEL[deal.status]}
        </span>
      </div>

      <div className="font-mono text-[10px] text-[#64748b] leading-[1.5]">
        {deal.deal_type.replace(/_/g, " ")}
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
        {deal.total_amount !== null && (
          <Row label="Total" value={cents(deal.total_amount)} />
        )}
        {deal.upfront_amount !== null && (
          <Row label="Upfront" value={cents(deal.upfront_amount)} />
        )}
        {deal.golive_amount !== null && (
          <Row label="Go-live" value={cents(deal.golive_amount)} />
        )}
        {deal.monthly_amount !== null && (
          <Row label="Monthly" value={`${cents(deal.monthly_amount)}/mo`} />
        )}
      </div>

      {(deal.golive_scheduled_date || deal.maintenance_start_date) && (
        <div className="pt-2 border-t border-white/5 space-y-0.5 text-[10.5px] font-mono text-[#94a3b8]">
          {deal.golive_scheduled_date && (
            <div>
              go-live scheduled · {deal.golive_scheduled_date.slice(0, 10)}
            </div>
          )}
          {deal.maintenance_start_date && (
            <div>
              maintenance starts · {deal.maintenance_start_date.slice(0, 10)}
            </div>
          )}
        </div>
      )}

      {deal.status === "golive_invoiced" && (
        <div className="pt-2 border-t border-white/5 text-[10.5px] font-mono text-[#f59e0b]">
          {days} day{days === 1 ? "" : "s"} since invoice
          {remindersSent && ` · reminders: ${remindersSent}`}
        </div>
      )}

      {(canSendGolive || canSetMaintenance) && (
        <div className="pt-1 flex flex-wrap gap-2">
          {canSendGolive && (
            <button
              type="button"
              onClick={onSendGolive}
              className="px-3 py-1.5 rounded-md bg-[#38b6ff]/10 hover:bg-[#38b6ff]/20 border border-[#38b6ff]/30 text-[#38b6ff] text-[11px] font-semibold transition-colors"
            >
              Send go-live invoice
            </button>
          )}
          {canSetMaintenance && (
            <button
              type="button"
              onClick={onSetMaintenance}
              className="px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#cbd5e1] text-[11px] font-semibold transition-colors"
            >
              Set maintenance date
            </button>
          )}
        </div>
      )}

      <div className="font-mono text-[9.5px] text-[#475569] mt-auto pt-2 border-t border-white/5">
        {new Date(deal.created_at).toLocaleDateString()} · id {deal.id.slice(0, 8)}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#64748b]">
        {label}
      </span>
      <span className="font-mono text-[11px] text-white tabular-nums text-right">
        {value}
      </span>
    </>
  );
}
