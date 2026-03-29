"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

const relatedArticles = [
  { tag: "READ MORE", image: "/blog-family.svg", title: "Family's Financial Goals", showTag: false },
  { tag: "READ MORE", image: "/blog-blackswan.svg", title: "How to deal with losses during black swan events?", showTag: true },
  { tag: "READ MORE", image: "/blog-nps.svg", title: "NPS: The Game Changer", showTag: true },
];

function Breadcrumb() {
  const router = useRouter();
  return (
    <nav className="breadcrumb anim-breadcrumb" style={{ marginBottom: "20px", display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <a href="/" onClick={e => { e.preventDefault(); router.push("/"); }}>Home</a><span>&gt;</span>
      <a href="/blog" onClick={e => { e.preventDefault(); router.push("/blog"); }}>Blog</a><span>&gt;</span>
      <a href="/blog/insurance" onClick={e => { e.preventDefault(); router.push("/blog/insurance"); }}>Insurance</a><span>&gt;</span>
      <span style={{ color: "#555", fontWeight: 400 }}>Mutual Funds: The Midas Touch for your Portfolio Problems with ULIPs in India</span>
    </nav>
  );
}

export default function ULIPsBlog() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      <Header />
      <div className="ulip-page" style={{ fontFamily: "'Inter', sans-serif", background: "#f5f3ee", minHeight: "100vh" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Dancing+Script:wght@700&family=Inter:wght@400;500;600;700;800&display=swap');

          .ulip-page * { box-sizing: border-box; }

          .breadcrumb a { color: #555; text-decoration: none; font-size: 13px; font-family: 'Inter', sans-serif; }
          .breadcrumb a:hover { text-decoration: underline; }
          .breadcrumb span { color: #555; font-size: 13px; font-family: 'Inter', sans-serif; margin: 0 4px; }

          .tag-pill { display: inline-block; background: #e8e6df; border-radius: 9999px; padding: 5px 14px; font-family: 'Inter', sans-serif; font-size: 13px; color: #444; margin-right: 8px; margin-bottom: 8px; font-weight: 500; }

          .newsletter-input { flex: 1; padding: 12px 18px; border-radius: 9999px; border: 1px solid #ddd; background: #fff; font-family: 'Inter', sans-serif; font-size: 14px; color: #333; outline: none; min-width: 0; }
          .newsletter-input::placeholder { color: #aaa; }

          .join-btn { background: #2d5a3d; color: #fff; border: none; border-radius: 9999px; padding: 12px 28px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; white-space: nowrap; }
          .join-btn:hover { background: #234a31; }

          .related-card { background: #fff; border-radius: 12px; overflow: hidden; }
          .read-more-link { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700; color: #2d8a5e; text-decoration: none; letter-spacing: 0.5px; text-transform: uppercase; }
          .read-more-link:hover { text-decoration: underline; }

          /* ✅ Reduced left/right padding from 48px → 24px */
          .page-container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

          .section-heading { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 20px; color: #0d1f0d; margin-bottom: 14px; margin-top: 36px; }
          .the-problem { font-family: 'Inter', sans-serif; font-size: 14px; color: #333; line-height: 1.85; margin-bottom: 16px; }
          .current-status { font-family: 'Inter', sans-serif; font-size: 14px; color: #333; line-height: 1.85; margin-bottom: 8px; }

          @keyframes fadeInUp  { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeIn    { from { opacity: 0; }                               to { opacity: 1; } }
          @keyframes scaleIn   { from { opacity: 0; transform: scale(0.95); }       to { opacity: 1; transform: scale(1); } }
          @keyframes cardIn    { from { opacity: 0; transform: translateY(24px); }  to { opacity: 1; transform: translateY(0); } }

          .anim-breadcrumb { animation: fadeIn   0.5s ease 0.1s  both; }
          .anim-badge      { animation: fadeIn   0.5s ease 0.2s  both; }
          .anim-title      { animation: fadeInUp 0.7s ease 0.25s both; }
          .anim-meta       { animation: fadeIn   0.5s ease 0.4s  both; }
          .anim-hero-img   { animation: scaleIn  0.8s ease 0.3s  both; }
          .anim-body       { animation: fadeInUp 0.6s ease 0.4s  both; }
          .anim-insight    { animation: fadeInUp 0.6s ease 0.5s  both; }
          .anim-quote      { animation: scaleIn  0.7s ease 0.55s both; }
          .anim-tags       { animation: fadeIn   0.6s ease 0.65s both; }
          .anim-newsletter { animation: scaleIn  0.7s ease 0.5s  both; }
          .anim-related-hd { animation: fadeInUp 0.6s ease 0.55s both; }
          .anim-rel-card-1 { animation: cardIn  0.6s ease 0.6s  both; }
          .anim-rel-card-2 { animation: cardIn  0.6s ease 0.7s  both; }
          .anim-rel-card-3 { animation: cardIn  0.6s ease 0.8s  both; }
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
            <h1 className="anim-title" style={{ marginBottom: 16, lineHeight: 1.15 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(36px,5vw,54px)", color: "#0d1f0d" }}>
                Problems with ULIPs in{" "}
              </span>
              <span style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: "clamp(36px,5vw,54px)", color: "#064E3B" }}>
                India
              </span>
            </h1>

            {/* Meta */}
            <div className="anim-meta" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: 32, fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#888" }}>
              <span>Oct 24, 2023</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#888", display: "inline-block" }} />
              <span>6 min read</span>
            </div>
          </div>
        </div>

        {/* ── Hero Image ── */}
        <div style={{ padding: "0 0 48px" }}>
          <div className="page-container">
            <div className="anim-hero-img" style={{ borderRadius: 16, overflow: "hidden", width: "100%", position: "relative", aspectRatio: "16/7" }}>
              <Image src="/Hero Section2.svg" alt="Problems with ULIPs in India" fill style={{ objectFit: "cover", objectPosition: "center" }} />
            </div>
          </div>
        </div>

        {/* ── Article Body ── */}
        <div style={{ paddingBottom: 8 }}>
          <div className="page-container">

            {/* Intro */}
            <p className="anim-body" style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#333", marginBottom: 32 }}>
              Unit Linked Insurance Plans (ULIPs) have historically faced criticism due to several issues that made them less appealing to investors. Here's a breakdown of the primary concerns and whether they've been addressed:
            </p>

            {/* Section 1 */}
            <h2 className="section-heading" style={{ marginTop: 0 }}>1. Low Return on Investment (ROI)</h2>
            <p className="the-problem">
              <strong>The Problem:</strong> Early ULIPs often delivered suboptimal returns due to high charges eating into the investment corpus. Additionally, the fund management quality and market-linked performance were not always competitive compared to mutual funds.
            </p>
            <p className="current-status">
              <strong>Current Status:</strong> Many modern ULIPs have improved their fund management strategies and offer competitive returns in equity and debt segments. However, returns still vary by policy and fund selection, and mutual funds typically provide better performance for similar market exposure.
            </p>

            {/* Section 2 */}
            <h2 className="section-heading">2. Lack of Portfolio Transparency</h2>
            <p className="the-problem">
              <strong>The Problem:</strong> Investors were often unaware of where their money was being invested. ULIP providers did not disclose detailed portfolio breakdowns or fund performance, leaving investors in the dark about their investments.
            </p>
            <p className="current-status">
              <strong>Current Status:</strong> The Insurance Regulatory and Development Authority of India (IRDAI) has mandated improved disclosure norms. Today, most insurers provide detailed fund performance reports and portfolio breakdowns on their websites, making ULIPs more transparent.
            </p>

            {/* Section 3 */}
            <h2 className="section-heading">3. High Premium Allocation Charges</h2>
            <p className="the-problem">
              <strong>The Problem:</strong> A significant portion of the premium in earlier ULIPs was allocated toward charges, including distribution costs, agent commissions, and other administrative fees. These could be as high as 20–40% in the initial years, drastically reducing the investable amount.
            </p>
            <p className="current-status" style={{ marginBottom: 32 }}>
              <strong>Current Status:</strong> IRDAI has capped premium allocation charges to ensure more of the investor's premium goes into the actual investment. Modern ULIPs typically have much lower charges, making them more cost-efficient.
            </p>

            {/* Insight / Highlight Card */}
            <div className="anim-insight" style={{ background: "#f0faf4", border: "1px solid #c3e6d0", borderLeft: "4px solid #11D462", borderRadius: "0 12px 12px 0", padding: "22px 28px", marginBottom: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 16 }}>⚡</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: "#0d1f0d" }}>Have These Issues Been Fully Sorted Out?</span>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: "#0d1f0d", marginBottom: 6 }}>Yes, because IRDAI has brought significant reforms:</p>
              <ul style={{ margin: "0 0 14px 0", padding: "0 0 0 20px" }}>
                {["Capped charges and made them more transparent.", "Mandated disclosures to improve investor confidence.", "Reduced penalties for surrendering policies."].map((item, i) => (
                  <li key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8 }}>{item}</li>
                ))}
              </ul>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: "#0d1f0d", marginBottom: 6 }}>No, because ULIPs still face inherent limitations:</p>
              <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
                {[
                  "Returns may not always match mutual funds due to fund management fees.",
                  "They remain less liquid compared to standalone investments like mutual funds.",
                  "Combining insurance and investment still dilutes the effectiveness of both.",
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8 }}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Section 4 */}
            <h2 className="section-heading" style={{ marginTop: 0 }}>4. Surrender and Withdrawal Charges</h2>
            <p className="the-problem">
              <strong>The Problem:</strong> Early withdrawal or surrender of a ULIP policy was heavily penalized. This discouraged liquidity and locked investors into long-term commitments, even if their financial needs changed.
            </p>
            <p className="current-status">
              <strong>Current Status:</strong> IRDAI reforms have significantly reduced surrender and withdrawal charges. ULIPs now come with a mandatory five-year lock-in period, but post this period, investors can withdraw without heavy penalties. However, liquidity remains a concern compared to mutual funds.
            </p>

            {/* Section 5 */}
            <h2 className="section-heading">5. Complexity of Charges</h2>
            <p className="the-problem">
              <strong>The Problem:</strong> ULIPs had a confusing structure of charges, including fund management fees, mortality charges, administration fees, and more. This complexity made it difficult for investors to understand the real cost of the product.
            </p>
            <p className="current-status">
              <strong>Current Status:</strong> Insurers have simplified ULIP charges, and many providers now offer "zero-commission" or "low-cost" ULIPs. IRDAI regulations also mandate clearer communication about all costs at the point of sale.
            </p>

            {/* Section 6 */}
            <h2 className="section-heading">6. Dual Nature: Insurance + Investment</h2>
            <p className="the-problem">
              <strong>The Problem:</strong> ULIPs tried to serve two purposes—insurance and investment—but often fell short on both. The life cover provided was inadequate, and the returns were not competitive.
            </p>
            <p className="current-status" style={{ marginBottom: 32 }}>
              <strong>Current Status:</strong> The debate continues. While ULIPs have become more competitive, separating insurance (term plans) and investment (mutual funds) is often recommended for better results.
            </p>

            {/* Quote block */}
            <div className="anim-quote" style={{ borderLeft: "3px solid #11D462", background: "#f8fdf9", borderRadius: "0 12px 12px 0", padding: "28px 36px", marginBottom: 32, textAlign: "center" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#333", margin: 0, fontStyle: "italic" }}>
                "💬 Would you like to explore a deeper analysis of ULIP charges or their comparison with mutual funds? Let me know!"
              </p>
            </div>

            {/* Bottom Line */}
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 16, color: "#0d1f0d", marginBottom: 10 }}>Bottom Line</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#333", marginBottom: 36 }}>
              ULIPs are now far more investor-friendly than they were a decade ago, but they still may not be the ideal product for everyone. For cost-efficient life cover, a term plan is better. For market-linked returns, mutual funds or other standalone investments provide better value.
            </p>

            {/* Tags */}
            <div className="anim-tags" style={{ marginBottom: 56 }}>
              {["#ULIPs", "#insurance", "#investing", "#financialplanning", "#mutualfunds", "#moneymati", "#wealthbuilding"].map(tag => (
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
                      {article.showTag && (
                        <a href="#" className="read-more-link" style={{ display: "block", marginBottom: 6 }}>{article.tag}</a>
                      )}
                      <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: "#111", lineHeight: 1.4, margin: 0 }}>{article.title}</h3>
                      {!article.showTag && (
                        <a href="#" className="read-more-link" style={{ display: "block", marginTop: 6 }}>{article.tag}</a>
                      )}
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