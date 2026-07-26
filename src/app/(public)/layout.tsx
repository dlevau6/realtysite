import ComplianceHeader from "@/components/ComplianceHeader";

/**
 * Scopes the compliance header to public routes only — admin pages
 * have their own AdminNav / header setup and don't need this.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ComplianceHeader />
      {children}
    </>
  );
}
