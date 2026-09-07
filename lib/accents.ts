export type AccentKey =
  | "sky"
  | "violet"
  | "emerald"
  | "amber"
  | "rose"
  | "orange"
  | "cyan"
  | "indigo"
  | "lime"
  | "fuchsia";

type Accent = {
  /** Card ring + hover glow */
  ring: string;
  /** Icon tile background */
  tile: string;
  /** Text colour for the accent */
  text: string;
  /** Soft background chip */
  chip: string;
  /** Gradient used on chapter headers */
  gradient: string;
  /** Raw dot colour for the sidebar */
  dot: string;
};

export const ACCENTS: Record<AccentKey, Accent> = {
  sky: {
    ring: "hover:border-sky-400/60 hover:shadow-sky-500/20",
    tile: "bg-sky-500/15 border-sky-400/30",
    text: "text-sky-600 dark:text-sky-300",
    chip: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25",
    gradient: "from-sky-500/25 via-sky-400/5 to-transparent",
    dot: "bg-sky-400",
  },
  violet: {
    ring: "hover:border-violet-400/60 hover:shadow-violet-500/20",
    tile: "bg-violet-500/15 border-violet-400/30",
    text: "text-violet-600 dark:text-violet-300",
    chip: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/25",
    gradient: "from-violet-500/25 via-violet-400/5 to-transparent",
    dot: "bg-violet-400",
  },
  emerald: {
    ring: "hover:border-emerald-400/60 hover:shadow-emerald-500/20",
    tile: "bg-emerald-500/15 border-emerald-400/30",
    text: "text-emerald-600 dark:text-emerald-300",
    chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
    gradient: "from-emerald-500/25 via-emerald-400/5 to-transparent",
    dot: "bg-emerald-400",
  },
  amber: {
    ring: "hover:border-amber-400/60 hover:shadow-amber-500/20",
    tile: "bg-amber-500/15 border-amber-400/30",
    text: "text-amber-600 dark:text-amber-300",
    chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25",
    gradient: "from-amber-500/25 via-amber-400/5 to-transparent",
    dot: "bg-amber-400",
  },
  rose: {
    ring: "hover:border-rose-400/60 hover:shadow-rose-500/20",
    tile: "bg-rose-500/15 border-rose-400/30",
    text: "text-rose-600 dark:text-rose-300",
    chip: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25",
    gradient: "from-rose-500/25 via-rose-400/5 to-transparent",
    dot: "bg-rose-400",
  },
  orange: {
    ring: "hover:border-orange-400/60 hover:shadow-orange-500/20",
    tile: "bg-orange-500/15 border-orange-400/30",
    text: "text-orange-600 dark:text-orange-300",
    chip: "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/25",
    gradient: "from-orange-500/25 via-orange-400/5 to-transparent",
    dot: "bg-orange-400",
  },
  cyan: {
    ring: "hover:border-cyan-400/60 hover:shadow-cyan-500/20",
    tile: "bg-cyan-500/15 border-cyan-400/30",
    text: "text-cyan-600 dark:text-cyan-300",
    chip: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/25",
    gradient: "from-cyan-500/25 via-cyan-400/5 to-transparent",
    dot: "bg-cyan-400",
  },
  indigo: {
    ring: "hover:border-indigo-400/60 hover:shadow-indigo-500/20",
    tile: "bg-indigo-500/15 border-indigo-400/30",
    text: "text-indigo-600 dark:text-indigo-300",
    chip: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/25",
    gradient: "from-indigo-500/25 via-indigo-400/5 to-transparent",
    dot: "bg-indigo-400",
  },
  lime: {
    ring: "hover:border-lime-400/60 hover:shadow-lime-500/20",
    tile: "bg-lime-500/15 border-lime-400/30",
    text: "text-lime-600 dark:text-lime-300",
    chip: "bg-lime-500/10 text-lime-700 dark:text-lime-300 border-lime-500/25",
    gradient: "from-lime-500/25 via-lime-400/5 to-transparent",
    dot: "bg-lime-400",
  },
  fuchsia: {
    ring: "hover:border-fuchsia-400/60 hover:shadow-fuchsia-500/20",
    tile: "bg-fuchsia-500/15 border-fuchsia-400/30",
    text: "text-fuchsia-600 dark:text-fuchsia-300",
    chip: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-500/25",
    gradient: "from-fuchsia-500/25 via-fuchsia-400/5 to-transparent",
    dot: "bg-fuchsia-400",
  },
};

export function accent(key?: string): Accent {
  return ACCENTS[(key ?? "sky") as AccentKey] ?? ACCENTS.sky;
}
