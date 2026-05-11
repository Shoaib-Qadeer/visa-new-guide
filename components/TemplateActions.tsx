"use client";

import { useState } from "react";

export default function TemplateActions({ body, title }: { body: string; title: string }) {
  const [status, setStatus] = useState<"" | "copied" | "error">("");

  function escapeHtml(value: string) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function templateToHtml() {
    const lines = body.split("\n");
    const htmlLines = lines.map((line) => {
      const text = escapeHtml(line.trimEnd());

      if (!text) {
        return "<p><br></p>";
      }

      if (text === text.toUpperCase() && /[A-Z]/.test(text) && text.length < 80) {
        return `<h2>${text}</h2>`;
      }

      if (text.startsWith("Subject:")) {
        return `<p><strong>${text}</strong></p>`;
      }

      if (/^\d+\./.test(text)) {
        return `<p style="margin-left: 24px;">${text}</p>`;
      }

      return `<p>${text}</p>`;
    });

    return `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;font-size:11pt;line-height:1.5;color:#111827;}h2{font-size:14pt;text-align:center;margin:0 0 16px;font-weight:700;}p{margin:0 0 10px;}</style></head><body>${htmlLines.join("")}</body></html>`;
  }

  async function copyRichText() {
    const html = templateToHtml();

    if ("ClipboardItem" in window) {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([body], { type: "text/plain" }),
        }),
      ]);
      return;
    }

    await navigator.clipboard.writeText(body);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(body);
      setStatus("copied");
      setTimeout(() => setStatus(""), 2200);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus(""), 2200);
    }
  }

  async function openInGoogleDocs() {
    try {
      await copyRichText();
    } catch {
      // Best-effort; we still open the doc.
    }

    window.open("https://docs.new", "_blank", "noopener");
    setStatus("copied");
    setTimeout(() => setStatus(""), 4000);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-slate-100 px-3.5 py-2 text-sm font-medium text-white dark:text-slate-900 hover:opacity-90 transition"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
        Copy template
      </button>

      <button
        onClick={openInGoogleDocs}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#1a73e8">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        </svg>
        First Copy - Open Google Docs
      </button>

      <span aria-live="polite" className="text-xs text-slate-500 dark:text-slate-400">
        {status === "copied" && "Copied - paste with Ctrl+V into your new doc."}
        {status === "error" && "Couldn't copy. Select the text manually."}
      </span>

      <span className="ml-auto text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500" title={title}>
        Comskills template
      </span>
    </div>
  );
}
