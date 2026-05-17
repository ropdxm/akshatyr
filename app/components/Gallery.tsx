"use client";

import Image from "next/image";
import { useT } from "../i18n/LanguageProvider";

type Photo = { src: string; w: number; h: number };

// Mixed portrait + landscape; the masonry-style CSS columns
// arrange them tidily at every breakpoint.
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

  return (
    <section className="section" id="gallery">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.gallery.eyebrow}</span>
          <h2>{t.gallery.title}</h2>
          <p>{t.gallery.desc}</p>
        </div>

        <div className="gallery-grid">
          {photos.map((p, i) => (
            <figure className="gallery-item" key={p.src}>
              <Image
                src={p.src}
                alt={`${t.gallery.altPrefix} ${i + 1}`}
                width={p.w}
                height={p.h}
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                loading="lazy"
                quality={80}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
