import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { hasDatabaseUrl } from "@/app/lib/db-url";
import path from "node:path";
import { promises as fs } from "node:fs";

// In-memory featured cache for environments without DB persistence
let featuredMemory: string | null = null;
// In-memory item cache when no DB is configured (persists while server lives)
const memoryItems: any[] = [];
// In-memory tombstones of deleted IDs to prevent re-surfacing from scans
const deletedIds = new Set<string>();

// Lightweight file-based cache for non-DB environments
const dataPaths = [
  path.join(process.cwd(), "apps", "web", ".data", "ebooks.json"),
  path.join(process.cwd(), ".data", "ebooks.json"),
];

async function loadStore(): Promise<any[]> {
  for (const p of dataPaths) {
    try {
      const raw = await fs.readFile(p, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // continue
    }
  }
  return [];
}

async function saveStore(items: any[]) {
  for (const p of dataPaths) {
    try {
      await fs.mkdir(path.dirname(p), { recursive: true });
      await fs.writeFile(p, JSON.stringify(items, null, 2), "utf8");
      return;
    } catch {
      // try next path
    }
  }
}

const skipDb = process.env.SKIP_PRISMA === "true";

// ── Deleted IDs persistence (prevents resurrecting removed items) ─────────────
const deletedPaths = [
  path.join(process.cwd(), "apps", "web", ".data", "ebooks-deleted.json"),
  path.join(process.cwd(), ".data", "ebooks-deleted.json"),
];

async function loadDeleted(): Promise<Set<string>> {
  for (const p of deletedPaths) {
    try {
      const raw = await fs.readFile(p, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return new Set(parsed.map(String));
    } catch {
      // continue
    }
  }
  return new Set();
}

async function saveDeleted(ids: Set<string>) {
  const arr = Array.from(ids);
  for (const p of deletedPaths) {
    try {
      await fs.mkdir(path.dirname(p), { recursive: true });
      await fs.writeFile(p, JSON.stringify(arr, null, 2), "utf8");
      return;
    } catch {
      // try next path
    }
  }
}

// Ensure deletedIds is hydrated on first import
loadDeleted().then((loaded) => {
  loaded.forEach((id) => deletedIds.add(id));
});

type Category = "Financials" | "Investment" | "Government" | "Tax" | "Crypto" | "Wealth" | "Career" | "Planning";

const FALLBACK_ITEMS = [
  { id: "sample-1", title: "5 Investing Mistakes You Must Avoid", category: "Investment", featured: false },
  { id: "sample-2", title: "Top Government Saving Schemes", category: "Government", featured: false },
  { id: "sample-3", title: "Highest Paying Jobs of 2024", category: "Career" as any, featured: false },
  { id: "sample-4", title: "Start Early, Be Wealthy!", category: "Planning" as any, featured: false },
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
    const hasDb = hasDatabaseUrl() && !skipDb;

    // Try DB first
    if (hasDb && (prisma as any)?.ebook?.findMany) {
      try {
        let items = await (prisma as any).ebook.findMany({ orderBy: { createdAt: "desc" } });
        // If schema doesn't have createdAt, retry without orderBy
        if (!Array.isArray(items)) items = [];
        if (items.length === 0) {
          items = await (prisma as any).ebook.findMany();
        }
        if (items.length > 0) {
          const mapped = items.map((it: any) => ({
            ...it,
            featured: featuredMemory ? String(it.id) === featuredMemory : Boolean(it.featured),
          }));
          return NextResponse.json({ items: mapped });
        }
      } catch (err: any) {
        // Prisma schema mismatch (missing fields / invalid orderBy / omit errors) — fall back gracefully
        console.warn("ebooks findMany failed; falling back to file scan:", err?.message ?? err);
      }
    }

    // Fallback: load from file store (non-DB persistence)
    const stored = await loadStore();
    if (stored.length) {
      return NextResponse.json({
        items: stored.map((it) => ({
          ...it,
          featured: featuredMemory ? String(it.id) === featuredMemory : Boolean(it.featured),
        })),
        warning: "Served from local file cache (.data/ebooks.json).",
      });
    }

    // Fallback: scan public folders for PDFs
    const cwd = process.cwd();
    const candidates = [
      path.join(cwd, "public", "e-book"),
      path.join(cwd, "apps", "web", "public", "e-book"),
      path.join(cwd, "public", "ebooks"),
      path.join(cwd, "apps", "web", "public", "ebooks"),
      path.join(cwd, "public"),
      path.join(cwd, "apps", "web", "public"),
    ];

    let scanned: any[] = [];
    for (const dir of candidates) {
      try {
        const stat = await fs.stat(dir);
        if (!stat.isDirectory()) continue;
        const entries = await fs.readdir(dir, { withFileTypes: true });
        const pdfs = entries.filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".pdf"));
        if (pdfs.length === 0) continue;
        const basePath = dir.includes(`${path.sep}e-book`) ? "/e-book"
                        : dir.includes(`${path.sep}ebooks`) ? "/ebooks"
                        : "";
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
              featured: featuredMemory ? file.name === featuredMemory : false,
            };
          }),
        );
        scanned = items;
        break;
      } catch {
        // try next candidate
      }
    }

    // Merge memory items (if any) with scanned results
    const memory = memoryItems.map((it) => ({
      ...it,
      featured: featuredMemory ? String(it.id) === featuredMemory : Boolean(it.featured),
    }));
    if (memory.length || scanned.length) {
      const seen = new Set<string>();
      const merged = [...memory, ...scanned].filter((it) => {
        const key = String(it.id ?? it.href ?? it.title ?? "");
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      const filtered = merged.filter((it) => {
        const id = String(it.id ?? "");
        const href = String(it.href ?? "");
        return !deletedIds.has(id) && (href ? !deletedIds.has(href) : true);
      });
      // If nothing is featured, leave as-is (UI can choose how to highlight)
      const noneFeatured = !filtered.some((it) => it.featured);
      const normalized = noneFeatured ? filtered.map((it) => ({ ...it, featured: false })) : filtered;
      return NextResponse.json({ items: normalized, warning: scanned.length ? undefined : "Serving from in-memory cache; not persisted." });
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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
    const idStr = String(id);

    // DB delete if available
    if (!skipDb && (prisma as any)?.ebook?.delete) {
      try {
        await (prisma as any).ebook.delete({ where: { id } });
        deletedIds.add(idStr);
        try { await saveDeleted(deletedIds); } catch {}
        return NextResponse.json({ ok: true, deleted: "prisma" });
      } catch (err: any) {
        const msg = String(err?.message ?? err ?? "");
        const notFound =
          msg.toLowerCase().includes("record") && msg.toLowerCase().includes("not found");
        // Treat missing rows as successful no-op to avoid noisy deploy logs
        if (notFound) {
          deletedIds.add(idStr);
          try { await saveDeleted(deletedIds); } catch {}
          return NextResponse.json({ ok: true, deleted: "prisma-miss" });
        }
        // fall through to file delete or noop for other errors
        console.warn("prisma delete failed", msg);
      }
    }

    // If file exists in /public/e-book, delete it
    const cwd = process.cwd();
    const candidates = [
      // direct id
      path.join(cwd, "public", "e-book", id),
      path.join(cwd, "apps", "web", "public", "e-book", id),
      path.join(cwd, "public", "ebooks", id),
      path.join(cwd, "apps", "web", "public", "ebooks", id),
      path.join(cwd, "public", id),
      path.join(cwd, "apps", "web", "public", id),
      // common pdf naming patterns (ebook{id}.pdf, {id}.pdf)
      path.join(cwd, "public", "ebooks", `${id}.pdf`),
      path.join(cwd, "apps", "web", "public", "ebooks", `${id}.pdf`),
      path.join(cwd, "public", "ebooks", `ebook${id}.pdf`),
      path.join(cwd, "apps", "web", "public", "ebooks", `ebook${id}.pdf`),
      path.join(cwd, "public", "e-book", `${id}.pdf`),
      path.join(cwd, "apps", "web", "public", "e-book", `${id}.pdf`),
      path.join(cwd, "public", "e-book", `ebook${id}.pdf`),
      path.join(cwd, "apps", "web", "public", "e-book", `ebook${id}.pdf`),
    ];
    for (const file of candidates) {
      try {
        const stat = await fs.stat(file);
        if (stat.isFile()) {
          await fs.unlink(file);
          deletedIds.add(idStr);
          try { await saveDeleted(deletedIds); } catch {}
          return NextResponse.json({ ok: true, deleted: "file" });
        }
      } catch {
        // try next candidate
      }
    }

    // File-store delete (non-DB persistence)
    try {
      const store = await loadStore();
      const filtered = store.filter((it) => String(it.id) !== String(id));
      if (filtered.length !== store.length) {
        await saveStore(filtered);
        memoryItems.length = 0;
        memoryItems.push(...filtered);
        // If we just removed the featured one, clear featuredMemory
        if (featuredMemory && String(featuredMemory) === String(id)) featuredMemory = null;
        deletedIds.add(idStr);
        try { await saveDeleted(deletedIds); } catch {}
        return NextResponse.json({ ok: true, deleted: "file-store" });
      }
    } catch {}

    // Memory-only delete (when .data store is absent)
    const beforeMem = memoryItems.length;
    const memFiltered = memoryItems.filter((it) => String(it.id) !== String(id));
    if (memFiltered.length !== beforeMem) {
      memoryItems.length = 0;
      memoryItems.push(...memFiltered);
      if (featuredMemory && String(featuredMemory) === String(id)) featuredMemory = null;
      // Persist updated memory list to file so subsequent GETs stay in sync
      try { await saveStore(memFiltered); } catch {}
      deletedIds.add(idStr);
      try { await saveDeleted(deletedIds); } catch {}
      return NextResponse.json({ ok: true, deleted: "memory" });
    }

    // No-op success to keep UI consistent
    return NextResponse.json({ ok: true, deleted: "none" });
  } catch (error: any) {
    console.error("ebooks delete error", error);
    return NextResponse.json({ error: "Unable to delete ebook", detail: String(error?.message ?? error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = nicifyTitle(body.title ?? "");
    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
    const featured = !!body.featured;

    // If DB available, persist
    if (!skipDb && (prisma as any)?.ebook?.create) {
      const baseData = {
        title,
        description: body.description ?? "",
        category: (body.category as Category | undefined) ?? guessCategory(title) ?? ALT_CATEGORIES[0],
        pages: typeof body.pages === "number" ? body.pages : 10,
        format: body.format ?? "PDF",
        href: body.href ?? "",
        status: body.status ?? "Published",
        featured,
      };

      // Some schemas may not have `featured`; attempt gracefully
      try {
        const ebook = await (prisma as any).ebook.create({ data: baseData });
        deletedIds.delete(String(ebook.id));
        try { await saveDeleted(deletedIds); } catch {}
        return NextResponse.json(ebook, { status: 201 });
      } catch (err: any) {
        const msg = String(err?.message ?? err);
        if (msg.includes("Unknown arg `featured`") || msg.includes("feature") || msg.includes("featured")) {
          const { featured: _omit, ...fallbackData } = baseData as any;
          try {
            const ebook = await (prisma as any).ebook.create({ data: fallbackData });
            deletedIds.delete(String(ebook.id));
            try { await saveDeleted(deletedIds); } catch {}
            return NextResponse.json({ ...ebook, warning: "Featured flag ignored (column missing)." }, { status: 201 });
          } catch {
            // fall through to in-memory echo
          }
        }
        // Any Prisma failure: fall back to in-memory echo without throwing
      }
    }

    // Otherwise, accept and persist to file/memory
    const echo = {
      id: `temp-${Date.now()}`,
      title,
      description: body.description ?? "",
      category: (body.category as Category | undefined) ?? guessCategory(title) ?? ALT_CATEGORIES[0],
      pages: typeof body.pages === "number" ? body.pages : 10,
      format: body.format ?? "PDF",
      href: body.href ?? "",
      status: body.status ?? "Draft",
      featured,
      createdAt: new Date().toISOString(),
    };
    if (featured) featuredMemory = echo.id;
    deletedIds.delete(String(echo.id));
    try { await saveDeleted(deletedIds); } catch {}
    // store in memory for subsequent GETs in non-DB environments
    memoryItems.unshift(echo);
    const merged = await loadStore();
    merged.unshift(echo);
    await saveStore(merged);
    return NextResponse.json({ ...echo, warning: "Persisted to local file store (.data/ebooks.json). Configure DATABASE_URL for DB persistence." }, { status: 200 });
  } catch (error: any) {
    console.error("ebooks create error", error);
    return NextResponse.json({ error: "Unable to create ebook", detail: String(error?.message ?? error) }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const id = body.id;
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
    const featured = body.featured !== undefined ? Boolean(body.featured) : undefined;

    // If DB available, update featured flag
    if (!skipDb && (prisma as any)?.ebook?.update) {
      try {
        const data: any = {};
        if (body.title !== undefined) data.title = String(body.title);
        if (body.description !== undefined) data.description = String(body.description);
        if (body.category !== undefined) data.category = String(body.category);
        if (body.pages !== undefined) data.pages = Number(body.pages);
        if (body.format !== undefined) data.format = String(body.format);
        if (body.href !== undefined) data.href = String(body.href);
        if (body.status !== undefined) data.status = String(body.status);
        if (featured !== undefined) data.featured = featured;

        // optional: clear other featured flags if supported
        if (featured === true && (prisma as any)?.ebook?.updateMany) {
          await (prisma as any).ebook.updateMany({ data: { featured: false } });
        }

        const ebook = await (prisma as any).ebook.update({
          where: { id },
          data,
        });
        return NextResponse.json(ebook);
      } catch (err: any) {
        const msg = String(err?.message ?? err);
        const notFound = msg.toLowerCase().includes("record") && msg.toLowerCase().includes("not found");
        // If record missing but schema exists, try upsert as a fallback
        if (notFound && (prisma as any)?.ebook?.upsert) {
          try {
            const ebook = await (prisma as any).ebook.upsert({
              where: { id },
              create: {
                id,
                title: body.title ?? "Untitled E-Book",
                description: body.description ?? "",
                category: body.category ?? "Financials",
                pages: body.pages ?? 10,
                format: body.format ?? "PDF",
                href: body.href ?? "",
                status: body.status ?? "Published",
                featured: featured ?? false,
              },
              update: {
                title: body.title ?? undefined,
                description: body.description ?? undefined,
                category: body.category ?? undefined,
                pages: body.pages ?? undefined,
                format: body.format ?? undefined,
                href: body.href ?? undefined,
                status: body.status ?? undefined,
                featured: featured ?? undefined,
              },
            });
            return NextResponse.json(ebook);
          } catch (upsertErr: any) {
            console.warn("prisma upsert failed; falling back to memory", upsertErr?.message ?? upsertErr);
          }
        } else {
          console.warn("prisma featured update failed", msg);
        }
      }
    }

    // If no DB, update file/memory cache; create if missing
    let found = false;
    const store = await loadStore();
    store.forEach((item) => {
      if (String(item.id) !== String(id)) {
        if (featured === true) item.featured = false;
        return;
      }
      found = true;
      if (body.title !== undefined) item.title = body.title;
      if (body.description !== undefined) item.description = body.description;
      if (body.category !== undefined) item.category = body.category;
      if (body.pages !== undefined) item.pages = body.pages;
      if (body.format !== undefined) item.format = body.format;
      if (body.href !== undefined) item.href = body.href;
      if (body.status !== undefined) item.status = body.status;
      if (featured !== undefined) item.featured = featured;
      item.updatedAt = new Date().toISOString();
    });

    // mirror to legacy memoryItems for GET merge behavior
    memoryItems.forEach((item) => {
      if (String(item.id) !== String(id)) {
        if (featured === true) item.featured = false;
        return;
      }
      found = true;
      if (body.title !== undefined) item.title = body.title;
      if (body.description !== undefined) item.description = body.description;
      if (body.category !== undefined) item.category = body.category;
      if (body.pages !== undefined) item.pages = body.pages;
      if (body.format !== undefined) item.format = body.format;
      if (body.href !== undefined) item.href = body.href;
      if (body.status !== undefined) item.status = body.status;
      if (featured !== undefined) item.featured = featured;
    });
    if (!found) {
      const newItem: any = {
        id,
        title: body.title ?? "Untitled E-Book",
        description: body.description ?? "",
        category: body.category ?? "Financials",
        pages: body.pages ?? 10,
        format: body.format ?? "PDF",
        href: body.href ?? "",
        status: body.status ?? "Published",
        featured: featured ?? false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      if (featured === true) {
        memoryItems.forEach((item) => { item.featured = false; });
        store.forEach((item) => { item.featured = false; });
      }
      memoryItems.unshift(newItem);
      store.unshift(newItem);
    }
    if (featured !== undefined) {
      featuredMemory = featured ? String(id) : null;
    }
    deletedIds.delete(String(id));
    try { await saveDeleted(deletedIds); } catch {}
    await saveStore(store);
    return NextResponse.json({ id, featured, warning: "Not persisted (no DB configured); cached in memory." });
  } catch (error: any) {
    console.error("ebooks patch error", error);
    return NextResponse.json({ error: "Unable to update ebook", detail: String(error?.message ?? error) }, { status: 500 });
  }
}
