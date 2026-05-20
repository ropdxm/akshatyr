"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useT } from "../i18n/LanguageProvider";

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { t } = useT();
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  // Decide once on mount whether to enable parallax.
  // Disable on touch / small / coarse pointer / reduced-motion.
  useEffect(() => {
    const small = window.matchMedia("(max-width: 720px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!reduceMotion && !small && !coarse);
  }, [reduceMotion]);

  // Single scroll source for all layers
  const { scrollY } = useScroll();

  // Spring-smooth the scroll value — this is what makes it feel buttery
  // even when scroll events fire irregularly or frames are dropped.
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 200,
    damping: 40,
    mass: 0.4,
  });

  // Each layer reads from the smoothed source at a different rate.
  // Multipliers match the previous CSS-variable parallax.
  const ySky = useTransform(smoothScrollY, (v) => v * 0.15);
  const yBack = useTransform(smoothScrollY, (v) => v * 0.35);
  const yFront = useTransform(smoothScrollY, (v) => v * 0.6);
  const yTent = useTransform(smoothScrollY, (v) => v * 0.45);
  const yInner = useTransform(smoothScrollY, (v) => v * -0.25);

  return (
    <section className="hero" ref={ref}>
      <motion.div
        className="hero-sky"
        style={enabled ? { y: ySky } : undefined}
        aria-hidden
      />
      <motion.div
        className="hero-mountains-back"
        style={enabled ? { y: yBack } : undefined}
        aria-hidden
      />
      <motion.div
        className="hero-mountains-front"
        style={enabled ? { y: yFront } : undefined}
        aria-hidden
      />

      {/* Twin tents — mirrors the logo's multi-peak silhouette */}
      <motion.svg
        className="hero-tent"
        viewBox="0 0 220 140"
        xmlns="http://www.w3.org/2000/svg"
        style={enabled ? { x: "-50%", y: yTent } : undefined}
        aria-hidden
      >
        <defs>
          <linearGradient id="tentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbf6ec" />
            <stop offset="100%" stopColor="#d9cdb6" />
          </linearGradient>
        </defs>

        {/* Shared ground shadow under both tents */}
        <ellipse cx="110" cy="128" rx="108" ry="5" fill="rgba(0,0,0,0.45)" />

        {/* Back / left tent — slightly smaller, behind the front one */}
        <path
          d="M60 26 L118 124 L8 124 Z"
          fill="url(#tentGrad)"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="1"
        />
        <path
          d="M60 26 L40 124 M60 26 L80 124 M60 26 L100 124"
          stroke="rgba(0,0,0,0.09)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="60" cy="24" r="2.5" fill="#d6b56b" />

        {/* Front / right tent — larger, overlaps the back one */}
        <path
          d="M155 8 L215 124 L95 124 Z"
          fill="url(#tentGrad)"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="1"
        />
        <path
          d="M155 8 L135 124 M155 8 L175 124 M155 8 L115 124 M155 8 L195 124"
          stroke="rgba(0,0,0,0.09)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="155" cy="6" r="3" fill="#d6b56b" />
      </motion.svg>

      <motion.div
        className="container hero-inner"
        style={enabled ? { y: yInner } : undefined}
      >
        <span className="eyebrow">{t.hero.eyebrow}</span>
        <h1>
          {t.hero.title}
          <span>{t.hero.subtitle}</span>
        </h1>
        <p className="lead">{t.hero.lead}</p>
        <div className="hero-actions">
          <a
            href="https://wa.me/77474829219"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {t.hero.ctaPrimary}
          </a>
          <a href="#activities" className="btn btn-ghost">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
