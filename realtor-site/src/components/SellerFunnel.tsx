"use client";

import { useState } from "react";
import { SMS_CONSENT_TEXT } from "@/lib/site-config";

interface Props {
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
  };
}

const CONDITION_OPTIONS = [
  { v: "renovated-kitchen", label: "Renovated kitchen" },
  { v: "renovated-baths", label: "Renovated baths" },
  { v: "new-roof-hvac", label: "New roof or HVAC" },
  { v: "new-windows", label: "New windows" },
  { v: "updated-flooring", label: "Updated flooring" },
  { v: "finished-basement", label: "Finished basement" },
  { v: "original-condition", label: "Original condition" },
  { v: "needs-work", label: "Needs some work" },
];

/**
 * 3-step home-value funnel from Chapter 11 of the strategy guide.
 *
 * Step 1: property address
 * Step 2: condition tags (multi-select) + "also looking to buy?" cross-sell
 * Step 3: contact + TCPA consent → /thank-you-seller
 */
export default function SellerFunnel({ utm }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [address, setAddress] = useState("");
  const [conditionTags, setConditionTags] = useState<string[]>([]);
  const [alsoBuying, setAlsoBuying] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const canProceedFromStep1 = address.trim().length >= 5;
  const canProceedFromStep2 = alsoBuying !== null;

  function toggleTag(tag: string) {
    setConditionTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!smsConsent) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/seller-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          smsConsent: true,
          propertyAddress: address,
          propertyConditionTags: conditionTags,
          alsoLookingToBuy: alsoBuying ?? false,
          utmSource: utm?.source,
          utmMedium: utm?.medium,
          utmCampaign: utm?.campaign,
          utmTerm: utm?.term,
          sourcePage:
            typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      if (typeof window !== "undefined") {
        window.location.href = `/thank-you-seller?buying=${
          alsoBuying ? "1" : "0"
        }`;
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-lg md:p-8">
      {/* Progress rail */}
      <div className="mb-6 flex items-center gap-2" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1 flex-1 rounded-full transition-colors ${
              step >= n
                ? "bg-[var(--color-drh-red)]"
                : "bg-[var(--color-line)]"
            }`}
          />
        ))}
      </div>
      <p className="mb-4 font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-navy)]/60">
        Step {step} of 3
      </p>

      {step === 1 ? (
        <fieldset>
          <legend className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            What&rsquo;s the address of the home you&rsquo;re thinking of
            selling?
          </legend>
          <p className="mt-2 text-sm text-[var(--color-ink)]/70">
            We use recent sales in your neighborhood to build a real
            valuation — not a Zillow guess.
          </p>
          <div className="mt-6">
            <label
              htmlFor="property-address"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[var(--color-navy)]"
            >
              Property address
            </label>
            <input
              id="property-address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, Charlotte, NC 28202"
              className="w-full rounded-lg border-2 border-[var(--color-line)] bg-white px-4 py-4 text-base text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:border-[var(--color-drh-red)] focus:outline-none"
              autoComplete="street-address"
            />
            {/* TODO next: bind Google Places autocomplete to #property-address */}
          </div>
          <button
            type="button"
            disabled={!canProceedFromStep1}
            onClick={() => setStep(2)}
            className="mt-6 w-full rounded-full bg-[var(--color-drh-red)] px-6 py-4 font-[family-name:var(--font-display)] font-bold text-white shadow-md transition-colors hover:bg-[var(--color-drh-red-hover)] disabled:opacity-40"
          >
            Continue →
          </button>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset>
          <legend className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-navy)]">
            Tell us about the home
          </legend>
          <p className="mt-2 text-sm text-[var(--color-ink)]/70">
            Select anything that applies. Skip if you&rsquo;re not sure —
            we&rsquo;ll adjust after seeing it.
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {CONDITION_OPTIONS.map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => toggleTag(opt.v)}
                className={`rounded-xl border-2 px-3 py-3 text-left text-sm font-semibold transition-colors ${
                  conditionTags.includes(opt.v)
                    ? "border-[var(--color-drh-red)] bg-[var(--color-drh-red)]/5 text-[var(--color-navy)]"
                    : "border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-navy)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-[var(--color-mist)] p-5">
            <p className="font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)]">
              Are you also looking to buy?
            </p>
            <p className="mt-1 text-sm text-[var(--color-ink)]/70">
              Many home sellers move into a brand-new D.R. Horton home.
              We&rsquo;ll show you both sides if you are.
            </p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setAlsoBuying(true)}
                className={`flex-1 rounded-full border-2 px-4 py-3 font-[family-name:var(--font-display)] font-bold transition-colors ${
                  alsoBuying === true
                    ? "border-[var(--color-drh-red)] bg-[var(--color-drh-red)] text-white"
                    : "border-[var(--color-line)] text-[var(--color-navy)] hover:border-[var(--color-navy)]"
                }`}
              >
                Yes, both
              </button>
              <button
                type="button"
                onClick={() => setAlsoBuying(false)}
                className={`flex-1 rounded-full border-2 px-4 py-3 font-[family-name:var(--font-display)] font-bold transition-colors ${
                  alsoBuying === false
                    ? "border-[var(--color-drh-red)] bg-[var(--color-drh-red)] text-white"
                    : "border-[var(--color-line)] text-[var(--color-navy)] hover:border-[var(--color-navy)]"
                }`}
              >
                Just selling
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-full border border-[var(--color-line)] px-6 py-4 font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]"
            >
              ← Back
            </button>
            <button
              type="button"
              disabled={!canProceedFromStep2}
              onClick={() => setStep(3)}
              className="flex-1 rounded-full bg-[var(--color-drh-red)] px-6 py-4 font-[family-name:var(--font-display)] font-bold text-white shadow-md transition-colors hover:bg-[var(--color-drh-red-hover)] disabled:opacity-40"
            >
              Continue →
            </button>
          </div>
        </fieldset>
      ) : null}

      {step === 3 ? (
        <form onSubmit={handleFinalSubmit}>
          <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            Where should we send your home value report?
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="seller-name"
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[var(--color-navy)]"
              >
                First name
              </label>
              <input
                id="seller-name"
                type="text"
                required
                autoComplete="given-name"
                placeholder="e.g. Alex"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-3 text-base text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:border-[var(--color-drh-red)] focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="seller-phone"
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[var(--color-navy)]"
              >
                Phone
              </label>
              <input
                id="seller-phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="(704) 555-1234"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-3 text-base text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:border-[var(--color-drh-red)] focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="seller-email"
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[var(--color-navy)]"
              >
                Email
              </label>
              <input
                id="seller-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-3 text-base text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:border-[var(--color-drh-red)] focus:outline-none"
              />
            </div>
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg bg-[var(--color-mist)] p-3 text-xs text-[var(--color-ink)]/80">
            <input
              type="checkbox"
              checked={smsConsent}
              onChange={(e) => setSmsConsent(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[var(--color-drh-red)]"
            />
            <span>{SMS_CONSENT_TEXT}</span>
          </label>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-full border border-[var(--color-line)] px-6 py-4 font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={status === "sending" || !smsConsent}
              className="flex-1 rounded-full bg-[var(--color-drh-red)] px-6 py-4 font-[family-name:var(--font-display)] font-bold text-white shadow-md transition-colors hover:bg-[var(--color-drh-red-hover)] disabled:opacity-40"
            >
              {status === "sending" ? "Sending…" : "Get My Home Value Report"}
            </button>
          </div>
          {status === "error" ? (
            <p className="mt-3 text-xs text-red-600">
              Something went wrong — please call us directly at 704-495-2241.
            </p>
          ) : null}
          <p className="mt-4 text-center text-xs text-[var(--color-ink)]/60">
            No obligation. We&rsquo;ll follow up within one business day.
          </p>
        </form>
      ) : null}
    </div>
  );
}
