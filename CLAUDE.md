# CLAUDE.md — Learning Notes Website

Personal learning site ("Learn Log"). Arjun adds a new chapter / page every time he
learns something new. Deployed on **Vercel**. Repo: `git@github.com:as4401s/Course_website.git`

---

## 1. Golden rule: content is just Markdown

**To add anything to this site you never touch React code.** You only create
folders and `.md` files under `content/`. The site discovers them automatically
(filesystem scan at build time) and builds the homepage cards, the sidebar, the
chapter pages, search, and prev/next links from them.

```
content/
  databases/                     <- one folder = one CHAPTER (slug = folder name)
    _meta.json                   <- chapter title, icon, colour, order, blurb
    01-what-is-a-database.md     <- one file  = one PAGE  (slug = name minus NN- prefix)
    02-inside-a-database.md
  aws/
    _meta.json
    01-....md
assets/
  databases/inside-db.png        <- ORIGINAL upload (source of truth, not served)
public/
  images/databases/inside-db.webp<- OPTIMISED, served; referenced as /images/<chapter>/<file>
```

### `_meta.json` (one per chapter folder)

```json
{
  "title": "Databases",
  "icon": "🗄️",
  "description": "One-line blurb shown on the homepage card.",
  "order": 1,
  "accent": "sky",
  "status": "active"
}
```

| field | meaning |
|---|---|
| `title` | Display name in nav / cards |
| `icon` | Emoji shown everywhere for this chapter |
| `description` | One sentence, used on homepage card + chapter header |
| `order` | Sort order on homepage & sidebar (lower first) |
| `accent` | Colour key: `sky` `violet` `emerald` `amber` `rose` `orange` `cyan` `indigo` `lime` `fuchsia` |
| `status` | `active` (has content) or `planned` (renders a "Coming soon" card) |

### Page frontmatter (top of every `.md`)

```markdown
---
title: What is a Database?
description: Plain-English intro, the main types, and what people actually use.
icon: 🧠
---
```

### Page file naming

`NN-kebab-case-title.md` — the `NN-` numeric prefix **only controls order** and is
stripped from the URL. So `02-inside-a-database.md` → `/databases/inside-a-database`.

---

## 2. Writing style — MANDATORY for every page of every chapter

This is the house style. Repeat it for **all** chapters (AWS, GCP, Kubernetes,
Git/GitLab, Diffusion Models, and anything added later).

- **Short bullet points only. Never long paragraphs.** One idea per bullet.
- Aim for **max ~2 lines per bullet**.
- Every concept gets a **concrete example** — prefix it with `e.g.` or use the
  `> 💡 **Example:**` callout.
- Plain English first, jargon second: define the term, then name it.
- Use **bold** for the term being defined.
- Prefer **tables** for comparisons (X vs Y), **bullets** for everything else.
- Use analogies for hard ideas (e.g. "an index is like a book's index").
- Small runnable/realistic code or command snippets in fenced blocks with a language tag.
- Emoji as section markers in headings is encouraged (`## 🧩 Components`).
- Structure of a typical page:
  1. `## 🎯 In one line` — the whole topic in a single sentence
  2. body sections (`##` / `###`) in bullets
  3. `## 🧾 Cheat sheet` — a summary table
  4. `## ⚠️ Common gotchas` (optional)
  5. `## 🔑 Key takeaways` — 3–6 bullets

### Supported Markdown extras
- GFM: tables, task lists, strikethrough, autolinks.
- Blockquote callouts: start a blockquote with `💡`, `⚠️`, `✅`, `📌` — it is
  auto-styled as an info / warning / success / note box.
- Images: `![Alt text](/images/<chapter>/<file>.png)` — click to open full size.
- Headings `##` and `###` automatically feed the "On this page" table of contents.

---

## 3. Images — always convert to WebP

Diagrams are the most valuable content on this site, so they are kept at **full
resolution** (never downscaled) but converted to **WebP** so pages stay fast.

**Workflow for every new image:**

1. Drop the original in `assets/<chapter>/` — keep a sensible name (`inside-db.png`).
2. Copy it to `public/images/<chapter>/` with the same name.
3. Convert + compress:
   ```bash
   ./scripts/optimize-images.sh <chapter>     # converts to .webp, deletes the source copy
   ```
   The script keeps full pixel dimensions and only compresses (quality 86).
   Override with `QUALITY=92 ./scripts/optimize-images.sh <chapter>`.
4. Reference the `.webp` in Markdown:
   ```markdown
   ![Short description of what the diagram shows](/images/<chapter>/<name>.webp)
   ```

Requires `cwebp` → `brew install webp`.

> Real numbers: the "Inside DB" diagram went **6.0 MB PNG → 251 KB WebP** at the
> same 2752×1536 resolution.

### How images render
- Any image in a Markdown page is auto-wrapped by `components/Zoomable.tsx`.
- It spans the **full width of the content column** (wider than the text measure).
- Clicking opens a **full-screen lightbox** with a **Fit to screen ⇄ Actual size**
  toggle, so dense diagrams can be read at 100% pixels.
