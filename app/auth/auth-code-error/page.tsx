import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">
          Sign-in failed
        </h1>
        <p className="mt-3 text-slate-600">
          We couldn&apos;t complete the sign-in. The link may have expired or
          been used already. Please try again.
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
