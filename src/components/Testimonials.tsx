import { JsonLd, testimonialSchema } from "@/lib/schema";

/**
 * Testimonial copy re-keyed from the client's social post screenshots
 * (see /areas/realtor-website notes) so the text is real, crawlable
 * content instead of pixels in a JPEG. Confirm final wording with the
 * client before launch.
 */
const TESTIMONIALS = [
  {
    authorName: "Janica Alphin",
    location: "Sherrills Ford, NC",
    ratingValue: 5,
    datePublished: "2026-01-15",
    reviewBody:
      "Eric and Melissa are extremely personal, professional, and thorough in their approach with clients. They offer top-notch customer service — someone who is dedicated to your dreams, listens intently, and shows real patience through the journey.",
  },
  {
    authorName: "Christina Ludack & Torrey Sears",
    location: "Sherrills Ford, NC",
    ratingValue: 5,
    datePublished: "2026-01-22",
    reviewBody:
      "Eric and Melissa were exceptional. Their responsiveness and knowledge of NC properties, along with the ability to navigate negotiations with ease, made buying a home quick and easy. We felt taken care of every step of the way.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[var(--color-mist)] py-20">
      <JsonLd data={testimonialSchema(TESTIMONIALS)} />
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-teal)]">
          Real clients, real results
        </p>
        <h2 className="mt-2 max-w-xl font-[family-name:var(--font-display)] text-3xl text-[var(--color-navy)]">
          What clients say after closing
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.authorName}
              className="rounded-2xl border border-[var(--color-line)] bg-white p-8"
            >
              <div className="mb-4 text-[var(--color-gold)]" aria-hidden="true">
                {"★".repeat(t.ratingValue)}
              </div>
              <blockquote className="text-[var(--color-ink)]">
                &ldquo;{t.reviewBody}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-[var(--color-ink)]/60">
                {t.authorName} · {t.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
