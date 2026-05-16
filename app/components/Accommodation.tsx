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
      </div>
    </section>
  );
}
