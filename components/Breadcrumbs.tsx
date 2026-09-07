import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({
  trail,
}: {
  trail: { label: string; href?: string; icon?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-muted"
    >
      <Link href="/" className="flex items-center gap-1.5 transition hover:text-fg">
        <Home className="size-3.5" />
        Home
      </Link>
      {trail.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight className="size-3.5 opacity-50" />
          {item.href ? (
            <Link href={item.href} className="transition hover:text-fg">
              {item.icon ? `${item.icon} ` : ""}
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-fg">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
