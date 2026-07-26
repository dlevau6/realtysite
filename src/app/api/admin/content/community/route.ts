import { NextResponse } from "next/server";
import { z } from "zod";
import { ALL_CITIES } from "@/lib/site-config";
import { upsertCommunity, deleteCommunity } from "@/lib/communities";

// Guardrails: slug must already look URL-safe (the UI auto-generates it
// from the name and locks it after creation — see CommunityManager.tsx —
// but the API re-validates the shape regardless of what the client
// sends). citySlug must be one of the 19 known cities; this route can't
// create a new city or touch anything outside the communities table.
const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const bodySchema = z.object({
  citySlug: z.string().trim().min(1).max(60),
  slug: z.string().trim().min(1).max(80).regex(slugPattern, "lowercase letters, numbers, and hyphens only"),
  name: z.string().trim().min(1).max(100),
  status: z.enum(["selling", "coming-soon", "final-homes", "verify", "sold-out"]),
  startingPrice: z
    .union([z.string().trim().max(40), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
  descriptor: z
    .union([z.string().trim().max(220), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
  drHortonUrl: z
    .union([z.string().trim().url().max(300), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
});

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  if (!ALL_CITIES.some((c) => c.slug === parsed.data.citySlug)) {
    return NextResponse.json({ error: "Unknown city" }, { status: 400 });
  }

  const result = await upsertCommunity(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Save failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

const deleteSchema = z.object({
  citySlug: z.string().trim().min(1).max(60),
  slug: z.string().trim().min(1).max(80),
});

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = deleteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const result = await deleteCommunity(parsed.data.citySlug, parsed.data.slug);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Delete failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
