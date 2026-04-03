"use client";

import { useEffect, useState } from "react";
import SideNav from "@/components/sidenav";
import TopNav from "@/components/topnav";

const BRAND = "#16a06b";
const BRAND_DARK = "#0f7a52";
const BRAND_LIGHT = "#e6f7f0";

type Status = "upcoming" | "completed" | "live";
type ThumbType = "crypto" | "wealth" | "reits" | "tax" | "markets";

interface Webinar {
  id: string;
  title: string;
  host: string;
  date: string;
  time: string;
  status: Status;
  thumbBg?: string;
  thumbType: ThumbType;
  scheduledAt: string;
}

type ApiWebinar = {
  id: string;
  title: string;
  host: string;
  scheduledAt: string;
  status: "UPCOMING" | "LIVE" | "COMPLETED";
  thumbType: ThumbType | null;
};

const thumbTypes: ThumbType[] = ["crypto", "wealth", "reits", "tax", "markets"];

const WEBINARS: Webinar[] = [
  { id: "1", title: "Advanced Crypto Trading Strategies 2026", host: "James Carter", date: "Apr 24, 2026", time: "02:00 PM IST", status: "upcoming", thumbBg: "#dbeeff", thumbType: "crypto", scheduledAt: "2026-04-24T08:30:00.000Z" },
  { id: "2", title: "Wealth Preservation in Volatile Markets", host: "Priya Menon", date: "Apr 24, 2026", time: "02:00 PM IST", status: "completed", thumbBg: "#1e1e1e", thumbType: "wealth", scheduledAt: "2026-04-24T08:30:00.000Z" },
  { id: "3", title: "Mastering Real Estate REITs", host: "Arjun Shah", date: "Apr 24, 2026", time: "02:00 PM IST", status: "completed", thumbBg: "#111", thumbType: "reits", scheduledAt: "2026-04-24T08:30:00.000Z" },
  { id: "4", title: "Tax Strategies for High Net Worth Individuals", host: "Sunita Rao", date: "Apr 28, 2026", time: "11:00 AM IST", status: "upcoming", thumbBg: "#dceeff", thumbType: "tax", scheduledAt: "2026-04-28T05:30:00.000Z" },
  { id: "5", title: "Global Macro Investing in 2026", host: "Vikram Nair", date: "May 2, 2026", time: "03:00 PM IST", status: "live", thumbBg: "#1a2a1a", thumbType: "markets", scheduledAt: "2026-05-02T09:30:00.000Z" },
];

const formatDateIST = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "Asia/Kolkata",
  }).format(new Date(iso));

const formatTimeIST = (iso: string) =>
  `${new Intl.DateTimeFormat("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata",
  }).format(new Date(iso))} IST`;

const mapApiToWebinar = (w: ApiWebinar): Webinar => {
  const iso = w.scheduledAt ?? new Date().toISOString();
  const thumbType = (w.thumbType as ThumbType | null) ?? thumbTypes[0];
  return {
    id: w.id, title: w.title, host: w.host,
    date: formatDateIST(iso), time: formatTimeIST(iso),
    status: w.status.toLowerCase() as Status,
    thumbType, thumbBg: "#dbeeff", scheduledAt: iso,
  };
};

