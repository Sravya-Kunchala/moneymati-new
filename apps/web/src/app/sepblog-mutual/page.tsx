"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

const relatedArticles = [
  { tag: "READ MORE", image: "/blog-family.svg", title: "Family's Financial Goals", showTag: false },
  { tag: "READ MORE", image: "/blog-blackswan.svg", title: "How to deal with losses during black swan events?", showTag: true },
  { tag: "READ MORE", image: "/blog-ulips.svg", title: "Problem with ULIPs", showTag: true },
];

function Breadcrumb() {
  const router = useRouter();
  return (
    <nav className="breadcrumb anim-breadcrumb" style={{ marginBottom: "20px", display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <a href="/" onClick={e => { e.preventDefault(); router.push("/"); }}>Home</a><span>&gt;</span>
      <a href="/blog" onClick={e => { e.preventDefault(); router.push("/blog"); }}>Blog</a><span>&gt;</span>
      <a href="/blog/investing" onClick={e => { e.preventDefault(); router.push("/blog/investing"); }}>Investing</a><span>&gt;</span>
      <span style={{ color: "#555", fontWeight: 400 }}>Mutual Funds: The Midas Touch for your Portfolio</span>
    </nav>
  );
}

export default function MutualFundsMidas() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      <Header />
      <div className="mfm-page" style={{ fontFamily: "'Inter', sans-serif", background: "#f5f3ee", minHeight: "100vh" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Dancing+Script:wght@700&family=Inter:wght@400;500;600;700;800&display=swap');

          .mfm-page * { box-sizing: border-box; }

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

          .page-container { max-width: 1100px; margin: 0 auto; padding: 0 48px; }

          @keyframes fadeInUp   { from { opacity: 0; transform: translateY(40px); }  to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeIn     { from { opacity: 0; }                                to { opacity: 1; } }
          @keyframes scaleIn    { from { opacity: 0; transform: scale(0.95); }        to { opacity: 1; transform: scale(1); } }
          @keyframes cardIn     { from { opacity: 0; transform: translateY(24px); }   to { opacity: 1; transform: translateY(0); } }

          .anim-breadcrumb { animation: fadeIn    0.5s ease 0.1s  both; }
          .anim-badge      { animation: fadeIn    0.5s ease 0.2s  both; }
          .anim-title      { animation: fadeInUp  0.7s ease 0.25s both; }
          .anim-meta       { animation: fadeIn    0.5s ease 0.4s  both; }
          .anim-hero-img   { animation: scaleIn   0.8s ease 0.3s  both; }
          .anim-body       { animation: fadeInUp  0.6s ease 0.4s  both; }
          .anim-insight    { animation: fadeInUp  0.6s ease 0.5s  both; }
          .anim-section    { animation: fadeInUp  0.6s ease 0.55s both; }
          .anim-quote      { animation: scaleIn   0.7s ease 0.6s  both; }
          .anim-tags       { animation: fadeIn    0.6s ease 0.65s both; }
          .anim-newsletter { animation: scaleIn   0.7s ease 0.5s  both; }
          .anim-related-hd { animation: fadeInUp  0.6s ease 0.55s both; }
          .anim-rel-card-1 { animation: cardIn   0.6s ease 0.6s  both; }
          .anim-rel-card-2 { animation: cardIn   0.6s ease 0.7s  both; }
          .anim-rel-card-3 { animation: cardIn   0.6s ease 0.8s  both; }
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
                Mutual Funds:
              </span>
              {" "}
              <span style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: "clamp(36px,5vw,54px)", color: "#064E3B" }}>
                The Midas touch for your Portfolio
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
            <div className="anim-hero-img" style={{ borderRadius: 16, overflow: "hidden", width: "100%", background: "transparent", position: "relative", aspectRatio: "16/7" }}>
              <Image src="/Hero Section2.svg" alt="Mutual Funds Investment" fill style={{ objectFit: "cover", objectPosition: "center" }} />
            </div>
          </div>
        </div>

        {/* ── Article Body ── */}
        <div style={{ paddingBottom: 8 }}>
          <div className="page-container">

            {/* Subtitle line */}
            <p className="anim-body" style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#222", marginBottom: 20 }}>
              Add the midas touch to your portfolio 🌟
            </p>

            {/* Intro paragraphs */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#333", marginBottom: 20 }}>
              As the founder of Moneymati, I've seen firsthand how a well-structured asset allocation strategy can be the game-changer in building wealth. It's not just about chasing returns—it's about balancing growth, stability, and risk.
            </p>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#333", marginBottom: 28 }}>
              A 50 debt and 50 equity asset allocation is subject to higher volatility as shown over a 10 year period. A 60 equity, 40 debt fund as internationally accepted too has shown moderate returns.
            </p>

            {/* Gold Insight Card */}
            <div className="anim-insight" style={{ background: "#f0faf4", border: "1px solid #c3e6d0", borderRadius: 12, padding: "22px 28px", marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 16 }}>⚡</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: "#0d1f0d" }}>The 10% Gold Insight</span>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#333", lineHeight: 1.8, margin: 0 }}>
                One powerful insight we've observed over the last decade: adding just <strong>10% gold</strong> to a diversified portfolio can enhance overall returns by at least <strong>15%</strong>.
              </p>
            </div>

            {/* Enhanced Returns section */}
            <h2 className="anim-section" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 22, color: "#0d1f0d", marginBottom: 14 }}>
              Enhanced Returns
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#333", marginBottom: 32 }}>
              Historical data consistently shows that gold can boost portfolio performance while reducing drawdowns. It acts as a stabilizer when equity markets face turbulence, providing that essential "Midas Touch" that protects and grows your wealth simultaneously.
            </p>

            {/* Quote block */}
            <div className="anim-quote" style={{ borderLeft: "3px solid #11D462", background: "#f8fdf9", borderRadius: "0 12px 12px 0", padding: "28px 36px", marginBottom: 36, textAlign: "center" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: "#333", margin: 0, fontStyle: "italic" }}>
                "💬 I'd love to hear your thoughts! Have you experienced the magic of diversification<br />in your investments?"
              </p>
            </div>

            {/* Closing bold line */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, fontWeight: 700, color: "#0d1f0d", marginBottom: 36 }}>
              Follow Moneymati for more updates on strategic asset allocation, wealth preservation, and staying resilient in volatile markets.
            </p>

            {/* Tags */}
            <div className="anim-tags" style={{ marginBottom: 56 }}>
              {["#mutualfunds", "#assetallocation", "#investing", "#goldinvestment", "#financialplanning", "#moneymati", "#wealthbuilding"].map(tag => (
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