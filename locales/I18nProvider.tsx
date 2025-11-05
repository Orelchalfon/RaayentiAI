"use client";

import React from "react";
import { createTranslator, DEFAULT_LOCALE, isSupportedLocale, type I18nLocale, type TFunction } from "./i18n";

type I18nContextValue = {
  locale: I18nLocale;
  t: TFunction;
  setLocale: (locale: I18nLocale) => void;
};

const I18nContext = React.createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: string | null;
}) {
  const initial = React.useMemo<I18nLocale>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("locale");
      if (isSupportedLocale(stored)) return stored;
    }
    return isSupportedLocale(initialLocale) ? initialLocale : DEFAULT_LOCALE;
  }, [initialLocale]);

  const [locale, setLocale] = React.useState<I18nLocale>(initial);
  const t = React.useMemo(() => createTranslator(locale), [locale]);

  const setAndPersist = React.useCallback((next: I18nLocale) => {
    setLocale(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", next);
      document.documentElement.lang = next;
      document.documentElement.dir = next === "he" ? "rtl" : "ltr";
    }
  }, []);

  const value = React.useMemo<I18nContextValue>(() => ({ locale, t, setLocale: setAndPersist }), [locale, t, setAndPersist]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLanguage() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within I18nProvider");
  }
  return ctx;
}


