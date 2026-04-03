import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import path from "node:path";
import { promises as fs } from "node:fs";

type Category = "Financials" | "Investment" | "Government" | "Tax" | "Crypto" | "Wealth" | "Career" | "Planning";

const FALLBACK_ITEMS = [
  { id: "sample-1", title: "5 Investing Mistakes You Must Avoid", category: "Investment" },
  { id: "sample-2", title: "Top Government Saving Schemes", category: "Government" },
  { id: "sample-3", title: "Highest Paying Jobs of 2024", category: "Career" as any },
  { id: "sample-4", title: "Start Early, Be Wealthy!", category: "Planning" as any },
];

const ALT_CATEGORIES: Category[] = ["Investment", "Government", "Tax", "Crypto", "Wealth", "Career", "Planning", "Financials"];

const guessCategory = (filename: string): Category | undefined => {
  const lower = filename.toLowerCase();
  if (lower.includes("tax")) return "Tax";
  if (lower.includes("crypto")) return "Crypto";
  if (lower.includes("invest")) return "Investment";
  if (lower.includes("gov") || lower.includes("government")) return "Government";
  if (lower.includes("wealth")) return "Wealth";
  if (lower.includes("career") || lower.includes("job")) return "Career";
  if (lower.includes("plan") || lower.includes("start early")) return "Planning";
  return undefined;
};

const nicifyTitle = (name: string) =>
  name
    .replace(/\.pdf$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export async function GET() {
  try {
    // Try DB first
    if ((prisma as any)?.ebook?.findMany) {
      const items = await (prisma as any).ebook.findMany({ orderBy: { createdAt: "desc" } });
      if (items.length > 0) return NextResponse.json({ items });
    }

    // Fallback: scan public folders for PDFs
    const cwd = process.cwd();
    const candidates = [
      path.join(cwd, "public", "e-book"),
      path.join(cwd, "apps", "web", "public", "e-book"),
      path.join(cwd, "public"),
      path.join(cwd, "apps", "web", "public"),
    ];

    for (const dir of candidates) {
      try {
        const stat = await fs.stat(dir);
        if (!stat.isDirectory()) continue;
        const entries = await fs.readdir(dir, { withFileTypes: true });
        const pdfs = entries.filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".pdf"));
        if (pdfs.length === 0) continue;
        const basePath = dir.includes(path.sep + "e-book") ? "/e-book" : "";
        const items = await Promise.all(
          pdfs.map(async (file, idx) => {
            const full = path.join(dir, file.name);
            const stat = await fs.stat(full);
            const title = nicifyTitle(file.name);
            const guessed = guessCategory(title);
            const category = guessed ?? ALT_CATEGORIES[idx % ALT_CATEGORIES.length];
            return {
              id: file.name,
              title,
              category,
              pages: 10,
              format: "PDF",
              lastUpdated: stat.mtime.toISOString(),
              coverBg: "#0f172a",
              coverAccent: "#22c55e",
              href: `${basePath}/${file.name}`,
            };
          }),
        );
        return NextResponse.json({ items });
      } catch {
        // try next candidate
      }
    }

    // Final fallback
    return NextResponse.json({ items: FALLBACK_ITEMS, warning: "No database or PDFs found; showing defaults." });
  } catch (error: any) {
    console.error("ebooks list error", error);
    return NextResponse.json(
      {
        error: "Unable to load e-books",
        detail: String(error?.message ?? error),
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = nicifyTitle(body.title ?? "");
    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    // If DB available, persist
    if ((prisma as any)?.ebook?.create) {
      const ebook = await (prisma as any).ebook.create({
        data: {
          title,
          description: body.description ?? "",
          category: (body.category as Category | undefined) ?? guessCategory(title) ?? ALT_CATEGORIES[0],
          pages: typeof body.pages === "number" ? body.pages : 10,
          format: body.format ?? "PDF",
          href: body.href ?? "",
          status: body.status ?? "Published",
        },
      });
      return NextResponse.json(ebook, { status: 201 });
    }

    // Otherwise, accept but inform not persisted
    const echo = {
      id: `temp-${Date.now()}`,
      title,
      description: body.description ?? "",
      category: (body.category as Category | undefined) ?? guessCategory(title) ?? ALT_CATEGORIES[0],
      pages: typeof body.pages === "number" ? body.pages : 10,
      format: body.format ?? "PDF",
      href: body.href ?? "",
      status: body.status ?? "Draft",
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json({ ...echo, warning: "Ebook not persisted; configure DATABASE_URL and run prisma migrate." }, { status: 200 });
  } catch (error: any) {
    console.error("ebooks create error", error);
    return NextResponse.json({ error: "Unable to create ebook", detail: String(error?.message ?? error) }, { status: 500 });
  }
}
