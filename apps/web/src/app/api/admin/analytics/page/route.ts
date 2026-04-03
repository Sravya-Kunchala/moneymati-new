import { NextResponse } from "next/server";

// Lightweight, DB-free page analytics mock for the admin dashboard.
// Replace with your real analytics pipeline when ready.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const daysParam = Number(searchParams.get("days") ?? 14);
  const windowDays = Math.min(Math.max(Number.isFinite(daysParam) ? daysParam : 14, 7), 90);

  const today = new Date();
  const days = Array.from({ length: windowDays }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (windowDays - 1 - i));
    const iso = d.toISOString().slice(0, 10);
    const views = 800 + Math.floor(Math.sin(i / 2) * 120 + Math.random() * 80);
    const visitors = Math.max(400, Math.floor(views * 0.55));
    return { date: iso, views, visitors };
  });

  const totalViews = days.reduce((sum, d) => sum + d.views, 0);
  const totalVisitors = days.reduce((sum, d) => sum + d.visitors, 0);

  const response = {
    summary: {
      totalViews,
      uniqueVisitors: totalVisitors,
      bounceRate: 0.42, // 42%
      avgTimeOnPageSec: 94,
      conversions: 184,
      conversionRate: 0.023, // 2.3%
    },
    timeseries: days,
    trafficSources: [
      { label: "Direct", percent: 0.38 },
      { label: "Search", percent: 0.32 },
      { label: "Social", percent: 0.18 },
      { label: "Referral", percent: 0.08 },
      { label: "Email", percent: 0.04 },
    ],
    topPages: [
      { path: "/", views: 4200, avgTimeOnPageSec: 86 },
      { path: "/Blog", views: 3100, avgTimeOnPageSec: 102 },
      { path: "/services", views: 1850, avgTimeOnPageSec: 74 },
      { path: "/pricing", views: 1320, avgTimeOnPageSec: 65 },
      { path: "/signup", views: 910, avgTimeOnPageSec: 58 },
    ],
  };

  return NextResponse.json(response);
}
