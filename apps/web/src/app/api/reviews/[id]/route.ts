import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

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

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await ensureTable();
    const idNum = Number(params.id);
    if (!idNum) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    await prisma.$executeRawUnsafe(`DELETE FROM "reviews" WHERE id = ${idNum}`);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("reviews DELETE error", error);
    return NextResponse.json({ error: "Unable to delete review" }, { status: 500 });
  }
}
