"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
interface Chapter { page: number; title: string; description: string; image: string; }
interface Guide { tag: string; tagColor: string; image: string; title: string; description: string; category: string; }

const chapters: Chapter[] = [
  { page: 1, title: "Chapter 1: The Early Bird Advantage", description: "Why starting your investment journey even 5 years earlier can transform your retirement corpus by millions.", image: "/ebook-chapter1.svg" },
  { page: 2, title: "Chapter 2: The Magic of Compounding", description: "Einstein called it the eighth wonder of the world. Those who understand it, earn it; those who don't, pay it. Let's dive into how early starts multiply wealth exponentially over decades.", image: "/ebook-chapter1.svg" },
  { page: 3, title: "Chapter 3: Building Your SIP Strategy", description: "A step-by-step guide to setting up systematic investment plans that align with your life goals and risk appetite.", image: "/ebook-chapter1.svg" },
];

const moreGuides: Guide[] = [
  { tag: "Festive Edition", tagColor: "#C8972A", image: "/guide-navaratri.svg", title: "Navratri Financial Empowerment", description: "9 days of specific steps to clean your portfolio and invite prosperity.", category: "FESTIVE EDITION" },
  { tag: "Strategy", tagColor: "#11D462", image: "/guide-investing-mistakes.svg", title: "5 Investing Mistakes to Avoid", description: "Stop losing money on amateur traps. Learn what the top 1% never do.", category: "STRATEGY" },
  { tag: "Basics", tagColor: "#11D462", image: "/guide-govt-schems.svg", title: "Top Government Saving Schemes", description: "Detailed comparison of PPF, SSY, and SCSS for risk-free long-term wealth accumulation.", category: "BASICS" },
];

const features = [
  { title: "Growth Mindset", description: "Learn to identify high-yield opportunities in emerging markets." },
  { title: "Risk Mitigation", description: "How to diversify your portfolio to weather economic storms." },
  { title: "Savings Hacks", description: "Automate your finances to save 30% more without effort." },
  { title: "Long-term Vision", description: "Mapping out your 5, 10, and 20-year financial milestones." },
];

