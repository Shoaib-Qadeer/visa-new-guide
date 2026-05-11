"use client";

import { useEffect, useRef } from "react";

/**
 * Embeds a PDF in read-only mode:
 * - `#toolbar=0&navpanes=0&view=FitH` hides Chrome/Edge's download & print toolbar.
 * - Right-click context menu is suppressed.
 *
 * This is best-effort: someone determined can still pull the file from the
 * network tab. It is enough friction to make casual download impossible.
 */
export default function PdfViewer({ src, title }: { src: string; title: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const stop = (e: Event) => e.preventDefault();
    el.addEventListener("contextmenu", stop);
    return () => el.removeEventListener("contextmenu", stop);
  }, []);

  const url = `${src}#toolbar=0&navpanes=0&statusbar=0&view=FitH`;

  return (
    <div ref={wrapRef} className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900">
      <iframe
        src={url}
        title={title}
        className="pdf-frame"
      />
      {/* Diagonal watermark overlay (pointer-events: none so scrolling still works through it via the iframe). */}
      <div className="absolute inset-0 pointer-events-none grid place-items-center">
        <span className="font-display font-extrabold text-white/[0.04] text-[18vw] -rotate-[24deg] select-none">
          COMSKILLS
        </span>
      </div>
      <p className="absolute bottom-2 right-3 text-[10px] uppercase tracking-widest text-white/40">
        View only · No download
      </p>
    </div>
  );
}
