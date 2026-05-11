"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChecklistGroup } from "@/lib/visa-data";

const STORAGE_KEY = "visa-checklist-v1";
const MODE_KEY = "visa-funding-mode";
type Mode = "self-funded" | "scholarship";

function load(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}

export default function ChecklistTracker({ groups }: { groups: ChecklistGroup[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mode, setMode] = useState<Mode>("self-funded");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setChecked(load());
    try {
      const saved = localStorage.getItem(MODE_KEY) as Mode | null;
      if (saved) setMode(saved);
    } catch {}
    setHydrated(true);
  }, []);

  function persist(next: Record<string, boolean>) {
    setChecked(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("checklist-updated"));
    } catch {}
  }

  function toggle(id: string) {
    persist({ ...checked, [id]: !checked[id] });
  }

  function setFunding(next: Mode) {
    setMode(next);
    try { localStorage.setItem(MODE_KEY, next); } catch {}
  }

  function resetAll() {
    if (!confirm("Reset all checklist items?")) return;
    persist({});
  }

  const visibleGroups = useMemo(() => {
    return groups.map((g) => ({
      ...g,
      items: g.items.filter((i) => !i.conditional || i.conditional === mode),
    }));
  }, [groups, mode]);

  const totals = useMemo(() => {
    const all = visibleGroups.flatMap((g) => g.items);
    const total = all.length;
    const done = all.filter((i) => checked[i.id]).length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [visibleGroups, checked]);

  return (
    <div className="space-y-8">
      <div className="sticky top-0 md:top-0 z-10 -mx-4 px-4 md:mx-0 md:px-0 py-3 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12">
              <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" className="text-brand-600" strokeWidth="3" strokeDasharray={`${totals.pct}, 100`} strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 grid place-items-center text-[10px] font-bold text-slate-700 dark:text-slate-200 tabular-nums">{totals.pct}%</span>
            </div>
            <div>
              <p className="font-display font-semibold text-slate-900 dark:text-slate-50">
                {totals.done} <span className="text-slate-400">/</span> {totals.total} packed
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Saved automatically on this device.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-1 bg-white dark:bg-slate-900">
              {(["self-funded", "scholarship"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setFunding(m)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                    mode === m
                      ? "bg-brand-600 text-white shadow"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  {m === "self-funded" ? "Self-funded" : "Scholarship"}
                </button>
              ))}
            </div>
            <button
              onClick={resetAll}
              className="text-xs font-medium px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {visibleGroups.map((g) => {
        const groupDone = g.items.filter((i) => checked[i.id]).length;
        return (
          <section key={g.id} id={g.id} className="scroll-mt-24">
            <header className="flex items-end justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{g.icon}</span>
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-50">{g.title}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">{groupDone}/{g.items.length} complete</p>
                </div>
              </div>
            </header>

            <ul className="space-y-2">
              {g.items.map((item) => {
                const isOn = !!checked[item.id];
                return (
                  <li
                    key={item.id}
                    className={`group flex gap-3 rounded-xl border p-4 transition cursor-pointer select-none ${
                      isOn
                        ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-300"
                    }`}
                    onClick={() => toggle(item.id)}
                  >
                    <div
                      role="checkbox"
                      aria-checked={isOn}
                      className={`mt-0.5 h-5 w-5 shrink-0 rounded-md border-2 grid place-items-center transition ${
                        isOn
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                      }`}
                    >
                      {hydrated && isOn ? (
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${isOn ? "text-slate-500 line-through dark:text-slate-500" : "text-slate-900 dark:text-slate-100"}`}>
                        {item.label}
                        {item.qty ? (
                          <span className="ml-2 inline-flex items-center rounded-full bg-brand-100 dark:bg-brand-900/40 px-2 py-0.5 text-[10px] font-semibold text-brand-700 dark:text-brand-300">
                            ×{item.qty}
                          </span>
                        ) : null}
                        {item.original ? (
                          <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 text-[10px] font-semibold text-amber-800 dark:text-amber-300">
                            ORIGINAL
                          </span>
                        ) : null}
                      </p>
                      {item.detail ? (
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.detail}</p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <div className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 p-5 text-sm text-amber-900 dark:text-amber-200">
        <p className="font-semibold">⚠️ Important</p>
        <p className="mt-1">
          Every item is a <strong>photocopy</strong> unless marked <strong>ORIGINAL</strong>. The embassy does not return submitted documents — never submit an original unless required.
        </p>
      </div>
    </div>
  );
}
