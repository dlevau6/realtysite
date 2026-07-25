"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminNav() {
  const pathname = usePathname();

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      window.location.href = "/admin/login";
    }
  }

  // Login page has no nav
  if (pathname === "/admin/login") return null;

  return (
    <nav className="flex items-center gap-6 text-sm">
      {LINKS.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`font-medium transition-colors ${
              active
                ? "text-[var(--color-drh-red)]"
                : "text-[var(--color-ink)] hover:text-[var(--color-navy)]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-full border border-[var(--color-line)] px-4 py-2 text-xs font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]"
      >
        Sign out
      </button>
    </nav>
  );
}
