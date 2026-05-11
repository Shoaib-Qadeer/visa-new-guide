import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function resolveBase(origin: string, forwardedHost: string | null): string {
  if (process.env.NODE_ENV !== "development" && forwardedHost) {
    return `https://${forwardedHost}`;
  }
  return origin;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";
  const forwardedHost = request.headers.get("x-forwarded-host");
  const base = resolveBase(origin, forwardedHost);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check whether this email is on the allowlist.
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const email = user?.email?.toLowerCase();

      if (!email) {
        await supabase.auth.signOut();
        return NextResponse.redirect(`${base}/auth/unauthorized`);
      }

      // Use the service-role key so RLS doesn't block the read.
      const adminClient = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
      );

      const { data: allowed } = await adminClient
        .from("allowed_emails")
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (!allowed) {
        // Not on the list — destroy the session and tell the user.
        await supabase.auth.signOut();
        return NextResponse.redirect(`${base}/auth/unauthorized`);
      }

      return NextResponse.redirect(`${base}${redirectTo}`);
    }
  }

  return NextResponse.redirect(`${base}/auth/auth-code-error`);
}
