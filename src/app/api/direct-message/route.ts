import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

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

    console.log(
      JSON.stringify({
        event: "direct_message",
        timestamp: new Date().toISOString(),
        sender: { name: senderName, email: senderEmail, phone: senderPhone },
        message,
        context,
      }),
    );

    // TODO: Twilio SMS to Shad with message + sender context.
    // TODO: Supabase insert into `direct_messages` table.
    // TODO: Slack webhook to #website-leads.

    return NextResponse.json({ success: true, message: "Delivered" });
  } catch (error) {
    console.error("Direct message error:", error);
    return NextResponse.json(
      { error: "Failed to send" },
      { status: 500 },
    );
  }
}
