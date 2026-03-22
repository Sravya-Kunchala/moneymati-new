"use client";

import React, { useState } from "react";
import SideNav from "@/components/sidenav";
import TopNav from "@/components/topnav";

// ── Data ─────────────────────────────────────────────────────
const stats = [
  {
    label: "Total Views", value: "124,502", change: "+12.5%", positive: true, iconBg: "#eff6ff",
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="3" stroke="#3b82f6" strokeWidth="1.5"/><path d="M1 9C3 4 6.5 2 9 2s6 2 8 7c-2 5-5.5 7-8 7S3 14 1 9z" stroke="#3b82f6" strokeWidth="1.5"/></svg>,
  },
  {
    label: "Subscribers", value: "120", change: "-2.1%", positive: false, iconBg: "#f0fdf4",
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7" cy="6" r="3" stroke="#22c55e" strokeWidth="1.5"/><path d="M1 16c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 8l2 2 3-3" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    label: "Webinars", value: "03", change: "+18%", positive: true, iconBg: "#faf5ff",
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="3" width="16" height="11" rx="2" stroke="#a855f7" strokeWidth="1.5"/><path d="M6 14v2M12 14v2M4 16h10" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 7.5l5 2.5-5 2.5V7.5z" fill="#a855f7"/></svg>,
  },
  {
    label: "Blog Posts", value: "10", change: "+4%", positive: true, iconBg: "#fff7ed",
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="2" stroke="#f97316" strokeWidth="1.5"/><line x1="5" y1="6" x2="13" y2="6" stroke="#f97316" strokeWidth="1.3" strokeLinecap="round"/><line x1="5" y1="9" x2="13" y2="9" stroke="#f97316" strokeWidth="1.3" strokeLinecap="round"/><line x1="5" y1="12" x2="9" y2="12" stroke="#f97316" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  },
  {
    label: "Appointments", value: "10", change: "+8%", positive: true, iconBg: "#fef2f2",
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="13" rx="2" stroke="#ef4444" strokeWidth="1.5"/><path d="M6 1v4M12 1v4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><line x1="2" y1="8" x2="16" y2="8" stroke="#ef4444" strokeWidth="1.3"/><rect x="6" y="11" width="3" height="2" rx="0.5" fill="#ef4444"/></svg>,
  },
];

const barData = [
  { day: "MON", val: 45 }, { day: "TUE", val: 62 }, { day: "WED", val: 52 },
  { day: "THU", val: 78 }, { day: "FRI", val: 65 }, { day: "SAT", val: 95 }, { day: "SUN", val: 55 },
];

const traffic = [
  { label: "Direct Search", pct: 45, color: "#0e3d27" },
  { label: "Social Media", pct: 30, color: "#3b82f6" },
  { label: "Referral Link", pct: 15, color: "#a855f7" },
  { label: "Email Campaign", pct: 10, color: "#f97316" },
];

const appointments = [
  { name: "Chandana Sharma", date: "Mar 08, 2026", time: "10:30 AM", service: "INVESTMENT", serviceColor: "#0e3d27", serviceBg: "#e8f0ea" },
  { name: "Anupuma", date: "Apr 21, 2026", time: "02:00 PM", service: "TAX PLANNING", serviceColor: "#1d4ed8", serviceBg: "#eff6ff" },
];

const subscribers = [
  { initials: "NA", name: "Nandhini", email: "nandhini@gmail.com", bg: "#e8f0ea", color: "#0e3d27" },
  { initials: "SR", name: "Swathi Raj", email: "swathi.r@gmail.com", bg: "#fef3c7", color: "#92400e" },
  { initials: "MO", name: "Mounika", email: "mounika@gmail.com", bg: "#ede9fe", color: "#5b21b6" },
];

