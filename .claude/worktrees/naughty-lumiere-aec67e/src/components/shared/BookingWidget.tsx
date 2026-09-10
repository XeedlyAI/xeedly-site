"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Pencil, AlertCircle } from "lucide-react";
import { formatInTimeZone } from "date-fns-tz";

const EASE = [0.16, 1, 0.3, 1] as const;
const TZ = "America/Denver";
const TZ_LABEL = "MST";

type Slot = {
  date: string; // YYYY-MM-DD local
  time: string; // HH:mm 24h local
  datetimeUtc: string;
};

type AvailabilityResponse = {
  slots: Slot[];
  timezone: string;
  configured: boolean;
  message?: string;
};

type BookingResult = {
  success: boolean;
  eventId: string | null;
  meetLink: string | null;
  startUtc: string;
  endUtc: string;
};

type Step = "date" | "time" | "form" | "success";

// ---------------------------------------------------------------------------
// Date helpers (kept local; all display uses America/Denver)
// ---------------------------------------------------------------------------

function todayStr(): string {
  return formatInTimeZone(new Date(), TZ, "yyyy-MM-dd");
}

function addDaysStr(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const jd = new Date(Date.UTC(y, m - 1, d));
  jd.setUTCDate(jd.getUTCDate() + days);
  return jd.toISOString().slice(0, 10);
}

function dayOfWeekSun0(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

function formatDayNumber(dateStr: string): string {
  const [, , d] = dateStr.split("-").map(Number);
  return String(d);
}

function formatMonthYearLabel(dateStr: string): string {
  const [y, m] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, 1));
  return formatInTimeZone(dt, TZ, "MMMM yyyy");
}

function formatLongDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return formatInTimeZone(dt, TZ, "EEEE, MMMM d");
}

