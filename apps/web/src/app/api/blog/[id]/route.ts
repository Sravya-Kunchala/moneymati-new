import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    if (!(prisma as any)?.blogPost?.delete) {
      return NextResponse.json({ error: "Blog model unavailable; run prisma migrate/generate." }, { status: 503 });
    }
    await (prisma as any).blogPost.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error?.code === "P2025") {
      // record not found; treat as success for idempotency
      return NextResponse.json({ ok: true });
    }
    if (error?.code === "P2021" || error?.code === "P2010") {
      return NextResponse.json({ error: "Blog table missing; run prisma migrate." }, { status: 503 });
    }
    console.error("blog delete error", error);
    return NextResponse.json({ error: "Unable to delete blog", detail: String(error?.message ?? error) }, { status: 500 });
  }
}
