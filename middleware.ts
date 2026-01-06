import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "zh", "fr"];
const defaultLocale = "en";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static files, API, and internal requests
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // Skip files like images, favicon
  ) {
    return;
  }

  // 2. Check if path already has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 3. Determine Locale based on IP (Content Proxy Logic)
  let locale = defaultLocale;

  // Strategy A: Check Hosting Provider Headers (Vercel / Cloudflare) - Fast & Reliable
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry");

  if (country) {
    if (["CN", "HK", "TW", "MO", "SG"].includes(country.toUpperCase())) {
      locale = "zh";
    } else if (["FR", "MC", "BE", "CH"].includes(country.toUpperCase())) {
      locale = "fr";
    }
  } else {
    // Strategy B: External IP Service (As requested "Based on IP")
    // Note: Adds latency. Wrapped in timeout.
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 800); // 800ms timeout

      const res = await fetch("https://ipapi.co/json/", {
        signal: controller.signal,
        next: { revalidate: 3600 },
        headers: {
          "User-Agent": "Nextjs-Middleware-IP-Check",
        },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const detectedCountry = data.country_code;

        if (["CN", "HK", "TW", "MO", "SG"].includes(detectedCountry)) {
          locale = "zh";
        } else if (["FR"].includes(detectedCountry)) {
          locale = "fr";
        }
      }
    } catch (error) {
      // Strategy C: Fallback to Accept-Language if IP check fails/times out
      const acceptLanguage = request.headers.get("accept-language");
      if (acceptLanguage) {
        if (acceptLanguage.toLowerCase().includes("zh")) locale = "zh";
        else if (acceptLanguage.toLowerCase().includes("fr")) locale = "fr";
      }
    }
  }

  // 4. Redirect to localized URL
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Match all paths except _next, api, and files with extensions
    "/((?!_next|favicon.ico|api|.*\\..*).*)",
  ],
};
