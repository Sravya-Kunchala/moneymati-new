import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// PUT /api/admin/webinars/[id]
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const title = (body.title ?? "").trim();
    const host = (body.host ?? "").trim();
    const status =
      (body.status as string | undefined)?.toUpperCase() ?? undefined;
    const thumbType = body.thumbType ?? undefined;
    const scheduledAt = body.scheduledAt
      ? new Date(body.scheduledAt)
      : undefined;

    const webinar = await prisma.webinar.update({
      where: { id },
      data: {
        ...(title ? { title } : {}),
        ...(host ? { host } : {}),
        ...(status ? { status: status as any } : {}),
        ...(scheduledAt ? { scheduledAt } : {}),
        ...(thumbType !== undefined ? { thumbType } : {}),
      },
    });

    return NextResponse.json(webinar);
  } catch (error: any) {
    if (error?.code === "P2021" || error?.code === "P2010") {
      return NextResponse.json(
        { error: "Webinar table missing; run prisma migrate." },
        { status: 503 },
      );
    }
    console.error("admin webinars update error", error);
    return NextResponse.json(
      { error: "Unable to update webinar" },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/webinars/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await prisma.webinar.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error?.code === "P2021" || error?.code === "P2010") {
      return NextResponse.json(
        { error: "Webinar table missing; run prisma migrate." },
        { status: 503 },
      );
    }
    console.error("admin webinars delete error", error);
    return NextResponse.json(
      { error: "Unable to delete webinar" },
      { status: 500 },
    );
  }
}
