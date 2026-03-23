"use client";

import React, { useState } from "react";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-dm-sans" });

interface Article {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
}

interface Contributor {
  name: string;
  role: string;
  avatar: string;
}

const articles: Article[] = [
  { id: 1, image: "/financial-goals.svg", title: "Family's Financial Goals", excerpt: "As a hashtag #couple we have some mandatory financial goals as a family and some individual goals...", author: "Amit Sharma", readTime: "5 min read" },
  { id: 2, image: "/black-swan.svg", title: "How to deal with losses during black swan events?", excerpt: "Dealing with substantial portfolio losses during a black swan event requires a combination of emotion...", author: "Priya Kapur", readTime: "8 min read" },
  { id: 3, image: "/midas.svg", title: "The midas touch for your portfolio", excerpt: "Add the midas touch to your portfolio 🌟 As the founder of Moneymati, I've seen firsthand how a we...", author: "Rajesh V.", readTime: "6 min read" },
  { id: 4, image: "/ulips.svg", title: "Problems with ULIPs in India", excerpt: "Unit Linked Insurance Plans (ULIPs) have historically faced criticism due to several issues that made them...", author: "Sarah M.", readTime: "10 min read" },
];

const tags = ["Mutual Funds", "Family", "Risk Migration", "Retirement", "NPS", "MoneyMati", "SmartWomenInvest", "Budgeting"];

