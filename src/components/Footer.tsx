import { SITE } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy-deep)] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
            {SITE.brandName}
          </p>
          <p className="mt-2 text-sm text-white/70">{SITE.brokerage}</p>
          <p className="mt-4 text-sm text-white/70">
            {SITE.agentName}, {SITE.agentTitle}
            <br />
            Lic. {SITE.licenseNumber}
          </p>
        </div>

        <div className="text-sm text-white/70">
          <p className="mb-2 font-medium text-white">Contact</p>
          <p>{SITE.address.street}</p>
          <p>
            {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
          </p>
          <p className="mt-2">
            <a href={`tel:${SITE.phone}`} className="hover:text-[var(--color-teal)]">
              {SITE.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${SITE.email}`} className="hover:text-[var(--color-teal)]">
              {SITE.email}
            </a>
          </p>
        </div>

        <div className="text-sm text-white/70">
          <p className="mb-2 font-medium text-white">Serving</p>
          <p>{SITE.serviceAreas.join(" · ")}</p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {SITE.brandName}. All rights reserved. Equal
        Housing Opportunity.
      </div>
    </footer>
  );
}
