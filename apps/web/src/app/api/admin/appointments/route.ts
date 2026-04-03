import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// GET /api/admin/appointments
// Returns paginated appointments for admin dashboard.
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const take = Number(searchParams.get("take") ?? 20);
    const skip = Number(searchParams.get("skip") ?? 0);
    const status = searchParams.get("status");
    const includePast = searchParams.get("includePast") === "true";

    const baseWhere: any = status ? { status: status as any } : {};
    if (!includePast) {
      baseWhere.datetime = { gte: new Date() };
    }

    const [items, total] = await Promise.all([
      prisma.appointment.findMany({
        where: baseWhere,
        orderBy: { datetime: "asc" },
        take: Math.min(Math.max(take, 1), 100),
        skip: Math.max(skip, 0),
      }),
      prisma.appointment.count({ where: baseWhere }),
    ]);

    return NextResponse.json({ total, items });
  } catch (error: any) {
    console.error("admin appointments error", error);
    return NextResponse.json(
      { error: "Unable to load appointments" },
      { status: 500 }
    );
  }
}
