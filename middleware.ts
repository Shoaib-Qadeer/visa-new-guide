import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (/^\/templates\/[^/]+\.pdf$/i.test(pathname)) {
    const destination = request.headers.get("sec-fetch-dest");
    const allowedPreviewDestinations = new Set(["iframe", "embed", "object", "empty"]);

    if (!destination || !allowedPreviewDestinations.has(destination)) {
      return new NextResponse("Not found", { status: 404 });
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public image extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
