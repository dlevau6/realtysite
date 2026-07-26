"use client";

import { useState } from "react";
import type { CityContent, CityHighlight, CommunityGroup } from "@/lib/city-content";

interface Props {
  citySlug: string;
  initial: CityContent;
}

// Mirrors the API route's zod limits (src/app/api/admin/content/city/
// [slug]/route.ts) so the UI can enforce the same guardrails before the
// request even goes out.
const LIMITS = {
  metaDescription: 320,
  intro: 1000,
  highlightTitle: 80,
  highlightBody: 320,
  minHighlights: 2,
  maxHighlights: 7,
  groupName: 100,
  bulletText: 320,
  maxBulletsPerGroup: 8,
  maxGroups: 8,
};

/** Bullets edit as one-per-line in a textarea — simpler for a non-
 *  technical editor than a repeater-of-repeaters. */
function groupsToEditable(groups: CommunityGroup[] | undefined) {
  return (groups ?? []).map((g) => ({
    name: g.name,
    drHortonUrl: g.drHortonUrl ?? "",
    bulletsText: g.bullets.join("\n"),
  }));
}

export default function CityContentForm({ citySlug, initial }: Props) {
  const [metaDescription, setMetaDescription] = useState(initial.metaDescription);
  const [intro, setIntro] = useState(initial.intro);
  const [highlights, setHighlights] = useState<CityHighlight[]>(initial.highlights);
  const [groups, setGroups] = useState(groupsToEditable(initial.communityGroups));
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function updateHighlight(i: number, field: keyof CityHighlight, value: string) {
    setHighlights((prev) => prev.map((h, idx) => (idx === i ? { ...h, [field]: value } : h)));
  }

  function addHighlight() {
    if (highlights.length >= LIMITS.maxHighlights) return;
    setHighlights((prev) => [...prev, { title: "", body: "" }]);
  }

  function removeHighlight(i: number) {
    if (highlights.length <= LIMITS.minHighlights) return;
    setHighlights((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateGroup(i: number, field: "name" | "drHortonUrl" | "bulletsText", value: string) {
    setGroups((prev) => prev.map((g, idx) => (idx === i ? { ...g, [field]: value } : g)));
  }

  function addGroup() {
    if (groups.length >= LIMITS.maxGroups) return;
    setGroups((prev) => [...prev, { name: "", drHortonUrl: "", bulletsText: "" }]);
  }

  function removeGroup(i: number) {
    setGroups((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setStatus("saving");
    setErrorMsg(null);
    try {
      const payload = {
        metaDescription: metaDescription.trim(),
        intro: intro.trim(),
        highlights: highlights.map((h) => ({ title: h.title.trim(), body: h.body.trim() })),
        communityGroups: groups
          .filter((g) => g.name.trim())
          .map((g) => ({
            name: g.name.trim(),
            drHortonUrl: g.drHortonUrl.trim() || undefined,
            bullets: g.bulletsText
              .split("\n")
              .map((b) => b.trim())
              .filter(Boolean),
          })),
      };

      const res = await fetch(`/api/admin/content/city/${citySlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Save failed");
      }
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Save failed");
    }
  }

  return (
    <section className="rounded-2xl border border-[var(--color-line)] bg-white p-5">
      <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
        Page copy
      </h2>

      <div className="mt-4">
        <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)]/60">
          Meta description{" "}
          <span className="font-normal normal-case text-[var(--color-ink)]/40">
            ({metaDescription.length}/{LIMITS.metaDescription})
          </span>
        </label>
        <textarea
          value={metaDescription}
          maxLength={LIMITS.metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-[var(--color-ink)]/50">
          What shows in Google search results — one sentence, mention price + a hook.
        </p>
      </div>

      <div className="mt-4">
        <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)]/60">
          Intro paragraph{" "}
          <span className="font-normal normal-case text-[var(--color-ink)]/40">
            ({intro.length}/{LIMITS.intro})
          </span>
        </label>
        <textarea
          value={intro}
          maxLength={LIMITS.intro}
          onChange={(e) => setIntro(e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)]/60">
            Relocation highlights ({highlights.length})
          </label>
          <button
            type="button"
            onClick={addHighlight}
            disabled={highlights.length >= LIMITS.maxHighlights}
            className="text-xs font-semibold text-[var(--color-drh-red)] disabled:opacity-30"
          >
            + Add highlight
          </button>
        </div>
        <div className="mt-2 space-y-3">
          {highlights.map((h, i) => (
            <div key={i} className="rounded-lg border border-[var(--color-line)] p-3">
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-2">
                  <input
                    value={h.title}
                    maxLength={LIMITS.highlightTitle}
                    onChange={(e) => updateHighlight(i, "title", e.target.value)}
                    placeholder="Short bold lead-in, e.g. 'Fast-growing metro'"
                    className="w-full rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm font-semibold"
                  />
                  <textarea
                    value={h.body}
                    maxLength={LIMITS.highlightBody}
                    onChange={(e) => updateHighlight(i, "body", e.target.value)}
                    placeholder="One sentence of supporting detail"
                    rows={2}
                    className="w-full rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeHighlight(i)}
                  disabled={highlights.length <= LIMITS.minHighlights}
                  className="mt-1 text-xs font-semibold text-[var(--color-ink)]/40 hover:text-red-600 disabled:opacity-20"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)]/60">
            Community group write-ups ({groups.length})
          </label>
          <button
            type="button"
            onClick={addGroup}
            disabled={groups.length >= LIMITS.maxGroups}
            className="text-xs font-semibold text-[var(--color-drh-red)] disabled:opacity-30"
          >
            + Add group
          </button>
        </div>
        <p className="mt-1 text-xs text-[var(--color-ink)]/50">
          This is the descriptive write-up block on the city page — separate
          from the community buttons below, which have their own price/status.
        </p>
        <div className="mt-2 space-y-3">
          {groups.map((g, i) => (
            <div key={i} className="rounded-lg border border-[var(--color-line)] p-3">
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-2">
                  <input
                    value={g.name}
                    maxLength={LIMITS.groupName}
                    onChange={(e) => updateGroup(i, "name", e.target.value)}
                    placeholder="Group heading, e.g. 'Additional Charlotte communities'"
                    className="w-full rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm font-semibold"
                  />
                  <input
                    value={g.drHortonUrl}
                    onChange={(e) => updateGroup(i, "drHortonUrl", e.target.value)}
                    placeholder="D.R. Horton link (optional) — https://..."
                    className="w-full rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
                  />
                  <textarea
                    value={g.bulletsText}
                    onChange={(e) => updateGroup(i, "bulletsText", e.target.value)}
                    placeholder={"One bullet point per line"}
                    rows={4}
                    className="w-full rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeGroup(i)}
                  className="mt-1 text-xs font-semibold text-[var(--color-ink)]/40 hover:text-red-600"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          {groups.length === 0 ? (
            <p className="text-xs text-[var(--color-ink)]/50">
              No community write-ups yet — this section won&rsquo;t render on
              the city page until you add one.
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={status === "saving"}
          className="rounded-full bg-[var(--color-navy)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-drh-red)] disabled:opacity-40"
        >
          {status === "saving" ? "Saving…" : "Save page copy"}
        </button>
        {status === "saved" ? (
          <span className="text-sm text-[var(--color-navy)]">Saved.</span>
        ) : null}
        {status === "error" ? (
          <span className="text-sm text-red-600">{errorMsg ?? "Save failed."}</span>
        ) : null}
      </div>
    </section>
  );
}
