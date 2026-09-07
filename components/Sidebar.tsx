"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, Menu, X, Lock } from "lucide-react";
import type { Group } from "@/lib/content";
import { accent } from "@/lib/accents";

/* ------------------------------------------------------------------ *
 *  The nav tree itself — shared by the desktop rail and mobile drawer
 * ------------------------------------------------------------------ */
function NavTree({
  groups,
  onNavigate,
}: {
  groups: Group[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 text-sm">
      <Link
        href="/"
        onClick={onNavigate}
        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 transition ${
          pathname === "/"
            ? "bg-sky-500/12 font-medium text-sky-600 dark:text-sky-300"
            : "text-muted hover:bg-sky-500/8 hover:text-fg"
        }`}
      >
        <Home className="size-4" />
        Home
      </Link>

      {groups.map((group) => (
        <section key={group.slug} className="mt-5">
          <h3 className="flex items-center gap-2 px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
            <span className="text-sm leading-none">{group.icon}</span>
            {group.title}
          </h3>

          {group.chapters.map((chapter) => {
            const a = accent(chapter.accent);
            const planned =
              chapter.status === "planned" || chapter.pages.length === 0;

            return (
              <div key={chapter.slug} className="mt-0.5">
                {planned ? (
                  <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-muted/70">
                    <span className="text-base leading-none">{chapter.icon}</span>
                    <span className="flex-1 truncate">{chapter.title}</span>
                    <Lock className="size-3" aria-label="Not written yet" />
                  </div>
                ) : (
                  <Link
                    href={chapter.href}
                    onClick={onNavigate}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition ${
                      pathname === chapter.href
                        ? `bg-sky-500/12 ${a.text}`
                        : "text-fg hover:bg-sky-500/8"
                    }`}
                  >
                    <span className="text-base leading-none">{chapter.icon}</span>
                    <span className="flex-1 truncate">{chapter.title}</span>
                    <span className="rounded-full bg-slate-500/15 px-1.5 py-0.5 text-[10px] tabular-nums text-muted">
                      {chapter.pages.length}
                    </span>
                  </Link>
                )}

                {chapter.pages.length > 0 && (
                  <ul className="ml-4 mt-1 space-y-0.5 border-l border-line pl-2">
                    {chapter.pages.map((page) => {
                      const current = pathname === page.href;
                      return (
                        <li key={page.slug}>
                          <Link
                            href={page.href}
                            onClick={onNavigate}
                            className={`group flex items-start gap-2 rounded-md px-2.5 py-1.5 transition ${
                              current
                                ? `bg-sky-500/10 font-medium ${a.text}`
                                : "text-muted hover:bg-sky-500/8 hover:text-fg"
                            }`}
                          >
                            <span
                              className={`mt-1.5 size-1.5 shrink-0 rounded-full transition ${
                                current
                                  ? a.dot
                                  : "bg-slate-500/40 group-hover:bg-slate-400"
                              }`}
                            />
                            <span className="leading-snug">{page.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </section>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------------ *
 *  Desktop rail — sticky, always visible from lg up
 * ------------------------------------------------------------------ */
export function NavRail({ groups }: { groups: Group[] }) {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-auto border-r border-line px-3 py-5 lg:block">
      <NavTree groups={groups} />
    </aside>
  );
}

/* ------------------------------------------------------------------ *
 *  Mobile drawer — trigger lives in the header
 * ------------------------------------------------------------------ */
export function MobileNav({ groups }: { groups: Group[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // close whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  // lock body scroll while open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        aria-expanded={open}
        className="grid size-9 place-items-center rounded-lg border border-line bg-panel text-muted transition hover:text-fg lg:hidden"
      >
        <Menu className="size-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-100 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute inset-y-0 left-0 flex w-[85%] max-w-xs flex-col bg-panel shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="flex items-center gap-2 font-semibold">
                <span>🧠</span> Learn Log
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="grid size-8 place-items-center rounded-lg text-muted transition hover:text-fg"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <NavTree groups={groups} onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
