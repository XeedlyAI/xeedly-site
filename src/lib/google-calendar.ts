/**
 * Google Calendar integration.
 *
 * Uses a long-lived refresh token to get short-lived access tokens, then
 * calls the Calendar API directly (no google-api-client dependency).
 *
 * Env-tolerant: functions throw explicit errors when GOOGLE_REFRESH_TOKEN is
 * missing, and API routes catch and surface those as graceful 503 responses
 * so builds and unconfigured deploys don't crash.
 */

interface CachedToken {
  access_token: string;
  expires_at: number;
}

let cached: CachedToken | null = null;

export class MissingGoogleCredentialsError extends Error {
  constructor(missing: string[]) {
    super(
      `Google Calendar credentials missing: ${missing.join(", ")}. Booking is unavailable until these are configured.`,
    );
    this.name = "MissingGoogleCredentialsError";
  }
}

function requireEnv(): {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  calendarId: string;
  timezone: string;
} {
  const missing: string[] = [];
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!clientId) missing.push("GOOGLE_CLIENT_ID");
  if (!clientSecret) missing.push("GOOGLE_CLIENT_SECRET");
  if (!refreshToken) missing.push("GOOGLE_REFRESH_TOKEN");
  if (missing.length > 0) {
    throw new MissingGoogleCredentialsError(missing);
  }
  return {
    clientId: clientId!,
    clientSecret: clientSecret!,
    refreshToken: refreshToken!,
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    timezone: process.env.BOOKING_TIMEZONE || "America/Denver",
  };
}

export async function getAccessToken(): Promise<string> {
  if (cached && cached.expires_at > Date.now() + 300_000) {
    return cached.access_token;
  }

  const { clientId, clientSecret, refreshToken } = requireEnv();

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.access_token) {
    throw new Error(
      `Failed to refresh Google access token: ${data.error_description || data.error || "unknown"}`,
    );
  }

  cached = {
    access_token: data.access_token,
    expires_at: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
  return data.access_token;
}

export type BusyRange = { start: string; end: string };

export async function getFreeBusy(
  timeMinIso: string,
  timeMaxIso: string,
  calendarIdOverride?: string,
): Promise<BusyRange[]> {
  const token = await getAccessToken();
  const { calendarId } = requireEnv();
  const id = calendarIdOverride || calendarId;

  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin: timeMinIso,
      timeMax: timeMaxIso,
      items: [{ id }],
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      `freeBusy failed: ${data.error?.message || "unknown error"}`,
    );
  }
  return (data.calendars?.[id]?.busy || []) as BusyRange[];
}

export type CreatedEvent = {
  id?: string;
  htmlLink?: string;
  hangoutLink?: string;
  error?: { message?: string };
};

export async function createEvent(args: {
  summary: string;
  description: string;
  startIso: string;
  endIso: string;
  attendeeEmail: string;
  attendeeName?: string;
}): Promise<CreatedEvent> {
  const token = await getAccessToken();
  const { calendarId, timezone } = requireEnv();

  const body = {
    summary: args.summary,
    description: args.description,
    start: { dateTime: args.startIso, timeZone: timezone },
    end: { dateTime: args.endIso, timeZone: timezone },
    attendees: [
      {
        email: args.attendeeEmail,
        displayName: args.attendeeName,
      },
    ],
    conferenceData: {
      createRequest: {
        requestId: `xeedly-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 60 },
        { method: "popup", minutes: 15 },
      ],
    },
  };

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as CreatedEvent;
  if (!res.ok) {
    return { error: { message: data.error?.message || `status ${res.status}` } };
  }
  return data;
}
