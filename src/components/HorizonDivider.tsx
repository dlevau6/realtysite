/**
 * The site's signature element: a single restrained wave line that marks
 * the transition from the hero into the content below — a quiet echo of
 * the wave in the client's own logo mark, used exactly once per page.
 */
export default function HorizonDivider() {
  return (
    <div className="horizon-divider" aria-hidden="true">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path
          d="M0 24 C 150 4, 300 4, 450 20 C 600 36, 750 36, 900 18 C 1000 6, 1100 6, 1200 20 V40 H0 Z"
          fill="var(--color-teal-soft)"
        />
        <path
          d="M0 24 C 150 4, 300 4, 450 20 C 600 36, 750 36, 900 18 C 1000 6, 1100 6, 1200 20"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
