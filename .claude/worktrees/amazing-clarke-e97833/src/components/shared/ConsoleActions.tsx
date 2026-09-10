"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Mail, ClipboardList, Zap, Check, ArrowRight } from "lucide-react";
import type {
  ConsoleAction,
  CalendarAction,
  ContactInfoAction,
  IntakeAction,
  DirectChatAction,
} from "@/types/console-actions";

const EASE = [0.16, 1, 0.3, 1] as const;

type Contact = { name?: string; email?: string; phone?: string };

export interface ConsoleActionsProps {
  actions: ConsoleAction[];
  context?: string; // e.g. the original query text, for lead attribution
  knownContact?: Contact; // pre-filled intake / direct-chat identity
}

export function ConsoleActions({ actions, context, knownContact }: ConsoleActionsProps) {
  const [intakeContact, setIntakeContact] = useState<Contact | undefined>(knownContact);

  if (!actions || actions.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-[#e2e8f0]/70">
      <div className="flex flex-col gap-3">
        {actions.map((a, i) => (
          <motion.div
            key={`${a.type}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: EASE }}
          >
            {a.type === "calendar" && <CalendarRenderer action={a} />}
            {a.type === "contact_info" && <ContactInfoRenderer action={a} />}
            {a.type === "intake" && (
              <IntakeRenderer
                action={a}
                context={context}
                onSuccess={(c) => setIntakeContact(c)}
              />
            )}
            {a.type === "direct_chat" && (
              <DirectChatRenderer
                action={a}
                context={context}
                contact={intakeContact}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ActionCard({
  accent,
  icon,
  title,
  description,
  children,
}: {
  accent: "blue" | "teal" | "purple" | "amber";
  icon: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  const color = {
    blue: "#38b6ff",
    teal: "#14b8a6",
    purple: "#8b5cf6",
    amber: "#f59e0b",
  }[accent];

  return (
    <div
      className="dash-card p-5 relative"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ background: `${color}1A`, color }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-[#0f172a] leading-tight">
            {title}
          </div>
          {description && (
            <div className="mt-1 text-[12px] text-[#64748b] leading-[1.5]">
              {description}
            </div>
          )}
          {children && <div className="mt-3">{children}</div>}
        </div>
      </div>
    </div>
  );
}

function CalendarRenderer({ action }: { action: CalendarAction }) {
  // Treat anything that isn't http(s) as an internal link (uses Next.js Link,
  // same tab). External links keep target=_blank.
  const isInternal = !/^https?:\/\//i.test(action.url);
  const buttonClass =
    "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] text-[12px] font-semibold transition-all";
  const label = (
    <>
      {isInternal ? "Pick a time" : "Open Calendar"}{" "}
      <ArrowRight className="h-3.5 w-3.5" />
    </>
  );

  return (
    <ActionCard
      accent="blue"
      icon={<Calendar className="h-4 w-4" />}
      title={action.label}
      description={action.description}
    >
      {isInternal ? (
        <Link href={action.url} className={buttonClass}>
          {label}
        </Link>
      ) : (
        <a
          href={action.url}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          {label}
        </a>
      )}
    </ActionCard>
  );
}

function ContactInfoRenderer({ action }: { action: ContactInfoAction }) {
  return (
    <ActionCard
      accent="teal"
      icon={<Mail className="h-4 w-4" />}
      title={action.label}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
        <a
          href={`mailto:${action.email}`}
          className="text-[#0A8FD4] hover:text-[#38b6ff] font-medium transition-colors"
        >
          {action.email}
        </a>
        <span className="text-[#cbd5e1]">•</span>
        <a
          href={`tel:${action.phone.replace(/[^\d+]/g, "")}`}
          className="text-[#0A8FD4] hover:text-[#38b6ff] font-medium transition-colors"
        >
          {action.phone}
        </a>
      </div>
    </ActionCard>
  );
}

function IntakeRenderer({
  action,
  context,
  onSuccess,
}: {
  action: IntakeAction;
  context?: string;
  onSuccess?: (c: Contact) => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      setState("error");
      return;
    }
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, context }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setState("sent");
      onSuccess?.({ name: form.name, email: form.email, phone: form.phone });
    } catch {
      setState("error");
      setError("Couldn't send right now. Try again or email hello@xeedly.com.");
    }
  }

  if (state === "sent") {
    return (
      <ActionCard
        accent="teal"
        icon={<Check className="h-4 w-4" />}
        title="Sent"
        description="Shad will see this shortly and reach out directly."
      />
    );
  }

  return (
    <ActionCard
      accent="purple"
      icon={<ClipboardList className="h-4 w-4" />}
      title={action.label}
      description={action.description || "Share your details — he'll reach out directly."}
    >
      <form onSubmit={onSubmit} className="space-y-2.5">
        <IntakeInput
          placeholder="Name"
          required
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
        />
        <IntakeInput
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
        />
        <IntakeInput
          type="tel"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v })}
        />
        <textarea
          placeholder="Anything specific we should know? (optional)"
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] bg-white text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 transition resize-none"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] disabled:opacity-60 text-[#0f172a] text-[13px] font-semibold transition-all"
        >
          {state === "sending" ? "Sending..." : "Send →"}
        </button>
        {error && state === "error" && (
          <p className="text-[12px] text-[#ef4444]">{error}</p>
        )}
      </form>
    </ActionCard>
  );
}

function IntakeInput({
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: {
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] bg-white text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 transition"
    />
  );
}

function DirectChatRenderer({
  action,
  context,
  contact,
}: {
  action: DirectChatAction;
  context?: string;
  contact?: Contact;
}) {
  const hasIdentity = Boolean(contact?.name && contact?.email);
  const [identity, setIdentity] = useState<Contact>(contact || {});
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<{ text: string; at: string }[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ready = Boolean(identity.name && identity.email);

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    if (!ready) {
      setError("Name and email first so Shad knows who you are.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/direct-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          senderName: identity.name,
          senderEmail: identity.email,
          senderPhone: identity.phone,
          context,
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const at = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      setSent((s) => [...s, { text, at }]);
      setMessage("");
    } catch {
      setError("Couldn't deliver the message. Try again in a moment.");
    } finally {
      setSending(false);
    }
  }

  return (
    <ActionCard
      accent="amber"
      icon={<Zap className="h-4 w-4" />}
      title={action.label}
      description={action.description || "Shad gets notified instantly on his phone."}
    >
      {!hasIdentity && !ready && (
        <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <IntakeInput
            placeholder="Name"
            required
            value={identity.name || ""}
            onChange={(v) => setIdentity({ ...identity, name: v })}
          />
          <IntakeInput
            type="email"
            placeholder="Email"
            required
            value={identity.email || ""}
            onChange={(v) => setIdentity({ ...identity, email: v })}
          />
        </div>
      )}

      <form onSubmit={onSend} className="flex items-stretch gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border border-[#e2e8f0] bg-white text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 transition"
        />
        <button
          type="submit"
          disabled={sending || !message.trim() || !ready}
          className="px-4 py-2 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] disabled:opacity-60 text-white text-[12px] font-semibold transition-all"
        >
          {sending ? "..." : "Send"}
        </button>
      </form>

      {error && <p className="mt-2 text-[12px] text-[#ef4444]">{error}</p>}

      {sent.length > 0 && (
        <div className="mt-3 space-y-2">
          {sent.map((m, i) => (
            <div key={i} className="rounded-lg bg-[#f8fafc] px-3 py-2">
              <div className="text-[12.5px] text-[#334155] leading-[1.5]">
                <span className="font-semibold text-[#0f172a]">You:</span>{" "}
                {m.text}
              </div>
              <div className="mt-1 font-mono text-[10px] text-[#94a3b8]">
                sent {m.at}
              </div>
            </div>
          ))}
          <div className="font-mono text-[11px] italic text-[#64748b]">
            &gt; Shad has been notified...
          </div>
        </div>
      )}
    </ActionCard>
  );
}
