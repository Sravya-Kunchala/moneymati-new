import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// GET /api/admin/summary
// Returns high-level dashboard stats for the admin panel.
export async function GET() {
  try {
    const [
      userCount,
      sessionCount,
      blogCount,
      publishedBlogCount,
      apptUpcoming,
      apptToday,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.session.count(),
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.appointment.count({
        where: { datetime: { gte: new Date() } },
      }),
      prisma.appointment.count({
        where: {
          datetime: {
            gte: startOfToday(),
            lt: startOfTomorrow(),
          },
        },
      }),
    ]);

    // Handle webinar count separately so a missing table doesn't break the endpoint
    let webinarCount = 0;
    try {
      webinarCount = await prisma.webinar.count();
    } catch (err: any) {
      console.warn("webinar count failed, did you run prisma migrate?", err?.code ?? err?.message);
      webinarCount = 0;
    }

    const recentAppointments = await prisma.appointment.findMany({
      orderBy: { datetime: "asc" },
      take: 5,
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        datetime: true,
        status: true,
        source: true,
      },
    });

    const recentUsers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      metrics: {
        users: userCount,
        sessions: sessionCount,
        blogPosts: blogCount,
        blogPublished: publishedBlogCount,
        webinars: webinarCount,
        appointmentsUpcoming: apptUpcoming,
        appointmentsToday: apptToday,
      },
      recentAppointments,
      recentUsers,
    });
  } catch (error: any) {
    console.error("admin summary error", error);
    return NextResponse.json(
      { error: "Unable to load admin summary" },
      { status: 500 }
    );
  }
}

function startOfToday() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

function startOfTomorrow() {
  const t = startOfToday();
  t.setDate(t.getDate() + 1);
  return t;
}
