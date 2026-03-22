"use client";

import React from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-dm-sans" });

const activities = [
  {
    id: 1,
    icon: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 10V7H14V5H17V2H19V5H22V7H19V10H17ZM8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z" fill="#11D462"/>
      </svg>
    ),
    iconBg: "#f0fdf4",
    text: "New member joined the community",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18C6.7 18 4.69583 17.2375 2.9875 15.7125C1.27917 14.1875 0.3 12.2833 0.05 10H2.1C2.33333 11.7333 3.10417 13.1667 4.4125 14.3C5.72083 15.4333 7.25 16 9 16C10.95 16 12.6042 15.3208 13.9625 13.9625C15.3208 12.6042 16 10.95 16 9C16 7.05 15.3208 5.39583 13.9625 4.0375C12.6042 2.67917 10.95 2 9 2C7.85 2 6.775 2.26667 5.775 2.8C4.775 3.33333 3.93333 4.06667 3.25 5H6V7H0V1H2V3.35C2.85 2.28333 3.8875 1.45833 5.1125 0.875C6.3375 0.291667 7.63333 0 9 0C10.25 0 11.4208 0.2375 12.5125 0.7125C13.6042 1.1875 14.5542 1.82917 15.3625 2.6375C16.1708 3.44583 16.8125 4.39583 17.2875 5.4875C17.7625 6.57917 18 7.75 18 9C18 10.25 17.7625 11.4208 17.2875 12.5125C16.8125 13.6042 16.1708 14.5542 15.3625 15.3625C14.5542 16.1708 13.6042 16.8125 12.5125 17.2875C11.4208 17.7625 10.25 18 9 18ZM11.8 13.2L8 9.4V4H10V8.6L13.2 11.8L11.8 13.2Z" fill="#94A3B8"/>
      </svg>
    ),
    iconBg: "#f8fafc",
    text: "Waiting for new discussions to start...",
    time: "",
    muted: true,
  },
];

const forumStatuses = [
  {
    label: "Unread Posts",
    borderColor: "#bbf7d0",
    icon: (
      <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.06667 14L3.8 11.8667L1.4 11.3333L1.63333 8.86667L0 7L1.63333 5.13333L1.4 2.66667L3.8 2.13333L5.06667 0L7.33333 0.966667L9.6 0L10.8667 2.13333L13.2667 2.66667L13.0333 5.13333L14.6667 7L13.0333 8.86667L13.2667 11.3333L10.8667 11.8667L9.6 14L7.33333 13.0333L5.06667 14ZM5.63333 12.3L7.33333 11.5667L9.06667 12.3L10 10.7L11.8333 10.2667L11.6667 8.4L12.9 7L11.6667 5.56667L11.8333 3.7L10 3.3L9.03333 1.7L7.33333 2.43333L5.6 1.7L4.66667 3.3L2.83333 3.7L3 5.56667L1.76667 7L3 8.4L2.83333 10.3L4.66667 10.7L5.63333 12.3ZM6.63333 9.36667L10.4 5.6L9.46667 4.63333L6.63333 7.46667L5.2 6.06667L4.26667 7L6.63333 9.36667Z" fill="#11D462"/>
      </svg>
    ),
  },
  {
    label: "No Unread",
    borderColor: "#e2e8f0",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.73333 9.73333L10.4333 5.03333L9.5 4.1L5.73333 7.86667L3.83333 5.96667L2.9 6.9L5.73333 9.73333ZM6.66667 13.3333C5.74444 13.3333 4.87778 13.1583 4.06667 12.8083C3.25556 12.4583 2.55 11.9833 1.95 11.3833C1.35 10.7833 0.875 10.0778 0.525 9.26667C0.175 8.45555 0 7.58889 0 6.66667C0 5.74444 0.175 4.87778 0.525 4.06667C0.875 3.25556 1.35 2.55 1.95 1.95C2.55 1.35 3.25556 0.875 4.06667 0.525C4.87778 0.175 5.74444 0 6.66667 0C7.58889 0 8.45555 0.175 9.26667 0.525C10.0778 0.875 10.7833 1.35 11.3833 1.95C11.9833 2.55 12.4583 3.25556 12.8083 4.06667C13.1583 4.87778 13.3333 5.74444 13.3333 6.66667C13.3333 7.58889 13.1583 8.45555 12.8083 9.26667C12.4583 10.0778 11.9833 10.7833 11.3833 11.3833C10.7833 11.9833 10.0778 12.4583 9.26667 12.8083C8.45555 13.1583 7.58889 13.3333 6.66667 13.3333ZM6.66667 12C8.15556 12 9.41667 11.4833 10.45 10.45C11.4833 9.41667 12 8.15556 12 6.66667C12 5.17778 11.4833 3.91667 10.45 2.88333C9.41667 1.85 8.15556 1.33333 6.66667 1.33333C5.17778 1.33333 3.91667 1.85 2.88333 2.88333C1.85 3.91667 1.33333 5.17778 1.33333 6.66667C1.33333 8.15556 1.85 9.41667 2.88333 10.45C3.91667 11.4833 5.17778 12 6.66667 12Z" fill="#94A3B8"/>
      </svg>
    ),
  },
  {
    label: "Locked",
    borderColor: "#fecaca",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
  },
];

