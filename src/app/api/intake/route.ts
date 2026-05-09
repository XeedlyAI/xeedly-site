import { NextRequest, NextResponse } from "next/server";
import { sendEmail, sendSMS, escapeHtml } from "@/lib/notifications";
import { CONTACT } from "@/lib/contact";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

/** Comma-separated list — falls back to shad@xeedly.com when ADMIN_EMAILS is unset. */
function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "shad@xeedly.com")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const context = typeof body?.context === "string" ? body.context : "";
    // Richer fields from the /contact ContactPanel form (optional)
    const company = typeof body?.company === "string" ? body.company.trim() : "";
    const role = typeof body?.role === "string" ? body.role.trim() : "";
    const size = typeof body?.size === "string" ? body.size.trim() : "";
    const interest =
      typeof body?.interest === "string" ? body.interest.trim() : "";
    const source = typeof body?.source === "string" ? body.source : "intake";

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email required" },
        { status: 400 },
      );
    }

    // Honeypot — bots fill this hidden field, real users don't.
    const website = typeof body?.website === "string" ? body.website : "";
    if (website) {
      return NextResponse.json({ success: true, message: "Received" });
    }

    // Turnstile verification
    const cfToken = typeof body?.cfToken === "string" ? body.cfToken : "";
    if (process.env.TURNSTILE_SECRET_KEY && !cfToken) {
      return NextResponse.json({ error: "Verification required" }, { status: 400 });
    }
    if (cfToken) {
      const valid = await verifyTurnstileToken(cfToken);
      if (!valid) {
        return NextResponse.json({ error: "Verification failed" }, { status: 403 });
      }
    }

    const timestamp = new Date().toISOString();

    // Structured log — visible in Vercel logs.
    console.log(
      JSON.stringify({
        event: "lead_intake",
        timestamp,
        lead: { name, email, phone, company, role, size, interest, message },
        context,
        source,
      }),
    );

    // ----- Notifications -----------------------------------------------------
    const subjectName = company ? `${name} from ${company}` : name;

    const adminHtml = `
      <div style="font-family: -apple-system, Segoe UI, Inter, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #0f172a;">
        <div style="font-family: ui-monospace, Menlo, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #38b6ff;">XeedlyAI · New Contact</div>
        <h1 style="margin: 12px 0 4px; font-size: 22px;">${escapeHtml(subjectName)}</h1>
        <p style="margin: 0; color: #64748b; font-size: 13px;">${escapeHtml(timestamp)}</p>

        <table cellpadding="0" cellspacing="0" style="margin-top: 24px; border-collapse: collapse; width: 100%; font-size: 14px;">
          ${row("Name", name)}
          ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#0A8FD4;">${escapeHtml(email)}</a>`)}
          ${phone ? row("Phone", `<a href="tel:${escapeHtml(phone)}" style="color:#0A8FD4;">${escapeHtml(phone)}</a>`) : ""}
          ${company ? row("Company", company) : ""}
          ${role ? row("Role", role) : ""}
          ${size ? row("Locations / Size", size) : ""}
          ${interest ? row("Interest", interest) : ""}
          ${context ? row("Context", context) : ""}
          ${row("Source", source)}
        </table>

        ${
          message
            ? `<div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-left: 3px solid #38b6ff; border-radius: 6px;">
                <div style="font-family: ui-monospace, Menlo, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #64748b;">Message</div>
                <p style="margin: 8px 0 0; font-size: 14px; line-height: 1.65; white-space: pre-wrap;">${escapeHtml(message)}</p>
              </div>`
            : ""
        }

        <p style="margin-top: 24px; color: #94a3b8; font-size: 12px;">Reply directly to this email to respond.</p>
      </div>
    `;

    const visitorHtml = `
      <div style="font-family: -apple-system, Segoe UI, Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0f172a;">
        <div style="font-family: ui-monospace, Menlo, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #38b6ff;">XeedlyAI</div>
        <p style="margin-top: 16px; font-size: 15px; line-height: 1.65;">Hi ${escapeHtml(name)},</p>
        <p style="font-size: 15px; line-height: 1.65;">Thanks for reaching out. We received your message and Shad will respond within one business day.</p>
        <p style="font-size: 15px; line-height: 1.65;">In the meantime, you might find these useful:</p>
        <ul style="font-size: 15px; line-height: 1.7; padding-left: 20px;">
          <li>Try the <a href="https://xeedly.com/#console" style="color:#0A8FD4;">Intelligence Console</a> on our homepage — ask anything about XeedlyAI.</li>
          <li>Skip the back-and-forth and <a href="https://xeedly.com/booking" style="color:#0A8FD4;">book a discovery call</a>.</li>
        </ul>
        <p style="color: #64748b; font-size: 13px; margin-top: 32px; line-height: 1.65;">Questions in the meantime? Reply to this email or call ${escapeHtml(CONTACT.phone)}.</p>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">— XeedlyAI</p>
      </div>
    `;

    const adminSubject = company
      ? `New Contact — ${name} from ${company}`
      : `New Contact — ${name}`;

    // Truncate the message preview to 100 chars for SMS body.
    const msgPreview = message
      ? message.length > 100
        ? `${message.slice(0, 100)}…`
        : message
      : "(no message)";
    const smsBody = company
      ? `New contact: ${name} (${company}) — ${msgPreview}`
      : `New contact: ${name} — ${msgPreview}`;

    const adminPhone = process.env.TWILIO_ADMIN_NOTIFY_NUMBER;

    // Fire all three in parallel; failures are isolated.
    await Promise.allSettled([
      ...adminEmails().map((to) => sendEmail(to, adminSubject, adminHtml)),
      sendEmail(email, "We got your message — XeedlyAI", visitorHtml),
      adminPhone ? sendSMS(adminPhone, smsBody) : Promise.resolve(false),
    ]);

    return NextResponse.json({ success: true, message: "Received" });
  } catch (error) {
    console.error("Intake error:", error);
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
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

