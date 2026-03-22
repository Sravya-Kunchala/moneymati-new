"use client";

import React, { useState } from "react";
import SideNav from "@/components/sidenav";
import TopNav from "@/components/topnav";

export default function NewBlogPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [slug, setSlug] = useState("investment-guide");
  const [category, setCategory] = useState("Investment 101");
  const [status, setStatus] = useState("Draft");
  const [isDragging, setIsDragging] = useState(false);

  const sectionLabel = {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    color: "#64748b",
    marginBottom: "8px",
    display: "block",
  } as React.CSSProperties;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; }

        .input-base {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #1a3a22;
          background: #ffffff;
          outline: none;
          transition: border-color 0.15s;
        }
        .input-base:focus { border-color: #0e3d27; }
        .input-base::placeholder { color: #94a3b8; }

        textarea.input-base { resize: none; }

        .toolbar-btn {
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 6px; cursor: pointer; border: none;
          background: transparent; color: #475569;
          font-size: 13px; font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.12s;
        }
        .toolbar-btn:hover { background: #e8f0ea; color: #0e3d27; }

        .breadcrumb-link {
          font-size: 13px; color: #64748b; cursor: pointer;
          text-decoration: none; transition: color 0.12s;
        }
        .breadcrumb-link:hover { color: #0e3d27; }

        .btn-save {
          height: 36px; padding: 0 18px;
          background: #f1f5f9; border: 1px solid #e2e8f0;
          border-radius: 8px; font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600; color: #1a3a22;
          cursor: pointer; transition: background 0.15s;
        }
        .btn-save:hover { background: #e2e8f0; }

        .btn-publish {
          height: 36px; padding: 0 18px;
          background: #0e3d27; border: none;
          border-radius: 8px; font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600; color: #ffffff;
          cursor: pointer; transition: opacity 0.15s;
        }
        .btn-publish:hover { opacity: 0.88; }

        .btn-preview {
          height: 36px; padding: 0 14px;
          background: transparent; border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500; color: #475569;
          cursor: pointer; transition: color 0.15s;
        }
        .btn-preview:hover { color: #0e3d27; }

        .tag {
          display: inline-flex; align-items: center; gap: 5px;
          background: #dcfce7; color: #166534;
          font-size: 11px; font-weight: 600;
          padding: 3px 8px; border-radius: 99px;
        }
        .tag-remove { cursor: pointer; opacity: 0.6; font-size: 12px; }
        .tag-remove:hover { opacity: 1; }

        .revision-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 4px;
        }

        .drop-zone {
          border: 1.5px dashed #cbd5e1;
          border-radius: 10px;
          background: #f8fafc;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px; padding: 32px 20px;
          cursor: pointer; transition: border-color 0.15s, background 0.15s;
        }
        .drop-zone:hover, .drop-zone.dragging {
          border-color: #0e3d27; background: #f0fdf4;
        }

        select.input-base { appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px; }

        .sidebar-right::-webkit-scrollbar { width: 4px; }
        .sidebar-right::-webkit-scrollbar-track { background: transparent; }
        .sidebar-right::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }
      `}</style>

      {/* ── Left SideNav ── */}
      <SideNav />

      {/* ── Main area ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopNav />

        {/* ── Sub-header breadcrumb bar ── */}
        <div style={{
          height: "50px", background: "#ffffff",
          borderBottom: "1px solid #e8ede9",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span className="breadcrumb-link">Blog</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#1a3a22" }}>New Educational Post</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>Last saved: 2 minutes ago</span>
            <button className="btn-preview">Preview</button>
            <button className="btn-save">Save Draft</button>
            <button className="btn-publish">Publish Post</button>
          </div>
        </div>

        {/* ── Content area ── */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden", backgroundColor: "#f1f5f9" }}>

          {/* ── Left/Main editor ── */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>

            {/* POST TITLE */}
            <div style={{ marginBottom: "24px" }}>
              <span style={sectionLabel}>POST TITLE</span>
              <input
                type="text"
                className="input-base"
                placeholder="How to start your investment journey..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  fontSize: "22px", fontWeight: 600, border: "none",
                  borderBottom: "1.5px solid #e2e8f0", borderRadius: 0,
                  padding: "8px 0", background: "transparent", color: "#94a3b8",
                }}
              />
            </div>

            {/* FEATURED IMAGE */}
            <div style={{ marginBottom: "24px" }}>
              <span style={sectionLabel}>FEATURED IMAGE</span>
              <div
                className={`drop-zone ${isDragging ? "dragging" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="2" y="4" width="28" height="22" rx="3" stroke="#cbd5e1" strokeWidth="1.8"/>
                  <circle cx="10" cy="12" r="2.5" fill="#cbd5e1"/>
                  <path d="M2 20l8-6 6 5 4-3 10 7" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 2v8M17 5l3-3 3 3" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p style={{ margin: 0, fontSize: "13.5px", color: "#64748b", textAlign: "center" }}>
                  Drag and drop your image here, or{" "}
                  <span style={{ color: "#0e3d27", fontWeight: 600, cursor: "pointer" }}>browse files</span>
                </p>
                <p style={{ margin: 0, fontSize: "11.5px", color: "#94a3b8" }}>Recommended: 1200 × 630px (Max 5MB)</p>
              </div>
            </div>

            {/* CONTENT EDITOR */}
            <div style={{ marginBottom: "24px" }}>
              <span style={sectionLabel}>CONTENT EDITOR</span>
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
                {/* Toolbar */}
                <div style={{ display: "flex", alignItems: "center", gap: "2px", padding: "8px 12px", borderBottom: "1px solid #f0f5f1", flexWrap: "wrap" }}>
                  {[
                    { label: "B", title: "Bold" },
                    { label: "I", title: "Italic", style: { fontStyle: "italic" } },
                  ].map((b) => (
                    <button key={b.label} className="toolbar-btn" title={b.title} style={b.style}>{b.label}</button>
                  ))}
                  {/* List */}
                  <button className="toolbar-btn" title="List">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><line x1="5" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="5" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="5" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="2" cy="3" r="1" fill="currentColor"/><circle cx="2" cy="7" r="1" fill="currentColor"/><circle cx="2" cy="11" r="1" fill="currentColor"/></svg>
                  </button>
                  {/* Link */}
                  <button className="toolbar-btn" title="Link">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 8.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5L6 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M8.5 5.5a3.5 3.5 0 00-5 0L1.5 7.5a3.5 3.5 0 005 5L8 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  </button>
                  <div style={{ width: "1px", height: "18px", background: "#e2e8f0", margin: "0 4px" }} />
                  <button className="toolbar-btn" title="H1" style={{ fontSize: "11px", fontWeight: 700, width: "auto", padding: "0 6px" }}>H1</button>
                  <button className="toolbar-btn" title="H2" style={{ fontSize: "11px", fontWeight: 700, width: "auto", padding: "0 6px" }}>H2</button>
                  {/* Quote */}
                  <button className="toolbar-btn" title="Quote" style={{ fontSize: "15px", fontWeight: 700 }}>"</button>
                  {/* Image */}
                  <button className="toolbar-btn" title="Image">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="4.5" cy="5.5" r="1.2" fill="currentColor"/><path d="M1 10l3.5-3 3 2.5 2-2 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                {/* Editor area */}
                <textarea
                  className="input-base"
                  placeholder="Start writing your educational content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ border: "none", borderRadius: 0, minHeight: "220px", padding: "16px", fontSize: "14px", lineHeight: "1.6", resize: "none" }}
                />
              </div>
            </div>

            {/* EXCERPT / SUMMARY */}
            <div style={{ marginBottom: "24px" }}>
              <span style={sectionLabel}>EXCERPT / SUMMARY</span>
              <textarea
                className="input-base"
                placeholder="A brief summary for the blog listing page..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                style={{ minHeight: "90px", fontSize: "13.5px", lineHeight: "1.6" }}
              />
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div
            className="sidebar-right"
            style={{
              width: "350px", flexShrink: 0,
              background: "#ffffff",
              borderLeft: "1px solid #e8ede9",
              overflowY: "auto",
              padding: "20px 18px",
              display: "flex", flexDirection: "column", gap: "22px",
            }}
          >
            {/* Publishing Status */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#64748b" strokeWidth="1.3"/><path d="M7 4v3.5l2 2" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/></svg>
                <span style={sectionLabel}>PUBLISHING STATUS</span>
              </div>
              <select className="input-base" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Draft</option>
                <option>Published</option>
                <option>Scheduled</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 2h4l6 6-4 4-6-6V2z" stroke="#64748b" strokeWidth="1.3" strokeLinejoin="round"/><circle cx="4.5" cy="4.5" r="1" fill="#64748b"/></svg>
                <span style={sectionLabel}>CATEGORY</span>
              </div>
              <select className="input-base" value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginBottom: "10px" }}>
                <option>Investment 101</option>
                <option>Tax Planning</option>
                <option>Financial News</option>
              </select>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                <span className="tag">INVESTMENT <span className="tag-remove">×</span></span>
              </div>
            </div>

            {/* SEO Settings */}
            <div>
              <span style={{ ...sectionLabel, marginBottom: "14px" }}>SEO SETTINGS</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 500, display: "block", marginBottom: "5px" }}>Meta Title</label>
                  <input type="text" className="input-base" placeholder="SEO optimized title" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 500, display: "block", marginBottom: "5px" }}>Meta Description</label>
                  <textarea className="input-base" placeholder="Describe the post for search results..." value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} style={{ minHeight: "72px", fontSize: "12.5px" }} />
                </div>
                <div>
                  <label style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 500, display: "block", marginBottom: "5px" }}>URL Slug</label>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
                    <span style={{ padding: "9px 10px", background: "#f8fafc", fontSize: "11px", color: "#94a3b8", borderRight: "1px solid #e2e8f0", whiteSpace: "nowrap", flexShrink: 0 }}>moneymati.com/blog/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      style={{ flex: 1, border: "none", outline: "none", padding: "9px 10px", fontSize: "12px", color: "#1a3a22", fontFamily: "'DM Sans', sans-serif", background: "#ffffff" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Revisions */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={sectionLabel}>REVISIONS</span>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#0e3d27", cursor: "pointer" }}>VIEW ALL</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div className="revision-dot" style={{ background: "#22c55e" }} />
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 600, color: "#1a3a22" }}>Current Version</div>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>by Swathi • Today, 10:42 AM</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div className="revision-dot" style={{ background: "#cbd5e1" }} />
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 600, color: "#1a3a22" }}>Previous Draft</div>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>by Swathi • Yesterday, 4:15 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}