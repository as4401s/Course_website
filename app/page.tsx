import Link from "next/link";
import { ArrowRight, BookOpen, FolderTree, Layers, Sparkles } from "lucide-react";
import ChapterCard from "@/components/ChapterCard";
import { getAllPagesInOrder, getGroups, totalPages } from "@/lib/content";
import { accent } from "@/lib/accents";

export default function HomePage() {
  const groups = getGroups();
  const allPages = getAllPagesInOrder();
  const firstPage = allPages[0];
  const chapterCount = groups.reduce((n, g) => n + g.activeChapters.length, 0);

  return (
    <div className="mx-auto max-w-5xl">
      {/* ---------------------------------------------------------- hero */}
      <section className="pb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-600 dark:text-sky-300">
          <Sparkles className="size-3" />
          Always growing
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Everything I&apos;m learning,{" "}
          <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
            in short notes
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          No walls of text. Every topic broken into bullet points with real
          examples, so it&apos;s quick to read and quick to come back to.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {firstPage && (
            <Link
              href={firstPage.page.href}
              className="group inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-400"
            >
              <BookOpen className="size-4" />
              Start with {firstPage.chapter.title}
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
          )}
          <span className="inline-flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-line bg-panel px-4 py-2.5 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <FolderTree className="size-4" />
              <strong className="font-semibold text-fg">{groups.length}</strong>{" "}
              {groups.length === 1 ? "group" : "groups"}
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="size-4" />
              <strong className="font-semibold text-fg">{chapterCount}</strong>{" "}
              {chapterCount === 1 ? "chapter" : "chapters"}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="size-4" />
              <strong className="font-semibold text-fg">{totalPages()}</strong>{" "}
              {totalPages() === 1 ? "page" : "pages"}
            </span>
          </span>
        </div>
      </section>

      {/* ---------------------------------------------------- groups */}
      {groups.map((group) => {
        const a = accent(group.accent);
        return (
          <section key={group.slug} id={`group-${group.slug}`} className="mt-12 scroll-mt-24">
            <div className="mb-4 flex items-start gap-3">
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-xl border text-xl ${a.tile}`}
              >
                {group.icon}
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold leading-tight">
                  {group.title}
                </h2>
                <p className="mt-0.5 text-sm text-muted">
                  {group.description}
                  {group.pageCount > 0 && (
                    <>
                      {" · "}
                      <span className="whitespace-nowrap">
                        {group.pageCount}{" "}
                        {group.pageCount === 1 ? "page" : "pages"}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {group.chapters.map((chapter) => (
                <ChapterCard key={chapter.slug} chapter={chapter} />
              ))}
            </div>
          </section>
        );
      })}

      {/* -------------------------------------------------- all pages */}
      {allPages.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            🕒 All pages
          </h2>
          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-panel">
            {allPages.map(({ page, chapter, group }) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="group flex items-center gap-3 px-4 py-3.5 transition hover:bg-sky-500/6"
                >
                  <span className="text-lg leading-none">{page.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {page.title}
                    </span>
                    <span className="block truncate text-xs text-muted">
                      {group.icon} {group.title} · {chapter.icon}{" "}
                      {chapter.title}
                      {page.description ? ` · ${page.description}` : ""}
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-fg" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
