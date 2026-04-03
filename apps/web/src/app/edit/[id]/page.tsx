"use client";

import React, { useState, useRef } from "react";
import SideNav from "@/components/sidenav";
import TopNav from "@/components/topnav";
import { useRouter, useParams } from "next/navigation";
import { blogArticles } from "@/data/blogs";

const palette = ["#e8f0ea", "#eff6ff", "#f0fdf4", "#faf5ff", "#fff7ed", "#fef2f2"];
const fallbackContent =
  "In the realm of global finance, sovereign wealth represents the pinnacle of institutional investment. This article explores the structural foundations that allow nations to preserve and grow wealth across generations.\n\nHistorically, sovereign funds have acted as stabilizing forces during market volatility. By maintaining a long-term horizon, these entities can capitalize on opportunities that shorter-term investors might overlook...";

// Optional richer bodies per article id (so the editor is never blank)
const bodyById: Record<number, string> = {
  1: `In the realm of global finance, sovereign wealth represents the pinnacle of institutional investment. This article explores the structural foundations that allow nations to preserve and grow wealth across generations.

Historically, sovereign funds have acted as stabilizing forces during market volatility. By maintaining a long-term horizon, these entities can capitalize on opportunities that shorter-term investors might overlook.

We break down governance models, risk frameworks, and the portfolio allocations that keep these funds resilient.`,
  2: `High-frequency markets move in microseconds. To thrive, traders must pair robust infrastructure with disciplined risk controls.

This piece covers matching engine dynamics, latency optimization, colocation, and why kill-switches are essential during anomalous volatility.`,
  3: `Digital assets continue to evolve in 2025. Beyond Bitcoin and Ethereum, tokenized real-world assets and regulated stablecoins are reshaping capital markets.

We examine custody, compliance, and the on-chain data signals that matter most for long-term allocators.`,
};

