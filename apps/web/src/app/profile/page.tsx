"use client";

import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import { Eye, EyeOff, CheckCircle2, Circle, ShieldCheck } from 'lucide-react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { authClient } from "@/app/lib/auth-client";

// ── Types ────────────────────────────────────────────────────────────────────
type NotifPrefs = {
  webinarUpdates: boolean;
  newBlogResources: boolean;
  monthlyWealthReport: boolean;
  upcomingBookingReminders: boolean;
  communityMentions: boolean;
};

type NotifPrefKey = keyof NotifPrefs;

// ── Notification Preferences Modal ──────────────────────────────────────────
function NotificationModal({ onClose }: { onClose: () => void }) {
  const [prefs, setPrefs] = useState<NotifPrefs>({
    webinarUpdates: true,
    newBlogResources: true,
    monthlyWealthReport: false,
    upcomingBookingReminders: true,
    communityMentions: false,
  });

  const toggle = (key: NotifPrefKey) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.40)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "fadeInBg 0.2s ease both",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @keyframes fadeInBg { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }

        .notif-modal {
          background: #fff;
          border-radius: 24px;
          width: 100%;
          max-width: 560px;
          padding: 32px 28px 24px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18);
          animation: slideUp 0.28s cubic-bezier(0.34,1.3,0.64,1) both;
          font-family: 'Inter', sans-serif;
          max-height: 90vh;
          overflow-y: auto;
        }

        @media (max-width: 480px) {
          .notif-modal {
            padding: 24px 16px 18px;
            border-radius: 18px;
          }
        }

        .toggle-track {
          position: relative;
          width: 44px;
          height: 26px;
          border-radius: 9999px;
          background: #e0e0e0;
          cursor: pointer;
          transition: background 0.22s;
          flex-shrink: 0;
          border: none;
          outline: none;
          padding: 0;
        }
        .toggle-track.on { background: #0EAF50; }
        .toggle-thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          transition: transform 0.22s cubic-bezier(0.34,1.3,0.64,1);
        }
        .toggle-track.on .toggle-thumb { transform: translateX(18px); }

        .notif-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid #f2f2f2;
        }
        .notif-row:last-child { border-bottom: none; }

        .section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 20px 0 4px;
        }
        .section-label:first-of-type { margin-top: 8px; }

        .save-btn {
          background: #0EAF50;
          color: #fff;
          border: none;
          border-radius: 9999px;
          padding: 13px 28px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .save-btn:hover { background: #0c9a46; }

        .cancel-modal-btn {
          background: none;
          border: none;
          font-size: 14px;
          font-weight: 600;
          color: #555;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          padding: 13px 20px;
          border-radius: 9999px;
          transition: color 0.15s;
        }
        .cancel-modal-btn:hover { color: #111; }

        @media (max-width: 480px) {
          .notif-modal-footer {
            flex-direction: column-reverse !important;
            align-items: stretch !important;
            gap: 8px !important;
          }
          .notif-modal-footer p {
            text-align: center;
          }
          .notif-modal-footer > div {
            flex-direction: column !important;
            width: 100%;
          }
          .save-btn {
            width: 100%;
            text-align: center;
          }
          .cancel-modal-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <div className="notif-modal">
        <div style={{ textAlign: "center", marginBottom: 4 }}>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: "#111", margin: "0 0 8px", letterSpacing: "-0.5px" }}>
            Notification Preferences
          </h2>
          <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.5 }}>
            Curate your communication flow. Choose how you want to receive<br />
            wealth insights and community updates.
          </p>
        </div>

        <div className="section-label">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0EAF50" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span style={{ fontWeight: 800, fontSize: 15, color: "#111" }}>Email Notifications</span>
        </div>

        <div style={{ background: "#fafafa", borderRadius: 14, padding: "0 16px" }}>
          {[
            { prefKey: "webinarUpdates" as NotifPrefKey, label: "Webinar updates", sub: "Receive invitations to exclusive financial masterclasses." },
            { prefKey: "newBlogResources" as NotifPrefKey, label: "New blog resources", sub: "Get notified when new wealth strategies are published." },
            { prefKey: "monthlyWealthReport" as NotifPrefKey, label: "Monthly wealth report", sub: "Your portfolio performance and market outlook delivered monthly." },
          ].map(({ prefKey, label, sub }) => (
            <div key={prefKey} className="notif-row">
              <div>
                <p style={{ fontWeight: 700, fontSize: 13, color: "#111", margin: "0 0 2px" }}>{label}</p>
                <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{sub}</p>
              </div>
              <button
                className={`toggle-track ${prefs[prefKey] ? "on" : ""}`}
                onClick={() => toggle(prefKey)}
                aria-pressed={prefs[prefKey]}
              >
                <div className="toggle-thumb" />
              </button>
            </div>
          ))}
        </div>

        <div className="section-label">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0EAF50" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span style={{ fontWeight: 800, fontSize: 15, color: "#111" }}>Push Notifications</span>
        </div>

        <div style={{ background: "#fafafa", borderRadius: 14, padding: "0 16px" }}>
          {[
            { prefKey: "upcomingBookingReminders" as NotifPrefKey, label: "Upcoming booking reminders", sub: "Alerts for your scheduled advisor sessions." },
            { prefKey: "communityMentions" as NotifPrefKey, label: "Community mentions", sub: "Real-time alerts when investors engage with your posts." },
          ].map(({ prefKey, label, sub }) => (
            <div key={prefKey} className="notif-row">
              <div>
                <p style={{ fontWeight: 700, fontSize: 13, color: "#111", margin: "0 0 2px" }}>{label}</p>
                <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{sub}</p>
              </div>
              <button
                className={`toggle-track ${prefs[prefKey] ? "on" : ""}`}
                onClick={() => toggle(prefKey)}
                aria-pressed={prefs[prefKey]}
              >
                <div className="toggle-thumb" />
              </button>
            </div>
          ))}
        </div>

        <div className="notif-modal-footer" style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <p style={{ fontSize: 11, color: "#aaa", margin: 0, flex: 1, lineHeight: 1.4 }}>
            Changes may take up to 24 hours to reflect across all systems.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <button className="cancel-modal-btn" onClick={onClose}>Cancel</button>
            <button className="save-btn" onClick={onClose}>Save Preferences</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Update Credentials Modal ─────────────────────────────────────────────────
function UpdateCredentialsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  if (!isOpen) return null;

  const hasLength = newPwd.length >= 8;
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>\[\]\\/;:'`~+=_-]/.test(newPwd);
  const hasUpperAndNumber = /[A-Z]/.test(newPwd) && /[0-9]/.test(newPwd);
  const confirmMatch = newPwd.length > 0 && newPwd === confirmPwd;
  const allValid = hasLength && hasSpecial && hasUpperAndNumber && confirmMatch;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.40)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", animation: "fadeInBg 0.2s ease both" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @keyframes fadeInBg { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
        .cred-modal-inner {
          background: #fff;
          border-radius: 24px;
          width: 100%;
          max-width: 720px;
          padding: 28px 28px 20px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18);
          animation: slideUp 0.28s cubic-bezier(0.34,1.3,0.64,1) both;
          font-family: 'Inter', sans-serif;
          max-height: 90vh;
          overflow-y: auto;
        }
        @media (max-width: 480px) {
          .cred-modal-inner {
            padding: 20px 16px 16px;
            border-radius: 18px;
          }
        }
        .cred-input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid #f3f4f6;
          background: rgba(243,244,246,0.3);
          padding: 12px 48px 12px 16px;
          color: #111;
          box-sizing: border-box;
          font-size: 14px;
        }
        .cred-input-plain {
          width: 100%;
          border-radius: 12px;
          border: 1px solid #f3f4f6;
          background: rgba(243,244,246,0.3);
          padding: 12px 16px;
          color: #111;
          box-sizing: border-box;
          font-size: 14px;
        }
      `}</style>

      <div className="cred-modal-inner">
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: "#111", margin: "0 0 8px", letterSpacing: "-0.5px" }}>Update Credentials</h2>
          <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.5 }}>Ensure your account stays secure with a strong, unique password.</p>
        </div>

        <form style={{ marginTop: 18 }} onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#718096", marginBottom: 6 }}>Current Password</label>
            <div style={{ position: "relative" }}>
              <input value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} type={showCurrent ? "text" : "password"} placeholder="••••••••" className="cred-input" />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#9ca3af" }}>{showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#718096", marginBottom: 6 }}>New Password</label>
            <div style={{ position: "relative" }}>
              <input value={newPwd} onChange={(e) => setNewPwd(e.target.value)} type={showNew ? "text" : "password"} placeholder="••••••••" className="cred-input" />
              <button type="button" onClick={() => setShowNew(!showNew)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#9ca3af" }}>{showNew ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#718096", marginBottom: 6 }}>Confirm New Password</label>
            <input value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} type="password" placeholder="••••••••" className="cred-input-plain" />
          </div>

          <div style={{ borderRadius: 18, background: "#f0fdf4", padding: 18, marginBottom: 18 }}>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#6b7280", margin: 0 }}>Security Requirements</p>
            <ul style={{ marginTop: 10, paddingLeft: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { ok: hasLength, label: "Minimum 8 characters length" },
                { ok: hasSpecial, label: "At least one special character (!@#$)" },
                { ok: hasUpperAndNumber, label: "One uppercase letter and one number" },
                { ok: confirmMatch, label: "Passwords match" },
              ].map(({ ok, label }) => (
                <li key={label} style={{ display: "flex", gap: 12, alignItems: "center", color: ok ? "#2d3748" : "#718096", fontSize: 13 }}>
                  <span style={{ width: 18, height: 18, borderRadius: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", background: ok ? "#ecfdf3" : "transparent", color: ok ? "#0EAF50" : "#cbd5e1", border: ok ? "none" : "2px solid #e6eaf0" }}>{ok ? <CheckCircle2 size={14} /> : <Circle size={12} />}</span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: "flex", gap: 8, flexDirection: "column", alignItems: "center" }}>
            <button
              type="button"
              disabled={!allValid}
              onClick={() => { if (allValid) onClose(); }}
              style={{ width: "100%", maxWidth: 520, borderRadius: 9999, padding: "14px 22px", background: allValid ? "#0EAF50" : "#94d3b6", color: "#fff", fontWeight: 800, fontSize: 15, border: "none", cursor: allValid ? "pointer" : "not-allowed", opacity: allValid ? 1 : 0.9 }}
            >
              Update Password
            </button>
            <button type="button" onClick={onClose} style={{ marginTop: 8, background: "transparent", border: "none", color: "#4b5563", fontSize: 13 }}>Cancel and go back</button>

            <div style={{ marginTop: 18, borderRadius: 18, background: "#f0fbf6", padding: 18, border: "1px solid rgba(16,185,129,0.08)", display: "flex", gap: 14, alignItems: "flex-start", width: "100%", boxSizing: "border-box" }}>
              <div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 10, background: "#ecfdf3", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981" }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#0f172a" }}>Pro Security Tip</h4>
                <p style={{ margin: "6px 0 0", color: "#475569", fontSize: 13, lineHeight: 1.45 }}>
                  Consider using a unique password not shared with other services. <span style={{ fontWeight: 800, color: "#10b981" }}>MoneyMati</span> recommends updating credentials every 90 days for optimal sovereign security.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Profile Page ────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { data: sessionData, isPending } = authClient.useSession();
  const sessionUser =
    (sessionData as any)?.user ?? (sessionData as any)?.data?.user ?? null;
  const baseUser = !isPending && sessionUser
    ? {
        name: sessionUser.name || sessionUser.email || "User",
        email: sessionUser.email || "username@gmail.com",
        phone: sessionUser.phone || "+91 98765 43210",
        avatarSrc: sessionUser.image || sessionUser.avatar || "",
      }
    : { name: "User Name", email: "username@gmail.com", phone: "+91 98765 43210", avatarSrc: "" };

  const [profile, setProfile] = useState(baseUser);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleTarget, setRescheduleTarget] = useState<number | null>(null);
  const [savedResources, setSavedResources] = useState<Array<{ id: number; title: string; file: string; filename: string; badge: string; badgeColor: string }>>([]);
  const [bookings, setBookings] = useState<Array<{ id: number; title: string; displayTime: string; status: string; datetime?: string }>>([]);

  // ── NEW: controls whether all bookings are visible ──
  const BOOKINGS_PREVIEW = 3;
  const [showAllBookings, setShowAllBookings] = useState(false);

  const memberSince = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });

  useEffect(() => {
    setProfile((prev) => prev || baseUser);
  }, [baseUser.name, baseUser.email, baseUser.phone, baseUser.avatarSrc]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("profileInfo");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") setProfile(parsed);
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storageKey = "savedResources";
    const load = () => {
      try {
        const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
        if (Array.isArray(parsed)) setSavedResources(parsed);
      } catch { setSavedResources([]); }
    };
    load();
    const handleStorage = (e: StorageEvent) => { if (e.key === storageKey) load(); };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storageKey = "bookings";
    const load = () => {
      try {
        const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
        if (Array.isArray(parsed)) setBookings(parsed);
      } catch { setBookings([]); }
    };
    load();
    const handleStorage = (e: StorageEvent) => { if (e.key === storageKey) load(); };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleResourceDownload = (file: string, filename?: string) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = filename || file.split("/").pop() || "resource";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bookingsStorageKey = "bookings";

  const saveBookings = (next: typeof bookings) => {
    setBookings(next);
    try {
      localStorage.setItem(bookingsStorageKey, JSON.stringify(next));
      window.dispatchEvent(new StorageEvent("storage", { key: bookingsStorageKey, newValue: JSON.stringify(next) }));
    } catch { /* swallow */ }
  };

  const saveProfile = (next: typeof profile) => {
    setProfile(next);
    try {
      localStorage.setItem("profileInfo", JSON.stringify(next));
      window.dispatchEvent(new StorageEvent("storage", { key: "profileInfo", newValue: JSON.stringify(next) }));
    } catch { /* ignore */ }
  };

  const handleCancelBooking = (id: number) => {
    saveBookings(bookings.filter((b) => b.id !== id));
  };

  const formatDatetime = (value: string) => {
    if (!value) return "";
    return new Date(value).toLocaleString("en-IN", {
      weekday: "long", year: "numeric", month: "long",
      day: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  const handleRescheduleBooking = (id: number) => {
    setRescheduleTarget(id);
    setShowRescheduleModal(true);
  };

  // ── Edit Profile Modal ───────────────────────────────────────────────────
  const EditProfileModal = ({ onClose }: { onClose: () => void }) => {
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phone);

    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }, []);

    const handleSave = () => {
      const trimmed = { name: name.trim() || profile.name, email: email.trim() || profile.email, phone: phone.trim() || profile.phone, avatarSrc: profile.avatarSrc };
      saveProfile(trimmed);
      onClose();
    };

    if (typeof document === "undefined") return null;

    return ReactDOM.createPortal(
      <div style={{ position: "fixed", inset: 0, zIndex: 1200, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <style>{`@keyframes slideUpProfile { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        <div style={{ width: "100%", maxWidth: 480, background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 24px 70px rgba(0,0,0,0.14)", animation: "slideUpProfile 0.22s ease both", fontFamily: "'Inter', sans-serif" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#111" }}>Edit Profile</h3>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#666" }}>×</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Full Name", value: name, onChange: setName },
              { label: "Email", value: email, onChange: setEmail },
              { label: "Phone", value: phone, onChange: setPhone },
            ].map(({ label, value, onChange }) => (
              <div key={label}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", color: "#6b7280", marginBottom: 4 }}>{label}</label>
                <input value={value} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", borderRadius: 12, border: "1px solid #e5e7eb", padding: "12px 14px", fontSize: 14, boxSizing: "border-box" }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
            <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#6b7280", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
            <button onClick={handleSave} style={{ background: "#0EAF50", color: "#fff", border: "none", borderRadius: 12, padding: "10px 16px", fontWeight: 700, cursor: "pointer" }}>Save</button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  // ── Reschedule Modal ─────────────────────────────────────────────────────
  const RescheduleModal = ({ onClose }: { onClose: () => void }) => {
    const booking = bookings.find((b) => b.id === rescheduleTarget);
    const [value, setValue] = useState(booking?.datetime || "");

    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }, []);

    const save = () => {
      if (!value) return;
      const updated = bookings.map((b) =>
        b.id === rescheduleTarget
          ? { ...b, datetime: value, displayTime: formatDatetime(value) || value, status: "Rescheduled" }
          : b
      );
      saveBookings(updated);
      setShowRescheduleModal(false);
      setRescheduleTarget(null);
    };

    if (typeof document === "undefined") return null;
    return ReactDOM.createPortal(
      <div style={{ position: "fixed", inset: 0, zIndex: 1200, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <style>{`@keyframes slideUpResched { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        <div style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 18, padding: 22, boxShadow: "0 24px 70px rgba(0,0,0,0.14)", animation: "slideUpResched 0.22s ease both", fontFamily: "'Inter', sans-serif" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#111" }}>Reschedule Booking</h3>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#666" }}>×</button>
          </div>
          <p style={{ marginTop: 0, marginBottom: 12, fontSize: 13, color: "#555" }}>
            Pick a new date & time for <strong>{booking?.title || "your booking"}</strong>.
          </p>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", color: "#6b7280", marginBottom: 6 }}>Date & Time</label>
          <input
            type="datetime-local"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: "100%", borderRadius: 12, border: "1px solid #e5e7eb", padding: "12px 14px", fontSize: 14, boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
            <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#6b7280", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
            <button onClick={save} style={{ background: "#0EAF50", color: "#fff", border: "none", borderRadius: 12, padding: "10px 16px", fontWeight: 700, cursor: value ? "pointer" : "not-allowed", opacity: value ? 1 : 0.6 }} disabled={!value}>Save</button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  // ── derived bookings list ────────────────────────────────────────────────
  const visibleBookings = showAllBookings ? bookings : bookings.slice(0, BOOKINGS_PREVIEW);
  const hasMoreBookings = bookings.length > BOOKINGS_PREVIEW;

  return (
    <>
      <Header />

      {showNotifModal && <NotificationModal onClose={() => setShowNotifModal(false)} />}
      {showUpdateModal && <UpdateCredentialsModal isOpen={showUpdateModal} onClose={() => setShowUpdateModal(false)} />}
      {showEditModal && <EditProfileModal onClose={() => setShowEditModal(false)} />}
      {showRescheduleModal && <RescheduleModal onClose={() => { setShowRescheduleModal(false); setRescheduleTarget(null); }} />}

      <div style={{ minHeight: "100vh", background: "#f0f5f0", fontFamily: "'Inter', sans-serif", padding: "40px 0 60px" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          * { box-sizing: border-box; }
          .profile-container { max-width: 720px; margin: 0 auto; padding: 0 24px; }

          .card { background: #fff; border-radius: 20px; padding: 24px; box-shadow: 0 2px 16px rgba(0,0,0,0.06); margin-bottom: 28px; }

          .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
          .section-title { font-weight: 800; font-size: 18px; color: #111; }
          .view-all { font-size: 13px; font-weight: 600; color: #0EAF50; text-decoration: none; cursor: pointer; background: none; border: none; font-family: 'Inter', sans-serif; padding: 0; }
          .view-all:hover { text-decoration: underline; }

          .webinar-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

          .webinar-card {
            background: #fff;
            border-radius: 16px;
            padding: 18px 18px 18px 22px;
            box-shadow: 0 1px 8px rgba(0,0,0,0.07);
            position: relative;
            overflow: hidden;
          }
          .webinar-card.upcoming { border-left: 4px solid #0EAF50; }
          .webinar-card.past { background: #f8f8f6; border-left: 4px solid transparent; }

          .badge-upcoming {
            display: inline-block; background: #e6f9ef; color: #0EAF50;
            padding: 3px 12px; border-radius: 9999px; font-size: 11px;
            font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;
          }
          .badge-past {
            display: inline-block; background: #f0f0f0; color: #888;
            padding: 3px 12px; border-radius: 9999px; font-size: 11px;
            font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;
          }

          .join-btn {
            background: #0EAF50; color: #fff; border: none; border-radius: 9999px;
            padding: 8px 18px; font-size: 13px; font-weight: 700; cursor: pointer;
            font-family: 'Inter', sans-serif; transition: background 0.2s;
          }
          .join-btn:hover { background: #0c9a46; }

          .watch-link { font-size: 13px; font-weight: 600; color: #0EAF50; text-decoration: none; }
          .watch-link:hover { text-decoration: underline; }

          /* ── Booking list ─────────────────────────────────────────────── */
          .bookings-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .booking-card {
            display: flex;
            align-items: center;
            gap: 16px;
            background: #fff;
            border-radius: 16px;
            padding: 16px 20px;
            box-shadow: 0 1px 8px rgba(0,0,0,0.07);
            transition: box-shadow 0.2s;
          }
          .booking-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.10); }

          /* ── View all / collapse button ───────────────────────────────── */
          .view-all-bookings-btn {
            width: 100%;
            margin-top: 4px;
            background: #f4faf6;
            border: 1.5px dashed #b6e4cb;
            border-radius: 14px;
            padding: 13px 20px;
            font-size: 13px;
            font-weight: 700;
            color: #0EAF50;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: background 0.18s, border-color 0.18s;
          }
          .view-all-bookings-btn:hover { background: #e8f7ef; border-color: #0EAF50; }

          /* ── Collapsed preview: dim the 3rd card slightly as a hint ───── */
          .booking-card-fade {
            opacity: 0.72;
          }

          /* ── Booking count badge ─────────────────────────────────────── */
          .booking-count-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #e6f9ef;
            color: #0EAF50;
            font-size: 11px;
            font-weight: 800;
            border-radius: 9999px;
            padding: 2px 9px;
            margin-left: 8px;
          }

          .resource-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .resource-card {
            background: #fff; border-radius: 16px; padding: 18px;
            box-shadow: 0 1px 8px rgba(0,0,0,0.07); display: flex; flex-direction: column; gap: 12px;
          }

          .download-btn {
            background: #0EAF50; color: #fff; border: none; border-radius: 9999px;
            padding: 7px 16px; font-size: 12px; font-weight: 700; cursor: pointer;
            font-family: 'Inter', sans-serif; transition: background 0.2s;
          }
          .download-btn:hover { background: #0c9a46; }
          .view-btn {
            background: #f0f0f0; color: #555; border: none; border-radius: 9999px;
            padding: 7px 16px; font-size: 12px; font-weight: 600; cursor: pointer;
            font-family: 'Inter', sans-serif; transition: background 0.2s;
          }
          .view-btn:hover { background: #e5e5e5; }

          .settings-item {
            display: flex; align-items: center; gap: 14px; padding: 16px 0;
            cursor: pointer; border-bottom: 1px solid #f5f5f5; transition: background 0.15s;
          }
          .settings-item:last-child { border-bottom: none; }
          .settings-item:hover { background: #fafafa; }

          .cancel-btn {
            background: none; border: none; font-size: 13px; color: #555;
            cursor: pointer; font-family: 'Inter', sans-serif; font-weight: 500; padding: 0 4px;
          }
          .cancel-btn:hover { color: #c0392b; }

          .reschedule-btn {
            background: #111; color: #fff; border: none; border-radius: 9999px;
            padding: 9px 20px; font-size: 13px; font-weight: 700; cursor: pointer;
            font-family: 'Inter', sans-serif; transition: background 0.2s; white-space: nowrap;
          }
          .reschedule-btn:hover { background: #333; }

          @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes bookingSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .anim-1 { animation: fadeUp 0.5s ease 0.05s both; }
          .anim-2 { animation: fadeUp 0.5s ease 0.15s both; }
          .anim-3 { animation: fadeUp 0.5s ease 0.25s both; }
          .anim-4 { animation: fadeUp 0.5s ease 0.35s both; }
          .anim-5 { animation: fadeUp 0.5s ease 0.45s both; }
          .booking-anim { animation: bookingSlideIn 0.3s ease both; }

          /* ── MOBILE (≤ 600px) ── */
          @media (max-width: 600px) {
            .profile-container { padding: 0 16px; }
            .profile-page-wrap { padding: 24px 0 48px !important; }
            .profile-card-inner { flex-direction: column !important; align-items: center !important; text-align: center; gap: 16px !important; }
            .profile-name { font-size: 22px !important; line-height: 28px !important; }
            .profile-meta-row { justify-content: center !important; }
            .edit-profile-btn { align-self: center !important; width: 100% !important; }
            .webinar-grid { grid-template-columns: 1fr !important; }
            .resource-grid { grid-template-columns: 1fr !important; }
            .booking-card { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
            .booking-actions { width: 100% !important; display: flex !important; justify-content: flex-end !important; gap: 8px !important; }
            .webinar-join-row { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
            .join-btn { width: 100% !important; text-align: center !important; }
            .card { padding: 18px 16px !important; border-radius: 16px !important; }
            .resource-btn-row { flex-wrap: wrap !important; }
            .download-btn, .view-btn { flex: 1 !important; text-align: center !important; }
          }
        `}</style>

        <div className="profile-page-wrap" style={{ minHeight: "100vh", background: "#f0f5f0", fontFamily: "'Inter', sans-serif", padding: "40px 0 60px" }}>
          <div className="profile-container">

            {/* ── Profile Card ─────────────────────────────────────────── */}
            <div className="card anim-1">
              <div className="profile-card-inner" style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid #c9a84c", overflow: "hidden", background: "#c9a84c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {profile.avatarSrc
                      ? <img src={profile.avatarSrc} alt={profile.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <span style={{ fontWeight: 800, fontSize: 28, color: "#1B3226" }}>{profile.name.charAt(0).toUpperCase()}</span>
                    }
                  </div>
                  <div style={{ position: "absolute", bottom: 2, right: 2, width: 20, height: 20, borderRadius: "50%", background: "#0EAF50", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                  <h1 className="profile-name" style={{ fontWeight: 800, fontSize: 28, color: "#102218", letterSpacing: "-0.75px", lineHeight: "34px", margin: 0 }}>{profile.name}</h1>
                  <p style={{ margin: "0 0 6px", fontSize: 13, color: "#888" }}>Member since {memberSince}</p>
                  <div className="profile-meta-row" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0EAF50" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <span style={{ fontSize: 13, color: "#555" }}>{profile.email}</span>
                  </div>
                  <div className="profile-meta-row" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0EAF50" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span style={{ fontSize: 13, color: "#555" }}>{profile.phone}</span>
                  </div>
                </div>
                <button
                  className="edit-profile-btn"
                  style={{ background: "#FFDBCF", border: "1px solid rgba(255,160,127,0.30)", borderRadius: 9999, padding: "10px 24px", fontSize: 13, fontWeight: 600, color: "#c0522a", cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "background 0.2s", height: 42, flexShrink: 0, alignSelf: "flex-start" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#ffc9b0")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#FFDBCF")}
                  onClick={() => setShowEditModal(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* ── My Webinars ──────────────────────────────────────────── */}
            <div className="anim-2">
              <div className="section-header">
                <span className="section-title">My Webinars</span>
                <a href="#" className="view-all">View All</a>
              </div>
              <div className="webinar-grid">
                <div className="webinar-card upcoming">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <span className="badge-upcoming">Upcoming</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: "#111", margin: "0 0 4px" }}>Investing for Beginners</h3>
                  <p style={{ fontSize: 12, color: "#888", margin: "0 0 16px" }}>March 24, 6:00 PM</p>
                  <div className="webinar-join-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#0EAF50" }} />
                      <span style={{ fontSize: 12, color: "#444" }}>Status: Confirmed</span>
                    </div>
                    <button className="join-btn">Join Button</button>
                  </div>
                </div>

                <div className="webinar-card past">
                  <div style={{ marginBottom: 12 }}>
                    <span className="badge-past">Past</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: "#111", margin: "0 0 4px" }}>Wealth Management Basics</h3>
                  <p style={{ fontSize: 12, color: "#888", margin: "0 0 16px" }}>February 12, 4:30 PM</p>
                  <a href="#" className="watch-link">Watch Recording →</a>
                </div>
              </div>
            </div>

            {/* ── My Bookings ──────────────────────────────────────────── */}
            <div className="anim-3" style={{ marginTop: 28 }}>
              <div className="section-header">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="section-title">My Bookings</span>
                  {bookings.length > 0 && (
                    <span className="booking-count-badge">{bookings.length}</span>
                  )}
                </div>
                {/* "View All" in header only visible when collapsed and has more */}
                {hasMoreBookings && !showAllBookings && (
                  <button className="view-all" onClick={() => setShowAllBookings(true)}>
                    View All ({bookings.length})
                  </button>
                )}
                {/* "Show Less" in header when expanded */}
                {showAllBookings && hasMoreBookings && (
                  <button className="view-all" onClick={() => setShowAllBookings(false)}>
                    Show Less
                  </button>
                )}
              </div>

              {bookings.length === 0 ? (
                <div style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", textAlign: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "#f4f4f4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
                    No bookings yet. Tap "Book a Free Appointment" on the home hero to schedule.
                  </p>
                </div>
              ) : (
                <>
                  <div className="bookings-list">
                    {visibleBookings.map((booking, index) => {
                      // Slightly fade the last preview card when more exist
                      const isLastPreview = !showAllBookings && hasMoreBookings && index === BOOKINGS_PREVIEW - 1;
                      return (
                        <div
                          key={booking.id}
                          className={`booking-card booking-anim${isLastPreview ? " booking-card-fade" : ""}`}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          {/* Icon */}
                          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fff0eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none"><path d="M3.31254 20.3886V3.31254C3.31254 3.31254 3.31254 3.76431 3.31254 4.66784C3.31254 5.57137 3.31254 6.72739 3.31254 8.1359V15.6006C3.31254 17.0091 3.31254 18.1592 3.31254 19.051C3.31254 19.9427 3.31254 20.3886 3.31254 20.3886ZM3.31254 23.7011C2.38952 23.7011 1.60668 23.3798 0.964006 22.7371C0.321335 22.0945 0 21.3116 0 20.3886V3.31254C0 2.38952 0.321335 1.60668 0.964006 0.964006C1.60668 0.321335 2.38952 0 3.31254 0H20.3886C21.3116 0 22.0945 0.321335 22.7371 0.964006C23.3798 1.60668 23.7011 2.38952 23.7011 3.31254V6.22557H20.3886V3.31254H3.31254V20.3886H20.3886V17.4756H23.7011V20.3886C23.7011 21.3116 23.3798 22.0945 22.7371 22.7371C22.0945 23.3798 21.3116 23.7011 20.3886 23.7011H3.31254ZM13.1359 18.1006C12.4387 18.1006 11.8418 17.8587 11.3453 17.375C10.8488 16.8913 10.6006 16.2999 10.6006 15.6006V8.1359C10.6006 7.43869 10.8488 6.84183 11.3453 6.34533C11.8418 5.84883 12.4387 5.60057 13.1359 5.60057H22.4335C23.1328 5.60057 23.7272 5.84883 24.2168 6.34533C24.7064 6.84183 24.9511 7.43869 24.9511 8.1359V15.6094C24.9511 16.2945 24.7064 16.8809 24.2168 17.3688C23.7272 17.8566 23.1328 18.1006 22.4335 18.1006H13.1359ZM22.4688 15.6006V8.10057H13.1006V15.6006H22.4688ZM16.8506 13.7256C17.3714 13.7256 17.8141 13.5433 18.1787 13.1787C18.5433 12.8141 18.7256 12.3714 18.7256 11.8506C18.7256 11.3297 18.5433 10.887 18.1787 10.5224C17.8141 10.1579 17.3714 9.97557 16.8506 9.97557C16.3297 9.97557 15.887 10.1579 15.5224 10.5224C15.1579 10.887 14.9756 11.3297 14.9756 11.8506C14.9756 12.3714 15.1579 12.8141 15.5224 13.1787C15.887 13.5433 16.3297 13.7256 16.8506 13.7256Z" fill="#93492F"/></svg>
                          </div>

                          {/* Info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h3 style={{ fontWeight: 700, fontSize: 15, color: "#111", margin: "0 0 6px" }}>{booking.title}</h3>
                            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                <span style={{ fontSize: 12, color: "#888" }}>{booking.displayTime || "Scheduled"}</span>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0EAF50" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                <span style={{ fontSize: 12, color: "#0EAF50", fontWeight: 600 }}>Status: {booking.status || "Scheduled"}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="booking-actions" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                            <button className="cancel-btn" onClick={() => handleCancelBooking(booking.id)}>Cancel</button>
                            <button className="reschedule-btn" onClick={() => handleRescheduleBooking(booking.id)}>Reschedule</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* View All / Show Less — bottom pill button */}
                  {hasMoreBookings && (
                    <button
                      className="view-all-bookings-btn"
                      onClick={() => setShowAllBookings((v) => !v)}
                    >
                      {showAllBookings ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                          Show Less
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                          View All {bookings.length} Bookings
                        </>
                      )}
                    </button>
                  )}
                </>
              )}
            </div>

            {/* ── Saved Resources ──────────────────────────────────────── */}
            <div className="anim-4" id="saved-resources" style={{ marginTop: 28 }}>
              <div className="section-header">
                <span className="section-title">Saved Resources</span>
              </div>
              <div className="resource-grid">
                {savedResources.length === 0 ? (
                  <p style={{ gridColumn: "1 / -1", fontSize: 13, color: "#666", margin: 0 }}>
                    Nothing saved yet. Tap the heart on an ebook to add it here.
                  </p>
                ) : (
                  savedResources.map((res) => (
                    <div key={res.id} className="resource-card">
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: "#e8f7ef", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0EAF50" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div>
                          <p style={{ fontSize: 10, fontWeight: 700, color: res.badgeColor || "#0EAF50", letterSpacing: "0.8px", textTransform: "uppercase", margin: "0 0 2px" }}>{res.badge || "Resource"}</p>
                          <h4 style={{ fontWeight: 700, fontSize: 14, color: "#111", margin: 0 }}>{res.title}</h4>
                        </div>
                      </div>
                      <div className="resource-btn-row" style={{ display: "flex", gap: 8 }}>
                        <button className="download-btn" onClick={() => handleResourceDownload(res.file, res.filename)}>Download</button>
                        <button className="view-btn" onClick={() => window.open(res.file, "_blank")}>View</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ── Account Settings ─────────────────────────────────────── */}
            <div className="anim-5" style={{ marginTop: 28 }}>
              <div className="section-header">
                <span className="section-title">Account Settings</span>
              </div>
              <div className="card" style={{ padding: "4px 20px" }}>
                {[
                  {
                    icon: <svg width="17" height="22" viewBox="0 0 17 22" fill="none"><path d="M2.65003 21.8055C1.92127 21.8055 1.29741 21.546 0.778447 21.027C0.259482 20.5081 0 19.8842 0 19.1554V9.49459C0 8.76583 0.259482 8.14197 0.778447 7.623C1.29741 7.10404 1.92127 6.84456 2.65003 6.84456H3.26849V5.25436C3.26849 3.79566 3.77483 2.55526 4.78752 1.53316C5.8002 0.511052 7.03118 0 8.48046 0C9.92974 0 11.1607 0.511052 12.1734 1.53316C13.1861 2.55526 13.6924 3.79566 13.6924 5.25436V6.84456H14.3109C15.0396 6.84456 15.6635 7.10404 16.1825 7.623C16.7014 8.14197 16.9609 8.76583 16.9609 9.49459V19.1554C16.9609 19.8842 16.7014 20.5081 16.1825 21.027C15.6635 21.546 15.0396 21.8055 14.3109 21.8055H2.65003ZM8.48046 16.325C9.03046 16.325 9.50129 16.1292 9.89296 15.7375C10.2846 15.3458 10.4805 14.875 10.4805 14.325C10.4805 13.775 10.2846 13.3042 9.89296 12.9125C9.50129 12.5209 9.03046 12.325 8.48046 12.325C7.93046 12.325 7.45963 12.5209 7.06796 12.9125C6.67629 13.3042 6.48046 13.775 6.48046 14.325C6.48046 14.875 6.67629 15.3458 7.06796 15.7375C7.45963 16.1292 7.93046 16.325 8.48046 16.325Z" fill="#475569"/></svg>,
                    label: "Password",
                    sub: "Update your security credentials",
                    onClick: () => setShowUpdateModal(true),
                  },
                  {
                    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M0 8.86961C0 7.03325 0.406621 5.34839 1.21986 3.81503C2.0331 2.28167 3.12504 1.01 4.49567 0L5.98156 2.02393C4.92503 2.79495 4.0821 3.77648 3.45275 4.96851C2.8234 6.16054 2.50872 7.46091 2.50872 8.86961H0ZM11.0033 21.1805C10.4067 21.1805 9.89593 20.9694 9.47105 20.5473C9.04618 20.1252 8.83374 19.6178 8.83374 19.0251H13.1588C13.1588 19.6222 12.9477 20.1307 12.5256 20.5506C12.1035 20.9705 11.5961 21.1805 11.0033 21.1805Z" fill="#475569"/></svg>,
                    label: "Notifications",
                    sub: "Manage how you receive updates",
                    onClick: () => setShowNotifModal(true),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="settings-item"
                    onClick={item.onClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && item.onClick && item.onClick()}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, fontSize: 14, color: "#111", margin: "0 0 2px" }}>{item.label}</p>
                      <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{item.sub}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}