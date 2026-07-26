import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const nextPath = typeof sp.next === "string" ? sp.next : undefined;

  return (
    <section className="mx-auto max-w-md px-6 py-24">
      <div className="rounded-2xl border border-[var(--color-line)] bg-white p-8 shadow-lg">
        <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
          Admin access
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-[var(--color-ink)]/70">
          Enter the admin password to view leads and manage integrations.
        </p>
        <LoginForm nextPath={nextPath} />
      </div>
    </section>
  );
}
