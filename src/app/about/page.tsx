import type { Metadata } from "next";
import { JsonLd, agentSchema } from "@/lib/schema";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${SITE.agentName}, ${SITE.agentTitle} at ${SITE.brokerage}, serving ${SITE.serviceAreas.join(", ")}.`,
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd data={agentSchema()} />
      <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-teal)]">
        {SITE.agentTitle} · Lic. {SITE.licenseNumber}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--color-navy)]">
        {SITE.agentName}
      </h1>
      <p className="mt-6 text-[var(--color-ink)]/80">
        {/* TODO: replace with the client's actual bio copy — this is
            placeholder text drafted from the tone of their branding
            materials ("honest, experienced, professional; local expertise,
            personal service"). */}
        Honest, experienced, and professional — {SITE.agentName} has helped
        buyers and sellers navigate the {SITE.serviceAreas[0]} market with
        local expertise and a personal touch at every step, from the first
        showing through closing day.
      </p>

      <div className="mt-10 rounded-2xl border border-[var(--color-line)] p-6">
        <p className="font-medium text-[var(--color-navy)]">{SITE.brokerage}</p>
        <p className="mt-1 text-sm text-[var(--color-ink)]/70">
          {SITE.address.street}, {SITE.address.city}, {SITE.address.state}{" "}
          {SITE.address.zip}
        </p>
        <p className="mt-1 text-sm text-[var(--color-ink)]/70">{SITE.phone}</p>
      </div>
    </article>
  );
}
