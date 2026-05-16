import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#082b18",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Ақ Шатыр — зона отдыха в ущелье Машат | Шымкент",
  description:
    "Ақ Шатыр — семейная зона отдыха в ущелье Машат под Шымкентом. Коттеджи, бассейн, ресторан у реки, детская площадка и горный воздух. Бронируйте отдых круглый год.",
  keywords: [
    "Ак Шатыр",
    "Акшатыр",
    "зона отдыха Шымкент",
    "Машат",
    "отдых в горах",
    "коттеджи Шымкент",
    "demalys ortalygy",
  ],
  openGraph: {
    title: "Ақ Шатыр — зона отдыха в ущелье Машат",
    description:
      "Коттеджи, бассейн, ресторан у реки и горный воздух в часе езды от Шымкента.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
