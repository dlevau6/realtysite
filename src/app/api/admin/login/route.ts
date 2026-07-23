import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ADMIN_SESSION_COOKIE,
  SESSION_COOKIE_OPTIONS,
  createSessionCookie,
  verifyAdminPassword,
} from "@/lib/admin-auth";

const bodySchema = z.object({
  password: z.string().min(1).max(200),
  next: z.string().max(500).optional(),
});

// Small in-memory rate limiter per IP. Resets on cold start — fine for
// a single-admin panel. Redis-backed limiting is deferred.
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 8;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || rec.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  rec.count += 1;
  return rec.count <= MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a minute." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const ok = await verifyAdminPassword(parsed.data.password);
  if (!ok) {
    // Constant-ish delay softens brute-forcing without needing infra.
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const cookieValue = await createSessionCookie();
  const res = NextResponse.json({
    ok: true,
    redirect: parsed.data.next ?? "/admin",
  });
  res.cookies.set(ADMIN_SESSION_COOKIE, cookieValue, SESSION_COOKIE_OPTIONS);
  return res;
}