export default function CommunitySpotlight() {
  return (
    <section
      className={`${playfair.variable} ${dmSans.variable}`}
      style={{
        backgroundColor: "#f5f0e8",
        padding: "40px 48px 48px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "380px 1fr",
          gap: "24px",
          alignItems: "stretch",
        }}
      >
        {/* ── Network Spotlight Card ── */}
        <div
          style={{
            background: "linear-gradient(135deg, #214533, #047857)",
            borderRadius: "20px",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shield watermark */}
          <div style={{ position: "absolute", top: "16px", right: "20px" }}>
            <svg width="118" height="139" viewBox="0 0 118 139" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.1">
                <path d="M53.0667 88.2667L83.2 58.1333L75.6 50.5333L53.0667 73.0667L41.8667 61.8667L34.2667 69.4667L53.0667 88.2667ZM58.6667 122.667C46.3111 119.556 36.1111 112.467 28.0667 101.4C20.0222 90.3333 16 78.0444 16 64.5333V32L58.6667 16L101.333 32V64.5333C101.333 78.0444 97.3111 90.3333 89.2667 101.4C81.2222 112.467 71.0222 119.556 58.6667 122.667ZM58.6667 111.467C67.9111 108.533 75.5556 102.667 81.6 93.8667C87.6444 85.0667 90.6667 75.2889 90.6667 64.5333V39.3333L58.6667 27.3333L26.6667 39.3333V64.5333C26.6667 75.2889 29.6889 85.0667 35.7333 93.8667C41.7778 102.667 49.4222 108.533 58.6667 111.467Z" fill="white"/>
              </g>
            </svg>
          </div>

          {/* Badge */}
          <div style={{ alignSelf: "flex-start" }}>
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255,255,255,0.15)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#ffffff",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              Network Spotlight
            </span>
          </div>

          {/* Member info */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#065f46",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Image
                src="/DilipSingh.svg"
                alt="DilipSingh"
                fill
                style={{ objectFit: "cover" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#ffffff",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  lineHeight: 1.2,
                }}
              >
                DilipSingh
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  marginTop: "4px",
                }}
              >
                Newest Member
              </div>
            </div>
          </div>

          {/* View Profile button */}
          <button
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 700,
              color: "#004D40",
              fontFamily: "var(--font-dm-sans), sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            View Profile
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#004D40" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* ── Community Activity Card ── */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: 700,
                color: "#1a1a1a",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              Community Activity
            </h3>
            <a
              href="#"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#214533",
                textDecoration: "none",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              View All Activity
            </a>
          </div>

          {/* Activity list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {activities.map((a, i) => (
              <div key={a.id}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 0" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: a.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {a.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: a.muted ? 400 : 500,
                        color: a.muted ? "#94a3b8" : "#1a1a1a",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                      }}
                    >
                      {a.text}
                    </div>
                    {a.time && (
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#94a3b8",
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          marginTop: "2px",
                        }}
                      >
                        {a.time}
                      </div>
                    )}
                  </div>
                </div>
                {i < activities.length - 1 && (
                  <div style={{ height: "1px", backgroundColor: "#f1f5f9" }} />
                )}
              </div>
            ))}
          </div>

          {/* Forum Status */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "auto",
              paddingTop: "8px",
              borderTop: "1px solid #f1f5f9",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "#94a3b8",
                fontFamily: "var(--font-dm-sans), sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              Forum Status:
            </span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {forumStatuses.map((s) => (
                <div
                  key={s.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    border: `1px solid ${s.borderColor}`,
                    backgroundColor: "#eef2f7",
                    cursor: "pointer",
                  }}
                >
                  {s.icon}
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#1e293b",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}