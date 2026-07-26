import { NextResponse } from "next/server";
import { z } from "zod";
import { ALL_CITIES } from "@/lib/site-config";
import { setCityContent } from "@/lib/city-content";

// Guardrails: this route intentionally can only ever touch the
// city_content table's copy fields for an EXISTING city slug. It can't
// create a new city, change the metro/routing structure, or reach any
// compliance-critical component (ComplianceHeader, TCPA text, schema
// markup) — those aren't in this schema at all. See schema-drh-v5.sql.
const highlightSchema = z.object({
  title: z.string().trim().min(1).max(80),
  body: z.string().trim().min(1).max(320),
});

const communityGroupSchema = z.object({
  name: z.string().trim().min(1).max(100),
  drHortonUrl: z
    .union([z.string().trim().url().max(300), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
  bullets: z.array(z.string().trim().min(1).max(320)).min(1).max(8),
});

const bodySchema = z.object({
  metaDescription: z.string().trim().min(1).max(320),
  intro: z.string().trim().min(1).max(1000),
  highlights: z.array(highlightSchema).min(2).max(7),
  communityGroups: z.array(communityGroupSchema).max(8).optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!ALL_CITIES.some((c) => c.slug === slug)) {
    return NextResponse.json({ error: "Unknown city" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const result = await setCityContent(slug, parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Save failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
