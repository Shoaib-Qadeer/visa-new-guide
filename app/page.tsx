import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { APP_NAME, COHORT_LABEL } from "@/lib/config";
import ThemeToggle from "@/components/ThemeToggle";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex flex-col bg-grid-fade">
      <header className="px-6 md:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white font-bold shadow-sm">
            V
          </div>
          <span className="font-display font-bold tracking-tight text-slate-900 dark:text-slate-50">{APP_NAME}</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
          >
            Sign in
          </Link>
        </div>
      </header>

      <section className="flex-1 grid place-items-center px-6 py-16">
        <div className="max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            🇫🇷 Built for the French student visa · {COHORT_LABEL}
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Your student visa,
            <br />
            <span className="bg-gradient-to-r from-brand-600 to-france-blue bg-clip-text text-transparent">step by step.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A guided checklist, timeline, and document tracker for students who&apos;ve just received their French university admission. Sign in with Google to start.
          </p>

          <div className="mt-10 flex items-center justify-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-700 px-6 py-3 text-white font-medium transition shadow-sm"
            >
              Get started — it&apos;s free
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-10 py-6 text-sm text-slate-500 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60">
        © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </footer>
    </main>
  );
}
