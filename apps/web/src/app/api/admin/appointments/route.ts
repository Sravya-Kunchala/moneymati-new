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

// PATCH /api/admin/appointments  { id, status }
export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required" }, { status: 400 });
    }
    const updated = await prisma.appointment.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ ok: true, appointment: updated });
  } catch (error: any) {
    console.error("admin appointments patch error", error);
    return NextResponse.json(
      { error: "Unable to update appointment" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/appointments  { id }
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }
    await prisma.appointment.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("admin appointments delete error", error);
    return NextResponse.json(
      { error: "Unable to delete appointment" },
      { status: 500 }
    );
  }
}
