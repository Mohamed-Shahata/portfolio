"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Locale } from "./translations";

interface LocaleContextValue {
  locale: Locale;
  toggleLocale: () => void;
  t: (typeof translations)[Locale];
  dir: "ltr" | "rtl";
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const STORAGE_KEY = "portfolio-locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === "en" || saved === "ar") {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const toggleLocale = () => setLocale((prev) => (prev === "en" ? "ar" : "en"));

  const value: LocaleContextValue = {
    locale,
    toggleLocale,
    t: translations[locale],
    dir: locale === "ar" ? "rtl" : "ltr",
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}
