import Link from "next/link";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import type { Chapter } from "@/lib/content";
import { accent } from "@/lib/accents";

export default function ChapterCard({ chapter }: { chapter: Chapter }) {
  const a = accent(chapter.accent);
  const planned = chapter.status === "planned" || chapter.pages.length === 0;

  const body = (
    <>
      {/* accent wash */}
      <span
        className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${a.gradient} opacity-70`}
      />

      <span className="relative flex items-start gap-3">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-xl border text-xl ${a.tile}`}
        >
          {chapter.icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-semibold leading-snug">
            {chapter.title}
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
            {planned ? (
              <>
                <Sparkles className="size-3" />
                Coming soon
              </>
            ) : (
              <>
                <FileText className="size-3" />
                {chapter.pages.length} {chapter.pages.length === 1 ? "page" : "pages"}
              </>
            )}
          </span>
        </span>
      </span>

      {chapter.description && (
        <span className="relative mt-3.5 block text-sm leading-relaxed text-muted">
          {chapter.description}
        </span>
      )}

      {!planned && (
        <span className={`relative mt-4 flex items-center gap-1.5 text-sm font-medium ${a.text}`}>
          Start reading
          <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
        </span>
      )}

      {planned && chapter.roadmap && chapter.roadmap.length > 0 && (
        <span className="relative mt-4 flex flex-wrap gap-1.5">
          {chapter.roadmap.slice(0, 3).map((item) => (
            <span
              key={item}
              className={`rounded-full border px-2 py-0.5 text-[11px] ${a.chip}`}
            >
              {item}
            </span>
          ))}
        </span>
      )}
    </>
  );

  const shell =
    "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-panel p-5 shadow-sm transition duration-200";

  if (planned) {
    return (
      <div className={`${shell} opacity-65`} aria-disabled="true">
        {body}
      </div>
    );
  }

  return (
    <Link
      href={chapter.href}
      className={`${shell} hover:-translate-y-1 hover:shadow-lg ${a.ring}`}
    >
      {body}
    </Link>
  );
}
