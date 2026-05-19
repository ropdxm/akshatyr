"use client";

import { useT } from "../i18n/LanguageProvider";

const PHONE = "+7 702 850 4376";
const PHONE_TEL = "+77028504376";
const INSTAGRAM_URL = "https://www.instagram.com/akshatyr_demalys_ortalygy/";
const INSTAGRAM_HANDLE = "@akshatyr_demalys_ortalygy";
const TIKTOK_URL = "https://www.tiktok.com/@akshatyr_zonaotdy";
const TIKTOK_HANDLE = "@akshatyr_zonaotdy";
const MAP_2GIS_URL = "https://go.2gis.com/Pbt1f";

export default function Location() {
  const { t } = useT();
  const l = t.location;

  return (
    <section className="section" id="location">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{l.eyebrow}</span>
          <h2>{l.title}</h2>
          <p>{l.desc}</p>
        </div>

        <div className="split" id="contacts">
          <div className="map-wrap">
            <div className="map-card">
              <iframe
                title="Ақ Шатыр — Машат"
                src="https://www.openstreetmap.org/export/embed.html?bbox=69.940%2C42.470%2C69.995%2C42.510&layer=mapnik&marker=42.4893%2C69.9653"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              className="btn btn-primary map-cta"
              href={MAP_2GIS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.mapCta} →
            </a>
          </div>

          <ul className="contact-list">
            <li>
              <span className="ic" aria-hidden>📍</span>
              <div>
                <span className="key">{l.addressLabel}</span>
                <span className="val">
                  {l.address.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < l.address.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </div>
            </li>
            <li>
              <span className="ic" aria-hidden>📞</span>
              <div>
                <span className="key">{l.phoneLabel}</span>
                <a className="val" href={`tel:${PHONE_TEL}`}>
                  {PHONE}
                </a>
              </div>
            </li>
            <li>
              <span className="ic" aria-hidden>🕒</span>
              <div>
                <span className="key">{l.hoursLabel}</span>
                <span className="val">
                  {l.hours.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < l.hours.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </div>
            </li>
            <li>
              <span className="ic" aria-hidden>📷</span>
              <div>
                <span className="key">{l.igLabel}</span>
                <a
                  className="val"
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </div>
            </li>
            <li>
              <span className="ic" aria-hidden>🎵</span>
              <div>
                <span className="key">{l.tiktokLabel}</span>
                <a
                  className="val"
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {TIKTOK_HANDLE}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
