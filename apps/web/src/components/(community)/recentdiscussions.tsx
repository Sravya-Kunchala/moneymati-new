"use client";

import React, { useState } from "react";
import { Playfair_Display, DM_Sans, Inter } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-dm-sans" });
const inter = Inter({ subsets: ["latin"], weight: ["700"], variable: "--font-inter" });

interface Discussion {
  id: number;
  title: string;
  author: string;
  timeAgo: string;
  category: string;
  replies: number;
  views: string;
  lastPostUser?: string;
  lastPostAvatar?: string;
  isHot?: boolean;
  authorAvatar?: string;
  online?: boolean;
}

const discussions: Discussion[] = [
  {
    id: 1,
    title: "Strategy for 2024 Index Fund Diversification",
    author: "Alexander Pierce",
    timeAgo: "2 hours ago",
    category: "Investing",
    replies: 142,
    views: "2.1k",
    lastPostUser: "Sarah M.",
    lastPostAvatar: "/sarah.svg",
    isHot: true,
    authorAvatar: "/alexander.svg",
    online: true,
  },
  {
    id: 2,
    title: "Impact of Interest Rates on Real Estate REITs?",
    author: "Marcus Thorne",
    timeAgo: "5 hours ago",
    category: "Real Estate",
    replies: 56,
    views: "890",
    lastPostUser: undefined,
    authorAvatar: "/marcus.svg",
    online: false,
  },
  {
    id: 3,
    title: "New Tax Regulations for Crypto Assets Explained",
    author: "Elena Gilbert",
    timeAgo: "Yesterday",
    category: "Tax Planning",
    replies: 312,
    views: "5.4k",
    lastPostUser: "James K.",
    lastPostAvatar: "/james.svg",
    authorAvatar: "/elena.svg",
    online: true,
  },
];

const categories = ["All Categories", "Investing", "Real Estate", "Tax Planning", "NPS", "Budgeting"];

const DiagonalLine = ({ top, opacity }: { top: string; opacity: number }) => (
  <div style={{
    position: "absolute",
    top,
    left: 0,
    right: 0,
    zIndex: 0,
    pointerEvents: "none",
    height: "400px",
    overflow: "hidden",
  }}>
    <svg width="965" height="306" viewBox="0 0 965 306" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", opacity }}>
      <path d="M0 305.5C15.4354 299.924 31.8263 293.98 47.2054 288.444C190.536 236.862 333.766 186.541 477.968 138.103C622.177 90.5243 766.394 40.9642 914.866 7.55337C930.335 4.39589 948.679 1.0486 964.5 0C948.674 0.982021 930.312 4.26774 914.829 7.36718C766.199 40.2597 621.867 89.5736 477.65 137.155C333.437 185.597 190.289 236.175 47.1406 288.266C31.7818 293.858 15.4126 299.861 0 305.5Z" fill="#677E73"/>
    </svg>
  </div>
);

