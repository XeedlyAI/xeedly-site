/**
 * SMS + Email delivery helpers.
 *
 * Both gracefully degrade to console logging when the underlying provider
 * credentials aren't configured — so the build and the deal-closer flow still
 * work without blocking on infra setup.
 */

// ----------------------------------------------------------------------------
// SMS (Twilio)
// ----------------------------------------------------------------------------

export async function sendSMS(to: string, body: string): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;

  if (!sid || !token || !from) {
    // TODO: Wire up Twilio — https://www.twilio.com/console
    console.log("[SMS STUB — Twilio not configured]", { to, body });
    return false;
  }

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " + Buffer.from(`${sid}:${token}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ To: to, From: from, Body: body }),
      },
    );
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Twilio SMS failed:", res.status, text);
      return false;
    }
    return true;
  } catch (e) {
    console.error("SMS send failed:", e);
    return false;
  }
}

// ----------------------------------------------------------------------------
// Email (Resend)
// ----------------------------------------------------------------------------

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "hello@xeedly.com";

  if (!apiKey) {
    // TODO: Wire up Resend — https://resend.com
    console.log("[EMAIL STUB — Resend not configured]", { to, subject });
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Resend email failed:", res.status, text);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Email send failed:", e);
    return false;
  }
}

// ----------------------------------------------------------------------------
// High-level helpers
// ----------------------------------------------------------------------------

/**
 * Deliver a payment link via SMS + email simultaneously.
 * `amount` is already formatted ("$1,250" or "$597/mo").
 */
export async function sendPaymentLink(
  customer: { name: string; email: string; phone?: string | null },
  paymentUrl: string,
  productName: string,
  amount: string,
): Promise<{ sms: boolean; email: boolean }> {
  const smsBody = `XeedlyAI — Thanks for the conversation, ${customer.name}. Here's your ${productName} payment link (${amount}): ${paymentUrl}`;

  const emailHtml = `
    <div style="font-family: -apple-system, Segoe UI, Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0f172a;">
      <div style="font-family: ui-monospace, Menlo, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #38b6ff;">XeedlyAI</div>
      <p style="margin-top: 16px; font-size: 15px; line-height: 1.6;">Hi ${escapeHtml(customer.name)},</p>
      <p style="font-size: 15px; line-height: 1.6;">Thanks for the conversation. Here's your payment link for <strong>${escapeHtml(productName)}</strong>:</p>
      <div style="margin: 24px 0; padding: 20px; background: #f8fafc; border-left: 3px solid #38b6ff; border-radius: 8px;">
        <div style="font-family: ui-monospace, Menlo, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #64748b;">Amount Due</div>
        <div style="font-family: ui-monospace, Menlo, monospace; font-size: 28px; font-weight: 700; color: #0f172a; margin-top: 4px;">${escapeHtml(amount)}</div>
      </div>
      <a href="${paymentUrl}" style="display: inline-block; background: #38b6ff; color: #0f172a; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">Complete Payment →</a>
      <p style="color: #64748b; font-size: 13px; margin-top: 32px; line-height: 1.6;">Questions? Reply to this email or call (801) 882-0094.</p>
      <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">— XeedlyAI</p>
    </div>
  `;

  const [smsResult, emailResult] = await Promise.allSettled([
    customer.phone ? sendSMS(customer.phone, smsBody) : Promise.resolve(false),
    sendEmail(
      customer.email,
      `XeedlyAI — ${productName} Payment`,
      emailHtml,
    ),
  ]);

  return {
    sms: smsResult.status === "fulfilled" && smsResult.value === true,
    email: emailResult.status === "fulfilled" && emailResult.value === true,
  };
}

/** Notify Shad when a payment comes in. */
export async function notifyPaymentReceived(
  customerName: string,
  productName: string,
  amount: string,
): Promise<void> {
  const adminPhone = process.env.TWILIO_ADMIN_NOTIFY_NUMBER;
  if (adminPhone) {
    await sendSMS(
      adminPhone,
      `💰 Payment received: ${amount} from ${customerName} — ${productName}`,
    );
  }
  console.log(
    JSON.stringify({
      event: "payment_notification",
      customer: customerName,
      product: productName,
      amount,
      timestamp: new Date().toISOString(),
    }),
  );
}

// ----------------------------------------------------------------------------
// Utilities
// ----------------------------------------------------------------------------

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
