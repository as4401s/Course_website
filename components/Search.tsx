"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, CornerDownLeft } from "lucide-react";
import type { SearchDoc } from "@/lib/content";

/** Subsequence match — "insdb" still finds "Inside a Database". */
function fuzzy(needle: string, haystack: string) {
  const n = needle.toLowerCase();
  const h = haystack.toLowerCase();
  if (h.includes(n)) return 2;
  let i = 0;
  for (const ch of h) {
    if (ch === n[i]) i++;
    if (i === n.length) return 1;
  }
  return 0;
}

export default function Search({ docs }: { docs: SearchDoc[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return docs.slice(0, 8);
    return docs
      .map((d) => ({
        doc: d,
        score:
          fuzzy(query, d.title) * 4 +
          fuzzy(query, d.chapter) * 2 +
          fuzzy(query, d.group) * 2 +
          fuzzy(query, d.description),
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((r) => r.doc);
  }, [query, docs]);

  // Cmd/Ctrl+K to open, Esc to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // focus after the dialog paints
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-line bg-panel px-2.5 py-2 text-sm text-muted transition hover:border-sky-400/50 hover:text-fg sm:w-56 sm:px-3"
      >
        <SearchIcon className="size-4 shrink-0" />
        <span className="hidden sm:inline">Search notes…</span>
        <kbd className="ml-auto hidden rounded border border-line px-1.5 py-0.5 text-[10px] font-medium sm:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-100 flex items-start justify-center bg-slate-950/60 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Search notes"
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <SearchIcon className="size-4 shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, results.length - 1));
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  }
                  if (e.key === "Enter" && results[active]) {
                    e.preventDefault();
                    go(results[active].href);
                  }
                }}
                placeholder="Search chapters and pages…"
                className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted"
              />
            </div>

            <ul className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-muted">
                  No matches for “{query}”
                </li>
              )}
              {results.map((d, i) => (
                <li key={d.href}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(d.href)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                      i === active ? "bg-sky-500/12" : "hover:bg-sky-500/8"
                    }`}
                  >
                    <span className="text-lg leading-none">{d.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {d.title}
                      </span>
                      <span className="block truncate text-xs text-muted">
                        {d.kind === "chapter"
                          ? `Chapter · ${d.group}`
                          : `${d.chapterIcon} ${d.chapter} · ${d.group}`}
                        {d.description ? ` · ${d.description}` : ""}
                      </span>
                    </span>
                    {i === active && (
                      <CornerDownLeft className="size-3.5 shrink-0 text-muted" />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2 text-[11px] text-muted">
              <span>
                <kbd className="rounded border border-line px-1">↑</kbd>{" "}
                <kbd className="rounded border border-line px-1">↓</kbd> navigate
              </span>
              <span>
                <kbd className="rounded border border-line px-1">↵</kbd> open
              </span>
              <span>
                <kbd className="rounded border border-line px-1">esc</kbd> close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
