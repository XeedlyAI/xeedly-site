import { NextRequest, NextResponse } from "next/server";
import {
  createEvent,
  getFreeBusy,
  MissingGoogleCredentialsError,
} from "@/lib/google-calendar";
import { sendEmail, sendSMS, escapeHtml } from "@/lib/notifications";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "shad@xeedly.com")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

function fmtSlot(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Denver",
      timeZoneName: "short",
    });
  } catch {
    return iso;
  }
}

const MEETING_DURATION_MINUTES = 30;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const datetime = typeof body?.datetime === "string" ? body.datetime : "";
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const company =
      typeof body?.company === "string" ? body.company.trim() : "";
    const topic = typeof body?.topic === "string" ? body.topic.trim() : "";

    if (!datetime || !name || !email) {
      return NextResponse.json(
        { error: "datetime, name, and email are required" },
        { status: 400 },
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "invalid email" }, { status: 400 });
    }

    // Honeypot
    const website = typeof body?.website === "string" ? body.website : "";
    if (website) {
      return NextResponse.json({ success: true, eventId: null, meetLink: null, startUtc: datetime, endUtc: datetime });
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

    const start = new Date(datetime);
    if (Number.isNaN(start.getTime())) {
      return NextResponse.json({ error: "invalid datetime" }, { status: 400 });
    }
    const end = new Date(start.getTime() + MEETING_DURATION_MINUTES * 60_000);

    // Race-condition check: re-query freeBusy over the exact slot. If any
    // event has landed in that window between availability display and now,
    // reject the booking.
    try {
      const busy = await getFreeBusy(start.toISOString(), end.toISOString());
      const overlap = busy.some((b) => {
        const bStart = new Date(b.start).getTime();
        const bEnd = new Date(b.end).getTime();
        return start.getTime() < bEnd && end.getTime() > bStart;
      });
      if (overlap) {
        return NextResponse.json(
          {
            error:
              "This slot was just booked. Please pick another time.",
            code: "SLOT_TAKEN",
          },
          { status: 409 },
        );
      }
    } catch (err) {
      if (err instanceof MissingGoogleCredentialsError) {
        return NextResponse.json(
          {
            error:
              "Booking is temporarily unavailable — Google Calendar isn't connected yet.",
            code: "NOT_CONFIGURED",
          },
          { status: 503 },
        );
      }
      throw err;
    }

    const summary = `XeedlyAI Discovery Call — ${name}${company ? ` (${company})` : ""}`;
    const description = [
      `Discovery Call with ${name}`,
      `Company: ${company || "Not specified"}`,
      `Email: ${email}`,
      `Topic: ${topic || "General inquiry"}`,
      "",
      "Booked via xeedly.com",
    ].join("\n");

    const event = await createEvent({
      summary,
      description,
      startIso: start.toISOString(),
      endIso: end.toISOString(),
      attendeeEmail: email,
      attendeeName: name,
    });

    if (event.error) {
      console.error("createEvent failed:", event.error);
      return NextResponse.json(
        {
          error: event.error.message || "Failed to create event",
          code: "CALENDAR_ERROR",
        },
        { status: 502 },
      );
    }

    // Structured log — feeds into downstream intelligence pipeline.
    console.log(
      JSON.stringify({
        event: "booking_created",
        timestamp: new Date().toISOString(),
        booking: {
          name,
          email,
          company: company || null,
          topic: topic || null,
          startUtc: start.toISOString(),
          endUtc: end.toISOString(),
          meetLink: event.hangoutLink || null,
          eventId: event.id || null,
        },
      }),
    );

    // ----- Notifications ----------------------------------------------------
    // Google Calendar already emails the attendee + Shad a calendar invite.
    // This is the human-readable "you got a booking" admin email + SMS ping.
    const slotFormatted = fmtSlot(start.toISOString());
    const adminSubject = company
      ? `New Booking — ${name} from ${company} · ${slotFormatted}`
      : `New Booking — ${name} · ${slotFormatted}`;

    const adminHtml = `
      <div style="font-family: -apple-system, Segoe UI, Inter, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #0f172a;">
        <div style="font-family: ui-monospace, Menlo, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #14b8a6;">XeedlyAI · Booking Confirmed</div>
        <h1 style="margin: 12px 0 4px; font-size: 22px;">${escapeHtml(name)}${company ? ` <span style="color:#64748b; font-weight: 400;">· ${escapeHtml(company)}</span>` : ""}</h1>
        <p style="margin: 0; color: #64748b; font-size: 14px;">${escapeHtml(slotFormatted)}</p>

        <table cellpadding="0" cellspacing="0" style="margin-top: 24px; border-collapse: collapse; width: 100%; font-size: 14px;">
          ${row("Name", name)}
          ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#0A8FD4;">${escapeHtml(email)}</a>`)}
          ${company ? row("Company", company) : ""}
          ${topic ? row("Topic", topic) : ""}
          ${row("Slot (MT)", slotFormatted)}
          ${event.hangoutLink ? row("Meet Link", `<a href="${escapeHtml(event.hangoutLink)}" style="color:#0A8FD4;">${escapeHtml(event.hangoutLink)}</a>`) : ""}
        </table>

        <p style="margin-top: 24px; color: #94a3b8; font-size: 12px;">Calendar invite has been sent to both parties via Google Calendar.</p>
      </div>
    `;

    const smsBody = company
      ? `📅 Booking: ${name} (${company}) — ${slotFormatted}`
      : `📅 Booking: ${name} — ${slotFormatted}`;

    const adminPhone = process.env.TWILIO_ADMIN_NOTIFY_NUMBER;

    await Promise.allSettled([
      ...adminEmails().map((to) => sendEmail(to, adminSubject, adminHtml)),
      adminPhone ? sendSMS(adminPhone, smsBody) : Promise.resolve(false),
    ]);

    return NextResponse.json({
      success: true,
      eventId: event.id || null,
      meetLink: event.hangoutLink || null,
      startUtc: start.toISOString(),
      endUtc: end.toISOString(),
    });
  } catch (error) {
    console.error("booking create error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
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
