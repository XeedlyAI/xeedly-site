"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MiniConsole } from "./MiniConsole";
import { ConsoleActions } from "@/components/shared/ConsoleActions";
import type { ConsoleAction } from "@/types/console-actions";
import { CONTACT } from "@/lib/contact";

const EASE = [0.16, 1, 0.3, 1] as const;

const INTERESTS = [
  "Automated Growth Systems",
  "Intelligence Platform (restaurants / Sovvrn)",
  "Intelligence Platform (property / Propertyolio)",
  "Custom vertical deployment",
  "Just exploring",
];

const SIZES = ["1", "2–5", "6–20", "21–100", "100+"];

const SUCCESS_ACTIONS: ConsoleAction[] = [
  {
    type: "direct_chat",
    label: "Message Shad directly",
    description: "He gets notified instantly on his phone.",
  },
  {
    type: "calendar",
    label: "Or book a Discovery Call",
    url: CONTACT.calendar,
    description: "30 minutes, no pitch — just answers.",
  },
];

export function ContactPanel() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    size: "",
    interest: "",
    message: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In-site demo submission — logs for now.
    console.info("contact_form_submit", form);
    setSubmitted(true);
  };

  return (
    <section className="section-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form — 60% */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:col-span-3"
          >
            <div className="dash-card p-7 md:p-9 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#38b6ff]"
              />
              {submitted ? (
                <div className="py-2">
                  <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#14b8a6]/10 mb-5">
                      <Check className="h-6 w-6 text-[#0d9488]" />
                    </div>
                    <h3 className="text-[18px] font-bold text-[#0f172a]">
                      Message received.
                    </h3>
                    <p className="mt-3 text-[13.5px] text-[#334155] max-w-md mx-auto leading-[1.7]">
                      Shad will respond within one business day. Want to keep
                      the conversation moving now?
                    </p>
                  </div>
                  <ConsoleActions
                    actions={SUCCESS_ACTIONS}
                    context={`Contact form: ${form.interest || "general"} — ${
                      form.company || "no company"
                    }`}
                    knownContact={{
                      name: form.name,
                      email: form.email,
                    }}
                  />
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
                      Tell us about you
                    </div>
                    <h2 className="mt-2 text-[20px] font-bold text-[#0f172a]">
                      Start a conversation
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Name" required>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-[#e2e8f0] bg-white text-[14px] text-[#0f172a] outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 transition"
                      />
                    </Field>
                    <Field label="Email" required>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-[#e2e8f0] bg-white text-[14px] text-[#0f172a] outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 transition"
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Company">
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-[#e2e8f0] bg-white text-[14px] text-[#0f172a] outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 transition"
                      />
                    </Field>
                    <Field label="Role">
                      <input
                        type="text"
                        placeholder="Owner, Operator, CTO…"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-[#e2e8f0] bg-white text-[14px] text-[#0f172a] outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 transition"
                      />
                    </Field>
                  </div>

                  <Field label="Locations / Size">
                    <div className="flex flex-wrap gap-2">
                      {SIZES.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setForm({ ...form, size: s })}
                          className={`px-3 py-1.5 rounded-full text-[12px] font-mono font-semibold border transition ${
                            form.size === s
                              ? "bg-[#0f172a] text-white border-[#0f172a]"
                              : "bg-white text-[#334155] border-[#e2e8f0] hover:border-[#94a3b8]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="I'm interested in">
                    <div className="flex flex-col gap-2">
                      {INTERESTS.map((i) => (
                        <label
                          key={i}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-[13px] cursor-pointer transition ${
                            form.interest === i
                              ? "border-[#38b6ff] bg-[#38b6ff]/5 text-[#0f172a]"
                              : "border-[#e2e8f0] text-[#334155] hover:border-[#94a3b8]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="interest"
                            value={i}
                            checked={form.interest === i}
                            onChange={() => setForm({ ...form, interest: i })}
                            className="h-3.5 w-3.5 accent-[#38b6ff]"
                          />
                          {i}
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field label="What are you trying to solve?">
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#e2e8f0] bg-white text-[14px] text-[#0f172a] outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 transition resize-none"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] font-bold text-[14px] transition-all"
                  >
                    Send Message
                  </button>
                  <p className="text-[11px] text-[#64748b] text-center leading-[1.55]">
                    We&apos;ll respond within one business day. No sales
                    sequences, no drip campaigns. By submitting, you agree to
                    our{" "}
                    <a
                      href="/terms"
                      className="text-[#0A8FD4] hover:text-[#38b6ff] underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-[#0A8FD4] hover:text-[#38b6ff] underline"
                    >
                      Privacy Policy
                    </a>
                    . If you share a phone number, you consent to receive
                    automated text messages and calls from XeedlyAI. Message
                    frequency varies. Msg &amp; data rates may apply. Reply
                    STOP to opt out.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Console — 40% */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="lg:col-span-2"
          >
            <MiniConsole />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.12em] text-[#64748b] mb-1.5">
        {label}
        {required && <span className="text-[#ef4444] ml-0.5">*</span>}
      </div>
      {children}
    </label>
  );
}
