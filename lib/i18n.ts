export const locales = [
  "en",
  "zh",
  "fr",
  "es",
  "ja",
  "pt",
  "de",
  "ru",
] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(v: string | null | undefined): v is Locale {
  return !!v && (locales as readonly string[]).includes(v);
}

export function normalizeLocale(v: string | null | undefined): Locale {
  if (!v) return defaultLocale;
  const lower = v.toLowerCase();
  if (isLocale(lower)) return lower;
  // map common language tags
  if (lower.startsWith("zh")) return "zh";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("ja")) return "ja";
  if (lower.startsWith("pt")) return "pt";
  if (lower.startsWith("de")) return "de";
  if (lower.startsWith("ru")) return "ru";
  return "en";
}

export function withLocalePrefix(
  path: string,
  locale: Locale | null | undefined,
) {
  const l = normalizeLocale(locale ?? defaultLocale);
  if (!path.startsWith("/")) path = `/${path}`;
  if (path === "/") return `/${l}`;
  return `/${l}${path}`;
}

export function currentLocaleFromPath(
  pathname: string | null | undefined,
): Locale {
  if (!pathname) return defaultLocale;
  const seg = pathname.split("/").filter(Boolean)[0] ?? "";
  return isLocale(seg) ? (seg as Locale) : defaultLocale;
}

// Lightweight client-side IP locale detection
export async function detectLocaleByIp(): Promise<Locale> {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!res.ok) throw new Error("geo failed");
    const data: any = await res.json();
    const country = String(data.country || "").toUpperCase();
    // Simplified mapping
    if (["CN", "TW", "HK", "MO"].includes(country)) return "zh";
    if (["JP"].includes(country)) return "ja";
    if (["FR", "MC", "BE", "LU", "CA"].includes(country)) return "fr";
    if (
      [
        "ES",
        "MX",
        "AR",
        "CO",
        "PE",
        "CL",
        "VE",
        "EC",
        "GT",
        "CU",
        "BO",
        "DO",
        "HN",
        "PY",
        "SV",
        "NI",
        "CR",
        "PA",
        "UY",
        "GQ",
      ].includes(country)
    )
      return "es";
    if (["PT", "BR"].includes(country)) return "pt";
    if (["DE", "AT", "CH", "LI"].includes(country)) return "de";
    if (["RU", "BY", "KZ", "KG"].includes(country)) return "ru";
    return "en";
  } catch {
    return defaultLocale;
  }
}
