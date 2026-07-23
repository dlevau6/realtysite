/**
 * Single-admin auth via HMAC-signed cookies.
 *
 * Design notes:
 * - No user table; the "session" is just proof someone entered the
 *   correct admin password recently. Cookie value is
 *   `<expires>.<hex-hmac>` signed with ADMIN_SESSION_SECRET.
 * - Web Crypto API (not Node's crypto) so this works identically in
 *   Edge middleware and Node route handlers.
 * - Timing-safe comparison to defeat signature-timing attacks.
 */

export const ADMIN_SESSION_COOKIE = "drh_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function toHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

async function hmacSign(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return toHex(sig);
}

/** Timing-safe byte comparison (Edge-safe alternative to crypto.timingSafeEqual). */
function safeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a[i] ^ b[i];
  return out === 0;
}

/** Build a fresh session cookie value. */
export async function createSessionCookie(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  const expires = Date.now() + SESSION_TTL_MS;
  const sig = await hmacSign(secret, String(expires));
  return `${expires}.${sig}`;
}

/** Return true if the cookie value is a valid, unexpired session. */
export async function verifySessionCookie(
  cookieValue: string | undefined
): Promise<boolean> {
  if (!cookieValue) return false;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const dot = cookieValue.indexOf(".");
  if (dot < 0) return false;
  const expiresStr = cookieValue.slice(0, dot);
  const sigHex = cookieValue.slice(dot + 1);

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;

  const expectedHex = await hmacSign(secret, expiresStr);
  try {
    return safeEqual(fromHex(sigHex), fromHex(expectedHex));
  } catch {
    return false;
  }
}

/** Compare a submitted password with the configured admin password. */
export async function verifyAdminPassword(submitted: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const enc = new TextEncoder();
  const a = enc.encode(submitted);
  const b = enc.encode(expected);
  return safeEqual(a, b);
}

/** Standard cookie flags for the session cookie. */
export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_MS / 1000,
};
