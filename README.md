# Course_website

My learning notes — grouped by area, a chapter for every topic I pick up.

- **Live:** deployed on Vercel
- **Stack:** Next.js + Tailwind, content is plain Markdown in `content/`
- **Structure:** Group → Chapter → Page. Groups live in `content/_groups.json`;
  each chapter is a folder, each page a `.md` file. Adding notes needs no code
  changes — nav, search and prev/next build themselves.
- See [CLAUDE.md](CLAUDE.md) for the full guide and writing style.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```
