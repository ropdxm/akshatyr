"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Dict, type Lang } from "./translations";

type LanguageContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "ru",
  t: translations.ru,
  setLang: () => {},
});

const STORAGE_KEY = "akshatyr.lang";
const SUPPORTED: readonly Lang[] = ["ru", "kk"] as const;

function isLang(value: string | null): value is Lang {
  return value !== null && (SUPPORTED as readonly string[]).includes(value);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isLang(saved)) {
        setLangState(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    if (!(SUPPORTED as readonly string[]).includes(next)) return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: translations[lang],
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useT(): LanguageContextValue {
  return useContext(LanguageContext);
}
