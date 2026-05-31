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
 * `amount` is already formatted ("$1,250" or "$299/mo").
 */
export async function sendPaymentLink(
  customer: { name: string; email: string; phone?: string | null },
  paymentUrl: string,
  productName: string,
  amount: string,
): Promise<{ sms: boolean; email: boolean }> {
  const smsBody = `XeedlyAI — Thanks for the conversation, ${customer.name}. Here's your ${productName} payment link (${amount}): ${paymentUrl}\n\nPay instantly via Venmo: venmo.com/xeedly`;

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
      <div style="margin: 24px 0; padding: 16px; background: #f0fdf4; border-left: 3px solid #14b8a6; border-radius: 8px;">
        <div style="font-family: ui-monospace, Menlo, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #14b8a6;">Fast Pay Option</div>
        <p style="margin: 8px 0 0; font-size: 14px; line-height: 1.5; color: #0f172a;">Pay instantly via Venmo: <a href="https://venmo.com/xeedly" style="color: #14b8a6; font-weight: 600; text-decoration: none;">venmo.com/xeedly</a></p>
        <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">Include "${escapeHtml(productName)}" in the note.</p>
      </div>
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

/**
 * CoreHOA Vendor Promo — upbeat payment link for customers who booked a call
 * that lands after the pricing window. Soft CTA to lock in the price now.
 */
export async function sendVendorPromoLink(
  customer: { name: string; email: string; phone?: string | null },
  paymentUrl: string,
  amount: string,
  tierLabel: string, // e.g. "48hr fast-action"
): Promise<{ sms: boolean; email: boolean }> {
  const firstName = customer.name.split(" ")[0];

  const smsBody = [
    `Hey ${firstName}! Shad here from XeedlyAI.`,
    `Thank you for acting quickly to take advantage of your CoreHOA negotiated pricing. Your ${amount} vendor build is ready to go — you can lock it in now or we can take care of it at our meeting, totally up to you:`,
    paymentUrl,
    `Or Venmo: venmo.com/xeedly`,
    `No hourly billing, no surprises — just a finished site you love. Looking forward to our call! — Shad`,
  ].join("\n\n");

  const emailHtml = `
    <div style="font-family: -apple-system, Segoe UI, Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0f172a;">
      <div style="font-family: ui-monospace, Menlo, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #14b8a6;">XeedlyAI · CoreHOA Vendor Program</div>

      <p style="margin-top: 20px; font-size: 16px; line-height: 1.6;">Hey ${escapeHtml(firstName)}!</p>

      <p style="font-size: 15px; line-height: 1.7;">Thank you for acting quickly to take advantage of your CoreHOA negotiated pricing. I'm excited to build something great for your business.</p>

      <p style="font-size: 15px; line-height: 1.7;">Your <strong>${escapeHtml(tierLabel)}</strong> vendor build is ready to lock in. Use either option below to secure the ${escapeHtml(amount)} rate before the pricing window closes:</p>

      <div style="margin: 28px 0; padding: 24px; background: linear-gradient(135deg, #f0fdfa 0%, #f0f9ff 100%); border-left: 3px solid #14b8a6; border-radius: 8px;">
        <div style="font-family: ui-monospace, Menlo, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #14b8a6;">Your Build Investment</div>
        <div style="font-family: ui-monospace, Menlo, monospace; font-size: 32px; font-weight: 700; color: #0f172a; margin-top: 6px;">${escapeHtml(amount)}</div>
        <div style="font-size: 13px; color: #64748b; margin-top: 4px;">One-time · No hourly billing · No surprise invoices</div>
      </div>

      <a href="${paymentUrl}" style="display: inline-block; background: #14b8a6; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">Lock In My Price →</a>
      <div style="margin-top: 8px; font-size: 11px; color: #94a3b8;">🔒 Secure payment powered by Stripe</div>

      <div style="margin: 28px 0; padding: 16px; background: #f0fdf4; border-left: 3px solid #14b8a6; border-radius: 8px;">
        <div style="font-family: ui-monospace, Menlo, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #14b8a6;">Fast Pay Option</div>
        <p style="margin: 8px 0 0; font-size: 14px; line-height: 1.5; color: #0f172a;">Pay instantly via Venmo: <a href="https://venmo.com/xeedly" style="color: #14b8a6; font-weight: 600; text-decoration: none;">venmo.com/xeedly</a></p>
        <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">Include "CoreHOA Vendor Build" in the note.</p>
      </div>

      <p style="font-size: 15px; line-height: 1.7; color: #334155; margin-top: 20px;">If you'd like to lock in this rate now, you can do so right here. Otherwise, we'll hold this pricing in place for you until our scheduled discovery call. Thank you so much!</p>

      <div style="margin: 28px 0; padding: 20px; background: #f8fafc; border-radius: 8px;">
        <p style="margin: 0; font-size: 14px; font-weight: 600; color: #0f172a;">What happens next:</p>
        <ol style="margin: 12px 0 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #334155;">
          <li>Secure your build at the ${escapeHtml(amount)} rate (now or at our meeting)</li>
          <li>We map out your site together on our scheduled call</li>
          <li>Your build goes live — a site you love, guaranteed</li>
        </ol>
      </div>

      <p style="font-size: 15px; line-height: 1.7; color: #334155;">This covers your entire build from start to finish. No counting hours, no scope negotiations — just a finished site that works as advertised and makes your business look great.</p>

      <p style="font-size: 15px; line-height: 1.7; color: #334155;">Looking forward to our call!</p>

      <p style="font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 4px;">— Shad</p>
      <p style="font-size: 13px; color: #64748b; margin-top: 2px;">XeedlyAI · (801) 882-0094</p>
      <p style="font-size: 12px; color: #94a3b8; margin-top: 16px;">Reply to this email or text me anytime.</p>
    </div>
  `;

  const [smsResult, emailResult] = await Promise.allSettled([
    customer.phone ? sendSMS(customer.phone, smsBody) : Promise.resolve(false),
    sendEmail(
      customer.email,
      `${firstName}, your CoreHOA vendor build is ready to lock in`,
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

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
