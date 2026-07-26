"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Compliant property search widget.
 *
 * Canopy MLS Compliance Rule #4: search widget must NOT use the word "MLS".
 * "Search Properties" and "Search by Address" are both explicitly listed
 * as acceptable in Brigette's guidance. We use "Search Homes."
 *
 * For the demo period we route to /listings which shows the featured
 * IDX strip. Once real MLS data is flowing this becomes a full search
 * against the Spark API with filters for city, price, beds, etc.
 */
export default function SearchWidget() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return router.push("/");
    // For now, all queries return the featured listings strip on home.
    // Post-MLS-approval this becomes a real filtered search page.
    router.push(`/?q=${encodeURIComponent(trimmed)}#featured-listings`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-2xl flex-wrap items-stretch gap-2 rounded-2xl border border-[var(--color-line)] bg-white p-2 shadow-sm"
    >
      <label htmlFor="search-homes" className="sr-only">
        Search Homes
      </label>
      <input
        id="search-homes"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search homes by address, city, or ZIP"
        className="min-w-0 flex-1 rounded-lg bg-white px-4 py-3 text-base text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:outline-none"
        autoComplete="off"
      />
      <button
        type="submit"
        className="rounded-lg bg-[var(--color-drh-red)] px-5 py-3 font-[family-name:var(--font-display)] font-bold text-white transition-colors hover:bg-[var(--color-drh-red-hover)]"
      >
        Search Homes
      </button>
    </form>
  );
}
