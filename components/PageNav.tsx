import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Page } from "@/lib/content";

export default function PageNav({
  prev,
  next,
}: {
  prev?: Page;
  next?: Page;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-14 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-1 rounded-xl border border-line bg-panel p-4 transition hover:border-sky-400/50"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <ArrowLeft className="size-3.5 transition group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="font-medium leading-snug">
            {prev.icon} {prev.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}

      {next && (
        <Link
          href={next.href}
          className="group flex flex-col gap-1 rounded-xl border border-line bg-panel p-4 text-right transition hover:border-sky-400/50 sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs text-muted">
            Next
            <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
          </span>
          <span className="font-medium leading-snug">
            {next.title} {next.icon}
          </span>
        </Link>
      )}
    </nav>
  );
}
