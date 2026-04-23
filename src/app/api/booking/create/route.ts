import { NextRequest, NextResponse } from "next/server";
import {
  createEvent,
  getFreeBusy,
  MissingGoogleCredentialsError,
} from "@/lib/google-calendar";

export const runtime = "nodejs";

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
