import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { APP_NAME } from "@/lib/config";
import SignOutButton from "@/components/SignOutButton";
import ThemeToggle from "@/components/ThemeToggle";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: "home" },
  { href: "/dashboard/checklist", label: "Checklist", icon: "check" },
  { href: "/dashboard/timeline", label: "Timeline", icon: "calendar" },
  { href: "/dashboard/documents", label: "Documents", icon: "file" },
  { href: "/dashboard/templates", label: "Templates", icon: "template" },
  { href: "/dashboard/settings", label: "Settings", icon: "settings" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const fullName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    user.email ??
    "Student";
  const avatarUrl =
    (user.user_metadata?.avatar_url as string | undefined) ??
    (user.user_metadata?.picture as string | undefined) ??
    null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex">
        <aside className="hidden md:flex md:w-64 flex-col fixed inset-y-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="px-6 py-5 flex items-center justify-between gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white font-bold shadow-sm">
                V
              </div>
              <span className="font-display font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                {APP_NAME}
              </span>
            </Link>
            <ThemeToggle />
          </div>

          <nav className="px-3 py-2 flex-1 overflow-y-auto">
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Visa journey
            </p>
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-700 dark:hover:text-brand-300 transition"
                  >
                    <NavIcon name={item.icon} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              {avatarUrl ? (
                <Image src={avatarUrl} alt={fullName} width={36} height={36} className="rounded-full" />
              ) : (
                <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 grid place-items-center text-slate-600 dark:text-slate-200 font-medium">
                  {fullName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{fullName}</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
              </div>
            </div>
            <div className="mt-3">
              <SignOutButton />
            </div>
          </div>
        </aside>

        <div className="flex-1 md:pl-64">
          <header className="md:hidden sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white font-bold text-sm">V</div>
              <span className="font-display font-bold text-slate-900 dark:text-slate-50">{APP_NAME}</span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <SignOutButton />
            </div>
          </header>

          <main className="px-4 md:px-10 py-6 md:py-10 max-w-6xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function NavIcon({ name }: { name: string }) {
  const c = "h-4 w-4 text-slate-500 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition";
  switch (name) {
    case "home":
      return (<svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12 12 3l9 9"/><path d="M5 10v10h14V10"/></svg>);
    case "check":
      return (<svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4"/><rect x="3" y="4" width="18" height="16" rx="2"/></svg>);
    case "calendar":
      return (<svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>);
    case "file":
      return (<svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>);
    case "template":
      return (<svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>);
    case "settings":
      return (<svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>);
    default:
      return null;
  }
}
