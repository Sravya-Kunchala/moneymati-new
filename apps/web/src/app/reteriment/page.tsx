"use client";

import { useState } from "react";
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

  const fmt = (n) => Math.round(n).toLocaleString("en-IN");

  return (
    <div
      className={inter.className}
      style={{ backgroundColor: "#f5f0e8", minHeight: "100vh", fontFamily: "var(--font-inter), sans-serif" }}
    >
      <style>{`
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInUp   { from { opacity:0; transform:translateY(40px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn     { from { opacity:0; } to { opacity:1; } }
        @keyframes scaleIn    { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        @keyframes cardIn     { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

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
        }
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
        .submit-btn {
          width:100%; padding:16px; background:#0d3d20; color:#fff;
          border:none; border-radius:12px; font-size:16px; font-weight:700;
          cursor:pointer; margin-top:8px; font-family:var(--font-inter),sans-serif;
          transition:background 0.2s;
        }
        .submit-btn:hover { background:#0a2e18; }

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

        /* ── Desktop grid helpers ── */
        .grid-2col { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; }
        .grid-3col { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; text-align:center; }
        .grid-4col { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .why-grid  { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }

        /* ── Mobile overrides (≤ 767px) ── */
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

        /* ── Tablet (768–1023px) ── */
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
                <input type="number" value={monthlyExpenditure} onChange={(e) => { setMonthlyExpenditure(e.target.value); setSubmitted(false); }} placeholder="50,000" />
              </div>
            </div>

            <div className="grid-2col">
              <div className="ret-field">
                <label>Number of years to retirement *</label>
                <div className="ret-input-wrap">
                  <input type="number" value={yearsToRetirement} onChange={(e) => { setYearsToRetirement(e.target.value); setSubmitted(false); }} placeholder="10" />
                  <span className="sfx">Years</span>
                </div>
              </div>
              <div className="ret-field">
                <label>Life Expectancy</label>
                <div className="ret-input-wrap">
                  <span className="pfx">₹</span>
                  <input type="number" value={lifeExpectancy} onChange={(e) => { setLifeExpectancy(e.target.value); setSubmitted(false); }} placeholder="5,000" />
                </div>
              </div>
            </div>

            <div className="ret-field" style={{ marginBottom: 20 }}>
              <label>Inflation Rate (slide to choose between 4 - 5%)</label>
              <div className="ret-input-wrap">
                <input type="number" step={0.1} value={inflationRate} onChange={(e) => { setInflationRate(e.target.value); setSubmitted(false); }} placeholder="12" />
                <span className="sfx">%</span>
              </div>
            </div>

            <div className="grid-2col">
              <div className="ret-field">
                <label>Retirement Age</label>
                <div className="ret-input-wrap">
                  <input type="number" value={retirementAge} onChange={(e) => { setRetirementAge(e.target.value); setSubmitted(false); }} placeholder="60" />
                  <span className="sfx">%</span>
                </div>
              </div>
              <div className="ret-field">
                <label>Rate of Return on Investment post retirement (Between 8 - 9%)</label>
                <div className="ret-input-wrap">
                  <input type="number" step={0.1} value={rateOfReturn} onChange={(e) => { setRateOfReturn(e.target.value); setSubmitted(false); }} placeholder="15.1" />
                  <span className="sfx">%</span>
                </div>
              </div>
            </div>

            <div className="grid-2col">
              <div className="ret-field">
                <label>Assumptions</label>
                <div className="ret-input-wrap">
                  <input type="text" value={assumptions} disabled style={{ fontSize: 13, color: "#555" }} />
                  <span className="sfx">%</span>
                </div>
              </div>
              <div className="ret-field">
                <label>Retirement Corpus from expenditure value</label>
                <div className="ret-input-wrap">
                  <span className="pfx">₹</span>
                  <input type="text" value={submitted ? fmt(retirementCorpusFromExp) : "0.00"} disabled />
                  <span className="sfx">%</span>
                </div>
              </div>
            </div>

            <div className="grid-2col">
              <div className="ret-field">
                <label>Net retirement Corpus required</label>
                <div className="ret-input-wrap">
                  <input type="number" value={12} disabled />
                  <span className="sfx">%</span>
                </div>
              </div>
              <div className="ret-field">
                <label>Monthly investment required - ( SIP)</label>
                <div className="ret-input-wrap">
                  <span className="pfx">₹</span>
                  <input type="text" value={submitted ? fmt(monthlySIPRequired) : "0.0"} disabled />
                  <span className="sfx">%</span>
                </div>
              </div>
            </div>

            <div className="section-divider">Your PF and Current Investments</div>

            <div className="grid-2col">
              <div className="ret-field">
                <label>Present value of your PF accumulated till date *</label>
                <div className="ret-input-wrap">
                  <input type="number" value={pfAccumulated} onChange={(e) => { setPfAccumulated(e.target.value); setSubmitted(false); }} placeholder="12" />
                  <span className="sfx">%</span>
                </div>
              </div>
              <div className="ret-field">
                <label>Monthly PF contribution (by both employer + employee) *</label>
                <div className="ret-input-wrap">
                  <input type="number" value={monthlyPfContribution} onChange={(e) => { setMonthlyPfContribution(e.target.value); setSubmitted(false); }} placeholder="12" />
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
                  <span className="sfx">%</span>
                </div>
              </div>
              <div className="ret-field">
                <label>Total Value of Investments</label>
                <div className="ret-input-wrap">
                  <span className="pfx">₹</span>
                  <input type="text" value={submitted ? fmt(totalInvestmentsValue) : "0.00"} disabled />
                  <span className="sfx">%</span>
                </div>
              </div>
            </div>

            <button className="submit-btn" onClick={() => setSubmitted(true)}>Submit</button>

            {submitted && (
              <div style={{ marginTop: 24, padding: "20px", background: "#f0faf4", borderRadius: 12, border: "1px solid #c3e6d0" }}>
                <div className="grid-3col">
                  <div>
                    <div className="result-label" style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Retirement Corpus Needed</div>
                    <div className="result-value" style={{ fontSize: 16, fontWeight: 800, color: "#0d3d20" }}>₹{fmt(retirementCorpusFromExp)}</div>
                  </div>
                  <div>
                    <div className="result-label" style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Total PF Value</div>
                    <div className="result-value" style={{ fontSize: 16, fontWeight: 800, color: "#0d3d20" }}>₹{fmt(totalPfValue)}</div>
                  </div>
                  <div>
                    <div className="result-label" style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Monthly SIP Required</div>
                    <div className="result-value" style={{ fontSize: 16, fontWeight: 800, color: "#11D462" }}>₹{fmt(monthlySIPRequired)}</div>
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
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.75 25V19.625C2.5625 18.5417 1.64062 17.276 0.984375 15.8281C0.328125 14.3802 0 12.8542 0 11.25C0 8.125 1.09375 5.46875 3.28125 3.28125C5.46875 1.09375 8.125 0 11.25 0C13.8542 0 16.1615 0.765625 18.1719 2.29688C20.1823 3.82812 21.4896 5.82292 22.0938 8.28125L23.7188 14.6875C23.8229 15.0833 23.75 15.4427 23.5 15.7656C23.25 16.0885 22.9167 16.25 22.5 16.25H20V20C20 20.6875 19.7552 21.276 19.2656 21.7656C18.776 22.2552 18.1875 22.5 17.5 22.5H15V25H12.5V20H17.5V13.75H20.875L19.6875 8.90625C19.2083 7.01042 18.1875 5.46875 16.625 4.28125C15.0625 3.09375 13.2708 2.5 11.25 2.5C8.83333 2.5 6.77083 3.34375 5.0625 5.03125C3.35417 6.71875 2.5 8.77083 2.5 11.1875C2.5 12.4375 2.75521 13.625 3.26562 14.75C3.77604 15.875 4.5 16.875 5.4375 17.75L6.25 18.5V25H3.75ZM10 16.25H12.5L12.6875 14.6875C12.8542 14.625 13.0052 14.5521 13.1406 14.4688C13.276 14.3854 13.3958 14.2917 13.5 14.1875L14.9375 14.8125L16.1875 12.6875L14.9375 11.75C14.9792 11.5833 15 11.4167 15 11.25C15 11.0833 14.9792 10.9167 14.9375 10.75L16.1875 9.8125L14.9375 7.6875L13.5 8.3125C13.3958 8.20833 13.276 8.11458 13.1406 8.03125C13.0052 7.94792 12.8542 7.875 12.6875 7.8125L12.5 6.25H10L9.8125 7.8125C9.64583 7.875 9.49479 7.94792 9.35938 8.03125C9.22396 8.11458 9.10417 8.20833 9 8.3125L7.5625 7.6875L6.3125 9.8125L7.5625 10.75C7.52083 10.9167 7.5 11.0833 7.5 11.25C7.5 11.4167 7.52083 11.5833 7.5625 11.75L6.3125 12.6875L7.5625 14.8125L9 14.1875C9.10417 14.2917 9.22396 14.3854 9.35938 14.4688C9.49479 14.5521 9.64583 14.625 9.8125 14.6875L10 16.25ZM11.25 13.125C10.7292 13.125 10.2865 12.9427 9.92188 12.5781C9.55729 12.2135 9.375 11.7708 9.375 11.25C9.375 10.7292 9.55729 10.2865 9.92188 9.92188C10.2865 9.55729 10.7292 9.375 11.25 9.375C11.7708 9.375 12.2135 9.55729 12.5781 9.92188C12.9427 10.2865 13.125 10.7292 13.125 11.25C13.125 11.7708 12.9427 12.2135 12.5781 12.5781C12.2135 12.9427 11.7708 13.125 11.25 13.125Z" fill="#11D462"/>
                  </svg>
                ),
              },
              {
                cls: "anim-why-card-1",
                title: "Why It Matters?",
                desc: "Without proper planning, rising expenses and longer life expectancy can create financial stress. Early planning ensures stability and peace of mind.",
                icon: (
                  <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 17.5C12.125 15.5833 13.4896 14.2344 14.0938 13.4531C14.6979 12.6719 15 11.8958 15 11.125C15 10.375 14.7292 9.72917 14.1875 9.1875C13.6458 8.64583 13 8.375 12.25 8.375C11.8125 8.375 11.3906 8.46354 10.9844 8.64062C10.5781 8.81771 10.25 9.0625 10 9.375C9.75 9.0625 9.42708 8.81771 9.03125 8.64062C8.63542 8.46354 8.20833 8.375 7.75 8.375C7 8.375 6.35417 8.64583 5.8125 9.1875C5.27083 9.72917 5 10.375 5 11.125C5 11.5208 5.05208 11.8854 5.15625 12.2188C5.26042 12.5521 5.48958 12.9427 5.84375 13.3906C6.19792 13.8385 6.70312 14.3854 7.35938 15.0312C8.01562 15.6771 8.89583 16.5 10 17.5ZM10 25C7.10417 24.2708 4.71354 22.6094 2.82812 20.0156C0.942708 17.4219 0 14.5417 0 11.375V3.75L10 0L20 3.75V11.375C20 14.5417 19.0573 17.4219 17.1719 20.0156C15.2865 22.6094 12.8958 24.2708 10 25ZM10 22.375C12.1667 21.6875 13.9583 20.3125 15.375 18.25C16.7917 16.1875 17.5 13.8958 17.5 11.375V5.46875L10 2.65625L2.5 5.46875V11.375C2.5 13.8958 3.20833 16.1875 4.625 18.25C6.04167 20.3125 7.83333 21.6875 10 22.375Z" fill="#11D462"/>
                  </svg>
                ),
              },
              {
                cls: "anim-why-card-2",
                title: "The Benefits",
                desc: "It allows you to retire comfortably, stay financially independent, and enjoy your post-working years without worrying about money.",
                icon: (
                  <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              {
                title: "Goal Calculator",
                desc: "Target your dreams precisely.",
                cls: "anim-calc-card-0",
                href: "/goal-calucator",
                icon: (
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.7 16C8.1 15.9167 6.75 15.3 5.65 14.15C4.55 13 4 11.6167 4 10C4 8.33333 4.58333 6.91667 5.75 5.75C6.91667 4.58333 8.33333 4 10 4C11.6167 4 13 4.55 14.15 5.65C15.3 6.75 15.9167 8.1 16 9.7L13.9 9.075C13.6833 8.175 13.2167 7.4375 12.5 6.8625C11.7833 6.2875 10.95 6 10 6C8.9 6 7.95833 6.39167 7.175 7.175C6.39167 7.95833 6 8.9 6 10C6 10.95 6.2875 11.7833 6.8625 12.5C7.4375 13.2167 8.175 13.6833 9.075 13.9L9.7 16ZM10.9 19.95C10.75 19.9833 10.6 20 10.45 20C10.3 20 10.15 20 10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 10.15 20 10.3 20 10.45C20 10.6 19.9833 10.75 19.95 10.9L18 10.3V10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18C10.05 18 10.1 18 10.15 18C10.2 18 10.25 18 10.3 18L10.9 19.95ZM18.525 20.5L14.25 16.225L13 20L10 10L20 13L16.225 14.25L20.5 18.525L18.525 20.5Z" fill="#11D462"/>
                  </svg>
                ),
              },
              {
                title: "SIP Calculator",
                desc: "Exact monthly contribution needed.",
                cls: "anim-calc-card-1",
                href: "/sipcalucator",
                icon: (
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.7 16C8.1 15.9167 6.75 15.3 5.65 14.15C4.55 13 4 11.6167 4 10C4 8.33333 4.58333 6.91667 5.75 5.75C6.91667 4.58333 8.33333 4 10 4C11.6167 4 13 4.55 14.15 5.65C15.3 6.75 15.9167 8.1 16 9.7L13.9 9.075C13.6833 8.175 13.2167 7.4375 12.5 6.8625C11.7833 6.2875 10.95 6 10 6C8.9 6 7.95833 6.39167 7.175 7.175C6.39167 7.95833 6 8.9 6 10C6 10.95 6.2875 11.7833 6.8625 12.5C7.4375 13.2167 8.175 13.6833 9.075 13.9L9.7 16ZM10.9 19.95C10.75 19.9833 10.6 20 10.45 20C10.3 20 10.15 20 10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 10.15 20 10.3 20 10.45C20 10.6 19.9833 10.75 19.95 10.9L18 10.3V10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18C10.05 18 10.1 18 10.15 18C10.2 18 10.25 18 10.3 18L10.9 19.95ZM18.525 20.5L14.25 16.225L13 20L10 10L20 13L16.225 14.25L20.5 18.525L18.525 20.5Z" fill="#11D462"/>
                  </svg>
                ),
              },
              {
                title: "Sukanya Samriddhi",
                desc: "Secure your daughter's future.",
                cls: "anim-calc-card-2",
                href: "/sukanya",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 8.75C11.15 8.75 10.8542 8.62917 10.6125 8.3875C10.3708 8.14583 10.25 7.85 10.25 7.5C10.25 7.15 10.3708 6.85417 10.6125 6.6125C10.8542 6.37083 11.15 6.25 11.5 6.25C11.85 6.25 12.1458 6.37083 12.3875 6.6125C12.6292 6.85417 12.75 7.15 12.75 7.5C12.75 7.85 12.6292 8.14583 12.3875 8.3875C12.1458 8.62917 11.85 8.75 11.5 8.75ZM6.5 8.75C6.15 8.75 5.85417 8.62917 5.6125 8.3875C5.37083 8.14583 5.25 7.85 5.25 7.5C5.25 7.15 5.37083 6.85417 5.6125 6.6125C5.85417 6.37083 6.15 6.25 6.5 6.25C6.85 6.25 7.14583 6.37083 7.3875 6.6125C7.62917 6.85417 7.75 7.15 7.75 7.5C7.75 7.85 7.62917 8.14583 7.3875 8.3875C7.14583 8.62917 6.85 8.75 6.5 8.75ZM9 14C8 14 7.09583 13.725 6.2875 13.175C5.47917 12.625 4.88333 11.9 4.5 11H13.5C13.1167 11.9 12.5208 12.625 11.7125 13.175C10.9042 13.725 10 14 9 14ZM9 18C7.75 18 6.57917 17.7625 5.4875 17.2875C4.39583 16.8125 3.44583 16.1708 2.6375 15.3625C1.82917 14.5542 1.1875 13.6042 0.7125 12.5125C0.2375 11.4208 0 10.25 0 9C0 7.75 0.2375 6.57917 0.7125 5.4875C1.1875 4.39583 1.82917 3.44583 2.6375 2.6375C3.44583 1.82917 4.39583 1.1875 5.4875 0.7125C6.57917 0.2375 7.75 0 9 0C10.25 0 11.4208 0.2375 12.5125 0.7125C13.6042 1.1875 14.5542 1.82917 15.3625 2.6375C16.1708 3.44583 16.8125 4.39583 17.2875 5.4875C17.7625 6.57917 18 7.75 18 9C18 10.25 17.7625 11.4208 17.2875 12.5125C16.8125 13.6042 16.1708 14.5542 15.3625 15.3625C14.5542 16.1708 13.6042 16.8125 12.5125 17.2875C11.4208 17.7625 10.25 18 9 18ZM9 16C10.9333 16 12.5833 15.3167 13.95 13.95C15.3167 12.5833 16 10.9333 16 9C16 7.06667 15.3167 5.41667 13.95 4.05C12.5833 2.68333 10.9333 2 9 2C7.06667 2 5.41667 2.68333 4.05 4.05C2.68333 5.41667 2 7.06667 2 9C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.06667 16 9 16Z" fill="#11D462"/>
                  </svg>
                ),
              },
              {
                title: "CAGR Calculator",
                desc: "Find annual compound returns.",
                cls: "anim-calc-card-3",
                href: "#",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 7C2.53333 7 1.70833 6.65833 1.025 5.975C0.341667 5.29167 0 4.46667 0 3.5C0 2.53333 0.341667 1.70833 1.025 1.025C1.70833 0.341667 2.53333 0 3.5 0C4.46667 0 5.29167 0.341667 5.975 1.025C6.65833 1.70833 7 2.53333 7 3.5C7 4.46667 6.65833 5.29167 5.975 5.975C5.29167 6.65833 4.46667 7 3.5 7ZM3.5 5C3.91667 5 4.27083 4.85417 4.5625 4.5625C4.85417 4.27083 5 3.91667 5 3.5C5 3.08333 4.85417 2.72917 4.5625 2.4375C4.27083 2.14583 3.91667 2 3.5 2C3.08333 2 2.72917 2.14583 2.4375 2.4375C2.14583 2.72917 2 3.08333 2 3.5C2 3.91667 2.14583 4.27083 2.4375 4.5625C2.72917 4.85417 3.08333 5 3.5 5ZM12.5 16C11.5333 16 10.7083 15.6583 10.025 14.975C9.34167 14.2917 9 13.4667 9 12.5C9 11.5333 9.34167 10.7083 10.025 10.025C10.7083 9.34167 11.5333 9 12.5 9C13.4667 9 14.2917 9.34167 14.975 10.025C15.6583 10.7083 16 11.5333 16 12.5C16 13.4667 15.6583 14.2917 14.975 14.975C14.2917 15.6583 13.4667 16 12.5 16ZM12.5 14C12.9167 14 13.2708 13.8542 13.5625 13.5625C13.8542 13.2708 14 12.9167 14 12.5C14 12.0833 13.8542 11.7292 13.5625 11.4375C13.2708 11.1458 12.9167 11 12.5 11C12.0833 11 11.7292 11.1458 11.4375 11.4375C11.1458 11.7292 11 12.0833 11 12.5C11 12.9167 11.1458 13.2708 11.4375 13.5625C11.7292 13.8542 12.0833 14 12.5 14ZM1.4 16L0 14.6L14.6 0L16 1.4L1.4 16Z" fill="#11D462"/>
                  </svg>
                ),
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                className={`calc-link-card ${item.cls}`}
              >
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