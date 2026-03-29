"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Dancing_Script, Playfair_Display, DM_Sans } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", style: ["normal", "italic"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

function BookingModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [datetime, setDatetime] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookedDetails, setBookedDetails] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const bookingForm = (
    <div style={{ width: "100%", maxWidth: 960, borderRadius: 28, overflow: "hidden", display: "flex", boxShadow: "0 30px 80px rgba(0,0,0,0.6)", background: "#fff" }}>
      <div style={{ width: 360, background: "#102218", color: "#fff", padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
        <img src="/best new moneymati logo.svg" alt="MoneyMati" style={{ width: 68, height: 68, borderRadius: 8 }} />
        <h3 style={{ margin: 0, fontSize: 18, color: "#fff", fontWeight: 900, letterSpacing: 0.6 }}>MONEYMATI</h3>
        <p style={{ marginTop: 6, color: "#cfe9d5", lineHeight: 1.35, fontSize: 13 }}>Secure your financial future with a personalized premium consultation.</p>
        <div style={{ flex: 1 }} />
        <div style={{ opacity: 0.06, height: 80, width: 80, borderRadius: 9999, background: "#0b281f" }} />
      </div>

      <div style={{ flex: 1, padding: 36, position: "relative", background: "#fff" }}>
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", right: 18, top: 18, background: "transparent", border: "none", cursor: "pointer", fontSize: 20, color: "#475569" }}>✕</button>
        <p style={{ margin: 0, color: "#a0533a", fontSize: 12, fontWeight: 700, letterSpacing: 1.2 }}>APPOINTMENT REQUEST</p>
        <h2 style={{ margin: "8px 0 12px", fontSize: 32, color: "#0b2f24", lineHeight: 1.05 }}>Book Consultation</h2>
        <p style={{ margin: "0 0 18px", color: "#6b7280" }}>Fill the form and we'll reach out to confirm your appointment.</p>

        <form onSubmit={(e) => { e.preventDefault(); const details = { fullName, email, phone, datetime }; setBookedDetails(details); setShowSuccess(true); }} style={{ display: "grid", gap: 14 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#6b7280' }}>Full Name</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: 9999, background: '#f1f6f3', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.06705 7.45566C6.03262 7.45566 5.15173 7.09198 4.42437 6.36462C3.69701 5.63726 3.33333 4.75637 3.33333 3.72194C3.33333 2.68751 3.69701 1.80858 4.42437 1.08515C5.15173 0.361717 6.03262 0 7.06705 0C8.10148 0 8.98237 0.361717 9.70973 1.08515C10.4371 1.80858 10.8008 2.68751 10.8008 3.72194C10.8008 4.75637 10.4371 5.63726 9.70973 6.36462C8.98237 7.09198 8.10148 7.45566 7.06705 7.45566ZM0 14.9231V12.1658C0 11.6206 0.141921 11.1194 0.425763 10.6624C0.709605 10.2053 1.08671 9.85654 1.55708 9.61598C2.44174 9.17758 3.34406 8.84681 4.26402 8.62368C5.18399 8.40055 6.11833 8.28899 7.06705 8.28899C8.03082 8.28899 8.97285 8.39859 9.89314 8.61779C10.8134 8.837 11.7081 9.1658 12.577 9.60421C13.0474 9.84362 13.4245 10.1908 13.7083 10.6456C13.9922 11.1005 14.1341 11.607 14.1341 12.1652V14.9231H0ZM2.20836 12.7147H11.9257V12.2247C11.9257 12.0795 11.8875 11.9476 11.8112 11.8288C11.7348 11.71 11.6341 11.6177 11.5091 11.5517C10.8062 11.2081 10.0846 10.9465 9.34422 10.7668C8.60388 10.5872 7.84483 10.4974 7.06705 10.4974C6.30497 10.4974 5.54592 10.5872 4.78988 10.7668C4.03384 10.9465 3.31222 11.2081 2.62503 11.5517C2.50003 11.6177 2.39933 11.71 2.32294 11.8288C2.24656 11.9476 2.20836 12.0795 2.20836 12.2247V12.7147ZM7.06663 5.2473C7.48599 5.2473 7.84513 5.09798 8.14404 4.79934C8.44295 4.50071 8.5924 4.14172 8.5924 3.72236C8.5924 3.303 8.44309 2.94583 8.14445 2.65084C7.84582 2.35585 7.48682 2.20836 7.06747 2.20836C6.64811 2.20836 6.28897 2.35585 5.99006 2.65084C5.69115 2.94583 5.54169 3.303 5.54169 3.72236C5.54169 4.14172 5.69101 4.50071 5.98965 4.79934C6.28828 5.09798 6.64727 5.2473 7.06663 5.2473Z" fill="#475569"/>
              </svg>
            </span>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Jane Doe' style={{ padding: '14px 12px 14px 68px', borderRadius: 9999, border: 'none', background: '#f6faf6', width: '100%', color: '#6b7280', lineHeight: '20px' }} />
          </div>

          <label style={{ display: 'block', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#6b7280' }}>Email</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: 9999, background: '#f1f6f3', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', flexShrink: 0 }}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 2.5H15" stroke="#475569" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 2.5V10.5C1 11.0523 1.44772 11.5 2 11.5H14C14.5523 11.5 15 11.0523 15 10.5V2.5" stroke="#475569" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 2.5L8 7.5L15 2.5" stroke="#475569" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='you@email.com' style={{ padding: '14px 12px 14px 68px', borderRadius: 9999, border: 'none', background: '#f6faf6', width: '100%', color: '#6b7280', lineHeight: '20px' }} />
          </div>

          <label style={{ display: 'block', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#6b7280' }}>Phone Number</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: 9999, background: '#f1f6f3', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.9.42 1.76.9 2.54a2 2 0 0 1-.45 2.11L9.91 9.91a14 14 0 0 0 6 6l1.54-1.54a2 2 0 0 1 2.11-.45c.78.48 1.64.78 2.54.9A2 2 0 0 1 22 16.92z" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='+91 9876543210' style={{ padding: '14px 12px 14px 68px', borderRadius: 9999, border: 'none', background: '#f6faf6', width: '100%', color: '#6b7280', lineHeight: '20px' }} />
          </div>

          <label style={{ display: 'block', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#6b7280' }}>Preferred Date & Time</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: 9999, background: '#f1f6f3', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', flexShrink: 0 }}>
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3h12M4 1v4M12 1v4M2 3v12h12V3z" stroke="#475569" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <input value={datetime} onChange={(e) => setDatetime(e.target.value)} placeholder='mm/dd/yyyy, --:-- --' style={{ padding: '14px 12px 14px 68px', borderRadius: 9999, border: 'none', background: '#f6faf6', width: '100%', color: '#6b7280', lineHeight: '20px' }} />
          </div>

          <button type='submit' style={{ marginTop: 8, background: '#0b3a2f', color: '#fff', padding: '14px 22px', borderRadius: 9999, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span>Book Now</span>
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none'><path d='M5 12h14M13 5l6 7-6 7' stroke='#fff' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round'/></svg>
          </button>

          <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 6, textAlign: 'center' }}>By booking, you agree to our <span style={{ color: '#0EAF50', fontWeight: 700 }}>Terms of Service</span> and <span style={{ color: '#0EAF50', fontWeight: 700 }}>Privacy Policy</span>.</p>
        </form>
      </div>
    </div>
  );

  const successModal = (
    <div style={{ width: '100%', maxWidth: 520, borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 30px 80px rgba(0,0,0,0.5)', background: '#fff', padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 9999, background: '#dff6e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={28} height={28} viewBox='0 0 24 24' fill='none'><path d='M20 6L9 17l-5-5' stroke='#0EAF50' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'/></svg>
        </div>
      </div>
      <h2 style={{ margin: '18px 0 6px', fontSize: 28, color: '#0b2f24', textAlign: 'center' }}>Consultation Booked!</h2>
      <p style={{ textAlign: 'center', color: '#42506b', margin: '0 0 18px' }}>Your session with our senior advisor has been confirmed. A calendar invitation and summary of your portfolio review have been sent to your registered email.</p>

      <div style={{ width: '100%', background: '#fff', borderRadius: 12, padding: 14, boxShadow: '0 6px 18px rgba(0,0,0,0.06)', display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: 8, background: '#f6f7f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={20} height={20} viewBox='0 0 24 24' fill='none'><path d='M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z' stroke='#475569' strokeWidth='1.2' strokeLinecap='round' strokeLinejoin='round'/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 800, letterSpacing: 0.6 }}>SCHEDULED FOR</div>
          <div style={{ fontWeight: 800, color: '#0b2f24', marginTop: 6 }}>{bookedDetails?.datetime || 'March 24, 2026 • 10:00 AM IST'}</div>
          <div style={{ height: 8 }} />
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 800, letterSpacing: 0.6 }}>ADVISOR</div>
          <div style={{ fontWeight: 800, color: '#0b2f24', marginTop: 6 }}>Wealth Management Executive</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
        <button onClick={() => { onClose(); router.push('/'); }} style={{ background: '#0b2f24', color: '#fff', padding: '14px 22px', borderRadius: 9999, border: 'none', fontWeight: 800, cursor: 'pointer' }}>Back to Homepage</button>
        <button onClick={() => { /* TODO: implement ICS export */ }} style={{ background: 'transparent', border: '2px solid #cfe9d5', color: '#0b2f24', padding: '12px 18px', borderRadius: 9999, fontWeight: 700 }}>Add to Calendar</button>
      </div>
    </div>
  );

  const modal = (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 140000, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {showSuccess ? successModal : bookingForm}
    </div>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}

export default function HeroSection() {
  const [showBooking, setShowBooking] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(24px)";
      htmlEl.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
      requestAnimationFrame(() => {
        htmlEl.style.opacity = "1";
        htmlEl.style.transform = "translateY(0)";
      });
    });
  }, []);

  return (
    <>
      {/* Mobile-only styles */}
      <style>{`
        @media (max-width: 1023px) {
          .hero-mobile-image-section {
            display: flex !important;
            width: 100% !important;
            min-height: 320px !important;
            position: relative !important;
            margin-top: 24px !important;
            padding-bottom: 60px !important;
          }
          .hero-mobile-advisor-img {
            width: 100% !important;
            height: 340px !important;
            top: auto !important;
            right: auto !important;
            position: relative !important;
            border-radius: 20px !important;
          }
          .hero-mobile-chart-img {
            width: 55% !important;
            bottom: 0px !important;
            left: 0px !important;
          }
          .hero-mobile-mb {
            margin-bottom: 8px !important;
          }
          .hero-cta-btn-primary,
          .hero-cta-btn-secondary {
            width: 100% !important;
            flex: 1 1 100% !important;
          }
          .hero-cta-wrap {
            flex-direction: column !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-cta-btn-primary,
          .hero-cta-btn-secondary {
            width: 342px !important;
          }
        }
      `}</style>

      <section
        ref={heroRef}
        className={`relative overflow-hidden ${dancingScript.variable} ${playfairDisplay.variable} ${dmSans.variable}`}
        style={{
          backgroundImage: "url('/Rectangle 5.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        {/* Perspective Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/Perspective Grid.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.4,
          }}
        />

        {/* Gradient overlay bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(20,50,35,0.6), transparent)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-8 flex flex-col lg:flex-row items-center gap-10" style={{ minHeight: "600px" }}>

          {/* LEFT: Text Content */}
          <div className="flex-1 flex flex-col justify-center max-w-xl">

            {/* Eyebrow */}
            <p
              data-animate
              className="mb-6"
              style={{
                color: "#C6A553",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.7px",
                textTransform: "uppercase",
                verticalAlign: "middle",
              }}
            >
              Empowering Women to Take Control of Their Finances
            </p>

            {/* Headline */}
            <h1
              data-animate
              className="mb-6"
              style={{ color: "#ffffff" }}
            >
              <span
                className="block font-bold"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: 1.15,
                  fontFamily: "var(--font-playfair), serif",
                }}
              >
                Build Wealth
              </span>
              <span
                className="block font-bold"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: 1.15,
                  fontFamily: "var(--font-playfair), serif",
                }}
              >
                With{" "}
                <em
                  style={{
                    color: "#ffffff",
                    fontStyle: "italic",
                    fontFamily: "var(--font-playfair), serif",
                  }}
                >
                  Confidence
                </em>
              </span>

              <span
                className="block"
                style={{
                  fontSize: "72px",
                  lineHeight: "72px",
                  letterSpacing: "0",
                  fontFamily: "var(--font-dancing), cursive",
                  fontWeight: 700,
                  color: "#C6A553",
                }}
              >
                &amp; Clarity
              </span>
            </h1>

            {/* Subtext */}
            <p
              data-animate
              className="mb-10 leading-relaxed"
              style={{
                color: "#b8cdb8",
                fontSize: "0.95rem",
                fontFamily: "var(--font-dm-sans), sans-serif",
                maxWidth: "380px",
              }}
            >
              Expert guidance, practical tools, and a supportive community to help
              you navigate your financial journey with confidence, purpose, and
              clarity.
            </p>

            {/* CTA Buttons */}
           {/* CTA Buttons */}
<div data-animate className="flex gap-4 mb-14 hero-mobile-mb hero-cta-wrap">
  <button
    onClick={() => setShowBooking(true)}
    className="transition-all duration-200 hover:scale-105 active:scale-95 hero-cta-btn-primary"
    style={{
      height: "52px",
      borderRadius: "9999px",
      backgroundColor: "#FFB600",
      color: "#1a3a2a",
      fontFamily: "var(--font-dm-sans), sans-serif",
      fontWeight: 600,
      fontSize: "14px",
      whiteSpace: "nowrap",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 20px rgba(255,182,0,0.35)",
      padding: "0 32px",
    }}
  >
    Book a Free Appointment
  </button>

  {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}

  <button
    className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-white/10 hero-cta-btn-secondary"
    style={{
      backgroundColor: "transparent",
      color: "#ffffff",
      fontFamily: "var(--font-dm-sans), sans-serif",
      border: "1.5px solid rgba(255,255,255,0.5)",
      cursor: "pointer",
      height: "52px",
      padding: "0 32px",
      whiteSpace: "nowrap",
    }}
  >
    Register for Webinar
  </button>
</div>

            {/* Stats */}
            <div data-animate className="flex gap-10">
              {[
                { value: "5,200+", label: "Women Empowered" },
                { value: "200+", label: "Resources Shared" },
                { value: "50+", label: "Success Stories" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-bold"
                    style={{
                      color: "#ffffff",
                      fontSize: "1.4rem",
                      fontFamily: "var(--font-playfair), serif",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      color: "#8aad8a",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT / BOTTOM on mobile: Image Card */}
          <div
            data-animate
            className="hero-mobile-image-section flex-1 flex justify-center lg:justify-end items-center relative"
            style={{ minHeight: "560px" }}
          >
            {/* Financial chart — moved down */}
            <img
              src="/Financial chart.svg"
              alt="Financial chart"
              className="absolute hero-mobile-chart-img"
              style={{
                bottom: "-60px",
                left: "-10px",
                width: "65%",
                zIndex: 1,
                borderRadius: "12px",
              }}
            />

            {/* Advisor image — on top, shifted right */}
            <div
              className="absolute rounded-3xl overflow-hidden hero-mobile-advisor-img"
              style={{
                top: "0",
                right: "0",
                width: "75%",
                height: "85%",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                zIndex: 2,
              }}
            >
              <img
                src="/Financial advisor.svg"
                alt="Financial advisor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
