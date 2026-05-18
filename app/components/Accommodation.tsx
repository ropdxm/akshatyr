"use client";

import { useT } from "../i18n/LanguageProvider";
import type { RoomItem } from "../i18n/translations";

export default function Accommodation() {
  const { t } = useT();
  const r = t.rooms;

  const resolvePrice = (item: RoomItem): string => {
    if (item.price) return item.price;
    if (item.priceKey) return r[item.priceKey];
    return "";
  };

  const resolveNote = (item: RoomItem): string => r[item.noteKey];

  return (
    <section className="section" id="stay">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{r.eyebrow}</span>
          <h2>{r.title}</h2>
          <p>{r.desc}</p>
        </div>

        <div className="rooms">
          {r.items.map((item) => (
            <article className="room" key={item.title}>
              <span className="tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <ul className="features">
                {item.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="price">
                {resolvePrice(item)}
                <small>{resolveNote(item)}</small>
              </div>
            </article>
          ))}
        </div>

        {/* Дополнительные услуги — additional services price list */}
        <div className="extras">
          <div className="extras-head">
            <h3>{r.extrasTitle}</h3>
            <p>{r.extrasDesc}</p>
          </div>
          <ul className="extras-list">
            {r.extras.map((e) => (
              <li key={e.title} className="extras-row">
                <span className="extras-name">
                  {e.title}
                  {e.note && <small> · {e.note}</small>}
                </span>
                <span className="extras-dots" aria-hidden />
                <span className="extras-price">{e.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