const DiscussionRow: React.FC<{ discussion: Discussion }> = ({ discussion }) => (
  <div
    style={{
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "20px 24px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      cursor: "pointer",
      transition: "box-shadow 0.2s ease",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
    }}
  >
    {/* Author Avatar */}
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          backgroundColor: "#c8d5b9",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src={discussion.authorAvatar || ""}
          alt={discussion.author}
          fill
          style={{ objectFit: "cover" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>
      {discussion.online && (
        <span
          style={{
            position: "absolute",
            bottom: "1px",
            right: "1px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#11D462",
            border: "2px solid #fff",
          }}
        />
      )}
    </div>

    {/* Main Content */}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
        {discussion.isHot && (
          <span
            style={{
              padding: "2px 8px",
              borderRadius: "6px",
              backgroundColor: "#FEF3C7",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              color: "#D97706",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            Hot Topic
          </span>
        )}
        <span
          style={{
            fontSize: "13px",
            color: "#94a3b8",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 400,
          }}
        >
          By {discussion.author} • {discussion.timeAgo}
        </span>
      </div>

      {/* Title — updated to Figma specs */}
      <h3
        style={{
          margin: "0 0 8px",
          fontSize: "20px",
          fontWeight: 700,
          color: "#0F172A",
          fontFamily: "var(--font-inter), Inter, sans-serif",
          lineHeight: "28px",
          letterSpacing: "0px",
        }}
      >
        {discussion.title}
      </h3>

      <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "#f1f5f9", borderRadius: "9999px", padding: "4px 10px" }}>
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.16667 9.33333C0.845833 9.33333 0.571181 9.2191 0.342708 8.99063C0.114236 8.76215 0 8.4875 0 8.16667V1.16667C0 0.845833 0.114236 0.571181 0.342708 0.342708C0.571181 0.114236 0.845833 0 1.16667 0H4.66667L5.83333 1.16667H10.5C10.8208 1.16667 11.0955 1.2809 11.324 1.50937C11.5524 1.73785 11.6667 2.0125 11.6667 2.33333V8.16667C11.6667 8.4875 11.5524 8.76215 11.324 8.99063C11.0955 9.2191 10.8208 9.33333 10.5 9.33333H1.16667ZM1.16667 8.16667H10.5V2.33333H5.35208L4.18542 1.16667H1.16667V8.16667ZM1.16667 8.16667V1.16667V2.33333V8.16667Z" fill="#64748B"/>
        </svg>
        <span
          style={{
            fontSize: "12px",
            color: "#64748b",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 400,
          }}
        >
          {discussion.category}
        </span>
      </div>
    </div>

    {/* Stats */}
    <div style={{ display: "flex", alignItems: "center", gap: "32px", flexShrink: 0 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1 }}>
          {discussion.replies}
        </div>
        <div style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.5px", textTransform: "uppercase", marginTop: "4px" }}>
          Replies
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1 }}>
          {discussion.views}
        </div>
        <div style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.5px", textTransform: "uppercase", marginTop: "4px" }}>
          Views
        </div>
      </div>

      <div style={{ minWidth: "80px", textAlign: "left" }}>
        {discussion.lastPostUser ? (
          <>
            <div style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "6px" }}>
              Last Post
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#e2e8f0", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                <Image
                  src={discussion.lastPostAvatar || ""}
                  alt={discussion.lastPostUser}
                  fill
                  style={{ objectFit: "cover" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                {discussion.lastPostUser}
              </span>
            </div>
          </>
        ) : (
          <span style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "var(--font-dm-sans), sans-serif", fontStyle: "italic" }}>
            No replies yet.
          </span>
        )}
      </div>
    </div>
  </div>
);

export default function RecentDiscussions() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  return (
    <section
      className={`${playfair.variable} ${dmSans.variable} ${inter.className}`}
      style={{
        backgroundColor: "#F8F6F1",
        padding: "60px 48px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Diagonal lines */}
      <DiagonalLine top="-60px" opacity={0.4} />
      <DiagonalLine top="-20px" opacity={0.25} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px", position: "relative", zIndex: 1 }}>

        {/* Search + Filter + Add Topic */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>

          {/* Search bar */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              height: "64px",
              paddingTop: "21.5px",
              paddingBottom: "21.5px",
              paddingRight: "24px",
              paddingLeft: "56px",
              border: "none",
              boxShadow: "0 4px 6px -4px rgba(6,78,59,0.05), 0 10px 15px -3px rgba(6,78,59,0.05)",
            }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search discussions, investment topics, or members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "14px",
                color: "#1a1a1a",
                backgroundColor: "transparent",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            />
          </div>

          {/* Category dropdown */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              paddingLeft: "20px",
              paddingRight: "20px",
              height: "64px",
              border: "none",
              cursor: "pointer",
              width: "224px",
              boxShadow: "0 4px 6px -4px rgba(6,78,59,0.05), 0 10px 15px -3px rgba(6,78,59,0.05)",
            }}
          >
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                fontSize: "14px",
                color: "#1a1a1a",
                backgroundColor: "transparent",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 500,
                cursor: "pointer",
                width: "100%",
              }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Add Topic button */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "0 24px",
              height: "64px",
              borderRadius: "9999px",
              backgroundColor: "#004D40",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "var(--font-dm-sans), sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            Add Topic
          </button>
        </div>

        {/* Recent Discussions heading */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20L16 16H6C5.45 16 4.97917 15.8042 4.5875 15.4125C4.19583 15.0208 4 14.55 4 14V13H15C15.55 13 16.0208 12.8042 16.4125 12.4125C16.8042 12.0208 17 11.55 17 11V4H18C18.55 4 19.0208 4.19583 19.4125 4.5875C19.8042 4.97917 20 5.45 20 6V20ZM2 10.175L3.175 9H13V2H2V10.175ZM0 15V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H13C13.55 0 14.0208 0.195833 14.4125 0.5875C14.8042 0.979167 15 1.45 15 2V9C15 9.55 14.8042 10.0208 14.4125 10.4125C14.0208 10.8042 13.55 11 13 11H4L0 15ZM2 9V2V9Z" fill="#064E3B"/>
          </svg>
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: 700,
              color: "#1a1a1a",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            Recent Discussions
          </h2>
        </div>

        {/* Discussion rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {discussions.map((d) => (
            <DiscussionRow key={d.id} discussion={d} />
          ))}
        </div>

      </div>
    </section>
  );
}