function FeatureIcon({ index }: { index: number }) {
  const s = { width: 18, height: 18, stroke: "#064E3B", strokeWidth: 2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (index === 0) return <svg viewBox="0 0 24 24" {...s}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
  if (index === 1) return <svg viewBox="0 0 24 24" {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
  if (index === 2) return (
    <svg width="20" height="19" viewBox="0 0 20 19" fill="none"><path d="M14 9C14.2833 9 14.5208 8.90417 14.7125 8.7125C14.9042 8.52083 15 8.28333 15 8C15 7.71667 14.9042 7.47917 14.7125 7.2875C14.5208 7.09583 14.2833 7 14 7C13.7167 7 13.4792 7.09583 13.2875 7.2875C13.0958 7.47917 13 7.71667 13 8C13 8.28333 13.0958 8.52083 13.2875 8.7125C13.4792 8.90417 13.7167 9 14 9ZM6 7H11V5H6V7ZM2.5 19C1.93333 17.1 1.375 15.2042 0.825 13.3125C0.275 11.4208 0 9.48333 0 7.5C0 5.96667 0.533333 4.66667 1.6 3.6C2.66667 2.53333 3.96667 2 5.5 2H10.5C10.9833 1.36667 11.5708 0.875 12.2625 0.525C12.9542 0.175 13.7 0 14.5 0C14.9167 0 15.2708 0.145833 15.5625 0.4375C15.8542 0.729167 16 1.08333 16 1.5C16 1.6 15.9875 1.7 15.9625 1.8C15.9375 1.9 15.9083 1.99167 15.875 2.075C15.8083 2.25833 15.7458 2.44583 15.6875 2.6375C15.6292 2.82917 15.5833 3.025 15.55 3.225L17.825 5.5H20V12.475L17.175 13.4L15.5 19H10V17H8V19H2.5ZM4 17H6V15H12V17H14L15.55 11.85L18 11.025V7.5H17L13.5 4C13.5 3.66667 13.5208 3.34583 13.5625 3.0375C13.6042 2.72917 13.6667 2.41667 13.75 2.1C13.2667 2.23333 12.8417 2.4625 12.475 2.7875C12.1083 3.1125 11.8417 3.51667 11.675 4H5.5C4.53333 4 3.70833 4.34167 3.025 5.025C2.34167 5.70833 2 6.53333 2 7.5C2 9.13333 2.225 10.7292 2.675 12.2875C3.125 13.8458 3.56667 15.4167 4 17Z" fill="#064E3B"/></svg>
  );
  return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}

const toolbarBtnStyle: React.CSSProperties = {
  background: "none", border: "none", color: "rgba(255,255,255,0.65)", cursor: "pointer",
  fontSize: "13px", fontFamily: "var(--font-body)", padding: "6px 8px",
  display: "flex", alignItems: "center", justifyContent: "center",
};

function Breadcrumb() {
  const router = useRouter();
  return (
    <nav className="anim-breadcrumb" style={{ marginBottom: "24px" }}>
      <span
  onClick={() => router.push("/")}
  style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", fontFamily: "var(--font-body)", cursor: "pointer" }}
>
  Home
</span>
<span style={{ color: "rgba(255,255,255,0.35)", margin: "0 6px", fontSize: "13px" }}>›</span>
<span
  onClick={() => router.push("/e-book")}
  style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", fontFamily: "var(--font-body)", cursor: "pointer" }}
>
  E-Books
</span>
      <span style={{ color: "rgba(255,255,255,0.35)", margin: "0 6px", fontSize: "13px" }}>›</span>
      <span style={{ color: "#D4A843", fontSize: "13px", fontFamily: "var(--font-body)", fontWeight: 500 }}>Start Early, Be Wealthy!</span>
    </nav>
  );
}

function HeroSection() {
  return (
    <section style={{ background: "linear-gradient(160deg, #064E3B 0%, #0A2E24 50%, #064E3B 100%)", padding: "64px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-60px", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(17,212,98,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Breadcrumb />
        <h1 className="anim-hero-title" style={{ margin: "0 0 16px", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "48px", lineHeight: "48px", letterSpacing: "-1.2px", color: "#ffffff", fontWeight: 800 }}>
          Start Early,{" "}
          <span style={{ color: "#D4A843", fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: "48px", lineHeight: "48px", letterSpacing: "-1.2px" }}>Be Wealthy!</span>
        </h1>
        <p className="anim-hero-sub" style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 500, lineHeight: "29.25px", color: "rgba(255,255,255,0.70)", maxWidth: "631px" }}>
          A comprehensive blueprint for financial freedom, designed for the modern investor looking to harness the power of compounding.
        </p>
      </div>
    </section>
  );
}

function BookViewer() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const chapter = chapters[currentChapter];
  return (
    <section style={{ background: "linear-gradient(180deg, #064E3B 0%, #0A2E24 100%)", padding: "48px 80px 64px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <div className="anim-book" style={{ position: "relative", width: "100%", maxWidth: "1000px", boxSizing: "border-box" as const }}>
        <div style={{ width: "100%", background: "#ffffff", borderRadius: "16px", overflow: "visible", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "580px", boxShadow: "0 32px 80px rgba(0,0,0,0.45)", position: "relative" }}>
          <div style={{ padding: "36px 32px", borderRight: "1px solid #e8e8e8", display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center", borderRadius: "16px 0 0 16px", background: "#fff", overflow: "hidden" }}>
            <p style={{ fontSize: "11px", color: "#999", textAlign: "center", marginBottom: "8px", fontFamily: "var(--font-body)" }}>Page {currentChapter + 1}</p>
            {[80, 100, 65, 90, 55].map((w, i) => (<div key={i} style={{ height: "10px", width: `${w}%`, backgroundColor: "#e8e8e8", borderRadius: "4px" }} />))}
          </div>
          <div style={{ padding: "28px 28px 24px", display: "flex", flexDirection: "column", gap: "12px", borderRadius: "0 16px 16px 0", background: "#fff", overflow: "hidden" }}>
            <div style={{ width: "85%", height: "280px", borderRadius: "10px", overflow: "hidden", background: "#0A2E24", position: "relative" }}>
              <Image src={chapter.image} alt={chapter.title} fill style={{ objectFit: "cover" }} />
            </div>
            <h3 style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "20px", fontWeight: 100, color: "#064E3B", lineHeight: "28px" }}>{chapter.title}</h3>
            <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 400, lineHeight: "22.75px", color: "#475569" }}>{chapter.description}</p>
            <p style={{ fontSize: "11px", color: "#aaa", textAlign: "right", marginTop: "auto", fontFamily: "var(--font-body)" }}>Page {currentChapter + 2}</p>
          </div>
        </div>
        {currentChapter > 0 && (<button onClick={() => setCurrentChapter((p) => p - 1)} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", width: "44px", height: "44px", borderRadius: "50%", background: "#fff", border: "1px solid #ddd", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.15)", color: "#064E3B", fontWeight: 600, zIndex: 10 }}>‹</button>)}
        {currentChapter < chapters.length - 1 && (<button onClick={() => setCurrentChapter((p) => p + 1)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", width: "44px", height: "44px", borderRadius: "50%", background: "#fff", border: "1px solid #ddd", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.15)", color: "#064E3B", fontWeight: 600, zIndex: 10 }}>›</button>)}
      </div>
      <div className="anim-toolbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "1064px", background: "rgba(6,78,59,0.20)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderRadius: "16px", padding: "16px", border: "1px solid rgba(255,255,255,0.10)", height: "71.5px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button style={toolbarBtnStyle}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg></button>
          <span style={{ color: "#fff", fontSize: "13px", fontFamily: "'Inter', sans-serif", fontWeight: 500, minWidth: "36px", textAlign: "center" }}>100%</span>
          <button style={toolbarBtnStyle}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></button>
          <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.15)", margin: "0 4px" }} />
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", fontFamily: "'Inter', sans-serif" }}>{currentChapter + 2} / 15 Pages</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "8px", background: "rgba(0,0,0,0.20)", border: "1px solid rgba(255,255,255,0.15)", color: "#FFFFFF", fontSize: "14px", fontWeight: 500, lineHeight: "20px", cursor: "pointer", fontFamily: "'Inter', sans-serif", height: "37.5px", boxSizing: "border-box" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Share
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 16px", borderRadius: "8px", background: "#D4A843", border: "none", color: "#064E3B", fontSize: "14px", fontWeight: 700, lineHeight: "20px", cursor: "pointer", fontFamily: "'Inter', sans-serif", height: "37.5px", boxSizing: "border-box" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
            Fullscreen
          </button>
          <button style={{ ...toolbarBtnStyle, padding: "4px 8px", background: "rgba(0,0,0,0.20)", borderRadius: "8px", height: "37.5px", boxSizing: "border-box" as const }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section style={{ backgroundColor: "#f5f0e8", padding: "72px 80px", position: "relative", overflow: "hidden" }}>
      <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        <line x1="500" y1="-100" x2="-400" y2="300" stroke="#064E3B" strokeOpacity="0.15" strokeWidth="1.5"/>
        <line x1="600" y1="-100" x2="-300" y2="300" stroke="#064E3B" strokeOpacity="0.15" strokeWidth="1.5"/>
      </svg>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "280px 1fr", gap: "64px", alignItems: "start", position: "relative", zIndex: 1 }}>
        <div className="anim-book-cover" style={{ position: "relative" }}>
          <div style={{ width: "220px", height: "300px", background: "#0A2E24", borderRadius: "8px", boxShadow: "8px 12px 40px rgba(0,0,0,0.25)", position: "relative", overflow: "hidden" }}>
            <Image src="/e-bookchapter.svg" alt="Start Early Be Wealthy book cover" fill style={{ objectFit: "cover", borderRadius: "8px" }} />
          </div>
        </div>
        <div className="anim-about-content" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: "9999px", background: "rgba(212,175,55,0.20)", color: "#064E3B", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: "12px", height: "24px", boxSizing: "border-box" }}>Premium Guide</span>
            <h2 className="inter-thin" style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "30px", fontWeight: 100, lineHeight: "36px", color: "#064E3B", width: "800px", maxWidth: "100%" }}>About this E-Book</h2>
          </div>
          <p className="inter-thin" style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 100, lineHeight: "29.25px", color: "#475569", width: "800px", maxWidth: "100%", minHeight: "88px" }}>
            This guide is meticulously crafted by the MoneyMati research team to simplify the complex world of personal finance. Whether you're a fresh graduate or mid-career professional, these strategies are designed to be actionable from day one.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(6,78,59,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><FeatureIcon index={i} /></div>
                <div>
                  <p style={{ margin: "0 0 4px", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700, color: "#064E3B", lineHeight: "20px" }}>{f.title}</p>
                  <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400, lineHeight: "19px", color: "#475569" }}>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
          <hr style={{ border: "none", borderTop: "1px solid rgba(6,78,59,0.15)", margin: "8px 0 0" }} />
          <div style={{ paddingTop: "4px" }}>
            <p style={{ margin: "0 0 16px", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 300, color: "#064E3B" }}>Meet the Author: MoneyMati</p>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ width: "52px", height: "68px", borderRadius: "26px", background: "#064E3B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "2px solid rgba(255,255,255,0.15)" }}>
                <svg width="33" height="21" viewBox="0 0 33 21" fill="none"><path d="M16.125 16.5H17.2125V15.3C17.9125 15.2 18.5063 14.9125 18.9937 14.4375C19.4812 13.9625 19.725 13.35 19.725 12.6C19.725 11.95 19.475 11.4062 18.975 10.9688C18.475 10.5312 17.9 10.175 17.25 9.9V7.125C17.5 7.2 17.7062 7.325 17.8687 7.5C18.0312 7.675 18.15 7.8875 18.225 8.1375L19.575 7.575C19.4 7.05 19.1 6.63125 18.675 6.31875C18.25 6.00625 17.775 5.8 17.25 5.7V4.5H16.125V5.6625C15.425 5.7375 14.8313 5.99375 14.3438 6.43125C13.8562 6.86875 13.6125 7.45 13.6125 8.175C13.6125 8.85 13.8688 9.4125 14.3813 9.8625C14.8938 10.3125 15.475 10.675 16.125 10.95V13.9125C15.725 13.7875 15.3875 13.575 15.1125 13.275C14.8375 12.975 14.65 12.625 14.55 12.225L13.2375 12.7875C13.4375 13.4875 13.7875 14.0625 14.2875 14.5125C14.7875 14.9625 15.4 15.2375 16.125 15.3375V16.5ZM17.25 13.875V11.4C17.525 11.525 17.7688 11.675 17.9813 11.85C18.1938 12.025 18.3 12.2875 18.3 12.6375C18.3 13.0375 18.2 13.3187 18 13.4812C17.8 13.6438 17.55 13.775 17.25 13.875ZM16.125 9.4125C15.85 9.2875 15.6 9.1375 15.375 8.9625C15.15 8.7875 15.0375 8.525 15.0375 8.175C15.0375 7.825 15.15 7.56875 15.375 7.40625C15.6 7.24375 15.85 7.1375 16.125 7.0875V9.4125ZM10.5 21C7.575 21 5.09375 19.9813 3.05625 17.9438C1.01875 15.9062 0 13.425 0 10.5C0 7.575 1.01875 5.09375 3.05625 3.05625C5.09375 1.01875 7.575 0 10.5 0H22.5C25.425 0 27.9062 1.01875 29.9438 3.05625C31.9813 5.09375 33 7.575 33 10.5C33 13.425 31.9813 15.9062 29.9438 17.9438C27.9062 19.9813 25.425 21 22.5 21H10.5ZM10.5 18H22.5C24.575 18 26.3438 17.2687 27.8062 15.8062C29.2687 14.3438 30 12.575 30 10.5C30 8.425 29.2687 6.65625 27.8062 5.19375C26.3438 3.73125 24.575 3 22.5 3H10.5C8.425 3 6.65625 3.73125 5.19375 5.19375C3.73125 6.65625 3 8.425 3 10.5C3 12.575 3.73125 14.3438 5.19375 15.8062C6.65625 17.2687 8.425 18 10.5 18Z" fill="white"/></svg>
              </div>
              <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 400, lineHeight: "22px", color: "#475569" }}>
                "Our mission is to democratize financial literacy across the globe. We believe everyone deserves a seat at the table of wealth, provided they have the right tools and knowledge."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MoreGuides() {
  return (
    <section style={{ backgroundColor: "#eeeae0", padding: "64px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="anim-guides-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <h2 style={{ margin: "0 0 6px", fontFamily: "'Inter', sans-serif", fontSize: "30px", fontWeight: 900, lineHeight: "36px", color: "#064E3B" }}>More Guides for You</h2>
            <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 400, lineHeight: "24px", color: "#64748B" }}>Continue your financial education journey.</p>
          </div>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: "6px", color: "#064E3B", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>View All →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {moreGuides.map((guide, i) => (
            <div key={i} className={`anim-guide-card-${i}`} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ position: "relative", height: "180px", background: "#0A2E24", overflow: "hidden" }}>
                <Image src={guide.image} alt={guide.title} fill style={{ objectFit: "cover" }} />
                <span style={{ position: "absolute", bottom: "10px", left: "12px", padding: "3px 10px", borderRadius: "4px", background: guide.tagColor, color: "#fff", fontSize: "10px", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>{guide.category}</span>
              </div>
              <div style={{ padding: "20px 20px 16px" }}>
                <h3 style={{ margin: "0 0 8px", fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 400, lineHeight: "28px", color: "#064E3B" }}>{guide.title}</h3>
                <p style={{ margin: "0 0 16px", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#64748B" }}>{guide.description}</p>
                <button style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, color: "#0A2E24" }}>Read Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function StartEarlyBeWealthy() {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Dancing+Script:wght@700&family=Inter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700&family=DM+Sans:wght@400;500;600;700&display=swap" />
      <style>{`
        :root { --font-display: 'Playfair Display', Georgia, serif; --font-body: 'DM Sans', 'Helvetica Neue', sans-serif; }
        * { box-sizing: border-box; }
        button { transition: opacity 0.15s ease; }
        button:hover { opacity: 0.85; }
        .inter-thin { font-family: 'Inter', sans-serif !important; font-weight: 100 !important; font-style: normal !important; font-synthesis: none !important; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp   { from { opacity: 0; transform: translateY(40px);  } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn     { from { opacity: 0; }                               to { opacity: 1; } }
        @keyframes slideInLeft  { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(40px);  } to { opacity: 1; transform: translateX(0); } }
        @keyframes scaleIn    { from { opacity: 0; transform: scale(0.95); }       to { opacity: 1; transform: scale(1); } }
        @keyframes cardIn     { from { opacity: 0; transform: translateY(24px); }  to { opacity: 1; transform: translateY(0); } }

        .anim-breadcrumb    { animation: fadeIn       0.5s ease 0.1s  both; }
        .anim-hero-title    { animation: fadeInUp     0.7s ease 0.2s  both; }
        .anim-hero-sub      { animation: fadeInUp     0.6s ease 0.35s both; }
        .anim-book          { animation: scaleIn      0.8s ease 0.3s  both; }
        .anim-toolbar       { animation: fadeInUp     0.6s ease 0.45s both; }
        .anim-book-cover    { animation: slideInLeft  0.7s ease 0.3s  both; }
        .anim-about-content { animation: slideInRight 0.7s ease 0.3s  both; }
        .anim-guides-header { animation: fadeInUp     0.6s ease 0.2s  both; }
        .anim-guide-card-0  { animation: cardIn       0.6s ease 0.25s both; }
        .anim-guide-card-1  { animation: cardIn       0.6s ease 0.38s both; }
        .anim-guide-card-2  { animation: cardIn       0.6s ease 0.51s both; }
      `}</style>
      <main>
        <Header />
        <HeroSection />
        <BookViewer />
        <AboutSection />
        <MoreGuides />
        <Footer />
      </main>
    </>
  );
}