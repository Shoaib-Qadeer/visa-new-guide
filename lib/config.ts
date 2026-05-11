/**
 * Global access expiry. Read from `NEXT_PUBLIC_ACCESS_EXPIRES_AT` so it can be
 * extended without code changes. Each user's `profiles.access_expires_at`
 * still wins if set in the DB.
 */
export const DEFAULT_ACCESS_EXPIRES_AT =
  process.env.NEXT_PUBLIC_ACCESS_EXPIRES_AT ?? "2026-08-15T23:59:59Z";

export const APP_NAME = "Comskills - Visa Guide";
export const APP_SHORT_NAME = "Visa Guide";
export const BRAND_OWNER = "Comskills";
export const COHORT_LABEL = "Cohort-26/27";

/**
 * Resolves the canonical site URL for OAuth redirects.
 */
export function getSiteUrl(): string {
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelUrl
      ? vercelUrl.startsWith("http")
        ? vercelUrl
        : `https://${vercelUrl}`
      : process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : undefined);

  if (!url) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be set in production.");
  }

  return url.replace(/\/$/, "");
}
