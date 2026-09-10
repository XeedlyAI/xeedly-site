import { NextRequest, NextResponse } from "next/server";
import { sendEmail, sendSMS, escapeHtml } from "@/lib/notifications";

export const runtime = "nodejs";

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "shad@xeedly.com")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const senderName =
      typeof body?.senderName === "string" ? body.senderName.trim() : "";
    const senderEmail =
      typeof body?.senderEmail === "string" ? body.senderEmail.trim() : "";
    const senderPhone =
      typeof body?.senderPhone === "string" ? body.senderPhone.trim() : "";
    const context = typeof body?.context === "string" ? body.context : "";

    if (!message) {
      return NextResponse.json(
        { error: "Message required" },
        { status: 400 },
      );
    }

    const timestamp = new Date().toISOString();

    console.log(
      JSON.stringify({
        event: "direct_message",
        timestamp,
        sender: { name: senderName, email: senderEmail, phone: senderPhone },
        message,
        context,
      }),
    );

    // ----- Notifications -----------------------------------------------------
    const senderLabel = senderName || senderEmail || "Anonymous";
    const adminSubject = `Direct Message — ${senderLabel}`;

    const adminHtml = `
      <div style="font-family: -apple-system, Segoe UI, Inter, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #0f172a;">
        <div style="font-family: ui-monospace, Menlo, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #f59e0b;">XeedlyAI · Direct Message</div>
        <h1 style="margin: 12px 0 4px; font-size: 22px;">${escapeHtml(senderLabel)}</h1>
        <p style="margin: 0; color: #64748b; font-size: 13px;">${escapeHtml(timestamp)}</p>

        <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-left: 3px solid #f59e0b; border-radius: 6px;">
          <p style="margin: 0; font-size: 14px; line-height: 1.65; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>

        <table cellpadding="0" cellspacing="0" style="margin-top: 20px; border-collapse: collapse; width: 100%; font-size: 14px;">
          ${senderName ? row("Name", senderName) : ""}
          ${senderEmail ? row("Email", `<a href="mailto:${escapeHtml(senderEmail)}" style="color:#0A8FD4;">${escapeHtml(senderEmail)}</a>`) : ""}
          ${senderPhone ? row("Phone", `<a href="tel:${escapeHtml(senderPhone)}" style="color:#0A8FD4;">${escapeHtml(senderPhone)}</a>`) : ""}
          ${context ? row("Context", context) : ""}
        </table>

        <p style="margin-top: 24px; color: #94a3b8; font-size: 12px;">Reply directly to this email to respond.</p>
      </div>
    `;

    const msgPreview =
      message.length > 100 ? `${message.slice(0, 100)}…` : message;
    const smsBody = `⚡ Direct msg from ${senderLabel}: ${msgPreview}`;

    const adminPhone = process.env.TWILIO_ADMIN_NOTIFY_NUMBER;

    await Promise.allSettled([
      ...adminEmails().map((to) => sendEmail(to, adminSubject, adminHtml)),
      adminPhone ? sendSMS(adminPhone, smsBody) : Promise.resolve(false),
    ]);

    return NextResponse.json({ success: true, message: "Delivered" });
  } catch (error) {
    console.error("Direct message error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding: 6px 12px 6px 0; vertical-align: top; font-family: ui-monospace, Menlo, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; white-space: nowrap;">${escapeHtml(label)}</td>
      <td style="padding: 6px 0; vertical-align: top; color: #0f172a;">${value}</td>
    </tr>
  `;
}
