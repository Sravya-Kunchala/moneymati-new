"use client";

import { useState, useRef, useEffect } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

export default function RetirementCalculatorPage() {
  const [monthlyExpenditure, setMonthlyExpenditure] = useState("50000");
  const [yearsToRetirement, setYearsToRetirement] = useState("10");
  const [lifeExpectancy, setLifeExpectancy] = useState("5000");
  const [inflationRate, setInflationRate] = useState("12");
  const [retirementAge, setRetirementAge] = useState("12");
  const [rateOfReturn, setRateOfReturn] = useState("15.1");
  const [pfAccumulated, setPfAccumulated] = useState("12");
  const [monthlyPfContribution, setMonthlyPfContribution] = useState("12");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [graphProgress, setGraphProgress] = useState(0);
  // Confirmation modal removed
  const btnRef = useRef<HTMLButtonElement>(null);
  const animFrameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const _monthlyExpenditure = parseFloat(monthlyExpenditure) || 0;
  const _yearsToRetirement = parseFloat(yearsToRetirement) || 0;
  const _lifeExpectancy = parseFloat(lifeExpectancy) || 0;
  const _inflationRate = parseFloat(inflationRate) || 0;
  const _rateOfReturn = parseFloat(rateOfReturn) || 0;
  const _pfAccumulated = parseFloat(pfAccumulated) || 0;
  const _monthlyPfContribution = parseFloat(monthlyPfContribution) || 0;

  const assumptions = "We have assumed SIP to give 12% ROI.";

  const futureMonthlyExp = _monthlyExpenditure * Math.pow(1 + _inflationRate / 100, _yearsToRetirement);

  const monthlyReturnRate = _rateOfReturn / 100 / 12;
  const retirementMonths = _lifeExpectancy * 12;
  const retirementCorpusFromExp =
    retirementMonths > 0 && monthlyReturnRate > 0
      ? (futureMonthlyExp * (1 - Math.pow(1 + monthlyReturnRate, -retirementMonths))) / monthlyReturnRate
      : futureMonthlyExp * retirementMonths;

  const sipRate = 0.12 / 12;
  const months = _yearsToRetirement * 12;
  const totalPfValue =
    _pfAccumulated * Math.pow(1 + sipRate, months) +
    (_monthlyPfContribution * (Math.pow(1 + sipRate, months) - 1)) / sipRate;

  const totalInvestmentsValue = totalPfValue;

  const netRetirementCorpus = Math.max(0, retirementCorpusFromExp - totalPfValue - totalInvestmentsValue);

  const monthlySIPRequired =
    netRetirementCorpus <= 0
      ? 0
      : Math.round((netRetirementCorpus * sipRate) / (Math.pow(1 + sipRate, months) - 1));

  const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");

  useEffect(() => {
    return () => { if (animFrameRef.current) clearTimeout(animFrameRef.current); };
  }, []);

  const addRipple = (e: React.MouseEvent, btn: HTMLButtonElement) => {
    const rect = btn.getBoundingClientRect();
    const r = document.createElement("span");
    const size = Math.max(rect.width, rect.height) * 2.2;
    r.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,0.22);width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;transform:scale(0);animation:rippleAnim 0.55s ease-out forwards;pointer-events:none;`;
    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
  };

  const runGraphAnimation = (onDone: () => void) => {
    setGraphProgress(0);
    const TOTAL_DURATION = 2800;
    const INTERVAL = 30;
    const steps = TOTAL_DURATION / INTERVAL;
    let step = 0;
    const tick = () => {
      step++;
      const raw = step / steps;
      const eased = 1 - Math.pow(1 - raw, 2.5);
      const pct = Math.min(100, Math.round(eased * 100));
      setGraphProgress(pct);
      if (step < steps) {
        animFrameRef.current = setTimeout(tick, INTERVAL);
      } else {
        setTimeout(onDone, 120);
      }
    };
    animFrameRef.current = setTimeout(tick, INTERVAL);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || done) return;
    const btn = btnRef.current;
    if (!btn) return;
    addRipple(e, btn);
    setLoading(true);
    setSubmitted(false);
    setDone(false);
    runGraphAnimation(() => {
      setLoading(false);
      setDone(true);
      setSubmitted(true);
      setTimeout(() => setDone(false), 2800);
                // confirmation removed
    });
  };

  // Chart data: year-by-year corpus growth vs cumulative PF
  const numYears = Math.max(1, Math.min(Math.round(_yearsToRetirement), 30));
  const chartBars = Array.from({ length: numYears }, (_, i) => {
    const y = i + 1;
    const mr = 0.12 / 12;
    const m = y * 12;
    const pfVal =
      _pfAccumulated * Math.pow(1 + mr, m) +
      (_monthlyPfContribution * (Math.pow(1 + mr, m) - 1)) / mr;
    const futureExp = _monthlyExpenditure * Math.pow(1 + _inflationRate / 100, y);
    const retMonths = _lifeExpectancy * 12;
    const mRet = _rateOfReturn / 100 / 12;
    const corpus =
      retMonths > 0 && mRet > 0
        ? (futureExp * (1 - Math.pow(1 + mRet, -retMonths))) / mRet
        : futureExp * retMonths;
    return { year: y, corpus: isFinite(corpus) ? corpus : 0, pf: isFinite(pfVal) ? pfVal : 0 };
  });

  const maxValRaw = chartBars.length > 0 ? Math.max(...chartBars.map((b) => Math.max(b.corpus, b.pf))) : 1;
  const maxVal = Number.isFinite(maxValRaw) && maxValRaw > 0 ? maxValRaw : 1;
  const gp = Number.isFinite(graphProgress) ? graphProgress : 0;

  const svgW = 320; const svgH = 40;
  const pad = { l: 4, r: 4, t: 4, b: 4 };
  const mkPoints = (vals: number[]) =>
    vals.map((v, i) => {
      const x = pad.l + (i / Math.max(vals.length - 1, 1)) * (svgW - pad.l - pad.r);
      const y = svgH - pad.b - (v / maxVal) * (svgH - pad.t - pad.b);
      return `${x},${y}`;
    }).join(" ");
  const pfPts     = mkPoints(chartBars.map((b) => b.pf));
  const corpusPts = mkPoints(chartBars.map((b) => b.corpus));

  return (
    <div
      className={inter.className}
      style={{ backgroundColor: "#f5f0e8", minHeight: "100vh", fontFamily: "var(--font-inter), sans-serif" }}
    >
      <style>{`
        @keyframes rippleAnim  { to { transform: scale(4); opacity: 0; } }
        @keyframes spin        { to { transform: rotate(360deg); } }
        @keyframes drawCheck   { from { stroke-dashoffset:30; opacity:0; } to { stroke-dashoffset:0; opacity:1; } }
        @keyframes resultIn    { from { opacity:0; transform:translateY(16px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes countUp     { from { opacity:0; transform:translateY(8px) scale(0.9); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes fadeInDown  { from { opacity:0; transform:translateY(-24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInUp    { from { opacity:0; transform:translateY(40px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn      { from { opacity:0; } to { opacity:1; } }
        @keyframes scaleIn     { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        @keyframes cardIn      { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes btnPulse    { 0% { box-shadow:0 0 0 0 rgba(17,212,98,0.55); } 70% { box-shadow:0 0 0 14px rgba(17,212,98,0); } 100% { box-shadow:0 0 0 0 rgba(17,212,98,0); } }
        @keyframes graphIn     { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scanLine    { 0% { left:0%; opacity:0.8; } 100% { left:100%; opacity:0; } }
        @keyframes pulseDot    { 0%,100% { transform:scale(1); opacity:1; } 50% { transform:scale(1.7); opacity:0.4; } }
        @keyframes tickerBlink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }

        .anim-hero         { animation: fadeIn     0.8s ease 0.0s  both; }
        .anim-hero-text    { animation: fadeInDown 0.7s ease 0.15s both; }
        .anim-overlap-card { animation: scaleIn    0.7s ease 0.3s  both; }
        .anim-calculator   { animation: fadeInUp   0.7s ease 0.2s  both; }
        .anim-why-section  { animation: fadeInUp   0.7s ease 0.25s both; }
        .anim-why-card-0   { animation: cardIn     0.6s ease 0.3s  both; }
        .anim-why-card-1   { animation: cardIn     0.6s ease 0.42s both; }
        .anim-why-card-2   { animation: cardIn     0.6s ease 0.54s both; }
        .anim-calc-header  { animation: fadeInUp   0.6s ease 0.25s both; }
        .anim-calc-card-0  { animation: cardIn     0.5s ease 0.3s  both; }
        .anim-calc-card-1  { animation: cardIn     0.5s ease 0.38s both; }
        .anim-calc-card-2  { animation: cardIn     0.5s ease 0.46s both; }
        .anim-calc-card-3  { animation: cardIn     0.5s ease 0.54s both; }

        .ret-field { display:flex; flex-direction:column; gap:8px; }
        .ret-field label { font-size:13px; font-weight:600; color:#333; }
        .ret-input-wrap {
          display:flex; align-items:center; background:#f0ede8;
          border-radius:12px; padding:14px 16px; gap:8px;
          transition:background 0.2s, box-shadow 0.2s;
        }
        .ret-input-wrap:focus-within { background:#e8e4de; box-shadow:0 0 0 2px rgba(13,61,32,0.15); }
        .ret-input-wrap .pfx { font-size:15px; color:#555; font-weight:500; }
        .ret-input-wrap .sfx { font-size:14px; color:#888; font-weight:500; margin-left:auto; white-space:nowrap; }
        .ret-input-wrap input {
          border:none; outline:none; background:transparent;
          font-size:15px; font-weight:500; color:#222; width:100%;
          font-family:var(--font-inter),sans-serif;
        }
        .ret-input-wrap input:disabled { color:#555; }
        .section-divider {
          font-size:15px; font-weight:700; color:#0d1f0d;
          margin: 24px 0 16px; padding-bottom: 8px;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }

        .submit-btn { width:100%; padding:16px; border:none; border-radius:12px; font-size:16px; font-weight:700; cursor:pointer; margin-top:8px; font-family:var(--font-inter),sans-serif; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; gap:10px; transition:background 0.3s, transform 0.1s, box-shadow 0.3s; background:#0d3d20; color:#ffffff; }
        .submit-btn:hover:not(:disabled) { background:#0a2e18; transform:translateY(-1px); box-shadow:0 6px 20px rgba(13,61,32,0.35); }
        .submit-btn:active:not(:disabled) { transform:scale(0.98) translateY(0); }
        .submit-btn.btn-loading { background:#0d3d20; pointer-events:none; }
        .submit-btn.btn-done   { background:#11803a; animation:btnPulse 0.75s ease; }

        .btn-spinner { width:18px; height:18px; border:2.5px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 0.65s linear infinite; flex-shrink:0; }
        .btn-check { width:20px; height:20px; stroke:#fff; stroke-width:2.5; fill:none; stroke-linecap:round; stroke-linejoin:round; flex-shrink:0; }
        .btn-check polyline { stroke-dasharray:30; stroke-dashoffset:0; animation:drawCheck 0.35s ease 0.05s both; }

        .result-card    { animation:resultIn 0.5s cubic-bezier(0.34,1.4,0.64,1) both; }
        .result-value   { animation:countUp  0.4s cubic-bezier(0.34,1.4,0.64,1) both; }
        .result-value-1 { animation-delay:0.05s; }
        .result-value-2 { animation-delay:0.13s; }
        .result-value-3 { animation-delay:0.21s; }

        .calc-link-card {
          display:block; background:#ffffff; border-radius:14px;
          padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.05);
          cursor:pointer; text-decoration:none;
          transition:box-shadow 0.2s, transform 0.2s;
        }
        .calc-link-card:hover {
          box-shadow:0 6px 20px rgba(0,0,0,0.10);
          transform:translateY(-2px);
        }

        .grid-2col { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; }
        .grid-3col { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; text-align:center; }
        .grid-4col { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .why-grid  { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }

        @media (max-width: 767px) {
          .hero-section { padding: 60px 20px 100px !important; min-height: 260px !important; }
          .hero-section h1 { font-size: 32px !important; }
          .hero-section p { font-size: 13px !important; }
          .overlap-card-wrap { padding: 0 16px !important; }
          .overlap-card-wrap > div { margin-top: -70px !important; padding: 28px 20px !important; }
          .overlap-card-wrap h2 { font-size: 20px !important; }
          .section-spacer { height: 32px !important; }
          .main-content { padding: 0 16px 32px !important; }
          .calc-card { padding: 24px 16px !important; }
          .grid-2col { grid-template-columns: 1fr !important; gap: 12px !important; }
          .grid-3col { grid-template-columns: 1fr !important; gap: 12px !important; text-align: left !important; }
          .grid-3col > div { display: flex; justify-content: space-between; align-items: center; background: #fff; border-radius: 10px; padding: 12px 14px; }
          .grid-3col > div .result-label { font-size: 12px !important; margin-bottom: 0 !important; }
          .grid-3col > div .result-value { font-size: 15px !important; }
          .why-section { padding: 28px 16px !important; }
          .why-section h2 { font-size: 20px !important; }
          .why-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .grid-4col { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .other-calc-header { margin-bottom: 14px !important; }
          .other-calc-header h3 { font-size: 15px !important; }
          .ret-input-wrap input { font-size: 14px !important; }
          .ret-input-wrap { padding: 12px 14px !important; }
          .ret-field label { font-size: 12px !important; }
          .submit-btn { font-size: 15px !important; padding: 14px !important; }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-section { padding: 70px 32px 110px !important; }
          .main-content { padding: 0 32px 40px !important; }
          .grid-4col { grid-template-columns: 1fr 1fr !important; gap: 14px !important; }
          .why-grid  { grid-template-columns: 1fr 1fr !important; gap: 16px !important; }
          .overlap-card-wrap { padding: 0 32px !important; }
        }
      `}</style>

      <Header />

      {/* Hero */}
      <div
        className="anim-hero hero-section"
        style={{ position: "relative", minHeight: "320px", padding: "80px 48px 120px", backgroundColor: "#0d2818" }}
      >
        <img
          src="/financial-planning.svg"
          alt=""
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", zIndex: 0 }}
        />
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(4,40,28,0.25)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(14,61,39,0.4) 0%,rgba(26,92,58,0.2) 100%)", zIndex: 1 }} />
        <div className="anim-hero-text" style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ fontSize: 13, color: "#11D462", marginBottom: 12 }}>
            <a href="/" style={{ color: "#11D462", textDecoration: "none" }}>Home</a>
            <span style={{ margin: "0 8px", color: "#ffffff50" }}>›</span>
            <a href="/calucator" style={{ color: "#11D462", textDecoration: "none" }}>Calculator</a>
            <span style={{ margin: "0 8px", color: "#ffffff50" }}>›</span>
            <span style={{ color: "#11D462", fontWeight: 600 }}>Retirement Calculator</span>
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(36px,5vw,54px)", color: "#ffffff", fontWeight: 800, lineHeight: 1.1 }}>
            Retirement <span style={{ color: "#11D462", fontStyle: "italic" }}>Calculator</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.7, maxWidth: 500, marginTop: 16 }}>
            Plan your retirement with confidence. Estimate how much you need to save today to maintain your desired lifestyle after retirement.
          </p>
        </div>
      </div>

      {/* Overlapping card */}
      <div className="overlap-card-wrap" style={{ backgroundColor: "#f5f0e8", padding: "0 24px" }}>
        <div style={{ maxWidth: "680px", margin: "-80px auto 0", position: "relative", zIndex: 10 }}>
          <div
            className="anim-overlap-card"
            style={{ background: "#ffffff", borderRadius: 20, padding: "40px", textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: "#11D462" }}>RETIREMENT PLANNING</span>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0d1f0d", margin: "12px 0 12px" }}>Plan Your Retirement With Confidence</h2>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>
              Retirement planning helps you estimate the savings required to maintain your lifestyle after you stop working. Calculate how much you need to invest regularly to build a secure and stress-free future.
            </p>
          </div>
        </div>
      </div>

      <div className="section-spacer" style={{ height: "48px", backgroundColor: "#f5f0e8" }} />

      {/* Main Content */}
      <div className="main-content" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px 48px", backgroundColor: "#f5f0e8", position: "relative", zIndex: 1 }}>

        {/* Calculator Form */}
        <div className="anim-calculator" style={{ marginBottom: 32 }}>
          <div className="calc-card" style={{ background: "#ffffff", borderRadius: 20, padding: "36px 40px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", maxWidth: 720, margin: "0 auto" }}>

            <div className="ret-field" style={{ marginBottom: 20 }}>
              <label>Monthly expenditure *</label>
              <div className="ret-input-wrap">
                <span className="pfx">₹</span>
                <input type="number" value={monthlyExpenditure} onChange={(e) => { setMonthlyExpenditure(e.target.value); setSubmitted(false); setDone(false); }} placeholder="50,000" />
              </div>
            </div>

            <div className="grid-2col">
              <div className="ret-field">
                <label>Number of years to retirement *</label>
                <div className="ret-input-wrap">
                  <input type="number" value={yearsToRetirement} onChange={(e) => { setYearsToRetirement(e.target.value); setSubmitted(false); setDone(false); }} placeholder="10" />
                  <span className="sfx">Years</span>
                </div>
              </div>
              <div className="ret-field">
                <label>Life Expectancy</label>
                <div className="ret-input-wrap">
                  <span className="pfx">₹</span>
                  <input type="number" value={lifeExpectancy} onChange={(e) => { setLifeExpectancy(e.target.value); setSubmitted(false); setDone(false); }} placeholder="5,000" />
                </div>
              </div>
            </div>

            <div className="ret-field" style={{ marginBottom: 20 }}>
              <label>Inflation Rate (slide to choose between 4 - 5%)</label>
              <div className="ret-input-wrap">
                <input type="number" step={0.1} value={inflationRate} onChange={(e) => { setInflationRate(e.target.value); setSubmitted(false); setDone(false); }} placeholder="12" />
                <span className="sfx">%</span>
              </div>
            </div>

            <div className="grid-2col">
              <div className="ret-field">
                <label>Retirement Age</label>
                <div className="ret-input-wrap">
                  <input type="number" value={retirementAge} onChange={(e) => { setRetirementAge(e.target.value); setSubmitted(false); setDone(false); }} placeholder="60" />
                  <span className="sfx">%</span>
                </div>
              </div>
              <div className="ret-field">
                <label>Rate of Return on Investment post retirement (Between 8 - 9%)</label>
                <div className="ret-input-wrap">
                  <input type="number" step={0.1} value={rateOfReturn} onChange={(e) => { setRateOfReturn(e.target.value); setSubmitted(false); setDone(false); }} placeholder="15.1" />
                  <span className="sfx">%</span>
                </div>
              </div>
            </div>

            <div className="grid-2col">
              <div className="ret-field">
                <label>Assumptions</label>
                <div className="ret-input-wrap">
                  <input type="text" value={assumptions} disabled style={{ fontSize: 13, color: "#555" }} />
                </div>
              </div>
              <div className="ret-field">
                <label>Retirement Corpus from expenditure value</label>
                <div className="ret-input-wrap">
                  <span className="pfx">₹</span>
                  <input type="text" value={submitted ? fmt(retirementCorpusFromExp) : "0.00"} disabled />
                </div>
              </div>
            </div>

            <div className="grid-2col">
              <div className="ret-field">
                <label>Net retirement Corpus required</label>
                <div className="ret-input-wrap">
                  <input type="number" value={12} disabled />
                </div>
              </div>
              <div className="ret-field">
                <label>Monthly investment required - (SIP)</label>
                <div className="ret-input-wrap">
                  <span className="pfx">₹</span>
                  <input type="text" value={submitted ? fmt(monthlySIPRequired) : "0.0"} disabled style={{ color: "#0d3d20", fontWeight: 700 }} />
                </div>
              </div>
            </div>

            <div className="section-divider">Your PF and Current Investments</div>

            <div className="grid-2col">
              <div className="ret-field">
                <label>Present value of your PF accumulated till date *</label>
                <div className="ret-input-wrap">
                  <input type="number" value={pfAccumulated} onChange={(e) => { setPfAccumulated(e.target.value); setSubmitted(false); setDone(false); }} placeholder="12" />
                  <span className="sfx">%</span>
                </div>
              </div>
              <div className="ret-field">
                <label>Monthly PF contribution (by both employer + employee) *</label>
                <div className="ret-input-wrap">
                  <input type="number" value={monthlyPfContribution} onChange={(e) => { setMonthlyPfContribution(e.target.value); setSubmitted(false); setDone(false); }} placeholder="12" />
                  <span className="sfx">%</span>
                </div>
              </div>
            </div>

            <div className="grid-2col" style={{ marginBottom: 24 }}>
              <div className="ret-field">
                <label>Total Value of PF</label>
                <div className="ret-input-wrap">
                  <span className="pfx">₹</span>
                  <input type="text" value={submitted ? fmt(totalPfValue) : "0.00"} disabled />
                </div>
              </div>
              <div className="ret-field">
                <label>Total Value of Investments</label>
                <div className="ret-input-wrap">
                  <span className="pfx">₹</span>
                  <input type="text" value={submitted ? fmt(totalInvestmentsValue) : "0.00"} disabled />
                </div>
              </div>
            </div>

            {/* Animated Submit Button */}
            <button
              ref={btnRef}
              className={`submit-btn${loading ? " btn-loading" : ""}${done ? " btn-done" : ""}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading && <span className="btn-spinner" />}
              {done && (
                <svg className="btn-check" viewBox="0 0 20 20" width="20" height="20">
                  <polyline points="3,10 8,15 17,5" />
                </svg>
              )}
              <span>{loading ? "Calculating…" : done ? "Done!" : "Submit"}</span>
            </button>

            {/* Graph Overlay during loading */}
            {loading && (
              <div style={{
                marginTop: 16, background: "#0b2e17", borderRadius: 12,
                padding: "14px 16px 12px", border: "1px solid rgba(17,212,98,0.12)",
                position: "relative", overflow: "hidden", animation: "graphIn 0.35s ease both"
              }}>
                {/* Scan line */}
                <div style={{
                  position: "absolute", top: 0, bottom: 0, width: 2,
                  background: "linear-gradient(180deg,rgba(17,212,98,0.7) 0%,rgba(17,212,98,0) 100%)",
                  borderRadius: 1, pointerEvents: "none",
                  animation: "scanLine 1.6s cubic-bezier(0.4,0,0.6,1) infinite"
                }} />
                {/* Ticker row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 6, height: 6, background: "#11D462", borderRadius: "50%", animation: "pulseDot 1s ease-in-out infinite" }} />
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Retirement Projection</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#11D462", fontVariantNumeric: "tabular-nums", animation: "tickerBlink 1.2s ease-in-out infinite" }}>
                      ₹{Math.round((retirementCorpusFromExp * graphProgress) / 100).toLocaleString("en-IN")}
                    </span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)" }}>↑ {gp}%</span>
                  </div>
                </div>
                {/* SVG line chart */}
                <div style={{ position: "relative", height: 40, marginBottom: 6 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 33}%`, height: 1, background: "rgba(255,255,255,0.04)" }} />
                  ))}
                  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }} viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="none">
                    <defs>
                      <clipPath id="revealClipRet">
                        <rect x="0" y="0" width={svgW * gp / 100} height={svgH} />
                      </clipPath>
                    </defs>
                    {chartBars.length > 1 && (
                      <polyline points={pfPts} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"
                        strokeDasharray={svgW * 3} strokeDashoffset={svgW * 3 * (1 - gp / 100)}
                        style={{ transition: "stroke-dashoffset 0.06s linear" }} />
                    )}
                    {chartBars.length > 1 && (
                      <polyline points={corpusPts} fill="none" stroke="#11D462" strokeWidth="2"
                        strokeDasharray={svgW * 3} strokeDashoffset={svgW * 3 * (1 - gp / 100)}
                        style={{ transition: "stroke-dashoffset 0.06s linear" }} />
                    )}
                    {chartBars.length > 1 && graphProgress > 0 && (() => {
                      const pts = corpusPts.split(" ");
                      const lastIdx = Math.max(0, Math.floor((graphProgress / 100) * (pts.length - 1)));
                      const coord = pts[Math.min(lastIdx, pts.length - 1)]?.split(",");
                      if (!coord) return null;
                      const cx = parseFloat(coord[0]);
                      const cy = parseFloat(coord[1]);
                      return (
                        <>
                          <circle cx={cx} cy={cy} r="4" fill="#11D462" fillOpacity="0.2" />
                          <circle cx={cx} cy={cy} r="2.5" fill="#11D462" />
                        </>
                      );
                    })()}
                  </svg>
                </div>
                {/* Legend + progress bar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ display: "flex", gap: 10 }}>
                    {([["#11D462", "Corpus"], ["rgba(255,255,255,0.2)", "PF Value"]] as const).map(([color, label]) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 7, height: 7, borderRadius: 2, background: color }} />
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>{label}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${gp}%`, borderRadius: 99, background: "linear-gradient(90deg,#11D462,#34d399)", transition: "width 0.06s linear" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Animated Result */}
            {submitted && (
              <div className="result-card" style={{ marginTop: 24, padding: "20px", background: "#f0faf4", borderRadius: 12, border: "1px solid #c3e6d0" }}>
                <div className="grid-3col">
                  <div>
                    <div className="result-label" style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Retirement Corpus Needed</div>
                    <div className="result-value result-value-1" style={{ fontSize: 16, fontWeight: 800, color: "#0d3d20" }}>₹{fmt(retirementCorpusFromExp)}</div>
                  </div>
                  <div>
                    <div className="result-label" style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Total PF Value</div>
                    <div className="result-value result-value-2" style={{ fontSize: 16, fontWeight: 800, color: "#0d3d20" }}>₹{fmt(totalPfValue)}</div>
                  </div>
                  <div>
                    <div className="result-label" style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Monthly SIP Required</div>
                    <div className="result-value result-value-3" style={{ fontSize: 16, fontWeight: 800, color: "#11D462" }}>₹{fmt(monthlySIPRequired)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Why Plan Your Retirement Early? */}
        <div className="anim-why-section why-section" style={{ marginBottom: 32, background: "#ffffff", borderRadius: 20, padding: "40px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0d1f0d", textAlign: "center", marginBottom: 8 }}>Why Plan Your Retirement Early?</h2>
          <div style={{ width: 40, height: 3, background: "#11D462", borderRadius: 2, margin: "0 auto 32px" }} />
          <div className="why-grid">
            {[
              {
                cls: "anim-why-card-0",
                title: "What is Retirement Planning?",
                desc: "Retirement planning helps you estimate the savings required to maintain your lifestyle after you stop earning and ensures financial independence in later years.",
                icon: (
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path d="M3.75 25V19.625C2.5625 18.5417 1.64062 17.276 0.984375 15.8281C0.328125 14.3802 0 12.8542 0 11.25C0 8.125 1.09375 5.46875 3.28125 3.28125C5.46875 1.09375 8.125 0 11.25 0C13.8542 0 16.1615 0.765625 18.1719 2.29688C20.1823 3.82812 21.4896 5.82292 22.0938 8.28125L23.7188 14.6875C23.8229 15.0833 23.75 15.4427 23.5 15.7656C23.25 16.0885 22.9167 16.25 22.5 16.25H20V20C20 20.6875 19.7552 21.276 19.2656 21.7656C18.776 22.2552 18.1875 22.5 17.5 22.5H15V25H12.5V20H17.5V13.75H20.875L19.6875 8.90625C19.2083 7.01042 18.1875 5.46875 16.625 4.28125C15.0625 3.09375 13.2708 2.5 11.25 2.5C8.83333 2.5 6.77083 3.34375 5.0625 5.03125C3.35417 6.71875 2.5 8.77083 2.5 11.1875C2.5 12.4375 2.75521 13.625 3.26562 14.75C3.77604 15.875 4.5 16.875 5.4375 17.75L6.25 18.5V25H3.75Z" fill="#11D462"/>
                  </svg>
                ),
              },
              {
                cls: "anim-why-card-1",
                title: "Why It Matters?",
                desc: "Without proper planning, rising expenses and longer life expectancy can create financial stress. Early planning ensures stability and peace of mind.",
                icon: (
                  <svg width="20" height="25" viewBox="0 0 20 25" fill="none">
                    <path d="M10 17.5C12.125 15.5833 13.4896 14.2344 14.0938 13.4531C14.6979 12.6719 15 11.8958 15 11.125C15 10.375 14.7292 9.72917 14.1875 9.1875C13.6458 8.64583 13 8.375 12.25 8.375C11.8125 8.375 11.3906 8.46354 10.9844 8.64062C10.5781 8.81771 10.25 9.0625 10 9.375C9.75 9.0625 9.42708 8.81771 9.03125 8.64062C8.63542 8.46354 8.20833 8.375 7.75 8.375C7 8.375 6.35417 8.64583 5.8125 9.1875C5.27083 9.72917 5 10.375 5 11.125C5 11.5208 5.05208 11.8854 5.15625 12.2188C5.26042 12.5521 5.48958 12.9427 5.84375 13.3906C6.19792 13.8385 6.70312 14.3854 7.35938 15.0312C8.01562 15.6771 8.89583 16.5 10 17.5ZM10 25C7.10417 24.2708 4.71354 22.6094 2.82812 20.0156C0.942708 17.4219 0 14.5417 0 11.375V3.75L10 0L20 3.75V11.375C20 14.5417 19.0573 17.4219 17.1719 20.0156C15.2865 22.6094 12.8958 24.2708 10 25Z" fill="#11D462"/>
                  </svg>
                ),
              },
              {
                cls: "anim-why-card-2",
                title: "The Benefits",
                desc: "It allows you to retire comfortably, stay financially independent, and enjoy your post-working years without worrying about money.",
                icon: (
                  <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
                    <path d="M9.375 8.75L8 5.75L5 4.375L8 3L9.375 0L10.75 3L13.75 4.375L10.75 5.75L9.375 8.75ZM17.5 12.5L16.3125 9.9375L13.75 8.75L16.3125 7.5625L17.5 5L18.6875 7.5625L21.25 8.75L18.6875 9.9375L17.5 12.5ZM3.75 15L2.5625 12.4375L0 11.25L2.5625 10.0625L3.75 7.5L4.9375 10.0625L7.5 11.25L4.9375 12.4375L3.75 15ZM4.375 23.125L2.5 21.25L11.875 11.875L16.875 16.875L25.75 6.90625L27.5 8.65625L16.875 20.625L11.875 15.625L4.375 23.125Z" fill="#11D462"/>
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className={item.cls} style={{ background: "#FDFBF7", borderRadius: 24, padding: "28px 24px", border: "1px solid rgba(6,40,23,0.05)" }}>
                <div style={{ width: 44, height: 44, background: "#ffffff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0d1f0d", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Calculators */}
        <div>
          <div className="anim-calc-header other-calc-header" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="#11D462" strokeWidth="2"/>
              <path d="M8 12h8M12 8v8" stroke="#11D462" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0d1f0d", margin: 0 }}>Other Powerful Calculators</h3>
          </div>
          <div className="grid-4col">
            {[
              { title: "Goal Calculator", desc: "Target your dreams precisely.", cls: "anim-calc-card-0", href: "/goal-calucator", icon: (<svg width="21" height="21" viewBox="0 0 21 21" fill="none"><path d="M9.7 16C8.1 15.9167 6.75 15.3 5.65 14.15C4.55 13 4 11.6167 4 10C4 8.33333 4.58333 6.91667 5.75 5.75C6.91667 4.58333 8.33333 4 10 4C11.6167 4 13 4.55 14.15 5.65C15.3 6.75 15.9167 8.1 16 9.7L13.9 9.075C13.6833 8.175 13.2167 7.4375 12.5 6.8625C11.7833 6.2875 10.95 6 10 6C8.9 6 7.95833 6.39167 7.175 7.175C6.39167 7.95833 6 8.9 6 10C6 10.95 6.2875 11.7833 6.8625 12.5C7.4375 13.2167 8.175 13.6833 9.075 13.9L9.7 16ZM18.525 20.5L14.25 16.225L13 20L10 10L20 13L16.225 14.25L20.5 18.525L18.525 20.5Z" fill="#11D462"/></svg>) },
              { title: "SIP Calculator", desc: "Exact monthly contribution needed.", cls: "anim-calc-card-1", href: "/sipcalucator", icon: (<svg width="21" height="21" viewBox="0 0 21 21" fill="none"><path d="M9.7 16C8.1 15.9167 6.75 15.3 5.65 14.15C4.55 13 4 11.6167 4 10C4 8.33333 4.58333 6.91667 5.75 5.75C6.91667 4.58333 8.33333 4 10 4C11.6167 4 13 4.55 14.15 5.65C15.3 6.75 15.9167 8.1 16 9.7L13.9 9.075C13.6833 8.175 13.2167 7.4375 12.5 6.8625C11.7833 6.2875 10.95 6 10 6C8.9 6 7.95833 6.39167 7.175 7.175C6.39167 7.95833 6 8.9 6 10C6 10.95 6.2875 11.7833 6.8625 12.5C7.4375 13.2167 8.175 13.6833 9.075 13.9L9.7 16ZM18.525 20.5L14.25 16.225L13 20L10 10L20 13L16.225 14.25L20.5 18.525L18.525 20.5Z" fill="#11D462"/></svg>) },
              { title: "Sukanya Samriddhi", desc: "Secure your daughter's future.", cls: "anim-calc-card-2", href: "/sukanya", icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11.5 8.75C11.15 8.75 10.8542 8.62917 10.6125 8.3875C10.3708 8.14583 10.25 7.85 10.25 7.5C10.25 7.15 10.3708 6.85417 10.6125 6.6125C10.8542 6.37083 11.15 6.25 11.5 6.25C11.85 6.25 12.1458 6.37083 12.3875 6.6125C12.6292 6.85417 12.75 7.15 12.75 7.5C12.75 7.85 12.6292 8.14583 12.3875 8.3875C12.1458 8.62917 11.85 8.75 11.5 8.75ZM9 18C7.75 18 6.57917 17.7625 5.4875 17.2875C4.39583 16.8125 3.44583 16.1708 2.6375 15.3625C1.82917 14.5542 1.1875 13.6042 0.7125 12.5125C0.2375 11.4208 0 10.25 0 9C0 7.75 0.2375 6.57917 0.7125 5.4875C1.1875 4.39583 1.82917 3.44583 2.6375 2.6375C3.44583 1.82917 4.39583 1.1875 5.4875 0.7125C6.57917 0.2375 7.75 0 9 0C10.25 0 11.4208 0.2375 12.5125 0.7125C13.6042 1.1875 14.5542 1.82917 15.3625 2.6375C16.1708 3.44583 16.8125 4.39583 17.2875 5.4875C17.7625 6.57917 18 7.75 18 9C18 10.25 17.7625 11.4208 17.2875 12.5125C16.8125 13.6042 16.1708 14.5542 15.3625 15.3625C14.5542 16.1708 13.6042 16.8125 12.5125 17.2875C11.4208 17.7625 10.25 18 9 18Z" fill="#11D462"/></svg>) },
              { title: "CAGR Calculator", desc: "Find annual compound returns.", cls: "anim-calc-card-3", href: "/cgarcalucator", icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 7C2.53333 7 1.70833 6.65833 1.025 5.975C0.341667 5.29167 0 4.46667 0 3.5C0 2.53333 0.341667 1.70833 1.025 1.025C1.70833 0.341667 2.53333 0 3.5 0C4.46667 0 5.29167 0.341667 5.975 1.025C6.65833 1.70833 7 2.53333 7 3.5C7 4.46667 6.65833 5.29167 5.975 5.975C5.29167 6.65833 4.46667 7 3.5 7ZM12.5 16C11.5333 16 10.7083 15.6583 10.025 14.975C9.34167 14.2917 9 13.4667 9 12.5C9 11.5333 9.34167 10.7083 10.025 10.025C10.7083 9.34167 11.5333 9 12.5 9C13.4667 9 14.2917 9.34167 14.975 10.025C15.6583 10.7083 16 11.5333 16 12.5C16 13.4667 15.6583 14.2917 14.975 14.975C14.2917 15.6583 13.4667 16 12.5 16ZM1.4 16L0 14.6L14.6 0L16 1.4L1.4 16Z" fill="#11D462"/></svg>) },
            ].map((item) => (
              <a key={item.title} href={item.href} className={`calc-link-card ${item.cls}`}>
                <div style={{ width: 40, height: 40, background: "#f0faf4", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>{item.icon}</div>
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
