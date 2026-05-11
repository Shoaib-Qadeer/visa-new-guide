import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_ACCESS_EXPIRES_AT } from "@/lib/config";
import CountdownTimer from "@/components/CountdownTimer";
import JourneyProgress from "@/components/JourneyProgress";
import ChecklistOverview from "@/components/ChecklistOverview";
import ThemeToggle from "@/components/ThemeToggle";
import { JOURNEY_STEPS, FRANCE_CHECKLIST } from "@/lib/visa-data";

export const metadata = { title: "Dashboard" };

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  access_expires_at: string;
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, avatar_url, access_expires_at")
    .eq("id", user.id)
    .maybeSingle<ProfileRow>();

  const expiresAt = profile?.access_expires_at ?? DEFAULT_ACCESS_EXPIRES_AT;
  const expired = new Date(expiresAt).getTime() <= Date.now();

  const firstName = (() => {
    const name =
      profile?.full_name ??
      (user.user_metadata?.full_name as string | undefined) ??
      (user.user_metadata?.name as string | undefined) ??
      "";
    return name.split(" ")[0] || "there";
  })();

  const totalItems = FRANCE_CHECKLIST.reduce((acc, g) => acc + g.items.length, 0);
  const activeStep = JOURNEY_STEPS.find((s) => s.status === "active");
  const doneCount = JOURNEY_STEPS.filter((s) => s.status === "done").length;
  const progress = Math.round((doneCount / JOURNEY_STEPS.length) * 100);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-brand-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-6 md:p-8">
        <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-brand-200/40 dark:bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-france-blue" />
              <span>🇫🇷 France · Student Visa</span>
            </span>
            <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Bonjour, {firstName} 👋
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl">
              You've got your admission — now let's get you to France. Track every step of your visa application from documents to passport pickup.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Overall progress</p>
              <p className="font-display text-3xl font-bold text-slate-900 dark:text-slate-50">{progress}%</p>
            </div>
            <div className="relative h-16 w-16">
              <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" className="text-brand-600" strokeWidth="3" strokeDasharray={`${progress}, 100`} strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {expired ? <ExpiredBanner expiresAt={expiresAt} /> : null}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <CountdownTimer expiresAt={expiresAt} />
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Current step</p>
          <p className="mt-2 font-display text-lg font-semibold text-slate-900 dark:text-slate-50">
            {activeStep?.title ?? "All caught up!"}
          </p>
          {activeStep ? (
            <>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{activeStep.description}</p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-widest text-brand-700 dark:text-brand-300">
                Est. {activeStep.duration}
              </p>
            </>
          ) : null}
        </div>
      </div>

      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-50">Your visa journey</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Six stages, one passport stamp.</p>
          </div>
          <Link href="/dashboard/timeline" className="text-sm font-medium text-brand-700 dark:text-brand-300 hover:underline">
            View full timeline →
          </Link>
        </div>
        <JourneyProgress steps={JOURNEY_STEPS} />
      </section>

      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-50">Document checklist</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">{totalItems} items across {FRANCE_CHECKLIST.length} categories.</p>
          </div>
          <Link href="/dashboard/checklist" className="text-sm font-medium text-brand-700 dark:text-brand-300 hover:underline">
            Open full checklist →
          </Link>
        </div>
        <ChecklistOverview groups={FRANCE_CHECKLIST} />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <QuickLink href="/dashboard/templates" emoji="📑" title="Templates" desc="Cover letter, accommodation letter, affidavit." />
        <QuickLink href="/dashboard/checklist" emoji="✅" title="Tick your docs" desc="Tracker remembers your progress." />
        <QuickLink href="/dashboard/timeline" emoji="🗓️" title="Plan your timeline" desc="Working backwards from your intake date." />
      </section>
    </div>
  );
}

function QuickLink({ href, emoji, title, desc }: { href: string; emoji: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-400 hover:shadow-md transition"
    >
      <div className="text-2xl">{emoji}</div>
      <p className="mt-3 font-semibold text-slate-900 dark:text-slate-50 group-hover:text-brand-700 dark:group-hover:text-brand-300">{title}</p>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{desc}</p>
    </Link>
  );
}

function ExpiredBanner({ expiresAt }: { expiresAt: string }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-950/40 dark:border-red-900 p-5">
      <h2 className="font-semibold text-red-800 dark:text-red-300">Your access has expired</h2>
      <p className="mt-1 text-sm text-red-700 dark:text-red-400">
        Your Cohort-26/27 access ended on {new Date(expiresAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}. Contact us to extend your account.
      </p>
    </div>
  );
}
