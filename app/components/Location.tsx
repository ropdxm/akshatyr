"use client";

import { useT } from "../i18n/LanguageProvider";

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
          <div className="map-card">
            <iframe
              title="Ақ Шатыр — Машат"
              src="https://www.openstreetmap.org/export/embed.html?bbox=70.16%2C42.46%2C70.30%2C42.56&layer=mapnik&marker=42.515%2C70.235"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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
                <a className="val" href="tel:+77776993668">
                  +7 777 699 36 68
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
                  href="https://www.instagram.com/akshatyr_demalys_ortalygy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @akshatyr_demalys_ortalygy
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
