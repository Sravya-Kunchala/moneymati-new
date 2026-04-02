"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

const relatedArticles = [
  { tag: "READ MORE", image: "/blog-family.svg", title: "Family's Financial Goals" },
  { tag: "READ MORE", image: "/blog-blackswan.svg", title: "How to deal with losses during black swan events?" },
  { tag: "READ MORE", image: "/blog-ulips.svg", title: "Problem with ULIPs" },
];

function Breadcrumb() {
  const router = useRouter();
  return (
    <nav className="breadcrumb anim-breadcrumb" style={{ marginBottom: "20px", display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <a href="/" onClick={e => { e.preventDefault(); router.push("/"); }}>Home</a><span>&gt;</span>
      <a href="/Blog" onClick={e => { e.preventDefault(); router.push("/Blog"); }}>Blog</a><span>&gt;</span>
      <a href="/blog/business" onClick={e => { e.preventDefault(); router.push("/blog/business"); }}>Business</a><span>&gt;</span>
      <span style={{ color: "#555", fontWeight: 400 }}>Deal with losses During Black Swan Events</span>
    </nav>
  );
}

export default function BlackSwanEvents() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      <Header />
      <div className="ffg-page" style={{ fontFamily: "'Inter', sans-serif", background: "#f5f3ee", minHeight: "100vh" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Dancing+Script:wght@700&family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

          .ffg-page * { box-sizing: border-box; }

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

          .page-container { max-width: 1100px; margin: 0 auto; padding: 0; }

          /* ── Reusable layout classes ── */
          .hero-wrapper { padding-bottom: 48px; max-width: 1100px; margin: 0 auto; }
          .body-container { max-width: 1100px; margin: 0 auto; padding: 0; }
          .cost-cards-row { display: flex; gap: 20px; margin-bottom: 36px; }
          .related-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
          .newsletter-row { display: flex; gap: 10px; max-width: 460px; margin: 0 auto 12px; }

          @keyframes fadeInDown { from { opacity: 0; transform: translateY(-24px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInUp   { from { opacity: 0; transform: translateY(40px); }  to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeIn     { from { opacity: 0; }                                to { opacity: 1; } }
          @keyframes slideInLeft { from { opacity: 0; transform: translateX(-32px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes scaleIn    { from { opacity: 0; transform: scale(0.95); }        to { opacity: 1; transform: scale(1); } }
          @keyframes cardIn     { from { opacity: 0; transform: translateY(24px); }   to { opacity: 1; transform: translateY(0); } }

          .anim-breadcrumb { animation: fadeIn       0.5s ease 0.1s  both; }
          .anim-badge      { animation: fadeIn       0.5s ease 0.2s  both; }
          .anim-title      { animation: fadeInUp     0.7s ease 0.25s both; }
          .anim-meta       { animation: fadeIn       0.5s ease 0.4s  both; }
          .anim-hero-img   { animation: scaleIn      0.8s ease 0.3s  both; }
          .anim-body-p1    { animation: fadeInUp     0.6s ease 0.4s  both; }
          .anim-highlights { animation: slideInLeft  0.7s ease 0.45s both; }
          .anim-cost-cards { animation: fadeInUp     0.6s ease 0.6s  both; }
          .anim-tags       { animation: fadeIn       0.6s ease 0.75s both; }
          .anim-newsletter { animation: scaleIn      0.7s ease 0.5s  both; }
          .anim-related-hd { animation: fadeInUp    0.6s ease 0.55s both; }
          .anim-rel-card-1 { animation: cardIn      0.6s ease 0.6s  both; }
          .anim-rel-card-2 { animation: cardIn      0.6s ease 0.7s  both; }
          .anim-rel-card-3 { animation: cardIn      0.6s ease 0.8s  both; }

          /* ── Mobile styles ── */
          @media (max-width: 768px) {
            .page-container { padding: 0 20px; }
            .body-container { padding: 0 20px; }
            .hero-wrapper { padding: 0 20px 32px; }

            .anim-hero-img { border-radius: 12px !important; }

            /* Stat cards: stack vertically */
            .cost-cards-row { flex-direction: column; gap: 12px; }

            /* Related articles: single column */
            .related-grid { grid-template-columns: 1fr; }

            /* Newsletter: stack input + button */
            .newsletter-row { flex-direction: column; gap: 10px; max-width: 100%; }
            .newsletter-input { width: 100%; }
            .join-btn { width: 100%; text-align: center; }

            /* Section top padding */
            .ffg-page > div:first-child { padding-top: 24px !important; }
          }

          @media (max-width: 480px) {
            .page-container { padding: 0 16px; }
            .body-container { padding: 0 16px; }
            .hero-wrapper { padding: 0 16px 24px; }

            .two-col-card { padding: 16px; }
          }
        `}</style>

        {/* ── Breadcrumb + Title + Meta ── */}
        <div style={{ background: "#f5f3ee", padding: "40px 0 0" }}>
          <div className="page-container">
            <Breadcrumb />

            {/* Badge */}
            <div className="anim-badge" style={{ display: "inline-block", background: "rgba(6,78,59,0.10)", border: "1px solid rgba(6,78,59,0.15)", borderRadius: 9999, padding: "4px 12px", marginBottom: 18, fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: "#064E3B", letterSpacing: "0.8px", textTransform: "uppercase" }}>
              Featured Article
            </div>

            {/* Title */}
            <h1 className="anim-title" style={{ marginBottom: 16, lineHeight: 1.1 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(28px,5vw,54px)", color: "#0d1f0d" }}>
                How to deal with losses
              </span>
              <br />
              <span style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: "clamp(28px,5vw,54px)", color: "#064E3B" }}>
                during black swan events?
              </span>
            </h1>

            {/* Meta */}
            <div className="anim-meta" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: 20, fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#888" }}>
              <span>Oct 24, 2023</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#888", display: "inline-block" }} />
              <span>6 min read</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hero-wrapper">
            <div
              className="anim-hero-img"
              style={{ borderRadius: "16px", overflow: "hidden", width: "100%", position: "relative", aspectRatio: "16/7", backgroundColor: "#111" }}
            >
              <img
                src="/blog-blackswan.svg"
                alt="How to deal with losses during black swan events"
                style={{ position: "absolute", top: "50%", left: "50%", width: "120%", height: "120%", transform: "translate(-50%, -50%)", objectFit: "cover", objectPosition: "center", display: "block" }}
              />
            </div>
          </div>
        </div>

        {/* ── Article Body ── */}
        <div style={{ paddingBottom: 8 }}>
          <div className="body-container">

            {/* Intro */}
            <p className="anim-body-p1" style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#222", marginBottom: 28 }}>
              Dealing with substantial portfolio losses during a black swan event requires a combination of emotional discipline, risk management, and strategic adjustments. Here's a tailored approach for the Indian market context:
            </p>

            {/* Section 1 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>1. Stay Calm and Assess the Situation</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 6 }}>
              <strong>Avoid Panic Selling:</strong> Emotional decisions can lead to locking in losses. Black swan events often lead to a temporary overreaction in markets.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 28 }}>
              <strong>Analyze Fundamentals:</strong> Evaluate the companies or sectors in your portfolio. Strong businesses with sound fundamentals are more likely to recover once the panic subsides.
            </p>

            {/* Section 2 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>2. Diversify Your Portfolio</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 6 }}>
              <strong>Sectoral Diversification:</strong> Indian markets are often influenced by specific sectors (e.g., IT, banking, pharma). A well-diversified portfolio across sectors can cushion losses.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 28 }}>
              <strong>Asset Class Diversification:</strong> Allocate investments to other asset classes like gold, bonds, or REITs. For instance, gold tends to perform well during crises and can act as a hedge.
            </p>

            {/* Section 3 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>3. Review and Rebalance</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 6 }}>
              <strong>Reassess Risk Appetite:</strong> Determine whether your current portfolio aligns with your revised risk tolerance after the event.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 28 }}>
              <strong>Rebalance Strategically:</strong> If certain sectors or stocks have become disproportionately large or small due to market fluctuations, rebalance to align with your long-term goals.
            </p>

            {/* Core Recovery Strategies highlight box */}
            <div className="anim-highlights" style={{ position: "relative", background: "rgba(17,29,70,0.05)", borderRadius: 16, borderLeft: "4px solid #11D462", padding: "28px 32px", marginBottom: 28, display: "flex", flexDirection: "column", gap: 14, overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} viewBox="0 0 965 306" preserveAspectRatio="none" fill="none">
                  <path d="M0 305.5C15.4354 299.924 31.8263 293.98 47.2054 288.444C190.536 236.862 333.766 186.541 477.968 138.103C622.177 90.5243 766.394 40.9642 914.866 7.55337C930.335 4.39589 948.679 1.0486 964.5 0C948.674 0.982021 930.312 4.26774 914.829 7.36718C766.199 40.2597 621.867 89.5736 477.65 137.155C333.437 185.597 190.289 236.175 47.1406 288.266C31.7818 293.858 15.4126 299.861 0 305.5Z" fill="#677E73" fillOpacity="0.5"/>
                </svg>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative", zIndex: 1 }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#11D462"/>
                </svg>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: "#111" }}>Core Recovery Strategies</span>
              </div>
              {[
                { label: "Look for Value", desc: "Events present buying opportunities in strong stocks at discounts." },
                { label: "SIP Approach", desc: "Continue or initiate SIPs to average out the cost during volatility." },
                { label: "Tax Benefits", desc: "Offset gains with realized losses under the Income Tax Act, 1961." },
              ].map((item, i) => (
                <div key={i} className="highlight-row" style={{ position: "relative", zIndex: 1 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10" stroke="#11D462" strokeWidth="2"/>
                    <path d="M8 12l3 3 5-5" stroke="#11D462" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.7, margin: 0 }}>
                    <strong style={{ color: "#111" }}>{item.label}:</strong> {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Section 5 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>5. Learn from the Event</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 6 }}>
              <strong>Risk Management:</strong> Use the event to evaluate the effectiveness of your current risk management strategies. For example, did you have stop-loss orders or sufficient diversification in place?
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 28 }}>
              <strong>Contingency Plan:</strong> Develop a contingency plan to deal with future uncertainties, such as maintaining an emergency fund or investing in liquid assets for quick access to cash.
            </p>

            {/* Section 6 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>6. Hedge Against Future Events</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 28 }}>
              Consider using derivatives like options or futures to hedge your portfolio. In the Indian context, GOLD, ETFs and sovereign gold bonds provide a safe haven during crises.
            </p>

            {/* Section 7 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>7. Leverage Professional Advice</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 28 }}>
              Consult with a financial advisor to reassess your financial goals and make informed decisions tailored to the Indian market's dynamics.
            </p>

            {/* Section 8 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>8. Stay Updated</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 24 }}>
              Monitor both global effects (e.g., U.S. Federal Reserve decisions) and local factors (e.g., RBI policies). Recognize that Indian markets have historically rebounded strongly from crises like the 2008 crash and the 2020 pandemic.
            </p>

            {/* Two-col stat cards */}
            <div className="anim-cost-cards cost-cards-row">
              <div className="two-col-card">
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 11, color: "#064E3B", marginBottom: 10, letterSpacing: "1.2px", textTransform: "uppercase" }}>THE COVID-19 CRASH (MARCH 2020)</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0 }}>
                  The Nifty 50 fell by over 30% in weeks. Those who held strong stocks like <strong>Reliance</strong> or <strong>HDFC Bank</strong> witnessed a full recovery.
                </p>
              </div>
              <div className="two-col-card">
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 11, color: "#D4A843", marginBottom: 10, letterSpacing: "1.2px", textTransform: "uppercase" }}>DIVERSIFICATION GAINS</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0 }}>
                  Investors who diversified into gold saw gains as gold prices surged over 25% that year, offsetting equity market drawdowns.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>10. Build an Emergency Fund</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 28 }}>
              Ensure you have 6–12 months' worth of expenses in a liquid fund to prevent the need to sell investments during a market downturn.
            </p>

            {/* Closing line */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, fontWeight: 700, color: "#064E3B", marginBottom: 36 }}>
              Follow Moneymati for more updates on risk management, wealth preservation, and staying resilient in volatile markets.
            </p>

            {/* Tags */}
            <div className="anim-tags" style={{ marginBottom: 56 }}>
              {["#blackswan", "#riskmanagement", "#investing", "#nifty50", "#financialplanning", "#moneymati", "#wealthpreservation"].map(tag => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Newsletter ── */}
        <div style={{ background: "#F8F6F1", padding: "48px 0 0" }}>
          <div className="page-container">
            <div className="anim-newsletter" style={{ textAlign: "center", maxWidth: 540, margin: "0 auto", paddingBottom: 56 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#2d5a3d", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="22" height="17" viewBox="0 0 22 18" fill="none">
                  <path d="M1 1H21V17H1V1Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 1L11 10L21 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 26, color: "#0d1f0d", marginBottom: 10 }}>Stay Ahead with MoneyMati</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 28 }}>
                Get exclusive insights on Indian markets, fund analysis, and retirement<br />strategies delivered to your inbox every Sunday.
              </p>
              {subscribed ? (
                <div style={{ background: "#e6f4ec", borderRadius: 9999, padding: "14px 28px", fontFamily: "'Inter', sans-serif", color: "#2d5a3d", fontWeight: 700, fontSize: 14 }}>
                  ✅ You're subscribed! Check your inbox.
                </div>
              ) : (
                <div className="newsletter-row">
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
                  <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 20, color: "#0d1f0d", margin: 0 }}>Related Analysis</h2>
                </div>
                <a href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", textDecoration: "none", fontWeight: 500 }}>View all →</a>
              </div>

              <div className="related-grid">
                {relatedArticles.map((article, i) => (
                  <div key={i} className={`related-card anim-rel-card-${i + 1}`} style={{ cursor: "pointer" }}>
                    <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
                      <Image src={article.image} alt={article.title} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "16px 16px 20px" }}>
                      <a href="#" className="read-more-link" style={{ display: "block", marginBottom: 6 }}>{article.tag}</a>
                      <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: "#111", lineHeight: 1.4, margin: 0 }}>{article.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}