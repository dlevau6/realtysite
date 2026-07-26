"use client";

import { useState } from "react";
import type { Community, CommunityStatus } from "@/lib/communities";
import { statusLabel } from "@/lib/communities";

interface Props {
  citySlug: string;
  initial: Community[];
}

const STATUS_OPTIONS: CommunityStatus[] = [
  "selling",
  "coming-soon",
  "final-homes",
  "verify",
  "sold-out",
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface EditableCommunity extends Community {
  saveStatus: "idle" | "saving" | "saved" | "error";
  errorMsg?: string;
}

export default function CommunityManager({ citySlug, initial }: Props) {
  const [communities, setCommunities] = useState<EditableCommunity[]>(
    initial.map((c) => ({ ...c, saveStatus: "idle" }))
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [addError, setAddError] = useState<string | null>(null);

  function updateName(slug: string, value: string) {
    setCommunities((prev) => prev.map((c) => (c.slug === slug ? { ...c, name: value } : c)));
  }

  function updateStatus(slug: string, value: CommunityStatus) {
    setCommunities((prev) => prev.map((c) => (c.slug === slug ? { ...c, status: value } : c)));
  }

  function updateStartingPrice(slug: string, value: string) {
    setCommunities((prev) =>
      prev.map((c) => (c.slug === slug ? { ...c, startingPrice: value } : c))
    );
  }

  function updateDescriptor(slug: string, value: string) {
    setCommunities((prev) =>
      prev.map((c) => (c.slug === slug ? { ...c, descriptor: value } : c))
    );
  }

  function updateDrHortonUrl(slug: string, value: string) {
    setCommunities((prev) =>
      prev.map((c) => (c.slug === slug ? { ...c, drHortonUrl: value } : c))
    );
  }

  async function handleSave(community: EditableCommunity) {
    setCommunities((prev) =>
      prev.map((c) => (c.slug === community.slug ? { ...c, saveStatus: "saving" } : c))
    );
    try {
      const res = await fetch("/api/admin/content/community", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          citySlug,
          slug: community.slug,
          name: community.name.trim(),
          status: community.status,
          startingPrice: community.startingPrice?.trim() || "",
          descriptor: community.descriptor?.trim() || "",
          drHortonUrl: community.drHortonUrl?.trim() || "",
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Save failed");
      }
      setCommunities((prev) =>
        prev.map((c) => (c.slug === community.slug ? { ...c, saveStatus: "saved" } : c))
      );
      setTimeout(() => {
        setCommunities((prev) =>
          prev.map((c) => (c.slug === community.slug ? { ...c, saveStatus: "idle" } : c))
        );
      }, 2000);
    } catch (err) {
      setCommunities((prev) =>
        prev.map((c) =>
          c.slug === community.slug
            ? {
                ...c,
                saveStatus: "error",
                errorMsg: err instanceof Error ? err.message : "Save failed",
              }
            : c
        )
      );
    }
  }

  async function handleDelete(slug: string) {
    if (!window.confirm("Remove this community? This can't be undone.")) return;
    const res = await fetch("/api/admin/content/community", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ citySlug, slug }),
    });
    if (res.ok) {
      setCommunities((prev) => prev.filter((c) => c.slug !== slug));
    } else {
      window.alert("Delete failed — try again.");
    }
  }

  async function handleAdd() {
    setAddError(null);
    const trimmedName = newName.trim();
    if (!trimmedName) {
      setAddError("Name is required.");
      return;
    }
    const slug = slugify(trimmedName);
    if (!slug) {
      setAddError("Couldn't generate a URL slug from that name — try adding some letters.");
      return;
    }
    if (communities.some((c) => c.slug === slug)) {
      setAddError("A community with that name (or a very similar one) already exists here.");
      return;
    }

    const res = await fetch("/api/admin/content/community", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        citySlug,
        slug,
        name: trimmedName,
        status: "verify",
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setAddError(body.error ?? "Couldn't add that community — try again.");
      return;
    }
    setCommunities((prev) => [
      ...prev,
      {
        slug,
        name: trimmedName,
        citySlug,
        status: "verify",
        saveStatus: "idle",
      },
    ]);
    setNewName("");
    setShowAddForm(false);
  }

  return (
    <section className="rounded-2xl border border-[var(--color-line)] bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
          Communities ({communities.length})
        </h2>
        <button
          type="button"
          onClick={() => setShowAddForm((v) => !v)}
          className="text-xs font-semibold text-[var(--color-drh-red)]"
        >
          {showAddForm ? "Cancel" : "+ Add community"}
        </button>
      </div>
      <p className="mt-1 text-xs text-[var(--color-ink)]/50">
        These are the button tiles buyers click into on the city page. New
        entries start as &ldquo;Verify availability&rdquo; until you confirm
        pricing and switch the status.
      </p>

      {showAddForm ? (
        <div className="mt-4 rounded-lg border border-dashed border-[var(--color-line)] p-3">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)]/60">
                Community name
              </label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Riverbend"
                className="mt-1 w-full rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
              />
              {newName.trim() ? (
                <p className="mt-1 text-[10px] text-[var(--color-ink)]/40">
                  URL: /dr-horton/{citySlug}/{slugify(newName)}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-full bg-[var(--color-navy)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--color-drh-red)]"
            >
              Add
            </button>
          </div>
          {addError ? <p className="mt-2 text-xs text-red-600">{addError}</p> : null}
        </div>
      ) : null}

      <div className="mt-4 space-y-3">
        {communities.map((c) => (
          <div key={c.slug} className="rounded-lg border border-[var(--color-line)] p-3">
            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wide text-[var(--color-ink)]/50">
                  Name
                </label>
                <input
                  value={c.name}
                  onChange={(e) => updateName(c.slug, e.target.value)}
                  className="mt-0.5 w-full rounded-lg border border-[var(--color-line)] px-3 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wide text-[var(--color-ink)]/50">
                  Status
                </label>
                <select
                  value={c.status}
                  onChange={(e) => updateStatus(c.slug, e.target.value as CommunityStatus)}
                  className="mt-0.5 w-full rounded-lg border border-[var(--color-line)] px-3 py-1.5 text-sm"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {statusLabel(s)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wide text-[var(--color-ink)]/50">
                  Starting price
                </label>
                <input
                  value={c.startingPrice ?? ""}
                  onChange={(e) => updateStartingPrice(c.slug, e.target.value)}
                  placeholder="e.g. from the low $400s"
                  className="mt-0.5 w-full rounded-lg border border-[var(--color-line)] px-3 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wide text-[var(--color-ink)]/50">
                  D.R. Horton link (optional)
                </label>
                <input
                  value={c.drHortonUrl ?? ""}
                  onChange={(e) => updateDrHortonUrl(c.slug, e.target.value)}
                  placeholder="https://www.drhorton.com/..."
                  className="mt-0.5 w-full rounded-lg border border-[var(--color-line)] px-3 py-1.5 text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-semibold uppercase tracking-wide text-[var(--color-ink)]/50">
                  Descriptor (button subtitle)
                </label>
                <input
                  value={c.descriptor ?? ""}
                  onChange={(e) => updateDescriptor(c.slug, e.target.value)}
                  placeholder="e.g. Single-family, NE Charlotte"
                  className="mt-0.5 w-full rounded-lg border border-[var(--color-line)] px-3 py-1.5 text-sm"
                />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleSave(c)}
                disabled={c.saveStatus === "saving"}
                className="rounded-full bg-[var(--color-navy)] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[var(--color-drh-red)] disabled:opacity-40"
              >
                {c.saveStatus === "saving" ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(c.slug)}
                className="text-xs font-semibold text-[var(--color-ink)]/40 hover:text-red-600"
              >
                Remove
              </button>
              {c.saveStatus === "saved" ? (
                <span className="text-xs text-[var(--color-navy)]">Saved.</span>
              ) : null}
              {c.saveStatus === "error" ? (
                <span className="text-xs text-red-600">{c.errorMsg ?? "Save failed."}</span>
              ) : null}
            </div>
          </div>
        ))}
        {communities.length === 0 ? (
          <p className="text-xs text-[var(--color-ink)]/50">
            No communities in {citySlug} yet.
          </p>
        ) : null}
      </div>
    </section>
  );
}
