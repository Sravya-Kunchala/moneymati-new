"use client";

import { useState, useRef, useEffect } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

function formatINR(val: number): string {
  if (!isFinite(val) || isNaN(val)) return "₹0";
  if (val >= 1e7) return `₹${(val / 1e7).toFixed(2)} Cr`;
  if (val >= 1e5) return `₹${(val / 1e5).toFixed(2)} L`;
  return `₹${Math.round(val).toLocaleString("en-IN")}`;
}

function SSYSlider({
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
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: "#888" }}>
          {label}
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#0d3d20" }}>{displayValue}</span>
      </div>
      <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: 4, borderRadius: 99, background: "#e8e4dc" }} />
        <div style={{ position: "absolute", left: 0, width: `${pct}%`, height: 4, borderRadius: 99, background: "linear-gradient(90deg, #0d3d20, #11D462)" }} />
        <div style={{ position: "absolute", left: `calc(${pct}% - 8px)`, width: 16, height: 16, borderRadius: "50%", background: "#11D462", border: "2.5px solid #fff", boxShadow: "0 2px 8px rgba(17,212,98,0.45)", zIndex: 2, pointerEvents: "none" }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{ position: "absolute", inset: "-6px 0", width: "100%", height: "32px", opacity: 0, cursor: "pointer", zIndex: 5, touchAction: "manipulation" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 11, color: "#aaa" }}>{minLabel}</span>
        <span style={{ fontSize: 11, color: "#aaa" }}>{maxLabel}</span>
      </div>
    </div>
  );
}

type Frequency = "Yearly" | "Monthly" | "Quarterly";

