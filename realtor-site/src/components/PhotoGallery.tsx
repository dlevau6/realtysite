"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export default function PhotoGallery({
  photos,
  address,
}: {
  photos: string[];
  address: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + photos.length) % photos.length
      ),
    [photos.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, close, next, prev]);

  if (photos.length === 0) return null;

  const [hero, ...rest] = photos;

  return (
    <>
      {/* Hero + thumbnail grid — the hero fills most of the frame, with up
          to 4 thumbnails packed to the right on desktop. Mirrors the layout
          Zillow / Redfin use, which is what buyers expect. */}
      <div className="grid gap-2 md:grid-cols-4 md:grid-rows-2">
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--color-mist)] md:aspect-auto"
        >
          <Image
            src={hero}
            alt={`${address} — main photo`}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 hover:scale-[1.02]"
          />
        </button>

        {rest.slice(0, 4).map((photo, i) => (
          <button
            key={photo}
            type="button"
            onClick={() => setLightboxIndex(i + 1)}
            className="relative hidden aspect-square overflow-hidden rounded-2xl bg-[var(--color-mist)] md:block"
          >
            <Image
              src={photo}
              alt={`${address} — photo ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
            {i === 3 && photos.length > 5 ? (
              <span className="absolute inset-0 flex items-center justify-center bg-black/50 font-[family-name:var(--font-data)] text-sm text-white">
                +{photos.length - 5} more
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {photos.length > 1 ? (
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="mt-3 text-sm font-medium text-[var(--color-teal)] hover:underline md:hidden"
        >
          View all {photos.length} photos →
        </button>
      ) : null}

      {/* Lightbox */}
      {lightboxIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${lightboxIndex + 1} of ${photos.length}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
          >
            Close
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            ←
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image
              src={photos[lightboxIndex]}
              alt={`${address} — photo ${lightboxIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            →
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-[family-name:var(--font-data)] text-xs text-white/70">
            {lightboxIndex + 1} / {photos.length}
          </p>
        </div>
      ) : null}
    </>
  );
}
