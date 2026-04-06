import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// GET /api/admin/leads
// Returns recent personalize submissions.
export async function GET() {
  try {
    const rows = await prisma.$queryRaw<Array<{
      id: string;
      full_name: string;
      email: string;
      phone: string | null;
      occupation: string | null;
      created_at: Date;
    }>>`
      select id, full_name, email, phone, occupation, created_at
      from "personalize_submissions"
      order by created_at desc
      limit 200;
    `;

    const items = rows.map((r) => ({
      id: r.id,
      fullName: (r as any).full_name ?? "",
      email: r.email,
      phone: r.phone,
      occupation: r.occupation,
      createdAt: r.created_at,
    }));

    return NextResponse.json({ items });
  } catch (error: any) {
    console.error("admin leads error", error);
    return NextResponse.json({ items: [], error: "Unable to load leads" }, { status: 500 });
  }
}
