"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

interface Slider {
  key: keyof State;
  label: string;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}

interface State {
  rent: number;
  price: number;
  downPct: number;
  rate: number;
}

const SLIDERS: Slider[] = [
  {
    key: "rent",
    label: "Your current monthly rent",
    min: 800,
    max: 4000,
    step: 50,
    format: (v) => fmt(v),
  },
  {
    key: "price",
    label: "New home price",
    min: 200000,
    max: 600000,
    step: 10000,
    format: (v) => fmt(v),
  },
  {
    key: "downPct",
    label: "Down payment",
    min: 0,
    max: 20,
    step: 0.5,
    format: (v) => `${v}%`,
  },
  {
    key: "rate",
    label: "Estimated interest rate (your lender quotes your actual rate)",
    min: 4,
    max: 9,
    step: 0.05,
    format: (v) => `${v.toFixed(2)}%`,
  },
];

/**
 * Interactive rent-vs-own calculator for the Stop Renting landing page.
 *
 * Deliberately NEVER quotes a rate — the rate slider is user-input only,
 * every result is labeled "estimate," and copy explicitly says we are not
 * a lender. This is the compliance move from the Page 3 source doc.
 */
export default function RentVsOwnCalculator() {
  const [state, setState] = useState<State>({
    rent: 1800,
    price: 320000,
    downPct: 3.5,
    rate: 6.5,
  });

  const results = useMemo(() => {
    const { rent, price, downPct, rate } = state;
    const loan = price * (1 - downPct / 100);
    const monthlyRate = rate / 100 / 12;
    const n = 360; // 30-year term
    // Standard P&I amortization
    const pi =
      loan *
      (monthlyRate * Math.pow(1 + monthlyRate, n)) /
      (Math.pow(1 + monthlyRate, n) - 1);

    // Simulate 60 months of amortization to get principal paid.
    let balance = loan;
    for (let i = 0; i < 60; i++) {
      const interest = balance * monthlyRate;
      const principal = pi - interest;
      balance -= principal;
    }
    const principalPaid = loan - balance;
    // Assumed 3%/yr appreciation over 5 years.
    const appreciation = price * (Math.pow(1.03, 5) - 1);
    const downAmt = price * (downPct / 100);
    const equity = principalPaid + appreciation + downAmt;

    const diff = pi - rent;
    return {
      rentTotal: rent * 60,
      monthlyPI: pi,
      diff,
      equity,
    };
  }, [state]);

  function updateSlider(key: keyof State, value: number) {
    setState((s) => ({ ...s, [key]: value }));
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Controls */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        {SLIDERS.map((slider) => (
          <div key={slider.key} className="mb-5 last:mb-0">
            <div className="mb-2 flex items-baseline justify-between gap-2">
              <label
                htmlFor={slider.key}
                className="text-sm font-medium text-white/80"
              >
                {slider.label}
              </label>
              <span className="font-[family-name:var(--font-data)] text-base font-bold text-[var(--color-carolina)]">
                {slider.format(state[slider.key])}
              </span>
            </div>
            <input
              type="range"
              id={slider.key}
              min={slider.min}
              max={slider.max}
              step={slider.step}
              value={state[slider.key]}
              onChange={(e) =>
                updateSlider(slider.key, parseFloat(e.target.value))
              }
              className="w-full accent-[var(--color-drh-red)]"
            />
          </div>
        ))}
      </div>

      {/* Live-calc results */}
      <div className="rounded-2xl bg-white p-6 text-[var(--color-ink)]">
        <div className="space-y-4 divide-y divide-[var(--color-line)]">
          <ResultRow
            label="Rent paid over 5 years"
            value={fmt(results.rentTotal)}
            tone="red"
          />
          <ResultRow
            label="Est. monthly P&I payment*"
            value={fmt(results.monthlyPI)}
            tone="blue"
          />
          <ResultRow
            label="Difference vs. your rent"
            value={
              (results.diff <= 0 ? "-" : "+") +
              fmt(Math.abs(results.diff)) +
              "/mo"
            }
            tone={results.diff <= 0 ? "green" : "red"}
          />
        </div>
        <div className="mt-4 rounded-xl bg-[var(--color-mist)] p-4">
          <div className="text-xs font-medium uppercase tracking-widest text-[var(--color-ink)]/60">
            Est. equity built in 5 years*
          </div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--color-teal)]">
            {fmt(results.equity)}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "red" | "blue" | "green";
}) {
  const color =
    tone === "red"
      ? "text-red-600"
      : tone === "green"
        ? "text-emerald-600"
        : "text-[var(--color-navy)]";
  return (
    <div className="flex items-baseline justify-between gap-4 pt-4 first:pt-0">
      <span className="text-sm text-[var(--color-ink)]/70">{label}</span>
      <span
        className={`font-[family-name:var(--font-display)] text-xl font-bold ${color}`}
      >
        {value}
      </span>
    </div>
  );
}
