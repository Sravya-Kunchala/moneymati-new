import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

type Payload = {
  fullName?: string;
  email?: string;
  phone?: string;
  occupation?: string;
};

// POST /api/personalize
// Stores a personalization submission. Uses a raw insert so it works even if
// the Prisma schema hasn't been updated yet.
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;
    const fullName = (body.fullName || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const phone = (body.phone || "").trim();
    const occupation = (body.occupation || "").trim();

    if (!fullName || !email) {
      return NextResponse.json(
        { ok: false, message: "Full name and email are required." },
        { status: 400 },
      );
    }

    // Attempt insert; rely on a unique constraint on email if present.
    const rows = await prisma.$queryRaw<any[]>`
      insert into "personalize_submissions" ("full_name", "email", "phone", "occupation")
      values (${fullName}, ${email}, ${phone || null}, ${occupation || null})
      on conflict ("email") do nothing
      returning "id", "full_name" as "fullName", "email", "phone", "occupation", "created_at" as "createdAt";
    `;

    const submission = rows?.[0];
    if (submission) {
      return NextResponse.json({ ok: true, submission }, { status: 201 });
    }

    // Conflict path (no row returned)
    return NextResponse.json(
      { ok: false, duplicate: true, message: "You’ve already submitted." },
      { status: 409 },
    );
  } catch (error: any) {
    console.error("personalize submission error", error);
    if (error?.code === "P2002" || error?.code === "23505") {
      return NextResponse.json(
        { ok: false, duplicate: true, message: "You’ve already submitted." },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { ok: false, message: "Unable to save your details right now. Please try again." },
      { status: 500 },
    );
  }
}
