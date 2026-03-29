"use client";

import React, { useState } from "react";
import SideNav from "@/components/sidenav";
import TopNav from "@/components/topnav";

// ── Data ─────────────────────────────────────────────────────
const initialPosts = [
  {
    id: 1,
    title: "The Architecture of Sovereign Wealth",
    author: "Swathi",
    date: "Oct 24, 2025",
    status: "published",
    thumb: "📊",
    thumbBg: "#e8f0ea",
  },
  {
    id: 2,
    title: "Navigating High-Frequency Markets",
    author: "Swathi",
    date: "Oct 21, 2025",
    status: "hidden",
    thumb: "🌐",
    thumbBg: "#eff6ff",
  },
  {
    id: 3,
    title: "The Future of Digital Assets in 2025",
    author: "Swathi",
    date: "Oct 19, 2025",
    status: "draft",
    thumb: "🪴",
    thumbBg: "#f0fdf4",
  },
  {
    id: 4,
    title: "Understanding Compound Interest Strategies",
    author: "Swathi",
    date: "Oct 15, 2025",
    status: "published",
    thumb: "💹",
    thumbBg: "#faf5ff",
  },
  {
    id: 5,
    title: "Diversification in Modern Portfolios",
    author: "Swathi",
    date: "Oct 10, 2025",
    status: "draft",
    thumb: "📈",
    thumbBg: "#fff7ed",
  },
  {
    id: 6,
    title: "Tax-Loss Harvesting: A Deep Dive",
    author: "Swathi",
    date: "Oct 05, 2025",
    status: "hidden",
    thumb: "🔍",
    thumbBg: "#fef2f2",
  },
];

const TABS = ["All Posts", "Published", "Hidden", "Drafts"];
const POSTS_PER_PAGE = 3;

const statusConfig = {
  published: { label: "PUBLISHED", color: "#16a34a", bg: "#f0fdf4", dot: "#22c55e" },
  hidden:    { label: "HIDDEN",    color: "#64748b", bg: "#f1f5f9", dot: "#94a3b8" },
  draft:     { label: "DRAFT",     color: "#b45309", bg: "#fefce8", dot: "#f59e0b" },
};