const contributors: Contributor[] = [
  { name: "Dr. Naveen Kumar", role: "CFA, Wealth Strategist", avatar: "/naveen.svg" },
  { name: "Ananya Deshpande", role: "Women Entrepreneur", avatar: "/ananya.svg" },
];

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
  <div
    style={{ backgroundColor: "#ffffff", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s ease, transform 0.2s ease", cursor: "pointer", position: "relative", zIndex: 1, isolation: "isolate" }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.10)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
  >
    <div style={{ position: "relative", width: "100%", height: "180px", backgroundColor: "#e2e8f0" }}>
      <Image src={article.image} alt={article.title} fill style={{ objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      <div style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "rgba(255,255,255,0.92)", borderRadius: "6px", padding: "4px 10px" }}>
        <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.5px", color: "#1a1a1a", textTransform: "uppercase" }}>Read More</span>
      </div>
    </div>
    <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
      <h3 style={{ margin: 0, fontSize: "18px", lineHeight: "24px", fontWeight: 700, color: "#1a1a1a", fontFamily: "var(--font-playfair), serif" }}>{article.title}</h3>
      <p style={{ margin: 0, fontSize: "13px", lineHeight: "20px", color: "#64748b", fontWeight: 400, fontFamily: "var(--font-dm-sans), sans-serif" }}>{article.excerpt}</p>
      <div style={{ marginTop: "auto", paddingTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ backgroundColor: "#11D4621A", borderRadius: "4px", padding: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.66667 4.66667C4.025 4.66667 3.47569 4.43819 3.01875 3.98125C2.56181 3.52431 2.33333 2.975 2.33333 2.33333C2.33333 1.69167 2.56181 1.14236 3.01875 0.685417C3.47569 0.228472 4.025 0 4.66667 0C5.30833 0 5.85764 0.228472 6.31458 0.685417C6.77153 1.14236 7 1.69167 7 2.33333C7 2.975 6.77153 3.52431 6.31458 3.98125C5.85764 4.43819 5.30833 4.66667 4.66667 4.66667ZM0 9.33333V7.7C0 7.36944 0.0850694 7.06563 0.255208 6.78854C0.425347 6.51146 0.651389 6.3 0.933333 6.15417C1.53611 5.85278 2.14861 5.62674 2.77083 5.47604C3.39306 5.32535 4.025 5.25 4.66667 5.25C5.30833 5.25 5.94028 5.32535 6.5625 5.47604C7.18472 5.62674 7.79722 5.85278 8.4 6.15417C8.68194 6.3 8.90799 6.51146 9.07812 6.78854C9.24826 7.06563 9.33333 7.36944 9.33333 7.7V9.33333H0ZM1.16667 8.16667H8.16667V7.7C8.16667 7.59306 8.13993 7.49583 8.08646 7.40833C8.03299 7.32083 7.9625 7.25278 7.875 7.20417C7.35 6.94167 6.82014 6.74479 6.28542 6.61354C5.75069 6.48229 5.21111 6.41667 4.66667 6.41667C4.12222 6.41667 3.58264 6.48229 3.04792 6.61354C2.51319 6.74479 1.98333 6.94167 1.45833 7.20417C1.37083 7.25278 1.30035 7.32083 1.24688 7.40833C1.1934 7.49583 1.16667 7.59306 1.16667 7.7V8.16667ZM4.66667 3.5C4.9875 3.5 5.26215 3.38576 5.49062 3.15729C5.7191 2.92882 5.83333 2.65417 5.83333 2.33333C5.83333 2.0125 5.7191 1.73785 5.49062 1.50937C5.26215 1.2809 4.9875 1.16667 4.66667 1.16667C4.34583 1.16667 4.07118 1.2809 3.84271 1.50937C3.61424 1.73785 3.5 2.0125 3.5 2.33333C3.5 2.65417 3.61424 2.92882 3.84271 3.15729C4.07118 3.38576 4.34583 3.5 4.66667 3.5Z" fill="#11D462"/>
            </svg>
          </div>
          <span style={{ fontSize: "13px", color: "#475569", fontWeight: 500, fontFamily: "var(--font-dm-sans), sans-serif" }}>{article.author}</span>
        </div>
        <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 400, fontFamily: "var(--font-dm-sans), sans-serif" }}>{article.readTime}</span>
      </div>
    </div>
  </div>
);

const WeeklyDigest: React.FC = () => {
  const [email, setEmail] = useState("");
  return (
    <div style={{ backgroundColor: "rgba(240, 247, 244, 0.75)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#004D40", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="22,6 12,13 2,6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <h3 style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: 700, color: "#1a1a1a", fontFamily: "var(--font-playfair), serif" }}>Join the Weekly Digest</h3>
        <p style={{ margin: 0, fontSize: "13px", lineHeight: "20px", color: "#64748b", fontFamily: "var(--font-dm-sans), sans-serif" }}>Get expert financial tips and market insights delivered straight to your inbox every Monday.</p>
      </div>
      <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "rgba(255,255,255,0.8)", fontSize: "14px", color: "#1a1a1a", outline: "none", boxSizing: "border-box", fontFamily: "var(--font-dm-sans), sans-serif" }} />
      <button style={{ width: "100%", padding: "14px", borderRadius: "40px", backgroundColor: "#004D40", border: "none", cursor: "pointer", fontSize: "15px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.2px", fontFamily: "var(--font-dm-sans), sans-serif" }}>Subscribe Now</button>
      <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8", textAlign: "center", fontFamily: "var(--font-dm-sans), sans-serif" }}>We respect your privacy. Unsubscribe at any time.</p>
    </div>
  );
};

const PopularTags: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "14px", backgroundColor: "#f5f0e8", paddingTop: "4px", position: "relative", zIndex: 5, isolation: "isolate" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H13C13.3167 0 13.6167 0.0708333 13.9 0.2125C14.1833 0.354167 14.4167 0.55 14.6 0.8L20 8L14.6 15.2C14.4167 15.45 14.1833 15.6458 13.9 15.7875C13.6167 15.9292 13.3167 16 13 16H2ZM2 14H13L17.5 8L13 2H2V14Z" fill="#11D462"/>
      </svg>
      <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#1a1a1a", fontFamily: "var(--font-playfair), serif" }}>Popular Tags</h3>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {tags.map((tag) => (
        <span key={tag} style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", fontWeight: 500, color: "#475569", cursor: "pointer", backgroundColor: "#F1F5F9", transition: "all 0.15s ease", fontFamily: "var(--font-dm-sans), sans-serif" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.backgroundColor = "#004D40"; (e.currentTarget as HTMLSpanElement).style.color = "#ffffff"; (e.currentTarget as HTMLSpanElement).style.borderColor = "#004D40"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.backgroundColor = "#F1F5F9"; (e.currentTarget as HTMLSpanElement).style.color = "#475569"; (e.currentTarget as HTMLSpanElement).style.borderColor = "#e2e8f0"; }}
        >{tag}</span>
      ))}
    </div>
  </div>
);

