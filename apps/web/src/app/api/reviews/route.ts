import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unknown reviews database error";

async function ensureTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "reviews" (
      id           BIGSERIAL PRIMARY KEY,
      name         TEXT NOT NULL,
      role         TEXT,
      avatar       TEXT,
      rating       INTEGER NOT NULL DEFAULT 5,
      testimonial  TEXT NOT NULL,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export async function GET() {
  try {
    await ensureTable();
    const rows = await prisma.$queryRaw<any[]>`
      SELECT id, name, role, avatar, rating, testimonial, created_at
      FROM "reviews"
      ORDER BY created_at DESC
      LIMIT 100;
    `;
    const safe = (rows ?? []).map((r) => ({
      id: Number(r.id),
      name: r.name,
      role: r.role,
      avatar: r.avatar,
      rating: Number(r.rating),
      testimonial: r.testimonial,
      created_at: r.created_at ? new Date(r.created_at).toISOString() : null,
    }));
    return NextResponse.json({ items: safe });
  } catch (error: unknown) {
    console.warn("reviews GET unavailable:", getErrorMessage(error));
    return NextResponse.json({ items: [], source: "fallback" });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const body = await request.json().catch(() => ({}));
    const name = (body.name || "").trim();
    const role = (body.role || "").trim();
    const avatar = (body.avatar || "").trim();
    const testimonial = (body.testimonial || "").trim();
    const ratingNum = Number(body.rating) || 0;
    const rating = Math.min(5, Math.max(1, ratingNum || 5));

    if (!name || !testimonial) {
      return NextResponse.json({ error: "name and testimonial are required" }, { status: 400 });
    }

    const inserted = await prisma.$queryRaw<any[]>`
      INSERT INTO "reviews" (name, role, avatar, rating, testimonial)
      VALUES (${name}, ${role || null}, ${avatar || null}, ${rating}, ${testimonial})
      RETURNING id, name, role, avatar, rating, testimonial, created_at;
    `;

    const item = inserted?.[0];
    return NextResponse.json({ item }, { status: 201 });
  } catch (error: unknown) {
    console.warn("reviews POST unavailable:", getErrorMessage(error));
    return NextResponse.json({ error: "Unable to save review" }, { status: 503 });
  }
}
