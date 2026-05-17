"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "../i18n/LanguageProvider";

type Photo = { src: string; w: number; h: number };

// Mixed portrait + landscape; the carousel frames them uniformly
// via object-fit: contain so nothing important gets cropped.
const photos: Photo[] = [
  { src: "/photos/photo-2.jpg", w: 1800, h: 1012 },
  { src: "/photos/photo-1.jpg", w: 1012, h: 1800 },
  { src: "/photos/photo-3.jpg", w: 1800, h: 1012 },
  { src: "/photos/photo-6.jpg", w: 1012, h: 1800 },
  { src: "/photos/photo-4.jpg", w: 1800, h: 1012 },
  { src: "/photos/photo-5.jpg", w: 1012, h: 1800 },
];

export default function Gallery() {
  const { t } = useT();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll<HTMLElement>(".gallery-slide");
    const target = slides[i];
    if (!target) return;
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  // Sync dot indicator with native scroll position / swipes
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(
      track.querySelectorAll<HTMLElement>(".gallery-slide")
    );
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((s, i) => {
      const c = s.offsetLeft - track.offsetLeft + s.clientWidth / 2;
      const d = Math.abs(c - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setIndex(best);
  }, []);

  const prev = () => scrollToIndex(Math.max(0, index - 1));
  const next = () => scrollToIndex(Math.min(photos.length - 1, index + 1));

  // Keyboard navigation when the track has focus
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    track.addEventListener("keydown", onKey);
    return () => track.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

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
            onClick={prev}
            disabled={index === 0}
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
            onClick={next}
            disabled={index === photos.length - 1}
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
            ref={trackRef}
            className="gallery-track"
            onScroll={handleScroll}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label={t.gallery.title}
          >
            {photos.map((p, i) => (
              <figure
                className="gallery-slide"
                key={p.src}
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${photos.length}`}
              >
                <Image
                  src={p.src}
                  alt={`${t.gallery.altPrefix} ${i + 1}`}
                  width={p.w}
                  height={p.h}
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 720px, 1000px"
                  quality={82}
                  priority={i === 0}
                />
              </figure>
            ))}
          </div>

          <div className="gallery-dots" role="tablist" aria-label="Выбрать фото">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Фото ${i + 1}`}
                className={`gallery-dot${i === index ? " is-active" : ""}`}
                onClick={() => scrollToIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
