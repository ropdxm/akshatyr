"use client";

import { useT } from "../i18n/LanguageProvider";

export default function Footer() {
  const { t } = useT();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>© {new Date().getFullYear()} {t.footer.copy}</div>
        <div>
          <a href="tel:+77776993668">+7 777 699 36 68</a>{" "}
          ·{" "}
          <a
            href="https://www.instagram.com/akshatyr_demalys_ortalygy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
