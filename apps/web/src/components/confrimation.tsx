"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "personalize_submitted";

export default function PersonalizeModal({ onClose, onSuccess }: { onClose?: () => void; onSuccess?: () => void }) {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    occupation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/personalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 201) {
        setSubmitted(true);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, "1");
        }
        onSuccess?.();
        return;
      }

      if (res.status === 409) {
        const data = await res.json().catch(() => ({}));
        setError(data?.message || "You’ve already submitted.");
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data?.message || "Something went wrong. Please try again.");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const done = window.localStorage.getItem(STORAGE_KEY) === "1";
    if (done) {
      // Show the success state instead of closing immediately so the user can still open the modal.
      setSubmitted(true);
    }
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        fontFamily: "'Inter', sans-serif",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "760px",
          display: "flex",
          overflow: "hidden",
          position: "relative",
          minHeight: "440px",
        }}
      >
        {/* ── LEFT IMAGE PANEL ── */}
        <div
          style={{
            width: "220px",
            flexShrink: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=70')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px 0 0 20px",
          }}
        />

        {/* ── RIGHT FORM PANEL ── */}
        {submitted ? (
          <div
            style={{
              flex: 1,
              padding: "48px 36px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {/* Close */}
            <button onClick={onClose} style={closeBtnStyle}>✕</button>

            {/* Check icon */}
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(17,128,58,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#11803a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0d1f0d", marginBottom: "12px", lineHeight: 1.3 }}>
              Welcome to the<br />MoneyMati Community!
            </h2>
            <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.7, marginBottom: "28px" }}>
              Thank you for subscribing to our newsletter. You've just taken a key step toward financial confidence.
              We'll send expert insights and market updates directly to your inbox.
            </p>

            <button onClick={() => router.push("/")} style={submitBtnStyle}>
              Back to Home
            </button>

            {/* Bottom icons */}
            <div style={{ display: "flex", justifyContent: "space-around", width: "100%", marginTop: "28px", paddingTop: "20px", borderTop: "0.5px solid #eee" }}>
              {[
                { label: "TRENDS", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 17l4-4 4 4 4-6 4-4" stroke="#11803a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="19" cy="7" r="1.5" fill="#11803a" /></svg> },
                { label: "SECURITY", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3L4 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7L12 3z" stroke="#11803a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#11803a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg> },
                { label: "ACCESS", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#11803a" strokeWidth="1.8" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#11803a" strokeWidth="1.8" strokeLinecap="round" /><path d="M16 12l2 2 3-3" stroke="#11803a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg> },
              ].map(({ label, icon }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  {icon}
                  <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.8px", color: "#11803a" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, padding: "36px 36px 32px" }}>

            {/* Close */}
            <button onClick={onClose} style={closeBtnStyle}>✕</button>

            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#0d1f0d", marginBottom: "6px" }}>
              Personalize Your Financial Journey
            </h2>
            <p style={{ fontSize: "13px", color: "#888", marginBottom: "24px", lineHeight: 1.5 }}>
              Tell us a bit about yourself to get tailored insights and webinar recommendations.
            </p>

            {/* Full Name */}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Full Name</label>
              <input name="fullName" type="text" placeholder="Enter Full Name" value={form.fullName} onChange={handleChange} style={inputStyle} />
            </div>

            {/* Email + Phone */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input name="email" type="email" placeholder="email@gmail.com" value={form.email} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input name="phone" type="tel" placeholder="+91 1234567890" value={form.phone} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            {/* Occupation */}
            <div style={{ marginBottom: "4px" }}>
              <label style={labelStyle}>Occupation</label>
              <input name="occupation" type="text" placeholder="Enter Your Occupation" value={form.occupation} onChange={handleChange} style={inputStyle} />
            </div>

            {/* Submit */}
            <button onClick={handleSubmit} style={{ ...submitBtnStyle, opacity: submitting ? 0.8 : 1 }} disabled={submitting}>
              {submitting ? "Submitting..." : "Get Started"}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {error ? (
              <p style={{ textAlign: "center", fontSize: "12px", color: "#c2410c", marginTop: "10px" }}>
                {error}
              </p>
            ) : null}

            <p style={{ textAlign: "center", fontSize: "10px", color: "#aaa", marginTop: "12px", letterSpacing: "0.3px", textTransform: "uppercase" }}>
              By clicking get started, you agree to our{" "}
              <a href="/privacy-policy" style={{ color: "#11803a", textDecoration: "none" }}>Privacy Policy</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const closeBtnStyle: React.CSSProperties = {
  position: "absolute",
  top: "14px",
  right: "16px",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
  color: "#888",
  lineHeight: 1,
  padding: "4px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.6px",
  textTransform: "uppercase",
  color: "#888",
  marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "42px",
  border: "1px solid #e5e5e5",
  borderRadius: "999px",
  padding: "0 16px",
  fontSize: "13.5px",
  color: "#0d1f0d",
  outline: "none",
  fontFamily: "'Inter', sans-serif",
  background: "#fff",
};

const submitBtnStyle: React.CSSProperties = {
  width: "100%",
  height: "48px",
  background: "#11803a",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  marginTop: "20px",
  fontFamily: "'Inter', sans-serif",
};
