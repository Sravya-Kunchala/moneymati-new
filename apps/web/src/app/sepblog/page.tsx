"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function NPSArticlePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      <Header />
    <div className="nps-page-content" style={{ fontFamily: "'Inter', sans-serif", background: "#f5f3ee", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Dancing+Script:wght@700&family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
        .nps-page-content * { box-sizing: border-box; }

        .breadcrumb a { color: #555; text-decoration: none; font-size: 13px; font-family: 'Inter', sans-serif; }
        .breadcrumb a:hover { text-decoration: underline; }
        .breadcrumb span { color: #555; font-size: 13px; font-family: 'Inter', sans-serif; margin: 0 4px; }

        .highlight-row { display: flex; gap: 8px; align-items: flex-start; margin-bottom: 10px; }
        .highlight-row:last-child { margin-bottom: 0; }

        .two-col-card { background: #fff; border-radius: 10px; padding: 20px 22px; border: 1px solid #e5e5e0; flex: 1; }

        .tag-pill { display: inline-block; background: #e8e6df; border-radius: 9999px; padding: 5px 14px; font-family: 'Inter', sans-serif; font-size: 13px; color: #444; margin-right: 8px; margin-bottom: 8px; font-weight: 500; }

        .newsletter-input { flex: 1; padding: 12px 18px; border-radius: 9999px; border: 1px solid #ddd; background: #fff; font-family: 'Inter', sans-serif; font-size: 14px; color: #333; outline: none; min-width: 0; }
        .newsletter-input::placeholder { color: #aaa; }

        .join-btn { background: #2d5a3d; color: #fff; border: none; border-radius: 9999px; padding: 12px 28px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; white-space: nowrap; }
        .join-btn:hover { background: #234a31; }

        .related-card { background: #fff; border-radius: 12px; overflow: hidden; }
        .read-more-link { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700; color: #2d8a5e; text-decoration: none; letter-spacing: 0.5px; text-transform: uppercase; }
        .read-more-link:hover { text-decoration: underline; }

        .page-container { max-width: 1100px; margin: 0 auto; padding: 0 48px; }

        /* ── Animations ── */
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
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .anim-breadcrumb  { animation: fadeIn      0.5s ease 0.1s both; }
        .anim-badge       { animation: fadeIn      0.5s ease 0.2s both; }
        .anim-title       { animation: fadeInUp    0.7s ease 0.25s both; }
        .anim-subtitle    { animation: fadeInUp    0.6s ease 0.35s both; }
        .anim-readtime    { animation: fadeIn      0.5s ease 0.4s both; }
        .anim-hero-img    { animation: scaleIn     0.8s ease 0.3s both; }
        .anim-body-p1     { animation: fadeInUp    0.6s ease 0.4s both; }
        .anim-highlights  { animation: slideInLeft 0.7s ease 0.45s both; }
        .anim-cost-title  { animation: fadeInUp    0.6s ease 0.5s both; }
        .anim-cost-p      { animation: fadeInUp    0.6s ease 0.55s both; }
        .anim-cost-cards  { animation: fadeInUp    0.6s ease 0.6s both; }
        .anim-flex-title  { animation: fadeInUp    0.6s ease 0.6s both; }
        .anim-flex-p1     { animation: fadeInUp    0.6s ease 0.65s both; }
        .anim-flex-p2     { animation: fadeInUp    0.6s ease 0.7s both; }
        .anim-tags        { animation: fadeIn      0.6s ease 0.75s both; }
        .anim-newsletter  { animation: scaleIn     0.7s ease 0.5s both; }
        .anim-related-hd  { animation: fadeInUp    0.6s ease 0.55s both; }
        .anim-rel-card-1  { animation: cardIn      0.6s ease 0.6s both; }
        .anim-rel-card-2  { animation: cardIn      0.6s ease 0.7s both; }
        .anim-rel-card-3  { animation: cardIn      0.6s ease 0.8s both; }
      `}</style>

      {/* ── Breadcrumb + Title ── */}
      <div style={{ background: "#f5f3ee", padding: "40px 0 0" }}>
        <div className="page-container">
          <div className="breadcrumb anim-breadcrumb" style={{ marginBottom: 20 }}>
            <a href="/">Home</a><span>&gt;</span>
            <a href="/Blog">Blog</a><span>&gt;</span>
            <a href="#">Business</a><span>&gt;</span>
            <span style={{ color: "#555", fontWeight: 400 }}>NPS Game Changer: 100% Equity Allocation Revolutionizes India's Retirement Planning</span>
          </div>

          {/* Badge */}
          <div className="anim-badge" style={{ display: "inline-block", background: "rgba(33,69,51,0.2)", borderRadius: 9999, padding: "4px 12px", marginBottom: 18, fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: "#214533", letterSpacing: "0.8px", textTransform: "uppercase" }}>
            FEATURED ARTICLE
          </div>

          {/* Title */}
          <h1 className="anim-title" style={{ marginBottom: 16, lineHeight: 1.1 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(36px,5vw,54px)", color: "#0d1f0d" }}>
              NPS: The Game<br />Changer for{" "}
            </span>
            <span style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: "clamp(36px,5vw,54px)", color: "#2d7a5e" }}>
              100% Equity Retirement Planning
            </span>
          </h1>

          <p className="anim-subtitle" style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.7, color: "#555", maxWidth: 420, marginBottom: 14 }}>
            Discover why the National Pension System is becoming the preferred retirement
            tool for women in India, offering long‑term security and tax benefits.
          </p>

          <div className="anim-readtime" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#888", marginBottom: 32 }}>8 min read</div>
        </div>
      </div>

      {/* ── Hero Image ── */}
      <div style={{ padding: "0 0 48px" }}>
        <div className="page-container">
          <div className="anim-hero-img" style={{ borderRadius: 16, overflow: "hidden", height: 380, position: "relative" }}>
            <img
              src="/bg-image.svg"
              alt="NPS Hero"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,18,28,0.98) 30%, rgba(10,18,28,0.4) 70%, transparent 100%)" }} />
          </div>
        </div>
      </div>

      {/* ── Article Body ── */}
      <div style={{ paddingBottom: 8 }}>
        <div className="page-container">
          <p className="anim-body-p1" style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#222", marginBottom: 28 }}>
            India's National Pension System (NPS) has undergone a monumental shift. The
            introduction of 100% equity allocation marks a new era for retirement planning, allowing investors to maximize long-term wealth
            creation through aggressive market exposure. This reform addresses the growing need for inflation-beating returns in an
            evolving economy.
          </p>

          {/* Key Highlights */}
          <div className="anim-highlights" style={{ background: "rgba(17,29,70,0.05)", borderRadius: 16, borderLeft: "4px solid #11D462", padding: "32px", marginBottom: 36, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#11D462"/>
              </svg>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: "#111" }}>Key Highlights</span>
            </div>
            {[
              { bold: "Full Equity Exposure:", text: "Private sector subscribers can now opt for 100% equity (Asset Class E) under the Active Choice." },
              { bold: "PAN-Based Diversification:", text: "Simplified asset allocation tracking across multiple PRANs linked to a single PAN." },
              { bold: "Tax Benefits:", text: "Continued deduction under Section 80CCD(1) and 80CCD(1B), making it one of the most tax-efficient tools." },
            ].map((item) => (
              <div key={item.bold} className="highlight-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: 2, flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" stroke="#11D462" strokeWidth="2"/>
                  <path d="M8 12l3 3 5-5" stroke="#11D462" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.7, margin: 0 }}>
                  <strong style={{ color: "#111" }}>{item.bold}</strong> {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Cost Advantages */}
          <h2 className="anim-cost-title" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 26, color: "#0d1f0d", marginBottom: 14 }}>Cost Advantages</h2>
          <p className="anim-cost-p" style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#333", marginBottom: 24, textAlign: "justify" }}>
            One of the most compelling reasons to choose NPS remains its ultra-low cost structure. Compared to mutual funds which can charge 1.5% to 2.5% in expense
            ratios, NPS charges a fraction of a percent for investment management. This compounding of "saved costs" over 20–30 years can result in a significantly larger
            retirement corpus for the average Indian worker.
          </p>

          <div className="anim-cost-cards" style={{ display: "flex", gap: 20, marginBottom: 40 }}>
            <div className="two-col-card">
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: "#2d8a5e", marginBottom: 10 }}>PFRDA Regulation</div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0 }}>
                The Pension Fund Regulatory and Development Authority ensures strict oversight, protecting subscriber interests while allowing for market-linked growth.
              </p>
            </div>
            <div className="two-col-card">
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: "#c8860a", marginBottom: 10 }}>Strategic Asset Mix</div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0 }}>
                Subscribers can still choose between Active Choice (Manual) and Auto Choice (Life-cycle based) to manage their risk-return profile.
              </p>
            </div>
          </div>

          {/* Enhanced Flexibility */}
          <h2 className="anim-flex-title" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 26, color: "#0d1f0d", marginBottom: 14 }}>Enhanced Flexibility</h2>
          <p className="anim-flex-p1" style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#333", marginBottom: 18, textAlign: "justify" }}>
            The recent updates haven't just focused on returns; they've centered on flexibility. Subscribers now have more frequent opportunities to change their Investment
            Choice and Pension Fund Manager (PFM). This empowers investors to respond to market performance or changes in their personal risk tolerance without friction.
          </p>
          <p className="anim-flex-p2" style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#333", marginBottom: 32, textAlign: "justify" }}>
            Furthermore, the partial withdrawal rules have been streamlined, allowing for easier access to funds for critical life events like home purchase, higher education,
            or medical emergencies, while still preserving the core retirement kitty.
          </p>

          {/* Tags */}
          <div className="anim-tags" style={{ marginBottom: 56 }}>
            {["#RetirementPlanning", "#NPS", "#IndiaFinance", "#WealthBuilding"].map(tag => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div style={{ background: "#f5f3ee", padding: "48px 0 0" }}>
        <div className="page-container">
          <div className="anim-newsletter" style={{ textAlign: "center", maxWidth: 540, margin: "0 auto", paddingBottom: 56 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#2d5a3d", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 22, color: "#fff" }}>✉</div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 26, color: "#0d1f0d", marginBottom: 10 }}>Stay Ahead with MoneyMati</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 28 }}>
              Get exclusive insights on Indian markets, fund analysis, and retirement<br />strategies delivered to your inbox every Sunday.
            </p>
            {subscribed ? (
              <div style={{ background: "#e6f4ec", borderRadius: 9999, padding: "14px 28px", fontFamily: "'Inter', sans-serif", color: "#2d5a3d", fontWeight: 700, fontSize: 14 }}>
                ✅ You're subscribed! Check your inbox.
              </div>
            ) : (
              <div style={{ display: "flex", gap: 10, maxWidth: 460, margin: "0 auto 12px" }}>
                <input className="newsletter-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && email && setSubscribed(true)} />
                <button className="join-btn" onClick={() => email && setSubscribed(true)}>Join Newsletter</button>
              </div>
            )}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#888" }}>
              No spam, just premium financial wisdom.{" "}
              <a href="#" style={{ color: "#2d8a5e" }}>Unsubscribe</a> anytime.
            </p>
          </div>

          {/* Related Analysis */}
          <div style={{ maxWidth: 880, margin: "0 auto", paddingBottom: 56 }}>
            <div className="anim-related-hd" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 4, height: 22, background: "#2d8a5e", borderRadius: 2 }} />
                <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 20, color: "#0d1f0d" }}>Related Analysis</h2>
              </div>
              <a href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", textDecoration: "none", fontWeight: 500 }}>View all →</a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              <div className="related-card anim-rel-card-1">
                <div style={{ height: 160, overflow: "hidden" }}>
                  <img src="/Card 1.svg" alt="Family's Financial Goals" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "16px 16px 20px" }}>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 10, lineHeight: 1.4 }}>Family's Financial Goals</h3>
                  <a href="#" className="read-more-link">READ MORE</a>
                </div>
              </div>

              <div className="related-card anim-rel-card-2">
                <div style={{ height: 160, overflow: "hidden" }}>
                  <img src="/Card 2.svg" alt="Money Matters" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "16px 16px 20px" }}>
                  <a href="#" className="read-more-link" style={{ display: "block", marginBottom: 6 }}>READ MORE</a>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: "#111", lineHeight: 1.4 }}>Money Matters: Ask your Valentine these Questions</h3>
                </div>
              </div>

              <div className="related-card anim-rel-card-3">
                <div style={{ height: 160, overflow: "hidden" }}>
                  <img src="/Card 3.svg" alt="Black Swan Events" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "16px 16px 20px" }}>
                  <a href="#" className="read-more-link" style={{ display: "block", marginBottom: 6 }}>READ MORE</a>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: "#111", lineHeight: 1.4 }}>How to deal with losses during black swan events?</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
}