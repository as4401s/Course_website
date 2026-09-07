import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getChapter, getChapters } from "@/lib/content";
import { accent } from "@/lib/accents";

type Props = { params: Promise<{ chapter: string }> };

export function generateStaticParams() {
  return getChapters().map((c) => ({ chapter: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter: slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) return {};
  return {
    title: chapter.title,
    description: chapter.description,
  };
}

export default async function ChapterPage({ params }: Props) {
  const { chapter: slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const a = accent(chapter.accent);

  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs trail={[{ label: chapter.title }]} />

      {/* chapter header */}
      <header className="relative overflow-hidden rounded-2xl border border-line bg-panel p-6">
        <span
          className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${a.gradient}`}
        />
        <div className="relative flex items-start gap-4">
          <span
            className={`grid size-14 shrink-0 place-items-center rounded-2xl border text-2xl ${a.tile}`}
          >
            {chapter.icon}
          </span>
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight">{chapter.title}</h1>
            {chapter.description && (
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {chapter.description}
              </p>
            )}
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted">
              <BookOpen className="size-3.5" />
              {chapter.pages.length}{" "}
              {chapter.pages.length === 1 ? "page" : "pages"} in this chapter
            </p>
          </div>
        </div>
      </header>

      {/* pages */}
      {chapter.pages.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-line p-8 text-center text-sm text-muted">
          Nothing written here yet. 🌱
        </p>
      ) : (
        <ol className="mt-6 space-y-3">
          {chapter.pages.map((page) => (
            <li key={page.slug}>
              <Link
                href={page.href}
                className={`group flex items-center gap-4 rounded-xl border border-line bg-panel p-4 transition hover:-translate-y-0.5 hover:shadow-md ${a.ring}`}
              >
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-lg border text-xs font-semibold tabular-nums ${a.tile}`}
                >
                  {String(page.index).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium leading-snug">
                    {page.icon} {page.title}
                  </span>
                  {page.description && (
                    <span className="mt-0.5 block text-sm leading-relaxed text-muted">
                      {page.description}
                    </span>
                  )}
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-fg" />
              </Link>
            </li>
          ))}
        </ol>
      )}

      {/* roadmap for planned chapters */}
      {chapter.roadmap && chapter.roadmap.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
            Planned pages
          </h2>
          <ul className="flex flex-wrap gap-2">
            {chapter.roadmap.map((item) => (
              <li
                key={item}
                className={`rounded-full border px-3 py-1 text-xs ${a.chip}`}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
