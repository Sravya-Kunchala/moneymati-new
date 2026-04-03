import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// GET /api/admin/webinars
// Returns all webinars ordered by newest first.
export async function GET() {
  try {
    // If the generated Prisma client doesn't have the model (stale generate), avoid 500s
    if (!(prisma as any).webinar) {
      console.warn("webinar delegate missing on Prisma client; regenerate @repo/db client");
      return NextResponse.json(
        { items: [], warning: "Webinar model not present on Prisma client. Run prisma generate." },
        { status: 503 },
      );
    }
    const items = await prisma.webinar.findMany({
      orderBy: { scheduledAt: "desc" },
    });
    return NextResponse.json({ items });
  } catch (error: any) {
    // Graceful fallback if the webinars table/migration is missing
    if (error?.code === "P2021" || error?.code === "P2010") {
      console.warn("webinar table missing, returning empty list. Run prisma migrate.");
      return NextResponse.json({ items: [], warning: "Webinar table missing; run prisma migrate." });
    }
    console.error("admin webinars list error", error);
    return NextResponse.json(
      {
        error: "Unable to load webinars",
        detail: String(error?.message ?? error),
        code: error?.code,
        stack: error?.stack,
      },
      { status: 500 },
    );
  }
}

// POST /api/admin/webinars
// Creates a new webinar entry.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = (body.title ?? "").trim();
    const host = (body.host ?? "").trim() || "TBD";
    const id = crypto.randomUUID();
    const scheduledAt = body.scheduledAt
      ? new Date(body.scheduledAt)
      : new Date();
    const status =
      (body.status as string | undefined)?.toUpperCase() ?? "UPCOMING";
    const thumbType = body.thumbType ?? "crypto";
    const now = new Date();

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 },
      );
    }

    const webinar = await prisma.webinar.create({
      data: {
        id,
        title,
        host,
        scheduledAt,
        status: status as any,
        thumbType,
        createdAt: now,
        updatedAt: now,
      },
    });

    return NextResponse.json(webinar, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2021" || error?.code === "P2010") {
      return NextResponse.json(
        { error: "Webinar table missing; run prisma migrate." },
        { status: 503 },
      );
    }
    if (error?.code === "P2011") {
      // Null constraint violation -> DB schema likely out of sync with Prisma schema
      return NextResponse.json(
        {
          error: "Webinar table columns are out of sync. Run prisma migrate.",
          detail: String(error?.message ?? error),
        },
        { status: 503 },
      );
    }
    console.error("admin webinars create error", error);
    return NextResponse.json(
      {
        error: "Unable to create webinar",
        detail: String(error?.message ?? error),
        code: error?.code,
        stack: error?.stack,
      },
      { status: 500 },
    );
  }
}
