"use client";

import { useState, useRef, useEffect } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

// ─── SIP Formula (Annuity Due — investment at START of each period) ───────────
// FV = P × [((1 + r)^n - 1) / r] × (1 + r)
function calcSIP(monthly: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

function formatCrore(val: number): string {
  if (val >= 1e7) return `₹${(val / 1e7).toFixed(2)} Cr`;
  if (val >= 1e5) return `₹${(val / 1e5).toFixed(2)} L`;
  return `₹${Math.round(val).toLocaleString("en-IN")}`;
}

function formatShort(val: number): string {
  if (val >= 1e7) return `₹${(val / 1e7).toFixed(2)} Cr`;
  if (val >= 1e5) return `₹${(val / 1e5).toFixed(0)}L`;
  return `₹${Math.round(val).toLocaleString("en-IN")}`;
}

// Helpers for numeric input ↔ state sync
const MIN_MONTHLY = 500;
const MAX_MONTHLY = 500000;
function parseNumber(input: string): number | null {
  const num = parseFloat((input || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? num : null;
}
function formatINR(val: number): string {
  return val.toLocaleString("en-IN");
}

// ─── Slider ───────────────────────────────────────────────────────────────────
function SIPSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  displayValue,
  minLabel,
  maxLabel,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  displayValue: string;
  minLabel: string;
  maxLabel: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: "#888" }}>
          {label}
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#0d3d20" }}>{displayValue}</span>
      </div>
      <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
        {/* Track background */}
        <div style={{ position: "absolute", left: 0, right: 0, height: 4, borderRadius: 99, background: "#e8e4dc" }} />
        {/* Track fill */}
        <div
          style={{
            position: "absolute",
            left: 0,
            width: `${pct}%`,
            height: 4,
            borderRadius: 99,
            background: "linear-gradient(90deg, #0d3d20, #11D462)",
          }}
        />
        {/* Thumb dot */}
        <div
          style={{
            position: "absolute",
            left: `calc(${pct}% - 8px)`,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#11D462",
            border: "2.5px solid #fff",
            boxShadow: "0 2px 8px rgba(17,212,98,0.45)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{
            position: "absolute",
            inset: "-6px 0",
            width: "100%",
            height: "32px",
            opacity: 0,
            cursor: "pointer",
            zIndex: 5,
            touchAction: "manipulation",
            pointerEvents: "auto",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 11, color: "#aaa" }}>{minLabel}</span>
        <span style={{ fontSize: 11, color: "#aaa" }}>{maxLabel}</span>
      </div>
    </div>
  );
}

