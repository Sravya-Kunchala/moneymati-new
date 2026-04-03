"use client";

import { useEffect, useState, useRef } from "react";
import SideNav from "@/components/sidenav";
import TopNav from "@/components/topnav";

const BRAND = "#16a06b";
const BRAND_DARK = "#0f7a52";
const BRAND_LIGHT = "#e6f7f0";

type Category = "Financials" | "Investment" | "Government" | "Tax" | "Crypto" | "Wealth" | "Career" | "Planning";
type EBookStatus = "Published" | "Draft" | "Archived";

interface EBook {
  id: string;
  title: string;
  description?: string;
  category: Category;
  pages: number;
  format: string;
  lastUpdated: string;
  coverBg: string;
  coverAccent: string;
  status: EBookStatus;
  href?: string;
}

const CATEGORY_COLORS: Record<Category, { bg: string; color: string }> = {
  Financials: { bg: "#dcfce7", color: "#15803d" },
  Investment: { bg: "#fef9c3", color: "#a16207" },
  Government: { bg: "#fee2e2", color: "#b91c1c" },
  Tax: { bg: "#e0f2fe", color: "#0369a1" },
  Crypto: { bg: "#ede9fe", color: "#6d28d9" },
  Wealth: { bg: "#fce7f3", color: "#be185d" },
  Career: { bg: "#fff4e6", color: "#d97706" },
  Planning: { bg: "#e0f7ff", color: "#0ea5e9" },
};

const EBOOKS: EBook[] = [
  { id: "1", title: "Navaratri Financials FlipBook", description: "A comprehensive guide to financial planning during festive seasons.", category: "Financials", pages: 24, format: "PDF Format", lastUpdated: "Apr 24, 2026", coverBg: "#7c2d12", coverAccent: "#f97316", status: "Published" },
  { id: "2", title: "5 Investing Mistakes You Must Avoid", description: "Learn the most common pitfalls new investors face and how to sidestep them.", category: "Investment", pages: 12, format: "PDF Format", lastUpdated: "Apr 24, 2026", coverBg: "#1c1917", coverAccent: "#22c55e", status: "Published" },
  { id: "3", title: "Top Government Saving Schemes", description: "An overview of the best government-backed saving schemes available today.", category: "Government", pages: 10, format: "PDF Format", lastUpdated: "Apr 24, 2026", coverBg: "#f5f0e8", coverAccent: "#d97706", status: "Draft" },
  { id: "4", title: "Tax Planning for Salaried Employees", description: "Optimize your tax liability with proven strategies for salaried professionals.", category: "Tax", pages: 18, format: "PDF Format", lastUpdated: "Apr 20, 2026", coverBg: "#0c4a6e", coverAccent: "#38bdf8", status: "Published" },
  { id: "5", title: "Crypto Investment Guide 2026", description: "Everything you need to know about investing in crypto assets in 2026.", category: "Crypto", pages: 32, format: "PDF Format", lastUpdated: "Apr 18, 2026", coverBg: "#1e1b4b", coverAccent: "#a78bfa", status: "Archived" },
];

// ─── Shared Styles ────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
  color: "#6b7280", display: "block", marginBottom: 7, fontFamily: "'DM Sans', sans-serif",
};
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 10,
  fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#111", outline: "none",
  background: "#f9fafb", transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s",
  boxSizing: "border-box",
};

