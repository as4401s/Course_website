import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Markdown from "@/components/Markdown";
import TOC from "@/components/TOC";
import PageNav from "@/components/PageNav";
import {
  extractHeadings,
  getChapter,
  getChapters,
  getGroupOfChapter,
  getPage,
  getSiblings,
} from "@/lib/content";
import { accent } from "@/lib/accents";

type Props = { params: Promise<{ chapter: string; page: string }> };

export function generateStaticParams() {
  return getChapters().flatMap((c) =>
    c.pages.map((p) => ({ chapter: c.slug, page: p.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter, page: pageSlug } = await params;
  const page = getPage(chapter, pageSlug);
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function NotePage({ params }: Props) {
  const { chapter: chapterSlug, page: pageSlug } = await params;
  const chapter = getChapter(chapterSlug);
  const page = getPage(chapterSlug, pageSlug);
  if (!chapter || !page) notFound();

  const group = getGroupOfChapter(chapterSlug);
  const { prev, next } = getSiblings(chapterSlug, pageSlug);
  const headings = extractHeadings(page.content);
  const a = accent(chapter.accent);

  return (
    <div className="mx-auto flex max-w-[86rem] gap-10">
      <article className="min-w-0 flex-1">
        <Breadcrumbs
          trail={[
            ...(group
              ? [
                  {
                    label: group.title,
                    href: `/#group-${group.slug}`,
                    icon: group.icon,
                  },
                ]
              : []),
            { label: chapter.title, href: chapter.href, icon: chapter.icon },
            { label: page.title },
          ]}
        />

        <header className="mb-8 max-w-3xl border-b border-line pb-6">
          <p className="flex items-center gap-2 text-xs font-medium text-muted">
            <span className={`rounded-full border px-2 py-0.5 ${a.chip}`}>
              {chapter.icon} {chapter.title}
            </span>
            <span className="tabular-nums">
              Page {page.index} of {chapter.pages.length}
            </span>
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {page.icon} {page.title}
          </h1>

          {page.description && (
            <p className="mt-2.5 text-base leading-relaxed text-muted">
              {page.description}
            </p>
          )}
        </header>

        <Markdown>{page.content}</Markdown>

        <PageNav prev={prev} next={next} />

        <Link
          href={chapter.href}
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-fg"
        >
          <ArrowLeft className="size-3.5" />
          Back to {chapter.icon} {chapter.title}
        </Link>
      </article>

      <TOC headings={headings} />
    </div>
  );
}