- The **alt text becomes the caption** — write it as a real sentence describing
  the diagram, not just a label.
- Put big diagrams **at the top of the page**, right after the frontmatter, then
  explain each part below it.

---

## 4. Site structure / features (already built, don't rebuild)

- `/` — homepage: hero + grid of chapter cards (icon, blurb, page count).
- `/<chapter>` — chapter index: header + list of its pages, numbered.
- `/<chapter>/<page>` — the page: breadcrumbs, on-this-page TOC, prev/next, back links.
- **Sidebar** — every chapter and page, always visible on desktop, drawer on mobile.
- **Search** — `Cmd/Ctrl + K` fuzzy search over all chapter/page titles + descriptions.
- **Theme** — dark by default, light toggle in the header, remembered in localStorage.
- Fully responsive; keyboard accessible; back/forward safe (plain links, no SPA traps).

### Code map
| path | role |
|---|---|
| `lib/content.ts` | Reads `content/`, parses frontmatter, builds chapter/page tree. **Single source of truth.** |
| `lib/accents.ts` | The `accent` colour keys → Tailwind classes. |
| `app/page.tsx` | Homepage. |
| `app/[chapter]/page.tsx` | Chapter index. |
| `app/[chapter]/[page]/page.tsx` | Markdown page renderer. |
| `components/` | `Sidebar`, `Search`, `ThemeToggle`, `Markdown`, `TOC`, `PageNav`, `ChapterCard`. |

---

## 5. Recipes

**Add a page to an existing chapter**
1. Create `content/<chapter>/NN-title.md` with the frontmatter above.
2. Write it in the house style (§2).
3. Done — nav, search and prev/next update themselves.

**Add a new chapter**
1. `mkdir content/<slug>` (lowercase-kebab, becomes the URL).
2. Add `_meta.json` (§1) with the next free `order` and an unused `accent`.
3. Add `01-....md` as the first page.
4. Flip `"status"` from `planned` to `active` once it has a page.
5. Images: original → `assets/<slug>/`, then convert into `public/images/<slug>/` (§3).

**Chapters already stubbed as `planned`:** aws, gcp, kubernetes, git-gitlab,
diffusion-models. Each has an `_meta.json` with a `roadmap`. To start one, just
add its first `.md` and set `"status": "active"`.

**Commands**
```bash
npm run dev     # local dev at http://localhost:3000
npm run build   # production build — run before pushing
npm run lint
```

**Ship it**
```bash
git add -A && git commit -m "content: <what you learned>" && git push
```
Vercel auto-deploys `main`.

---

## 6. Conventions & constraints
- Content files are **never** generated or rewritten by tooling — they are hand-written.
- Do not add a build step or CMS. Markdown-on-disk is deliberate.
- Keep dependencies minimal; no UI framework beyond Tailwind.
- No client-side data fetching — everything is static (SSG) so Vercel serves it fast.
- Chapter slugs and page slugs must stay stable once published (they are URLs).
- If a chapter is not written yet, keep `"status": "planned"` — never write filler content.

---

## 7. Layout gotchas (learned the hard way — don't undo these)

- **The prose max-width is applied per element, not with `:not(figure)`.**
  In `app/globals.css`, `.prose-note > p, ul, ol, h2, h3, h4, blockquote, hr,
  pre, .table-wrap, .code-wrap` get `max-width: 48rem`. Figures deliberately
  don't, so diagrams can use the full column.
  A blanket `.prose-note > :not(figure)` rule **clips fixed-position overlays**
  to 768px — that's why the lightbox is also rendered through `createPortal`
  into `<body>`.
- **Tables and code blocks scroll horizontally** inside `.table-wrap` /
  `<pre>`. They are allowed to be wider than the viewport; the *page* must never
  scroll sideways.
- **Inline `code` uses `overflow-wrap: anywhere`** — a long snippet like
  `SELECT * FROM users WHERE id = 7` used to push the mobile layout wide.
- **`lucide-react` v1 has no brand icons.** The GitHub mark in
  `components/Header.tsx` is an inline SVG. Check an icon exists before importing:
  ```bash
  node --input-type=module -e "import * as L from 'lucide-react'; console.log('Rocket' in L)"
  ```
- **Heading anchors** come from `rehype-slug`; the TOC generates the same ids via
  `github-slugger` in `lib/content.ts`. Use that library for both — never
  hand-roll the slug rule, or TOC links silently break.
- Leading emoji in a heading produce ids like `#-cheat-sheet`. That's expected
  and fine.

---

## 8. Checks before pushing

```bash
npm run build     # must pass — catches bad frontmatter, TS and import errors
```

Optional visual check (headless Chrome is installed on this machine):

```bash
npm run start -- -p 3113
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --window-size=1600,1400 \
  --screenshot=/tmp/check.png http://localhost:3113/
```

To test real mobile layout, use CDP with `Emulation.setDeviceMetricsOverride`
(`mobile: true`) — a plain `--window-size=390,...` screenshot does **not**
emulate a phone and will show false clipping.
