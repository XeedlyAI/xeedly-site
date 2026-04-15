import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const context = typeof body?.context === "string" ? body.context : "";

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email required" },
        { status: 400 },
      );
    }

    // Structured log — visible in Vercel logs. Replace with Supabase/Resend/Twilio when ready.
    console.log(
      JSON.stringify({
        event: "lead_intake",
        timestamp: new Date().toISOString(),
        lead: { name, email, phone, message },
        context,
      }),
    );

    // TODO: Supabase insert into `leads` table.
    // TODO: Resend transactional email to Shad.
    // TODO: Twilio SMS notification to Shad.

    return NextResponse.json({ success: true, message: "Received" });
  } catch (error) {
    console.error("Intake error:", error);
    return NextResponse.json(
      { error: "Failed to process" },
      { status: 500 },
    );
  }
}
