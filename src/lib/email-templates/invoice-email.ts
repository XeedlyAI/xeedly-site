import { escapeHtml } from "@/lib/notifications";

type InvoiceEmailData = {
  customerName: string;
  invoiceNumber: string;
  stripeInvoiceUrl: string;
  buildAmount: number; // cents
  serviceAmount: number; // cents
  comparableValue?: string;
  venmoHandle: string;
};

export function buildInvoiceEmailHtml(data: InvoiceEmailData): string {
  const firstName = escapeHtml(data.customerName.split(" ")[0]);
  const serviceDollars = `$${(data.serviceAmount / 100).toLocaleString("en-US")}`;

  const comparableBlock = data.comparableValue
    ? `<div style="margin:20px 0;padding:12px 20px;background:#eef7ff;border-radius:6px;text-align:center;">
        <span style="font-size:13px;font-weight:600;color:#38b6ff;">${escapeHtml(data.comparableValue)}</span>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,Segoe UI,Inter,sans-serif;">
<div style="max-width:640px;margin:0 auto;background:#ffffff;">

  <!-- Header -->
  <div style="background:#0f172a;padding:28px 32px;">
    <img src="https://xeedly.com/images/logos/xeedly-logo-bright-blue.png" alt="XeedlyAI" width="160" height="41" style="display:block;height:41px;width:auto;" />
    <div style="height:3px;background:#38b6ff;margin-top:14px;border-radius:2px;"></div>
  </div>

  <!-- Body -->
  <div style="padding:32px;">
    <p style="font-size:16px;line-height:1.6;color:#0f172a;margin:0 0 16px;">
      Hi ${firstName},
    </p>
    <p style="font-size:15px;line-height:1.7;color:#334155;margin:0 0 12px;">
      Your invoice is attached and ready. We're excited to get started on your project.
    </p>

    ${comparableBlock}

    <!-- Primary CTA -->
    <div style="text-align:center;margin:28px 0;">
      <a href="${data.stripeInvoiceUrl}"
         style="display:inline-block;background:#38b6ff;color:#0f172a;padding:16px 40px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;">
        Pay Invoice Online →
      </a>
      <div style="font-size:12px;color:#64748b;margin-top:8px;">
        Secure payment via card or bank transfer
      </div>
    </div>

    <!-- Venmo alternative -->
    <div style="margin:20px 0;padding:14px 20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;text-align:center;">
      <div style="font-family:ui-monospace,Menlo,monospace;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#64748b;margin-bottom:8px;">
        Or pay via Venmo
      </div>
      <a href="https://venmo.com/${escapeHtml(data.venmoHandle.replace('@', ''))}"
         style="display:inline-block;background:#008CFF;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">
        Pay with Venmo →
      </a>
      <div style="font-size:11px;color:#64748b;margin-top:8px;">Include invoice # ${escapeHtml(data.invoiceNumber)} in memo</div>
    </div>

    <p style="font-size:14px;line-height:1.7;color:#334155;">
      Your full scope of work is detailed in the attached PDF.
    </p>
    <p style="font-size:14px;line-height:1.7;color:#334155;">
      Monthly service of ${serviceDollars}/mo begins 30 days from the date your build payment is received.
    </p>
    <p style="font-size:14px;line-height:1.7;color:#334155;margin-top:20px;font-style:italic;">
      We don't build and disappear. Questions at any time — just reply to this email.
    </p>
    <p style="font-size:15px;font-weight:600;color:#0f172a;margin-top:20px;">— Shad</p>
    <p style="font-size:12px;color:#64748b;margin-top:2px;">XeedlyAI</p>
  </div>

  <!-- Footer -->
  <div style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;">
    <div style="font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#64748b;">
      xeedly.com | shad@xeedly.com
    </div>
    <div style="height:2px;background:#38b6ff;margin-top:12px;border-radius:1px;"></div>
  </div>

</div>
</body>
</html>`;
}

export async function sendInvoiceEmail(
  to: string,
  invoiceNumber: string,
  emailHtml: string,
  pdfBuffer: Buffer,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[EMAIL STUB — Resend not configured]", {
      to,
      invoiceNumber,
    });
    return false;
  }

  const pdfFilename = `invoice-${invoiceNumber}.pdf`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "XeedlyAI <billing@xeedly.com>",
        reply_to: "shad@xeedly.com",
        to,
        subject: `Your XeedlyAI Invoice ${invoiceNumber} — Let's Build Something Great`,
        html: emailHtml,
        attachments: [
          {
            filename: pdfFilename,
            content: pdfBuffer.toString("base64"),
          },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Invoice email failed:", res.status, text);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Invoice email send failed:", e);
    return false;
  }
}
