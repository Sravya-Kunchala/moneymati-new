"use client";

import React, { useEffect, useMemo, useState } from "react";
import SideNav from "@/components/sidenav";
import TopNav from "@/components/topnav";

type SummaryResponse = {
  metrics: {
    users: number;
    sessions: number;
    blogPosts: number;
    blogPublished: number;
    appointmentsUpcoming: number;
    appointmentsToday: number;
    subscribers?: number;
    webinars?: number;
    totalViews?: number;
  };
  recentAppointments: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
    datetime: string;
    status: string;
    source: string | null;
  }>;
  recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
  }>;
};

type AnalyticsResponse = {
  summary: {
    totalViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    avgTimeOnPageSec: number;
    conversions: number;
    conversionRate: number;
  };
  timeseries: Array<{ date: string; views: number; visitors: number }>;
  trafficSources: Array<{ label: string; percent: number }>;
  topPages: Array<{ path: string; views: number; avgTimeOnPageSec: number }>;
};

const fallbackBars = [
  { label: "MON", val: 45 },
  { label: "TUE", val: 62 },
  { label: "WED", val: 52 },
  { label: "THU", val: 78 },
  { label: "FRI", val: 65 },
  { label: "SAT", val: 95 },
  { label: "SUN", val: 55 },
];

const fallbackTraffic = [
  { label: "Direct", percent: 0.45 },
  { label: "Search", percent: 0.3 },
  { label: "Social", percent: 0.15 },
  { label: "Email", percent: 0.1 },
];

