"use client";

import { useT } from "../i18n/LanguageProvider";

export default function Activities() {
  const { t } = useT();

  return (
    <section className="section" id="activities">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.activities.eyebrow}</span>
          <h2>{t.activities.title}</h2>
          <p>{t.activities.desc}</p>
        </div>

        <div className="cards">
          {t.activities.items.map((it) => (
            <article className="card" key={it.title}>
              <div className="icon" aria-hidden>{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
