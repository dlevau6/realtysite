import Image from "next/image";

interface Slide {
  src: string;
  alt: string;
  eyebrow: string;
}

/**
 * Rotating hero backdrop — CSS-only crossfade slideshow. No JS needed,
 * respects reduced-motion preferences via the .hero-slide keyframe rule
 * in globals.css.
 *
 * Photo mix intentionally follows the client's 60/15/15/10 brief:
 *   - 5 DR Horton / new-construction slides (60%)
 *   - 1 Charlotte slide (15%, ~1 of 8)
 *   - 1 Lake Norman slide (15%)
 *   - 1 Raleigh/Durham slide (10%, kept low but present)
 *
 * TODO before launch: swap Unsplash placeholders for Eric's licensed
 * photography or self-shot streetscapes. Spec Section 5 forbids using
 * DR Horton marketing images.
 */
const SLIDES: Slide[] = [
  {
    // DR Horton-style new construction (Unsplash, generic — replace with Eric's)
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=2000&auto=format&fit=crop&q=80",
    alt: "Two-story new construction home with front porch",
    eyebrow: "New construction across North Carolina",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&auto=format&fit=crop&q=80",
    alt: "Modern new build home exterior",
    eyebrow: "Move-in ready homes",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=2000&auto=format&fit=crop&q=80",
    alt: "Traditional new construction home at dusk",
    eyebrow: "Builder incentives available",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&auto=format&fit=crop&q=80",
    alt: "Interior of new construction kitchen",
    eyebrow: "Fresh floor plans, real prices",
  },
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2000&auto=format&fit=crop&q=80",
    alt: "Modern home exterior",
    eyebrow: "Ten-year builder warranty",
  },
  // Charlotte
  {
    src: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=2000&auto=format&fit=crop&q=80",
    alt: "Charlotte skyline at dusk",
    eyebrow: "Charlotte metro",
  },
  // Lake Norman
  {
    src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=2000&auto=format&fit=crop&q=80",
    alt: "Lake Norman at sunset",
    eyebrow: "Lake Norman",
  },
  // Raleigh/Durham (represents the Triangle)
  {
    src: "https://images.unsplash.com/photo-1608096275195-01e2d3f8c1f8?w=2000&auto=format&fit=crop&q=80",
    alt: "Raleigh Research Triangle area",
    eyebrow: "Research Triangle",
  },
];

const SLIDE_DURATION_S = 4; // matches keyframe cycle length per slide
const TOTAL_DURATION_S = SLIDES.length * SLIDE_DURATION_S;

export default function RotatingHero() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="hero-slide absolute inset-0"
          style={{
            animationDuration: `${TOTAL_DURATION_S}s`,
            animationDelay: `${i * SLIDE_DURATION_S}s`,
            opacity: i === 0 ? 1 : 0,
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover"
          />
        </div>
      ))}
      {/* Navy gradient overlay keeps headline legible over any slide */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)] via-[var(--color-navy)]/85 to-[var(--color-navy)]/50" />
    </div>
  );
}
