import ChecklistTracker from "@/components/ChecklistTracker";
import { FRANCE_CHECKLIST } from "@/lib/visa-data";

export const metadata = { title: "Visa checklist" };

export default function ChecklistPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <header>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-france-blue/10 dark:bg-france-blue/20 px-2.5 py-1 text-[11px] font-medium text-france-blue dark:text-blue-300">
          🇫🇷 French Embassy · Document Checklist
        </span>
        <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Pack your visa file
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">
          Tick items as you collect them. The tracker remembers your progress on this device, splits by funding source, and flags items that must be submitted as originals.
        </p>
      </header>

      <ChecklistTracker groups={FRANCE_CHECKLIST} />
    </div>
  );
}
