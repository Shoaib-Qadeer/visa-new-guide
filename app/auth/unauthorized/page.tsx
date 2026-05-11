import Link from "next/link";

export const metadata = { title: "Access not granted" };

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 text-center">
        <div className="mx-auto mb-5 h-14 w-14 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center">
          <svg
            aria-hidden="true"
            className="h-7 w-7 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
          Access not granted
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Your Google account is not on the access list for this site.
          If you believe this is a mistake, please contact the administrator.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-white font-medium hover:bg-brand-700 transition"
        >
          Back to sign in
        </Link>
      </div>
    </main>
  );
}
