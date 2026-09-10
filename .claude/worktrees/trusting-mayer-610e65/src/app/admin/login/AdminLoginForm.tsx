"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      const target = next && next.startsWith("/") ? next : "/admin/close";
      router.push(target);
      router.refresh();
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm rounded-xl p-8"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 40px -20px rgba(0,0,0,0.5)",
      }}
    >
      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#38b6ff]">
        XeedlyAI · Admin
      </div>
      <h1 className="mt-3 text-[22px] font-bold text-white tracking-tight">
        Enter admin PIN
      </h1>
      <p className="mt-2 text-[13px] text-[#94a3b8] leading-[1.6]">
        Protected tools for deal closing and pipeline management.
      </p>

      <div className="mt-6">
        <label
          htmlFor="pin"
          className="block font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b] mb-2"
        >
          PIN
        </label>
        <input
          id="pin"
          type="password"
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full px-4 py-3 rounded-lg text-[16px] font-mono tracking-[0.3em] text-center text-white bg-white/[0.04] border border-white/10 focus:outline-none focus:border-[#38b6ff]/50 focus:bg-white/[0.06] transition-colors"
          placeholder="••••••"
        />
      </div>

      {error && (
        <div className="mt-4 text-[12px] text-[#ef4444] font-mono">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !pin.trim()}
        className="mt-6 w-full px-5 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] disabled:opacity-40 text-[#0f172a] text-[14px] font-semibold transition-all"
      >
        {loading ? "Verifying..." : "Unlock"}
      </button>

      <p className="mt-5 font-mono text-[10px] text-[#64748b] text-center">
        Session expires after 24 hours.
      </p>
    </form>
  );
}
