"use client";

import React from "react";
import { Dancing_Script, Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { PUBLICATIONS } from "@/app/lib/books";

const dancing = Dancing_Script({ subsets: ["latin"], weight: ["700"], variable: "--font-dancing" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

/* ── icons ── */
const InvestmentIcon = () => (
  <svg width="19" height="14" viewBox="0 0 19 14" fill="none"><path d="M10.8333 7.5C10.1389 7.5 9.54861 7.25694 9.0625 6.77083C8.57639 6.28472 8.33333 5.69444 8.33333 5C8.33333 4.30556 8.57639 3.71528 9.0625 3.22917C9.54861 2.74306 10.1389 2.5 10.8333 2.5C11.5278 2.5 12.1181 2.74306 12.6042 3.22917C13.0903 3.71528 13.3333 4.30556 13.3333 5C13.3333 5.69444 13.0903 6.28472 12.6042 6.77083C12.1181 7.25694 11.5278 7.5 10.8333 7.5ZM5 10C4.54167 10 4.14931 9.83681 3.82292 9.51042C3.49653 9.18403 3.33333 8.79167 3.33333 8.33333V1.66667C3.33333 1.20833 3.49653 0.815972 3.82292 0.489583C4.14931 0.163194 4.54167 0 5 0H16.6667C17.125 0 17.5174 0.163194 17.8438 0.489583C18.1701 0.815972 18.3333 1.20833 18.3333 1.66667V8.33333C18.3333 8.79167 18.1701 9.18403 17.8438 9.51042C17.5174 9.83681 17.125 10 16.6667 10H5ZM6.66667 8.33333H15C15 7.875 15.1632 7.48264 15.4896 7.15625C15.816 6.82986 16.2083 6.66667 16.6667 6.66667V3.33333C16.2083 3.33333 15.816 3.17014 15.4896 2.84375C15.1632 2.51736 15 2.125 15 1.66667H6.66667C6.66667 2.125 6.50347 2.51736 6.17708 2.84375C5.85069 3.17014 5.45833 3.33333 5 3.33333V6.66667C5.45833 6.66667 5.85069 6.82986 6.17708 7.15625C6.50347 7.48264 6.66667 7.875 6.66667 8.33333ZM15.8333 13.3333H1.66667C1.20833 13.3333 0.815972 13.1701 0.489583 12.8438C0.163194 12.5174 0 12.125 0 11.6667V2.5H1.66667V11.6667H15.8333V13.3333ZM5 8.33333V1.66667V8.33333Z" fill="#214533"/></svg>
);
const TaxIcon = () => (
  <svg width="14" height="17" viewBox="0 0 14 17" fill="none"><path d="M3.33333 13.3333H10V11.6667H3.33333V13.3333ZM3.33333 10H10V8.33333H3.33333V10ZM1.66667 16.6667C1.20833 16.6667 0.815972 16.5035 0.489583 16.1771C0.163194 15.8507 0 15.4583 0 15V1.66667C0 1.20833 0.163194 0.815972 0.489583 0.489583C0.815972 0.163194 1.20833 0 1.66667 0H8.33333L13.3333 5V15C13.3333 15.4583 13.1701 15.8507 12.8438 16.1771C12.5174 16.5035 12.125 16.6667 11.6667 16.6667H1.66667ZM7.5 5.83333V1.66667H1.66667V15H11.6667V5.83333H7.5Z" fill="#475569"/></svg>
);
const InsuranceIcon = () => (
  <svg width="14" height="17" viewBox="0 0 14 17" fill="none"><path d="M6.66667 9.16667C5.84722 9.16667 5.15625 8.88542 4.59375 8.32292C4.03125 7.76042 3.75 7.06944 3.75 6.25C3.75 5.43056 4.03125 4.73958 4.59375 4.17708C5.15625 3.61458 5.84722 3.33333 6.66667 3.33333C7.48611 3.33333 8.17708 3.61458 8.73958 4.17708C9.30208 4.73958 9.58333 5.43056 9.58333 6.25C9.58333 7.06944 9.30208 7.76042 8.73958 8.32292C8.17708 8.88542 7.48611 9.16667 6.66667 9.16667ZM6.66667 16.6667C4.73611 16.1806 3.14236 15.0729 1.88542 13.3438C0.628472 11.6146 0 9.69444 0 7.58333V2.5L6.66667 0L13.3333 2.5V7.58333C13.3333 9.69444 12.7049 11.6146 11.4479 13.3438C10.191 15.0729 8.59722 16.1806 6.66667 16.6667Z" fill="#475569"/></svg>
);
const RetirementIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><polyline points="2,13 6,8 10,10 15,4" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><polyline points="12,4 15,4 15,7" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
);
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v7M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);
const ReadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3h4c1 0 1.5.5 1.5 1.5v7c0-1-1-1.5-1.5-1.5H2V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none"/><path d="M12 3H8c-1 0-1.5.5-1.5 1.5v7c0-1 1-1.5 1.5-1.5h4V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none"/></svg>
);
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.6 3.3 3.6.5-2.6 2.5.6 3.6L7 9.2l-3.2 1.7.6-3.6L1.8 4.8l3.6-.5L7 1z" stroke="#D4AF37" strokeWidth="1.2" strokeLinejoin="round"/></svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="#94a3b8" strokeWidth="1.2" fill="none"/><circle cx="7" cy="7" r="1.5" stroke="#94a3b8" strokeWidth="1.2" fill="none"/></svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const CATEGORIES = [
  { icon: <InvestmentIcon />, label: "Investment", count: 24, active: true },
  { icon: <TaxIcon />, label: "Tax Planning", count: 12 },
  { icon: <InsuranceIcon />, label: "Insurance", count: 8 },
  { icon: <RetirementIcon />, label: "Retirement", count: 15 },
];

