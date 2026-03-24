import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

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

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ data: posts });
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
}