export default function SukanyaSamriddhiCalculatorPage() {
  const [amountInvested, setAmountInvested] = useState(50000);
  const [tenure, setTenure] = useState(15);
  const [interestRate, setInterestRate] = useState(8.2);
  const [frequency, setFrequency] = useState<Frequency>("Yearly");

  // Animated counter for maturity value
  const [displayMaturity, setDisplayMaturity] = useState(0);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const r = interestRate / 100;

  let corpusAt15 = 0;
  if (frequency === "Yearly") {
    corpusAt15 = tenure > 0 ? amountInvested * (((Math.pow(1 + r, tenure) - 1) / r) * (1 + r)) : 0;
  } else if (frequency === "Monthly") {
    const mr = r / 12;
    const m = tenure * 12;
    const ma = amountInvested / 12;
    corpusAt15 = ma * (((Math.pow(1 + mr, m) - 1) / mr) * (1 + mr));
  } else {
    const qr = r / 4;
    const q = tenure * 4;
    const qa = amountInvested / 4;
    corpusAt15 = qa * (((Math.pow(1 + qr, q) - 1) / qr) * (1 + qr));
  }

  // SSY: corpus compounds for remaining years until year 21 with no deposits
  const tailYears = Math.max(0, 21 - tenure);
  const maturityValue = corpusAt15 * Math.pow(1 + r, tailYears);

  const totalInvested = amountInvested * tenure;
  const totalReturns = maturityValue - totalInvested;
  const wealthRatio = totalInvested > 0 ? (maturityValue / totalInvested).toFixed(2) + "x" : "—";

  useEffect(() => {
    if (animRef.current) clearTimeout(animRef.current);
    const start = displayMaturity;
    const diff = maturityValue - start;
    const steps = 20;
    let i = 0;
    const tick = () => {
      i++;
      setDisplayMaturity(Math.round(start + diff * (1 - Math.pow(1 - i / steps, 3))));
      if (i < steps) animRef.current = setTimeout(tick, 16);
    };
    animRef.current = setTimeout(tick, 16);
    return () => { if (animRef.current) clearTimeout(animRef.current); };
  }, [maturityValue]);

  const freqButtons: { key: Frequency; label: string }[] = [
    { key: "Yearly", label: "Yearly" },
    { key: "Monthly", label: "Monthly" },
    { key: "Quarterly", label: "Quarterly" },
  ];

  const calcCards = [
    {
      title: "Goal Calculator",
      desc: "Target your dreams precisely.",
      href: "/goal-calucator",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#11D462" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="#11D462" strokeWidth="2" />
          <line x1="12" y1="3" x2="12" y2="7" stroke="#11D462" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: "SIP Calculator",
      desc: "Exact monthly contribution needed.",
      href: "/sipcalucator",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M3 17l6-6 4 4 8-8" stroke="#11D462" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Retirement Calculator",
      desc: "Build your post-work nest egg.",
      href: "/reteriment",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#11D462" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "CAGR Calculator",
      desc: "Find annual compound returns.",
      href: "/cgarcalucator",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3.5 7C2.53333 7 1.70833 6.65833 1.025 5.975C0.341667 5.29167 0 4.46667 0 3.5C0 2.53333 0.341667 1.70833 1.025 1.025C1.70833 0.341667 2.53333 0 3.5 0C4.46667 0 5.29167 0.341667 5.975 1.025C6.65833 1.70833 7 2.53333 7 3.5C7 4.46667 6.65833 5.29167 5.975 5.975C5.29167 6.65833 4.46667 7 3.5 7ZM12.5 16C11.5333 16 10.7083 15.6583 10.025 14.975C9.34167 14.2917 9 13.4667 9 12.5C9 11.5333 9.34167 10.7083 10.025 10.025C10.7083 9.34167 11.5333 9 12.5 9C13.4667 9 14.2917 9.34167 14.975 10.025C15.6583 10.7083 16 11.5333 16 12.5C16 13.4667 15.6583 14.2917 14.975 14.975C14.2917 15.6583 13.4667 16 12.5 16ZM1.4 16L0 14.6L14.6 0L16 1.4L1.4 16Z" fill="#11D462" />
        </svg>
      ),
    },
  ];

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
        .anim-why-card-0  { animation: cardIn     0.6s ease 0.30s both; }
        .anim-why-card-1  { animation: cardIn     0.6s ease 0.42s both; }
        .anim-why-card-2  { animation: cardIn     0.6s ease 0.54s both; }
        .anim-calc-card-0 { animation: cardIn     0.5s ease 0.30s both; }
        .anim-calc-card-1 { animation: cardIn     0.5s ease 0.38s both; }
        .anim-calc-card-2 { animation: cardIn     0.5s ease 0.46s both; }
        .anim-calc-card-3 { animation: cardIn     0.5s ease 0.54s both; }

        .why-grid  { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .grid-4col { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }

        input[type=range] { -webkit-appearance:none; appearance:none; background:transparent; width:100%; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:26px; height:26px; background:transparent; cursor:grab; }
        input[type=range]::-moz-range-thumb { width:26px; height:26px; background:transparent; border:none; cursor:grab; }
        input[type=range]::-webkit-slider-runnable-track, input[type=range]::-moz-range-track { background:transparent; height:6px; }

        .ssy-calc-card-link { text-decoration:none; display:block; }
        .ssy-calc-card { transition:transform 0.2s, box-shadow 0.2s; }
        .ssy-calc-card-link:hover .ssy-calc-card { transform:translateY(-2px); box-shadow:0 4px 20px rgba(0,0,0,0.10) !important; }

        .dark-card-curve {
          position:absolute; top:-30px; right:-30px;
          width:200px; height:200px; border-radius:50%;
          border:1px solid rgba(17,212,98,0.08); pointer-events:none;
        }
        .dark-card-curve-2 {
          position:absolute; bottom:-60px; left:-40px;
          width:260px; height:260px; border-radius:50%;
          border:1px solid rgba(17,212,98,0.05); pointer-events:none;
        }

        .slider-section-label {
          font-size:10px; font-weight:700; letter-spacing:1px;
          text-transform:uppercase; color:#0d3d20;
          margin:0 0 20px; padding-bottom:10px;
          border-bottom:1px solid rgba(13,61,32,0.08);
        }

        .freq-btn {
          flex: 1;
          padding: 10px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s ease;
          font-family: var(--font-inter), sans-serif;
          border: 1.5px solid #e8e4dc;
          background: #f5f2ee;
          color: #888;
        }
        .freq-btn.active {
          border-color: #11D462;
          background: #f0faf4;
          color: #0d3d20;
          font-weight: 700;
        }
        .freq-btn:hover:not(.active) {
          border-color: #ccc;
          background: #eeebe6;
          color: #555;
        }

        @media (max-width:767px) {
          .hero-section        { padding:60px 20px 100px !important; min-height:260px !important; }
          .hero-section h1     { font-size:32px !important; }
          .hero-overlap-outer  { position:static !important; bottom:auto !important; left:auto !important; transform:none !important; padding:0 16px !important; margin-top:-70px !important; }
          .hero-overlap-card   { padding:24px 18px !important; }
          .hero-overlap-card h2 { font-size:19px !important; }
          .hero-spacer         { height:32px !important; }
          .main-content        { padding:0 16px 32px !important; }
          .ssy-split           { flex-direction:column !important; }
          .ssy-split > *       { width:100% !important; }
          .why-grid            { grid-template-columns:1fr !important; gap:12px !important; }
          .grid-4col           { grid-template-columns:1fr 1fr !important; gap:12px !important; }
          .why-section         { padding:24px 16px !important; }
          .slider-row          { flex-direction:column !important; gap:0 !important; }
          .slider-row > *      { width:100% !important; }
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
              <span style={{ color: "#11D462", fontWeight: 600 }}>Sukanya Samriddhi Calculator</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(30px,4.5vw,54px)", color: "#ffffff", fontWeight: 800, lineHeight: 1.1 }}>
              Sukanya Samriddhi <span style={{ color: "#11D462", fontStyle: "italic" }}>Calculator</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.7, maxWidth: 500, marginTop: 16 }}>
              Plan your child's future with confidence. Estimate how much you need to invest under the Sukanya Samriddhi Yojana to secure long-term financial goals.
            </p>
          </div>
        </div>

        {/* Overlapping white card */}
        <div
          className="hero-overlap-outer"
          style={{ position: "absolute", bottom: "-140px", left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 680, zIndex: 10, padding: "0 24px", boxSizing: "border-box" }}
        >
          <div
            className="anim-overlap hero-overlap-card"
            style={{ background: "#ffffff", borderRadius: 20, padding: "40px", textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: "#11D462" }}>
              CHILD FUTURE PLANNING
            </span>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0d1f0d", margin: "12px 0 12px" }}>
              Plan Your Child's Future With Confidence
            </h2>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>
              Sukanya Samriddhi Yojana is a government-backed savings scheme designed to support your daughter's future. Calculate how your investments can grow over time and help you achieve long-term financial security.
            </p>
          </div>
        </div>
      </div>

      <div className="hero-spacer" style={{ height: 180, backgroundColor: "#f5f0e8" }} />

      {/* ── Main Content ── */}
      <div
        className="main-content"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px 48px", backgroundColor: "#f5f0e8", position: "relative", zIndex: 1 }}
      >

        {/* ── CALCULATOR ── */}
        <div className="anim-calc" style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0d3d20", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="#11D462" strokeWidth="2" />
                <path d="M8 12h8M12 8v8" stroke="#11D462" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#0d1f0d" }}>SSY Investment Planning</h2>
          </div>

          <div className="ssy-split" style={{ display: "flex", gap: 20, alignItems: "stretch" }}>

            {/* LEFT — sliders */}
            <div style={{ flex: "1 1 50%", background: "#ffffff", borderRadius: 20, padding: "32px 36px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>

              <p className="slider-section-label">Investment Details</p>

              <SSYSlider
                label="Yearly Amount Invested"
                value={amountInvested}
                min={1000}
                max={150000}
                step={1000}
                onChange={setAmountInvested}
                displayValue={formatINR(amountInvested)}
                minLabel="₹1K"
                maxLabel="₹1.5L"
              />

              <div className="slider-row" style={{ display: "flex", gap: 24 }}>
                <div style={{ flex: 1 }}>
                  <SSYSlider
                    label="Tenure"
                    value={tenure}
                    min={1}
                    max={15}
                    step={1}
                    onChange={setTenure}
                    displayValue={`${tenure} Yrs`}
                    minLabel="1yr"
                    maxLabel="15yr"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <SSYSlider
                    label="Interest Rate"
                    value={interestRate}
                    min={4}
                    max={12}
                    step={0.1}
                    onChange={setInterestRate}
                    displayValue={`${interestRate.toFixed(1)}%`}
                    minLabel="4%"
                    maxLabel="12%"
                  />
                </div>
              </div>

              <p className="slider-section-label" style={{ marginTop: 4 }}>Investing Frequency</p>

              <div style={{ display: "flex", gap: 10 }}>
                {freqButtons.map(({ key, label }) => (
                  <button
                    key={key}
                    className={`freq-btn${frequency === key ? " active" : ""}`}
                    onClick={() => setFrequency(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — dark results */}
            <div
              style={{ flex: "1 1 50%", background: "#0d2818", borderRadius: 20, padding: "32px 36px", boxShadow: "0 8px 40px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}
            >
              <div className="dark-card-curve" />
              <div className="dark-card-curve-2" />

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Badge */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(17,212,98,0.12)", border: "1px solid rgba(17,212,98,0.2)", borderRadius: 99, padding: "4px 12px", marginBottom: 28 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#11D462" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: "#11D462" }}>
                    Calculation Result
                  </span>
                </div>

                {/* Maturity Value — Hero metric */}
                <div style={{ marginBottom: 32 }}>
                  <p style={{ margin: "0 0 8px", fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                    Maturity Value
                  </p>
                  <div style={{ background: "#11D462", borderRadius: 14, padding: "18px 24px", display: "inline-block", minWidth: "100%" }}>
                    <span style={{ fontSize: 36, fontWeight: 900, color: "#0a2015", letterSpacing: "-0.5px" }}>
                      {formatINR(displayMaturity)}
                    </span>
                  </div>
                </div>

                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 28 }} />

                {/* Total Invested + Returns Earned */}
                <div style={{ display: "flex", gap: 24 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 8px", fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>Total Invested</p>
                    <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.4px" }}>
                      {formatINR(totalInvested)}
                    </p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 8px", fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>Returns Earned</p>
                    <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.4px" }}>
                      {formatINR(totalReturns)}
                    </p>
                  </div>
                </div>

                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "28px 0" }} />

                {/* Wealth Gain Ratio */}
                <div>
                  <p style={{ margin: "0 0 6px", fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
                    Wealth Gain Ratio
                  </p>
                  <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.3px" }}>
                    {wealthRatio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Why Sukanya Samriddhi? ── */}
        <div
          className="anim-why-card-0 why-section"
          style={{ marginBottom: 32, background: "#ffffff", borderRadius: 20, padding: "40px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0d1f0d", textAlign: "center", marginBottom: 8 }}>
            Why Sukanya Samriddhi?
          </h2>
          <div style={{ width: 40, height: 3, background: "#11D462", borderRadius: 2, margin: "0 auto 32px" }} />
          <div className="why-grid">
            {[
              {
                cls: "anim-why-card-0",
                title: "What is Sukanya Samriddhi Yojana?",
                desc: "Sukanya Samriddhi Yojana is a government-backed savings scheme designed to secure a girl child's future through disciplined long-term investments.",
                icon: (
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path d="M3.75 25V19.625C2.5625 18.5417 1.64062 17.276 0.984375 15.8281C0.328125 14.3802 0 12.8542 0 11.25C0 8.125 1.09375 5.46875 3.28125 3.28125C5.46875 1.09375 8.125 0 11.25 0C13.8542 0 16.1615 0.765625 18.1719 2.29688C20.1823 3.82812 21.4896 5.82292 22.0938 8.28125L23.7188 14.6875C23.8229 15.0833 23.75 15.4427 23.5 15.7656C23.25 16.0885 22.9167 16.25 22.5 16.25H20V20C20 20.6875 19.7552 21.276 19.2656 21.7656C18.776 22.2552 18.1875 22.5 17.5 22.5H15V25H12.5V20H17.5V13.75H20.875L19.6875 8.90625C19.2083 7.01042 18.1875 5.46875 16.625 4.28125C15.0625 3.09375 13.2708 2.5 11.25 2.5C8.83333 2.5 6.77083 3.34375 5.0625 5.03125C3.35417 6.71875 2.5 8.77083 2.5 11.1875C2.5 12.4375 2.75521 13.625 3.26562 14.75C3.77604 15.875 4.5 16.875 5.4375 17.75L6.25 18.5V25H3.75Z" fill="#11D462" />
                  </svg>
                ),
              },
              {
                cls: "anim-why-card-1",
                title: "Why It Matters?",
                desc: "It offers high interest rates and tax benefits, helping parents build a strong financial foundation for their child's education and future expenses.",
                icon: (
                  <svg width="20" height="25" viewBox="0 0 20 25" fill="none">
                    <path d="M10 17.5C12.125 15.5833 13.4896 14.2344 14.0938 13.4531C14.6979 12.6719 15 11.8958 15 11.125C15 10.375 14.7292 9.72917 14.1875 9.1875C13.6458 8.64583 13 8.375 12.25 8.375C11.8125 8.375 11.3906 8.46354 10.9844 8.64062C10.5781 8.81771 10.25 9.0625 10 9.375C9.75 9.0625 9.42708 8.81771 9.03125 8.64062C8.63542 8.46354 8.20833 8.375 7.75 8.375C7 8.375 6.35417 8.64583 5.8125 9.1875C5.27083 9.72917 5 10.375 5 11.125C5 11.5208 5.05208 11.8854 5.15625 12.2188C5.26042 12.5521 5.48958 12.9427 5.84375 13.3906C6.19792 13.8385 6.70312 14.3854 7.35938 15.0312C8.01562 15.6771 8.89583 16.5 10 17.5ZM10 25C7.10417 24.2708 4.71354 22.6094 2.82812 20.0156C0.942708 17.4219 0 14.5417 0 11.375V3.75L10 0L20 3.75V11.375C20 14.5417 19.0573 17.4219 17.1719 20.0156C15.2865 22.6094 12.8958 24.2708 10 25ZM10 22.375C12.1667 21.6875 13.9583 20.3125 15.375 18.25C16.7917 16.1875 17.5 13.8958 17.5 11.375V5.46875L10 2.65625L2.5 5.46875V11.375C2.5 13.8958 3.20833 16.1875 4.625 18.25C6.04167 20.3125 7.83333 21.6875 10 22.375Z" fill="#11D462" />
                  </svg>
                ),
              },
              {
                cls: "anim-why-card-2",
                title: "The Benefits",
                desc: "With guaranteed returns and long-term compounding, this scheme ensures financial security and peace of mind for your child's future.",
                icon: (
                  <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
                    <path d="M9.375 8.75L8 5.75L5 4.375L8 3L9.375 0L10.75 3L13.75 4.375L10.75 5.75L9.375 8.75ZM17.5 12.5L16.3125 9.9375L13.75 8.75L16.3125 7.5625L17.5 5L18.6875 7.5625L21.25 8.75L18.6875 9.9375L17.5 12.5ZM3.75 15L2.5625 12.4375L0 11.25L2.5625 10.0625L3.75 7.5L4.9375 10.0625L7.5 11.25L4.9375 12.4375L3.75 15ZM4.375 23.125L2.5 21.25L11.875 11.875L16.875 16.875L25.75 6.90625L27.5 8.65625L16.875 20.625L11.875 15.625L4.375 23.125Z" fill="#11D462" />
                  </svg>
                ),
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
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="#11D462" strokeWidth="2" />
              <path d="M8 12h8M12 8v8" stroke="#11D462" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0d1f0d", margin: 0 }}>Other Powerful Calculators</h3>
          </div>

          <div className="grid-4col">
            {calcCards.map((item, i) => (
              <a key={item.title} href={item.href} className="ssy-calc-card-link">
                <div className={`anim-calc-card-${i} ssy-calc-card`} style={{ background: "#ffffff", borderRadius: 14, padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <div style={{ width: 40, height: 40, background: "#f0faf4", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                    {item.icon}
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#0d1f0d", margin: "0 0 6px" }}>{item.title}</p>
                  <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}