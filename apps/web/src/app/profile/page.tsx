"use client";

import { useState, useEffect } from "react";
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

  // Prevent body scroll while modal open
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

        /* Toggle switch */
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
      `}</style>

      <div className="notif-modal">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 4 }}>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: "#111", margin: "0 0 8px", letterSpacing: "-0.5px" }}>
            Notification Preferences
          </h2>
          <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.5 }}>
            Curate your communication flow. Choose how you want to receive<br />
            wealth insights and community updates.
          </p>
        </div>

        {/* Email Notifications */}
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

        {/* Push Notifications */}
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

        {/* Footer */}
        <div style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
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

  // Update Credentials Modal (overlay + body-scroll lock like NotificationModal)
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
        `}</style>

        <div style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 720, padding: "28px 28px 20px", boxShadow: "0 24px 80px rgba(0,0,0,0.18)", animation: "slideUp 0.28s cubic-bezier(0.34,1.3,0.64,1) both", fontFamily: "'Inter', sans-serif", maxHeight: "90vh", overflowY: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <h2 style={{ fontWeight: 800, fontSize: 22, color: "#111", margin: "0 0 8px", letterSpacing: "-0.5px" }}>Update Credentials</h2>
            <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.5 }}>Ensure your account stays secure with a strong, unique password.</p>
          </div>

          <form style={{ marginTop: 18 }} onSubmit={(e) => e.preventDefault()}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#718096", marginBottom: 6 }}>Current Password</label>
              <div style={{ position: "relative" }}>
                <input value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} type={showCurrent ? "text" : "password"} placeholder="••••••••" style={{ width: "100%", borderRadius: 12, border: "1px solid #f3f4f6", background: "rgba(243,244,246,0.3)", padding: "12px 48px 12px 16px", color: "#111" }} />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#9ca3af" }}>{showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#718096", marginBottom: 6 }}>New Password</label>
              <div style={{ position: "relative" }}>
                <input value={newPwd} onChange={(e) => setNewPwd(e.target.value)} type={showNew ? "text" : "password"} placeholder="••••••••" style={{ width: "100%", borderRadius: 12, border: "1px solid #f3f4f6", background: "rgba(243,244,246,0.3)", padding: "12px 48px 12px 16px", color: "#111" }} />
                <button type="button" onClick={() => setShowNew(!showNew)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#9ca3af" }}>{showNew ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#718096", marginBottom: 6 }}>Confirm New Password</label>
              <input value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} type="password" placeholder="••••••••" style={{ width: "100%", borderRadius: 12, border: "1px solid #f3f4f6", background: "rgba(243,244,246,0.3)", padding: "12px 16px", color: "#111" }} />
            </div>

            <div style={{ borderRadius: 18, background: "#f0fdf4", padding: 18, marginBottom: 18 }}>
              <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#6b7280", margin: 0 }}>Security Requirements</p>
              <ul style={{ marginTop: 10, paddingLeft: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                <li style={{ display: "flex", gap: 12, alignItems: "center", color: hasLength ? "#2d3748" : "#718096", fontSize: 13 }}>
                  <span style={{ width: 18, height: 18, borderRadius: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", background: hasLength ? "#ecfdf3" : "transparent", color: hasLength ? "#0EAF50" : "#cbd5e1", border: hasLength ? "none" : "2px solid #e6eaf0" }}>{hasLength ? <CheckCircle2 size={14} /> : <Circle size={12} />}</span>
                  <span>Minimum 8 characters length</span>
                </li>
                <li style={{ display: "flex", gap: 12, alignItems: "center", color: hasSpecial ? "#2d3748" : "#718096", fontSize: 13 }}>
                  <span style={{ width: 18, height: 18, borderRadius: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", background: hasSpecial ? "#ecfdf3" : "transparent", color: hasSpecial ? "#0EAF50" : "#cbd5e1", border: hasSpecial ? "none" : "2px solid #e6eaf0" }}>{hasSpecial ? <CheckCircle2 size={14} /> : <Circle size={12} />}</span>
                  <span>At least one special character (!@#$)</span>
                </li>
                <li style={{ display: "flex", gap: 12, alignItems: "center", color: hasUpperAndNumber ? "#2d3748" : "#718096", fontSize: 13 }}>
                  <span style={{ width: 18, height: 18, borderRadius: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", background: hasUpperAndNumber ? "#ecfdf3" : "transparent", color: hasUpperAndNumber ? "#0EAF50" : "#cbd5e1", border: hasUpperAndNumber ? "none" : "2px solid #e6eaf0" }}>{hasUpperAndNumber ? <CheckCircle2 size={14} /> : <Circle size={12} />}</span>
                  <span>One uppercase letter and one number</span>
                </li>
                <li style={{ display: "flex", gap: 12, alignItems: "center", color: confirmMatch ? "#2d3748" : "#718096", fontSize: 13 }}>
                  <span style={{ width: 18, height: 18, borderRadius: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", background: confirmMatch ? "#ecfdf3" : "transparent", color: confirmMatch ? "#0EAF50" : "#cbd5e1", border: confirmMatch ? "none" : "2px solid #e6eaf0" }}>{confirmMatch ? <CheckCircle2 size={14} /> : <Circle size={12} />}</span>
                  <span>Passwords match</span>
                </li>
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
  const user = !isPending && sessionUser
    ? {
        name: sessionUser.name || sessionUser.email || "User",
        email: sessionUser.email || "username@gmail.com",
        phone: sessionUser.phone || "+91 98765 43210",
        avatarSrc: sessionUser.image || sessionUser.avatar || "",
      }
    : { name: "User Name", email: "username@gmail.com", phone: "+91 98765 43210", avatarSrc: "" };
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const memberSince = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return (
    <>
      <Header />

      {/* Notification Preferences Modal */}
      {showNotifModal && <NotificationModal onClose={() => setShowNotifModal(false)} />}
      {showUpdateModal && <UpdateCredentialsModal isOpen={showUpdateModal} onClose={() => setShowUpdateModal(false)} />}

      <div style={{ minHeight: "100vh", background: "#f0f5f0", fontFamily: "'Inter', sans-serif", padding: "40px 0 60px" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          * { box-sizing: border-box; }
          .profile-container { max-width: 720px; margin: 0 auto; padding: 0 24px; }

          .card { background: #fff; border-radius: 20px; padding: 24px; box-shadow: 0 2px 16px rgba(0,0,0,0.06); margin-bottom: 28px; }

          .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
          .section-title { font-weight: 800; font-size: 18px; color: #111; }
          .view-all { font-size: 13px; font-weight: 600; color: #0EAF50; text-decoration: none; }
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

          .booking-card {
            display: flex; align-items: center; gap: 16px;
            background: #fff; border-radius: 16px; padding: 16px 20px;
            box-shadow: 0 1px 8px rgba(0,0,0,0.07);
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
          .cancel-btn:hover { color: #111; }

          .reschedule-btn {
            background: #111; color: #fff; border: none; border-radius: 9999px;
            padding: 9px 20px; font-size: 13px; font-weight: 700; cursor: pointer;
            font-family: 'Inter', sans-serif; transition: background 0.2s; white-space: nowrap;
          }
          .reschedule-btn:hover { background: #333; }

          @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          .anim-1 { animation: fadeUp 0.5s ease 0.05s both; }
          .anim-2 { animation: fadeUp 0.5s ease 0.15s both; }
          .anim-3 { animation: fadeUp 0.5s ease 0.25s both; }
          .anim-4 { animation: fadeUp 0.5s ease 0.35s both; }
          .anim-5 { animation: fadeUp 0.5s ease 0.45s both; }
        `}</style>

        <div className="profile-container">

          {/* Profile Card */}
          <div className="card anim-1">
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid #c9a84c", overflow: "hidden", background: "#c9a84c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {user.avatarSrc
                    ? <img src={user.avatarSrc} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontWeight: 800, fontSize: 28, color: "#1B3226" }}>{user.name.charAt(0).toUpperCase()}</span>
                  }
                </div>
                <div style={{ position: "absolute", bottom: 2, right: 2, width: 20, height: 20, borderRadius: "50%", background: "#0EAF50", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <h1 style={{ fontWeight: 800, fontSize: 28, color: "#102218", letterSpacing: "-0.75px", lineHeight: "34px", margin: 0 }}>{user.name}</h1>
                <p style={{ margin: "0 0 6px", fontSize: 13, color: "#888" }}>Member since {memberSince}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0EAF50" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <span style={{ fontSize: 13, color: "#555" }}>{user.email}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0EAF50" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span style={{ fontSize: 13, color: "#555" }}>{user.phone}</span>
                </div>
              </div>
              <button
                style={{ background: "#FFDBCF", border: "1px solid rgba(255,160,127,0.30)", borderRadius: 9999, padding: "10px 24px", fontSize: 13, fontWeight: 600, color: "#c0522a", cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "background 0.2s", height: 42, flexShrink: 0, alignSelf: "flex-start" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#ffc9b0")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#FFDBCF")}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* My Webinars */}
          <div className="anim-2">
            <div className="section-header">
              <span className="section-title">My Webinars</span>
              <a href="#" className="view-all">View All</a>
            </div>
            <div className="webinar-grid">
              <div className="webinar-card upcoming">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <span className="badge-upcoming">Upcoming</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: "#111", margin: "0 0 4px" }}>Investing for Beginners</h3>
                <p style={{ fontSize: 12, color: "#888", margin: "0 0 16px" }}>March 24, 6:00 PM</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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

          {/* My Bookings */}
          <div className="anim-3" style={{ marginTop: 28 }}>
            <div className="section-header">
              <span className="section-title">My Bookings</span>
            </div>
            <div className="booking-card">
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fff0eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.31254 20.3886V3.31254C3.31254 3.31254 3.31254 3.76431 3.31254 4.66784C3.31254 5.57137 3.31254 6.72739 3.31254 8.1359V15.6006C3.31254 17.0091 3.31254 18.1592 3.31254 19.051C3.31254 19.9427 3.31254 20.3886 3.31254 20.3886ZM3.31254 23.7011C2.38952 23.7011 1.60668 23.3798 0.964006 22.7371C0.321335 22.0945 0 21.3116 0 20.3886V3.31254C0 2.38952 0.321335 1.60668 0.964006 0.964006C1.60668 0.321335 2.38952 0 3.31254 0H20.3886C21.3116 0 22.0945 0.321335 22.7371 0.964006C23.3798 1.60668 23.7011 2.38952 23.7011 3.31254V6.22557H20.3886V3.31254H3.31254V20.3886H20.3886V17.4756H23.7011V20.3886C23.7011 21.3116 23.3798 22.0945 22.7371 22.7371C22.0945 23.3798 21.3116 23.7011 20.3886 23.7011H3.31254ZM13.1359 18.1006C12.4387 18.1006 11.8418 17.8587 11.3453 17.375C10.8488 16.8913 10.6006 16.2999 10.6006 15.6006V8.1359C10.6006 7.43869 10.8488 6.84183 11.3453 6.34533C11.8418 5.84883 12.4387 5.60057 13.1359 5.60057H22.4335C23.1328 5.60057 23.7272 5.84883 24.2168 6.34533C24.7064 6.84183 24.9511 7.43869 24.9511 8.1359V15.6094C24.9511 16.2945 24.7064 16.8809 24.2168 17.3688C23.7272 17.8566 23.1328 18.1006 22.4335 18.1006H13.1359ZM22.4688 15.6006V8.10057H13.1006V15.6006H22.4688ZM16.8506 13.7256C17.3714 13.7256 17.8141 13.5433 18.1787 13.1787C18.5433 12.8141 18.7256 12.3714 18.7256 11.8506C18.7256 11.3297 18.5433 10.887 18.1787 10.5224C17.8141 10.1579 17.3714 9.97557 16.8506 9.97557C16.3297 9.97557 15.887 10.1579 15.5224 10.5224C15.1579 10.887 14.9756 11.3297 14.9756 11.8506C14.9756 12.3714 15.1579 12.8141 15.5224 13.1787C15.887 13.5433 16.3297 13.7256 16.8506 13.7256Z" fill="#93492F"/></svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: "#111", margin: "0 0 5px" }}>Financial Consultation</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span style={{ fontSize: 12, color: "#888" }}>March 20, 10:00 AM</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0EAF50" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span style={{ fontSize: 12, color: "#0EAF50", fontWeight: 600 }}>Status: Scheduled</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <button className="cancel-btn">Cancel</button>
                <button className="reschedule-btn">Reschedule</button>
              </div>
            </div>
          </div>

          {/* Saved Resources */}
          <div className="anim-4" style={{ marginTop: 28 }}>
            <div className="section-header">
              <span className="section-title">Saved Resources</span>
            </div>
            <div className="resource-grid">
              <div className="resource-card">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#e8f7ef", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.4381 6.33807V4.63807C13.9881 4.40473 14.5506 4.22973 15.1256 4.11307C15.7006 3.9964 16.3047 3.93807 16.9381 3.93807C17.3714 3.93807 17.7964 3.9714 18.2131 4.03807C18.6297 4.10473 19.0381 4.18807 19.4381 4.28807V5.88807C19.0381 5.73807 18.6339 5.62557 18.2256 5.55057C17.8172 5.47557 17.3881 5.43807 16.9381 5.43807C16.3047 5.43807 15.6964 5.51723 15.1131 5.67557C14.5297 5.8339 13.9714 6.05473 13.4381 6.33807ZM13.4381 11.8381V10.1381C13.9881 9.90473 14.5506 9.72973 15.1256 9.61307C15.7006 9.4964 16.3047 9.43807 16.9381 9.43807C17.3714 9.43807 17.7964 9.4714 18.2131 9.53807C18.6297 9.60473 19.0381 9.68807 19.4381 9.78807V11.3881C19.0381 11.2381 18.6339 11.1256 18.2256 11.0506C17.8172 10.9756 17.3881 10.9381 16.9381 10.9381C16.3047 10.9381 15.6964 11.0131 15.1131 11.1631C14.5297 11.3131 13.9714 11.5381 13.4381 11.8381ZM13.4381 9.08807V7.38807C13.9881 7.15473 14.5506 6.97973 15.1256 6.86307C15.7006 6.7464 16.3047 6.68807 16.9381 6.68807C17.3714 6.68807 17.7964 6.7214 18.2131 6.78807C18.6297 6.85473 19.0381 6.93807 19.4381 7.03807V8.63807C19.0381 8.48807 18.6339 8.37557 18.2256 8.30057C17.8172 8.22557 17.3881 8.18807 16.9381 8.18807C16.3047 8.18807 15.6964 8.26723 15.1131 8.42557C14.5297 8.5839 13.9714 8.80473 13.4381 9.08807ZM5.93807 12.4381C6.7214 12.4381 7.4839 12.5256 8.22557 12.7006C8.96723 12.8756 9.70473 13.1381 10.4381 13.4881V3.63807C9.75473 3.23807 9.02973 2.93807 8.26307 2.73807C7.4964 2.53807 6.7214 2.43807 5.93807 2.43807C5.33807 2.43807 4.74223 2.4964 4.15057 2.61307C3.5589 2.72973 2.98807 2.90473 2.43807 3.13807V13.0381C3.0214 12.8381 3.60057 12.6881 4.17557 12.5881C4.75057 12.4881 5.33807 12.4381 5.93807 12.4381ZM12.4381 13.4881C13.1714 13.1381 13.9089 12.8756 14.6506 12.7006C15.3922 12.5256 16.1547 12.4381 16.9381 12.4381C17.5381 12.4381 18.1256 12.4881 18.7006 12.5881C19.2756 12.6881 19.8547 12.8381 20.4381 13.0381V3.13807C19.8881 2.90473 19.3172 2.72973 18.7256 2.61307C18.1339 2.4964 17.5381 2.43807 16.9381 2.43807C16.1547 2.43807 15.3797 2.53807 14.6131 2.73807C13.8464 2.93807 13.1214 3.23807 12.4381 3.63807V13.4881ZM11.4805 16.9609C10.671 16.337 9.79966 15.8312 8.86633 15.4435C7.93299 15.0558 6.95691 14.862 5.93807 14.862C5.27023 14.862 4.61433 14.956 3.97035 15.1441C3.32637 15.3321 2.70547 15.5834 2.10764 15.8979C1.62575 16.1471 1.154 16.1357 0.692402 15.8635C0.230801 15.5914 0 15.1945 0 14.6729V2.63698C0 2.32176 0.0717405 2.02806 0.215221 1.75588C0.358702 1.4837 0.573924 1.27957 0.860886 1.14348C1.64639 0.752896 2.46053 0.464672 3.30328 0.278802C4.14603 0.0929342 5.00965 0 5.89413 0C6.88067 0 7.84115 0.125 8.77557 0.375C9.70999 0.625 10.5975 1.01413 11.4381 1.54239C12.2881 1.02355 13.1779 0.636776 14.1076 0.382065C15.0373 0.127355 15.9955 0 16.982 0C17.8665 0 18.7301 0.0929342 19.5729 0.278802C20.4156 0.464672 21.2297 0.752896 22.0152 1.14348C22.3022 1.27957 22.5174 1.4837 22.6609 1.75588C22.8044 2.02806 22.8761 2.32176 22.8761 2.63698V14.8848C22.8761 15.3718 22.6477 15.727 22.1908 15.9506C21.7339 16.1741 21.2598 16.1566 20.7685 15.8979C20.1707 15.5834 19.5498 15.3321 18.9058 15.1441C18.2618 14.956 17.6059 14.862 16.9381 14.862C15.9381 14.862 14.9785 15.0582 14.0593 15.4506C13.1401 15.843 12.2805 16.3464 11.4805 16.9609Z" fill="#005321"/></svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, color: "#0EAF50", letterSpacing: "0.8px", textTransform: "uppercase", margin: "0 0 2px" }}>E-Book</p>
                    <h4 style={{ fontWeight: 700, fontSize: 14, color: "#111", margin: 0 }}>Start Early, Be Wealthy!</h4>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="download-btn">Download</button>
                  <button className="view-btn">View</button>
                </div>
              </div>

              <div className="resource-card">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fff0eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.56525 14.3957H11.5652V12.3957H4.56525V14.3957ZM4.56525 10.4805H14.3957V8.48046H4.56525V10.4805ZM4.56525 6.56525H14.3957V4.56525H4.56525V6.56525ZM2.65003 18.9609C1.91162 18.9609 1.28534 18.7039 0.771205 18.1897C0.257068 17.6756 0 17.0493 0 16.3109V2.65003C0 1.91162 0.257068 1.28534 0.771205 0.771205C1.28534 0.257068 1.91162 0 2.65003 0H16.3109C17.0493 0 17.6756 0.257068 18.1897 0.771205C18.7039 1.28534 18.9609 1.91162 18.9609 2.65003V16.3109C18.9609 17.0493 18.7039 17.6756 18.1897 18.1897C17.6756 18.7039 17.0493 18.9609 16.3109 18.9609H2.65003ZM2.65003 16.3109H16.3109V2.65003H2.65003V16.3109ZM2.65003 2.65003V16.3109V2.65003Z" fill="#76331A"/></svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, color: "#e8714a", letterSpacing: "0.8px", textTransform: "uppercase", margin: "0 0 2px" }}>Blog</p>
                    <h4 style={{ fontWeight: 700, fontSize: 14, color: "#111", margin: 0 }}>NPS Game Changer</h4>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="download-btn">Download</button>
                  <button className="view-btn">View</button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="anim-5" style={{ marginTop: 28 }}>
            <div className="section-header">
              <span className="section-title">Account Settings</span>
            </div>
            <div className="card" style={{ padding: "4px 20px" }}>
              {[
                {
                  icon: <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.65003 21.8055C1.92127 21.8055 1.29741 21.546 0.778447 21.027C0.259482 20.5081 0 19.8842 0 19.1554V9.49459C0 8.76583 0.259482 8.14197 0.778447 7.623C1.29741 7.10404 1.92127 6.84456 2.65003 6.84456H3.26849V5.25436C3.26849 3.79566 3.77483 2.55526 4.78752 1.53316C5.8002 0.511052 7.03118 0 8.48046 0C9.92974 0 11.1607 0.511052 12.1734 1.53316C13.1861 2.55526 13.6924 3.79566 13.6924 5.25436V6.84456H14.3109C15.0396 6.84456 15.6635 7.10404 16.1825 7.623C16.7014 8.14197 16.9609 8.76583 16.9609 9.49459V19.1554C16.9609 19.8842 16.7014 20.5081 16.1825 21.027C15.6635 21.546 15.0396 21.8055 14.3109 21.8055H2.65003ZM2.65003 19.1554H14.3109V9.49459H2.65003V19.1554ZM8.48046 16.325C9.03046 16.325 9.50129 16.1292 9.89296 15.7375C10.2846 15.3458 10.4805 14.875 10.4805 14.325C10.4805 13.775 10.2846 13.3042 9.89296 12.9125C9.50129 12.5209 9.03046 12.325 8.48046 12.325C7.93046 12.325 7.45963 12.5209 7.06796 12.9125C6.67629 13.3042 6.48046 13.775 6.48046 14.325C6.48046 14.875 6.67629 15.3458 7.06796 15.7375C7.45963 16.1292 7.93046 16.325 8.48046 16.325ZM5.91853 6.84456H11.0424V5.25436C11.0424 4.53094 10.7955 3.91603 10.3016 3.40963C9.8078 2.90323 9.20074 2.65003 8.48046 2.65003C7.76018 2.65003 7.15312 2.90323 6.65928 3.40963C6.16544 3.91603 5.91853 4.53094 5.91853 5.25436V6.84456ZM2.65003 19.1554V9.49459V19.1554Z" fill="#475569"/></svg>,
                  label: "Password",
                  sub: "Update your security credentials",
                  onClick: () => setShowUpdateModal(true),
                },
                {
                  icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 8.86961C0 7.03325 0.406621 5.34839 1.21986 3.81503C2.0331 2.28167 3.12504 1.01 4.49567 0L5.98156 2.02393C4.92503 2.79495 4.0821 3.77648 3.45275 4.96851C2.8234 6.16054 2.50872 7.46091 2.50872 8.86961H0ZM19.4696 8.86961C19.4696 7.46091 19.155 6.16054 18.5256 4.96851C17.8963 3.77648 17.0533 2.79495 15.9968 2.02393L17.4827 0C18.8533 1.01 19.9453 2.28167 20.7585 3.81503C21.5717 5.34839 21.9784 7.03325 21.9784 8.86961H19.4696ZM2.50872 18.0251V15.375H4.33915V8.85548C4.33915 7.34967 4.78172 6.00039 5.66687 4.80763C6.55202 3.61487 7.71778 2.83769 9.16416 2.4761V1.88915C9.16416 1.3822 9.34062 0.951292 9.69352 0.596428C10.0464 0.241563 10.4783 0.0641312 10.9892 0.0641312C11.5001 0.0641312 11.9319 0.241563 12.2848 0.596428C12.6377 0.951292 12.8142 1.3822 12.8142 1.88915V2.4761C14.27 2.83769 15.4381 3.61252 16.3186 4.80057C17.199 5.98862 17.6392 7.34025 17.6392 8.85548V15.375H19.4696V18.0251H2.50872ZM11.0033 21.1805C10.4067 21.1805 9.89593 20.9694 9.47105 20.5473C9.04618 20.1252 8.83374 19.6178 8.83374 19.0251H13.1588C13.1588 19.6222 12.9477 20.1307 12.5256 20.5506C12.1035 20.9705 11.5961 21.1805 11.0033 21.1805ZM6.98918 15.375H14.9892V8.85548C14.9892 7.75548 14.5975 6.81381 13.8142 6.03048C13.0308 5.24714 12.0892 4.85548 10.9892 4.85548C9.88918 4.85548 8.94752 5.24714 8.16418 6.03048C7.38085 6.81381 6.98918 7.75548 6.98918 8.85548V15.375Z" fill="#475569"/></svg>,
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
      <Footer />
    </>
  );
}
