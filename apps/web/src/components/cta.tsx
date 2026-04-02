"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

function BookingModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [datetime, setDatetime] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookedDetails, setBookedDetails] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  function formatDatetime(value: string) {
    if (!value) return "";
    const date = new Date(value);
    return date.toLocaleString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function validate() {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email.";
    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    if (!datetime) newErrors.datetime = "Please select a date and time.";
    return newErrors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setBookedDetails({ fullName, email, phone, datetime });
    setShowSuccess(true);
  }

  const inputStyle: React.CSSProperties = {
    padding: "14px 12px 14px 68px",
    borderRadius: 9999,
    border: "none",
    background: "#f6faf6",
    width: "100%",
    color: "#374151",
    lineHeight: "20px",
    fontSize: 14,
    boxSizing: "border-box" as const,
    outline: "none",
  };

  const iconWrapStyle: React.CSSProperties = {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    width: 44,
    height: 44,
    borderRadius: 9999,
    background: "#f1f6f3",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6b7280",
    flexShrink: 0,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    color: "#6b7280",
    marginBottom: 4,
  };

  const errorStyle: React.CSSProperties = {
    color: "#ef4444",
    fontSize: 11,
    marginTop: 4,
    paddingLeft: 16,
  };

  const bookingForm = (
    <div
      style={{
        width: "100%",
        maxWidth: 960,
        borderRadius: 28,
        overflow: "hidden",
        display: "flex",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        background: "#fff",
      }}
    >
      {/* LEFT PANEL */}
      <div
        style={{
          width: 300,
          background: "#102218",
          color: "#fff",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <img
          src="/best new moneymati logo.svg"
          alt="MoneyMati"
          style={{ width: 68, height: 68, borderRadius: 8 }}
        />
        <h3 style={{ margin: 0, fontSize: 18, color: "#fff", fontWeight: 900, letterSpacing: 0.6 }}>
          MONEYMATI
        </h3>
        <p style={{ marginTop: 6, color: "#cfe9d5", lineHeight: 1.5, fontSize: 13 }}>
          Secure your financial future with a personalized premium consultation.
        </p>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            "Free 30-minute session",
            "Senior wealth advisor",
            "Personalized financial plan",
            "No commitment required",
          ].map((text) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 9999,
                  background: "rgba(14,175,80,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  color: "#0EAF50",
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
              <span style={{ fontSize: 13, color: "#cfe9d5" }}>{text}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ opacity: 0.06, height: 80, width: 80, borderRadius: 9999, background: "#0b281f" }} />
      </div>

      {/* RIGHT PANEL */}
      <div
        style={{
          flex: 1,
          padding: 36,
          position: "relative",
          background: "#fff",
          overflowY: "auto",
          maxHeight: "90vh",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            right: 18,
            top: 18,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
            color: "#475569",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        <p style={{ margin: 0, color: "#a0533a", fontSize: 12, fontWeight: 700, letterSpacing: 1.2 }}>
          APPOINTMENT REQUEST
        </p>
        <h2 style={{ margin: "8px 0 4px", fontSize: 28, color: "#0b2f24", lineHeight: 1.1 }}>
          Book Consultation
        </h2>
        <p style={{ margin: "0 0 20px", color: "#6b7280", fontSize: 14 }}>
          Fill the form and we'll reach out to confirm your appointment.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          {/* Full Name */}
          <div>
            <label style={labelStyle}>Full Name</label>
            <div style={{ position: "relative" }}>
              <span style={iconWrapStyle}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.06705 7.45566C6.03262 7.45566 5.15173 7.09198 4.42437 6.36462C3.69701 5.63726 3.33333 4.75637 3.33333 3.72194C3.33333 2.68751 3.69701 1.80858 4.42437 1.08515C5.15173 0.361717 6.03262 0 7.06705 0C8.10148 0 8.98237 0.361717 9.70973 1.08515C10.4371 1.80858 10.8008 2.68751 10.8008 3.72194C10.8008 4.75637 10.4371 5.63726 9.70973 6.36462C8.98237 7.09198 8.10148 7.45566 7.06705 7.45566ZM0 14.9231V12.1658C0 11.6206 0.141921 11.1194 0.425763 10.6624C0.709605 10.2053 1.08671 9.85654 1.55708 9.61598C2.44174 9.17758 3.34406 8.84681 4.26402 8.62368C5.18399 8.40055 6.11833 8.28899 7.06705 8.28899C8.03082 8.28899 8.97285 8.39859 9.89314 8.61779C10.8134 8.837 11.7081 9.1658 12.577 9.60421C13.0474 9.84362 13.4245 10.1908 13.7083 10.6456C13.9922 11.1005 14.1341 11.607 14.1341 12.1652V14.9231H0ZM2.20836 12.7147H11.9257V12.2247C11.9257 12.0795 11.8875 11.9476 11.8112 11.8288C11.7348 11.71 11.6341 11.6177 11.5091 11.5517C10.8062 11.2081 10.0846 10.9465 9.34422 10.7668C8.60388 10.5872 7.84483 10.4974 7.06705 10.4974C6.30497 10.4974 5.54592 10.5872 4.78988 10.7668C4.03384 10.9465 3.31222 11.2081 2.62503 11.5517C2.50003 11.6177 2.39933 11.71 2.32294 11.8288C2.24656 11.9476 2.20836 12.0795 2.20836 12.2247V12.7147ZM7.06663 5.2473C7.48599 5.2473 7.84513 5.09798 8.14404 4.79934C8.44295 4.50071 8.5924 4.14172 8.5924 3.72236C8.5924 3.303 8.44309 2.94583 8.14445 2.65084C7.84582 2.35585 7.48682 2.20836 7.06747 2.20836C6.64811 2.20836 6.28897 2.35585 5.99006 2.65084C5.69115 2.94583 5.54169 3.303 5.54169 3.72236C5.54169 4.14172 5.69101 4.50071 5.98965 4.79934C6.28828 5.09798 6.64727 5.2473 7.06663 5.2473Z" fill="#475569"/>
                </svg>
              </span>
              <input
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); setErrors((p) => ({ ...p, fullName: "" })); }}
                placeholder="Jane Doe"
                style={inputStyle}
              />
            </div>
            {errors.fullName && <p style={errorStyle}>{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>Email</label>
            <div style={{ position: "relative" }}>
              <span style={iconWrapStyle}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M1 2.5H15" stroke="#475569" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 2.5V10.5C1 11.0523 1.44772 11.5 2 11.5H14C14.5523 11.5 15 11.0523 15 10.5V2.5" stroke="#475569" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 2.5L8 7.5L15 2.5" stroke="#475569" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                placeholder="you@email.com"
                style={inputStyle}
              />
            </div>
            {errors.email && <p style={errorStyle}>{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label style={labelStyle}>Phone Number</label>
            <div style={{ position: "relative" }}>
              <span style={iconWrapStyle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.9.42 1.76.9 2.54a2 2 0 0 1-.45 2.11L9.91 9.91a14 14 0 0 0 6 6l1.54-1.54a2 2 0 0 1 2.11-.45c.78.48 1.64.78 2.54.9A2 2 0 0 1 22 16.92z" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }}
                placeholder="+91 9876543210"
                style={inputStyle}
              />
            </div>
            {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
          </div>

          {/* Date & Time — FIXED */}
          <div>
            <label style={labelStyle}>Preferred Date &amp; Time</label>
            <div style={{ position: "relative" }}>
              <span style={iconWrapStyle}>
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                  <path d="M2 3h12M4 1v4M12 1v4M2 3v12h12V3z" stroke="#475569" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <input
                type="datetime-local"
                value={datetime}
                min={new Date().toISOString().slice(0, 16)}
                onChange={(e) => { setDatetime(e.target.value); setErrors((p) => ({ ...p, datetime: "" })); }}
                style={inputStyle}
              />
            </div>
            {errors.datetime && <p style={errorStyle}>{errors.datetime}</p>}
          </div>

          <button
            type="submit"
            style={{
              marginTop: 8,
              background: "#0b3a2f",
              color: "#fff",
              padding: "14px 22px",
              borderRadius: 9999,
              border: "none",
              fontWeight: 800,
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <span>Book Now</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l6 7-6 7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 4, textAlign: "center" }}>
            By booking, you agree to our{" "}
            <span style={{ color: "#0EAF50", fontWeight: 700, cursor: "pointer" }}>Terms of Service</span>{" "}
            and{" "}
            <span style={{ color: "#0EAF50", fontWeight: 700, cursor: "pointer" }}>Privacy Policy</span>.
          </p>
        </form>
      </div>
    </div>
  );

  const successModal = (
    <div
      style={{
        width: "100%",
        maxWidth: 480,
        borderRadius: 24,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        background: "#fff",
        padding: 32,
      }}
    >
      {/* Success icon */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 9999,
            background: "#dff6e6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width={32} height={32} viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#0EAF50" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <h2 style={{ margin: "0 0 8px", fontSize: 26, color: "#0b2f24", textAlign: "center", fontWeight: 900 }}>
        Consultation Booked!
      </h2>
      <p style={{ textAlign: "center", color: "#42506b", margin: "0 0 20px", fontSize: 14, lineHeight: 1.6 }}>
        Your session has been confirmed. A calendar invite has been sent to{" "}
        <strong style={{ color: "#0b2f24" }}>{bookedDetails?.email}</strong>.
      </p>

      {/* Booking details card */}
      <div
        style={{
          background: "#f6faf6",
          borderRadius: 16,
          padding: 16,
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 10,
            background: "#e0f0e7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <path d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" stroke="#0b3a2f" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 800, letterSpacing: 0.8, textTransform: "uppercase" }}>
            Scheduled For
          </div>
          <div style={{ fontWeight: 800, color: "#0b2f24", marginTop: 4, fontSize: 14, lineHeight: 1.4 }}>
            {bookedDetails?.datetime ? formatDatetime(bookedDetails.datetime) : "—"}
          </div>

          <div style={{ height: 12 }} />

          <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 800, letterSpacing: 0.8, textTransform: "uppercase" }}>
            Client Name
          </div>
          <div style={{ fontWeight: 800, color: "#0b2f24", marginTop: 4, fontSize: 14 }}>
            {bookedDetails?.fullName}
          </div>

          <div style={{ height: 12 }} />

          <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 800, letterSpacing: 0.8, textTransform: "uppercase" }}>
            Advisor
          </div>
          <div style={{ fontWeight: 800, color: "#0b2f24", marginTop: 4, fontSize: 14 }}>
            Wealth Management Executive
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={() => { onClose(); router.push("/"); }}
          style={{
            background: "#0b2f24",
            color: "#fff",
            padding: "14px 22px",
            borderRadius: 9999,
            border: "none",
            fontWeight: 800,
            cursor: "pointer",
            fontSize: 15,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Back to Homepage
        </button>
        <button
          onClick={() => {
            if (!bookedDetails?.datetime) return;
            const start = new Date(bookedDetails.datetime);
            const end = new Date(start.getTime() + 30 * 60 * 1000);
            const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
            const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=MoneyMati+Consultation&dates=${fmt(start)}/${fmt(end)}&details=Your+MoneyMati+wealth+consultation`;
            window.open(url, "_blank");
          }}
          style={{
            background: "transparent",
            border: "1.5px solid #cfe9d5",
            color: "#0b2f24",
            padding: "13px 18px",
            borderRadius: 9999,
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" stroke="#0b2f24" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add to Google Calendar
        </button>
      </div>
    </div>
  );

  const modal = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 140000,
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {showSuccess ? successModal : bookingForm}
    </div>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}

export default function CTASection() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <section
      className={`${playfair.variable} w-full py-24 px-8 flex flex-col items-center justify-center text-center relative`}
      style={{
        backgroundImage: "url('/ctabg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .cta-button {
            padding-left: 40px !important;
            padding-right: 40px !important;
            width: 100% !important;
            max-width: 320px !important;
          }
        }
      `}</style>

      {/* Dark overlay */}
      <div className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-white leading-snug mb-6">
          Your Financial Future <br />
          Starts{" "}
          <em style={{ color: "#FFB600" }} className="italic">Today</em>
        </h2>

        <p
          className="mb-10 text-center mx-auto"
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "26px",
            color: "#F8F6F1B3",
            maxWidth: "570px",
          }}
        >
          Whether you're just starting your financial journey or looking to level up your
          wealth-building strategy, MoneyMati has the tools and community to help you succeed.
        </p>

        <button
          onClick={() => setShowBooking(true)}
          className="cta-button border border-white text-white font-semibold text-base rounded-full hover:bg-white hover:text-[#1a3a2a] transition-colors"
          style={{ paddingTop: "14px", paddingBottom: "14px", paddingLeft: "150px", paddingRight: "150px" }}
        >
          Book an Appointment
        </button>
      </div>

      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
    </section>
  );
}