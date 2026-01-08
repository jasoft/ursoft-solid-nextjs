"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  currentLocaleFromPath,
  detectLocaleByIp,
  withLocalePrefix,
} from "@/lib/i18n";

const STORAGE_KEY = "preferredLocale";

export default function LanguageRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!pathname) return;
    const hasLang = /^\/(en|zh|fr|es|ja|pt|de|ru)(\/|$)/i.test(pathname);
    if (hasLang) return; // already language-scoped

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      router.replace(withLocalePrefix(pathname, stored as any));
      return;
    }

    // Fallback to IP-based detection
    detectLocaleByIp().then((loc) => {
      localStorage.setItem(STORAGE_KEY, loc);
      router.replace(withLocalePrefix(pathname, loc));
    });
  }, [pathname, router]);

  return null;
}
