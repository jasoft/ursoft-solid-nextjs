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
        const href = withLocalePrefix(pathname ? pathname.replace(/^\/(en|zh|fr)/, "") : "/", l);
        const active = l === current;
        return (
          <Link
            key={l}
            href={href}
            className={active ? "text-primary font-semibold" : "text-gray-700 hover:text-primary"}
            onClick={() => {
              try { localStorage.setItem("preferredLocale", l); } catch {}
            }}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

