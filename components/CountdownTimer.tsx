"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  /** ISO timestamp string for the expiry. */
  expiresAt: string;
};

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
};

function computeRemaining(target: number): Remaining {
  const totalMs = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(totalMs / 1000);

  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalMs };
}

export default function CountdownTimer({ expiresAt }: Props) {
  const targetMs = useMemo(() => new Date(expiresAt).getTime(), [expiresAt]);
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(computeRemaining(targetMs));
    const id = setInterval(() => {
      setRemaining(computeRemaining(targetMs));
    }, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const expired = remaining !== null && remaining.totalMs <= 0;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Cohort-26/27 access ends in
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {new Date(expiresAt).toLocaleString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZoneName: "short",
            })}
          </p>
        </div>
        <span
          className={
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium " +
            (expired
              ? "bg-red-100 text-red-700"
              : "bg-emerald-100 text-emerald-700")
          }
        >
          <span
            className={
              "h-1.5 w-1.5 rounded-full " +
              (expired ? "bg-red-500" : "bg-emerald-500 animate-pulse")
            }
          />
          {expired ? "Expired" : "Active"}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-3">
        <Cell label="Days" value={remaining?.days} />
        <Cell label="Hours" value={remaining?.hours} />
        <Cell label="Minutes" value={remaining?.minutes} />
        <Cell label="Seconds" value={remaining?.seconds} pulse />
      </div>
    </div>
  );
}

function Cell({
  label,
  value,
  pulse,
}: {
  label: string;
  value: number | undefined;
  pulse?: boolean;
}) {
  const display = value === undefined ? "--" : value.toString().padStart(2, "0");
  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white p-4 text-center shadow-inner">
      <div
        className={
          "font-mono text-2xl md:text-3xl font-semibold tabular-nums " +
          (pulse ? "text-brand-300" : "")
        }
      >
        {display}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-widest text-slate-400">
        {label}
      </div>
    </div>
  );
}
