// i18n.ts
export const locales = [
  "en",
  "zh",
  "fr",
  "es",
  "ja",
  "pt",
  "de",
  "ru",
  "it",
  "ko",
  "nl",
] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
