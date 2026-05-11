import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTemplate, TEMPLATES } from "@/lib/visa-data";
import { BRAND_OWNER } from "@/lib/config";
import TemplateActions from "@/components/TemplateActions";
import PdfViewer from "@/components/PdfViewer";

type Params = { slug: string };

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const t = getTemplate(slug);
  return { title: t?.title ?? "Template" };
}

export default async function TemplateDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const tpl = getTemplate(slug);
  if (!tpl) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ??
    (user?.user_metadata?.name as string | undefined) ??
    user?.email ??
    "you";

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Link href="/dashboard/templates" className="text-sm font-medium text-brand-700 dark:text-brand-300 hover:underline">
        ← All templates
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
            tpl.type === "pdf"
              ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300"
              : "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
          }`}>
            {tpl.type === "pdf" ? "PDF · View only" : "DOCX template"}
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {tpl.title}
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400 max-w-2xl">{tpl.description}</p>
        </div>
      </header>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 text-xs text-slate-600 dark:text-slate-400">
        <strong className="text-slate-800 dark:text-slate-200">Rights notice:</strong>{" "}
        This template is owned by <strong>{BRAND_OWNER}</strong> and licensed only for the personal use of <strong>{fullName}</strong>. Please avoid sharing further.
      </div>

      {tpl.type === "pdf" && tpl.pdfFile ? (
        <PdfViewer src={`/templates/${tpl.pdfFile}`} title={tpl.title} />
      ) : tpl.body ? (
        <>
          <TemplateActions body={tpl.body} title={tpl.title} />
          <article className="watermark-wrap rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="watermark-content relative z-0 p-8 md:p-12">
              <pre className="whitespace-pre-wrap break-words font-sans text-[15px] leading-relaxed text-slate-800 dark:text-slate-200">
{tpl.body}
              </pre>
            </div>
          </article>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The faint <strong>Comskills</strong> watermark only appears in this preview. When you click <em>Copy template</em> or <em>Open in Google Docs</em>, the text is delivered clean — no watermark, no formatting artifacts.
          </p>
        </>
      ) : null}
    </div>
  );
}
