"use client";

import { useT } from "../i18n/LanguageProvider";

export default function About() {
  const { t } = useT();

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2>{t.about.title}</h2>
          <p>{t.about.desc}</p>
        </div>

        <div className="highlights">
          {t.about.stats.map((s) => (
            <div className="highlight" key={s.label}>
              <div className="num">{s.num}</div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
