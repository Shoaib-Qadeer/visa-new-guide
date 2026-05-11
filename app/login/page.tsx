import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { createClient } from "@/lib/supabase/server";
import { APP_NAME, COHORT_LABEL } from "@/lib/config";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="relative min-h-screen grid place-items-center px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-50"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white font-bold shadow-sm">
              V
            </div>
            <span className="font-display font-bold tracking-tight">{APP_NAME}</span>
          </Link>
        </div>

        <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-50 text-center">
            Welcome
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-center text-sm">
            Sign in to continue your French student visa journey.
          </p>

          <div className="mt-8">
            <Suspense
              fallback={
                <div className="h-12 rounded-xl bg-slate-100 animate-pulse" />
              }
            >
              <GoogleSignInButton />
            </Suspense>
          </div>

          <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 text-center">
            By continuing you agree to our terms. {COHORT_LABEL} access is open until{" "}
            <span className="font-medium text-slate-700 dark:text-slate-200">
              August 15, 2026
            </span>
            .
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
