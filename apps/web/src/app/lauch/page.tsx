"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const logoBase64 = "data:image/jpeg;base64,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";

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
    display: flex; gap: 28px; margin-top: 52px;
    opacity: 0;
    animation: riseIn 0.8s ease 3.3s forwards;
  }
  .mm-stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .mm-stat-val { font-family: var(--font-display); font-size: 22px; font-weight: 400; color: var(--gold-light); }
  .mm-stat-label { font-family: var(--font-body); font-size: 10px; letter-spacing: 0.12em; color: rgba(255,255,255,0.33); text-transform: uppercase; }
  .mm-stat-divider { width: 1px; background: rgba(255,255,255,0.1); align-self: stretch; }

  .mm-border-line {
    position: absolute; bottom: 52px;
    display: flex; align-items: center; gap: 12px;
    opacity: 0;
    animation: riseIn 1s ease 3.5s forwards;
  }
  .mm-border-line span { font-family: var(--font-body); font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.22); }
  .mm-line-h { width: 48px; height: 1px; background: rgba(255,255,255,0.12); }

  @keyframes riseIn { to { opacity: 1; transform: translateY(0) scale(1); } }

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

    // Show overlay after brief button-press delay
    setTimeout(() => {
      setOverlayActive(true);

      // After overlay animation plays, fade everything out then navigate to /
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
                <img src={logoBase64} alt="MoneyMati Logo" />
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
                  <button
                    className={`mm-btn${btnLoading ? " loading" : ""}`}
                  >
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
                src={logoBase64}
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
