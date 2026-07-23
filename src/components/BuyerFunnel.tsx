"use client";

import { useEffect, useRef, useState } from "react";
import { SMS_CONSENT_TEXT } from "@/lib/site-config";

type Variant = "A" | "B" | "C";

interface Props {
  citySlug: string;
  cityName: string;
  variant?: Variant;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
  };
}

type Budget = "under-350" | "350-450" | "450-plus" | "move-in-ready";
type Contingency = "yes-need-sell" | "owns-no-need" | "renting" | "browsing";

/**
 * 3-step buyer funnel — Google-verified micro-commitment format from the
 * Chapter 5 / GVFF-3-Step guides.
 *
 * Currently wires Variation A (Unreleased Inventory & Price Drops). The
 * component accepts a `variant` prop so the same shell can host Variations
 * B (Rate Buy-Down) and C (Smart Trade-Up) once their Step 1/Step 2
 * question sets are added. See the Chapter 15 form specs.
 */
export default function BuyerFunnel({
  citySlug,
  cityName,
  variant = "A",
  utm,
}: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [contingency, setContingency] = useState<Contingency | null>(null);
  const [tradeInAddress, setTradeInAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const partialCaptureSent = useRef(false);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    if (startedAt.current === 0) startedAt.current = Date.now();
  }, []);

  const canProceedFromStep1 = budget !== null;
  const canProceedFromStep2 = contingency !== null;

  // Fire partial capture on transition into Step 3 — one-shot per session.
  useEffect(() => {
    if (step !== 3 || partialCaptureSent.current) return;
    // Only worth persisting if there's real seller signal
    const isSellerSignal =
      contingency === "yes-need-sell" ||
      contingency === "owns-no-need" ||
      tradeInAddress.length > 5;
    if (!isSellerSignal) return;

    partialCaptureSent.current = true;
    fetch("/api/lead-partial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        citySlug,
        variant,
        budget: budget ?? undefined,
        homeContingency: contingency ?? undefined,
        tradeInAddress: tradeInAddress || undefined,
        utmSource: utm?.source,
        utmMedium: utm?.medium,
        utmCampaign: utm?.campaign,
        utmTerm: utm?.term,
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
      }),
    }).catch(() => {
      // Silent — partial capture is best-effort
    });
  }, [step, contingency, tradeInAddress, budget, citySlug, variant, utm]);

  async function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!smsConsent) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          smsConsent: true,
          citySlug,
          variant,
          budget: budget ?? undefined,
          homeContingency: contingency ?? undefined,
          tradeInAddress: tradeInAddress || undefined,
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
      // Elapsed-time telemetry could hook Google Ads conversion here.
      const elapsed = Date.now() - startedAt.current;
      if (typeof window !== "undefined") {
        // Redirect to thank-you page so Google Ads conversion pixel fires
        window.location.href = `/thank-you-buyer?city=${citySlug}&t=${elapsed}`;
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
            Which D.R. Horton floor plans or price drops are you tracking in{" "}
            {cityName}?
          </legend>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(
              [
                { v: "under-350", label: "Under $350k" },
                { v: "350-450", label: "$350k–$450k" },
                { v: "450-plus", label: "$450k+" },
                { v: "move-in-ready", label: "Move-in ready" },
              ] as { v: Budget; label: string }[]
            ).map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => setBudget(opt.v)}
                className={`rounded-xl border-2 px-4 py-4 text-left font-semibold transition-colors ${
                  budget === opt.v
                    ? "border-[var(--color-drh-red)] bg-[var(--color-drh-red)]/5 text-[var(--color-navy)]"
                    : "border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-navy)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
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
        <fieldset id="step-2-form-container">
          <legend className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            To purchase your new D.R. Horton home, do you need to sell or check
            the equity of a current property?
          </legend>
          <div className="mt-6 grid gap-3">
            {(
              [
                { v: "yes-need-sell", label: "Yes — I need to sell first" },
                { v: "owns-no-need", label: "I own, but don't need to sell" },
                { v: "renting", label: "Currently renting" },
                { v: "browsing", label: "Just browsing" },
              ] as { v: Contingency; label: string }[]
            ).map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => setContingency(opt.v)}
                className={`rounded-xl border-2 px-4 py-4 text-left font-semibold transition-colors ${
                  contingency === opt.v
                    ? "border-[var(--color-drh-red)] bg-[var(--color-drh-red)]/5 text-[var(--color-navy)]"
                    : "border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-navy)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {contingency === "yes-need-sell" || contingency === "owns-no-need" ? (
            <div className="mt-5">
              <label
                htmlFor="seller-property-address"
                className="block text-sm font-semibold text-[var(--color-navy)]"
              >
                Current home address (optional — helps us pull comps)
              </label>
              <input
                id="seller-property-address"
                type="text"
                value={tradeInAddress}
                onChange={(e) => setTradeInAddress(e.target.value)}
                placeholder="123 Main St, Charlotte, NC"
                className="mt-2 w-full rounded-lg border border-[var(--color-line)] px-3 py-3 text-sm"
              />
              {/* TODO next turn: Google Places autocomplete bound to this input */}
            </div>
          ) : null}

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
            Where should we send the list of unreleased D.R. Horton inventory
            and standing builder incentives for {cityName}?
          </p>
          <div className="mt-6 space-y-3">
            <input
              type="text"
              required
              placeholder="First name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-line)] px-3 py-3 text-sm"
            />
            <input
              type="tel"
              required
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-line)] px-3 py-3 text-sm"
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-line)] px-3 py-3 text-sm"
            />
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
              {status === "sending" ? "Sending…" : "Unlock Priority Inventory"}
            </button>
          </div>
          {status === "error" ? (
            <p className="mt-3 text-xs text-red-600">
              Something went wrong — please call us directly at 704-495-2241.
            </p>
          ) : null}
          <p className="mt-4 text-center text-xs text-[var(--color-ink)]/60">
            You&rsquo;ll receive your matches by text within 60 seconds.
          </p>
        </form>
      ) : null}
    </div>
  );
}
