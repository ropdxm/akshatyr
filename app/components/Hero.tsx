"use client";

import { useEffect, useRef } from "react";
import { useT } from "../i18n/LanguageProvider";

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { t } = useT();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip parallax for users who prefer reduced motion, on small screens,
    // and on touch-primary devices — keeps mobile scroll buttery.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 720px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || small || coarse) return;

    let raf = 0;
    let pending = false;

    const update = () => {
      pending = false;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = -rect.top;
      el.style.setProperty("--parallax", String(offset));
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" ref={ref}>
      <div className="hero-sky" aria-hidden />
      <div className="hero-mountains-back" aria-hidden />
      <div className="hero-mountains-front" aria-hidden />

      {/* The white tent — Ақ Шатыр */}
      <svg
        className="hero-tent"
        viewBox="0 0 200 140"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="tentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbf6ec" />
            <stop offset="100%" stopColor="#d9cdb6" />
          </linearGradient>
        </defs>
        <path
          d="M100 8 L188 122 L12 122 Z"
          fill="url(#tentGrad)"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="1"
        />
        <path
          d="M100 8 L72 122 M100 8 L128 122 M100 8 L52 122 M100 8 L148 122"
          stroke="rgba(0,0,0,0.09)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="100" cy="6" r="3" fill="#d6b56b" />
        <ellipse cx="100" cy="126" rx="92" ry="5" fill="rgba(0,0,0,0.4)" />
      </svg>

      <div className="container hero-inner">
        <span className="eyebrow">{t.hero.eyebrow}</span>
        <h1>
          {t.hero.title}
          <span>{t.hero.subtitle}</span>
        </h1>
        <p className="lead">{t.hero.lead}</p>
        <div className="hero-actions">
          <a href="#contacts" className="btn btn-primary">
            {t.hero.ctaPrimary}
          </a>
          <a href="#activities" className="btn btn-ghost">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
