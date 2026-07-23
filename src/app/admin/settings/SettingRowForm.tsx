"use client";

import { useState } from "react";
import type { SettingRow } from "@/lib/settings";

interface Props {
  setting: SettingRow;
}

export default function SettingRowForm({ setting }: Props) {
  const [value, setValue] = useState(setting.value ?? "");
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );

  async function handleSave() {
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: setting.key,
          value: value.trim() || null,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus("saved");
      // Fade the "saved" chip after a moment
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  const inputType = setting.is_secret && !revealed ? "password" : "text";
  const hasValue = value.trim().length > 0;

  return (
    <div className="border-t border-[var(--color-line)] p-4 first:border-t-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <label
            htmlFor={setting.key}
            className="block font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-navy)]"
          >
            {setting.key
              .split("_")
              .map((w) => w[0].toUpperCase() + w.slice(1))
              .join(" ")}
          </label>
          {setting.description ? (
            <p className="mt-1 text-xs text-[var(--color-ink)]/70">
              {setting.description}
            </p>
          ) : null}
        </div>
        <span
          className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            hasValue
              ? "bg-[var(--color-carolina-soft)] text-[var(--color-navy)]"
              : "bg-[var(--color-mist)] text-[var(--color-ink)]/50"
          }`}
        >
          {hasValue ? "Set" : "Unset"}
        </span>
      </div>

      <div className="mt-3 flex gap-2">
        <div className="relative flex-1">
          <input
            id={setting.key}
            type={inputType}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={setting.is_secret ? "Leave blank to disable" : ""}
            className="w-full rounded-lg border border-[var(--color-line)] px-3 py-2 pr-16 font-[family-name:var(--font-data)] text-sm"
            autoComplete="off"
            spellCheck={false}
          />
          {setting.is_secret ? (
            <button
              type="button"
              onClick={() => setRevealed((r) => !r)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-0.5 text-xs font-semibold text-[var(--color-navy)]/70 hover:text-[var(--color-navy)]"
            >
              {revealed ? "Hide" : "Show"}
            </button>
          ) : null}
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={status === "saving"}
          className="rounded-full bg-[var(--color-navy)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--color-drh-red)] disabled:opacity-40"
        >
          {status === "saving" ? "Saving…" : "Save"}
        </button>
      </div>

      {status === "saved" ? (
        <p className="mt-2 text-xs text-[var(--color-navy)]">Saved.</p>
      ) : null}
      {status === "error" ? (
        <p className="mt-2 text-xs text-red-600">
          Save failed — check the value and try again.
        </p>
      ) : null}
    </div>
  );
}
