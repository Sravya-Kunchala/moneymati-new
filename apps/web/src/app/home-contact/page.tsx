"use client";

import { useState } from "react";
import { Playfair_Display, Dancing_Script, Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["800"], variable: "--font-playfair" });
const dancing = Dancing_Script({ subsets: ["latin"], weight: ["700"], variable: "--font-dancing" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

export default function ContactSection() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.subject || !form.message) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    setSubmitted(true);
  };

  const fontClasses = [playfair.className, dancing.className, inter.className].join(" ");

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #e8e8e8",
    background: "#f8fafb",
    fontSize: 14,
    outline: "none",
    fontFamily: "var(--font-inter), sans-serif",
    color: "#333",
    boxSizing: "border-box" as const,
  };

  return (
    <>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .anim-header       { animation: fadeInDown  0.6s ease 0.0s both; }
        .anim-badge        { animation: fadeIn      0.5s ease 0.2s both; }
        .anim-title        { animation: fadeInUp    0.7s ease 0.3s both; }
        .anim-subtitle     { animation: fadeInUp    0.6s ease 0.4s both; }
        .anim-left-card    { animation: slideInLeft 0.7s ease 0.5s both; }
        .anim-right-card   { animation: slideInRight 0.7s ease 0.5s both; }
        .anim-footer       { animation: fadeIn      0.6s ease 0.6s both; }
        .anim-popup        { animation: popIn       0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>

      <div className="anim-header">
        <Header />
      </div>

      <section
        className={fontClasses}
        style={{
          backgroundColor: "#f5f0e8",
          padding: "80px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: 20, right: 60, width: 180, height: 180, borderRadius: "50%", border: "1px solid rgba(6,78,59,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 60, right: 20, width: 100, height: 100, borderRadius: "50%", border: "1px solid rgba(6,78,59,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 80, left: 40, width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(6,78,59,0.1)", pointerEvents: "none" }} />

        {/* Diagonal lines */}
        <svg style={{ position: "absolute", bottom: 100, left: 60, opacity: 0.15, pointerEvents: "none" }} width="120" height="120" viewBox="0 0 120 120">
          <line x1="0" y1="120" x2="120" y2="0" stroke="#064E3B" strokeWidth="1.5"/>
          <line x1="20" y1="120" x2="120" y2="20" stroke="#064E3B" strokeWidth="1.5"/>
        </svg>

        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="anim-badge" style={{ display: "inline-flex", alignItems: "center", padding: "4px 14px", borderRadius: 9999, backgroundColor: "rgba(17,212,98,0.15)", marginBottom: 20 }}>
              <span style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.8px", textTransform: "uppercase", color: "#064E3B" }}>
                Contact Us
              </span>
            </div>

            <h2 className="anim-title" style={{ margin: "0 0 16px", fontSize: 48, lineHeight: 1.1 }}>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 800, color: "#0d2818" }}>Need Free Consultation{" "}</span>
              <br />
              <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 800, color: "#0d2818" }}>Or{" "}</span>
              <span style={{ fontFamily: "var(--font-dancing), cursive", fontWeight: 700, color: "#D4AF37", fontSize: 52 }}>Have Questions?</span>
            </h2>

            <p className="anim-subtitle" style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 400, fontSize: 15, lineHeight: "24px", color: "rgba(6,78,59,0.70)", maxWidth: 480, margin: "0 auto" }}>
              Our team is here to help you understand your financial options and guide you toward smarter money decisions.
            </p>
          </div>

          {/* Two Column Layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 24 }}>

            {/* Left: Contact Info */}
            <div className="anim-left-card" style={{ background: "#ffffff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 16, right: 16, opacity: 0.08 }}>
                <svg width="80" height="80" viewBox="0 0 107 96" fill="none">
                  <path d="M48 96V85.3333H90.6667V47.4667C90.6667 37.0667 87.0444 28.2444 79.8 21C72.5556 13.7556 63.7333 10.1333 53.3333 10.1333C42.9333 10.1333 34.1111 13.7556 26.8667 21C19.6222 28.2444 16 37.0667 16 47.4667V80H10.6667C7.73333 80 5.22222 78.9556 3.13333 76.8667C1.04444 74.7778 0 72.2667 0 69.3333V58.6667C0 56.8 0.466667 55.0444 1.4 53.4C2.33333 51.7556 3.64444 50.4444 5.33333 49.4667L5.73333 42.4C6.44444 36.3556 8.2 30.7556 11 25.6C13.8 20.4444 17.3111 15.9556 21.5333 12.1333C25.7556 8.31111 30.6 5.33333 36.0667 3.2C41.5333 1.06667 47.2889 0 53.3333 0C59.3778 0 65.1111 1.06667 70.5333 3.2C75.9556 5.33333 80.8 8.28889 85.0667 12.0667C89.3333 15.8444 92.8444 20.3111 95.6 25.4667C98.3556 30.6222 100.133 36.2222 100.933 42.2667L101.333 49.2C103.022 50 104.333 51.2 105.267 52.8C106.2 54.4 106.667 56.0889 106.667 57.8667V70.1333C106.667 71.9111 106.2 73.6 105.267 75.2C104.333 76.8 103.022 78 101.333 78.8V85.3333C101.333 88.2667 100.289 90.7778 98.2 92.8667C96.1111 94.9556 93.6 96 90.6667 96H48ZM37.3333 58.6667C35.8222 58.6667 34.5556 58.1556 33.5333 57.1333C32.5111 56.1111 32 54.8444 32 53.3333C32 51.8222 32.5111 50.5556 33.5333 49.5333C34.5556 48.5111 35.8222 48 37.3333 48C38.8444 48 40.1111 48.5111 41.1333 49.5333C42.1556 50.5556 42.6667 51.8222 42.6667 53.3333C42.6667 54.8444 42.1556 56.1111 41.1333 57.1333C40.1111 58.1556 38.8444 58.6667 37.3333 58.6667ZM69.3333 58.6667C67.8222 58.6667 66.5556 58.1556 65.5333 57.1333C64.5111 56.1111 64 54.8444 64 53.3333C64 51.8222 64.5111 50.5556 65.5333 49.5333C66.5556 48.5111 67.8222 48 69.3333 48C70.8444 48 72.1111 48.5111 73.1333 49.5333C74.1556 50.5556 74.6667 51.8222 74.6667 53.3333C74.6667 54.8444 74.1556 56.1111 73.1333 57.1333C72.1111 58.1556 70.8444 58.6667 69.3333 58.6667ZM21.4667 50.4C20.8444 40.9778 23.6889 32.8889 30 26.1333C36.3111 19.3778 44.1778 16 53.6 16C61.5111 16 68.4667 18.5111 74.4667 23.5333C80.4667 28.5556 84.0889 34.9778 85.3333 42.8C77.2444 42.7111 69.8 40.5333 63 36.2667C56.2 32 50.9778 26.2222 47.3333 18.9333C45.9111 26.0444 42.9111 32.3778 38.3333 37.9333C33.7556 43.4889 28.1333 47.6444 21.4667 50.4Z" fill="#064E3B"/>
                </svg>
              </div>

              <h3 style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: 18, color: "#0d2818", margin: "0 0 28px" }}>Contact Information</h3>

              {[
                {
                  label: "EMAIL SUPPORT", value: "support@moneymati.com",
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 6L12 13L22 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                },
                {
                  label: "PHONE INQUIRY", value: "+91 7075529006",
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 16.92V19.92C22 20.48 21.74 21.01 21.3 21.37C20.86 21.72 20.29 21.87 19.73 21.78C16.58 21.32 13.55 20.18 10.89 18.43C8.42 16.82 6.32 14.73 4.71 12.26C2.95 9.59 1.81 6.55 1.36 3.38C1.27 2.82 1.42 2.26 1.77 1.82C2.12 1.38 2.64 1.12 3.2 1.12H6.2C7.17 1.12 8 1.81 8.16 2.77C8.3 3.62 8.54 4.45 8.87 5.24C9.13 5.86 8.96 6.57 8.46 7.01L7.19 8.28C8.67 10.84 10.76 12.93 13.32 14.41L14.59 13.14C15.03 12.64 15.74 12.47 16.36 12.73C17.15 13.06 17.98 13.3 18.83 13.44C19.8 13.6 20.5 14.44 20.5 15.42L22 16.92Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                },
                {
                  label: "SUPPORT HOURS", value: "Sat – Sun 9:00am – 7:00pm PST",
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/><path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "#064E3B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: "0.8px", textTransform: "uppercase", color: "rgba(6,78,59,0.5)", margin: "0 0 2px" }}>{item.label}</p>
                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 600, fontSize: 14, color: "#0d2818", margin: 0 }}>{item.value}</p>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 32 }}>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: "0.8px", textTransform: "uppercase", color: "rgba(6,78,59,0.5)", margin: "0 0 12px" }}>Connect With Us</p>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#0d2818"/><path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" fill="white"/><path d="M6 9H2V21H6V9Z" fill="white"/><circle cx="4" cy="4" r="2" fill="white"/></svg>
                  </div>
                  <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="1" y="1" width="22" height="22" rx="6" stroke="#0d2818" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="#0d2818" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="#0d2818"/></svg>
                  </div>
                  <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="#0d2818"/><path d="M15.5 8H13C12.4477 8 12 8.44772 12 9V11H15.5L15 14H12V22H9V14H7V11H9V9C9 7.34315 10.3431 6 12 6H15.5V8Z" fill="white"/></svg>
                  </div>
                  <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#0d2818"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="anim-right-card" style={{ background: "#ffffff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, fontWeight: 500, color: "#0d2818", display: "block", marginBottom: 6 }}>First Name</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, fontWeight: 500, color: "#0d2818", display: "block", marginBottom: 6 }}>Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" style={inputStyle} />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, fontWeight: 500, color: "#0d2818", display: "block", marginBottom: 6 }}>Email Address</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" type="email" style={inputStyle} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, fontWeight: 500, color: "#0d2818", display: "block", marginBottom: 6 }}>Subject</label>
                <select
                  name="subject" value={form.subject} onChange={handleChange}
                  style={{
                    ...inputStyle,
                    color: form.subject ? "#333" : "#aaa",
                    appearance: "none",
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23999' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 14px center",
                  }}
                >
                  <option value="" disabled>Select an option</option>
                  <option value="consultation">Free Consultation</option>
                  <option value="investment">Investment Advice</option>
                  <option value="planning">Financial Planning</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, fontWeight: 500, color: "#0d2818", display: "block", marginBottom: 6 }}>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" rows={5} style={{ ...inputStyle, resize: "none" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: "14px 40px", borderRadius: 12, backgroundColor: "#064E3B",
                    border: "none", cursor: "pointer", fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 600, fontSize: 14, color: "#ffffff",
                    display: "flex", alignItems: "center", gap: 8,
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#053d2e")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#064E3B")}
                >
                  Submit Form
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ transform: "rotate(45deg)" }}>
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Popup */}
        {submitted && (
          <div
            style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setSubmitted(false)}
          >
            <div
              className="anim-popup"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff", borderRadius: 20, padding: "36px 32px",
                maxWidth: 560, width: "90%", textAlign: "center",
                boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              }}
            >
              <h2 style={{
                fontFamily: "var(--font-inter), sans-serif", fontWeight: 700,
                fontSize: 22, lineHeight: "30px", color: "#0F172A",
                marginBottom: 12, letterSpacing: 0,
              }}>
                Confirmation: Your Consultation is Booked!
              </h2>

              <p style={{
                fontFamily: "var(--font-inter), sans-serif", fontWeight: 400,
                fontSize: 14, lineHeight: "22px", color: "#0F172A",
                marginBottom: 24, letterSpacing: 0,
              }}>
                Hi{" "}
                <span style={{ fontWeight: 600, fontSize: 14 }}>
                  {form.firstName} {form.lastName}
                </span>
                , thank you for reaching out. We&apos;ve received your request for a free financial consultation.
              </p>

              <div style={{ border: "1px solid #e8e8e8", borderRadius: 12, padding: "20px", marginBottom: 24, textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: "#f0faf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#064E3B" strokeWidth="2"/>
                      <path d="M16 2V6M8 2V6M3 10H21" stroke="#064E3B" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase", color: "rgba(6,78,59,0.5)", margin: 0 }}>
                      CONSULTATION DETAILS
                    </p>
                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 600, fontSize: 16, lineHeight: "24px", color: "#0F172A", margin: 0 }}>
                      Your expert guidance is ready
                    </p>
                  </div>
                </div>

                {[
                  { label: "Expert", value: "Swathi Sharma ✅" },
                  { label: "Date", value: "March 10, 2026" },
                  { label: "Time", value: "10:00 AM (PST)" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #f0f0f0" }}>
                    <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "#888" }}>{item.label}</span>
                    <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, fontWeight: 600, color: "#0d2818" }}>{item.value}</span>
                  </div>
                ))}
              </div>

              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 24 }}>
                One of our experts will contact you shortly to guide you toward smarter money decisions. In the meantime, discover how we can help you grow.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                style={{
                  width: "100%", padding: "14px", borderRadius: 59,
                  backgroundColor: "#064E3B", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-inter), sans-serif", fontWeight: 600,
                  fontSize: 14, color: "#ffffff",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#053d2e")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#064E3B")}
              >
                Explore Our Programs
              </button>
            </div>
          </div>
        )}

      </section>

      <div className="anim-footer">
        <Footer />
      </div>
    </>
  );
}