import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { TEMPLATES } from "@/lib/visa-data";
import { BRAND_OWNER } from "@/lib/config";

export const metadata = { title: "Templates" };

export default async function TemplatesIndexPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ??
    (user?.user_metadata?.name as string | undefined) ??
    user?.email ??
    "you";

  return (
    <div className="space-y-6 animate-fade-in-up">
      <header>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 px-2.5 py-1 text-[11px] font-medium text-brand-700 dark:text-brand-300">
          📑 Templates · {BRAND_OWNER}
        </span>
        <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Ready-to-use templates
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">
          Cover letters, accommodation letters, affidavits and reference PDFs — all hand-crafted for French student visa applications.
        </p>
      </header>

      <div className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 p-5">
        <p className="text-sm text-amber-900 dark:text-amber-200">
          <strong>Rights notice.</strong> These templates are the property of <strong>{BRAND_OWNER}</strong> and are licensed only for the personal use of <strong>{fullName}</strong>. Please avoid sharing them further with others i.e. online groups, agents etc.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {TEMPLATES.map((t) => (
          <Link
            key={t.slug}
            href={`/dashboard/templates/${t.slug}`}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-400 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 grid place-items-center rounded-xl text-white font-bold ${t.type === "pdf" ? "bg-red-500" : "bg-brand-600"}`}>
                {t.type === "pdf" ? "PDF" : "DOC"}
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-slate-900 dark:text-slate-50 group-hover:text-brand-700 dark:group-hover:text-brand-300 truncate">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  {t.type === "pdf" ? "View only" : "First Copy -> Open Google Docs"}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{t.description}</p>
            <p className="mt-3 text-xs font-medium text-brand-700 dark:text-brand-300 group-hover:underline">Open →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
