import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "/listings", label: "Listings" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-11 w-11 flex-shrink-0">
            <Image
              src="/sample/logo.png"
              alt=""
              fill
              sizes="44px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
              {SITE.brandName}
            </span>
            <span className="text-xs tracking-wide text-[var(--color-teal)]">
              {SITE.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-teal)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${SITE.phone}`}
          className="rounded-full bg-[var(--color-navy)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-teal)]"
        >
          {SITE.phone}
        </a>
      </div>
    </header>
  );
}
