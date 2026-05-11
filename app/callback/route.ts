import { NextResponse } from "next/server";

/**
 * Some Supabase / Google OAuth configurations were set up with the redirect
 * URI pointing at `/callback` (no `/auth` prefix). This route forwards those
 * requests — preserving every query parameter — to the real handler at
 * `/auth/callback`, so users who already have the older redirect configured
 * still complete sign-in successfully.
 */
export function GET(request: Request) {
  const url = new URL(request.url);
  const target = new URL("/auth/callback" + url.search, url.origin);
  return NextResponse.redirect(target);
}