const TAGS = ["Equity", "SIP", "Money Mati", "Money", "Budget Planning", "Invest"];

const CARD_IMAGES: Record<number, string> = {
  1: "/i1.svg",
  2: "/i2 (2).svg",
  3: "/i3 (2).svg",
  4: "/i4 (2).svg",
};

/* ── shared download button style ── */
const downloadBtnStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  backgroundColor: "#0d4f35",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "9px 18px",
  fontSize: "13px",
  fontWeight: 600,
  fontFamily: "var(--font-inter), sans-serif",
  cursor: "pointer",
  textDecoration: "none",
};

function PublicationCard({ pub }: { pub: { id: number; category: string; categoryColor: string; date: string; title: string; description: string; ctaLabel: string; ctaIcon: "read" | "download" } }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/e-book/${pub.id}`)}
      style={{ backgroundColor: "#ffffff", borderRadius: "14px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", cursor: "pointer", transition: "box-shadow 0.2s, transform 0.2s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.12)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
    >
      <div style={{ width: "100%", height: "160px", position: "relative", overflow: "hidden" }}>
        <img src={CARD_IMAGES[pub.id] ?? "/i1.svg"} alt={pub.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: pub.categoryColor, textTransform: "uppercase" }}>{pub.category}</span>
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", color: "#94a3b8" }}>{pub.date}</span>
        </div>
        <h4 style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "15px", lineHeight: "22px", color: "#1e293b" }}>{pub.title}</h4>
        <p style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontSize: "12.5px", lineHeight: "19px", color: "#64748b", flex: 1 }}>{pub.description}</p>
        <div style={{ height: "1px", backgroundColor: "#f1f5f9", margin: "4px 0" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
          {pub.ctaIcon === "download" ? <DownloadIcon /> : <ReadIcon />}
          {pub.ctaLabel}
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Categories */}
      <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 16px", fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8" }}>Categories</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {CATEGORIES.map((cat) => (
            <div key={cat.label} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", backgroundColor: cat.active ? "#f0fdf4" : "transparent", cursor: "pointer" }}>
              <span style={{ flexShrink: 0 }}>{cat.icon}</span>
              <span style={{ flex: 1, fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", fontWeight: cat.active ? 700 : 500, color: cat.active ? "#1e293b" : "#475569" }}>{cat.label}</span>
              <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", fontWeight: 600, color: cat.active ? "#047857" : "#94a3b8", minWidth: "24px", textAlign: "right" }}>{String(cat.count).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Popular Tags */}
      <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 14px", fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8" }}>Popular Tags</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {TAGS.map((tag) => (
            <button key={tag} style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "9999px", padding: "6px 14px", fontFamily: "var(--font-inter), sans-serif", fontSize: "12.5px", fontWeight: 500, color: "#475569", cursor: "pointer" }}>{tag}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

const PUBLICATIONS_LIST = [
  { id: 1, category: "INVESTING",   categoryColor: "#EC5B13", date: "Oct 24, 2023 · By Admin", title: "5 Investing Mistakes You Must Avoid",  description: "Protect your capital by understanding common psychological and technical pitfalls in modern markets.", ctaLabel: "Read Guide",   ctaIcon: "read"     as const },
  { id: 2, category: "GOVERNMENT",  categoryColor: "#EC5B13", date: "Oct 20, 2023 · By Admin", title: "Top Government Saving Schemes",        description: "Detailed comparison of PPF, SSY, and SCSS for risk-free long-term wealth accumulation.",         ctaLabel: "Download PDF", ctaIcon: "download" as const },
  { id: 3, category: "CAREER",      categoryColor: "#EC5B13", date: "Oct 15, 2023 · By Admin", title: "Highest Paying Jobs of 2024",          description: "A roadmap to high-income careers in fintech, AI, and sustainable energy sectors.",                  ctaLabel: "Download PDF", ctaIcon: "download" as const },
  { id: 4, category: "PLANNING",    categoryColor: "#EC5B13", date: "Oct 12, 2023 · By Admin", title: "Start Early, Be Wealthy!",             description: "The math behind compounding and why starting at 20 is better than starting at 30.",               ctaLabel: "Read Online",  ctaIcon: "read"     as const },
];

export default function FinancialResources() {
  const router = useRouter();

  return (
    <>
      <style>{`
        .fr-featured-mobile { display: none; }
        .fr-featured-desktop { display: flex; }
        .fr-mobile-sidebar { display: none; }

        @media (max-width: 768px) {
          .fr-featured-mobile  { display: block !important; }
          .fr-featured-desktop { display: none  !important; }
          .fr-outer-grid {
            grid-template-columns: 1fr !important;
            padding: 24px 16px 48px !important;
            gap: 24px !important;
          }
          .fr-desktop-sidebar { display: none !important; }
          .fr-mobile-sidebar { display: block !important; }
          .fr-pubs-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>

      <div className={`${inter.className} ${dancing.variable}`} style={{ backgroundColor: "#f5f0e8", minHeight: "100vh" }}>
        <div
          className="fr-outer-grid"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "40px 24px 64px",
            display: "grid",
            gridTemplateColumns: "1fr 280px",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* ── Left / main column ── */}
          <div>

            {/* Featured E-Book */}
            <div style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
                <StarIcon />
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", fontWeight: 700, color: "#1e293b", letterSpacing: "0.01em" }}>Featured E-Book</span>
              </div>

              {/* ── Desktop featured card ── */}
              <div
                className="fr-featured-desktop"
                onClick={() => router.push("/sepe-book/4")}
                style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "56px 40px", gap: "32px", alignItems: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.05)", minHeight: "260px", cursor: "pointer" }}
              >
                {/* Book cover image */}
                <div style={{ width: "160px", minWidth: "160px", height: "240px", borderRadius: "8px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                  <img src="/navatri.svg" alt="Navratri Financial Empowerment Flip Book" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", bottom: "10px", left: "8px", backgroundColor: "#f97316", color: "#fff", fontSize: "8px", fontWeight: 700, letterSpacing: "0.5px", padding: "3px 8px", borderRadius: "4px", fontFamily: "var(--font-inter), sans-serif", textTransform: "uppercase" }}>Special Edition</div>
                </div>

                {/* Text + actions */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                  <h3 style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "18px", lineHeight: "26px", color: "#1e293b" }}>Navratri Financial Empowerment Flip Book</h3>
                  <p style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", lineHeight: "20px", color: "#64748b" }}>A special guide focused on financial empowerment and wealth creation strategies during the festive season. Learn how to align your goals with discipline and prosperity.</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "4px" }}>

                    {/* ✅ Download button — triggers PDF download, stops card navigation */}
                    <a
                      href="/FLIP-BOOK.pdf"
                      download
                      onClick={e => e.stopPropagation()}
                      style={downloadBtnStyle}
                    >
                      <DownloadIcon />Download Now
                    </a>

                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <EyeIcon />
                      <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "12px", color: "#94a3b8" }}>12.4k Views</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Mobile featured card ── */}
              <div
                className="fr-featured-mobile"
                onClick={() => router.push("/sepe-book/4")}
                style={{ backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.05)", cursor: "pointer" }}
              >
                <div style={{ width: "100%", height: "220px", position: "relative", overflow: "hidden" }}>
                  <img src="/navatri.svg" alt="Navratri Financial Empowerment Flip Book" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", bottom: "12px", left: "12px", backgroundColor: "#f97316", color: "#fff", fontSize: "8px", fontWeight: 700, letterSpacing: "0.5px", padding: "3px 8px", borderRadius: "4px", fontFamily: "var(--font-inter), sans-serif", textTransform: "uppercase" }}>Special Edition</div>
                </div>
                <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <h3 style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "16px", lineHeight: "24px", color: "#1e293b" }}>Navratri Financial Empowerment Flip Book</h3>
                  <p style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", lineHeight: "20px", color: "#64748b" }}>A special guide focused on financial empowerment and wealth creation strategies during the festive season. Learn how to align your goals with discipline and prosperity.</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "4px" }}>

                    {/* ✅ Download button — triggers PDF download, stops card navigation */}
                    <a
                      href="/FLIP-BOOK.pdf"
                      download
                      onClick={e => e.stopPropagation()}
                      style={downloadBtnStyle}
                    >
                      <DownloadIcon />Download Now
                    </a>

                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <EyeIcon />
                      <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "12px", color: "#94a3b8" }}>12.4k Views</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile sidebar */}
            <div className="fr-mobile-sidebar" style={{ marginBottom: "28px" }}>
              <Sidebar />
            </div>

            {/* Latest Publications */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <h2 style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "20px", color: "#1e293b" }}>Latest Publications</h2>
                <button style={{ display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", fontWeight: 600, color: "#047857" }}>
                  View All <ArrowRight />
                </button>
              </div>
              <div className="fr-pubs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {PUBLICATIONS_LIST.map((pub) => (
                  <PublicationCard key={pub.id} pub={pub} />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop sidebar */}
          <div className="fr-desktop-sidebar" style={{ position: "sticky", top: "24px" }}>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}