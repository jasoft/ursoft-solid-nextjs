/**
 * Cloudflare Worker for legacy route localization
 *
 * Handles:
 * - Language detection from cookie, Accept-Language header, or default 'en'
 * - 302 redirects for legacy routes to localized versions
 * - Excludes static assets, API routes, and system files
 */

// Supported locales
const LOCALES = ["en", "zh", "fr", "es", "ja", "pt", "de", "ru", "it", "ko", "nl"];

// Page route whitelist (all routes from app directory)
const PAGE_ROUTES = [
  "/",
  "/features",
  "/download",
  "/order",
  "/support",
  "/privacy",
  "/refund-policy",
  "/delivery-policy",
  "/docs",
  "/blog",
  "/blog/blog-details",
  "/auth/signin",
  "/auth/signup",
  "/uninstaller/installed",
  "/uninstaller/update",
];

// Static asset extensions to exclude
const STATIC_EXTENSIONS = [
  "png",
  "jpg",
  "jpeg",
  "gif",
  "svg",
  "webp",
  "ico",
  "css",
  "js",
  "map",
  "json",
  "txt",
  "xml",
  "pdf",
  "zip",
  "exe",
  "msi",
  "webp",
];

// Paths to exclude from redirection
const EXCLUDED_PATHS = [
  "/api",
  "/_next",
  "/images",
  "/dlds",
  "/favicon",
  "/robots.txt",
  "/sitemap.xml",
];

/**
 * Parse Accept-Language header and return best matching locale
 */
function parseAcceptLanguage(header) {
  if (!header) return "en";

  const languages = header
    .split(",")
    .map((lang) => {
      const [code, q] = lang.trim().split(";q=");
      return {
        code: code.split("-")[0].toLowerCase(),
        q: q ? parseFloat(q) : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const lang of languages) {
    if (LOCALES.includes(lang.code)) {
      return lang.code;
    }
  }

  return "en";
}

/**
 * Check if URL has a file extension
 */
function hasFileExtension(pathname) {
  const ext = pathname.split(".").pop()?.toLowerCase();
  return STATIC_EXTENSIONS.includes(ext);
}

/**
 * Check if path is an excluded path
 */
function isExcludedPath(pathname) {
  // Check excluded prefixes
  for (const excluded of EXCLUDED_PATHS) {
    if (pathname.startsWith(excluded)) {
      return true;
    }
  }

  // Check for file extension
  if (hasFileExtension(pathname)) {
    return true;
  }

  return false;
}

/**
 * Check if path matches a page route or its subpaths
 */
function isPageRoute(pathname) {
  // Exact match
  if (PAGE_ROUTES.includes(pathname)) {
    return true;
  }

  // Check for subpaths
  for (const route of PAGE_ROUTES) {
    if (pathname.startsWith(route + "/")) {
      return true;
    }
  }

  return false;
}

/**
 * Check if URL already has a locale prefix
 */
function hasLocalePrefix(pathname) {
  const firstSegment = pathname.split("/")[1];
  return LOCALES.includes(firstSegment);
}

/**
 * Helper to proxy request to origin
 * Explicitly rewrites host for staging and production environments to avoid 522/404 errors
 */
async function proxyToOrigin(request) {
  const url = new URL(request.url);
  const hostname = url.hostname;
  
  // Staging environment
  if (hostname === "staging.ursoftware.com") {
    url.hostname = "staging.ursoft-solid-nextjs.pages.dev";
    return fetch(url.toString(), request);
  }

  // Production environment
  if (hostname === "www.ursoftware.com" || hostname === "ursoftware.com") {
    url.hostname = "ursoft-solid-nextjs.pages.dev";
    return fetch(url.toString(), request);
  }

  // Default behavior for other hosts (e.g., workers.dev or localhost)
  return fetch(request);
}

/**
 * Main request handler
 */
const worker = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const hostname = url.hostname;

    // Step 0: Canonical Domain Redirect (root -> www)
    if (hostname === "ursoftware.com") {
      const wwwUrl = `https://www.ursoftware.com${pathname}${url.search}`;
      return Response.redirect(wwwUrl, 301);
    }

    // Step 1: Check if already has locale prefix -> pass through
    if (hasLocalePrefix(pathname)) {
      return proxyToOrigin(request);
    }

    // Step 2: Check if excluded path (static assets, API, system files) -> pass through
    if (isExcludedPath(pathname)) {
      return proxyToOrigin(request);
    }

    // Step 3: Check if it's a page route (legacy paths) -> redirect
    if (isPageRoute(pathname)) {
      // Determine target locale
      const cookieHeader = request.headers.get("Cookie");
      const localeMatch = cookieHeader?.match(/preferredLocale=([^;]+)/);
      const cookieLocale = localeMatch ? localeMatch[1] : null;
      const acceptLanguage = request.headers.get("Accept-Language");
      const defaultLocale = "en";

      let targetLocale = cookieLocale;

      if (!targetLocale || !LOCALES.includes(targetLocale)) {
        targetLocale = parseAcceptLanguage(acceptLanguage);
      }

      // If still not valid, use default
      if (!LOCALES.includes(targetLocale)) {
        targetLocale = defaultLocale;
      }

      // Build new URL with locale prefix
      const newUrl = `${url.protocol}//${url.host}/${targetLocale}${pathname}${url.search}`;

      // 302 redirect
      return Response.redirect(newUrl, 302);
    }

    // Step 4: Pass through everything else
    return proxyToOrigin(request);
  },
};

export default worker;