const ExpertContributors: React.FC = () => (
  <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: 5, isolation: "isolate" }}>
    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#1a1a1a", fontFamily: "var(--font-playfair), serif" }}>Expert Contributors</h3>
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {contributors.map((c) => (
        <div key={c.name} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "#e2e8f0", overflow: "hidden", flexShrink: 0, position: "relative" }}>
            <Image src={c.avatar} alt={c.name} fill style={{ objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", fontFamily: "var(--font-dm-sans), sans-serif" }}>{c.name}</div>
            <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 400, fontFamily: "var(--font-dm-sans), sans-serif" }}>{c.role}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Pagination: React.FC<{ current: number; total: number; onChange: (p: number) => void }> = ({ current, total, onChange }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", paddingTop: "8px" }}>
    <button onClick={() => onChange(Math.max(1, current - 1))} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #e2e8f0", backgroundColor: "#fff", cursor: "pointer", fontSize: "16px", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
    {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
      <button key={p} onClick={() => onChange(p)} style={{ width: "36px", height: "36px", borderRadius: "50%", border: current === p ? "none" : "1px solid #e2e8f0", backgroundColor: current === p ? "#004D40" : "#fff", cursor: "pointer", fontSize: "14px", fontWeight: 600, color: current === p ? "#fff" : "#475569", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-dm-sans), sans-serif" }}>{p}</button>
    ))}
    <button onClick={() => onChange(Math.min(total, current + 1))} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #e2e8f0", backgroundColor: "#fff", cursor: "pointer", fontSize: "16px", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
  </div>
);

export default function LatestArticles() {
  const [page, setPage] = useState(1);

  return (
    <section
      className={`${playfair.variable} ${dmSans.variable}`}
      style={{ backgroundColor: "#f5f0e8", padding: "48px 40px", position: "relative", overflow: "hidden" }}
    >
      {/* Decorative SVGs — zIndex 0, behind everything */}
      <div style={{ position: "absolute", top: "200px", left: "50%", transform: "translateX(-50%)", zIndex: 0, opacity: 0.6, pointerEvents: "none", display: "flex" }}>
        <svg width="965" height="306" viewBox="0 0 965 306" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 305.5C15.4354 299.924 31.8263 293.98 47.2054 288.444C190.536 236.862 333.766 186.541 477.968 138.103C622.177 90.5243 766.394 40.9642 914.866 7.55337C930.335 4.39589 948.679 1.0486 964.5 0C948.674 0.982021 930.312 4.26774 914.829 7.36718C766.199 40.2597 621.867 89.5736 477.65 137.155C333.437 185.597 190.289 236.175 47.1406 288.266C31.7818 293.858 15.4126 299.861 0 305.5Z" fill="#677E73"/>
        </svg>
        <svg width="965" height="306" viewBox="0 0 965 306" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "-800px" }}>
          <path d="M0 305.5C15.4354 299.924 31.8263 293.98 47.2054 288.444C190.536 236.862 333.766 186.541 477.968 138.103C622.177 90.5243 766.394 40.9642 914.866 7.55337C930.335 4.39589 948.679 1.0486 964.5 0C948.674 0.982021 930.312 4.26774 914.829 7.36718C766.199 40.2597 621.867 89.5736 477.65 137.155C333.437 185.597 190.289 236.175 47.1406 288.266C31.7818 293.858 15.4126 299.861 0 305.5Z" fill="#677E73"/>
        </svg>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 300px", gap: "24px", alignItems: "start" }}>
          {/* Article cards column — isolation creates new stacking context, blocks lines */}
          <div style={{ gridColumn: "1 / 3", display: "flex", flexDirection: "column", gap: "20px", position: "relative", zIndex: 1, isolation: "isolate", backgroundColor: "#f5f0e8" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ margin: 0, fontSize: "28px", fontWeight: 900, color: "#1a1a1a", fontFamily: "var(--font-playfair), serif" }}>Latest Articles</h2>
              <a href="#" style={{ fontSize: "14px", fontWeight: 600, color: "#475569", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                View All
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Sidebar — no isolation so lines show through WeeklyDigest */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <WeeklyDigest />
            <PopularTags />
            <ExpertContributors />
          </div>
        </div>
        <Pagination current={page} total={3} onChange={setPage} />
      </div>
    </section>
  );
}