function format12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function BookingWidget() {
  const [step, setStep] = useState<Step>("date");
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  // 3-week grid anchor: start at the Sunday of the current week in TZ.
  const gridStart = useMemo(() => {
    const today = todayStr();
    const dow = dayOfWeekSun0(today);
    return addDaysStr(today, -dow);
  }, []);

  const gridDates = useMemo(() => {
    return Array.from({ length: 21 }, (_, i) => addDaysStr(gridStart, i));
  }, [gridStart]);

  const todayMemo = useMemo(() => todayStr(), []);
  const endQueryStr = useMemo(() => gridDates[gridDates.length - 1], [gridDates]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setLoadError(null);
      try {
        const res = await fetch(
          `/api/booking/availability?start=${todayMemo}&end=${endQueryStr}`,
          { cache: "no-store" },
        );
        const data = (await res.json()) as AvailabilityResponse & {
          error?: string;
        };
        if (cancelled) return;
        if (!res.ok && res.status !== 503) {
          setLoadError(data.error || "Failed to load availability.");
          setAvailability(null);
        } else {
          setAvailability(data);
        }
      } catch {
        if (!cancelled) setLoadError("Network error loading availability.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [todayMemo, endQueryStr]);

  // Group slots by date for fast lookup.
  const slotsByDate = useMemo(() => {
    const map = new Map<string, Slot[]>();
    if (!availability) return map;
    for (const slot of availability.slots) {
      const list = map.get(slot.date) || [];
      list.push(slot);
      map.set(slot.date, list);
    }
    return map;
  }, [availability]);

  const slotsForSelectedDate = selectedDate
    ? slotsByDate.get(selectedDate) || []
    : [];

  function onSelectDate(dateStr: string) {
    setSelectedDate(dateStr);
    setStep("time");
  }

  function onSelectSlot(slot: Slot) {
    setSelectedSlot(slot);
    setStep("form");
  }

  function resetToTime() {
    setSelectedSlot(null);
    setStep("time");
  }

  function resetAll() {
    setSelectedDate(null);
    setSelectedSlot(null);
    setStep("date");
  }

  return (
    <div className="w-full">
      {/* Unavailable banner */}
      {availability && !availability.configured && (
        <div
          className="mb-6 rounded-xl dash-card p-5 flex items-start gap-3"
          style={{ borderLeft: "3px solid #f59e0b" }}
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-[#f59e0b] mt-0.5" />
          <div>
            <div className="text-[13px] font-semibold text-[#0f172a]">
              Booking temporarily unavailable
            </div>
            <p className="mt-1 text-[12.5px] leading-[1.5] text-[#64748b]">
              {availability.message ||
                "Direct booking isn't connected yet. Email or call us instead."}
            </p>
          </div>
        </div>
      )}

      {loadError && (
        <div
          className="mb-6 rounded-xl dash-card p-5 flex items-start gap-3"
          style={{ borderLeft: "3px solid #ef4444" }}
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-[#ef4444] mt-0.5" />
          <div>
            <div className="text-[13px] font-semibold text-[#0f172a]">
              Couldn&apos;t load availability
            </div>
            <p className="mt-1 text-[12.5px] leading-[1.5] text-[#64748b]">
              {loadError}
            </p>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === "date" && (
          <motion.div
            key="date"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <DateGrid
              gridDates={gridDates}
              today={todayMemo}
              slotsByDate={slotsByDate}
              loading={loading}
              onSelect={onSelectDate}
            />
          </motion.div>
        )}

        {step === "time" && selectedDate && (
          <motion.div
            key="time"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <TimeGrid
              dateStr={selectedDate}
              slots={slotsForSelectedDate}
              onBack={resetAll}
              onSelect={onSelectSlot}
            />
          </motion.div>
        )}

        {step === "form" && selectedSlot && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <BookingForm
              slot={selectedSlot}
              onBack={resetToTime}
              onSuccess={() => setStep("success")}
            />
          </motion.div>
        )}

        {step === "success" && selectedSlot && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <SuccessCard slot={selectedSlot} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 1 — Date grid
// ---------------------------------------------------------------------------

const WEEK_HEADERS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function DateGrid({
  gridDates,
  today,
  slotsByDate,
  loading,
  onSelect,
}: {
  gridDates: string[];
  today: string;
  slotsByDate: Map<string, Slot[]>;
  loading: boolean;
  onSelect: (dateStr: string) => void;
}) {
  const monthLabel = formatMonthYearLabel(gridDates[0]);
  const endMonthLabel = formatMonthYearLabel(gridDates[gridDates.length - 1]);
  const label =
    monthLabel === endMonthLabel
      ? monthLabel
      : `${monthLabel} – ${endMonthLabel}`;

  return (
    <div className="dash-card p-5 md:p-6">
      <div className="flex items-baseline justify-between mb-5">
        <div className="font-mono text-[13px] font-semibold text-[#0f172a]">
          {label}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#64748b]">
          Step 1 · Choose a date
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-2">
        {WEEK_HEADERS.map((h) => (
          <div
            key={h}
            className="font-mono text-[10px] font-semibold tracking-[0.12em] text-[#94a3b8] text-center py-1"
          >
            {h}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {gridDates.map((dateStr) => {
          const isPast = dateStr < today;
          const isToday = dateStr === today;
          const slots = slotsByDate.get(dateStr) || [];
          const hasSlots = slots.length > 0;
          const disabled = isPast || (!loading && !hasSlots);

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => !disabled && onSelect(dateStr)}
              disabled={disabled || loading}
              aria-label={`Select ${formatLongDate(dateStr)}`}
              className={`relative aspect-square rounded-lg border text-center flex flex-col items-center justify-center transition-all ${
                disabled
                  ? "border-[#e2e8f0]/70 bg-[#f8fafc]/40 text-[#cbd5e1] cursor-not-allowed"
                  : "border-[#e2e8f0] bg-white hover:border-[#38b6ff] hover:-translate-y-0.5 text-[#0f172a] cursor-pointer"
              }`}
            >
              <span
                className={`font-mono text-[13px] font-semibold ${
                  isPast ? "line-through" : ""
                }`}
              >
                {formatDayNumber(dateStr)}
              </span>
              {hasSlots && !isPast && (
                <span className="mt-0.5 font-mono text-[9px] text-[#64748b]">
                  {slots.length}
                </span>
              )}
              {isToday && (
                <span
                  aria-hidden
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#14b8a6]"
                />
              )}
            </button>
          );
        })}
      </div>

      {loading && (
        <div className="mt-5 flex items-center gap-2 font-mono text-[11px] text-[#64748b]">
          <span className="relative inline-flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[#38b6ff] animate-ping opacity-75" />
            <span className="relative rounded-full w-2 h-2 bg-[#38b6ff]" />
          </span>
          Checking availability...
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-[#e2e8f0] flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-[#94a3b8]">
        <span>timezone: {TZ_LABEL} · America/Denver</span>
        <span>max book-ahead: 3 weeks</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 2 — Time pills
// ---------------------------------------------------------------------------

function TimeGrid({
  dateStr,
  slots,
  onBack,
  onSelect,
}: {
  dateStr: string;
  slots: Slot[];
  onBack: () => void;
  onSelect: (slot: Slot) => void;
}) {
  const isSaturday = dayOfWeekSun0(dateStr) === 6;

  return (
    <div className="dash-card p-5 md:p-6">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#64748b]">
            Step 2 · Choose a time
          </div>
          <div className="mt-1.5 text-[14px] font-semibold text-[#0f172a]">
            Available times for {formatLongDate(dateStr)}
          </div>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#38b6ff] hover:text-[#0A8FD4] transition-colors"
        >
          ← back
        </button>
      </div>

      {isSaturday && slots.length > 0 && (
        <div className="mb-4 font-mono text-[10px] italic text-[#64748b]">
          Saturday — limited availability (1 meeting per Saturday)
        </div>
      )}

      {slots.length === 0 ? (
        <div
          className="rounded-xl border p-5 flex items-start gap-3"
          style={{
            borderLeft: "3px solid #f59e0b",
            borderColor: "#e2e8f0",
            background: "#fffaf0",
          }}
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-[#f59e0b] mt-0.5" />
          <div>
            <div className="text-[13px] font-semibold text-[#0f172a]">
              No availability on this date
            </div>
            <p className="mt-1 text-[12.5px] leading-[1.5] text-[#64748b]">
              Try another day from the calendar.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {slots.map((slot) => (
            <button
              key={slot.datetimeUtc}
              type="button"
              onClick={() => onSelect(slot)}
              className="font-mono text-[12px] px-3 py-2 rounded-lg border border-[#e2e8f0] bg-white hover:border-[#38b6ff] hover:text-[#0A8FD4] text-[#0f172a] transition-all"
            >
              {format12h(slot.time)}
            </button>
          ))}
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-[#e2e8f0] font-mono text-[10px] uppercase tracking-[0.08em] text-[#94a3b8]">
        duration: 30 minutes · timezone: {TZ_LABEL}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 3 — Form
// ---------------------------------------------------------------------------

function BookingForm({
  slot,
  onBack,
  onSuccess,
}: {
  slot: Slot;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      setState("error");
      return;
    }
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          datetime: slot.datetimeUtc,
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          topic: topic.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { error?: string; code?: string } & BookingResult;
      if (!res.ok) {
        if (data.code === "SLOT_TAKEN") {
          setError(
            "This slot was just booked. Please go back and pick another time.",
          );
        } else {
          setError(data.error || "Couldn't confirm the booking. Try again.");
        }
        setState("error");
        return;
      }
      onSuccess();
    } catch {
      setError("Network error. Try again.");
      setState("error");
    }
  }

  const whenLabel = `${formatLongDate(slot.date)} · ${format12h(slot.time)} ${TZ_LABEL}`;

  return (
    <div className="dash-card p-5 md:p-6">
      <div className="flex items-baseline justify-between mb-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#64748b]">
          Step 3 · Confirm
        </div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#38b6ff] hover:text-[#0A8FD4] transition-colors"
        >
          <Pencil className="h-3 w-3" />
          change
        </button>
      </div>

      <div
        className="mb-5 rounded-lg p-3 font-mono text-[12px] font-semibold"
        style={{
          background: "rgba(56,182,255,0.08)",
          color: "#0A8FD4",
          borderLeft: "3px solid #38b6ff",
        }}
      >
        {whenLabel} · 30 minutes
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <FormInput
          label="Name"
          required
          value={name}
          onChange={setName}
          placeholder="Your full name"
        />
        <FormInput
          label="Email"
          type="email"
          required
          value={email}
          onChange={setEmail}
          placeholder="you@company.com"
        />
        <FormInput
          label="Company"
          value={company}
          onChange={setCompany}
          placeholder="Optional"
        />
        <div>
          <label className="block font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b] mb-1.5">
            What do you want to discuss?
          </label>
          <textarea
            rows={2}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Intelligence platform for my fleet management company"
            className="w-full px-3 py-2.5 rounded-lg border border-[#e2e8f0] bg-white text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 transition resize-none"
          />
        </div>

        {error && state === "error" && (
          <div className="flex items-start gap-2 text-[12px] text-[#ef4444]">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={state === "sending"}
          className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] disabled:opacity-60 text-[#0f172a] text-[14px] font-semibold transition-all"
        >
          {state === "sending" ? "Booking..." : "Confirm Booking"}
        </button>
      </form>

      <div className="mt-5 pt-4 border-t border-[#e2e8f0] font-mono text-[10px] uppercase tracking-[0.08em] text-[#94a3b8]">
        calendar invite + google meet link sent on confirm
      </div>
    </div>
  );
}

function FormInput({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b] mb-1.5">
        {label}
        {required && <span className="text-[#ef4444] ml-1">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-lg border border-[#e2e8f0] bg-white text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 transition"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 4 — Success
// ---------------------------------------------------------------------------

function SuccessCard({ slot }: { slot: Slot }) {
  const whenLabel = `${formatLongDate(slot.date)} · ${format12h(slot.time)} ${TZ_LABEL}`;

  return (
    <div
      className="dash-card p-6 md:p-7"
      style={{ borderLeft: "3px solid #14b8a6" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="relative inline-flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-[#14b8a6] animate-ping opacity-70" />
          <span className="relative rounded-full w-2 h-2 bg-[#14b8a6]" />
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0d9488]">
          Booked
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#14b8a6]/10 text-[#0d9488]">
          <Check className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-[16px] font-semibold text-[#0f172a]">
            Discovery Call with Shad
          </div>
          <div className="mt-1 text-[13px] text-[#334155]">{whenLabel}</div>
          <div className="mt-1 text-[13px] text-[#64748b]">Duration: 30 minutes</div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-[#e2e8f0] space-y-1.5">
        <div className="text-[12.5px] text-[#334155]">
          📧 Calendar invite sent to your email.
        </div>
        <div className="text-[12.5px] text-[#334155]">
          📹 Google Meet link is in the invite.
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-[#e2e8f0] flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-[#94a3b8]">
        <span>confirmation: delivered</span>
        <span>xeedly://cal</span>
      </div>
    </div>
  );
}
