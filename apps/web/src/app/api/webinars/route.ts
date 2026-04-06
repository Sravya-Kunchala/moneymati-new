import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// Public webinars feed
export async function GET() {
  try {
    if (!(prisma as any).webinar) {
      return NextResponse.json(
        { items: [], warning: "Webinar model missing on Prisma client. Run prisma generate." },
        { status: 503 },
      );
    }
    const items = await prisma.webinar.findMany({
      orderBy: { scheduledAt: "desc" },
      select: {
        id: true,
        title: true,
        host: true,
        scheduledAt: true,
        status: true,
        thumbType: true,
        createdAt: true,
        link: true,
      },
    });
    return NextResponse.json({ items });
  } catch (error: any) {
    console.error("public webinars api error", error);
    if (error?.code === "P2021" || error?.code === "P2010") {
      return NextResponse.json({ items: [], warning: "Webinar table missing; run prisma migrate." });
    }
    // Fallback: try a minimal fetch without select (in case schema/DB mismatch)
    try {
      const items = await prisma.webinar.findMany({ orderBy: { scheduledAt: "desc" } });
      return NextResponse.json({ items, warning: "Using fallback webinar shape; check DB schema for link column." });
    } catch (e) {
      console.error("webinars fallback failed", e);
    }
    return NextResponse.json(
      { items: [], warning: "Unable to load webinars right now." },
      { status: 200 },
    );
  }
}
