import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { blogArticles } from "@/data/blogs";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, "")
    .replace(/\\s+/g, "-")
    .replace(/-+/g, "-");
}

async function ensureUniqueSlugForUpdate(base: string, currentId: string) {
  let slug = base;
  let i = 2;
  while (true) {
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (!existing || existing.id === currentId) break;
    slug = `${base}-${i}`;
    i += 1;
  }
  return slug;
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const hasDb = Boolean((prisma as any)?.blogPost?.findUnique);

    if (hasDb) {
      const post = await (prisma as any).blogPost.findUnique({ where: { id } });
      if (post) return NextResponse.json({ data: post });
      // fall through to sample if not found in DB
    }

    const sample = blogArticles.find((b) => String(b.id) === id || (b as any).slug === id);
    if (sample) {
      return NextResponse.json({
        data: sample,
        warning: hasDb ? "Not found in DB; serving static sample." : "DB missing; serving static sample.",
      });
    }

    return NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error: any) {
    console.error("blog GET by id error", error);
    return NextResponse.json({ error: "Unable to load blog", detail: String(error?.message ?? error) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const {
    title,
    content,
    excerpt,
    coverImage,
    authorId,
    published,
    publishedAt,
    tags,
  } = body ?? {};

  try {
    if (!(prisma as any)?.blogPost?.update) {
      return NextResponse.json(
        { warning: "Blog model unavailable; no changes persisted.", data: { id, title, content, excerpt, slug } },
        { status: 503 },
      );
    }

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Always derive slug from title (or fallback to existing title)
    const baseSlug = slugify(title ?? existing.title ?? "post");
    const uniqueSlug = await ensureUniqueSlugForUpdate(baseSlug, id);

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        slug: uniqueSlug,
        content: content ?? existing.content,
        excerpt: excerpt ?? existing.excerpt,
        coverImage: coverImage ?? existing.coverImage,
        authorId: authorId ?? existing.authorId,
        tags: Array.isArray(tags) ? tags : (existing as any).tags ?? [],
        published: typeof published === "boolean" ? published : existing.published,
        publishedAt:
          typeof published === "boolean"
            ? published
              ? publishedAt ?? existing.publishedAt ?? new Date()
              : null
            : existing.publishedAt,
      },
    });

    return NextResponse.json({ data: post });
  } catch (error: any) {
    console.error("blog PUT error", error);
    return NextResponse.json({ error: "Unable to update blog", detail: String(error?.message ?? error) }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    if (!(prisma as any)?.blogPost?.delete) {
      return NextResponse.json({ error: "Blog model unavailable; run prisma migrate/generate." }, { status: 503 });
    }
    await (prisma as any).blogPost.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error?.code === "P2025") {
      // record not found; treat as success for idempotency
      return NextResponse.json({ ok: true });
    }
    if (error?.code === "P2021" || error?.code === "P2010") {
      return NextResponse.json({ error: "Blog table missing; run prisma migrate." }, { status: 503 });
    }
    console.error("blog delete error", error);
    return NextResponse.json({ error: "Unable to delete blog", detail: String(error?.message ?? error) }, { status: 500 });
  }
}
