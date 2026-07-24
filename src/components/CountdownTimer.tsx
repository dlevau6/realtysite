"use client";

import { useEffect, useState } from "react";

interface Parts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeParts(): Parts {
  const now = new Date();
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59
  );
  const diff = Math.max(0, endOfMonth.getTime() - now.getTime());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

/**
 * Countdown to end of the current calendar month. Honest urgency because
 * DR Horton builder incentives really do reset monthly.
 *
 * Renders "--" until hydration completes so server + client markup match.
 */
export default function CountdownTimer() {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    // Schedule the first paint on next tick to avoid direct setState in the effect body.
    let t: ReturnType<typeof setInterval> | null = null;
    const kick = () => {
      setParts(computeParts());
      t = setInterval(() => setParts(computeParts()), 1000);
    };
    const timeout = setTimeout(kick, 0);
    return () => {
      clearTimeout(timeout);
      if (t) clearInterval(t);
    };
  }, []);

  const cells: [string, string][] = parts
    ? [
        [String(parts.days), "Days"],
        [pad(parts.hours), "Hours"],
        [pad(parts.minutes), "Mins"],
        [pad(parts.seconds), "Secs"],
      ]
    : [
        ["--", "Days"],
        ["--", "Hours"],
        ["--", "Mins"],
        ["--", "Secs"],
      ];

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <p className="font-[family-name:var(--font-data)] text-xs font-bold uppercase tracking-widest text-[var(--color-drh-red)]">
        ⏰ Incentives reset in
      </p>
      <div className="flex gap-2">
        {cells.map(([value, label]) => (
          <div
            key={label}
            className="min-w-[52px] rounded-md bg-[var(--color-navy)] px-2.5 py-1 text-center"
          >
            <div
              className="font-[family-name:var(--font-data)] text-lg font-extrabold leading-tight text-white"
              suppressHydrationWarning
            >
              {value}
            </div>
            <div className="text-[9px] uppercase tracking-wider text-white/60">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
