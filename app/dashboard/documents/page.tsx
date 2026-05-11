import Link from "next/link";
import { FRANCE_CHECKLIST, TEMPLATES } from "@/lib/visa-data";

export const metadata = { title: "Documents" };

export default function DocumentsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <header>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 px-2.5 py-1 text-[11px] font-medium text-brand-700 dark:text-brand-300">
          📂 Visa documents
        </span>
        <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Every document, one place
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">
          Browse the documents you need to assemble. Visit{" "}
          <Link href="/dashboard/templates" className="font-medium text-brand-700 dark:text-brand-300 hover:underline">Templates</Link>{" "}
          for ready-to-use letter formats, or{" "}
          <Link href="/dashboard/checklist" className="font-medium text-brand-700 dark:text-brand-300 hover:underline">Checklist</Link>{" "}
          to tick items off as you go.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="font-display font-bold text-slate-900 dark:text-slate-50">📑 Templates available</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Letters, affidavits and reference PDFs you can copy or view in-app.</p>
          <ul className="mt-4 space-y-2">
            {TEMPLATES.map((t) => (
              <li key={t.slug}>
                <Link href={`/dashboard/templates/${t.slug}`} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{t.title}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${t.type === "pdf" ? "text-red-600" : "text-brand-600 dark:text-brand-300"}`}>{t.type}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="font-display font-bold text-slate-900 dark:text-slate-50">✅ What you still need</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">High-level groups from the embassy checklist.</p>
          <ul className="mt-4 space-y-2">
            {FRANCE_CHECKLIST.map((g) => (
              <li key={g.id}>
                <Link href={`/dashboard/checklist#${g.id}`} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                    <span>{g.icon}</span>{g.title}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">{g.items.length} items</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
