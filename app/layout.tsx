import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ThemeScript from "@/components/ThemeScript";
import { NavRail } from "@/components/Sidebar";
import { getGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    default: "Learn Log — notes on everything I learn",
    template: "%s · Learn Log",
  },
  description:
    "My growing set of short, bullet-point notes: databases, AWS, GCP, Kubernetes, Git, diffusion models and more.",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080b14" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:border focus:border-line focus:bg-panel focus:px-4 focus:py-2"
        >
          Skip to content
        </a>

        <Header />

        <div className="mx-auto flex max-w-[100rem] px-0 sm:px-6">
          <NavRail groups={getGroups()} />
          <main id="main" className="min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-10">
            {children}
          </main>
        </div>

        <footer className="border-t border-line px-6 py-8 text-center text-xs text-muted">
          <p>
            Built with Next.js · notes in Markdown · deployed on Vercel
          </p>
          <p className="mt-1">Always a work in progress. 🌱</p>
        </footer>
      </body>
    </html>
  );
}
