import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ChapterMeta = {
  title: string;
  icon: string;
  description: string;
  order: number;
  accent: string;
  status: "active" | "planned";
  /** Optional list of planned page titles, shown on "planned" chapters. */
  roadmap?: string[];
};

export type Page = {
  slug: string;
  chapterSlug: string;
  title: string;
  description: string;
  icon: string;
  /** 1-based position inside the chapter. */
  index: number;
  href: string;
  content: string;
};

export type Chapter = ChapterMeta & {
  slug: string;
  href: string;
  pages: Page[];
};

const DEFAULT_META: ChapterMeta = {
  title: "Untitled",
  icon: "📘",
  description: "",
  order: 999,
  accent: "sky",
  status: "active",
};

/** `02-inside-a-database.md` -> { index: 2, slug: "inside-a-database" } */
function parseFileName(file: string) {
  const base = file.replace(/\.mdx?$/, "");
  const match = base.match(/^(\d+)[-_.](.*)$/);
  return match
    ? { order: Number(match[1]), slug: match[2] }
    : { order: 999, slug: base };
}

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function readChapter(slug: string): Chapter | null {
  const dir = path.join(CONTENT_DIR, slug);
  if (!fs.statSync(dir).isDirectory()) return null;

  let meta: ChapterMeta = { ...DEFAULT_META, title: titleCase(slug) };
  const metaPath = path.join(dir, "_meta.json");
  if (fs.existsSync(metaPath)) {
    try {
      meta = { ...meta, ...JSON.parse(fs.readFileSync(metaPath, "utf8")) };
    } catch {
      // A malformed _meta.json should not break the whole site.
      console.warn(`[content] could not parse ${slug}/_meta.json`);
    }
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"));

  const pages: Page[] = files
    .map((file) => {
      const { order, slug: pageSlug } = parseFileName(file);
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        order,
        page: {
          slug: pageSlug,
          chapterSlug: slug,
          title: (data.title as string) ?? titleCase(pageSlug),
          description: (data.description as string) ?? "",
          icon: (data.icon as string) ?? "📄",
          index: 0,
          href: `/${slug}/${pageSlug}`,
          content,
        } satisfies Page,
      };
    })
    .sort((a, b) => a.order - b.order || a.page.title.localeCompare(b.page.title))
    .map(({ page }, i) => ({ ...page, index: i + 1 }));

  return { ...meta, slug, href: `/${slug}`, pages };
}

/** All chapters, ordered. Cached per process so repeated calls are cheap. */
let cache: Chapter[] | null = null;

export function getChapters(): Chapter[] {
  if (cache) return cache;
  if (!fs.existsSync(CONTENT_DIR)) return (cache = []);

  const chapters = fs
    .readdirSync(CONTENT_DIR)
    .filter((entry) => !entry.startsWith("_") && !entry.startsWith("."))
    .map((entry) => readChapter(entry))
    .filter((c): c is Chapter => c !== null)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  return (cache = chapters);
}

export function getChapter(slug: string): Chapter | undefined {
  return getChapters().find((c) => c.slug === slug);
}

export function getPage(chapterSlug: string, pageSlug: string): Page | undefined {
  return getChapter(chapterSlug)?.pages.find((p) => p.slug === pageSlug);
}

/** Previous / next page *within* a chapter. */
export function getSiblings(chapterSlug: string, pageSlug: string) {
  const pages = getChapter(chapterSlug)?.pages ?? [];
  const i = pages.findIndex((p) => p.slug === pageSlug);
  return {
    prev: i > 0 ? pages[i - 1] : undefined,
    next: i >= 0 && i < pages.length - 1 ? pages[i + 1] : undefined,
  };
}

export type SearchDoc = {
  title: string;
  href: string;
  chapter: string;
  chapterIcon: string;
  icon: string;
  description: string;
  kind: "chapter" | "page";
};

/** Flat index handed to the client-side Cmd+K search. */
export function getSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const chapter of getChapters()) {
    docs.push({
      title: chapter.title,
      href: chapter.href,
      chapter: chapter.title,
      chapterIcon: chapter.icon,
      icon: chapter.icon,
      description: chapter.description,
      kind: "chapter",
    });
    for (const page of chapter.pages) {
      docs.push({
        title: page.title,
        href: page.href,
        chapter: chapter.title,
        chapterIcon: chapter.icon,
        icon: page.icon,
        description: page.description,
        kind: "page",
      });
    }
  }
  return docs;
}

export function totalPages(): number {
  return getChapters().reduce((n, c) => n + c.pages.length, 0);
}

/** `## Heading` / `### Heading` lines -> table of contents entries.
 *  Uses the same slugger as rehype-slug so the ids always match the rendered HTML. */
export function extractHeadings(markdown: string) {
  const slugger = new GithubSlugger();
  const headings: { depth: 2 | 3; text: string; id: string }[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m = line.match(/^(#{2,3})\s+(.*)$/);
    if (!m) continue;

    const text = m[2].replace(/[*`_]/g, "").trim();
    headings.push({
      depth: m[1].length as 2 | 3,
      text,
      id: slugger.slug(text),
    });
  }

  return headings;
}
