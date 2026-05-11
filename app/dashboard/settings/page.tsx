import { createClient } from "@/lib/supabase/server";
import { BRAND_OWNER, DEFAULT_ACCESS_EXPIRES_AT } from "@/lib/config";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ??
    (user?.user_metadata?.name as string | undefined) ??
    "—";

  return (
    <div className="space-y-6 animate-fade-in-up">
      <header>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Settings</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Your account details and access information.</p>
      </header>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
        <Row label="Full name" value={fullName} />
        <Row label="Email" value={user?.email ?? "—"} />
        <Row label="Cohort-26/27 access until" value={new Date(DEFAULT_ACCESS_EXPIRES_AT).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })} />
        <Row label="Account managed by" value={BRAND_OWNER} />
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 last:border-0 pb-3 last:pb-0">
      <p className="text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{value}</p>
    </div>
  );
}
