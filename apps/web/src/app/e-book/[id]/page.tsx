// src/app/e-book/[id]/page.tsx
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getBook } from "@/app/lib/books";
import type { BookMeta } from "@/app/lib/books";
import path from "node:path";
import { promises as fs } from "node:fs";

export const dynamic = "force-dynamic";

type BookLike = Omit<BookMeta, "id"> & { id: number | string };

import SepEBookClient from "./SepEBookClient";

const nicifyTitle = (value: string) =>
  value
    .replace(/\/+/g, "/")
    .split("/")
    .pop()
    ?.replace(/\.pdf$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase()) || "E-Book";

const formatDateLabel = (value?: string) => {
  if (!value) return "By Admin";
  try {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric" }).format(new Date(value));
  } catch {
    return "By Admin";
  }
};

const fallbackFeatures = (description: string, readTime: string) => [
  { title: "What you'll get", description },
  { title: "Format", description: "Interactive flipbook plus downloadable PDF." },
  { title: "Time to read", description: readTime || "5 min read" },
  { title: "Author notes", description: "Curated by the MoneyMati research desk." },
];

const buildBookFromSource = (rawId: string, source: any): BookLike => {
  const title = source?.title ?? nicifyTitle(rawId);
  const readTime = source?.readTime ?? "5 min read";
  const description = source?.description ?? "Download this guide to learn more.";
  const cover = source?.cover ?? source?.cardImage ?? "/navatri.svg";
  const href = source?.href ?? `/ebooks/${rawId}`;
  const hasPdf = Boolean(href);
  return {
    id: source?.id ?? rawId,
    title,
    subtitle: source?.subtitle ?? "",
    description,
    category: (source?.category ?? "E-BOOK").toString().trim().toUpperCase() || "E-BOOK",
    categoryColor: source?.categoryColor ?? "#EC5B13",
    date: formatDateLabel(source?.lastUpdated),
    readTime,
    pdf: href,
    cover,
    cardImage: cover,
    ctaLabel: source?.ctaLabel ?? (hasPdf ? "Download PDF" : "Read Guide"),
    ctaIcon: source?.ctaIcon ?? (hasPdf ? ("download" as const) : ("read" as const)),
    features: Array.isArray(source?.features) && source.features.length
      ? source.features.slice(0, 4)
      : fallbackFeatures(description, readTime),
  };
};

export default async function SepEBookPage({ params }: { params: { id: string } }) {
  const { id: rawParam } = await Promise.resolve(params); // ensure compatibility with Next dynamic params
  const rawId = decodeURIComponent(rawParam);
  const numericId = parseInt(rawId, 10);
  const book = Number.isFinite(numericId) ? getBook(numericId) : null;

  let dynamicBook: BookLike | null = null;

  if (!book) {
    // Fallback: try API ebooks (for dynamic/admin-added PDFs)
    try {
      const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
      const res = await fetch(`${base}/api/admin/ebooks`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const items: any[] = data?.items ?? [];
        const match = items.find((it) => {
          const idStr = String(it.id ?? "").toLowerCase();
          const hrefStr = String(it.href ?? "").toLowerCase();
          const needle = rawId.toLowerCase();
          return idStr === needle || idStr === `${needle}.pdf` || hrefStr.includes(needle);
        });
        if (match) {
          dynamicBook = buildBookFromSource(rawId, match);
        }
      }
    } catch {
      // ignore and fall through to filesystem fallback
    }

    // Fallback 2: if a file exists in public/ebooks with this id (or id.pdf), render it via the viewer
    if (!dynamicBook) {
      const candidates = [rawId, `${rawId}.pdf`, `${rawId}.PDF`];
      const roots = [
        path.join(process.cwd(), "apps", "web", "public", "ebooks"),
        path.join(process.cwd(), "apps", "web", "public", "e-book"),
        path.join(process.cwd(), "public", "ebooks"),
        path.join(process.cwd(), "public", "e-book"),
      ];
      const possible = roots.flatMap((root) => candidates.map((c) => path.join(root, c)));
      for (const file of possible) {
        try {
          const stat = await fs.stat(file);
          if (stat.isFile()) {
            const filename = path.basename(file);
            const href = file.includes(`${path.sep}e-book${path.sep}`) ? `/e-book/${filename}` : `/ebooks/${filename}`;
            dynamicBook = buildBookFromSource(rawId, {
              id: rawId,
              title: nicifyTitle(filename),
              href,
              lastUpdated: stat.mtime.toISOString(),
              description: "Open this PDF in our reader.",
            });
            break;
          }
        } catch {
          // try next
        }
      }
    }
  }

  if (book || dynamicBook) {
    return <SepEBookClient book={(book ?? dynamicBook)!} />;
  }

  return (
    <>
      <Header />
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 48, margin: "0 0 16px" }}>BOOK</p>
          <h2 style={{ color: "#064E3B", marginBottom: 8 }}>E-Book not found</h2>
          <a href="/e-book" style={{ color: "#064E3B", fontWeight: 600 }}>← Back to E-Books</a>
        </div>
      </div>
      <Footer />
    </>
  );
}