export default function SIPCalculatorPage() {
  const [monthly,    setMonthly]    = useState(10000);
  const [annualRate, setAnnualRate] = useState(12);
  const [years,      setYears]      = useState(10);
  const [investedInput, setInvestedInput] = useState(formatINR(10000 * 12 * 10));

  const totalInvested    = monthly * years * 12;
  const futureValue      = calcSIP(monthly, annualRate, years);
  const estimatedReturns = Math.max(0, futureValue - totalInvested);

  // Animated counter for Total Corpus
  const [displayFV, setDisplayFV] = useState(futureValue);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (animRef.current) clearTimeout(animRef.current);
    const start = displayFV;
    const diff  = futureValue - start;
    const steps = 20;
    let i = 0;
    const tick = () => {
      i++;
      setDisplayFV(start + diff * (1 - Math.pow(1 - i / steps, 3)));
      if (i < steps) animRef.current = setTimeout(tick, 16);
    };
    animRef.current = setTimeout(tick, 16);
    return () => { if (animRef.current) clearTimeout(animRef.current); };
  }, [futureValue]);

  // Keep text field in sync when sliders change
  useEffect(() => {
    setInvestedInput(formatINR(totalInvested));
  }, [totalInvested]);

  const handleInvestedChange = (val: string) => {
    setInvestedInput(val);
    const parsed = parseNumber(val);
    if (parsed === null) return;
    const calcMonthly = parsed / (years * 12);
    if (!Number.isFinite(calcMonthly)) return;
    const clamped = Math.min(Math.max(calcMonthly, MIN_MONTHLY), MAX_MONTHLY);
    // Snap to nearest 500 like the slider step to keep them in sync
    const snapped = Math.round(clamped / 500) * 500;
    setMonthly(snapped);
  };

  return (
    <div
      className={inter.className}
      style={{ backgroundColor: "#f5f0e8", minHeight: "100vh", fontFamily: "var(--font-inter), sans-serif" }}
    >
      <style>{`
        @keyframes fadeInUp   { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn     { from { opacity:0; } to { opacity:1; } }
        @keyframes scaleIn    { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }
        @keyframes cardIn     { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-24px); } to { opacity:1; transform:translateY(0); } }

        .anim-hero        { animation: fadeIn     0.8s ease 0.00s both; }
        .anim-hero-text   { animation: fadeInDown 0.7s ease 0.15s both; }
        .anim-overlap     { animation: scaleIn    0.7s ease 0.30s both; }
        .anim-calc        { animation: fadeInUp   0.7s ease 0.20s both; }
        .anim-sip-card-0  { animation: cardIn     0.6s ease 0.30s both; }
        .anim-sip-card-1  { animation: cardIn     0.6s ease 0.42s both; }
        .anim-sip-card-2  { animation: cardIn     0.6s ease 0.54s both; }
        .anim-calc-card-0 { animation: cardIn     0.5s ease 0.30s both; }
        .anim-calc-card-1 { animation: cardIn     0.5s ease 0.38s both; }
        .anim-calc-card-2 { animation: cardIn     0.5s ease 0.46s both; }
        .anim-calc-card-3 { animation: cardIn     0.5s ease 0.54s both; }

        .why-grid  { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .grid-4col { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }

        /* Make the hidden range input reliably draggable across browsers */
        input[type=range] {
          -webkit-appearance:none;
          appearance:none;
          background:transparent;
          width:100%;
        }
        /* Give the invisible thumb a real hit-area so drag works on Safari/Firefox */
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance:none;
          width:26px;
          height:26px;
          background:transparent;
          cursor:grab;
        }
        input[type=range]::-moz-range-thumb {
          width:26px;
          height:26px;
          background:transparent;
          border:none;
          cursor:grab;
        }
        input[type=range]::-webkit-slider-runnable-track,
        input[type=range]::-moz-range-track {
          background:transparent;
          height:6px;
        }

        @media (max-width:767px) {
          .hero-section        { padding:60px 20px 100px !important; min-height:260px !important; }
          .hero-section h1     { font-size:32px !important; }
          .hero-overlap-outer  { position:static !important; bottom:auto !important; left:auto !important; transform:none !important; padding:0 16px !important; margin-top:-70px !important; }
          .hero-overlap-card   { padding:24px 18px !important; }
          .hero-overlap-card h2 { font-size:19px !important; }
          .hero-spacer         { height:32px !important; }
          .main-content        { padding:0 16px 32px !important; }
          .sip-split           { flex-direction:column !important; }
          .sip-split > *       { width:100% !important; }
          .why-grid            { grid-template-columns:1fr !important; gap:12px !important; }
          .grid-4col           { grid-template-columns:1fr 1fr !important; gap:12px !important; }
          .why-section         { padding:24px 16px !important; }
        }
        @media (min-width:768px) and (max-width:1023px) {
          .hero-section        { padding:70px 32px 110px !important; }
          .main-content        { padding:0 32px 40px !important; }
          .hero-overlap-outer  { padding:0 32px !important; }
          .grid-4col           { grid-template-columns:1fr 1fr !important; }
          .why-grid            { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>

      <Header />

      {/* ── Hero ── */}
      <div style={{ position: "relative" }}>
        <div
          className="anim-hero hero-section"
          style={{ position: "relative", minHeight: 320, padding: "80px 48px 120px", backgroundColor: "#0d2818" }}
        >
          <img
            src="/financial-planning.svg"
            alt=""
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }}
          />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(4,40,28,0.25)", zIndex: 1 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(14,61,39,0.4) 0%,rgba(26,92,58,0.2) 100%)", zIndex: 1 }} />

          <div className="anim-hero-text" style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ fontSize: 13, color: "#11D462", marginBottom: 12 }}>
              <a href="/" style={{ color: "#11D462", textDecoration: "none" }}>Home</a>
              <span style={{ margin: "0 8px", color: "#ffffff50" }}>›</span>
              <a href="/calucator" style={{ color: "#11D462", textDecoration: "none" }}>Calculator</a>
              <span style={{ margin: "0 8px", color: "#ffffff50" }}>›</span>
              <span style={{ color: "#11D462", fontWeight: 600 }}>SIP Calculator</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(36px,5vw,54px)", color: "#ffffff", fontWeight: 800, lineHeight: 1.1 }}>
              SIP <span style={{ color: "#11D462", fontStyle: "italic" }}>Calculator</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.7, maxWidth: 500, marginTop: 16 }}>
              Plan your path to financial freedom with precision. Our premium tools help you visualize
              the power of compounded growth and consistent investing.
            </p>
          </div>
        </div>

        {/* Overlap white card */}
        <div
          className="hero-overlap-outer"
          style={{ position: "absolute", bottom: "-140px", left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 680, zIndex: 10, padding: "0 24px", boxSizing: "border-box" }}
        >
          <div
            className="anim-overlap hero-overlap-card"
            style={{ background: "#ffffff", borderRadius: 20, padding: "40px", textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: "#11D462" }}>
              INVESTMENT STRATEGY
            </span>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0d1f0d", margin: "12px 0 12px" }}>
              Plan Your Investment With SIP
            </h2>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, maxWidth: 420, margin: "0 auto" }}>
              Systematic Investment Plan (SIP) allows you to invest small amounts periodically.
              See exactly how your wealth compounds over time with our real-time calculator.
            </p>
          </div>
        </div>
      </div>

      <div className="hero-spacer" style={{ height: 180, backgroundColor: "#f5f0e8" }} />

      <div
        className="main-content"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px 48px", backgroundColor: "#f5f0e8", position: "relative", zIndex: 1 }}
      >

        {/* ── CALCULATOR ── */}
        <div className="anim-calc" style={{ marginBottom: 32 }}>

          {/* Section heading */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0d3d20", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="#11D462" strokeWidth="2" />
                <path d="M8 12h8M12 8v8" stroke="#11D462" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#0d1f0d" }}>SIP Investments</h2>
          </div>

          {/* Split: LEFT sliders / RIGHT dark result */}
          <div className="sip-split" style={{ display: "flex", gap: 20, alignItems: "stretch" }}>

            {/* LEFT — sliders */}
            <div style={{ flex: "1 1 50%", background: "#ffffff", borderRadius: 20, padding: "32px 36px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>

              <SIPSlider
                label="Monthly Investment (₹)"
                value={monthly}
                min={500}
                max={500000}
                step={500}
                onChange={setMonthly}
                displayValue={`₹ ${monthly.toLocaleString("en-IN")}`}
                minLabel="₹500"
                maxLabel="₹5L"
              />

              <SIPSlider
                label="Expected Annual Return (%)"
                value={annualRate}
                min={1}
                max={30}
                step={0.5}
                onChange={setAnnualRate}
                displayValue={`${annualRate}%`}
                minLabel="1%"
                maxLabel="30%"
              />

              <SIPSlider
                label="Investment Duration (Years)"
                value={years}
                min={1}
                max={40}
                step={1}
                onChange={setYears}
                displayValue={`${years} Years`}
                minLabel="1yr"
                maxLabel="40yr"
              />
            </div>

            {/* RIGHT — dark results */}
            <div
              style={{ flex: "1 1 50%", background: "#0d2818", borderRadius: 20, padding: "32px 36px", boxShadow: "0 8px 40px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                {/* Badge */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(17,212,98,0.12)", border: "1px solid rgba(17,212,98,0.2)", borderRadius: 99, padding: "4px 12px", marginBottom: 24 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#11D462" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: "#11D462" }}>
                    Calculation Result
                  </span>
                </div>

                {/* Amount Invested */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ margin: "0 0 6px", fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>Amount invested</p>
                  <input
                    value={investedInput}
                    onChange={(e) => handleInvestedChange(e.target.value)}
                    onBlur={() => setInvestedInput(formatINR(totalInvested))}
                    inputMode="decimal"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: 10,
                      border: "1px solid rgba(255,255,255,0.25)",
                      background: "rgba(255,255,255,0.08)",
                      color: "#ffffff",
                      fontSize: 22,
                      fontWeight: 800,
                      letterSpacing: "-0.4px",
                      outline: "none",
                      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.18)",
                    }}
                  />
                  <p style={{ margin: "6px 0 0", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
                    Type total invested corpus to auto-adjust monthly SIP.
                  </p>
                </div>

                {/* Estimated Returns */}
                <div style={{ marginBottom: 28 }}>
                  <p style={{ margin: "0 0 6px", fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>Estimated returns</p>
                  <p style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px" }}>
                    {formatCrore(estimatedReturns)}
                  </p>
                </div>

                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 24 }} />

                {/* Total Corpus */}
                <div style={{ marginBottom: 20 }}>
                  <p style={{ margin: "0 0 10px", fontSize: 14, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>Total Corpus</p>
                  <div style={{ background: "#11D462", borderRadius: 14, padding: "18px 24px", textAlign: "center" }}>
                    <span style={{ fontSize: 28, fontWeight: 900, color: "#0a2015", letterSpacing: "-0.5px" }}>
                      {formatCrore(displayFV)}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* ── Why Invest via SIP ── */}
        <div
          className="anim-sip-card-0 why-section"
          style={{ marginBottom: 32, background: "#ffffff", borderRadius: 20, padding: "40px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0d1f0d", textAlign: "center", marginBottom: 8 }}>
            Why Invest via SIP?
          </h2>
          <div style={{ width: 40, height: 3, background: "#11D462", borderRadius: 2, margin: "0 auto 32px" }} />
          <div className="why-grid">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="#11D462" />
                  </svg>
                ),
                title: "What is SIP?",
                desc: "A Systematic Investment Plan (SIP) is a method where you invest a fixed amount regularly in a mutual fund scheme.",
                cls: "anim-sip-card-0",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#11D462" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Why SIP Helps?",
                desc: "It helps in rupee cost averaging and brings financial discipline by making you save before you spend.",
                cls: "anim-sip-card-1",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#11D462" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: "The Benefits",
                desc: "The power of compounding is most effective with SIPs, potentially turning small monthly amounts into massive wealth.",
                cls: "anim-sip-card-2",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={item.cls}
                style={{ background: "#FDFBF7", borderRadius: 24, padding: "28px 24px", border: "1px solid rgba(6,40,23,0.05)" }}
              >
                <div style={{ width: 44, height: 44, background: "#ffffff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0d1f0d", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Other Calculators ── */}
        <div>
          <div className="anim-calc-card-0" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="#11D462" strokeWidth="2" />
              <path d="M8 12h8M12 8v8" stroke="#11D462" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0d1f0d", margin: 0 }}>Other Powerful Calculators</h3>
          </div>

          <div className="grid-4col">
            {[
              { title: "Goal Calculator",       desc: "Target your dreams precisely.",   cls: "anim-calc-card-0", href: "/goal-calucator" },
              { title: "Retirement Calculator",  desc: "Build your post-work nest egg.",  cls: "anim-calc-card-1", href: "/reteriment" },
              { title: "Sukanya Samriddhi",      desc: "Secure your daughter's future.", cls: "anim-calc-card-2", href: "/sukanya" },
              { title: "CAGR Calculator",        desc: "Find annual compound returns.",  cls: "anim-calc-card-3", href: "/cgarcalucator" },
            ].map((item) => (
              <a
                key={item.title}
                className={item.cls}
                href={item.href}
                style={{ background: "#ffffff", borderRadius: 14, padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" }}
              >
                <div style={{ width: 40, height: 40, background: "#f0faf4", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="#11D462" strokeWidth="2" />
                    <path d="M8 12h8M12 8v8" stroke="#11D462" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#0d1f0d", margin: "0 0 6px" }}>{item.title}</p>
                <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{item.desc}</p>
              </a>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}





