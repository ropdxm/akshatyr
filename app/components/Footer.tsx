"use client";

import { useT } from "../i18n/LanguageProvider";

const PHONE = "+7 702 850 4376";
const PHONE_TEL = "+77028504376";
const INSTAGRAM_URL = "https://www.instagram.com/akshatyr_demalys_ortalygy/";
const TIKTOK_URL = "https://www.tiktok.com/@akshatyr_zonaotdy";
const MAP_2GIS_URL = "https://go.2gis.com/Pbt1f";

export default function Footer() {
  const { t } = useT();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>© {new Date().getFullYear()} {t.footer.copy}</div>
        <div className="footer-links">
          <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
          <span aria-hidden>·</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <span aria-hidden>·</span>
          <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">
            TikTok
          </a>
          <span aria-hidden>·</span>
          <a href={MAP_2GIS_URL} target="_blank" rel="noopener noreferrer">
            2ГИС
          </a>
        </div>
      </div>
    </footer>
  );
}