// ── Icons ─────────────────────────────────────────────────────
const EditIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.6359 16.3109H4.07503L12.8891 7.4968L11.4782 6.07181L2.6359 14.9141V16.3109ZM0 18.9609V13.8065L13.1717 0.645656C13.3906 0.43406 13.635 0.273552 13.9049 0.164131C14.1748 0.0547104 14.4573 0 14.7522 0C15.0377 0 15.3196 0.0547104 15.5978 0.164131C15.8761 0.273552 16.1257 0.437683 16.3468 0.656525L18.3294 2.62177C18.5482 2.83337 18.7106 3.08065 18.8164 3.36362C18.9222 3.6466 18.975 3.93192 18.975 4.21961C18.975 4.51454 18.9222 4.79932 18.8164 5.07396C18.7106 5.3486 18.5482 5.59534 18.3294 5.81418L5.18266 18.9609H0ZM16.1696 4.21961L14.7554 2.79135L16.1696 4.21961ZM12.1782 6.78267L11.4782 6.07181L12.8891 7.4968L12.1782 6.78267Z" fill="#475569"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.4381 12.4381C12.6881 12.4381 13.7506 12.0006 14.6256 11.1256C15.5006 10.2506 15.9381 9.18807 15.9381 7.93807C15.9381 6.68807 15.5006 5.62557 14.6256 4.75057C13.7506 3.87557 12.6881 3.43807 11.4381 3.43807C10.1881 3.43807 9.12557 3.87557 8.25057 4.75057C7.37557 5.62557 6.93807 6.68807 6.93807 7.93807C6.93807 9.18807 7.37557 10.2506 8.25057 11.1256C9.12557 12.0006 10.1881 12.4381 11.4381 12.4381ZM11.4406 10.3413C10.7737 10.3413 10.206 10.1079 9.73753 9.64109C9.26906 9.17428 9.03482 8.60744 9.03482 7.94056C9.03482 7.27368 9.26823 6.70601 9.73504 6.23753C10.2019 5.76906 10.7687 5.53482 11.4356 5.53482C12.1024 5.53482 12.6701 5.76823 13.1386 6.23504C13.6071 6.70185 13.8413 7.2687 13.8413 7.93557C13.8413 8.60245 13.6079 9.17012 13.1411 9.6386C12.6743 10.1071 12.1074 10.3413 11.4406 10.3413ZM11.4381 15.8761C8.89168 15.8761 6.58316 15.1499 4.51251 13.6973C2.44185 12.2448 0.937683 10.325 0 7.93807C0.937683 5.5511 2.44185 3.63135 4.51251 2.17881C6.58316 0.72627 8.89168 0 11.4381 0C13.9844 0 16.293 0.72627 18.3636 2.17881C20.4343 3.63135 21.9384 5.5511 22.8761 7.93807C21.9384 10.325 20.4343 12.2448 18.3636 13.6973C16.293 15.1499 13.9844 15.8761 11.4381 15.8761ZM11.4393 13.4381C13.3124 13.4381 15.0317 12.9399 16.5973 11.9435C18.1629 10.9471 19.3623 9.61198 20.1957 7.93807C19.3623 6.26415 18.1625 4.92901 16.596 3.93263C15.0296 2.93625 13.3099 2.43807 11.4368 2.43807C9.56373 2.43807 7.84441 2.93625 6.27883 3.93263C4.71325 4.92901 3.51379 6.26415 2.68046 7.93807C3.51379 9.61198 4.71367 10.9471 6.28009 11.9435C7.84651 12.9399 9.56625 13.4381 11.4393 13.4381Z" fill="#475569"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:"relative"}}>
    <path d="M11.4381 12.4381C12.6881 12.4381 13.7506 12.0006 14.6256 11.1256C15.5006 10.2506 15.9381 9.18807 15.9381 7.93807C15.9381 6.68807 15.5006 5.62557 14.6256 4.75057C13.7506 3.87557 12.6881 3.43807 11.4381 3.43807C10.1881 3.43807 9.12557 3.87557 8.25057 4.75057C7.37557 5.62557 6.93807 6.68807 6.93807 7.93807C6.93807 9.18807 7.37557 10.2506 8.25057 11.1256C9.12557 12.0006 10.1881 12.4381 11.4381 12.4381ZM11.4406 10.3413C10.7737 10.3413 10.206 10.1079 9.73753 9.64109C9.26906 9.17428 9.03482 8.60744 9.03482 7.94056C9.03482 7.27368 9.26823 6.70601 9.73504 6.23753C10.2019 5.76906 10.7687 5.53482 11.4356 5.53482C12.1024 5.53482 12.6701 5.76823 13.1386 6.23504C13.6071 6.70185 13.8413 7.2687 13.8413 7.93557C13.8413 8.60245 13.6079 9.17012 13.1411 9.6386C12.6743 10.1071 12.1074 10.3413 11.4406 10.3413ZM11.4381 15.8761C8.89168 15.8761 6.58316 15.1499 4.51251 13.6973C2.44185 12.2448 0.937683 10.325 0 7.93807C0.937683 5.5511 2.44185 3.63135 4.51251 2.17881C6.58316 0.72627 8.89168 0 11.4381 0C13.9844 0 16.293 0.72627 18.3636 2.17881C20.4343 3.63135 21.9384 5.5511 22.8761 7.93807C21.9384 10.325 20.4343 12.2448 18.3636 13.6973C16.293 15.1499 13.9844 15.8761 11.4381 15.8761ZM11.4393 13.4381C13.3124 13.4381 15.0317 12.9399 16.5973 11.9435C18.1629 10.9471 19.3623 9.61198 20.1957 7.93807C19.3623 6.26415 18.1625 4.92901 16.596 3.93263C15.0296 2.93625 13.3099 2.43807 11.4368 2.43807C9.56373 2.43807 7.84441 2.93625 6.27883 3.93263C4.71325 4.92901 3.51379 6.26415 2.68046 7.93807C3.51379 9.61198 4.71367 10.9471 6.28009 11.9435C7.84651 12.9399 9.56625 13.4381 11.4393 13.4381Z" fill="#475569"/>
    <line x1="2" y1="1" x2="21" y2="15" stroke="#475569" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.8 7.5c.07.55.5.97 1.05 1H9.15c.55-.03.98-.45 1.05-1L11 4" stroke="#475569" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="6.5" cy="6.5" r="4.5" stroke="#9ab09e" strokeWidth="1.4"/>
    <path d="M10 10l3 3" stroke="#9ab09e" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M7.5 2v11M2 7.5h11" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Main Component ────────────────────────────────────────────
