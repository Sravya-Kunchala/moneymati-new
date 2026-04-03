import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { blogArticles } from "@/data/blogs";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function ensureUniqueSlug(base: string) {
  let slug = base;
  let i = 2;
  while (await prisma.blogPost.findUnique({ where: { slug } })) {
    slug = `${base}-${i}`;
    i += 1;
  }
  return slug;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const published = searchParams.get("published");
  const where =
    published === null
      ? undefined
      : { published: published === "true" };

  try {
    if (!(prisma as any)?.blogPost?.findMany) {
      return NextResponse.json({ data: blogArticles, warning: "Blog model missing; showing static data." }, { status: 200 });
    }
    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: posts });
  } catch (error: any) {
    console.error("blog GET error", error);
    return NextResponse.json({ data: blogArticles, warning: "DB error; showing static data." }, { status: 200 });
  }
}

export async function POST(request: Request) {
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
    slug,
  } = body ?? {};

  if (!title || !content) {
    return NextResponse.json(
      { error: "title and content are required" },
      { status: 400 }
    );
  }

  try {
    if (!(prisma as any)?.blogPost?.create) {
      return NextResponse.json(
        { warning: "Blog model missing; not persisted. Configure DB and run prisma migrate.", data: { title, content, excerpt, slug } },
        { status: 503 },
      );
    }

    const baseSlug = slugify(slug || title);
    const uniqueSlug = await ensureUniqueSlug(baseSlug);

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: uniqueSlug,
        content,
        excerpt: excerpt ?? null,
        coverImage: coverImage ?? null,
        authorId: authorId ?? null,
        published: Boolean(published),
        publishedAt: published ? publishedAt ?? new Date() : null,
        tags: Array.isArray(tags) ? tags : [],
      },
    });

    return NextResponse.json({ data: post }, { status: 201 });
  } catch (error: any) {
    console.error("blog POST error", error);
    return NextResponse.json({ error: "Unable to save blog", detail: String(error?.message ?? error) }, { status: 500 });
  }
}
