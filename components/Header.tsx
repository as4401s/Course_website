import Link from "next/link";
import { MobileNav } from "./Sidebar";
import Search from "./Search";
import ThemeToggle from "./ThemeToggle";
import { getGroups, getSearchIndex } from "@/lib/content";

export default function Header() {
  const groups = getGroups();
  const docs = getSearchIndex();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-[100rem] items-center gap-3 px-4 sm:px-6">
        <MobileNav groups={groups} />

        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <span className="grid size-9 place-items-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-lg">
            🧠
          </span>
          <span className="hidden sm:block leading-tight">
            Learn Log
            <span className="block text-[11px] font-normal text-muted">
              notes on everything I learn
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <Search docs={docs} />
          <a
            href="https://github.com/as4401s/Course_website"
            target="_blank"
            rel="noreferrer"
            aria-label="View source on GitHub"
            className="hidden size-9 place-items-center rounded-lg border border-line bg-panel text-muted transition hover:text-fg hover:border-sky-400/50 sm:grid"
          >
            <GithubIcon />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

/** lucide-react v1 dropped brand icons, so the GitHub mark is inlined. */
function GithubIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-2.91-.88-2.91-2.9 0-.58.21-1.05.55-1.42-.05-.13-.24-.66.05-1.37 0 0 .59-.18 1.93.72a5.4 5.4 0 0 1 1.44-.19c.49 0 .98.06 1.44.19 1.34-.91 1.93-.72 1.93-.72.29.71.1 1.24.05 1.37.34.37.55.84.55 1.42 0 2.03-1.14 2.7-2.92 2.9.31.27.58.79.58 1.6 0 1.15-.01 2.06-.01 2.35 0 .21.15.46.55.38A7.99 7.99 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
