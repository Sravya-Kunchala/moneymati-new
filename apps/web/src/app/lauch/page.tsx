"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const logoSrc = "/best new moneymati logo.svg";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --green-deep:   #0d2b1f;
    --green-mid:    #1a4a32;
    --green-accent: #2e7d52;
    --gold:         #c9a84c;
    --gold-light:   #e8c97a;
    --beige:        #f5f0e8;
    --beige-warm:   #ede7d9;
    --white:        #ffffff;
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-body:    'DM Sans', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .mm-root {
    width: 100%; height: 100vh;
    overflow: hidden;
    background: var(--green-deep);
    position: relative;
    font-family: var(--font-body);
  }

  /* ── LAUNCH SCREEN ── */
  .mm-launch {
    position: absolute; inset: 0; z-index: 100;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: var(--green-deep);
    overflow: hidden;
    transition: opacity 0.7s ease;
    padding-bottom: 80px;
  }
  .mm-launch.fade-out { opacity: 0; pointer-events: none; }

  .mm-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    opacity: 0;
    animation: blobFade 1.8s ease forwards;
  }
  .mm-blob-1 {
    width: 520px; height: 520px;
    background: radial-gradient(circle, #2e7d52 0%, transparent 70%);
    top: -120px; right: -80px;
    animation-delay: 0.3s;
  }
  .mm-blob-2 {
    width: 380px; height: 380px;
    background: radial-gradient(circle, #c9a84c 0%, transparent 70%);
    bottom: -100px; left: -60px;
    animation-delay: 0.6s;
  }
  .mm-blob-3 {
    width: 260px; height: 260px;
    background: radial-gradient(circle, #1a4a32 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: 0s; animation-duration: 2.2s;
  }
  @keyframes blobFade { to { opacity: 1; } }

  .mm-grid-overlay {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .mm-bg-canvas {
    position: absolute; inset: 0;
    opacity: 0.07;
    pointer-events: none;
    width: 100%; height: 100%;
  }

  .mm-content {
    position: relative; z-index: 10;
    display: flex; flex-direction: column;
    align-items: center; text-align: center;
    padding: 0 24px;
  }

  .mm-logo-mark {
    width: 88px; height: 88px;
    border-radius: 20px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 28px;
    opacity: 0;
    transform: scale(0.8) translateY(8px);
    animation: riseIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s forwards;
    filter: drop-shadow(0 0 24px rgba(46,125,82,0.5));
  }
  .mm-logo-mark img { width: 88px; height: 88px; border-radius: 18px; object-fit: cover; display: block; }

  .mm-eyebrow {
    font-family: var(--font-body);
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 20px;
    opacity: 0; transform: translateY(12px);
    animation: riseIn 0.7s ease 0.7s forwards;
  }

  .mm-headline {
    font-family: var(--font-display);
    font-weight: 300;
    font-size: clamp(52px, 7vw, 92px);
    line-height: 1.05;
    color: var(--white);
    letter-spacing: -0.01em;
    margin-bottom: 24px;
    opacity: 0; transform: translateY(18px);
    animation: riseIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.9s forwards;
  }
  .mm-headline em { font-style: italic; color: var(--gold-light); }

  .mm-tagline {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 28px;
    opacity: 0;
    animation: riseIn 0.7s ease 1.1s forwards;
    font-family: var(--font-body);
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.08em;
  }
  .mm-tag-word {
    color: rgba(255,255,255,0.85);
    font-weight: 400; font-size: 13.5px;
    opacity: 0; transform: translateY(6px);
    animation: wordPop 0.5s ease forwards;
  }
  .mm-tag-word:nth-child(1) { animation-delay: 1.4s; }
  .mm-tag-word:nth-child(3) { animation-delay: 1.9s; }
  .mm-tag-word:nth-child(5) { animation-delay: 2.4s; }
  .mm-tag-sep {
    color: var(--gold); font-size: 11px;
    opacity: 0;
    animation: wordPop 0.4s ease forwards;
  }
  .mm-tag-sep:nth-child(2) { animation-delay: 1.65s; }
  .mm-tag-sep:nth-child(4) { animation-delay: 2.15s; }
  @keyframes wordPop { to { opacity: 1; transform: translateY(0); } }

  .mm-subtext {
    font-family: var(--font-body);
    font-size: clamp(14px, 1.6vw, 16px);
    color: rgba(255,255,255,0.52);
    max-width: 480px; line-height: 1.75;
    margin-bottom: 44px; font-weight: 300;
    opacity: 0; transform: translateY(12px);
    animation: riseIn 0.8s ease 2.8s forwards;
  }

  .mm-cta-wrap {
    opacity: 0; transform: translateY(10px);
    animation: riseIn 0.8s ease 3.1s forwards;
  }

  .mm-btn {
    position: relative;
    padding: 16px 48px; border: none; border-radius: 100px;
    background: linear-gradient(135deg, #2e7d52 0%, #1a5c3a 60%, #0d3d26 100%);
    color: var(--white);
    font-family: var(--font-body); font-size: 15px;
    font-weight: 500; letter-spacing: 0.05em;
    cursor: pointer; overflow: hidden;
    box-shadow: 0 0 0 1px rgba(201,168,76,0.25), 0 8px 32px rgba(0,0,0,0.35), 0 0 40px rgba(46,125,82,0.25);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .mm-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(201,168,76,0.15) 0%, transparent 60%);
    border-radius: inherit; opacity: 0; transition: opacity 0.3s;
  }
  .mm-btn:hover { transform: scale(1.04); box-shadow: 0 0 0 1px rgba(201,168,76,0.45), 0 12px 40px rgba(0,0,0,0.4), 0 0 60px rgba(46,125,82,0.45); }
  .mm-btn:hover::before { opacity: 1; }
  .mm-btn:active { transform: scale(0.97); }
  .mm-btn.loading { pointer-events: none; }
  .mm-btn.loading .mm-btn-text { opacity: 0; }
  .mm-btn.loading .mm-btn-spinner { opacity: 1; }
  .mm-btn-text { transition: opacity 0.2s; }
  .mm-btn-spinner {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.2s;
  }
  .mm-spinner-ring {
    width: 22px; height: 22px;
    border: 2px solid rgba(255,255,255,0.25);
    border-top-color: #fff; border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .mm-stats {
    display: flex; gap: 28px; margin-top: 36px;
    opacity: 0;
    animation: riseIn 0.8s ease 3.3s forwards;
  }
  .mm-stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .mm-stat-val { font-family: var(--font-display); font-size: 22px; font-weight: 400; color: var(--gold-light); }
  .mm-stat-label { font-family: var(--font-body); font-size: 10px; letter-spacing: 0.12em; color: rgba(255,255,255,0.33); text-transform: uppercase; }
  .mm-stat-divider { width: 1px; background: rgba(255,255,255,0.1); align-self: stretch; }

  /* Footer label */
  .mm-border-line {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex; align-items: center; gap: 12px;
    opacity: 0;
    animation: fadeIn 1s ease 3.5s forwards;
    white-space: nowrap;
  }
  .mm-border-line span { font-family: var(--font-body); font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.22); }
  .mm-line-h { width: 48px; height: 1px; background: rgba(255,255,255,0.12); }

  @keyframes riseIn { to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes fadeIn { to { opacity: 1; } }

  /* ── OVERLAY ── */
  .mm-overlay {
    position: absolute; inset: 0; z-index: 200;
    background: var(--green-deep);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    opacity: 0; pointer-events: none;
    transition: opacity 0.5s ease;
  }
  .mm-overlay.active { opacity: 1; pointer-events: all; }
  .mm-overlay.fade-out { opacity: 0; }

  .mm-overlay-logo {
    margin-bottom: 40px; display: flex; flex-direction: column; align-items: center; gap: 16px;
    opacity: 0; transform: scale(0.85);
    transition: opacity 0.6s ease 0.2s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s;
  }
  .mm-overlay.active .mm-overlay-logo { opacity: 1; transform: scale(1); }
  .mm-overlay-logo-name { font-family: var(--font-display); font-size: 38px; font-weight: 300; color: var(--white); letter-spacing: 0.02em; }
  .mm-overlay-logo-name em { font-style: italic; color: var(--gold-light); }

  .mm-graph-loader { width: 120px; height: 40px; margin-bottom: 28px; opacity: 0; transition: opacity 0.5s ease 0.5s; }
  .mm-overlay.active .mm-graph-loader { opacity: 1; }

  .mm-graph-path { stroke-dasharray: 300; stroke-dashoffset: 300; }
  .mm-overlay.active .mm-graph-path { animation: drawLine 1.5s cubic-bezier(0.4,0,0.2,1) 0.6s forwards; }
  @keyframes drawLine { to { stroke-dashoffset: 0; } }

  .mm-dot-pulse { display: flex; gap: 8px; margin-bottom: 20px; opacity: 0; transition: opacity 0.5s ease 0.4s; }
  .mm-overlay.active .mm-dot-pulse { opacity: 1; }
  .mm-dot { width: 7px; height: 7px; background: var(--green-accent); border-radius: 50%; animation: dotBounce 1.2s ease-in-out infinite; }
  .mm-dot:nth-child(1) { animation-delay: 0s; }
  .mm-dot:nth-child(2) { animation-delay: 0.2s; }
  .mm-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes dotBounce { 0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; } 40% { transform: scale(1.1); opacity: 1; } }

  .mm-overlay-text { font-family: var(--font-body); font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.38); opacity: 0; transition: opacity 0.5s ease 0.7s; }
  .mm-overlay.active .mm-overlay-text { opacity: 1; }

  /* ── SITE ── */
  .mm-site {
    position: absolute; inset: 0; z-index: 50;
    background: var(--beige);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transform: scale(0.97);
    pointer-events: none;
    transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1);
  }
  .mm-site.visible { opacity: 1; transform: scale(1); pointer-events: all; }
  .mm-site-inner { text-align: center; padding: 40px; }
  .mm-site-logo-name { font-family: var(--font-display); font-size: 56px; font-weight: 300; color: var(--green-deep); margin-bottom: 16px; }
  .mm-site-logo-name em { font-style: italic; color: var(--green-accent); }
  .mm-site-sub { font-family: var(--font-body); color: rgba(13,43,31,0.5); font-size: 15px; letter-spacing: 0.04em; margin-bottom: 40px; }
  .mm-site-pill { display: inline-block; padding: 10px 28px; border-radius: 100px; border: 1.5px solid rgba(13,43,31,0.12); font-family: var(--font-body); font-size: 13px; color: var(--green-mid); letter-spacing: 0.06em; background: rgba(255,255,255,0.7); cursor: pointer; }

  @media (max-width: 560px) {
    .mm-stats { gap: 16px; }
    .mm-stat-val { font-size: 18px; }
    .mm-launch { padding-bottom: 72px; }
  }
`;

type MoneyMatiLaunchProps = {
  onEnter?: () => void;
};

export default function MoneyMatiLaunch({ onEnter }: MoneyMatiLaunchProps) {
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);
  const [launchFading, setLaunchFading] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);

  const startLaunch = () => {
    setBtnLoading(true);

    setTimeout(() => {
      setOverlayActive(true);

      setTimeout(() => {
        setLaunchFading(true);
        setTimeout(() => {
          onEnter?.();
          router.push("/");
        }, 700);
      }, 2000);
    }, 500);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="mm-root">

        {/* ── LAUNCH SCREEN ── */}
        <div className={`mm-launch${launchFading ? " fade-out" : ""}`}>
          <div className="mm-blob mm-blob-1" />
          <div className="mm-blob mm-blob-2" />
          <div className="mm-blob mm-blob-3" />
          <div className="mm-grid-overlay" />

          <svg className="mm-bg-canvas" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <polyline points="0,720 120,680 240,700 360,640 480,660 600,580 720,610 840,520 960,560 1080,450 1200,480 1320,390 1440,410" fill="none" stroke="white" strokeWidth="1.5"/>
            <polyline points="0,780 180,750 360,760 480,720 600,730 720,680 900,690 1080,620 1200,640 1440,580" fill="none" stroke="white" strokeWidth="0.8"/>
            <polyline points="0,820 200,800 400,810 600,770 800,785 1000,740 1200,755 1440,710" fill="none" stroke="white" strokeWidth="0.5"/>
            <polyline points="200,550 260,480 340,500 400,420 480,445 560,360 640,395 720,300 800,340" fill="none" stroke="#c9a84c" strokeWidth="1" strokeDasharray="4 4"/>
            <circle cx="800" cy="300" r="3" fill="#c9a84c" opacity="0.6"/>
          </svg>

          <div className="mm-content">
            <div className="mm-logo-mark">
              <img src={logoSrc} alt="MoneyMati Logo" />
            </div>

            <p className="mm-eyebrow">Empowering Women · Financial Clarity</p>

            <h1 className="mm-headline">
              MoneyMati<br /><em>is Here.</em>
            </h1>

            <div className="mm-tagline">
              <span className="mm-tag-word">Learn</span>
              <span className="mm-tag-sep">→</span>
              <span className="mm-tag-word">Grow</span>
              <span className="mm-tag-sep">→</span>
              <span className="mm-tag-word">Invest</span>
            </div>

            <p className="mm-subtext">
              A platform designed exclusively for women — to learn, grow, and build lasting financial confidence through education, webinars, and personalised guidance.
            </p>

            <div className="mm-cta-wrap">
              <a href="/" onClick={(e) => { e.preventDefault(); startLaunch(); }} style={{ textDecoration: "none" }}>
                <button className={`mm-btn${btnLoading ? " loading" : ""}`}>
                  <span className="mm-btn-text">Launch MoneyMati</span>
                  <span className="mm-btn-spinner">
                    <span className="mm-spinner-ring" />
                  </span>
                </button>
              </a>
            </div>

            <div className="mm-stats">
              <div className="mm-stat">
                <span className="mm-stat-val">5,200+</span>
                <span className="mm-stat-label">Women Empowered</span>
              </div>
              <div className="mm-stat-divider" />
              <div className="mm-stat">
                <span className="mm-stat-val">200+</span>
                <span className="mm-stat-label">Webinars Hosted</span>
              </div>
              <div className="mm-stat-divider" />
              <div className="mm-stat">
                <span className="mm-stat-val">50+</span>
                <span className="mm-stat-label">Resources</span>
              </div>
            </div>
          </div>

          {/* Footer label */}
          <div className="mm-border-line">
            <span className="mm-line-h" />
            <span>moneymati.com</span>
            <span className="mm-line-h" />
          </div>
        </div>

        {/* ── LOADING OVERLAY ── */}
        <div className={`mm-overlay${overlayActive ? " active" : ""}`}>
          <div className="mm-overlay-logo">
            <img
              src={logoSrc}
              alt="MoneyMati Logo"
              style={{ width: 72, height: 72, borderRadius: 16, objectFit: "cover", filter: "drop-shadow(0 0 20px rgba(46,125,82,0.5))" }}
            />
            <div className="mm-overlay-logo-name">Money<em>Mati</em></div>
          </div>

          <svg className="mm-graph-loader" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              className="mm-graph-path"
              d="M0 35 L20 28 L35 30 L50 20 L65 23 L80 10 L95 14 L120 4"
              stroke="#2e7d52" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            />
            <path
              className="mm-graph-path"
              d="M0 38 L20 33 L40 35 L60 27 L80 30 L100 22 L120 18"
              stroke="rgba(201,168,76,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ animationDelay: "0.3s" }}
            />
          </svg>

          <div className="mm-dot-pulse">
            <div className="mm-dot" />
            <div className="mm-dot" />
            <div className="mm-dot" />
          </div>

          <p className="mm-overlay-text">Launching MoneyMati…</p>
        </div>

      </div>
    </>
  );
}
