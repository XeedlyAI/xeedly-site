import { NextRequest, NextResponse } from "next/server";
import { fromZonedTime, toZonedTime, formatInTimeZone } from "date-fns-tz";
import {
  getFreeBusy,
  MissingGoogleCredentialsError,
} from "@/lib/google-calendar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Window = { start: string; end: string; maxSlots?: number };

const TZ = process.env.BOOKING_TIMEZONE || "America/Denver";

const AVAILABILITY = {
  meetingDurationMinutes: 30,
  maxBookAheadDays: 21,
  minNoticeMinutes: 60,
  // Day of week → windows. Times are local wall-clock in `TZ`.
  schedule: {
    0: [] as Window[],
    1: [
      { start: "09:00", end: "11:30" },
      { start: "14:00", end: "16:00" },
    ],
    2: [
      { start: "09:00", end: "11:30" },
      { start: "14:00", end: "16:00" },
    ],
    3: [
      { start: "09:00", end: "11:30" },
      { start: "14:00", end: "16:00" },
    ],
    4: [
      { start: "09:00", end: "11:30" },
      { start: "14:00", end: "16:00" },
    ],
    5: [{ start: "09:00", end: "14:00" }],
    6: [{ start: "11:00", end: "16:00", maxSlots: 1 }],
  } as Record<number, Window[]>,
  holidays: [
    "2026-01-01",
    "2026-01-19",
    "2026-02-16",
    "2026-05-25",
    "2026-07-03",
    "2026-07-04",
    "2026-09-07",
    "2026-11-26",
    "2026-11-27",
    "2026-12-24",
    "2026-12-25",
    "2026-12-31",
  ],
};

export type BookingSlot = {
  /** Local date in TZ, YYYY-MM-DD. */
  date: string;
  /** Local time in TZ, HH:mm (24h). */
  time: string;
  /** UTC ISO datetime of slot start. */
  datetimeUtc: string;
};

export type AvailabilityResponse = {
  slots: BookingSlot[];
  timezone: string;
  configured: boolean;
};

/**
 * Convert a local wall-clock date+time in TZ to a UTC Date.
 * Handles DST correctly via date-fns-tz.
 */
