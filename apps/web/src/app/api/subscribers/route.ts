import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// POST /api/subscribers
// Creates a newsletter subscriber entry.
export async function POST(req: Request) {
  try {
    console.log("[/api/subscribers] incoming request");
    const body = await req.json();
    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim().toLowerCase();
    const phone = (body?.phone || "").trim();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    // Check duplicate
    const existing = await prisma.$queryRaw<any[]>`
      select id, name, email from "subscribers" where email = ${email} limit 1;
    `;
    if (existing && existing.length) {
      return NextResponse.json({ ok: false, duplicate: true, message: "You are already subscribed." }, { status: 200 });
    }

    // Raw SQL insert
    const rows = await prisma.$queryRaw<any[]>`
      insert into "subscribers" ("name", "email", "phone")
      values (${name}, ${email}, ${phone || null})
      returning "id", "name", "email", "phone", "created_at" as "createdAt";
    `;

    const subscriber = rows?.[0] ?? null;
    console.log("[/api/subscribers] upserted", subscriber?.id);
    return NextResponse.json({ ok: true, subscriber }, { status: 201 });
  } catch (error: any) {
    console.error("subscriber create error", error);
    return NextResponse.json({ error: "Unable to save subscription" }, { status: 500 });
  }
}