export default function Dashboard() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [analyticsRange, setAnalyticsRange] = useState(14);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [appointments, setAppointments] = useState<SummaryResponse["recentAppointments"]>([]);
  const [users, setUsers] = useState<SummaryResponse["recentUsers"]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [summaryRes, apptRes, analyticsRes] = await Promise.all([
          fetch("/api/admin/summary").then((r) => r.json()),
          fetch("/api/admin/appointments?take=8").then((r) => r.json()),
          fetch(`/api/admin/analytics/page?days=${analyticsRange}`).then((r) => r.json()),
        ]);
        const fallbackMetrics = {
          users: 0,
          sessions: 0,
          blogPosts: 0,
          blogPublished: 0,
          appointmentsUpcoming: 0,
          appointmentsToday: 0,
          webinars: 0,
          subscribers: 0,
          totalViews: analyticsRes?.summary?.totalViews ?? 0,
        };
        const safeSummary = summaryRes?.metrics
          ? summaryRes
          : {
              metrics: fallbackMetrics,
              recentAppointments: apptRes.items ?? [],
              recentUsers: [],
            };
        setSummary(safeSummary);
        setAppointments(apptRes.items ?? []);
        setUsers(summaryRes?.recentUsers ?? []);
        setAnalytics(analyticsRes);
      } catch (e) {
        setError("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    })();
  }, [analyticsRange]);

  const stats = useMemo(() => {
    if (!summary?.metrics) return [];
    return [
      {
        label: "Total Views",
        value: (summary.metrics.totalViews ?? summary.metrics.sessions).toLocaleString(),
        change: "+0%",
        positive: true,
        iconBg: "#e0e7ff",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1.5 9c1.6-3 4.2-4.5 7-4.5s5.4 1.5 7 4.5c-1.6 3-4.2 4.5-7 4.5s-5.4-1.5-7-4.5Z" stroke="#1d4ed8" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="8.5" cy="9" r="2.25" stroke="#1d4ed8" strokeWidth="1.4" />
          </svg>
        ),
      },
      {
        label: "Subscribers",
        value: (summary.metrics.subscribers ?? summary.metrics.users).toLocaleString(),
        change: "-2.1%",
        positive: false,
        iconBg: "#e2e8f0",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M12.5 6.25a3.25 3.25 0 11-6.5 0 3.25 3.25 0 016.5 0Z" stroke="#0f172a" strokeWidth="1.4" />
            <path d="M3 14.5c0-2.5 2-4.5 4.5-4.5h3c2.5 0 4.5 2 4.5 4.5" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        label: "Webinars",
        value: (summary.metrics.webinars ?? 0).toLocaleString().padStart(2, "0"),
        change: "+18%",
        positive: true,
        iconBg: "#ede9fe",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2.5" y="3.25" width="13" height="9.5" rx="2" stroke="#7c3aed" strokeWidth="1.4" />
            <path d="M5.25 13.5h7.5" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M6 6.5h6M6 9h4" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        label: "Blog Posts",
        value: summary.metrics.blogPosts.toLocaleString(),
        change: `${summary.metrics.blogPublished} published`,
        positive: true,
        iconBg: "#fff7ed",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="3" y="3" width="12" height="12" rx="2" stroke="#f97316" strokeWidth="1.4" />
            <path d="M6 6.5h6M6 9.5h6M6 12.5h4" stroke="#f97316" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        label: "Appointments",
        value: summary.metrics.appointmentsUpcoming.toLocaleString(),
        change: `${summary.metrics.appointmentsToday} today`,
        positive: true,
        iconBg: "#fee2e2",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2.75" y="3.25" width="12.5" height="11.5" rx="2" stroke="#ef4444" strokeWidth="1.4" />
            <path d="M6 1.75V4.5M12 1.75V4.5" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M2.75 6.75h12.5" stroke="#ef4444" strokeWidth="1.2" />
            <rect x="6" y="9" width="2.5" height="2.5" rx=".5" fill="#ef4444" />
            <rect x="10" y="9" width="2.5" height="2.5" rx=".5" fill="#ef4444" />
          </svg>
        ),
      },
    ];
  }, [summary]);

  const timeseries = analytics?.timeseries ?? [];
  const maxViews = Math.max(...(timeseries.length ? timeseries.map((d) => d.views) : fallbackBars.map((d) => d.val)));

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; }
        .card { background: #ffffff; border-radius: 14px; border: 1px solid #e8ede9; }
        .stat-card { background: #ffffff; border-radius: 14px; border: 1px solid #e8ede9; padding: 14px 16px; flex: 1; min-width: 0; }
        .bar:hover { opacity: 0.85; cursor: pointer; }
        .appt-row { border-bottom: 1px solid #f0f5f1; }
        .appt-row:last-child { border-bottom: none; }
        .appt-table-row { align-items: center; }
        .appt-actions { display: flex; gap: 8px; align-items: center; }
        .action-btn { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: opacity 0.15s; }
        .action-btn:hover { opacity: 0.7; }
        .range-select {
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; color: #1a3a22;
          background: #f4f6f4; border: 1px solid #e8ede9; border-radius: 8px;
          padding: 4px 24px 4px 10px; cursor: pointer; outline: none; appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%235a7060' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 8px center;
        }
        .btn-white { background: #ffffff; border: 1px solid #d0dbd2; border-radius: 8px; padding: 7px 14px; font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600; color: #1a3a22; cursor: pointer; transition: background 0.15s; }
        .btn-white:hover { background: #f0f5f1; }
        .btn-dark { background: #0e3d27; border: none; border-radius: 8px; padding: 7px 14px; font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600; color: #ffffff; cursor: pointer; transition: opacity 0.15s; }
        .btn-dark:hover { opacity: 0.88; }
        .btn-outline { background: transparent; border: 1.5px solid #1a3a22; border-radius: 8px; padding: 7px 14px; font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600; color: #1a3a22; cursor: pointer; }
        .btn-outline:hover { background: rgba(0,0,0,0.04); }

        /* Layout helpers */
        .stats-row { display: flex; gap: 12px; margin-bottom: 16px; }
        .chart-traffic-grid { display: grid; grid-template-columns: 1fr 420px; gap: 12px; margin-bottom: 12px; }
        .appt-subs-grid { display: grid; grid-template-columns: 1fr 420px; gap: 12px; margin-bottom: 12px; }
        .action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
        .appt-table-header { display: grid; grid-template-columns: 1fr 130px 120px 90px; padding: 0 6px 8px; border-bottom: 1px solid #f0f5f1; }
        .appt-table-row { display: grid; grid-template-columns: 1fr 130px 120px 90px; padding: 12px 6px; align-items: center; }

        /* Mobile top bar */
        .mobile-topbar {
          display: none; align-items: center; justify-content: space-between;
          padding: 0 16px; height: 52px;
          background: #ffffff;
          border-bottom: 1px solid #e8ede9;
          position: sticky; top: 0; z-index: 100;
          flex-shrink: 0;
        }

        .icon-btn {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px; border: none; background: transparent;
          cursor: pointer; color: #475569; transition: background 0.12s;
        }
        .icon-btn:hover { background: #f1f5f9; }

        .mobile-nav-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 40; }
        .mobile-nav-panel { position: fixed; top: 0; left: 0; bottom: 0; width: min(260px, 80vw); background: #fff; z-index: 50; transform: translateX(-100%); transition: transform 0.25s ease; overflow-y: auto; }
        .desktop-topnav { display: block; }

        @media (max-width: 768px) {
          .sidenav-wrapper { display: none !important; }
          .desktop-topnav { display: none !important; }
          .mobile-topbar { display: flex !important; }
          .mobile-nav-overlay { display: block !important; }
          .mobile-nav-panel { display: flex !important; flex-direction: column; }
          .dashboard-root { flex-direction: column !important; height: auto !important; overflow: auto !important; }
          .dashboard-main { overflow: visible !important; height: 100vh; display: flex; flex-direction: column; }
          .dashboard-scroll { flex: 1; overflow-y: auto; }
          .dashboard-content { padding: 12px !important; }
          .stats-row { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .stats-row .stat-card:last-child:nth-child(odd) { grid-column: 1 / -1; }
          .chart-traffic-grid { grid-template-columns: 1fr !important; }
          .appt-subs-grid { grid-template-columns: 1fr !important; }
          .action-grid { grid-template-columns: 1fr !important; }
          .appt-table-header { display: none !important; }
          .appt-table-row { display: flex !important; flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; padding: 14px 10px !important; }
          .appt-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
          .appt-actions { display: flex; gap: 5px; }
          .blog-btn-row, .community-btn-row { flex-direction: column !important; }
          .blog-btn-row button, .community-btn-row button { width: 100% !important; }
        }

        @media (min-width: 769px) { .mobile-topbar, .mobile-nav-overlay, .mobile-nav-panel { display: none !important; } }
        .mobile-nav-overlay.open { opacity: 1; }
        .mobile-nav-panel.open { transform: translateX(0); }
      `}</style>

      <div className={`mobile-nav-overlay${mobileNavOpen ? " open" : ""}`} onClick={() => setMobileNavOpen(false)} />
      <div className={`mobile-nav-panel${mobileNavOpen ? " open" : ""}`}>
        <SideNav />
      </div>

      <div className="sidenav-wrapper">
        <SideNav />
      </div>

      <div className="dashboard-main" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div className="mobile-topbar">
          <button className="icon-btn" onClick={() => setMobileNavOpen(true)} aria-label="Open menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", color: "#1a3a22" }}>moneymati</span>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#e8f0ea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#0e3d27" }}>A</div>
        </div>

        <div className="desktop-topnav">
          <TopNav />
        </div>

        <main className="dashboard-scroll" style={{ flex: 1, overflowY: "auto", backgroundColor: "#f4f6f4" }}>
          <div className="dashboard-content" style={{ padding: "20px" }}>

            <div className="stats-row">
              {loading && <div style={{ fontSize: 12, color: "#6b7280" }}>Loading metrics…</div>}
              {!loading && stats.map((s) => (
                <div className="stat-card" key={s.label}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon ?? null}</div>
                    <span style={{ fontSize: "11.5px", fontWeight: 600, color: s.positive ? "#16a34a" : "#dc2626" }}>{s.change}</span>
                  </div>
                  <div style={{ fontSize: "10.5px", color: "#9ab09e", fontWeight: 500, marginBottom: "3px" }}>{s.label}</div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a3a22" }}>{s.value}</div>
                </div>
              ))}
              {!loading && stats.length === 0 && (
                <div style={{ fontSize: 12, color: "#dc2626" }}>
                  {error ?? "No data yet"}
                </div>
              )}
            </div>

            <div className="stats-row">
              {analytics ? (
                <>
                  <div className="stat-card">
                    <div style={{ fontSize: "11px", color: "#9ab09e", marginBottom: 4 }}>Total Views (14d)</div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a3a22" }}>{analytics.summary.totalViews.toLocaleString()}</div>
                  </div>
                  <div className="stat-card">
                    <div style={{ fontSize: "11px", color: "#9ab09e", marginBottom: 4 }}>Unique Visitors</div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a3a22" }}>{analytics.summary.uniqueVisitors.toLocaleString()}</div>
                  </div>
                  <div className="stat-card">
                    <div style={{ fontSize: "11px", color: "#9ab09e", marginBottom: 4 }}>Conversion Rate</div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a3a22" }}>{(analytics.summary.conversionRate * 100).toFixed(2)}%</div>
                  </div>
                  <div className="stat-card">
                    <div style={{ fontSize: "11px", color: "#9ab09e", marginBottom: 4 }}>Bounce Rate</div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a3a22" }}>{(analytics.summary.bounceRate * 100).toFixed(1)}%</div>
                  </div>
                </>
              ) : (
                <div style={{ fontSize: 12, color: "#6b7280" }}>Loading analytics…</div>
              )}
            </div>

            <div className="chart-traffic-grid">
              <div className="card" style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a3a22" }}>Page Views Analytics</span>
                  <select
                    className="range-select"
                    value={analyticsRange}
                    onChange={(e) => setAnalyticsRange(Number(e.target.value))}
                  >
                    <option value={14}>Last 14 Days</option>
                    <option value={30}>Last 30 Days</option>
                    <option value={90}>Last 90 Days</option>
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "10px", height: "180px", padding: "0 4px" }}>
                  {(timeseries.length ? timeseries : []).map((d) => (
                    <div key={d.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", height: "100%" }}>
                      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                        <div className="bar" style={{ width: "88%", margin: "0 auto", height: `${(d.views / maxViews) * 100}%`, borderRadius: "6px 6px 4px 4px", background: "#0e3d27", transition: "height 0.3s ease" }} />
                      </div>
                      <span style={{ fontSize: "10px", color: "#9ab09e", fontWeight: 500 }}>{d.date.slice(5)}</span>
                    </div>
                  ))}
                  {timeseries.length === 0 &&
                    fallbackBars.map((d) => (
                      <div key={d.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", height: "100%" }}>
                        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                          <div className="bar" style={{ width: "88%", margin: "0 auto", height: `${(d.val / maxViews) * 100}%`, borderRadius: "6px 6px 4px 4px", background: "#0e3d27", transition: "height 0.3s ease" }} />
                        </div>
                        <span style={{ fontSize: "10px", color: "#9ab09e", fontWeight: 500 }}>{d.label}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="card" style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a3a22" }}>Visitor Traffic Source</span>
                  <span style={{ fontSize: "11.5px", fontWeight: 600, color: "#0e3d27", cursor: "pointer" }}>View Detailed Report</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {(analytics?.trafficSources ?? fallbackTraffic).map((t) => (
                    <div key={t.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                        <span style={{ fontSize: "12.5px", fontWeight: 500, color: "#1a3a22" }}>{t.label}</span>
                        <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#1a3a22" }}>{Math.round((t.percent ?? 0) * 100)}%</span>
                      </div>
                      <div style={{ height: "5px", borderRadius: "99px", background: "#f0f5f1", overflow: "hidden" }}>
                        <div style={{ width: `${Math.round((t.percent ?? 0) * 100)}%`, height: "100%", borderRadius: "99px", background: "#0e3d27" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="appt-subs-grid">
              <div className="card" style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a3a22" }}>Upcoming Appointments</span>
                  <span style={{ fontSize: "11.5px", fontWeight: 600, color: "#0e3d27", cursor: "pointer" }}>View All</span>
                </div>
                <div className="appt-table-header">
                  {["CLIENT", "DATE & TIME", "STATUS", "ACTIONS"].map((h) => (
                    <span key={h} style={{ fontSize: "9.5px", fontWeight: 600, color: "#9ab09e", letterSpacing: "0.07em" }}>{h}</span>
                  ))}
                </div>
                {loading && <div style={{ fontSize: 12, color: "#6b7280" }}>Loading appointments…</div>}
                {!loading && appointments.map((a) => (
                  <div key={a.id} className="appt-row appt-table-row">
                    <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                      <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#e8f0ea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#0e3d27", flexShrink: 0 }}>{a.fullName[0]}</div>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#1a3a22" }}>{a.fullName}</span>
                    </div>
                    <div className="appt-meta">
                      <div>
                        <div style={{ fontSize: "12.5px", fontWeight: 600, color: "#1a3a22" }}>{new Date(a.datetime).toLocaleDateString()}</div>
                        <div style={{ fontSize: "10.5px", color: "#9ab09e" }}>{new Date(a.datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <span style={{ fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.06em", color: "#0e3d27", background: "#e8f0ea", padding: "3px 8px", borderRadius: "5px" }}>{a.status}</span>
                    </div>
                    <div className="appt-actions" style={{ justifyContent: "center" }}>
                      <div className="action-btn" style={{ background: "#f0fdf4" }}><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#16a34a" strokeWidth="1.4"/><path d="M4.5 7l2 2 3-3" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                      <div className="action-btn" style={{ background: "#eff6ff" }}><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="11" rx="2" stroke="#3b82f6" strokeWidth="1.4"/><path d="M4 1v2M10 1v2" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round"/><line x1="1" y1="6" x2="13" y2="6" stroke="#3b82f6" strokeWidth="1.2"/></svg></div>
                      <div className="action-btn" style={{ background: "#fef2f2" }}><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#ef4444" strokeWidth="1.4"/><path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round"/></svg></div>
                    </div>
                  </div>
                ))}
                {!loading && appointments.length === 0 && <div style={{ fontSize: 12, color: "#6b7280" }}>No appointments found.</div>}
              </div>

              <div className="card" style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a3a22" }}>Recent Users</span>
                  <span style={{ fontSize: "11.5px", fontWeight: 600, color: "#0e3d27", cursor: "pointer" }}>Manage</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {loading && <div style={{ fontSize: 12, color: "#6b7280" }}>Loading users…</div>}
                  {!loading && users.map((s) => (
                    <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                      <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#e8f0ea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11.5px", fontWeight: 700, color: "#0e3d27", flexShrink: 0 }}>{s.name?.[0] ?? "?"}</div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a3a22" }}>{s.name}</div>
                        <div style={{ fontSize: "11px", color: "#9ab09e" }}>{s.email}</div>
                      </div>
                    </div>
                  ))}
                  {!loading && users.length === 0 && <div style={{ fontSize: 12, color: "#6b7280" }}>No users yet.</div>}
                </div>
              </div>
            </div>

            <div className="action-grid">
              <div style={{ background: "#0e3d27", borderRadius: "14px", padding: "22px 26px", position: "relative", overflow: "hidden" }}>
                <div className="deco-icon" style={{ position: "absolute", right: "18px", bottom: "16px" }}>
                  <svg width="119" height="119" viewBox="0 0 119 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 105H82.5V90H30V105ZM30 75H105V60H30V75ZM30 45H105V30H30V45ZM15 135C10.875 135 7.34375 133.531 4.40625 130.594C1.46875 127.656 0 124.125 0 120V15C0 10.875 1.46875 7.34375 4.40625 4.40625C7.34375 1.46875 10.875 0 15 0H120C124.125 0 127.656 1.46875 130.594 4.40625C133.531 7.34375 135 10.875 135 15V120C135 124.125 133.531 127.656 130.594 130.594C127.656 133.531 124.125 135 120 135H15ZM15 120H120V15H15V120ZM15 15V120V15Z" fill="white" fillOpacity="0.1"/>
                  </svg>
                </div>
                <h3 style={{ margin: "0 0 8px", fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: "#ffffff" }}>Blog Manager</h3>
                <p style={{ margin: "0 0 20px", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "rgba(17,212,98,0.8)", maxWidth: "260px" }}>Review pending posts, draft new insights, and manage financial news categories.</p>
                <div className="blog-btn-row" style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => window.location.href = '/blog'} style={{ width: "auto", minWidth: "153px", height: "42px", whiteSpace: "nowrap", borderRadius: "8px", background: "#ffffff", border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700, color: "#0B4634", cursor: "pointer", padding: "10px 20px", boxShadow: "0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)" }}>Create New Post</button>
                  <button style={{ width: "153.52px", height: "42px", borderRadius: "8px", background: "rgba(17,212,98,0.2)", border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700, color: "#ffffff", cursor: "pointer", padding: "10px 20px", boxShadow: "0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)" }}>Manage Archive</button>
                </div>
              </div>

              <div className="card" style={{ padding: "22px 26px", position: "relative", overflow: "hidden" }}>
                <div className="deco-icon" style={{ position: "absolute", right: "16px", bottom: "12px" }}>
                  <svg width="135" height="135" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M150 150L120 120H45C40.875 120 37.3438 118.531 34.4062 115.594C31.4688 112.656 30 109.125 30 105V97.5H112.5C116.625 97.5 120.156 96.0312 123.094 93.0938C126.031 90.1562 127.5 86.625 127.5 82.5V30H135C139.125 30 142.656 31.4688 145.594 34.4062C148.531 37.3438 150 40.875 150 45V150ZM15 76.3125L23.8125 67.5H97.5V15H15V76.3125ZM0 112.5V15C0 10.875 1.46875 7.34375 4.40625 4.40625C7.34375 1.46875 10.875 0 15 0H97.5C101.625 0 105.156 1.46875 108.094 4.40625C111.031 7.34375 112.5 10.875 112.5 15V67.5C112.5 71.625 111.031 75.1562 108.094 78.0938C105.156 81.0312 101.625 82.5 97.5 82.5H30L0 112.5ZM15 67.5V15V67.5Z" fill="#F1F5F9"/>
                  </svg>
                </div>
                <h3 style={{ margin: "0 0 8px", fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>Community Moderator</h3>
                <p style={{ margin: "0 0 20px", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#64748B", maxWidth: "280px" }}>Monitor forum discussions, resolve flags, and engage with MoneyMati members.</p>
                <div className="community-btn-row" style={{ display: "flex", gap: "10px" }}>
                  <button style={{ width: "154.64px", height: "42px", borderRadius: "8px", background: "#0f172a", border: "none", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700, color: "#ffffff", cursor: "pointer", padding: "10px 20px", boxShadow: "0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)" }}>Open Dashboard</button>
                  <button style={{ width: "auto", minWidth: "153px", height: "42px", whiteSpace: "nowrap", borderRadius: "8px", background: "#ffffff", border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700, color: "#0f172a", cursor: "pointer", padding: "10px 20px", boxShadow: "0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)" }}>View 12 Pending Flags</button>
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center", fontSize: "11.5px", color: "#9ab09e", paddingBottom: "8px" }}>
              © 2026 MoneyMati. All administrative rights reserved.
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
