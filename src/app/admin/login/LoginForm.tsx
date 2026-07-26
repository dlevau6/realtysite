"use client";

import { useState } from "react";

export default function LoginForm({
  nextPath,
  initialError,
}: {
  nextPath?: string;
  initialError?: string;
}) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">(
    initialError ? "error" : "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      // Redirect to intended destination, defaulting to the dashboard.
      window.location.href = nextPath && nextPath.startsWith("/admin") ? nextPath : "/admin";
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label htmlFor="password" className="block text-sm font-semibold text-[var(--color-navy)]">
        Password
      </label>
      <input
        id="password"
        type="password"
        required
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg border-2 border-[var(--color-line)] px-4 py-3 focus:border-[var(--color-drh-red)] focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-[var(--color-drh-red)] px-6 py-3 font-[family-name:var(--font-display)] font-bold text-white shadow-md transition-colors hover:bg-[var(--color-drh-red-hover)] disabled:opacity-40"
      >
        {status === "sending" ? "Signing in…" : "Sign in"}
      </button>
      {status === "error" ? (
        <p className="text-sm text-red-600">Incorrect password.</p>
      ) : null}
    </form>
  );
}
