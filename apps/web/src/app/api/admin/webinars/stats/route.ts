import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// GET /api/admin/webinars/stats
// Returns counts for live and upcoming webinars.
export async function GET() {
  try {
    if (!(prisma as any).webinar?.count) {
      console.warn("webinar delegate missing on Prisma client; run prisma generate");
      return NextResponse.json(
        { live: 0, upcoming: 0, total: 0, warning: "Webinar model missing on client" },
        { status: 503 },
      );
    }

    const [live, upcoming, total] = await Promise.all([
      prisma.webinar.count({ where: { status: "LIVE" } }),
      prisma.webinar.count({ where: { status: "UPCOMING" } }),
      prisma.webinar.count(),
    ]);

    return NextResponse.json({ live, upcoming, total });
  } catch (error: any) {
    if (error?.code === "P2021" || error?.code === "P2010") {
      return NextResponse.json(
        { live: 0, upcoming: 0, total: 0, warning: "Webinar table missing; run prisma migrate." },
        { status: 503 },
      );
    }
    console.error("admin webinars stats error", error);
    return NextResponse.json(
      {
        error: "Unable to load webinar stats",
        detail: String(error?.message ?? error),
        code: error?.code,
        stack: error?.stack,
      },
      { status: 500 },
    );
  }
}
