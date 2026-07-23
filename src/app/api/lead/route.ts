import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServiceClient } from "@/lib/supabase";

const leadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  message: z.string().max(2000).optional(),
  listingId: z.string().uuid().optional(),
  sourcePage: z.string().max(200),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("leads").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone ?? null,
    message: parsed.data.message ?? null,
    listing_id: parsed.data.listingId ?? null,
    source_page: parsed.data.sourcePage,
  });

  if (error) {
    console.error("Lead insert failed:", error);
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }

  // TODO: hook up an email/SMS notification to the agent here (e.g. Resend).
  return NextResponse.json({ ok: true });
}
