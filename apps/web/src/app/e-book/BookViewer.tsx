"use client";

import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

const FLIP_MS = 800;

function spreadPages(s: number) {
  if (s === 0) return { L: null as number | null, R: 1 as number };
  return { L: s * 2 as number, R: s * 2 + 1 as number };
}
function totalSpreads(n: number) { return n <= 0 ? 0 : 1 + Math.ceil((n - 1) / 2); }

function playFlip(dir: "fwd" | "bwd") {
  try {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AC(), t = ctx.currentTime, dur = 0.5;
    const g = ctx.createGain(); g.gain.value = 0.55; g.connect(ctx.destination);
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur | 0, ctx.sampleRate);
    const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const s = ctx.createBufferSource(); s.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = "bandpass";
    f.frequency.setValueAtTime(dir === "fwd" ? 3000 : 800, t);
    f.frequency.exponentialRampToValueAtTime(dir === "fwd" ? 800 : 3000, t + dur * .7);
    f.Q.value = 1.6;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(.001, t); ng.gain.linearRampToValueAtTime(.85, t + .02);
    ng.gain.setValueAtTime(.85, t + dur * .2); ng.gain.exponentialRampToValueAtTime(.001, t + dur * .75);
    s.connect(f); f.connect(ng); ng.connect(g); s.start(t); s.stop(t + dur);
    setTimeout(() => ctx.close(), (dur + .3) * 1000);
  } catch (_) {}
}

