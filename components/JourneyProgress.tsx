import type { JourneyStep } from "@/lib/visa-data";

export default function JourneyProgress({ steps }: { steps: JourneyStep[] }) {
  return (
    <ol className="grid gap-3 md:grid-cols-3">
      {steps.map((s) => {
        const stateStyles =
          s.status === "done"
            ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30"
            : s.status === "active"
            ? "border-brand-400 dark:border-brand-600 bg-white dark:bg-slate-900 ring-2 ring-brand-200 dark:ring-brand-900"
            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900";
        const badgeStyles =
          s.status === "done"
            ? "bg-emerald-500 text-white"
            : s.status === "active"
            ? "bg-brand-600 text-white"
            : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
        const tag =
          s.status === "done"
            ? "Completed"
            : s.status === "active"
            ? "In progress"
            : "Upcoming";
        const tagColor =
          s.status === "done"
            ? "text-emerald-700 dark:text-emerald-400"
            : s.status === "active"
            ? "text-brand-700 dark:text-brand-300"
            : "text-slate-500 dark:text-slate-400";
        return (
          <li key={s.id} className={`relative rounded-2xl border p-5 transition ${stateStyles}`}>
            <div className="flex items-center justify-between">
              <div className={`h-8 w-8 rounded-full grid place-items-center text-sm font-bold ${badgeStyles}`}>
                {s.status === "done" ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                ) : (
                  s.number
                )}
              </div>
              <span className={`text-[10px] font-semibold uppercase tracking-widest ${tagColor}`}>{tag}</span>
            </div>
            <h3 className="mt-3 font-display font-semibold text-slate-900 dark:text-slate-50">{s.title}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.description}</p>
            <p className="mt-3 text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-500">⏱ {s.duration}</p>
          </li>
        );
      })}
    </ol>
  );
}
