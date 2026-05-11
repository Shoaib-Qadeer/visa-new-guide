"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ChecklistGroup } from "@/lib/visa-data";

const STORAGE_KEY = "visa-checklist-v1";

function loadChecked(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export default function ChecklistOverview({ groups }: { groups: ChecklistGroup[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setChecked(loadChecked());
    setHydrated(true);
    const onStorage = () => setChecked(loadChecked());
    window.addEventListener("storage", onStorage);
    window.addEventListener("checklist-updated", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("checklist-updated", onStorage);
    };
  }, []);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {groups.map((g) => {
        const total = g.items.length;
        const done = hydrated ? g.items.filter((i) => checked[i.id]).length : 0;
        const pct = total === 0 ? 0 : Math.round((done / total) * 100);
        return (
          <Link
            key={g.id}
            href={`/dashboard/checklist#${g.id}`}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-400 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{g.icon}</span>
                <h3 className="font-display font-semibold text-slate-900 dark:text-slate-50">{g.title}</h3>
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums">{done}/{total}</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-brand-700 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