// ─── Thumbnails ───────────────────────────────────────────────────────────────
const ThumbCrypto = () => (
  <svg width="52" height="36" viewBox="0 0 52 36" fill="none">
    <rect width="52" height="36" rx="5" fill="#dbeeff" />
    <circle cx="26" cy="18" r="9" stroke="#3b82f6" strokeWidth="1.8" fill="none" />
    <path d="M26 11v14M22 14.5l4 2 4-2" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const ThumbWealth = () => (
  <svg width="52" height="36" viewBox="0 0 52 36" fill="none">
    <rect width="52" height="36" rx="5" fill="#1e1e1e" />
    <circle cx="26" cy="18" r="8" fill="none" stroke="#555" strokeWidth="1.5" />
    <circle cx="26" cy="18" r="3" fill="#555" />
    <line x1="26" y1="10" x2="26" y2="6" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="34" y1="18" x2="38" y2="18" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const ThumbREITs = () => (
  <svg width="52" height="36" viewBox="0 0 52 36" fill="none">
    <rect width="52" height="36" rx="5" fill="#111" />
    <rect x="10" y="12" width="8" height="18" fill="#444" />
    <rect x="22" y="6" width="8" height="24" fill="#666" />
    <rect x="34" y="16" width="8" height="14" fill="#444" />
  </svg>
);
const ThumbTax = () => (
  <svg width="52" height="36" viewBox="0 0 52 36" fill="none">
    <rect width="52" height="36" rx="5" fill="#dceeff" />
    <path d="M16 10h20M16 18h14M16 26h10" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const ThumbMarkets = () => (
  <svg width="52" height="36" viewBox="0 0 52 36" fill="none">
    <rect width="52" height="36" rx="5" fill="#1a2a1a" />
    <polyline points="10,26 18,18 24,22 32,12 42,16" stroke="#16a06b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="42" cy="16" r="2.5" fill="#16a06b" />
  </svg>
);

const thumbMap = { crypto: ThumbCrypto, wealth: ThumbWealth, reits: ThumbREITs, tax: ThumbTax, markets: ThumbMarkets };

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: Status }) => {
  const styles: Record<Status, { bg: string; color: string; label: string; dot?: string }> = {
    upcoming: { bg: BRAND_LIGHT, color: BRAND_DARK, label: "Upcoming" },
    completed: { bg: "#f3f4f6", color: "#6b7280", label: "Completed" },
    live: { bg: "#fef2f2", color: "#dc2626", label: "Live", dot: "#dc2626" },
  };
  const s = styles[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", background: s.bg, color: s.color }}>
      {s.dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, display: "inline-block", animation: "blink 1.2s ease-in-out infinite" }} />}
      {s.label}
    </span>
  );
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const EditIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 1.5l2.5 2.5L4 12.5H1.5V10L10 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>;
const TrashIcon = () => <svg width="13" height="14" viewBox="0 0 13 14" fill="none"><path d="M1 3.5h11M4.5 3.5V2h4v1.5M2 3.5l.8 9.5h7.4L11 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const FilterIcon = () => <svg width="14" height="12" viewBox="0 0 14 12" fill="none"><path d="M1 1h12M3 6h8M5 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>;
const MoreIcon = () => <svg width="4" height="16" viewBox="0 0 4 16" fill="none"><circle cx="2" cy="2" r="1.6" fill="currentColor" /><circle cx="2" cy="8" r="1.6" fill="currentColor" /><circle cx="2" cy="14" r="1.6" fill="currentColor" /></svg>;
const CalendarIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1.5" y="3.5" width="17" height="15" rx="2.5" stroke={BRAND} strokeWidth="1.5" /><path d="M6 2v3M14 2v3M1.5 8h17" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" /></svg>;
const PlayIcon = () => <svg width="16" height="18" viewBox="0 0 16 18" fill="none"><path d="M2 1.5l12 7-12 7V1.5z" fill="white" /></svg>;
const LinkIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 8.5l3-3M7.5 4.5l1-1a2.121 2.121 0 113 3l-1 1M6.5 9.5l-1 1a2.121 2.121 0 11-3-3l1-1" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" /></svg>;
const UploadIcon = () => <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ margin: "0 auto 10px", display: "block" }}><path d="M16 22V10M16 10L11 15M16 10L21 15" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 24c0 1.1.9 2 2 2h16a2 2 0 002-2" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" /></svg>;
const SaveIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="white" strokeWidth="1.3" /><path d="M4 1v4h6V1" stroke="white" strokeWidth="1.3" strokeLinejoin="round" /><rect x="3" y="7" width="8" height="5" rx="1" stroke="white" strokeWidth="1.3" /></svg>;
const ChevronIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, subtitle, onClose }: { message: string; subtitle: string; onClose: () => void }) {
  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 1000,
      background: "white", borderRadius: 14, padding: "14px 20px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.12)", border: "1px solid #e5e7eb",
      display: "flex", alignItems: "center", gap: 14,
      animation: "fadeUp 0.3s ease both", minWidth: 300,
    }}>
      <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#e6f7f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="8" stroke="#16a06b" strokeWidth="1.5" />
          <path d="M5.5 9l2.5 2.5 4.5-5" stroke="#16a06b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#0d1117", margin: 0 }}>{message}</p>
        <p style={{ fontSize: 12.5, color: "#6b7280", margin: "2px 0 0" }}>{subtitle}</p>
      </div>
      <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteConfirmModal({ webinar, onCancel, onConfirm }: { webinar: Webinar; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="wm-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="wm-modal wm-delete-modal">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(220,38,38,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 3L26 24H2L14 3Z" fill="#dc2626" stroke="#dc2626" strokeWidth="1" strokeLinejoin="round" />
              <path d="M14 11v6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="14" cy="20" r="1.2" fill="white" />
            </svg>
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: "#0d1117", marginBottom: 10, textAlign: "center" }}>Delete Webinar?</h2>
          <p style={{ fontSize: 13.5, color: "#6b7280", textAlign: "center", lineHeight: 1.6, maxWidth: 300 }}>
            Are you sure you want to delete{" "}
            <strong style={{ color: "#111827" }}>"{webinar.title}"</strong>?{" "}
            This action cannot be undone and all registrant data will be archived.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button onClick={onConfirm} style={{ width: "100%", padding: "14px", borderRadius: 50, border: "none", background: "#dc2626", color: "white", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background 0.18s, transform 0.12s" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "#b91c1c"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "#dc2626"; }}
            onMouseDown={(e) => { (e.target as HTMLElement).style.transform = "scale(0.98)"; }}
            onMouseUp={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; }}>
            Delete
          </button>
          <button onClick={onCancel} style={{ width: "100%", padding: "13px", borderRadius: 50, border: "none", background: "transparent", color: "#374151", fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "color 0.15s" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#111"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#374151"; }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Webinar Page ────────────────────────────────────────────────────────
function EditWebinarPage({ webinar, onCancel, onSave }: { webinar: Webinar; onCancel: () => void; onSave: (updated: Webinar) => Promise<void> | void }) {
  const [title, setTitle] = useState(webinar.title);
  const [host, setHost] = useState(webinar.host);
  const [status, setStatus] = useState<Status>(webinar.status);
  const [date, setDate] = useState(() => {
    if (webinar.scheduledAt) return webinar.scheduledAt.slice(0, 10);
    try { const d = new Date(webinar.date); if (!isNaN(d.getTime())) return d.toISOString().split("T")[0]; } catch {}
    return "";
  });
  const [time, setTime] = useState(() => {
    if (webinar.scheduledAt) {
      const d = new Date(webinar.scheduledAt);
      return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    }
    try {
      const match = webinar.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (match) {
        let h = parseInt(match[1]); const m = match[2]; const ampm = match[3].toUpperCase();
        if (ampm === "PM" && h !== 12) h += 12;
        if (ampm === "AM" && h === 12) h = 0;
        return `${String(h).padStart(2, "0")}:${m}`;
      }
    } catch {}
    return "";
  });
  const [link, setLink] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleSave = async () => {
    const iso = date && time ? new Date(`${date}T${time}`).toISOString() : webinar.scheduledAt || new Date().toISOString();
    await onSave({ ...webinar, title, host, status, date: formatDateIST(iso), time: formatTimeIST(iso), scheduledAt: iso });
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f7f8fa", padding: "32px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase", padding: 0, fontFamily: "'DM Sans', sans-serif" }}>Webinar Manager</button>
        <ChevronIcon />
        <span style={{ fontSize: 12, fontWeight: 600, color: BRAND, letterSpacing: "0.06em", textTransform: "uppercase" }}>Edit Webinar</span>
      </div>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700, color: "#0d1117", letterSpacing: "-0.02em", marginBottom: 28 }}>Edit Webinar</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "start" }}>
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: "28px 30px 30px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "#0d1117", marginBottom: 4 }}>Webinar Details</h2>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>Update the information and visual content of your<br />upcoming live session.</p>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", background: status === "live" ? "#fef2f2" : status === "upcoming" ? BRAND_LIGHT : "#f3f4f6", color: status === "live" ? "#dc2626" : status === "upcoming" ? BRAND_DARK : "#6b7280" }}>
              {status === "live" && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#dc2626", display: "inline-block", animation: "blink 1.2s ease-in-out infinite" }} />}
              {status.toUpperCase()} STATUS
            </span>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label className="wm-field-label">Webinar Name</label>
            <input className="wm-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Mastering Wealth: The 2025 Investment Roadmap" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label className="wm-field-label">Speaker Name</label>
              <input className="wm-input" value={host} onChange={(e) => setHost(e.target.value)} placeholder="Speaker Name" />
            </div>
            <div>
              <label className="wm-field-label">Status</label>
              <div style={{ position: "relative" }}>
                <select className="wm-select" value={status} onChange={(e) => setStatus(e.target.value as Status)} style={{ paddingRight: 32 }}>
                  <option value="upcoming">Upcoming</option>
                  <option value="live">Live</option>
                  <option value="completed">Completed</option>
                </select>
                <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label className="wm-field-label">Date</label>
              <div style={{ position: "relative" }}>
                <input className="wm-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ paddingRight: 36 }} />
                <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="12" rx="2" stroke="#9ca3af" strokeWidth="1.2" /><path d="M5 1.5v2M11 1.5v2M1 6.5h14" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" /></svg>
                </div>
              </div>
            </div>
            <div>
              <label className="wm-field-label">Time</label>
              <div style={{ position: "relative" }}>
                <input className="wm-input" type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ paddingRight: 36 }} />
                <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#9ca3af" strokeWidth="1.2" /><path d="M8 5v3.5l2 1.5" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 28 }}>
            <label className="wm-field-label">Webinar Platform Hosting Link</label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><LinkIcon /></div>
              <input className="wm-input-link" placeholder="https://zoom.us/j/..." value={link} onChange={(e) => setLink(e.target.value)} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={onCancel} style={{ padding: "10px 22px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontSize: 13.5, fontWeight: 500, cursor: "pointer", color: "#374151", fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s" }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "#f9fafb"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "white"; }}>
              Cancel
            </button>
            <button className="wm-btn-primary" onClick={handleSave} style={{ padding: "10px 22px", fontSize: 13.5 }}>
              <SaveIcon />Save Changes
            </button>
          </div>
        </div>
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: "24px" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#0d1117", marginBottom: 16 }}>Webinar Thumbnail</h3>
          <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #f3f4f6", marginBottom: 12, background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", height: 130 }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: "#d1d5db", letterSpacing: "-0.02em" }}>webinar</span>
          </div>
          <div className="wm-upload-zone"
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
            style={{ borderColor: dragOver ? BRAND : "#d1d5db", background: dragOver ? BRAND_LIGHT : "#f9fafb" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ margin: "0 auto 8px", display: "block" }}>
              <path d="M14 19V9M14 9L10 13M14 9L18 13" stroke={dragOver ? BRAND : "#9ca3af"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 21c0 1 .8 1.8 1.8 1.8h14.4C22.2 22.8 23 22 23 21" stroke={dragOver ? BRAND : "#9ca3af"} strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <p style={{ fontSize: 12.5, color: "#6b7280", margin: "0 0 3px" }}>Click to upload or <span style={{ color: BRAND, cursor: "pointer", fontWeight: 500 }}>drag & drop</span></p>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>PNG, JPG OR WEBP (MAX 2MB)</p>
          </div>
        </div>
      </div>
      <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 32 }}>© 2025 MoneyMati. All administrative rights reserved.</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WebinarManager() {
  const [webinars, setWebinars] = useState<Webinar[]>(WEBINARS);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [showModal, setShowModal] = useState(false);
  const [editingWebinar, setEditingWebinar] = useState<Webinar | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Webinar | null>(null);
  const [liveCountApi, setLiveCountApi] = useState<number | null>(null);
  const [upcomingCountApi, setUpcomingCountApi] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; subtitle: string } | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newHost, setNewHost] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newStatus, setNewStatus] = useState<"draft" | Status>("draft");
  const [newLink, setNewLink] = useState("");
  const [loadError, setLoadError] = useState<string | null>(null);

  const showToast = (message: string, subtitle: string) => {
    setToast({ message, subtitle });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/webinars/stats");
      if (!res.ok) throw new Error(`Failed to load webinar stats (HTTP ${res.status})`);
      const data = await res.json();
      setLiveCountApi(data.live ?? null);
      setUpcomingCountApi(data.upcoming ?? null);
    } catch (error) {
      console.warn("Webinar stats unavailable", error);
      setLiveCountApi(null);
      setUpcomingCountApi(null);
    }
  };

  const fetchWebinars = async () => {
    try {
      const res = await fetch("/api/admin/webinars");
      if (res.ok) {
        const data = await res.json();
        const items = (data.items ?? []) as ApiWebinar[];
        if (items.length > 0) {
          setWebinars(items.map(mapApiToWebinar));
        } else {
          setWebinars(WEBINARS);
        }
        setLoadError(null);
      } else {
        const message = `Failed to load webinars (HTTP ${res.status})`;
        console.warn(message);
        setLoadError(message);
      }
    } catch (error) {
      console.error("Failed to load webinars", error);
      setWebinars(WEBINARS);
      setLoadError(error instanceof Error ? error.message : "Unable to load webinars from the server.");
    }
  };

  useEffect(() => { fetchWebinars(); }, []);
  useEffect(() => { fetchStats(); }, []);

  const filtered = filter === "all" ? webinars : webinars.filter((w) => w.status === filter);
  const totalPages = Math.ceil(filtered.length / 4);
  const paged = filtered.slice((currentPage - 1) * 4, currentPage * 4);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await fetch(`/api/admin/webinars/${deleteTarget.id}`, { method: "DELETE" });
    } catch (error) {
      console.error("Failed to delete webinar", error);
    }
    setWebinars((prev) => prev.filter((w) => w.id !== deleteTarget.id));
    fetchStats();
    setDeleteTarget(null);
  };

  const handleEditSave = async (updated: Webinar) => {
    try {
      const res = await fetch(`/api/admin/webinars/${updated.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updated.title, host: updated.host,
          status: updated.status.toUpperCase(),
          scheduledAt: updated.scheduledAt, thumbType: updated.thumbType,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      const saved = await res.json();
      const mapped = mapApiToWebinar(saved);
      setWebinars((prev) => prev.map((w) => (w.id === mapped.id ? mapped : w)));
      fetchStats();
      showToast("Changes Saved", "All Details updated successfully");
    } catch (error) {
      console.error("Unable to update webinar", error);
    }
    setEditingWebinar(null);
  };

  const resetForm = () => {
    setNewTitle(""); setNewHost(""); setNewDate(""); setNewTime(""); setNewStatus("draft"); setNewLink("");
  };

  const handleSave = async () => {
    if (!newTitle.trim()) return;
    const scheduledAt = newDate ? new Date(`${newDate}T${newTime || "00:00"}`) : new Date();
    const payload = {
      title: newTitle.trim(),
      host: newHost.trim() || "TBD",
      scheduledAt: scheduledAt.toISOString(),
      status: newStatus === "draft" ? "UPCOMING" : newStatus.toUpperCase(),
      thumbType: thumbTypes[Math.floor(Math.random() * thumbTypes.length)],
    };
    try {
      const res = await fetch("/api/admin/webinars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Create failed");
      const created = await res.json();
      const mapped = mapApiToWebinar(created);
      setWebinars((prev) => [mapped, ...prev]);
      fetchStats();
      resetForm();
      setShowModal(false);
      showToast("New Webinar Added", "All Details updated successfully");
    } catch (error) {
      console.error("Unable to create webinar", error);
    }
  };

  const liveCount = liveCountApi ?? webinars.filter((w) => w.status === "live").length;
  const upcomingCount = upcomingCountApi ?? webinars.filter((w) => w.status === "upcoming").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wm-root { font-family: 'DM Sans', sans-serif; background: #f7f8fa; min-height: 100vh; padding: 32px 36px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
        .wm-row-enter { animation: fadeUp 0.3s ease both; }
        .edit-page-enter { animation: slideIn 0.25s ease both; }
        .wm-btn-primary { background: ${BRAND}; color: white; border: none; border-radius: 10px; padding: 10px 20px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 7px; transition: background 0.18s, transform 0.12s; white-space: nowrap; }
        .wm-btn-primary:hover { background: ${BRAND_DARK}; transform: translateY(-1px); }
        .wm-btn-primary:active { transform: scale(0.98); }
        .wm-icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e5e7eb; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #6b7280; transition: background 0.15s, color 0.15s, border-color 0.15s; }
        .wm-icon-btn:hover { background: #f9fafb; color: #111; border-color: #d1d5db; }
        .wm-act-btn { width: 30px; height: 30px; border-radius: 7px; border: 1px solid #e5e7eb; background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #9ca3af; transition: all 0.15s; }
        .wm-act-btn:hover { background: #f3f4f6; color: #374151; border-color: #d1d5db; }
        .wm-act-btn.delete:hover { background: #fef2f2; color: #dc2626; border-color: #fca5a5; }
        .wm-filter-pill { padding: 5px 14px; border-radius: 20px; border: 1px solid #e5e7eb; background: white; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; color: #6b7280; transition: all 0.15s; }
        .wm-filter-pill:hover { border-color: ${BRAND}; color: ${BRAND}; }
        .wm-filter-pill.active { background: ${BRAND}; color: white; border-color: ${BRAND}; }
        .wm-pg-btn { width: 30px; height: 30px; border-radius: 7px; border: 1px solid #e5e7eb; background: white; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; color: #6b7280; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
        .wm-pg-btn:hover:not(.active) { background: #f3f4f6; }
        .wm-pg-btn.active { background: ${BRAND}; color: white; border-color: ${BRAND}; }
        .wm-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 999; animation: scaleIn 0.2s ease; }
        .wm-modal { background: white; border-radius: 18px; padding: 28px 28px 24px; width: 460px; max-width: 95vw; box-shadow: 0 24px 64px rgba(0,0,0,0.14); }
        .wm-delete-modal { width: 380px; padding: 36px 32px 28px; }
        .wm-input { width: 100%; padding: 9px 13px; border: 1px solid #e5e7eb; border-radius: 9px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #111; outline: none; background: #f9fafb; transition: border-color 0.15s, background 0.15s; }
        .wm-input:focus { border-color: ${BRAND}; background: white; box-shadow: 0 0 0 3px ${BRAND}18; }
        .wm-input-link { width: 100%; padding: 9px 13px 9px 32px; border: 1px solid #e5e7eb; border-radius: 9px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #111; outline: none; background: #f9fafb; transition: border-color 0.15s, background 0.15s; }
        .wm-input-link:focus { border-color: ${BRAND}; background: white; box-shadow: 0 0 0 3px ${BRAND}18; }
        .wm-select { width: 100%; padding: 9px 13px; border: 1px solid #e5e7eb; border-radius: 9px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #111; outline: none; background: #f9fafb; appearance: auto; transition: border-color 0.15s; }
        .wm-select:focus { border-color: ${BRAND}; box-shadow: 0 0 0 3px ${BRAND}18; }
        .wm-field-label { font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; display: block; margin-bottom: 6px; }
        .wm-upload-zone { border: 1.5px dashed #d1d5db; border-radius: 10px; padding: 24px 20px; text-align: center; background: #f9fafb; cursor: pointer; transition: border-color 0.15s, background 0.15s; }
        .wm-upload-zone:hover { border-color: ${BRAND}; background: ${BRAND_LIGHT}; }
      `}</style>

      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <SideNav />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <TopNav />

          {editingWebinar ? (
            <div className="edit-page-enter" style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <EditWebinarPage webinar={editingWebinar} onCancel={() => setEditingWebinar(null)} onSave={handleEditSave} />
            </div>
          ) : (
            <div className="wm-root" style={{ flex: 1, overflowY: "auto" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
                <div>
                  <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 700, color: "#0d1117", letterSpacing: "-0.02em" }}>Webinar Manager</h1>
                  <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 4 }}>Schedule and manage your live financial seminars.</p>
                  {loadError && <p style={{ fontSize: 12.5, color: "#dc2626", marginTop: 6 }}>{loadError}</p>}
                </div>
                <button className="wm-btn-primary" onClick={() => setShowModal(true)}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  Add Webinar
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                <div style={{ background: `linear-gradient(135deg, ${BRAND} 0%, #0f9060 100%)`, borderRadius: 14, padding: "22px 24px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", right: 20, top: 18 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <PlayIcon />
                    </div>
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 6 }}>Active Live Now</p>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 44, fontWeight: 700, color: "white", lineHeight: 1 }}>{String(liveCount).padStart(2, "0")}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "white", display: "inline-block", animation: "blink 1.2s ease-in-out infinite" }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>1.4k viewers watching</span>
                  </div>
                </div>
                <div style={{ background: "white", borderRadius: 14, padding: "22px 24px", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Total Upcoming</p>
                      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 44, fontWeight: 700, color: "#0d1117", lineHeight: 1 }}>{upcomingCount}</p>
                      <p style={{ fontSize: 13, color: BRAND, marginTop: 8, fontWeight: 500 }}>+12% from last month</p>
                    </div>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: BRAND_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CalendarIcon />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: "white", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ padding: "18px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 600, color: "#0d1117" }}>Webinar Schedule</h2>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {(["all", "upcoming", "completed", "live"] as const).map((f) => (
                      <button key={f} className={`wm-filter-pill ${filter === f ? "active" : ""}`} onClick={() => { setFilter(f); setCurrentPage(1); }}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                    <div style={{ width: 1, height: 20, background: "#e5e7eb", margin: "0 4px" }} />
                    <button className="wm-icon-btn"><FilterIcon /></button>
                    <button className="wm-icon-btn"><MoreIcon /></button>
                  </div>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                      {["Thumbnail", "Webinar Title", "Date & Time", "Status", "Actions"].map((h) => (
                        <th key={h} style={{ padding: "8px 24px", textAlign: "left", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#9ca3af" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paged.map((w, i) => {
                      const Thumb = thumbMap[w.thumbType];
                      return (
                        <tr key={w.id} className="wm-row-enter" style={{ borderBottom: "1px solid #f9fafb", animationDelay: `${i * 0.05}s`, cursor: "default" }}
                          onMouseEnter={() => setHoveredRow(w.id)} onMouseLeave={() => setHoveredRow(null)}>
                          <td style={{ padding: "14px 24px", background: hoveredRow === w.id ? "#fafafa" : "transparent", transition: "background 0.15s" }}>
                            <div style={{ borderRadius: 7, overflow: "hidden", display: "inline-block", border: "1px solid #f3f4f6" }}><Thumb /></div>
                          </td>
                          <td style={{ padding: "14px 24px", background: hoveredRow === w.id ? "#fafafa" : "transparent", transition: "background 0.15s" }}>
                            <p style={{ fontSize: 13.5, fontWeight: 500, color: "#111827" }}>{w.title}</p>
                            <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>Host: {w.host}</p>
                          </td>
                          <td style={{ padding: "14px 24px", background: hoveredRow === w.id ? "#fafafa" : "transparent", transition: "background 0.15s" }}>
                            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{w.date}<br /><span style={{ color: "#9ca3af", fontSize: 12 }}>{w.time}</span></p>
                          </td>
                          <td style={{ padding: "14px 24px", background: hoveredRow === w.id ? "#fafafa" : "transparent", transition: "background 0.15s" }}>
                            <StatusBadge status={w.status} />
                          </td>
                          <td style={{ padding: "14px 24px", background: hoveredRow === w.id ? "#fafafa" : "transparent", transition: "background 0.15s" }}>
                            <div style={{ display: "flex", gap: 8 }}>
                              <button className="wm-act-btn" title="Edit" onClick={() => setEditingWebinar(w)}><EditIcon /></button>
                              <button className="wm-act-btn delete" title="Delete" onClick={() => setDeleteTarget(w)}><TrashIcon /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderTop: "1px solid #f3f4f6" }}>
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>
                    Showing {Math.min((currentPage - 1) * 4 + 1, filtered.length)}-{Math.min(currentPage * 4, filtered.length)} of {filtered.length} webinars
                  </p>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <button className="wm-pg-btn" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} style={{ opacity: currentPage === 1 ? 0.4 : 1 }}>‹</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button key={p} className={`wm-pg-btn ${currentPage === p ? "active" : ""}`} onClick={() => setCurrentPage(p)}>{p}</button>
                    ))}
                    <button className="wm-pg-btn" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{ opacity: currentPage === totalPages ? 0.4 : 1 }}>›</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Delete Confirmation Modal ──────────────────────────────────────── */}
      {deleteTarget && (
        <DeleteConfirmModal webinar={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} />
      )}

      {/* ─── Add Webinar Modal ──────────────────────────────────────────────── */}
      {showModal && (
        <div className="wm-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) { resetForm(); setShowModal(false); } }}>
          <div className="wm-modal">
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
              <div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: "#0d1117", marginBottom: 4 }}>Add New Webinar</h2>
                <p style={{ fontSize: 13, color: "#6b7280" }}>Create a new architectural learning experience.</p>
              </div>
              <button onClick={() => { resetForm(); setShowModal(false); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 22, lineHeight: 1, marginTop: 2, padding: "0 0 0 8px" }}>×</button>
            </div>
            <div style={{ marginTop: 20 }}>
              <label className="wm-field-label">Webinar Thumbnail</label>
              <div className="wm-upload-zone">
                <UploadIcon />
                <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 4px" }}>Drag image or <span style={{ color: BRAND, cursor: "pointer", fontWeight: 500 }}>browse files</span></p>
                <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>1920×1080px (PNG, JPG) max 5MB</p>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <label className="wm-field-label">Webinar Name</label>
              <input className="wm-input" placeholder="e.g. Sovereign Wealth Management" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
              <div>
                <label className="wm-field-label">Host Name</label>
                <input className="wm-input" placeholder="Enter full name" value={newHost} onChange={(e) => setNewHost(e.target.value)} />
              </div>
              <div>
                <label className="wm-field-label">Status</label>
                <select className="wm-select" value={newStatus} onChange={(e) => setNewStatus(e.target.value as "draft" | Status)}>
                  <option value="draft">Draft</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="live">Live</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
              <div>
                <label className="wm-field-label">Date</label>
                <input className="wm-input" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
              </div>
              <div>
                <label className="wm-field-label">Time</label>
                <input className="wm-input" type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <label className="wm-field-label">Webinar Platform Hosting Link</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><LinkIcon /></div>
                <input className="wm-input-link" placeholder="https://zoom.us/j/..." value={newLink} onChange={(e) => setNewLink(e.target.value)} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
              <button onClick={() => { resetForm(); setShowModal(false); }} style={{ padding: "9px 20px", borderRadius: 9, border: "1px solid #e5e7eb", background: "white", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
              <button className="wm-btn-primary" onClick={handleSave}>Add Webinar</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Toast Notification ─────────────────────────────────────────────── */}
      {toast && (
        <Toast
          message={toast.message}
          subtitle={toast.subtitle}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}