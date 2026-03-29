"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

const relatedArticles = [
  { tag: "READ MORE", image: "/blog-family.svg", title: "ELSS vs PPF: Which Tax Saver Wins in 2024?" },
  { tag: "READ MORE", image: "/blog-blackswan.svg", title: "NPS: The Ultimate Retirement & Tax Saving Tool" },
  { tag: "READ MORE", image: "/blog-ulips.svg", title: "Old vs New Tax Regime: Which Should You Choose?" },
];

function Breadcrumb() {
  const router = useRouter();
  return (
    <nav className="breadcrumb anim-breadcrumb" style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
      <a href="/" onClick={e => { e.preventDefault(); router.push("/"); }}>Home</a><span>&gt;</span>
      <a href="/blog" onClick={e => { e.preventDefault(); router.push("/blog"); }}>Blog</a><span>&gt;</span>
      <a href="/blog/business" onClick={e => { e.preventDefault(); router.push("/blog/business"); }}>Business</a><span>&gt;</span>
      <span style={{ color: "#555", fontWeight: 400 }}>Tax Saving Strategies</span>
    </nav>
  );
}

export default function TaxSavingStrategies() {
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

          .page-container { max-width: 1100px; margin: 0 auto; padding: 0 48px; }

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
          .anim-body-p2    { animation: fadeInUp     0.6s ease 0.5s  both; }
          .anim-cost-title { animation: fadeInUp     0.6s ease 0.5s  both; }
          .anim-cost-p     { animation: fadeInUp     0.6s ease 0.55s both; }
          .anim-cost-cards { animation: fadeInUp     0.6s ease 0.6s  both; }
          .anim-flex-title { animation: fadeInUp     0.6s ease 0.6s  both; }
          .anim-flex-p1    { animation: fadeInUp     0.6s ease 0.65s both; }
          .anim-flex-p2    { animation: fadeInUp     0.6s ease 0.7s  both; }
          .anim-tags       { animation: fadeIn       0.6s ease 0.75s both; }
          .anim-newsletter { animation: scaleIn      0.7s ease 0.5s  both; }
          .anim-related-hd { animation: fadeInUp    0.6s ease 0.55s both; }
          .anim-rel-card-1 { animation: cardIn      0.6s ease 0.6s  both; }
          .anim-rel-card-2 { animation: cardIn      0.6s ease 0.7s  both; }
          .anim-rel-card-3 { animation: cardIn      0.6s ease 0.8s  both; }
        `}</style>

        {/* ── Breadcrumb + Title ── */}
        <div style={{ background: "#f5f3ee", padding: "40px 0 0" }}>
          <div className="page-container">
            <Breadcrumb />

            {/* Badge */}
            <div className="anim-badge" style={{ display: "inline-block", background: "rgba(6,78,59,0.10)", border: "1px solid rgba(6,78,59,0.15)", borderRadius: 9999, padding: "4px 12px", marginBottom: 18, fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: "#064E3B", letterSpacing: "0.8px", textTransform: "uppercase" }}>
              Featured Article
            </div>

            {/* Title */}
            <h1 className="anim-title" style={{ marginBottom: 16, lineHeight: 1.1 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(36px,5vw,54px)", color: "#0d1f0d" }}>
                Smart Tax Saving Strategies:
              </span>
              <br />
              <span style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: "clamp(36px,5vw,54px)", color: "#064E3B" }}>
                How We Legally Kept More of What We Earned
              </span>
            </h1>

            {/* Meta */}
            <div className="anim-meta" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: 32, fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#888" }}>
              <span>Mar 10, 2024</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#888", display: "inline-block" }} />
              <span>7 min read</span>
            </div>
          </div>
        </div>

        {/* ── Hero Image ── */}
        <div style={{ padding: "0 0 48px" }}>
          <div className="page-container">
            <div className="anim-hero-img" style={{ borderRadius: 16, overflow: "hidden", width: "100%", background: "transparent", position: "relative", aspectRatio: "16/7" }}>
              <Image src="/Hero Section1.svg" alt="Couple planning their tax savings" fill style={{ objectFit: "cover", objectPosition: "center" }} />
            </div>
          </div>
        </div>

        {/* ── Article Body ── */}
        <div style={{ paddingBottom: 8 }}>
          <div className="page-container">

            {/* Intro */}
            <p className="anim-body-p1" style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#222", marginBottom: 28 }}>
              Reducing your tax liability legally requires a combination of timely planning, smart instrument selection, and knowing which deductions apply to you. Here's a tailored approach for Indian salaried and self-employed individuals:
            </p>

            {/* Section 1 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>1. Maximise Section 80C (Up to ₹1.5 Lakh)</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 6 }}>
              <strong>ELSS Mutual Funds:</strong> Equity Linked Saving Schemes offer the shortest lock-in period (3 years) among all 80C instruments, with the potential for equity-linked returns. Ideal for investors comfortable with market-linked growth.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 28 }}>
              <strong>PPF & EPF:</strong> Public Provident Fund offers government-backed, tax-free returns over 15 years. EPF contributions by both employer and employee are eligible under 80C — a reliable anchor for your deduction basket.
            </p>

            {/* Section 2 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>2. Go Beyond 80C — Use Other Deductions</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 6 }}>
              <strong>Section 80D — Health Insurance:</strong> Claim up to ₹25,000 for self/family premiums and an additional ₹25,000–₹50,000 for parents (depending on their age). A family floater policy covering parents can unlock ₹75,000+ in deductions.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 28 }}>
              <strong>Section 24(b) — Home Loan Interest:</strong> Deduct up to ₹2 lakh per year on interest paid for a self-occupied property. For let-out properties, there's no upper limit on interest deduction — a significant benefit for real estate investors.
            </p>

            {/* Section 3 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>3. Choose the Right Tax Regime</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 6 }}>
              <strong>Old Regime:</strong> Better if you have significant deductions — HRA, home loan interest, 80C, 80D, LTA. The more exemptions and deductions you claim, the more you save under this regime.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 28 }}>
              <strong>New Regime:</strong> Simpler with lower slab rates, but most exemptions are removed. Suits those with fewer deductions or those who prefer simplicity over optimisation. Always compare both before filing.
            </p>

            {/* Core Strategies highlight box */}
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
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: "#111" }}>Quick Win Strategies</span>
              </div>
              {[
                { label: "Start SIPs in April", desc: "Spread 80C investments over 12 months via SIPs for better returns and no year-end rush." },
                { label: "NPS Booster", desc: "Contribute ₹50,000 to NPS for an additional deduction under Section 80CCD(1B) over and above the ₹1.5L 80C limit." },
                { label: "Salary Restructuring", desc: "Include LTA, food allowance, and phone reimbursements in your CTC to reduce taxable income legally." },
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
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>5. Learn from Past Mistakes</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 6 }}>
              <strong>Review Last Year's ITR:</strong> Did you miss any deductions — HRA, 80D, home loan interest, or education loan interest under 80E? Use last year's filing as a checklist to close gaps this year.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 28 }}>
              <strong>Track Capital Gains:</strong> If you redeemed mutual funds or sold stocks, plan your tax-loss harvesting. Offset short-term gains with realised losses under the Income Tax Act, 1961 to reduce your net tax liability.
            </p>

            {/* Section 6 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>6. Hedge with Tax-Efficient Instruments</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 28 }}>
              Consider Sovereign Gold Bonds (SGBs) — they offer interest income (taxable) but capital gains on maturity are fully exempt from tax. Similarly, debt mutual funds held for the right duration can offer better post-tax returns than traditional fixed deposits, especially for those in the 30% tax bracket.
            </p>

            {/* Section 7 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>7. Consult a Tax Advisor</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 28 }}>
              A qualified CA or tax consultant can help identify deductions specific to your income profile — especially for business owners, freelancers, or those with rental income or capital gains from multiple sources. One session can often save far more than the consultation fee.
            </p>

            {/* Section 8 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>8. Stay Updated on Tax Rule Changes</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 24 }}>
              India's tax landscape changes with every Union Budget. Monitor announcements on slab revisions, new deduction limits, surcharge changes, and LTCG rules. For example, the introduction of the New Tax Regime as default in FY 2023-24 changed the math for millions of taxpayers overnight.
            </p>

            {/* Two example highlight cards */}
            <div className="anim-cost-cards" style={{ display: "flex", gap: 20, marginBottom: 36 }}>
              <div className="two-col-card">
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 11, color: "#064E3B", marginBottom: 10, letterSpacing: "1.2px", textTransform: "uppercase" }}>ELSS vs PPF (FY 2023-24)</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0 }}>
                  Investors who chose <strong>ELSS</strong> over PPF saw average returns of 18–22% during the equity bull run of 2023, while enjoying the same ₹1.5L deduction under 80C — with a shorter 3-year lock-in.
                </p>
              </div>
              <div className="two-col-card">
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 11, color: "#D4A843", marginBottom: 10, letterSpacing: "1.2px", textTransform: "uppercase" }}>NPS EXTRA BENEFIT</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0 }}>
                  Investors who contributed ₹50,000 to NPS under 80CCD(1B) saved an additional ₹15,000 in taxes (at the 30% slab) — over and above the ₹1.5L 80C limit — turning retirement planning into an immediate tax win.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: "#0d1f0d", marginBottom: 10 }}>10. Build an Emergency Fund First</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 28 }}>
              Ensure you have 6–12 months' worth of expenses in a liquid fund before locking money into tax-saving instruments with long lock-in periods. Redeeming ELSS or PPF prematurely to meet emergencies defeats the purpose of disciplined tax planning.
            </p>

            {/* Closing bold line */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, fontWeight: 700, color: "#064E3B", marginBottom: 36 }}>
              Follow Moneymati for more updates on tax planning, wealth preservation, and staying financially resilient in every market condition.
            </p>

            {/* Tags */}
            <div className="anim-tags" style={{ marginBottom: 56 }}>
              {["#taxplanning", "#section80C", "#investing", "#elss", "#financialplanning", "#moneymati", "#wealthpreservation"].map(tag => (
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
                  <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 20, color: "#0d1f0d", margin: 0 }}>Related Analysis</h2>
                </div>
                <a href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", textDecoration: "none", fontWeight: 500 }}>View all →</a>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
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