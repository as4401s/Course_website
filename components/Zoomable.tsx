"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X, ExternalLink, ZoomIn, ZoomOut } from "lucide-react";

/**
 * Diagrams are dense, so they render as wide as the column allows and open in a
 * full-screen lightbox on click. Inside the lightbox they start scaled to fit
 * and can be switched to 100% (actual pixels) with scrolling.
 */
export default function Zoomable({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const [open, setOpen] = useState(false);
  const [actualSize, setActualSize] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay = (
    <div
      className="fixed inset-0 z-100 flex flex-col bg-slate-950/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      {/* toolbar */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="truncate text-sm text-slate-300">{alt}</span>
        <span className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => setActualSize((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1.5 text-xs text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            {actualSize ? (
              <>
                <ZoomOut className="size-3.5" />
                Fit to screen
              </>
            ) : (
              <>
                <ZoomIn className="size-3.5" />
                Actual size
              </>
            )}
          </button>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1.5 text-xs text-slate-300 transition hover:bg-white/10 hover:text-white sm:flex"
          >
            <ExternalLink className="size-3.5" />
            New tab
          </a>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="grid size-8 place-items-center rounded-lg border border-white/15 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </span>
      </div>

      {/* stage */}
      <div
        className={`flex-1 overflow-auto p-2 sm:p-4 ${
          actualSize ? "" : "grid place-items-center"
        }`}
        onClick={(e) => {
          // clicking the backdrop (but not the image) closes
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          onClick={() => setActualSize((v) => !v)}
          className={
            actualSize
              ? "max-w-none cursor-zoom-out rounded-lg shadow-2xl"
              : "max-h-full max-w-full cursor-zoom-in rounded-lg object-contain shadow-2xl"
          }
        />
      </div>

      <p className="shrink-0 border-t border-white/10 px-4 py-2 text-center text-[11px] text-slate-400">
        Click the image to toggle zoom ·{" "}
        <kbd className="rounded border border-white/20 px-1">esc</kbd> to close
      </p>
    </div>
  );

  return (
    <>
      <figure className="group relative my-8">
        <button
          onClick={() => {
            setActualSize(false);
            setOpen(true);
          }}
          className="block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-panel transition hover:border-sky-400/50"
          aria-label={`Enlarge diagram: ${alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} decoding="async" className="w-full" />
        </button>

        <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-lg border border-line bg-panel/90 px-2.5 py-1.5 text-xs font-medium text-muted opacity-0 backdrop-blur transition group-hover:opacity-100">
          <Maximize2 className="size-3.5" />
          Click to enlarge
        </span>

        <figcaption className="mt-3 text-center text-xs leading-relaxed text-muted">
          {caption || alt}
          <span className="hidden sm:inline"> · click to open full size</span>
        </figcaption>
      </figure>

      {/* Portalled to <body>: the overlay must not inherit the prose column's
          reading-measure max-width, or it renders clipped instead of fullscreen. */}
      {open && mounted && createPortal(overlay, document.body)}
    </>
  );
}
