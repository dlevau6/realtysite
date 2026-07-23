import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site-config";

export default function MeetAgentBand() {
  return (
    <section className="border-t border-[var(--color-line)] bg-white py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[auto_1fr] md:items-center">
        <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full border-4 border-[var(--color-teal-soft)] md:mx-0">
          <Image
            src="/sample/eric-headshot.jpg"
            alt={SITE.agentName}
            fill
            sizes="14rem"
            className="object-cover"
          />
        </div>

        <div>
          <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-teal)]">
            {SITE.agentTitle} · Lic. {SITE.licenseNumber}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--color-navy)]">
            Meet {SITE.agentName.split(" ")[0]}
          </h2>
          <p className="mt-4 max-w-xl text-[var(--color-ink)]/80">
            Working Lake Norman and Charlotte since long enough to have seen a
            few market cycles, {SITE.agentName.split(" ")[0]} brings honest,
            patient, and specific-to-your-situation guidance to every client —
            first-time buyer, downsizer, or investor.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-teal)]"
            >
              More about Eric
            </Link>
            <a
              href={`tel:${SITE.phone}`}
              className="rounded-full border border-[var(--color-line)] px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]"
            >
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
