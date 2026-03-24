import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ data: post });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

  const data: any = {};
  if (title !== undefined) data.title = title;
  if (slug !== undefined) data.slug = slug;
  if (content !== undefined) data.content = content;
  if (excerpt !== undefined) data.excerpt = excerpt;
  if (coverImage !== undefined) data.coverImage = coverImage;
  if (authorId !== undefined) data.authorId = authorId;
  if (published !== undefined) {
    data.published = Boolean(published);
    data.publishedAt = published ? publishedAt ?? new Date() : null;
  }
  if (tags !== undefined) data.tags = Array.isArray(tags) ? tags : [];

  const post = await prisma.blogPost.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json({ data: post });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.blogPost.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
