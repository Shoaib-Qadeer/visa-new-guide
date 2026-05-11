import JourneyProgress from "@/components/JourneyProgress";
import { JOURNEY_STEPS } from "@/lib/visa-data";

export const metadata = { title: "Timeline" };

export default function TimelinePage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <header>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 px-2.5 py-1 text-[11px] font-medium text-brand-700 dark:text-brand-300">
          🗓️ Visa journey timeline
        </span>
        <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          From admission to passport pickup
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">
          Work backwards from your intake date. Most students complete the entire pipeline in 6–10 weeks.
        </p>
      </header>

      <JourneyProgress steps={JOURNEY_STEPS} />

      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Personalised dates and reminders are coming soon — for now, this timeline tracks the canonical France student visa flow.
      </div>
    </div>
  );
}
