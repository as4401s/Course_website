import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Components } from "react-markdown";
import Zoomable from "./Zoomable";
import CodeBlock from "./CodeBlock";

/** Turn `> 💡 ...` / `> ⚠️ ...` / `> ✅ ...` / `> 📌 ...` into styled callouts. */
function calloutClass(node: unknown): string {
  const text = JSON.stringify(node ?? "");
  if (text.includes("⚠️") || text.includes("⚠")) return "callout-warn";
  if (text.includes("✅")) return "callout-ok";
  if (text.includes("📌")) return "callout-note";
  return "";
}

const components: Components = {
  // Images become click-to-zoom figures.
  img({ src, alt }) {
    if (typeof src !== "string") return null;
    return <Zoomable src={src} alt={alt ?? "Diagram"} />;
  },

  // Never nest a <figure> inside a <p>.
  p({ children, node }) {
    const only = node?.children;
    if (only?.length === 1 && only[0].type === "element" && only[0].tagName === "img") {
      return <>{children}</>;
    }
    return <p>{children}</p>;
  },

  // Tables need their own horizontal scroll container.
  table({ children }) {
    return (
      <div className="table-wrap">
        <table>{children}</table>
      </div>
    );
  },

  blockquote({ children, node }) {
    return <blockquote className={calloutClass(node)}>{children}</blockquote>;
  },

  pre({ children }) {
    return <CodeBlock>{children}</CodeBlock>;
  },

  a({ href, children }) {
    const external = typeof href === "string" && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {children}
      </a>
    );
  },
};

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-note">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
