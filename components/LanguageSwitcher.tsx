"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { currentLocaleFromPath, locales, withLocalePrefix } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const current = currentLocaleFromPath(pathname || "/");

  return (
    <div className="flex items-center gap-2 text-sm">
      {locales.map((l) => {
        const href = withLocalePrefix(
          pathname ? pathname.replace(/^\/(en|zh|fr|es|ja|pt|de|ru)/, "") : "/",
          l,
        );
        const active = l === current;
        return (
          <Link
            key={l}
            href={href}
            className={
              active
                ? "text-primary font-semibold"
                : "hover:text-primary text-gray-700"
            }
            onClick={() => {
              try {
                document.cookie = `preferredLocale=${l}; path=/; max-age=31536000; SameSite=Lax`;
              } catch {}
            }}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
