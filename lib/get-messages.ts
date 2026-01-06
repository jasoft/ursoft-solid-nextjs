import type { Locale } from "@/i18n";

export async function getMessages(locale: Locale) {
  return (await import(`../messages/${locale}.json`)).default as any;
}