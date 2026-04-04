"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

export default function SideNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      style={{
        width: "240px",
        height: "100vh",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e8ede9",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Sans', sans-serif",
        flexShrink: 0,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');

        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13.5px;
          font-weight: 500;
          color: #5a7060;
          transition: all 0.15s ease;
          user-select: none;
          margin: 1px 0;
        }
        .nav-item:hover {
          background: #f0f5f1;
          color: #1a3a22;
        }
        .nav-item.active {
          background: #e8f0ea;
          color: #1a3a22;
          font-weight: 600;
        }
        .nav-item .icon {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 6px;
          background: transparent;
          transition: background 0.15s ease;
        }
        .nav-item.active .icon {
          background: #0e3d27;
          color: #ffffff;
        }
        .nav-item:hover:not(.active) .icon {
          background: #d4e6d8;
        }
      `}</style>

      {/* Logo */}
      <div
        style={{
          padding: "20px 16px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderBottom: "1px solid #f0f5f1",
          marginBottom: "8px",
        }}
      >
        <img
          src="/best new moneymati logo.svg"
          alt="MoneyMati logo"
          style={{ width: "36px", height: "36px", flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "17px",
            color: "#0e3d27",
            letterSpacing: "-0.2px",
          }}
        >
          MoneyMati
        </span>
      </div>

      {/* Nav Items */}
      <div style={{ padding: "0 8px", flex: 1, overflowY: "auto" }}>

        {/* Dashboard */}
        <div
          className={`nav-item ${isActive("/dashboard") && !isActive("/blog") && !isActive("/webinar") && !isActive("/ebooks") ? "active" : ""}`}
          onClick={() => router.push("/dashboard")}
        >
          <span className="icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9" />
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9" />
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9" />
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9" />
            </svg>
          </span>
          Dashboard
        </div>

        {/* CONTENT section label */}
        <div
          style={{
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#9ab09e",
            padding: "0 12px",
            marginTop: "20px",
            marginBottom: "4px",
          }}
        >
          CONTENT
        </div>

        {/* Blog */}
        <div
          className={`nav-item ${isActive("/blog") ? "active" : ""}`}
          onClick={() => router.push("/blog")}
        >
          <span className="icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <line x1="5" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="5" y1="10.5" x2="8.5" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          Blog
        </div>

        {/* Manage Blogs */}
        <div
          className="nav-item"
          onClick={() => router.push("/manageblog")}
        >
          <span className="icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <line x1="5" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="5" y1="10.5" x2="8.5" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          Manage Blogs
        </div>

        {/* Webinar Management */}
        <div
          className="nav-item"
          onClick={() => router.push("/webiner")}
        >
          <span className="icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="5.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="10.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.4" />
              <path d="M1.5 13c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M10.5 9.5c1.5 0 4 .8 4 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          Webinar Management
        </div>

        {/* E-Books Management */}
        <div
          className={`nav-item ${isActive("/ebooks") ? "active" : ""}`}
          onClick={() => router.push("/e-bookmanager")}
        >
          <span className="icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              <line x1="5.5" y1="5.5" x2="10.5" y2="5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="5.5" y1="8" x2="10.5" y2="8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="5.5" y1="10.5" x2="8.5" y2="10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <rect x="2" y="2" width="2" height="12" rx="1" fill="currentColor" opacity="0.25" />
            </svg>
          </span>
          E-Books Management
        </div>

      </div>

      {/* Settings
      <div style={{ padding: "12px 8px 20px", borderTop: "1px solid #f0f5f1" }}>
        <div
          className={`nav-item ${isActive("/dashboard/settings") ? "active" : ""}`}
          onClick={() => router.push("/dashboard/settings")}
        >
          <span className="icon" style={{ background: "transparent", color: "#5a7060" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          Settings
        </div>
      </div>*/}

      {/* Logout */}
      <div style={{ padding: "12px 8px 20px", borderTop: "1px solid #f0f5f1" }}>
        <div
          className="nav-item"
          onClick={async () => {
            try {
              await fetch("/api/logout", { method: "POST" });
            } catch (e) {
              console.warn("Logout failed, redirecting anyway", e);
            } finally {
              router.push("/admin/signin");
            }
          }}
        >
          <span className="icon" style={{ background: "transparent", color: "#dc2626" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 2H3.5A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M10.5 11.5 14 8l-3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 8h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          Logout
        </div>
      </div>
    </nav>
  );
}
