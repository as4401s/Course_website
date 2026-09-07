"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

type Heading = { depth: 2 | 3; text: string; id: string };

export default function TOC({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-60 shrink-0 overflow-y-auto xl:block">
      <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
        <List className="size-3.5" />
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-line text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block border-l-2 py-1.5 leading-snug transition ${
                h.depth === 3 ? "pl-6 text-[13px]" : "pl-3.5"
              } ${
                activeId === h.id
                  ? "-ml-px border-sky-400 font-medium text-sky-600 dark:text-sky-300"
                  : "-ml-px border-transparent text-muted hover:text-fg"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
