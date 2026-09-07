"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Code block with a copy button. */
export default function CodeBlock({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — nothing useful to do */
    }
  }

  return (
    <div className="code-wrap group relative">
      <pre ref={ref}>{children}</pre>
      <button
        onClick={copy}
        aria-label="Copy code"
        className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-lg border border-white/15 bg-slate-800/80 text-slate-300 opacity-0 backdrop-blur transition hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
      >
        {copied ? (
          <Check className="size-3.5 text-emerald-400" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    </div>
  );
}
