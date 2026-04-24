import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id: dealId } = await params;

  let body: { startDate?: string | null; monthlyAmount?: number | null };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (body.startDate !== undefined) {
    patch.maintenance_start_date = body.startDate || null;
  }
  if (body.monthlyAmount !== undefined && body.monthlyAmount !== null) {
    patch.monthly_amount = Math.round(body.monthlyAmount * 100);
  }

  const { error } = await supabaseAdmin
    .from("deals")
    .update(patch)
    .eq("id", dealId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