function zonedDateTimeToUtc(dateStr: string, timeStr: string, tz: string): Date {
  // `fromZonedTime` reads the Date's UTC fields as if they were the local time
  // in `tz` and returns a real UTC Date.
  const naive = new Date(`${dateStr}T${timeStr}:00`);
  return fromZonedTime(naive, tz);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const startDateParam = searchParams.get("start");
    const endDateParam = searchParams.get("end");

    if (!startDateParam || !endDateParam) {
      return NextResponse.json(
        { error: "start and end dates required (YYYY-MM-DD)" },
        { status: 400 },
      );
    }

    const now = new Date();
    const minBookUtc = new Date(
      now.getTime() + AVAILABILITY.minNoticeMinutes * 60_000,
    );
    const maxBookUtc = new Date(
      now.getTime() + AVAILABILITY.maxBookAheadDays * 86_400_000,
    );

    // Convert today in TZ to YYYY-MM-DD for comparison.
    const todayStr = formatInTimeZone(now, TZ, "yyyy-MM-dd");

    // Clamp the requested range to [today, today + 21d] in TZ local dates.
    const maxDateStr = formatInTimeZone(maxBookUtc, TZ, "yyyy-MM-dd");
    const startDateStr =
      startDateParam < todayStr ? todayStr : startDateParam;
    const endDateStr =
      endDateParam > maxDateStr ? maxDateStr : endDateParam;

    if (startDateStr > endDateStr) {
      return NextResponse.json({
        slots: [],
        timezone: TZ,
        configured: true,
      } satisfies AvailabilityResponse);
    }

    // Fetch busy times from Google Calendar across the entire window (UTC).
    const rangeStartUtc = zonedDateTimeToUtc(startDateStr, "00:00", TZ);
    const rangeEndUtc = zonedDateTimeToUtc(endDateStr, "23:59", TZ);

    let busy: { start: string; end: string }[] = [];
    try {
      busy = await getFreeBusy(
        rangeStartUtc.toISOString(),
        rangeEndUtc.toISOString(),
      );
    } catch (err) {
      if (err instanceof MissingGoogleCredentialsError) {
        return NextResponse.json(
          {
            slots: [],
            timezone: TZ,
            configured: false,
            message:
              "Booking is temporarily unavailable — Google Calendar isn't connected yet.",
          },
          { status: 503 },
        );
      }
      throw err;
    }

    // Walk each day in the window, generating slots per the schedule.
    const slots: BookingSlot[] = [];
    const cursor = new Date(`${startDateStr}T12:00:00Z`); // mid-day to avoid TZ edges
    const end = new Date(`${endDateStr}T12:00:00Z`);

    while (cursor.getTime() <= end.getTime()) {
      const dateStr = formatInTimeZone(cursor, TZ, "yyyy-MM-dd");
      const dayOfWeek = parseInt(formatInTimeZone(cursor, TZ, "i"), 10) % 7; // 1-7 (Mon-Sun) → 1..6, 0 for Sunday
      // formatInTimeZone with 'i' gives ISO day (1=Mon..7=Sun). Convert to JS dayOfWeek (0=Sun..6=Sat):
      const jsDay = dayOfWeek === 0 ? 7 : dayOfWeek; // keep 1..7
      const sundayFirst = jsDay === 7 ? 0 : jsDay; // 0=Sun..6=Sat

      if (!AVAILABILITY.holidays.includes(dateStr)) {
        const windows = AVAILABILITY.schedule[sundayFirst] || [];

        for (const window of windows) {
          // For Saturday's maxSlots=1 rule: if any busy range already touches
          // this window, skip the entire window (one booking per Saturday).
          const windowStartUtc = zonedDateTimeToUtc(dateStr, window.start, TZ);
          const windowEndUtc = zonedDateTimeToUtc(dateStr, window.end, TZ);
          const windowAlreadyBooked = busy.some((b) => {
            const bStart = new Date(b.start).getTime();
            const bEnd = new Date(b.end).getTime();
            return (
              bStart < windowEndUtc.getTime() &&
              bEnd > windowStartUtc.getTime()
            );
          });

          if (window.maxSlots != null && windowAlreadyBooked) {
            continue;
          }

          // Generate 30-minute slots within the window.
          let slotStart = windowStartUtc;
          while (
            slotStart.getTime() +
              AVAILABILITY.meetingDurationMinutes * 60_000 <=
            windowEndUtc.getTime()
          ) {
            const slotEnd = new Date(
              slotStart.getTime() +
                AVAILABILITY.meetingDurationMinutes * 60_000,
            );

            // Min-notice filter
            if (slotStart.getTime() < minBookUtc.getTime()) {
              slotStart = slotEnd;
              continue;
            }
            // Max book-ahead filter
            if (slotStart.getTime() > maxBookUtc.getTime()) {
              break;
            }

            const overlapsBusy = busy.some((b) => {
              const bStart = new Date(b.start).getTime();
              const bEnd = new Date(b.end).getTime();
              return (
                slotStart.getTime() < bEnd && slotEnd.getTime() > bStart
              );
            });

            if (!overlapsBusy) {
              slots.push({
                date: dateStr,
                time: formatInTimeZone(slotStart, TZ, "HH:mm"),
                datetimeUtc: slotStart.toISOString(),
              });
            }

            slotStart = slotEnd;
          }
        }
      }

      // Advance by one day — add 24h. toZonedTime is used to avoid DST edge cases.
      const zonedCursor = toZonedTime(cursor, TZ);
      zonedCursor.setUTCDate(zonedCursor.getUTCDate() + 1);
      cursor.setTime(zonedCursor.getTime());
    }

    return NextResponse.json({
      slots,
      timezone: TZ,
      configured: true,
    } satisfies AvailabilityResponse);
  } catch (error) {
    console.error("availability error:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 },
    );
  }
}
