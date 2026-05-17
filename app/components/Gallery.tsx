"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { useT } from "../i18n/LanguageProvider";

type Photo = { src: string };

// All photos are pre-cropped to 1200x1200 squares — see
// scripts/process-photos.mjs.
const SIZE = 1200;
const photos: Photo[] = [
  { src: "/photos/photo-2.jpg" },
  { src: "/photos/photo-1.jpg" },
  { src: "/photos/photo-3.jpg" },
  { src: "/photos/photo-6.jpg" },
  { src: "/photos/photo-4.jpg" },
  { src: "/photos/photo-5.jpg" },
];

export default function Gallery() {
  const { t } = useT();

  // Embla handles the dragging, snapping, and — crucially — the
  // infinite loop. Past the last slide loops to the first, and vice
  // versa. `align: "center"` keeps the active slide centered when
  // multiple slides are visible.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );

  return (
    <section className="section" id="gallery">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.gallery.eyebrow}</span>
          <h2>{t.gallery.title}</h2>
          <p>{t.gallery.desc}</p>
        </div>

        <div className="gallery-carousel">
          <button
            type="button"
            className="gallery-nav gallery-nav--prev"
            onClick={scrollPrev}
            aria-label="Предыдущее фото"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="gallery-nav gallery-nav--next"
            onClick={scrollNext}
            aria-label="Следующее фото"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className="embla"
            ref={emblaRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={t.gallery.title}
          >
            <div className="embla__container">
              {photos.map((p, i) => (
                <figure
                  key={p.src}
                  className={`embla__slide gallery-slide${
                    i === selectedIndex ? " is-active" : ""
                  }`}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${photos.length}`}
                >
                  <Image
                    src={p.src}
                    alt={`${t.gallery.altPrefix} ${i + 1}`}
                    width={SIZE}
                    height={SIZE}
                    sizes="(max-width: 700px) 90vw, (max-width: 1100px) 480px, 360px"
                    quality={80}
                    priority={i === 0}
                  />
                </figure>
              ))}
            </div>
          </div>

          <div className="gallery-dots" role="tablist" aria-label="Выбрать фото">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === selectedIndex}
                aria-label={`Фото ${i + 1}`}
                className={`gallery-dot${i === selectedIndex ? " is-active" : ""}`}
                onClick={() => scrollTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