function PDFPage({ n, w }: { n: number; w: number }) {
  return (
    <Page pageNumber={n} width={w}
      renderAnnotationLayer={false} renderTextLayer={false}
      loading={
        <div style={{ width: w, height: 560, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 24, height: 24, border: "3px solid #ddd", borderTopColor: "#4a7c59", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
        </div>
      }
    />
  );
}

function Half({ n, w, numPages, grey = false }: { n: number | null; w: number; numPages: number; grey?: boolean }) {
  if (grey) return <div style={{ width: w, height: 560, background: "#e8e8e8" }} />;
  if (!n || n > numPages || numPages === 0) return <div style={{ width: w, height: 560, background: "#fff" }} />;
  return <PDFPage n={n} w={w} />;
}

interface BookViewerProps {
  pdfFile: string;
}

export default function BookViewer({ pdfFile }: BookViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [spread,   setSpread]   = useState(0);
  const [phase, setPhase]       = useState<"idle"|"opening"|"closing"|"fwd"|"bwd">("idle");
  const [nextS, setNextS]       = useState(1);
  const [pdfErr, setPdfErr]     = useState(false);
  const [pw, setPw]             = useState(460);

  const wrapRef  = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>|null>(null);

  const total = totalSpreads(numPages);

  useEffect(() => {
    const upd = () => { if (wrapRef.current) setPw(Math.floor(wrapRef.current.offsetWidth / 2) - 4); };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  useEffect(() => {
    setNumPages(0);
    setSpread(0);
    setPhase("idle");
    setPdfErr(false);
  }, [pdfFile]);

  useEffect(() => () => { timerRef.current && clearTimeout(timerRef.current); }, []);

  const go = (dir: "fwd" | "bwd") => {
    if (phase !== "idle") return;
    const nxt = dir === "fwd" ? spread + 1 : spread - 1;
    if (nxt < 0 || nxt >= total) return;
    playFlip(dir);
    setNextS(nxt);
    const p = dir === "fwd" && spread === 0 ? "opening"
            : dir === "bwd" && nxt    === 0 ? "closing"
            : dir === "fwd"                 ? "fwd"
                                            : "bwd";
    setPhase(p as any);
    timerRef.current = setTimeout(() => { setSpread(nxt); setPhase("idle"); }, FLIP_MS);
  };

  const cur = spreadPages(spread);
  const nxt = spreadPages(nextS);

  let bgL: number | null, bgR: number | null, bgLgrey = false;
  if (phase === "opening")      { bgL = nxt.L; bgR = nxt.R; }
  else if (phase === "closing") { bgL = null; bgR = 1; bgLgrey = true; }
  else if (phase === "fwd")     { bgL = nxt.L; bgR = nxt.R; }
  else if (phase === "bwd")     { bgL = nxt.L; bgR = nxt.R; }
  else if (spread === 0)        { bgL = null; bgR = 1; bgLgrey = true; }
  else                          { bgL = cur.L; bgR = cur.R; }

  let leafFront: number | null = null;
  let leafBack:  number | null = null;
  if (phase === "opening")      { leafFront = 1;      leafBack  = nxt.R; }
  else if (phase === "closing") { leafFront = cur.R;  leafBack  = 1; }
  else if (phase === "fwd")     { leafFront = cur.R;  leafBack  = nxt.L; }
  else if (phase === "bwd")     { leafFront = cur.L;  leafBack  = nxt.R; }

  const leafCls =
    phase === "opening" ? "lf-open"  :
    phase === "closing" ? "lf-close" :
    phase === "fwd"     ? "lf-fwd"   :
    phase === "bwd"     ? "lf-bwd"   : "";

  const isBusy = phase !== "idle";

  const label = () => {
    if (!numPages) return "Loading…";
    if (spread === 0) return `1 / ${numPages}`;
    const r = cur.R ?? cur.L;
    return `${cur.L}–${Math.min(r as number, numPages)} / ${numPages}`;
  };

  const bookBox: React.CSSProperties = {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    borderRadius: 4, overflow: "hidden", position: "relative", background: "#fff",
    boxShadow: "0 8px 48px rgba(0,0,0,0.72), 0 2px 8px rgba(0,0,0,0.45)",
  };

  return (
    <div style={{ width: "100%", background: "#102218", display: "flex", flexDirection: "column", alignItems: "stretch", padding: "48px 0" }}>
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        .lf-open  { animation: lfOpen  ${FLIP_MS}ms cubic-bezier(.42,0,.28,1) forwards; }
        @keyframes lfOpen  { from{transform:rotateY(0deg);}    to{transform:rotateY(-180deg);} }
        .lf-close { animation: lfClose ${FLIP_MS}ms cubic-bezier(.42,0,.28,1) forwards; }
        @keyframes lfClose { from{transform:rotateY(-180deg);} to{transform:rotateY(0deg);} }
        .lf-fwd   { animation: lfOpen  ${FLIP_MS}ms cubic-bezier(.45,0,.35,1) forwards; }
        .lf-bwd   { animation: lfClose ${FLIP_MS}ms cubic-bezier(.45,0,.35,1) forwards; }
        .leaf {
          position: absolute; left: 50%; right: 0; top: 0; bottom: 0;
          transform-origin: left center; transform-style: preserve-3d;
          z-index: 10; pointer-events: none;
        }
        .leaf-face {
          position: absolute; inset: 0; backface-visibility: hidden;
          -webkit-backface-visibility: hidden; overflow: hidden;
          display: flex; align-items: center; justify-content: center; background: #fff;
        }
        .leaf-back { transform: rotateY(180deg); }
        .sheen {
          position: absolute; inset: 0; pointer-events: none; z-index: 2;
          background: linear-gradient(110deg,transparent 38%,rgba(255,255,255,.22) 62%,rgba(255,255,255,.07) 74%,transparent 100%);
        }
        .spine-sh {
          position: absolute; top: 0; bottom: 0;
          left: calc(50% - 16px); width: 32px; z-index: 8; pointer-events: none;
          background: linear-gradient(to right,rgba(0,0,0,.24) 0%,transparent 100%);
          animation: shAnim ${FLIP_MS}ms ease forwards;
        }
        @keyframes shAnim { 0%,100%{opacity:0} 20%,80%{opacity:1} }
        .spine {
          position: absolute; left: 50%; top: 0; bottom: 0; width: 3px; z-index: 6; pointer-events: none;
          background: linear-gradient(to right,rgba(0,0,0,.16),rgba(0,0,0,.03));
        }
        .nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(6,78,59,0.85); border: 1px solid rgba(255,255,255,.2);
          color: rgba(255,255,255,.92); font-size: 24px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 30; transition: background .15s; line-height: 1;
        }
        .nav:hover:not(:disabled) { background: rgba(6,78,59,1); }
        .nav:disabled { opacity: .16; cursor: default; }
        .tb { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.7); cursor: pointer;
              padding: 6px 12px; border-radius: 8px; display: flex; align-items: center;
              gap: 6px; height: 36px; transition: background .12s, color .12s;
              font-size: 13px; font-family: system-ui, sans-serif; }
        .tb:hover { background: rgba(255,255,255,0.15); color: #fff; border-color: rgba(255,255,255,0.3); }
        .tb-primary { background: #D4A843; border: 1px solid #D4A843; color: #102218; cursor: pointer;
              padding: 6px 16px; border-radius: 8px; display: flex; align-items: center;
              gap: 6px; height: 36px; transition: background .12s;
              font-size: 13px; font-family: system-ui, sans-serif; font-weight: 700; }
        .tb-primary:hover { background: #c49a38; border-color: #c49a38; }
        .lb { color: rgba(255,255,255,0.45); font-size: 13px; font-family: system-ui, sans-serif; white-space: nowrap; }
        .react-pdf__Page { display:flex !important; justify-content:center; }
        .react-pdf__Page canvas { max-width:100% !important; height:auto !important; }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 80px", boxSizing: "border-box" }}>
        <div style={{ width: "100%", maxWidth: 1200, background: "#1a3328", borderRadius: "20px", boxShadow: "0 4px 48px rgba(0,0,0,0.4)", padding: "48px 40px 32px", boxSizing: "border-box" }}>

          <Document
            file={pdfFile}
            onLoadSuccess={({ numPages: n }) => setNumPages(n)}
            onLoadError={() => setPdfErr(true)}
            loading={
              <div style={{ width: "100%", height: 560, background: "rgba(255,255,255,0.05)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 40, height: 40, border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "#D4A843", borderRadius: "50%", animation: "spin .8s linear infinite", margin: "0 auto 12px" }} />
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, margin: 0, fontFamily: "system-ui,sans-serif" }}>Loading…</p>
                </div>
              </div>
            }
          >
            <div ref={wrapRef} style={{ position: "relative", width: "100%", maxWidth: 1100, margin: "0 auto", perspective: 2400, perspectiveOrigin: "50% 48%" }}>
              {pdfErr ? (
                <div style={{ borderRadius: 8, background: "rgba(255,255,255,0.05)", padding: 60, textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <p style={{ fontSize: 48, margin: "0 0 16px" }}>📄</p>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontWeight: 700, fontSize: 18, margin: "0 0 8px", fontFamily: "system-ui,sans-serif" }}>PDF not found</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0, fontFamily: "system-ui,sans-serif" }}>
                    Place your PDF at <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 3, color: "#D4A843" }}>{pdfFile}</code>
                  </p>
                </div>
              ) : (
                <>
                  <div style={bookBox}>
                    <div style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #ddd" }}>
                      <Half n={bgL} w={pw} numPages={numPages} grey={bgLgrey} />
                    </div>
                    <div style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Half n={bgR} w={pw} numPages={numPages} />
                    </div>
                    <div className="spine" />
                  </div>

                  {phase !== "idle" && (
                    <>
                      <div className={`leaf ${leafCls}`}>
                        <div className="leaf-face">
                          <Half n={leafFront} w={pw} numPages={numPages} />
                          <div className="sheen" />
                        </div>
                        <div className="leaf-face leaf-back">
                          <Half n={leafBack} w={pw} numPages={numPages} />
                        </div>
                      </div>
                      <div className="spine-sh" />
                    </>
                  )}

                  <button className="nav" style={{ left: -58 }} onClick={() => go("bwd")} disabled={isBusy || spread <= 0}>‹</button>
                  <button className="nav" style={{ right: -58 }} onClick={() => go("fwd")} disabled={isBusy || spread >= total - 1}>›</button>
                </>
              )}
            </div>
          </Document>

          {/* Toolbar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {/* Left: zoom */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button className="tb" title="Zoom out">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                Zoom out
              </button>
              <button className="tb" title="Zoom in">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                Zoom in
              </button>
            </div>

            {/* Center: page label */}
            <span className="lb" style={{ fontSize: 14 }}>{label()}</span>

            {/* Right: download */}
            <a
              href={pdfFile}
              download
              className="tb-primary"
              style={{ textDecoration: "none" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PDF
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}