export default function ManageBlogs() {
  const [activeTab, setActiveTab] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(initialPosts);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Filter logic
  const filtered = posts.filter((p) => {
    const matchesTab =
      activeTab === "All Posts" ||
      (activeTab === "Published" && p.status === "published") ||
      (activeTab === "Hidden" && p.status === "hidden") ||
      (activeTab === "Drafts" && p.status === "draft");
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleVisibility = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "hidden" ? "published" : "hidden" }
          : p
      )
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; }
        .card { background: #ffffff; border-radius: 14px; border: 1px solid #e8ede9; }

        /* ── Tab buttons ── */
        .tab-btn {
          padding: 16px 32px; border-radius: 9999px; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all 0.15s; background: #D6DEDA; color: #3d5a45;
          white-space: nowrap; height: 56px; display: inline-flex; align-items: center;
        }
        .tab-btn:hover { background: #c8d4cb; }
        .tab-btn.active { background: #0e3d27; color: #ffffff; }

        /* ── Action icon buttons ── */
        .action-icon-btn {
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; background: transparent; border: none; padding: 4px;
          transition: opacity 0.13s;
        }
        .action-icon-btn:hover { opacity: 0.6; }
        .action-icon-btn.danger:hover { opacity: 0.7; }

        /* ── Table rows ── */
        .blog-row {
          display: grid;
          grid-template-columns: 1fr 140px 130px 120px 110px;
          align-items: center;

          border-radius: 0;
          padding: 14px 16px;
          border-bottom: 1px solid #f0f5f1;
          transition: background 0.12s;
        }
        .blog-row:last-child { border-bottom: none; }
        .blog-row:hover { background: #fafcfa; }

        .blog-header {
          display: grid;
          grid-template-columns: 1fr 140px 130px 120px 110px;
          padding: 0 16px;
          height: 55px;
          align-items: center;
          background: #F6F8F7;
          border-radius: 0;




        }

        /* ── Pagination ── */
        .page-btn {
          width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid #e8ede9;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
          background: #ffffff; color: #5a7060; transition: all 0.15s;
        }
        .page-btn:hover:not(:disabled) { background: #f4f6f4; }
        .page-btn.active { background: #0EAF50; color: #ffffff; border-color: #0EAF50; }
        .page-btn:disabled { opacity: 0.35; cursor: default; }

        /* ── Create blog button ── */
        .create-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 10px 20px; border-radius: 99px; border: none;
          background: #0EAF50; color: #ffffff;
          font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 700;
          cursor: pointer; transition: opacity 0.15s; white-space: nowrap;
        }
        .create-btn:hover { opacity: 0.88; }

        /* ── Search input ── */
        .search-input {
          width: 100%; height: 55px;
          padding: 18px 16px 18px 48px;
          border: none; border-radius: 16px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1a3a22;
          background: #ffffff; outline: none;
          box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
          transition: box-shadow 0.15s;
        }
        .search-input:focus { box-shadow: 0 0 0 2px rgba(14,61,39,0.15), 0 1px 2px 0 rgba(0,0,0,0.05); }
        .search-input::placeholder { color: #9ab09e; }

        /* ── Mobile ── */
        .mobile-topbar {
          display: none; align-items: center; justify-content: space-between;
          padding: 0 16px; height: 52px; background: #ffffff;
          border-bottom: 1px solid #e8ede9;
          position: sticky; top: 0; z-index: 100; flex-shrink: 0;
        }
        .icon-btn {
          width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
          border-radius: 0; border: none; background: transparent;
          cursor: pointer; color: #475569; transition: background 0.12s;
        }
        .icon-btn:hover { background: #f1f5f9; }
        .mobile-nav-overlay {
          display: none; position: fixed; inset: 0;
          background: rgba(0,0,0,0.4); z-index: 40;
        }
        .mobile-nav-panel {
          position: fixed; top: 0; left: 0; bottom: 0;
          width: min(260px, 80vw); background: #fff; z-index: 50;
          transform: translateX(-100%); transition: transform 0.25s ease;
          overflow-y: auto;
        }
        .desktop-topnav { display: block; }

        @media (max-width: 768px) {
          .sidenav-wrapper { display: none !important; }
          .desktop-topnav { display: none !important; }
          .mobile-topbar { display: flex !important; }
          .mobile-nav-overlay { display: block !important; }
          .mobile-nav-panel { display: flex !important; flex-direction: column; }

          .page-root { flex-direction: column !important; height: auto !important; overflow: auto !important; }
          .page-main { overflow: visible !important; height: 100vh; display: flex; flex-direction: column; }
          .page-scroll { flex: 1; overflow-y: auto; }
          .page-content { padding: 14px !important; }

          .blog-header { display: none !important; }
          .blog-row {
            display: flex !important; flex-direction: column !important;
            align-items: flex-start !important; gap: 10px !important; padding: 14px 10px !important;
          }
          .row-actions { display: flex; gap: 6px; }
          .tabs-row { flex-wrap: wrap !important; gap: 7px !important; }
          .top-controls { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
        }

        @media (min-width: 769px) {
          .mobile-topbar { display: none !important; }
          .mobile-nav-overlay { display: none !important; }
          .mobile-nav-panel { display: none !important; }
        }

        .mobile-nav-overlay.open { opacity: 1; }
        .mobile-nav-panel.open { transform: translateX(0); }
      `}</style>

      {/* Mobile Nav Overlay */}
      <div
        className={`mobile-nav-overlay${mobileNavOpen ? " open" : ""}`}
        onClick={() => setMobileNavOpen(false)}
      />
      <div className={`mobile-nav-panel${mobileNavOpen ? " open" : ""}`}>
        <SideNav />
      </div>

      {/* Desktop Sidebar */}
      <div className="sidenav-wrapper">
        <SideNav />
      </div>

      {/* Main area */}
      <div className="page-main" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Mobile Top Bar */}
        <div className="mobile-topbar">
          <button className="icon-btn" onClick={() => setMobileNavOpen(true)} aria-label="Open menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", color: "#1a3a22" }}>moneymati</span>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#e8f0ea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#0e3d27" }}>A</div>
        </div>

        {/* Desktop TopNav */}
        <div className="desktop-topnav">
          <TopNav />
        </div>

        {/* Scrollable content */}
        <main className="page-scroll" style={{ flex: 1, overflowY: "auto", backgroundColor: "#f4f6f4" }}>
          <div className="page-content" style={{ padding: "24px" }}>

            {/* Page Header */}
            <div className="top-controls" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
              <div>
                <h1 style={{ margin: 0, fontFamily: "'DM Serif Display', serif", fontSize: "26px", color: "#1a3a22", fontWeight: 400 }}>
                  Manage Blogs
                </h1>
                <p style={{ margin: "5px 0 0", fontSize: "13.5px", color: "#7a9880", fontWeight: 400 }}>
                  The sovereign hub for your architectural wealth insights. Delete, Edit, Hide
                </p>
              </div>
              <button className="create-btn">
                <PlusIcon />
                Create Blog
              </button>
            </div>

            {/* Search + Tabs — outside the table card */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px", flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: "1", minWidth: "200px", maxWidth: "560px" }}>
                <div style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)" }}>
                  <SearchIcon />
                </div>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search blog titles, authors, or keywords..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                />
              </div>
              <div className="tabs-row" style={{ display: "flex", gap: "8px" }}>
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    className={`tab-btn${activeTab === tab ? " active" : ""}`}
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Card */}
            <div className="card" style={{ padding: "0", overflow: "hidden" }}>

              {/* Table Header */}
              <div className="blog-header">
                {["TITLE", "AUTHOR", "DATE", "STATUS", "ACTIONS"].map((h) => (
                  <span key={h} style={{ fontSize: "10px", fontWeight: 700, color: "#9ab09e", letterSpacing: "0.07em" }}>{h}</span>
                ))}
              </div>

              {/* Table Rows */}
              {paginated.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "#9ab09e", fontSize: "13.5px" }}>
                  No posts found.
                </div>
              ) : (
                paginated.map((post) => {
                  const sc = statusConfig[post.status];
                  return (
                    <div key={post.id} className="blog-row">
                      {/* Title */}
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                        <div style={{
                          width: "40px", height: "40px", borderRadius: "10px",
                          background: post.thumbBg, display: "flex", alignItems: "center",
                          justifyContent: "center", fontSize: "18px", flexShrink: 0
                        }}>
                          {post.thumb}
                        </div>
                        <span style={{
                          fontSize: "13.5px", fontWeight: 600, color: "#1a3a22",
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                        }}>
                          {post.title}
                        </span>
                      </div>

                      {/* Author */}
                      <span style={{ fontSize: "13px", color: "#5a7060", fontWeight: 500 }}>{post.author}</span>

                      {/* Date */}
                      <span style={{ fontSize: "12.5px", color: "#7a9880" }}>{post.date}</span>

                      {/* Status badge */}
                      <div>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: "5px",
                          fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em",
                          color: sc.color, background: sc.bg,
                          padding: "4px 10px", borderRadius: "99px"
                        }}>
                          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: sc.dot, display: "inline-block" }} />
                          {sc.label}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="row-actions" style={{ display: "flex", gap: "6px" }}>
                        {/* Edit */}
                        <div className="action-icon-btn" title="Edit">
                          <EditIcon />
                        </div>
                        {/* Toggle visibility */}
                        <div
                          className="action-icon-btn"
                          title={post.status === "hidden" ? "Show" : "Hide"}
                          onClick={() => handleToggleVisibility(post.id)}
                        >
                          {post.status === "hidden" ? <EyeOffIcon /> : <EyeIcon />}
                        </div>
                        {/* Delete */}
                        <div
                          className="action-icon-btn danger"
                          title="Delete"
                          onClick={() => handleDelete(post.id)}
                        >
                          <TrashIcon />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Pagination */}
              {filtered.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px", flexWrap: "wrap", gap: "10px", background: "#ffffff", borderTop: "1px solid rgba(226,232,240,0.3)", height: "89px" }}>
                  <span style={{ fontSize: "12.5px", color: "#9ab09e" }}>
                    Showing{" "}
                    <strong style={{ color: "#1a3a22" }}>
                      {Math.min((currentPage - 1) * POSTS_PER_PAGE + 1, filtered.length)}–{Math.min(currentPage * POSTS_PER_PAGE, filtered.length)}
                    </strong>{" "}
                    of <strong style={{ color: "#1a3a22" }}>{filtered.length}</strong> blog posts
                  </span>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <button
                      className="page-btn"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                      <button
                        key={pg}
                        className={`page-btn${currentPage === pg ? " active" : ""}`}
                        onClick={() => setCurrentPage(pg)}
                      >
                        {pg}
                      </button>
                    ))}
                    <button
                      className="page-btn"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ textAlign: "center", fontSize: "11.5px", color: "#9ab09e", paddingTop: "16px", paddingBottom: "8px" }}>
              © 2026 MoneyMati. All administrative rights reserved.
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}