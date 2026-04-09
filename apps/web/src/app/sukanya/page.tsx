"use client";

import { useState, useRef, useEffect } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

export default function SukanyaSamriddhiCalculatorPage() {
  const [amountInvested, setAmountInvested] = useState("50000");
  const [investingFrequency, setInvestingFrequency] = useState("Yearly");
  const [interestRate] = useState(8.2);
  const [tenure, setTenure] = useState("15");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [graphProgress, setGraphProgress] = useState(0);
  // Confirmation modal removed
  const btnRef = useRef<HTMLButtonElement>(null);
  const animFrameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const _amountInvested = parseFloat(amountInvested) || 0;
  const _tenure = parseFloat(tenure) || 0;
  const r = interestRate / 100;

  let maturityValue = 0;
  if (investingFrequency === "Yearly") {
    maturityValue = _amountInvested * (((_tenure > 0 ? (Math.pow(1 + r, _tenure) - 1) / r : 0)) * (1 + r));
  } else if (investingFrequency === "Monthly") {
    const monthlyRate = r / 12;
    const months = _tenure * 12;
    const monthlyAmount = _amountInvested / 12;
    maturityValue = monthlyAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  } else if (investingFrequency === "Quarterly") {
    const quarterlyRate = r / 4;
    const quarters = _tenure * 4;
    const quarterlyAmount = _amountInvested / 4;
    maturityValue = quarterlyAmount * (((Math.pow(1 + quarterlyRate, quarters) - 1) / quarterlyRate) * (1 + quarterlyRate));
  }

  const totalInvested = _amountInvested * _tenure;
  const totalReturns = maturityValue - totalInvested;
  const fmt = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 2 });

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

  // Chart data: year-by-year invested vs maturity growth
  const numYears = Math.max(1, Math.min(Math.round(_tenure), 15));
  const chartBars = Array.from({ length: numYears }, (_, i) => {
    const y = i + 1;
    const invested = _amountInvested * y;
    let value = 0;
    if (investingFrequency === "Yearly") {
      value = _amountInvested * (((Math.pow(1 + r, y) - 1) / r) * (1 + r));
    } else if (investingFrequency === "Monthly") {
      const mr = r / 12; const m = y * 12; const ma = _amountInvested / 12;
      value = ma * (((Math.pow(1 + mr, m) - 1) / mr) * (1 + mr));
    } else {
      const qr = r / 4; const q = y * 4; const qa = _amountInvested / 4;
      value = qa * (((Math.pow(1 + qr, q) - 1) / qr) * (1 + qr));
    }
    return { year: y, value, invested };
  });
  const maxValRaw = chartBars.length > 0 ? Math.max(...chartBars.map((b) => b.value)) : 1;
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
  const investedPts = mkPoints(chartBars.map((b) => b.invested));
  const growthPts   = mkPoints(chartBars.map((b) => b.value));

  return (
    <div className={inter.className} style={{ backgroundColor: "#f5f0e8", minHeight: "100vh", fontFamily: "var(--font-inter), sans-serif" }}>
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

        .ssy-field { display:flex; flex-direction:column; gap:8px; }
        .ssy-field label { font-size:13px; font-weight:600; color:#333; }
        .ssy-input-wrap { display:flex; align-items:center; background:#f0ede8; border-radius:12px; padding:14px 16px; gap:8px; transition:background 0.2s, box-shadow 0.2s; }
        .ssy-input-wrap:focus-within { background:#e8e4de; box-shadow:0 0 0 2px rgba(13,61,32,0.15); }
        .ssy-input-wrap .pfx { font-size:15px; color:#555; font-weight:500; }
        .ssy-input-wrap .sfx { font-size:14px; color:#888; font-weight:500; margin-left:auto; }
        .ssy-input-wrap input { border:none; outline:none; background:transparent; font-size:15px; font-weight:500; color:#222; width:100%; font-family:var(--font-inter),sans-serif; }
        .ssy-input-wrap input:disabled { color:#555; }
        .ssy-select-wrap { display:flex; align-items:center; background:#f0ede8; border-radius:12px; padding:14px 16px; gap:8px; position:relative; transition:background 0.2s; }
        .ssy-select-wrap select { border:none; outline:none; background:transparent; font-size:15px; font-weight:500; color:#222; width:100%; font-family:var(--font-inter),sans-serif; appearance:none; cursor:pointer; }
        .ssy-select-wrap .chevron { pointer-events:none; color:#888; flex-shrink:0; }

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

        .grid-2col { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; }
        .grid-3col { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; text-align:center; }
        .grid-4col { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .why-grid  { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }

        .ssy-calc-card-link { text-decoration:none; display:block; }
        .ssy-calc-card { transition:transform 0.2s, box-shadow 0.2s; }
        .ssy-calc-card-link:hover .ssy-calc-card { transform:translateY(-2px); box-shadow:0 4px 20px rgba(0,0,0,0.10) !important; }

        @media (max-width: 767px) {
          .hero-section { padding:60px 20px 100px !important; min-height:260px !important; }
          .hero-section h1 { font-size:28px !important; }
          .hero-section p  { font-size:13px !important; }
          .overlap-card-wrap { padding:0 16px !important; }
          .overlap-card-wrap > div { margin-top:-70px !important; padding:24px 18px !important; }
          .overlap-card-wrap h2 { font-size:19px !important; }
          .section-spacer { height:32px !important; }
          .main-content { padding:0 16px 32px !important; }
          .calc-card { padding:22px 16px !important; }
          .grid-2col { grid-template-columns:1fr !important; gap:12px !important; }
          .grid-3col { grid-template-columns:1fr !important; gap:10px !important; text-align:left !important; }
          .grid-3col > div { display:flex; justify-content:space-between; align-items:center; background:#fff; border-radius:10px; padding:12px 14px; }
          .grid-3col > div .result-label { font-size:12px !important; margin-bottom:0 !important; }
          .grid-3col > div .result-value { font-size:15px !important; }
          .why-section { padding:24px 16px !important; }
          .why-section h2 { font-size:20px !important; }
          .why-grid { grid-template-columns:1fr !important; gap:12px !important; }
          .grid-4col { grid-template-columns:1fr 1fr !important; gap:12px !important; }
          .other-calc-header { margin-bottom:14px !important; }
          .other-calc-header h3 { font-size:15px !important; }
          .ssy-input-wrap  { padding:12px 14px !important; }
          .ssy-select-wrap { padding:12px 14px !important; }
          .ssy-input-wrap input   { font-size:14px !important; }
          .ssy-select-wrap select { font-size:14px !important; }
          .ssy-field label { font-size:12px !important; }
          .submit-btn { font-size:15px !important; padding:14px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-section    { padding:70px 32px 110px !important; }
          .main-content    { padding:0 32px 40px !important; }
          .overlap-card-wrap { padding:0 32px !important; }
          .grid-4col { grid-template-columns:1fr 1fr !important; gap:14px !important; }
          .why-grid  { grid-template-columns:1fr 1fr !important; gap:16px !important; }
        }
      `}</style>

      <Header />

      {/* Hero */}
      <div className="anim-hero hero-section" style={{ position:"relative", minHeight:"320px", padding:"80px 48px 120px", backgroundColor:"#0d2818" }}>
        <img src="/financial-planning.svg" alt="" style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block",zIndex:0 }} />
        <div style={{ position:"absolute",inset:0,backgroundColor:"rgba(4,40,28,0.25)",zIndex:1 }} />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(14,61,39,0.4) 0%,rgba(26,92,58,0.2) 100%)",zIndex:1 }} />
        <div className="anim-hero-text" style={{ position:"relative",zIndex:2,maxWidth:"1200px",margin:"0 auto" }}>
          <div style={{ fontSize:13,color:"#11D462",marginBottom:12 }}>
            <a href="/" style={{ color:"#11D462",textDecoration:"none" }}>Home</a>
            <span style={{ margin:"0 8px",color:"#ffffff50" }}>›</span>
            <a href="/calucator" style={{ color:"#11D462",textDecoration:"none" }}>Calculator</a>
            <span style={{ margin:"0 8px",color:"#ffffff50" }}>›</span>
            <span style={{ color:"#11D462",fontWeight:600 }}>Sukanya Samriddhi Calculator</span>
          </div>
          <h1 style={{ margin:0,fontSize:"clamp(30px,4.5vw,54px)",color:"#ffffff",fontWeight:800,lineHeight:1.1 }}>
            Sukanya Samriddhi <span style={{ color:"#11D462",fontStyle:"italic" }}>Calculator</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.7)",fontSize:15,lineHeight:1.7,maxWidth:500,marginTop:16 }}>
            Plan your child's future with confidence. Estimate how much you need to invest under the Sukanya Samriddhi Yojana to secure long-term financial goals.
          </p>
        </div>
      </div>

      {/* Overlapping card */}
      <div className="overlap-card-wrap" style={{ backgroundColor:"#f5f0e8",padding:"0 24px" }}>
        <div style={{ maxWidth:"680px",margin:"-80px auto 0",position:"relative",zIndex:10 }}>
          <div className="anim-overlap-card" style={{ background:"#ffffff",borderRadius:20,padding:"40px",textAlign:"center",boxShadow:"0 8px 40px rgba(0,0,0,0.12)" }}>
            <span style={{ fontSize:11,fontWeight:700,letterSpacing:"0.8px",textTransform:"uppercase",color:"#11D462" }}>CHILD FUTURE PLANNING</span>
            <h2 style={{ fontSize:28,fontWeight:800,color:"#0d1f0d",margin:"12px 0 12px" }}>Plan Your Child's Future With Confidence</h2>
            <p style={{ fontSize:14,color:"#666",lineHeight:1.7,maxWidth:440,margin:"0 auto" }}>
              Sukanya Samriddhi Yojana is a government-backed savings scheme designed to support your daughter's future. Calculate how your investments can grow over time and help you achieve long-term financial security.
            </p>
          </div>
        </div>
      </div>

      <div className="section-spacer" style={{ height:"48px",backgroundColor:"#f5f0e8" }} />

      {/* Main Content */}
      <div className="main-content" style={{ maxWidth:"1200px",margin:"0 auto",padding:"0 48px 48px",backgroundColor:"#f5f0e8",position:"relative",zIndex:1 }}>

        {/* Calculator Form */}
        <div className="anim-calculator" style={{ marginBottom:32 }}>
          <div className="calc-card" style={{ background:"#ffffff",borderRadius:20,padding:"36px 40px",boxShadow:"0 2px 16px rgba(0,0,0,0.07)",maxWidth:720,margin:"0 auto" }}>

            <div className="ssy-field" style={{ marginBottom:20 }}>
              <label>Amount Invested *</label>
              <div className="ssy-input-wrap">
                <span className="pfx">₹</span>
                <input type="number" value={amountInvested} onChange={(e) => { setAmountInvested(e.target.value); setSubmitted(false); setDone(false); }} placeholder="50,000" />
              </div>
            </div>

            <div className="grid-2col">
              <div className="ssy-field">
                <label>Investing Frequency</label>
                <div className="ssy-select-wrap">
                  <select value={investingFrequency} onChange={(e) => { setInvestingFrequency(e.target.value); setSubmitted(false); setDone(false); }}>
                    <option value="Yearly">Yearly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                  <span className="chevron">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="ssy-field">
                <label>Interest Rates</label>
                <div className="ssy-input-wrap">
                  <input type="text" value={`${interestRate}%`} disabled style={{ color:"#555" }} />
                </div>
              </div>
            </div>

            <div className="grid-2col" style={{ marginBottom:24 }}>
              <div className="ssy-field">
                <label>Tenure</label>
                <div className="ssy-input-wrap">
                  <input type="number" value={tenure} onChange={(e) => { setTenure(e.target.value); setSubmitted(false); setDone(false); }} placeholder="15" />
                  <span className="sfx">Yrs</span>
                </div>
              </div>
              <div className="ssy-field">
                <label>Maturity Value</label>
                <div className="ssy-input-wrap">
                  <span className="pfx">₹</span>
                  <input type="text" value={fmt(maturityValue)} disabled style={{ color:"#0d3d20",fontWeight:700 }} />
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
                marginTop:16, background:"#0b2e17", borderRadius:12,
                padding:"14px 16px 12px", border:"1px solid rgba(17,212,98,0.12)",
                position:"relative", overflow:"hidden", animation:"graphIn 0.35s ease both"
              }}>
                {/* Scan line */}
                <div style={{
                  position:"absolute", top:0, bottom:0, width:2,
                  background:"linear-gradient(180deg,rgba(17,212,98,0.7) 0%,rgba(17,212,98,0) 100%)",
                  borderRadius:1, pointerEvents:"none",
                  animation:"scanLine 1.6s cubic-bezier(0.4,0,0.6,1) infinite"
                }} />
                {/* Ticker row */}
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                    <div style={{ width:6,height:6,background:"#11D462",borderRadius:"50%",animation:"pulseDot 1s ease-in-out infinite" }} />
                    <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.7px",textTransform:"uppercase",color:"rgba(255,255,255,0.35)" }}>SSY Projection</span>
                  </div>
                  <div style={{ display:"flex",alignItems:"baseline",gap:5 }}>
                    <span style={{ fontSize:13,fontWeight:800,color:"#11D462",fontVariantNumeric:"tabular-nums",animation:"tickerBlink 1.2s ease-in-out infinite" }}>
                      ₹{Math.round((maturityValue * graphProgress) / 100).toLocaleString("en-IN")}
                    </span>
                    <span style={{ fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.3)" }}>↑ {graphProgress}%</span>
                  </div>
                </div>
                {/* SVG line chart */}
                <div style={{ position:"relative",height:40,marginBottom:6 }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ position:"absolute",left:0,right:0,top:`${i*33}%`,height:1,background:"rgba(255,255,255,0.04)" }} />
                  ))}
                  <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",overflow:"visible" }} viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="none">
                    <defs>
                      <clipPath id="revealClipSSY">
                        <rect x="0" y="0" width={svgW * gp / 100} height={svgH} />
                      </clipPath>
                    </defs>
                    {chartBars.length > 1 && (
                      <polyline points={investedPts} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"
                        strokeDasharray={svgW * 3} strokeDashoffset={svgW * 3 * (1 - gp / 100)}
                        style={{ transition:"stroke-dashoffset 0.06s linear" }} />
                    )}
                    {chartBars.length > 1 && (
                      <polyline points={growthPts} fill="none" stroke="#11D462" strokeWidth="2"
                        strokeDasharray={svgW * 3} strokeDashoffset={svgW * 3 * (1 - gp / 100)}
                        style={{ transition:"stroke-dashoffset 0.06s linear" }} />
                    )}
                    {chartBars.length > 1 && graphProgress > 0 && (() => {
                      const pts = growthPts.split(" ");
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
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:12 }}>
                  <div style={{ display:"flex",gap:10 }}>
                    {([["#11D462","Maturity"],["rgba(255,255,255,0.2)","Invested"]] as const).map(([color,label]) => (
                      <div key={label} style={{ display:"flex",alignItems:"center",gap:4 }}>
                        <div style={{ width:7,height:7,borderRadius:2,background:color }} />
                        <span style={{ fontSize:9,color:"rgba(255,255,255,0.35)",fontWeight:600 }}>{label}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ flex:1,height:2,background:"rgba(255,255,255,0.07)",borderRadius:99,overflow:"hidden" }}>
                    <div style={{ height:"100%",width:`${graphProgress}%`,borderRadius:99,background:"linear-gradient(90deg,#11D462,#34d399)",transition:"width 0.06s linear" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Animated Result */}
            {submitted && (
              <div className="result-card" style={{ marginTop:24,padding:"20px",background:"#f0faf4",borderRadius:12,border:"1px solid #c3e6d0" }}>
                <div className="grid-3col">
                  <div>
                    <div className="result-label" style={{ fontSize:12,color:"#666",marginBottom:4 }}>Total Invested</div>
                    <div className="result-value result-value-1" style={{ fontSize:16,fontWeight:800,color:"#0d3d20" }}>₹{fmt(totalInvested)}</div>
                  </div>
                  <div>
                    <div className="result-label" style={{ fontSize:12,color:"#666",marginBottom:4 }}>Returns Earned</div>
                    <div className="result-value result-value-2" style={{ fontSize:16,fontWeight:800,color:"#0d3d20" }}>₹{fmt(totalReturns)}</div>
                  </div>
                  <div>
                    <div className="result-label" style={{ fontSize:12,color:"#666",marginBottom:4 }}>Maturity Value</div>
                    <div className="result-value result-value-3" style={{ fontSize:16,fontWeight:800,color:"#11D462" }}>₹{fmt(maturityValue)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Why Sukanya Samriddhi? */}
        <div className="anim-why-section why-section" style={{ marginBottom:32,background:"#ffffff",borderRadius:20,padding:"40px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize:28,fontWeight:800,color:"#0d1f0d",textAlign:"center",marginBottom:8 }}>Why Sukanya Samriddhi?</h2>
          <div style={{ width:40,height:3,background:"#11D462",borderRadius:2,margin:"0 auto 32px" }} />
          <div className="why-grid">
            {[
              { cls:"anim-why-card-0", title:"What is Sukanya Samriddhi Yojana?", desc:"Sukanya Samriddhi Yojana is a government-backed savings scheme designed to secure a girl child's future through disciplined long-term investments.", icon:(<svg width="24" height="25" viewBox="0 0 24 25" fill="none"><path d="M3.75 25V19.625C2.5625 18.5417 1.64062 17.276 0.984375 15.8281C0.328125 14.3802 0 12.8542 0 11.25C0 8.125 1.09375 5.46875 3.28125 3.28125C5.46875 1.09375 8.125 0 11.25 0C13.8542 0 16.1615 0.765625 18.1719 2.29688C20.1823 3.82812 21.4896 5.82292 22.0938 8.28125L23.7188 14.6875C23.8229 15.0833 23.75 15.4427 23.5 15.7656C23.25 16.0885 22.9167 16.25 22.5 16.25H20V20C20 20.6875 19.7552 21.276 19.2656 21.7656C18.776 22.2552 18.1875 22.5 17.5 22.5H15V25H12.5V20H17.5V13.75H20.875L19.6875 8.90625C19.2083 7.01042 18.1875 5.46875 16.625 4.28125C15.0625 3.09375 13.2708 2.5 11.25 2.5C8.83333 2.5 6.77083 3.34375 5.0625 5.03125C3.35417 6.71875 2.5 8.77083 2.5 11.1875C2.5 12.4375 2.75521 13.625 3.26562 14.75C3.77604 15.875 4.5 16.875 5.4375 17.75L6.25 18.5V25H3.75ZM10 16.25H12.5L12.6875 14.6875C12.8542 14.625 13.0052 14.5521 13.1406 14.4688C13.276 14.3854 13.3958 14.2917 13.5 14.1875L14.9375 14.8125L16.1875 12.6875L14.9375 11.75C14.9792 11.5833 15 11.4167 15 11.25C15 11.0833 14.9792 10.9167 14.9375 10.75L16.1875 9.8125L14.9375 7.6875L13.5 8.3125C13.3958 8.20833 13.276 8.11458 13.1406 8.03125C13.0052 7.94792 12.8542 7.875 12.6875 7.8125L12.5 6.25H10L9.8125 7.8125C9.64583 7.875 9.49479 7.94792 9.35938 8.03125C9.22396 8.11458 9.10417 8.20833 9 8.3125L7.5625 7.6875L6.3125 9.8125L7.5625 10.75C7.52083 10.9167 7.5 11.0833 7.5 11.25C7.5 11.4167 7.52083 11.5833 7.5625 11.75L6.3125 12.6875L7.5625 14.8125L9 14.1875C9.10417 14.2917 9.22396 14.3854 9.35938 14.4688C9.49479 14.5521 9.64583 14.625 9.8125 14.6875L10 16.25ZM11.25 13.125C10.7292 13.125 10.2865 12.9427 9.92188 12.5781C9.55729 12.2135 9.375 11.7708 9.375 11.25C9.375 10.7292 9.55729 10.2865 9.92188 9.92188C10.2865 9.55729 10.7292 9.375 11.25 9.375C11.7708 9.375 12.2135 9.55729 12.5781 9.92188C12.9427 10.2865 13.125 10.7292 13.125 11.25C13.125 11.7708 12.9427 12.2135 12.5781 12.5781C12.2135 12.9427 11.7708 13.125 11.25 13.125Z" fill="#11D462"/></svg>) },
              { cls:"anim-why-card-1", title:"Why It Matters?", desc:"It offers high interest rates and tax benefits, helping parents build a strong financial foundation for their child's education and future expenses.", icon:(<svg width="20" height="25" viewBox="0 0 20 25" fill="none"><path d="M10 17.5C12.125 15.5833 13.4896 14.2344 14.0938 13.4531C14.6979 12.6719 15 11.8958 15 11.125C15 10.375 14.7292 9.72917 14.1875 9.1875C13.6458 8.64583 13 8.375 12.25 8.375C11.8125 8.375 11.3906 8.46354 10.9844 8.64062C10.5781 8.81771 10.25 9.0625 10 9.375C9.75 9.0625 9.42708 8.81771 9.03125 8.64062C8.63542 8.46354 8.20833 8.375 7.75 8.375C7 8.375 6.35417 8.64583 5.8125 9.1875C5.27083 9.72917 5 10.375 5 11.125C5 11.5208 5.05208 11.8854 5.15625 12.2188C5.26042 12.5521 5.48958 12.9427 5.84375 13.3906C6.19792 13.8385 6.70312 14.3854 7.35938 15.0312C8.01562 15.6771 8.89583 16.5 10 17.5ZM10 25C7.10417 24.2708 4.71354 22.6094 2.82812 20.0156C0.942708 17.4219 0 14.5417 0 11.375V3.75L10 0L20 3.75V11.375C20 14.5417 19.0573 17.4219 17.1719 20.0156C15.2865 22.6094 12.8958 24.2708 10 25ZM10 22.375C12.1667 21.6875 13.9583 20.3125 15.375 18.25C16.7917 16.1875 17.5 13.8958 17.5 11.375V5.46875L10 2.65625L2.5 5.46875V11.375C2.5 13.8958 3.20833 16.1875 4.625 18.25C6.04167 20.3125 7.83333 21.6875 10 22.375Z" fill="#11D462"/></svg>) },
              { cls:"anim-why-card-2", title:"The Benefits", desc:"With guaranteed returns and long-term compounding, this scheme ensures financial security and peace of mind for your child's future.", icon:(<svg width="28" height="24" viewBox="0 0 28 24" fill="none"><path d="M9.375 8.75L8 5.75L5 4.375L8 3L9.375 0L10.75 3L13.75 4.375L10.75 5.75L9.375 8.75ZM17.5 12.5L16.3125 9.9375L13.75 8.75L16.3125 7.5625L17.5 5L18.6875 7.5625L21.25 8.75L18.6875 9.9375L17.5 12.5ZM3.75 15L2.5625 12.4375L0 11.25L2.5625 10.0625L3.75 7.5L4.9375 10.0625L7.5 11.25L4.9375 12.4375L3.75 15ZM4.375 23.125L2.5 21.25L11.875 11.875L16.875 16.875L25.75 6.90625L27.5 8.65625L16.875 20.625L11.875 15.625L4.375 23.125Z" fill="#11D462"/></svg>) },
            ].map((item) => (
              <div key={item.title} className={item.cls} style={{ background:"#FDFBF7",borderRadius:24,padding:"28px 24px",border:"1px solid rgba(6,40,23,0.05)" }}>
                <div style={{ width:44,height:44,background:"#ffffff",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16 }}>{item.icon}</div>
                <h3 style={{ fontSize:16,fontWeight:700,color:"#0d1f0d",marginBottom:10 }}>{item.title}</h3>
                <p style={{ fontSize:13,color:"#666",lineHeight:1.7,margin:0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Calculators */}
        <div>
          <div className="anim-calc-header other-calc-header" style={{ display:"flex",alignItems:"center",gap:10,marginBottom:20 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="#11D462" strokeWidth="2"/>
              <path d="M8 12h8M12 8v8" stroke="#11D462" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h3 style={{ fontSize:18,fontWeight:800,color:"#0d1f0d",margin:0 }}>Other Powerful Calculators</h3>
          </div>
          <div className="grid-4col">
            {[
              { title:"Goal Calculator", desc:"Target your dreams precisely.", cls:"anim-calc-card-0", href:"/goal-calucator", icon:(<svg width="21" height="21" viewBox="0 0 21 21" fill="none"><path d="M9.7 16C8.1 15.9167 6.75 15.3 5.65 14.15C4.55 13 4 11.6167 4 10C4 8.33333 4.58333 6.91667 5.75 5.75C6.91667 4.58333 8.33333 4 10 4C11.6167 4 13 4.55 14.15 5.65C15.3 6.75 15.9167 8.1 16 9.7L13.9 9.075C13.6833 8.175 13.2167 7.4375 12.5 6.8625C11.7833 6.2875 10.95 6 10 6C8.9 6 7.95833 6.39167 7.175 7.175C6.39167 7.95833 6 8.9 6 10C6 10.95 6.2875 11.7833 6.8625 12.5C7.4375 13.2167 8.175 13.6833 9.075 13.9L9.7 16ZM10.9 19.95C10.75 19.9833 10.6 20 10.45 20C10.3 20 10.15 20 10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 10.15 20 10.3 20 10.45C20 10.6 19.9833 10.75 19.95 10.9L18 10.3V10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18C10.05 18 10.1 18 10.15 18C10.2 18 10.25 18 10.3 18L10.9 19.95ZM18.525 20.5L14.25 16.225L13 20L10 10L20 13L16.225 14.25L20.5 18.525L18.525 20.5Z" fill="#11D462"/></svg>) },
              { title:"SIP Calculator", desc:"Exact monthly contribution needed.", cls:"anim-calc-card-1", href:"/sipcalucator", icon:(<svg width="21" height="21" viewBox="0 0 21 21" fill="none"><path d="M9.7 16C8.1 15.9167 6.75 15.3 5.65 14.15C4.55 13 4 11.6167 4 10C4 8.33333 4.58333 6.91667 5.75 5.75C6.91667 4.58333 8.33333 4 10 4C11.6167 4 13 4.55 14.15 5.65C15.3 6.75 15.9167 8.1 16 9.7L13.9 9.075C13.6833 8.175 13.2167 7.4375 12.5 6.8625C11.7833 6.2875 10.95 6 10 6C8.9 6 7.95833 6.39167 7.175 7.175C6.39167 7.95833 6 8.9 6 10C6 10.95 6.2875 11.7833 6.8625 12.5C7.4375 13.2167 8.175 13.6833 9.075 13.9L9.7 16ZM10.9 19.95C10.75 19.9833 10.6 20 10.45 20C10.3 20 10.15 20 10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 10.15 20 10.3 20 10.45C20 10.6 19.9833 10.75 19.95 10.9L18 10.3V10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18C10.05 18 10.1 18 10.15 18C10.2 18 10.25 18 10.3 18L10.9 19.95ZM18.525 20.5L14.25 16.225L13 20L10 10L20 13L16.225 14.25L20.5 18.525L18.525 20.5Z" fill="#11D462"/></svg>) },
              { title:"Retirement Calculator", desc:"Build your post-work nest egg.", cls:"anim-calc-card-2", href:"/reteriment", icon:(<svg width="18" height="19" viewBox="0 0 18 19" fill="none"><path d="M16.6 18.025L10.25 11.675L11.65 10.275L18 16.625L16.6 18.025ZM2.95 17.325C1.95 16.325 1.20833 15.2 0.725 13.95C0.241667 12.7 0 11.425 0 10.125C0 8.825 0.241667 7.55833 0.725 6.325C1.20833 5.09167 1.95 3.975 2.95 2.975C3.95 1.975 5.07083 1.22917 6.3125 0.7375C7.55417 0.245833 8.825 0 10.125 0C11.425 0 12.6958 0.245833 13.9375 0.7375C15.1792 1.22917 16.3 1.975 17.3 2.975L2.95 17.325ZM3.15 14.275L4.5 12.925C4.23333 12.575 3.97917 12.2167 3.7375 11.85C3.49583 11.4833 3.275 11.1167 3.075 10.75C2.875 10.3833 2.7 10.0167 2.55 9.65C2.4 9.28333 2.26667 8.925 2.15 8.575C1.96667 9.55833 1.95417 10.5417 2.1125 11.525C2.27083 12.5083 2.61667 13.425 3.15 14.275ZM5.95 11.525L11.5 5.925C10.7833 5.375 10.0625 4.92917 9.3375 4.5875C8.6125 4.24583 7.93333 4.0125 7.3 3.8875C6.66667 3.7625 6.09583 3.74167 5.5875 3.825C5.07917 3.90833 4.68333 4.09167 4.4 4.375C4.11667 4.675 3.93333 5.07917 3.85 5.5875C3.76667 6.09583 3.7875 6.67083 3.9125 7.3125C4.0375 7.95417 4.27083 8.63333 4.6125 9.35C4.95417 10.0667 5.4 10.7917 5.95 11.525ZM12.9 4.525L14.3 3.175C13.4167 2.64167 12.4833 2.29167 11.5 2.125C10.5167 1.95833 9.53333 1.975 8.55 2.175C8.91667 2.29167 9.28333 2.425 9.65 2.575C10.0167 2.725 10.3833 2.89583 10.75 3.0875C11.1167 3.27917 11.4792 3.49583 11.8375 3.7375C12.1958 3.97917 12.55 4.24167 12.9 4.525Z" fill="#11D462"/></svg>) },
              { title:"CAGR Calculator", desc:"Find annual compound returns.", cls:"anim-calc-card-3", href:"/cgarcalucator", icon:(<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 7C2.53333 7 1.70833 6.65833 1.025 5.975C0.341667 5.29167 0 4.46667 0 3.5C0 2.53333 0.341667 1.70833 1.025 1.025C1.70833 0.341667 2.53333 0 3.5 0C4.46667 0 5.29167 0.341667 5.975 1.025C6.65833 1.70833 7 2.53333 7 3.5C7 4.46667 6.65833 5.29167 5.975 5.975C5.29167 6.65833 4.46667 7 3.5 7ZM3.5 5C3.91667 5 4.27083 4.85417 4.5625 4.5625C4.85417 4.27083 5 3.91667 5 3.5C5 3.08333 4.85417 2.72917 4.5625 2.4375C4.27083 2.14583 3.91667 2 3.5 2C3.08333 2 2.72917 2.14583 2.4375 2.4375C2.14583 2.72917 2 3.08333 2 3.5C2 3.91667 2.14583 4.27083 2.4375 4.5625C2.72917 4.85417 3.08333 5 3.5 5ZM12.5 16C11.5333 16 10.7083 15.6583 10.025 14.975C9.34167 14.2917 9 13.4667 9 12.5C9 11.5333 9.34167 10.7083 10.025 10.025C10.7083 9.34167 11.5333 9 12.5 9C13.4667 9 14.2917 9.34167 14.975 10.025C15.6583 10.7083 16 11.5333 16 12.5C16 13.4667 15.6583 14.2917 14.975 14.975C14.2917 15.6583 13.4667 16 12.5 16ZM12.5 14C12.9167 14 13.2708 13.8542 13.5625 13.5625C13.8542 13.2708 14 12.9167 14 12.5C14 12.0833 13.8542 11.7292 13.5625 11.4375C13.2708 11.1458 12.9167 11 12.5 11C12.0833 11 11.7292 11.1458 11.4375 11.4375C11.1458 11.7292 11 12.0833 11 12.5C11 12.9167 11.1458 13.2708 11.4375 13.5625C11.7292 13.8542 12.0833 14 12.5 14ZM1.4 16L0 14.6L14.6 0L16 1.4L1.4 16Z" fill="#11D462"/></svg>) },
            ].map((item) => (
              <a key={item.title} href={item.href} className="ssy-calc-card-link">
                <div className={`${item.cls} ssy-calc-card`} style={{ background:"#ffffff",borderRadius:14,padding:"20px",boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
                  <div style={{ width:40,height:40,background:"#f0faf4",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12 }}>{item.icon}</div>
                  <p style={{ fontSize:14,fontWeight:700,color:"#0d1f0d",margin:"0 0 6px" }}>{item.title}</p>
                  <p style={{ fontSize:12,color:"#888",margin:0 }}>{item.desc}</p>
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
