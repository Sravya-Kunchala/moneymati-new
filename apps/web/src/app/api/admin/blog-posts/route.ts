import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// GET /api/admin/blog-posts
// Returns latest blog posts with draft/published status.
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const take = Number(searchParams.get("take") ?? 20);
    const skip = Number(searchParams.get("skip") ?? 0);
    const publishedParam = searchParams.get("published");

    const where =
      publishedParam === null
        ? {}
        : { published: publishedParam === "true" };

    const [items, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: Math.min(Math.max(take, 1), 100),
        skip: Math.max(skip, 0),
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({ total, items });
  } catch (error: any) {
    console.error("admin blog-posts error", error);
    return NextResponse.json(
      { error: "Unable to load blog posts" },
      { status: 500 }
    );
  }
}
