"use client";

import { useEffect, useState } from "react";
import { useT } from "../i18n/LanguageProvider";
import Logo from "./Logo";

export default function Header() {
  const { lang, setLang, t } = useT();
  const [open, setOpen] = useState(false);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Auto-close menu if user resizes back to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 880) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container nav">
        <a href="#" aria-label="Ақ Шатыр" onClick={close} className="brand-link">
          <Logo size={44} />
        </a>

        <nav className="nav-desktop" aria-label="Главное меню">
          <ul className="nav-links">
            <li><a href="#about">{t.nav.about}</a></li>
            <li><a href="#activities">{t.nav.activities}</a></li>
            <li><a href="#stay">{t.nav.stay}</a></li>
            <li><a href="#location">{t.nav.location}</a></li>
          </ul>
        </nav>

        <div className="nav-right">
          <div
            className="lang-switch"
            role="group"
            aria-label={t.langSwitch.ariaLabel}
          >
            <button
              type="button"
              className={lang === "ru" ? "is-active" : ""}
              onClick={() => setLang("ru")}
              aria-pressed={lang === "ru"}
            >
              {t.langSwitch.ru}
            </button>
            <button
              type="button"
              className={lang === "kk" ? "is-active" : ""}
              onClick={() => setLang("kk")}
              aria-pressed={lang === "kk"}
            >
              {t.langSwitch.kk}
            </button>
          </div>

          <a href="#contacts" className="nav-cta nav-cta--desktop">{t.nav.book}</a>

          <button
            type="button"
            className={`nav-burger${open ? " is-open" : ""}`}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile slide-in panel */}
      <div
        className={`mobile-scrim${open ? " is-open" : ""}`}
        onClick={close}
        aria-hidden
      />
      <aside
        id="mobile-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <ul className="mobile-nav-links">
          <li><a href="#about" onClick={close}>{t.nav.about}</a></li>
          <li><a href="#activities" onClick={close}>{t.nav.activities}</a></li>
          <li><a href="#stay" onClick={close}>{t.nav.stay}</a></li>
          <li><a href="#location" onClick={close}>{t.nav.location}</a></li>
        </ul>
        <a
          href="#contacts"
          className="btn btn-primary mobile-cta"
          onClick={close}
        >
          {t.nav.book}
        </a>
      </aside>
    </header>
  );
}