const initialPosts = blogArticles.map((b, idx) => {
  const status = (b.status as "published" | "draft" | "hidden") ?? "draft";
  const tagsList = (b.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => t.toUpperCase());
  return {
    id: b.id,
    title: b.title,
    author: b.author,
    date: b.date ?? "2025-10-24",
    status,
    thumb: b.image,
    thumbBg: palette[idx % palette.length],
    content: bodyById[b.id] ?? (b.excerpt && b.excerpt.trim().length > 0 ? b.excerpt : fallbackContent),
    isPublic: status !== "hidden",
    isPinned: false,
    publishingMode: status === "published" ? "Published" : status === "draft" ? "Draft" : "Hidden",
    primaryCategory: "Market Analysis",
    tags: tagsList,
    metaTitle: b.title,
    metaDescription: b.excerpt ?? "",
    urlSlug: (b.href ?? "/").replace(/^\//, ""),
  };
});

const revisions = [
  { label: "Current Version", author: "Swathi", date: "Today, 14:32", isCurrent: true },
  { label: "Minor Content Edit", author: "Swathi", date: "Mar 24, 09:13", isCurrent: false },
  { label: "First Draft Created", author: "Swathi", date: "Mar 23, 16:40", isCurrent: false },
];

// ── Icons ──────────────────────────────────────────────────────
const ArrowLeft = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8l5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const GlobeIcon = () => (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#0e3d27" strokeWidth="1.3"/><path d="M7 1c-1.5 1.5-2.5 3.6-2.5 6s1 4.5 2.5 6M7 1c1.5 1.5 2.5 3.6 2.5 6S8.5 11.5 7 13M1 7h12" stroke="#0e3d27" strokeWidth="1.3" strokeLinecap="round"/></svg>);
const PinIcon = () => (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 1.5L12.5 5.5L9.5 8.5L9 11L7 9L3.5 12.5L2 11L5.5 7.5L3.5 5L6 4.5L8.5 1.5Z" stroke="#0e3d27" strokeWidth="1.3" strokeLinejoin="round"/></svg>);
const TagIcon = () => (<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1h4.5l5.5 5.5-4.5 4.5L1 5.5V1z" stroke="#0e3d27" strokeWidth="1.2" strokeLinejoin="round"/><circle cx="3.2" cy="3.2" r="0.8" fill="#0e3d27"/></svg>);
const StatusIcon = () => (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#0e3d27" strokeWidth="1.3"/><path d="M4 7l2 2 4-4" stroke="#0e3d27" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const CloseIcon = ({ size = 10 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>);
const EditPencilIcon = () => (<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1.5 10.5L5 9l5.5-5.5-2-2L3 7 1.5 10.5zM11 1l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const UploadIcon = () => (<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 22V12M16 12L11 17M16 12L21 17" stroke="#9ab09e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 26a6 6 0 01-1-11.9V14a8 8 0 0116 0v.1A6 6 0 0123 26H9z" stroke="#9ab09e" strokeWidth="1.6"/></svg>);
const BoldIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 2h4a2.5 2.5 0 010 5H3.5V2zM3.5 7h4.5a2.5 2.5 0 010 5H3.5V7z" stroke="#475569" strokeWidth="1.3" strokeLinejoin="round"/></svg>;
const ItalicIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 2h5M3.5 12h5M8.5 2L5.5 12" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const UnderlineIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 2v5a3.5 3.5 0 007 0V2M2 12.5h10" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const H1Icon = () => <svg width="20" height="14" viewBox="0 0 20 14" fill="none"><path d="M2 2v10M2 7h6M8 2v10M13 12l2-10 3 8 3-8 2 10" stroke="#475569" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const H2Icon = () => <svg width="20" height="14" viewBox="0 0 20 14" fill="none"><path d="M2 2v10M2 7h6M8 2v10M13 12h5M13 7.5c0-2 5-3.5 5-5.5a2.5 2.5 0 00-5 0" stroke="#475569" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ULIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="2.5" cy="4" r="1" fill="#475569"/><circle cx="2.5" cy="7" r="1" fill="#475569"/><circle cx="2.5" cy="10" r="1" fill="#475569"/><path d="M5 4h7M5 7h7M5 10h7" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const OLIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5V2l-1 .5M2 7H1.5c.5 0 1 .3 1 .8s-.5.7-1 .7H1M5 4h7M5 7h7M5 10h7" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const LinkIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 8.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5L6.5 2.5" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/><path d="M8.5 5.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5L7.5 11.5" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const ImageIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2.5" width="11" height="9" rx="1.5" stroke="#475569" strokeWidth="1.3"/><circle cx="4.5" cy="5.5" r="1" stroke="#475569" strokeWidth="1.1"/><path d="M1.5 9.5l3-3 2.5 2.5 2-2 3 3" stroke="#475569" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const QuoteIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 9c0-2.5 1.5-5 4-6M8 9c0-2.5 1.5-5 4-6" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const ExpandIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2h3v3M5 12H2V9M2 2l5 5M12 12l-5-5" stroke="#475569" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <div onClick={() => onChange(!checked)} style={{ width: "44px", height: "24px", borderRadius: "99px", background: checked ? "#0EAF50" : "#cbd5e1", position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
    <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#fff", position: "absolute", top: "3px", left: checked ? "23px" : "3px", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
  </div>
);

export default function EditPost() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);
  const original = initialPosts.find((p) => p.id === id) ?? initialPosts[0];

  const [post, setPost] = useState(original);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [saved, setSaved] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (key: string, val: any) => setPost((p) => ({ ...p, [key]: val }));
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) { update("tags", [...post.tags, newTag.trim().toUpperCase()]); setNewTag(""); }
  };
  const removeTag = (tag: string) => update("tags", post.tags.filter((t) => t !== tag));
  const handleSave = () => { setSaved(true); setTimeout(() => { setSaved(false); router.push("/manageblog"); }, 1200); };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setFeaturedImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) handleFile(f); };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; }
        .ep-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; color: #0e3d27; margin-bottom: 10px; display: block; }
        .ep-input { width: 100%; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1a3a22; background: #fff; outline: none; transition: border-color 0.15s; }
        .ep-input:focus { border-color: #0e3d27; }
        .ep-textarea { width: 100%; border: none; resize: none; outline: none; font-family: 'DM Sans', sans-serif; font-size: 14px; line-height: 1.75; color: #334155; background: transparent; min-height: 220px; }
        .ep-select { width: 100%; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 10px 36px 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1a3a22; background: #fff; outline: none; appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 5l4 4 4-4' stroke='%23475569' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; transition: border-color 0.15s; }
        .ep-select:focus { border-color: #0e3d27; }
        .toolbar-btn { width: 28px; height: 28px; border-radius: 6px; border: none; background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.12s; }
        .toolbar-btn:hover { background: #f0f5f1; }
        .tag-chip { display: inline-flex; align-items: center; gap: 5px; background: #e8f0ea; color: #0e3d27; font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; padding: 4px 8px; border-radius: 6px; }
        .tag-remove { cursor: pointer; display: flex; align-items: center; color: #5a7060; }
        .tag-remove:hover { color: #0e3d27; }
        .section-card { background: #fff; border: 1px solid #e8ede9; border-radius: 14px; padding: 20px 22px; margin-bottom: 14px; }
        .section-divider { height: 1px; background: #f0f5f1; margin: 14px 0; }
        .top-action-btn { height: 36px; border-radius: 8px; border: 1.5px solid #e2e8f0; padding: 0 16px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; background: #fff; color: #1a3a22; transition: background 0.13s; white-space: nowrap; }
        .top-action-btn:hover { background: #f4f6f4; }
        .publish-btn { height: 36px; border-radius: 8px; border: none; padding: 0 20px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; background: #0e3d27; color: #fff; transition: opacity 0.13s; white-space: nowrap; }
        .publish-btn:hover { opacity: 0.88; }
        .publish-btn.saved-state { background: #0EAF50; }

        /* Featured image */
        .img-drop-zone { border: 1.5px dashed #c8d8cb; border-radius: 14px; background: #f8fbf8; min-height: 190px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer; transition: border-color 0.15s, background 0.15s; }
        .img-drop-zone:hover, .img-drop-zone.dragging { border-color: #0e3d27; background: #f0f5f1; }
        .img-preview-wrap { position: relative; border-radius: 14px; overflow: hidden; width: 100%; }
        .img-preview-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; aspect-ratio: 16/7; }
        .img-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0); display: flex; align-items: center; justify-content: center; gap: 10px; transition: background 0.22s; }
        .img-preview-wrap:hover .img-overlay { background: rgba(0,0,0,0.42); }
        .img-action-btn { display: flex; align-items: center; gap: 6px; padding: 8px 18px; border-radius: 99px; font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 700; cursor: pointer; border: none; opacity: 0; transform: translateY(6px); transition: opacity 0.22s, transform 0.22s, background 0.15s; }
        .img-preview-wrap:hover .img-action-btn { opacity: 1; transform: translateY(0); }
        .img-action-btn.change { background: #ffffff; color: #0e3d27; }
        .img-action-btn.change:hover { background: #f0fdf4; }
        .img-action-btn.remove { background: rgba(255,255,255,0.12); color: #fff; border: 1.5px solid rgba(255,255,255,0.35); }
        .img-action-btn.remove:hover { background: rgba(200,40,40,0.75); border-color: transparent; }

        .slug-wrap { display: flex; align-items: center; border: 1.5px solid #e2e8f0; border-radius: 10px; overflow: hidden; background: #fff; transition: border-color 0.15s; }
        .slug-wrap:focus-within { border-color: #0e3d27; }
        .slug-prefix { padding: 10px 10px 10px 14px; font-size: 13px; color: #9ab09e; font-weight: 500; background: #f8fbf8; border-right: 1px solid #e8ede9; white-space: nowrap; }
        .slug-input { flex: 1; border: none; outline: none; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1a3a22; background: transparent; }
        .tag-input { border: none; outline: none; background: transparent; font-family: 'DM Sans', sans-serif; font-size: 12px; color: #1a3a22; width: 80px; }
        .meta-input { width: 100%; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1a3a22; background: #fff; outline: none; transition: border-color 0.15s; }
        .meta-input:focus { border-color: #0e3d27; }
        .revision-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f0f5f1; }
        .revision-item:last-child { border-bottom: none; }
        .rev-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }
        .mobile-topbar { display: none; align-items: center; justify-content: space-between; padding: 0 16px; height: 52px; background: #fff; border-bottom: 1px solid #e8ede9; position: sticky; top: 0; z-index: 100; flex-shrink: 0; }
        .icon-btn { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: none; background: transparent; cursor: pointer; color: #475569; }
        .mobile-nav-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 40; }
        .mobile-nav-panel { position: fixed; top: 0; left: 0; bottom: 0; width: min(260px, 80vw); background: #fff; z-index: 50; transform: translateX(-100%); transition: transform 0.25s ease; overflow-y: auto; }
        .desktop-topnav { display: block; }
        @media (max-width: 768px) {
          .sidenav-wrapper { display: none !important; }
          .desktop-topnav { display: none !important; }
          .mobile-topbar { display: flex !important; }
          .mobile-nav-overlay { display: block !important; }
          .mobile-nav-panel { display: flex !important; flex-direction: column; }
          .ep-layout { flex-direction: column !important; overflow: visible !important; }
          .ep-sidebar { width: 100% !important; border-left: none !important; border-top: 1px solid #e8ede9 !important; }
          .ep-topbar { flex-wrap: wrap !important; gap: 8px !important; height: auto !important; padding: 10px 16px !important; }
          .ep-topbar-actions { flex-wrap: wrap !important; gap: 6px !important; }
        }
        @media (min-width: 769px) { .mobile-topbar { display: none !important; } .mobile-nav-overlay { display: none !important; } .mobile-nav-panel { display: none !important; } }
        .mobile-nav-overlay.open { opacity: 1; }
        .mobile-nav-panel.open { transform: translateX(0); }
      `}</style>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleInputChange} />

      <div className={`mobile-nav-overlay${mobileNavOpen ? " open" : ""}`} onClick={() => setMobileNavOpen(false)} />
      <div className={`mobile-nav-panel${mobileNavOpen ? " open" : ""}`}><SideNav /></div>
      <div className="sidenav-wrapper"><SideNav /></div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Mobile topbar */}
        <div className="mobile-topbar">
          <button className="icon-btn" onClick={() => setMobileNavOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", color: "#1a3a22" }}>moneymati</span>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e8f0ea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#0e3d27" }}>A</div>
        </div>

        <div className="desktop-topnav"><TopNav /></div>

        {/* Editor Top Bar */}
        <div className="ep-topbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: "56px", background: "#fff", borderBottom: "1px solid #e8ede9", flexShrink: 0, gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
            <button onClick={() => router.push("/manageblog")} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", padding: 0 }}>
              <ArrowLeft />
            </button>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "10px", fontWeight: 600, color: "#9ab09e", letterSpacing: "0.07em", textTransform: "uppercase" }}>Edit Post</div>
              <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1a3a22", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "260px" }}>{post.title}</div>
            </div>
          </div>
          <div className="ep-topbar-actions" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "#9ab09e" }}>Last saved: 2 minutes ago</span>
            <button className="top-action-btn">Preview</button>
            <button className="top-action-btn">Save Draft</button>
            <button className={`publish-btn${saved ? " saved-state" : ""}`} onClick={handleSave} disabled={saved}>
              {saved ? "✓ Saved!" : "Publish Post"}
            </button>
          </div>
        </div>

        {/* Editor layout */}
        <div className="ep-layout" style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* ── Left ── */}
          <div style={{ flex: 1, overflowY: "auto", backgroundColor: "#f4f6f4", padding: "24px" }}>

            {/* Title */}
            <div className="section-card">
              <div className="ep-label">POST TITLE</div>
              <input className="ep-input" style={{ fontSize: "22px", fontFamily: "'DM Serif Display', serif", fontWeight: 400, border: "none", padding: "4px 0", borderBottom: "1.5px solid #e2e8f0", borderRadius: 0 }} value={post.title} onChange={(e) => update("title", e.target.value)} />
            </div>

            {/* ── Featured Image ── */}
            <div className="section-card">
              <div className="ep-label">FEATURED IMAGE</div>

              {featuredImage ? (
                <div className="img-preview-wrap">
                  <img src={featuredImage} alt="Featured" />
                  {/* Hover overlay with action buttons */}
                  <div className="img-overlay">
                    <button
                      className="img-action-btn change"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <EditPencilIcon /> Change Image
                    </button>
                    <button
                      className="img-action-btn remove"
                      onClick={() => setFeaturedImage(null)}
                    >
                      <CloseIcon size={11} /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`img-drop-zone${isDragging ? " dragging" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <UploadIcon />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#1a3a22" }}>Click to upload or drag & drop</div>
                    <div style={{ fontSize: "11.5px", color: "#9ab09e", marginTop: 3 }}>PNG, JPG, WEBP — recommended 1200×630px</div>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="section-card">
              <div className="ep-label">ARTICLE CONTENT</div>
              <div style={{ display: "flex", alignItems: "center", gap: "2px", padding: "8px", background: "#f8fbf8", borderRadius: "8px", marginBottom: "12px", flexWrap: "wrap", border: "1px solid #e8ede9" }}>
                {[{ icon: <BoldIcon />, t: "Bold" }, { icon: <ItalicIcon />, t: "Italic" }, { icon: <UnderlineIcon />, t: "Underline" }].map((x) => <button key={x.t} className="toolbar-btn" title={x.t}>{x.icon}</button>)}
                <div style={{ width: 1, height: 18, background: "#e2e8f0", margin: "0 4px" }} />
                {[{ icon: <H1Icon />, t: "H1" }, { icon: <H2Icon />, t: "H2" }].map((x) => <button key={x.t} className="toolbar-btn" title={x.t} style={{ width: 36 }}>{x.icon}</button>)}
                <div style={{ width: 1, height: 18, background: "#e2e8f0", margin: "0 4px" }} />
                {[{ icon: <ULIcon />, t: "Bullet" }, { icon: <OLIcon />, t: "Numbered" }].map((x) => <button key={x.t} className="toolbar-btn" title={x.t}>{x.icon}</button>)}
                <div style={{ width: 1, height: 18, background: "#e2e8f0", margin: "0 4px" }} />
                {[{ icon: <LinkIcon />, t: "Link" }, { icon: <ImageIcon />, t: "Image" }, { icon: <QuoteIcon />, t: "Quote" }].map((x) => <button key={x.t} className="toolbar-btn" title={x.t}>{x.icon}</button>)}
                <div style={{ marginLeft: "auto" }}><button className="toolbar-btn" title="Fullscreen"><ExpandIcon /></button></div>
              </div>
              <textarea className="ep-textarea" value={post.content} onChange={(e) => update("content", e.target.value)} style={{ padding: "4px 0" }} />
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="ep-sidebar" style={{ width: "320px", overflowY: "auto", background: "#fff", borderLeft: "1px solid #e8ede9", padding: "20px", flexShrink: 0 }}>

            {/* Status */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
                <StatusIcon />
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: "#0e3d27" }}>STATUS & VISIBILITY</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "#f8fbf8", borderRadius: "10px", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><GlobeIcon /><span style={{ fontSize: "13px", fontWeight: 600, color: "#1a3a22" }}>Public Post</span></div>
                <Toggle checked={post.isPublic} onChange={(v) => update("isPublic", v)} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "#f8fbf8", borderRadius: "10px", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><PinIcon /><span style={{ fontSize: "13px", fontWeight: 600, color: "#1a3a22" }}>Pinned to Top</span></div>
                <Toggle checked={post.isPinned} onChange={(v) => update("isPinned", v)} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ab09e", marginBottom: "6px", letterSpacing: "0.04em" }}>PUBLISHING MODE</div>
                <select className="ep-select" value={post.publishingMode} onChange={(e) => update("publishingMode", e.target.value)}>
                  <option>Published</option><option>Draft</option><option>Scheduled</option>
                </select>
              </div>
            </div>

            <div className="section-divider" />

            {/* Category */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
                <TagIcon />
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: "#0e3d27" }}>CATEGORY & CLASSIFICATION</span>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ab09e", marginBottom: "6px", letterSpacing: "0.04em" }}>PRIMARY CATEGORY</div>
                <select className="ep-select" value={post.primaryCategory} onChange={(e) => update("primaryCategory", e.target.value)}>
                  <option>Wealth Architecture</option><option>Market Analysis</option><option>Digital Assets</option><option>Personal Finance</option><option>Tax Strategy</option>
                </select>
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ab09e", marginBottom: "6px", letterSpacing: "0.04em" }}>TAGS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", padding: "10px 12px", border: "1.5px solid #e2e8f0", borderRadius: "10px", minHeight: "42px" }}>
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag-chip">{tag}<span className="tag-remove" onClick={() => removeTag(tag)}><CloseIcon size={8} /></span></span>
                  ))}
                  <input className="tag-input" placeholder="Add tag..." value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={addTag} />
                </div>
              </div>
            </div>

            <div className="section-divider" />

            {/* SEO */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: "#0e3d27", marginBottom: "14px" }}>SEARCH OPTIMIZATION</div>
              <div style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ab09e", marginBottom: "6px", letterSpacing: "0.04em" }}>META TITLE</div>
                <input className="meta-input" value={post.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ab09e", marginBottom: "6px", letterSpacing: "0.04em" }}>META DESCRIPTION</div>
                <textarea className="meta-input" style={{ resize: "vertical", minHeight: "72px", lineHeight: "1.5" }} value={post.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ab09e", marginBottom: "6px", letterSpacing: "0.04em" }}>URL SLUG</div>
                <div className="slug-wrap">
                  <span className="slug-prefix">/blog/</span>
                  <input className="slug-input" value={post.urlSlug} onChange={(e) => update("urlSlug", e.target.value)} />
                </div>
              </div>
            </div>

            <div className="section-divider" />

            {/* Revisions */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: "#0e3d27" }}>REVISION HISTORY</div>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#0e3d27", cursor: "pointer" }}>VIEW ALL</span>
              </div>
              {revisions.map((rev, i) => (
                <div key={i} className="revision-item">
                  <div className="rev-dot" style={{ background: rev.isCurrent ? "#0EAF50" : "#cbd5e1" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a3a22", background: rev.isCurrent ? "#f0fdf4" : "transparent", padding: rev.isCurrent ? "6px 10px" : "0", borderRadius: rev.isCurrent ? "8px" : "0" }}>
                      {rev.label}
                      {rev.isCurrent && <div style={{ fontSize: "11px", fontWeight: 400, color: "#5a7060", marginTop: "2px" }}>{rev.author} • {rev.date}</div>}
                    </div>
                    {!rev.isCurrent && <div style={{ fontSize: "11px", color: "#9ab09e", fontStyle: "italic", marginTop: "2px" }}>{rev.author} • {rev.date}</div>}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
