"use client";

import React from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { BOOKS, getBook } from "@/app/lib/books";

const BookViewer = dynamic(() => import("../BookViewer"), {
  ssr: false,
  loading: () => (
    <section style={{ background: "linear-gradient(180deg, #064E3B 0%, #0A2E24 100%)", padding: "48px 80px 64px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", minHeight: "700px", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, border: "3px solid rgba(255,255,255,0.2)", borderTopColor: "#D4A843", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, margin: 0, fontFamily: "'Inter', sans-serif" }}>Loading flipbook...</p>
      </div>
    </section>
  ),
});

interface PageProps {
  params: Promise<{ id: string }>;
}

function Breadcrumb({ title }: { title: string }) {
  const router = useRouter();
  return (
    <nav className="anim-breadcrumb" style={{ marginBottom: "24px" }}>
      <span onClick={() => router.push("/")} style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", cursor: "pointer" }}>Home</span>
      <span style={{ color: "rgba(255,255,255,0.35)", margin: "0 6px", fontSize: "13px" }}>›</span>
      <span onClick={() => router.push("/e-book")} style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", cursor: "pointer" }}>E-Books</span>
      <span style={{ color: "rgba(255,255,255,0.35)", margin: "0 6px", fontSize: "13px" }}>›</span>
      <span style={{ color: "#D4A843", fontSize: "13px", fontWeight: 500 }}>{title}</span>
    </nav>
  );
}

const FEATURE_ICONS = [
  <svg key={0} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  <svg key={1} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key={2} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  <svg key={3} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
];

// ✅ FIXED: uses cardImage, correct badge color, correct route
function MoreGuides({ currentId }: { currentId: number }) {
  const router = useRouter();
  const others = BOOKS.filter((b) => b.id !== currentId).slice(0, 3);

  return (
    <section style={{ backgroundColor: "#eeeae0", padding: "64px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <h2 style={{ margin: "0 0 6px", fontFamily: "'Inter', sans-serif", fontSize: "30px", fontWeight: 900, lineHeight: "36px", color: "#064E3B" }}>More Guides for You</h2>
            <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#64748B" }}>Continue your financial education journey.</p>
          </div>
          <a href="/e-book" style={{ color: "#064E3B", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>View All →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {others.map((book) => (
            <div
              key={book.id}
              style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer" }}
              onClick={() => router.push(`/e-book/${book.id}`)}  // ✅ fixed route
            >
              <div style={{ position: "relative", height: "180px", background: "#0A2E24", overflow: "hidden" }}>
                <Image
                  src={book.cardImage}  // ✅ cardImage not cover
                  alt={book.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <span style={{
                  position: "absolute", bottom: "10px", left: "12px",
                  padding: "3px 10px", borderRadius: "4px",
                  background: "#0A5C45",  // ✅ dark teal not bright green
                  color: "#fff", fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.8px", textTransform: "uppercase"
                }}>
                  {book.category}
                </span>
              </div>
              <div style={{ padding: "20px 20px 16px" }}>
                <h3 style={{ margin: "0 0 8px", fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 400, lineHeight: "28px", color: "#064E3B" }}>
                  {book.title} {book.subtitle}
                </h3>
                <p style={{ margin: "0 0 16px", fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: "20px", color: "#64748B" }}>
                  {book.description}
                </p>
                <button style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 600, color: "#0A2E24" }}>
                  Read Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function SepEBookPage({ params }: PageProps) {
  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);
  const book = getBook(id);

  if (!book) {
    return (
      <>
        <Header />
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 48, margin: "0 0 16px" }}>📚</p>
            <h2 style={{ color: "#064E3B", marginBottom: 8 }}>E-Book not found</h2>
            <a href="/e-book" style={{ color: "#064E3B", fontWeight: 600 }}>← Back to E-Books</a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Dancing+Script:wght@700&family=Inter:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700&display=swap" />
      <style>{`
        * { box-sizing: border-box; }
        @keyframes spin         { to { transform: rotate(360deg); } }
        @keyframes fadeInUp     { from { opacity: 0; transform: translateY(40px); }  to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn       { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInLeft  { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); }  to { opacity: 1; transform: translateX(0); } }
        .anim-breadcrumb    { animation: fadeIn       0.5s ease 0.1s  both; }
        .anim-hero-title    { animation: fadeInUp     0.7s ease 0.2s  both; }
        .anim-hero-sub      { animation: fadeInUp     0.6s ease 0.35s both; }
        .anim-book-cover    { animation: slideInLeft  0.7s ease 0.3s  both; }
        .anim-about-content { animation: slideInRight 0.7s ease 0.3s  both; }
      `}</style>

      <main>
        <Header />

        {/* HERO */}
        <section style={{ background: "linear-gradient(160deg, #064E3B 0%, #0A2E24 50%, #064E3B 100%)", padding: "64px 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-60px", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(17,212,98,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <Breadcrumb title={`${book.title} ${book.subtitle}`} />
            <h1 className="anim-hero-title" style={{ margin: "0 0 16px", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "48px", lineHeight: "52px", letterSpacing: "-1.2px", color: "#ffffff", fontWeight: 800 }}>
              {book.title}{" "}
              <span style={{ color: "#D4A843", fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: "48px" }}>
                {book.subtitle}
              </span>
            </h1>
            <p className="anim-hero-sub" style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 500, lineHeight: "29px", color: "rgba(255,255,255,0.70)", maxWidth: "631px" }}>
              {book.description}
            </p>
          </div>
        </section>

        {/* FLIPBOOK */}
        <BookViewer pdfFile={book.pdf} />

        {/* ABOUT */}
        <section style={{ backgroundColor: "#f5f0e8", padding: "72px 80px", position: "relative", overflow: "hidden" }}>
          <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
            <line x1="500" y1="-100" x2="-400" y2="300" stroke="#064E3B" strokeOpacity="0.15" strokeWidth="1.5"/>
            <line x1="600" y1="-100" x2="-300" y2="300" stroke="#064E3B" strokeOpacity="0.15" strokeWidth="1.5"/>
          </svg>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "280px 1fr", gap: "64px", alignItems: "start", position: "relative", zIndex: 1 }}>
            <div className="anim-book-cover">
              <div style={{ width: "220px", height: "300px", background: "#0A2E24", borderRadius: "8px", boxShadow: "8px 12px 40px rgba(0,0,0,0.25)", position: "relative", overflow: "hidden" }}>
                <Image src={book.cover} alt={`${book.title} cover`} fill style={{ objectFit: "cover", borderRadius: "8px" }} />
              </div>
            </div>

            <div className="anim-about-content" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: "9999px", background: "rgba(212,175,55,0.20)", color: "#064E3B", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: "12px" }}>
                  Premium Guide
                </span>
                <h2 style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "30px", fontWeight: 100, lineHeight: "36px", color: "#064E3B" }}>About this E-Book</h2>
              </div>
              <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 100, lineHeight: "29px", color: "#475569" }}>
                {book.description} This guide is crafted by the MoneyMati research team to simplify the complex world of personal finance — actionable from day one.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                {book.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(6,78,59,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {FEATURE_ICONS[i % FEATURE_ICONS.length]}
                    </div>
                    <div>
                      <p style={{ margin: "0 0 4px", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700, color: "#064E3B" }}>{f.title}</p>
                      <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#475569" }}>{f.description}</p>
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
                  <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: "22px", color: "#475569" }}>
                    &quot;Our mission is to democratize financial literacy across the globe. We believe everyone deserves a seat at the table of wealth, provided they have the right tools and knowledge.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MoreGuides currentId={book.id} />
        <Footer />
      </main>
    </>
  );
}