// ── Main Dashboard ─────────────────────────────────────────────
export default function Dashboard() {
  const [chartRange, setChartRange] = useState("Last 7 Days");
  const maxVal = Math.max(...barData.map((d) => d.val));

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
        .action-btn { width: 27px; height: 27px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: opacity 0.15s; }
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
      `}</style>

      {/* ── Sidebar ── */}
      <SideNav />

      {/* ── Main area ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopNav />

        {/* ── Scrollable content ── */}
        <main style={{ flex: 1, overflowY: "auto", backgroundColor: "#f4f6f4", padding: "20px" }}>

          {/* Stat Cards */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</div>
                  <span style={{ fontSize: "11.5px", fontWeight: 600, color: s.positive ? "#16a34a" : "#dc2626" }}>{s.change}</span>
                </div>
                <div style={{ fontSize: "10.5px", color: "#9ab09e", fontWeight: 500, marginBottom: "3px" }}>{s.label}</div>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a3a22" }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Chart + Traffic */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "12px", marginBottom: "12px" }}>
            {/* Bar Chart */}
            <div className="card" style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a3a22" }}>Page Views Analytics</span>
                <select className="range-select" value={chartRange} onChange={(e) => setChartRange(e.target.value)}>
                  <option>Last 7 Days</option><option>Last 30 Days</option><option>Last 90 Days</option>
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "10px", height: "180px", padding: "0 4px" }}>
                {barData.map((d) => (
                  <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", height: "100%" }}>
                    <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                      <div className="bar" style={{ width: "88%", margin: "0 auto", height: `${(d.val / maxVal) * 100}%`, borderRadius: "6px 6px 4px 4px", background: d.day === "SAT" ? "#0e3d27" : "#c8dccb", transition: "height 0.3s ease" }} />
                    </div>
                    <span style={{ fontSize: "10px", color: "#9ab09e", fontWeight: 500 }}>{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic */}
            <div className="card" style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a3a22" }}>Visitor Traffic Source</span>
                <span style={{ fontSize: "11.5px", fontWeight: 600, color: "#0e3d27", cursor: "pointer" }}>View Detailed Report</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {traffic.map((t) => (
                  <div key={t.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ fontSize: "12.5px", fontWeight: 500, color: "#1a3a22" }}>{t.label}</span>
                      <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#1a3a22" }}>{t.pct}%</span>
                    </div>
                    <div style={{ height: "5px", borderRadius: "99px", background: "#f0f5f1", overflow: "hidden" }}>
                      <div style={{ width: `${t.pct}%`, height: "100%", borderRadius: "99px", background: t.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Appointments + Subscribers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "12px", marginBottom: "12px" }}>
            {/* Appointments */}
            <div className="card" style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a3a22" }}>Upcoming Appointments</span>
                <span style={{ fontSize: "11.5px", fontWeight: 600, color: "#0e3d27", cursor: "pointer" }}>View All</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 120px 90px", padding: "0 6px 8px", borderBottom: "1px solid #f0f5f1" }}>
                {["CLIENT", "DATE & TIME", "SERVICE", "ACTIONS"].map((h) => (
                  <span key={h} style={{ fontSize: "9.5px", fontWeight: 600, color: "#9ab09e", letterSpacing: "0.07em" }}>{h}</span>
                ))}
              </div>
              {appointments.map((a, i) => (
                <div key={i} className="appt-row" style={{ display: "grid", gridTemplateColumns: "1fr 130px 120px 90px", padding: "12px 6px", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                    <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#e8f0ea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#0e3d27", flexShrink: 0 }}>{a.name[0]}</div>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#1a3a22" }}>{a.name}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 600, color: "#1a3a22" }}>{a.date}</div>
                    <div style={{ fontSize: "10.5px", color: "#9ab09e" }}>{a.time}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.06em", color: a.serviceColor, background: a.serviceBg, padding: "3px 8px", borderRadius: "5px" }}>{a.service}</span>
                  </div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <div className="action-btn" style={{ background: "#f0fdf4" }}><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#16a34a" strokeWidth="1.4"/><path d="M4.5 7l2 2 3-3" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                    <div className="action-btn" style={{ background: "#eff6ff" }}><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="11" rx="2" stroke="#3b82f6" strokeWidth="1.4"/><path d="M4 1v2M10 1v2" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round"/><line x1="1" y1="6" x2="13" y2="6" stroke="#3b82f6" strokeWidth="1.2"/></svg></div>
                    <div className="action-btn" style={{ background: "#fef2f2" }}><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#ef4444" strokeWidth="1.4"/><path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round"/></svg></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subscribers */}
            <div className="card" style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a3a22" }}>Recent Subscribers</span>
                <span style={{ fontSize: "11.5px", fontWeight: 600, color: "#0e3d27", cursor: "pointer" }}>Manage List</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {subscribers.map((s) => (
                  <div key={s.initials} style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11.5px", fontWeight: 700, color: s.color, flexShrink: 0 }}>{s.initials}</div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a3a22" }}>{s.name}</div>
                      <div style={{ fontSize: "11px", color: "#9ab09e" }}>{s.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Manager + Community Moderator */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
            {/* Blog Manager */}
            <div style={{ background: "#0e3d27", borderRadius: "14px", padding: "22px 26px", position: "relative", overflow: "hidden" }}>
              {/* Provided SVG icon */}
              <div style={{ position: "absolute", right: "18px", bottom: "16px" }}>
                <svg width="119" height="119" viewBox="0 0 119 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 105H82.5V90H30V105ZM30 75H105V60H30V75ZM30 45H105V30H30V45ZM15 135C10.875 135 7.34375 133.531 4.40625 130.594C1.46875 127.656 0 124.125 0 120V15C0 10.875 1.46875 7.34375 4.40625 4.40625C7.34375 1.46875 10.875 0 15 0H120C124.125 0 127.656 1.46875 130.594 4.40625C133.531 7.34375 135 10.875 135 15V120C135 124.125 133.531 127.656 130.594 130.594C127.656 133.531 124.125 135 120 135H15ZM15 120H120V15H15V120ZM15 15V120V15Z" fill="white" fillOpacity="0.1"/>
                </svg>
              </div>
              <h3 style={{ margin: "0 0 8px", fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: "#ffffff" }}>Blog Manager</h3>
              <p style={{ margin: "0 0 20px", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 400, lineHeight: "20px", letterSpacing: "0px", color: "rgba(17,212,98,0.8)", maxWidth: "260px" }}>Review pending posts, draft new insights, and manage financial news categories.</p>
              <div style={{ display: "flex", gap: "10px" }}>
                {/* Create New Post button — white bg, border #FFFFFF 20%, padding 10/20, radius 8px, dual shadow */}
                <button style={{
                  width: "153.52px", height: "42px", borderRadius: "8px",
                  background: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700,
                  color: "#0B4634", cursor: "pointer",
                  padding: "10px 20px",
                  boxShadow: "0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)",
                }}>Create New Post</button>
                {/* Manage Archive button — same specs, green-tinted bg */}
                <button style={{
                  width: "153.52px", height: "42px", borderRadius: "8px",
                  background: "rgba(17,212,98,0.2)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700,
                  color: "#ffffff", cursor: "pointer",
                  padding: "10px 20px",
                  boxShadow: "0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)",
                }}>Manage Archive</button>
              </div>
            </div>

            {/* Community Moderator */}
            <div className="card" style={{ padding: "22px 26px", position: "relative", overflow: "hidden" }}>
              {/* Chat bubble decorative icon */}
              <div style={{ position: "absolute", right: "16px", bottom: "12px" }}>
                <svg width="135" height="135" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M150 150L120 120H45C40.875 120 37.3438 118.531 34.4062 115.594C31.4688 112.656 30 109.125 30 105V97.5H112.5C116.625 97.5 120.156 96.0312 123.094 93.0938C126.031 90.1562 127.5 86.625 127.5 82.5V30H135C139.125 30 142.656 31.4688 145.594 34.4062C148.531 37.3438 150 40.875 150 45V150ZM15 76.3125L23.8125 67.5H97.5V15H15V76.3125ZM0 112.5V15C0 10.875 1.46875 7.34375 4.40625 4.40625C7.34375 1.46875 10.875 0 15 0H97.5C101.625 0 105.156 1.46875 108.094 4.40625C111.031 7.34375 112.5 10.875 112.5 15V67.5C112.5 71.625 111.031 75.1562 108.094 78.0938C105.156 81.0312 101.625 82.5 97.5 82.5H30L0 112.5ZM15 67.5V15V67.5Z" fill="#F1F5F9"/>
                </svg>
              </div>
              <h3 style={{ margin: "0 0 8px", fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>Community Moderator</h3>
              <p style={{ margin: "0 0 20px", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#64748B", maxWidth: "280px" }}>Monitor forum discussions, resolve flags, and engage with MoneyMati members.</p>
              <div style={{ display: "flex", gap: "10px" }}>
                {/* Open Dashboard — dark filled, radius 8, same shadow */}
                <button style={{
                  width: "154.64px", height: "42px", borderRadius: "8px",
                  background: "#0f172a", border: "none",
                  fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700,
                  color: "#ffffff", cursor: "pointer", padding: "10px 20px",
                  boxShadow: "0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)",
                }}>Open Dashboard</button>
                {/* View 12 Pending Flags — white bg, same shadow */}
                <button style={{
                  width: "154.64px", height: "42px", borderRadius: "8px",
                  background: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700,
                  color: "#0f172a", cursor: "pointer", padding: "10px 20px",
                  boxShadow: "0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)",
                }}>View 12 Pending Flags</button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center", fontSize: "11.5px", color: "#9ab09e", paddingBottom: "8px" }}>
            © 2025 MoneyMati. All administrative rights reserved.
          </div>
        </main>
      </div>
    </div>
  );
}