// ─── Book Cover SVG ───────────────────────────────────────────────────────────
function BookCover({ bg, accent, title }: { bg: string; accent: string; title: string }) {
  const initial = title.charAt(0).toUpperCase();
  return (
    <svg width="48" height="60" viewBox="0 0 48 60" fill="none">
      <rect width="48" height="60" rx="3" fill={bg} />
      <rect x="0" y="0" width="4" height="60" rx="2" fill={accent} opacity="0.9" />
      <rect x="8" y="10" width="32" height="2" rx="1" fill="white" opacity="0.3" />
      <rect x="8" y="16" width="22" height="2" rx="1" fill="white" opacity="0.2" />
      <text x="24" y="38" textAnchor="middle" fill="white" opacity="0.6" fontSize="18" fontWeight="700" fontFamily="serif">{initial}</text>
      <rect x="8" y="48" width="32" height="1.5" rx="1" fill={accent} opacity="0.6" />
      <rect x="8" y="52" width="20" height="1.5" rx="1" fill={accent} opacity="0.4" />
    </svg>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const EditIcon = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M10.5 2L13 4.5L5 12.5H2.5V10L10.5 2Z" stroke="#6b7280" strokeWidth="1.3" strokeLinejoin="round" /></svg>;
const TrashIcon = () => <svg width="14" height="15" viewBox="0 0 14 15" fill="none"><path d="M1 4h12M4.5 4V2.5h5V4M2 4l.8 10h8.4L12 4" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const FilterIcon = () => <svg width="15" height="13" viewBox="0 0 15 13" fill="none"><path d="M1 1.5h13M3.5 6.5h8M6 11.5h3" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round" /></svg>;
const SortIcon = () => <svg width="15" height="13" viewBox="0 0 15 13" fill="none"><path d="M1 2h13M1 6.5h9M1 11h5" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round" /></svg>;
const BackIcon = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="#0d1117" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const BoldIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 7h4a2 2 0 000-4H4v4zM4 7h4.5a2.5 2.5 0 010 5H4V7z" stroke="#374151" strokeWidth="1.3" strokeLinejoin="round" /></svg>;
const ItalicIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6 3h4M4 11h4M8 3L6 11" stroke="#374151" strokeWidth="1.3" strokeLinecap="round" /></svg>;
const ListIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 4h7M5 7h7M5 10h7M2 4h.5M2 7h.5M2 10h.5" stroke="#374151" strokeWidth="1.3" strokeLinecap="round" /></svg>;
const LinkEditorIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 8.5l3-3M7.5 4.5l1-1a2.121 2.121 0 113 3l-1 1M6.5 9.5l-1 1a2.121 2.121 0 11-3-3l1-1" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" /></svg>;
const ExternalIcon = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 1h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 8l6.5-6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 8.5V11H2V3h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

// ─── Edit E-Book Page ─────────────────────────────────────────────────────────
function EditEBookPage({ ebook, onCancel, onSave }: { ebook: EBook; onCancel: () => void; onSave: (updated: EBook) => void }) {
  const [title, setTitle] = useState(ebook.title);
  const [description, setDescription] = useState(ebook.description ?? "");
  const [status, setStatus] = useState<EBookStatus>(ebook.status);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onSave({
      ...ebook, title, description, status,
      lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    });
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f0f2f5", padding: "32px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: 620, padding: "0 24px" }}>

        {/* Back + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 6px", display: "flex", alignItems: "center", borderRadius: 6, transition: "background 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#e5e7eb"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; }}>
            <BackIcon />
          </button>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 21, fontWeight: 700, color: "#0d1117", letterSpacing: "-0.01em" }}>
            Edit E-Book: {ebook.title}
          </h1>
        </div>

        {/* Card */}
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: "28px 28px 32px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>

          {/* Title */}
          <div style={{ marginBottom: 22 }}>
            <label style={labelStyle}>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = BRAND; e.target.style.background = "white"; e.target.style.boxShadow = `0 0 0 3px ${BRAND}18`; }}
              onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.background = "#f9fafb"; e.target.style.boxShadow = "none"; }} />
          </div>

          {/* Description with toolbar */}
          <div style={{ marginBottom: 22 }}>
            <label style={labelStyle}>Description</label>
            <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden", background: "#f9fafb", transition: "border-color 0.15s" }}
              onFocusCapture={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BRAND; (e.currentTarget as HTMLElement).style.background = "white"; }}
              onBlurCapture={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb"; (e.currentTarget as HTMLElement).style.background = "#f9fafb"; }}>
              <div style={{ display: "flex", gap: 2, padding: "8px 10px", borderBottom: "1px solid #f3f4f6", background: "white" }}>
                {[{ icon: <BoldIcon />, label: "Bold" }, { icon: <ItalicIcon />, label: "Italic" }, { icon: <ListIcon />, label: "List" }, { icon: <LinkEditorIcon />, label: "Link" }].map((btn) => (
                  <button key={btn.label} title={btn.label} style={{ width: 28, height: 26, borderRadius: 5, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.12s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f3f4f6"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                    {btn.icon}
                  </button>
                ))}
              </div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="This comprehensive guide covers everything from personal budgeting to advanced investment strategies..."
                rows={5}
                style={{ width: "100%", padding: "12px 14px", border: "none", outline: "none", resize: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#374151", background: "transparent", lineHeight: 1.6 }} />
            </div>
          </div>

          {/* Upload Row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
            {/* PDF */}
            <div>
              <label style={labelStyle}>Upload PDF</label>
              <div style={{ display: "flex", alignItems: "center", border: "1.5px dashed #d1d5db", borderRadius: 10, overflow: "hidden", background: "#f9fafb", transition: "border-color 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BRAND; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db"; }}>
                <button onClick={() => pdfInputRef.current?.click()}
                  style={{ padding: "9px 14px", background: "white", border: "none", borderRight: "1px solid #e5e7eb", fontSize: 12.5, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", flexShrink: 0, transition: "background 0.15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f3f4f6"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}>
                  Choose File
                </button>
                <span style={{ padding: "9px 12px", fontSize: 12.5, color: "#9ca3af", fontFamily: "'DM Sans', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {pdfName ?? "No file chosen"}
                </span>
                <input ref={pdfInputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={(e) => setPdfName(e.target.files?.[0]?.name ?? null)} />
              </div>
            </div>
            {/* Cover Image */}
            <div>
              <label style={labelStyle}>Upload Cover Image</label>
              <div style={{ display: "flex", alignItems: "center", border: "1.5px dashed #d1d5db", borderRadius: 10, overflow: "hidden", background: "#f9fafb", transition: "border-color 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BRAND; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db"; }}>
                <button onClick={() => imageInputRef.current?.click()}
                  style={{ padding: "9px 14px", background: "white", border: "none", borderRight: "1px solid #e5e7eb", fontSize: 12.5, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", flexShrink: 0, transition: "background 0.15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f3f4f6"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}>
                  Choose Image
                </button>
                <span style={{ padding: "9px 12px", fontSize: 12.5, color: "#9ca3af", fontFamily: "'DM Sans', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {imageName ?? "No image chosen"}
                </span>
                <input ref={imageInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => setImageName(e.target.files?.[0]?.name ?? null)} />
              </div>
            </div>
          </div>

          {/* Status */}
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Status</label>
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {(["Published", "Draft", "Archived"] as EBookStatus[]).map((s) => (
                <label key={s} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#374151", fontFamily: "'DM Sans', sans-serif", fontWeight: status === s ? 500 : 400 }}>
                  <div onClick={() => setStatus(s)} style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${status === s ? BRAND : "#d1d5db"}`, background: status === s ? BRAND : "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s", flexShrink: 0 }}>
                    {status === s && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }} />}
                  </div>
                  <span onClick={() => setStatus(s)}>{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: "#f3f4f6", marginBottom: 24 }} />

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={onCancel} style={{ padding: "10px 24px", borderRadius: 50, border: "1px solid #e5e7eb", background: "white", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "#374151", fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f9fafb"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}>
              Cancel
            </button>
            <button onClick={handleSave} style={{ padding: "10px 28px", borderRadius: 50, border: "none", background: BRAND, color: "white", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s, transform 0.12s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BRAND_DARK; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = BRAND; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              Save Changes
            </button>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 11.5, color: "#9ca3af", marginTop: 32 }}>© 2025 MoneyMati. All administrative rights reserved.</p>
      </div>
    </div>
  );
}

// ─── Add EBook Modal ──────────────────────────────────────────────────────────
function AddEBookModal({ onClose, onAdd }: { onClose: () => void; onAdd: (book: EBook) => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Financials");
  const [description, setDescription] = useState("");
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [pdfDrag, setPdfDrag] = useState(false);
  const [imgDrag, setImgDrag] = useState(false);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!title.trim()) return;
    const covers = [
      { bg: "#7c2d12", accent: "#f97316" }, { bg: "#1c1917", accent: "#22c55e" },
      { bg: "#0c4a6e", accent: "#38bdf8" }, { bg: "#1e1b4b", accent: "#a78bfa" },
      { bg: "#14532d", accent: "#86efac" },
    ];
    const c = covers[Math.floor(Math.random() * covers.length)];
    onAdd({
      id: crypto.randomUUID(), title: title.trim(), description, category,
      pages: 10, format: "PDF Format",
      lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      coverBg: c.bg, coverAccent: c.accent, status: "Draft",
    });
    onClose();
  };

  const dropZoneStyle = (active: boolean): React.CSSProperties => ({
    border: `1.5px dashed ${active ? BRAND : "#d1d5db"}`,
    borderRadius: 12,
    background: active ? BRAND_LIGHT : "#f9fafb",
    padding: "28px 16px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.15s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  });

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "white", borderRadius: 20, width: 520, maxWidth: "95vw", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.18)", fontFamily: "'DM Sans', sans-serif" }}>

        {/* Green top accent bar */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${BRAND}, #34d399)`, borderRadius: "20px 20px 0 0" }} />

        <div style={{ padding: "24px 28px 28px" }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 21, fontWeight: 700, color: "#0d1117", margin: 0, letterSpacing: "-0.01em" }}>Add New E-Book</h2>
              <p style={{ fontSize: 13, color: "#6b7280", margin: "4px 0 0" }}>Register a new asset to the sovereign library.</p>
            </div>
            <button onClick={onClose}
              style={{ background: "#f3f4f6", border: "none", cursor: "pointer", color: "#6b7280", width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, lineHeight: 1, transition: "background 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#e5e7eb"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#f3f4f6"; }}>
              ×
            </button>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#f3f4f6", marginBottom: 22 }} />

          {/* Title + Category */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
            <div>
              <label style={labelStyle}>E-Book Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Digital Assets 101"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = BRAND; e.target.style.background = "white"; e.target.style.boxShadow = `0 0 0 3px ${BRAND}18`; }}
                onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.background = "#f9fafb"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <div style={{ position: "relative" }}>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  style={{ ...inputStyle, appearance: "none" as any, paddingRight: 36, cursor: "pointer" }}
                  onFocus={(e) => { e.target.style.borderColor = BRAND; e.target.style.background = "white"; e.target.style.boxShadow = `0 0 0 3px ${BRAND}18`; }}
                  onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.background = "#f9fafb"; e.target.style.boxShadow = "none"; }}
                >
                  {Object.keys(CATEGORY_COLORS).map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <svg style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5l4 4 4-4" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Description</label>
            <div
              style={{ border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden", background: "#f9fafb", transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s" }}
              onFocusCapture={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BRAND; (e.currentTarget as HTMLElement).style.background = "white"; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 3px ${BRAND}18`; }}
              onBlurCapture={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb"; (e.currentTarget as HTMLElement).style.background = "#f9fafb"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              {/* Toolbar */}
              <div style={{ display: "flex", gap: 2, padding: "7px 10px", borderBottom: "1px solid #f3f4f6", background: "white" }}>
                {[{ icon: <BoldIcon />, label: "Bold" }, { icon: <ItalicIcon />, label: "Italic" }, { icon: <ListIcon />, label: "List" }, { icon: <LinkEditorIcon />, label: "Link" }].map((btn) => (
                  <button key={btn.label} title={btn.label}
                    style={{ width: 28, height: 26, borderRadius: 5, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.12s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f3f4f6"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                    {btn.icon}
                  </button>
                ))}
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a compelling summary for your readers..."
                rows={4}
                style={{ width: "100%", padding: "12px 14px", border: "none", outline: "none", resize: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#374151", background: "transparent", lineHeight: 1.6, boxSizing: "border-box" }}
              />
            </div>
          </div>

          {/* Upload Zones */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>

            {/* Cover Image */}
            <div>
              <label style={labelStyle}>Upload Cover Image</label>
              <div
                style={dropZoneStyle(imgDrag)}
                onClick={() => imageInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setImgDrag(true); }}
                onDragLeave={() => setImgDrag(false)}
                onDrop={(e) => { e.preventDefault(); setImgDrag(false); const f = e.dataTransfer.files[0]; if (f) setImageName(f.name); }}
                onMouseEnter={(e) => { if (!imgDrag) { (e.currentTarget as HTMLElement).style.borderColor = BRAND; (e.currentTarget as HTMLElement).style.background = BRAND_LIGHT; } }}
                onMouseLeave={(e) => { if (!imgDrag) { (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db"; (e.currentTarget as HTMLElement).style.background = "#f9fafb"; } }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill={BRAND_LIGHT} />
                  <path d="M10 22l5-6 4 5 3-3 4 4" stroke={BRAND} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="9" y="9" width="14" height="14" rx="3" stroke={BRAND} strokeWidth="1.4" />
                  <circle cx="13" cy="13" r="1.5" fill={BRAND} />
                </svg>
                <p style={{ fontSize: 12.5, color: imageName ? "#111827" : "#6b7280", margin: 0, fontWeight: 500, wordBreak: "break-all", textAlign: "center" }}>
                  {imageName ?? <><span style={{ color: BRAND }}>PNG, JPG</span> up to 10MB</>}
                </p>
                <input ref={imageInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => setImageName(e.target.files?.[0]?.name ?? null)} />
              </div>
            </div>

            {/* PDF */}
            <div>
              <label style={labelStyle}>Upload PDF</label>
              <div
                style={dropZoneStyle(pdfDrag)}
                onClick={() => pdfInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
                onDragLeave={() => setPdfDrag(false)}
                onDrop={(e) => { e.preventDefault(); setPdfDrag(false); const f = e.dataTransfer.files[0]; if (f) setPdfName(f.name); }}
                onMouseEnter={(e) => { if (!pdfDrag) { (e.currentTarget as HTMLElement).style.borderColor = BRAND; (e.currentTarget as HTMLElement).style.background = BRAND_LIGHT; } }}
                onMouseLeave={(e) => { if (!pdfDrag) { (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db"; (e.currentTarget as HTMLElement).style.background = "#f9fafb"; } }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill={BRAND_LIGHT} />
                  <path d="M11 10h6l5 5v9a1 1 0 01-1 1H11a1 1 0 01-1-1V11a1 1 0 011-1z" stroke={BRAND} strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M17 10v5h5" stroke={BRAND} strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M13 19h6M13 17h3" stroke={BRAND} strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <p style={{ fontSize: 12.5, color: pdfName ? "#111827" : "#6b7280", margin: 0, fontWeight: 500, wordBreak: "break-all", textAlign: "center" }}>
                  {pdfName ?? <><span style={{ color: BRAND }}>PDF file</span> up to 50MB</>}
                </p>
                <input ref={pdfInputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={(e) => setPdfName(e.target.files?.[0]?.name ?? null)} />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#f3f4f6", marginBottom: 20 }} />

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={onClose}
              style={{ padding: "10px 24px", borderRadius: 50, border: "1px solid #e5e7eb", background: "white", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "#374151", fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f9fafb"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}>
              Cancel
            </button>
            <button onClick={handleAdd}
              style={{ padding: "10px 24px", borderRadius: 50, border: "none", background: BRAND, color: "white", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 7, transition: "background 0.15s, transform 0.12s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BRAND_DARK; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = BRAND; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>
              Add E-Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EBooksManager() {
  const [ebooks, setEbooks] = useState<EBook[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEBook, setEditingEBook] = useState<EBook | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const perPage = 3;
  const totalPages = Math.ceil(ebooks.length / perPage);
  const paged = ebooks.slice((currentPage - 1) * perPage, currentPage * perPage);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string) => setEbooks((prev) => prev.filter((b) => b.id !== id));
  const handleAdd = async (book: EBook) => {
    try {
      const res = await fetch("/api/admin/ebooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: book.title,
          description: book.description,
          category: book.category,
          pages: book.pages,
          format: book.format,
          href: book.href,
          status: book.status,
        }),
      });
      const created = res.ok ? await res.json() : null;
      const merged: EBook = {
        ...book,
        ...(created ?? {}),
        coverBg: book.coverBg,
        coverAccent: book.coverAccent,
      };
      setEbooks((prev) => [merged, ...prev]);
      setCurrentPage(1);
      showToast("New E-Book Added");
    } catch (error) {
      console.error("Unable to create ebook", error);
      // fallback to local add to keep UI responsive
      setEbooks((prev) => [book, ...prev]);
      setCurrentPage(1);
      showToast("Saved locally; sync failed");
    }
  };
  const handleEditSave = (updated: EBook) => { setEbooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b))); setEditingEBook(null); showToast("Changes Saved"); };

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const res = await fetch("/api/admin/ebooks");
        if (!res.ok) throw new Error(`Failed to load e-books (HTTP ${res.status})`);
        const data = await res.json();
        const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
        const items: EBook[] = (data.items ?? []).map((item: any, idx: number) => ({
          id: item.id ?? String(idx),
          title: item.title ?? "Untitled E-Book",
          description: item.description ?? "",
          category: (item.category ?? "Financials") as Category,
          pages: item.pages ?? 10,
          format: item.format ?? "PDF Format",
          lastUpdated: item.lastUpdated ? fmt.format(new Date(item.lastUpdated)) : "—",
          coverBg: item.coverBg ?? "#0f172a",
          coverAccent: item.coverAccent ?? "#22c55e",
          status: "Published",
          href: item.href,
        }));
        if (items.length > 0) {
          setEbooks(items);
          setLoadError(null);
        } else {
          setEbooks(EBOOKS);
          setLoadError("No PDFs found; showing sample e-books.");
        }
      } catch (error: any) {
        console.warn("ebooks load failed", error);
        setEbooks(EBOOKS);
        setLoadError("Unable to load PDFs; showing sample e-books.");
      }
    };
    fetchEbooks();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
        .eb-root { font-family: 'DM Sans', sans-serif; background: #f7f8fa; min-height: 100vh; padding: 32px 36px; }
        .eb-edit-enter { animation: slideIn 0.25s ease both; }
        .eb-row-enter { animation: fadeUp 0.25s ease both; }
        .eb-act-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e5e7eb; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; }
        .eb-act-btn:hover { background: #f3f4f6; border-color: #d1d5db; }
        .eb-act-btn.delete:hover { background: #fef2f2; border-color: #fca5a5; }
        .eb-act-btn.delete:hover svg path { stroke: #dc2626; }
        .eb-icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e5e7eb; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.15s; }
        .eb-icon-btn:hover { background: #f3f4f6; }
        .eb-pg-btn { padding: 6px 16px; border-radius: 8px; border: 1px solid #e5e7eb; background: white; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; color: #374151; transition: all 0.15s; }
        .eb-pg-btn:hover:not(:disabled) { background: #f3f4f6; border-color: #d1d5db; }
        .eb-pg-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .eb-pg-btn.next { background: ${BRAND}; color: white; border-color: ${BRAND}; }
        .eb-pg-btn.next:hover:not(:disabled) { background: ${BRAND_DARK}; border-color: ${BRAND_DARK}; }
      `}</style>

      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <SideNav />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <TopNav />

          {editingEBook ? (
            <div className="eb-edit-enter" style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <EditEBookPage ebook={editingEBook} onCancel={() => setEditingEBook(null)} onSave={handleEditSave} />
            </div>
          ) : (
            <div className="eb-root" style={{ flex: 1, overflowY: "auto" }}>

              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
                <div>
                  <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700, color: "#0d1117", letterSpacing: "-0.02em", marginBottom: 4 }}>E-Books Manager</h1>
                  <p style={{ fontSize: 13.5, color: "#6b7280" }}>Control and curate your library of financial intelligence assets.</p>
                  {loadError && <p style={{ fontSize: 12.5, color: "#dc2626", marginTop: 6 }}>{loadError}</p>}
                </div>
                <button onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 50, border: "none", background: BRAND, color: "white", fontSize: 13.5, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s, transform 0.12s", whiteSpace: "nowrap" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BRAND_DARK; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = BRAND; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  Add New E-Book
                </button>
              </div>

              {/* Table Card */}
              <div style={{ background: "white", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px 0" }}>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 600, color: "#0d1117" }}>Active Library</h2>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="eb-icon-btn"><FilterIcon /></button>
                    <button className="eb-icon-btn"><SortIcon /></button>
                  </div>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                      {["EBOOK COVER", "TITLE", "CATEGORY", "LAST UPDATED", "ACTIONS"].map((h) => (
                        <th key={h} style={{ padding: "8px 24px", textAlign: "left", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#9ca3af", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paged.map((book, i) => {
                      const cat = CATEGORY_COLORS[book.category];
                      return (
                        <tr key={book.id} className="eb-row-enter"
                          style={{ borderBottom: i < paged.length - 1 ? "1px solid #f9fafb" : "none", animationDelay: `${i * 0.05}s` }}
                          onMouseEnter={() => setHoveredRow(book.id)}
                          onMouseLeave={() => setHoveredRow(null)}>
                          <td style={{ padding: "16px 24px", background: hoveredRow === book.id ? "#fafafa" : "transparent", transition: "background 0.15s" }}>
                            <div style={{ borderRadius: 6, overflow: "hidden", display: "inline-block", boxShadow: "2px 2px 8px rgba(0,0,0,0.12)" }}>
                              <BookCover bg={book.coverBg} accent={book.coverAccent} title={book.title} />
                            </div>
                          </td>
                          <td style={{ padding: "16px 24px", background: hoveredRow === book.id ? "#fafafa" : "transparent", transition: "background 0.15s", maxWidth: 260 }}>
                            {book.href ? (
                              <a href={book.href} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: BRAND, marginBottom: 3, lineHeight: 1.4, textDecoration: "none" }}>
                                <ExternalIcon />
                                {book.title}
                              </a>
                            ) : (
                              <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 3, lineHeight: 1.4 }}>{book.title}</p>
                            )}
                            <p style={{ fontSize: 12, color: "#9ca3af" }}>{book.pages} Pages • {book.format}</p>
                          </td>
                          <td style={{ padding: "16px 24px", background: hoveredRow === book.id ? "#fafafa" : "transparent", transition: "background 0.15s" }}>
                            <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: cat.bg, color: cat.color }}>{book.category}</span>
                          </td>
                          <td style={{ padding: "16px 24px", background: hoveredRow === book.id ? "#fafafa" : "transparent", transition: "background 0.15s" }}>
                            <p style={{ fontSize: 13.5, color: "#374151" }}>{book.lastUpdated}</p>
                          </td>
                          <td style={{ padding: "16px 24px", background: hoveredRow === book.id ? "#fafafa" : "transparent", transition: "background 0.15s" }}>
                            <div style={{ display: "flex", gap: 8 }}>
                              <button className="eb-act-btn" title="Edit" onClick={() => setEditingEBook(book)}><EditIcon /></button>
                              <button className="eb-act-btn delete" title="Delete" onClick={() => handleDelete(book.id)}><TrashIcon /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderTop: "1px solid #f3f4f6" }}>
                  <p style={{ fontSize: 12.5, color: "#9ca3af" }}>Showing {paged.length} of {ebooks.length} e-books</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="eb-pg-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Previous</button>
                    <button className="eb-pg-btn next" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
                  </div>
                </div>
              </div>

              <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 24 }}>*Newly uploaded eBooks will be featured as the latest eBooks on the website</p>
              <p style={{ textAlign: "center", fontSize: 11.5, color: "#d1d5db", marginTop: 16 }}>© 2025 MoneyMati. All administrative rights reserved.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && <AddEBookModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 1000, background: "white", borderRadius: 14, padding: "14px 20px", boxShadow: "0 4px 24px rgba(0,0,0,0.12)", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: 14, animation: "fadeUp 0.3s ease both", minWidth: 280 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: BRAND_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke={BRAND} strokeWidth="1.4" /><path d="M5 8l2.5 2.5 4-4.5" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#0d1117", margin: 0 }}>{toast}</p>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "2px 0 0" }}>All details updated successfully</p>
          </div>
          <button onClick={() => setToast(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
        </div>
      )}
    </>
  );
}
