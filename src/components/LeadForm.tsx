"use client";

import { useState, type FormEvent } from "react";

export default function LeadForm({
  listingId,
  sourcePage,
}: {
  listingId?: string;
  sourcePage: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone") || undefined,
          message: formData.get("message") || undefined,
          listingId,
          sourcePage,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="mt-4 text-sm text-[var(--color-teal)]">
        Thanks — we&rsquo;ll be in touch shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <input
        name="name"
        required
        placeholder="Your name"
        className="w-full rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="w-full rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
      />
      <input
        name="phone"
        placeholder="Phone (optional)"
        className="w-full rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
      />
      <textarea
        name="message"
        rows={3}
        placeholder="Tell us what you're looking for"
        className="w-full rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-[var(--color-navy)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-teal)] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request info"}
      </button>
      {status === "error" ? (
        <p className="text-xs text-red-600">
          Something went wrong — please call or email us directly.
        </p>
      ) : null}
    </form>
  );
}
