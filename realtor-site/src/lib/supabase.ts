import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Server-side client using the service role key. Only ever import this
 * from server components, route handlers, or the sync job — never from
 * a client component, since the service role key bypasses RLS.
 */
export function getSupabaseServiceClient() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables"
    );
  }

  return createClient<Database>(url, serviceKey, {
    auth: { persistSession: false },
  });
}

/**
 * Public client using the anon key — safe for client components.
 * Reads only; RLS policies on the `listings` table should allow
 * public SELECT on active listings.
 */
export function getSupabasePublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables"
    );
  }

  return createClient<Database>(url, anonKey);
}
