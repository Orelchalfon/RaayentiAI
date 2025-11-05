import translations, {
  type EnTranslations,
  type I18nLocale,
} from "./translations";

export const SUPPORTED_LOCALES = Object.keys(translations) as I18nLocale[];
export const DEFAULT_LOCALE: I18nLocale = "en";

export function isSupportedLocale(locale: string | undefined | null): locale is I18nLocale {
  return !!locale && (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

// Build a dotted-union of keys, e.g. "home.cta.button"
export type DeepKeyOf<T> = T extends object
  ? {
      [K in Extract<keyof T, string>]: T[K] extends object
        ? `${K}` | `${K}.${DeepKeyOf<T[K]>}`
        : `${K}`
    }[Extract<keyof T, string>]
  : never;

export type TranslationPath = DeepKeyOf<EnTranslations>;

function getByPath(obj: unknown, path: string): unknown {
  if (!obj) return undefined;
  const segments = path.split(".");
  let current: any = obj;
  for (const segment of segments) {
    if (current == null) return undefined;
    current = current[segment as keyof typeof current];
  }
  return current;
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    params[key] !== undefined ? String(params[key]) : `{${key}}`
  );
}

export function createTranslator(locale: I18nLocale, fallback: I18nLocale = DEFAULT_LOCALE) {
  const primary = translations[locale] as unknown as EnTranslations;
  const fallbackDict = translations[fallback] as unknown as EnTranslations;

  return function t(path: TranslationPath, params?: Record<string, string | number>): string {
    const raw = (getByPath(primary, path) ?? getByPath(fallbackDict, path) ?? path) as unknown;
    const value = typeof raw === "string" || typeof raw === "number" ? String(raw) : path;
    return interpolate(value, params);
  };
}

export type TFunction = ReturnType<typeof createTranslator>;

// Convenience server-friendly factory
export function getT(locale?: string | null): TFunction {
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return createTranslator(safeLocale);
}

// Default translator (EN)
export const t = createTranslator(DEFAULT_LOCALE);


export { I18nLocale };


