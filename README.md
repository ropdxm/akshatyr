# Ақ Шатыр — Demalys Ortalygy

Marketing landing for **Ақ Шатыр**, a family recreation zone in the Mashat
gorge near Shymkent, Kazakhstan. Bilingual (Russian / Kazakh), mobile-first,
and built as a single statically-rendered page.

> _Ақ Шатыр_ literally means **"white tent"** — the brand identity is a white
> multi-peak tent silhouette on an emerald-green ground, faithfully recreated
> as inline SVG in `app/components/Logo.tsx`.

---

## Tech stack

| Layer       | Choice                                                           |
| ----------- | ---------------------------------------------------------------- |
| Framework   | **Next.js 16** (App Router, Turbopack, static export)            |
| Language    | **TypeScript** (strict mode, `allowJs: false`)                   |
| UI          | React 19 server components + `"use client"` islands              |
| Animations  | **Motion** (`motion/react`) — spring-smoothed scroll parallax    |
| Styling     | Hand-written CSS with custom properties (no framework, no Tailwind) |
| i18n        | Custom React context + dictionary file (RU / KK)                 |
| Map         | Embedded OpenStreetMap iframe                                    |

Zero runtime data dependencies — the page prerenders to static HTML/CSS/JS.

---

## Getting started

Requires Node 18.18+ (Node 20 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the built site
npm run lint       # next lint
```

---

## Project structure

```
app/
├── components/
│   ├── Header.tsx          # Sticky nav, language switcher, mobile hamburger
│   ├── Logo.tsx            # SVG brand lockup (tent badge + wordmark)
│   ├── Hero.tsx            # Parallax hero (Motion useScroll + useSpring)
│   ├── About.tsx           # Intro + stat highlights
│   ├── Activities.tsx      # 9 cards — pool, restaurant, kids zone, etc.
│   ├── Accommodation.tsx   # 6 room types with prices
│   ├── Location.tsx        # Address, phone, hours, embedded map
│   └── Footer.tsx
├── i18n/
│   ├── translations.ts     # All RU + KK strings, fully typed (Dict, Lang)
│   └── LanguageProvider.tsx # React context, useT() hook, localStorage persistence
├── globals.css             # Theme tokens + all component styles
├── layout.tsx              # Root layout, metadata, viewport, LanguageProvider
└── page.tsx                # Composes the sections
```

### Adding a new language

1. Add the locale code to the `Lang` union in `app/i18n/translations.ts`.
2. Add a full dictionary entry with the same shape as `ru` / `kk` — TypeScript
   enforces this via `Record<Lang, Dict>`, so missing keys won't compile.
3. Append the new code to the `SUPPORTED` array in `LanguageProvider.tsx`.
4. Add a button for it in `Header.tsx`.

### Editing copy

Every visible string lives in `app/i18n/translations.ts`. Components read from
that file via `useT()` — no hard-coded text anywhere else.

### Editing prices / accommodation

`translations.ts → rooms.items[]`. Each item has either a literal `price`
string ("от 25 000 ₸") or a `priceKey` reference to a shared phrase
(`"onRequest"`).

### Editing the theme

Open `app/globals.css`. The palette is concentrated at the top in `:root`:

```css
--bg:       #082b18;   /* deep emerald base    */
--bg-2:     #0d3a22;
--panel:    #134c2d;   /* logo mid-green       */
--ink:      #ffffff;   /* logo typography      */
--accent:   #e2c264;   /* warm gold — CTAs     */
--accent-2: #4eb072;   /* bright emerald glow  */
--tent:     #ffffff;   /* the "Ақ" white tent  */
```

Every visual surface derives from these tokens, so changing the palette is
a one-liner change.

---

## Design notes

### Hero parallax

`Hero.tsx` uses Motion's `useScroll → useSpring → useTransform` chain so each
of the five depth layers (sky, back ridge, front ridge, white tent, headline)
glides at its own rate. The spring (`stiffness: 200, damping: 40, mass: 0.4`)
smooths irregular scroll samples, so the motion stays continuous even when
frames drop.

Parallax is **automatically disabled** when any of these match:

- `prefers-reduced-motion: reduce`
- `(pointer: coarse)` — touch / stylus primary
- `(max-width: 720px)` — mobile

On those targets the hero renders as static layers — much smoother on phones
and respectful of accessibility preferences.

### Mobile

- **Hamburger menu** (slide-in panel from the right) below 880px
- Body scroll lock while the panel is open; closes on Escape, scrim tap,
  link tap, or resize back to desktop
- Hero uses `100dvh / 100svh` to avoid iOS Safari address-bar jumps
- `overflow-x: clip` on `<body>` — no accidental horizontal scroll
- `@media (hover: none)` neutralises sticky-hover artifacts on touch devices
- All tap targets ≥ 44 px

### Animations

- Buttons have a diagonal shine sweep on hover plus a pulsing glow on the
  primary CTA (both honor `prefers-reduced-motion`)
- Language switcher animates between RU / KK states
- Brand lockup gently lifts and gains a subtle emerald glow on hover

---

## Deployment

The site is fully static. Any host that serves a Next.js build works:

- **Vercel** — zero config, the natural target
- **Cloudflare Pages / Netlify** — `next build` output works as-is
- **Self-host** — `npm run build && npm run start`, or run behind a reverse
  proxy

If targeting a CDN/static host without Node, add
`output: "export"` to `next.config.ts` and use `npm run build`.

---

## License & content

The Ақ Шатыр name, logo, and recreation-zone information belong to the venue
itself. The contact details (phone, address, Instagram) come from publicly
available listings. Pricing shown on the site is **indicative** — exact rates
and availability should be confirmed by phone:

**+7 777 699 36 68** · [Instagram](https://www.instagram.com/akshatyr_demalys_ortalygy)
