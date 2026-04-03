"use client";

import { useState } from "react";
import { Dancing_Script, Playfair_Display, DM_Sans } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const testimonials = [
  {
    stars: 5,
    quote:
      "A wonderful session that taught me to be more confident to manage my investments through diverse mutual funds. I wish to learn more about equities, and how to plan my taxes.",
    name: "Maloncho Raychaudhuri",
    role: "Global Real Estate and Program Lead Workplace Experience @ JPMorganChase",
    avatar: "/image 14.svg",
  },
  {
    stars: 5,
    quote:
      "You are an inspiration in this field. Wishing you continued success and may the knowledge that you share result in better financial outcomes for those who are not very much into it.",
    name: "Prashantha Sawhney",
    role: "Scaleup CEOs",
    avatar: "/Sarah Johnson.svg",
  },
  {
    stars: 5,
    quote:
      "Truly inspiring work ... Real impact begins with awareness and action—more power to you and this mission",
    name: "Meenu Krishna",
    role: "Business Consultant",
    avatar: "/Amara Okafor.svg",
  },
  {
    stars: 5,
    quote:
      "This was a wonderful session on \"Money Matters for Women\" that covered various aspects on managing money, budgeting, prudent borrowing and rules for investing. It was very well received by the motley group of women professionals.",
    name: "Anita K Manda",
    role: "EVP with Broadridge | Founder of The ProjeKT40 | Doctoral Student at ISB",
    avatar: "/anita.jpeg",
  },
];

const CARDS_VISIBLE = 3;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#d4a82a">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);

  const canPrev = startIndex > 0;
  const canNext = startIndex + CARDS_VISIBLE < testimonials.length;

  const handlePrev = () => { if (canPrev) setStartIndex((i) => i - 1); };
  const handleNext = () => { if (canNext) setStartIndex((i) => i + 1); };

  const visible = testimonials.slice(startIndex, startIndex + CARDS_VISIBLE);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .tm-section {
            padding: 40px 20px 40px !important;
          }
          .tm-heading-wrap {
            margin-bottom: 28px !important;
          }
          .tm-heading {
            font-size: 32px !important;
            line-height: 42px !important;
          }
          .tm-subheading {
            display: block !important;
            font-size: 13px !important;
            color: #6b7a6b !important;
            margin-top: 8px !important;
            line-height: 1.5 !important;
          }
          .tm-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .tm-nav {
            display: none !important;
          }
          .tm-card {
            padding: 20px 16px 16px !important;
          }
        }
        @media (min-width: 769px) {
          .tm-subheading {
            display: none !important;
          }
        }
      `}</style>

      <section
        className={`tm-section ${dancingScript.variable} ${playfairDisplay.variable} ${dmSans.variable}`}
        style={{
          backgroundColor: "#F8F6F1",
          padding: "80px 24px 60px",
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        {/* Heading */}
        <div className="tm-heading-wrap" style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 48px" }}>
          <h2
            className="tm-heading"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              color: "#1a2e1a",
              lineHeight: 1.3,
              letterSpacing: "0.04em",
            }}
          >
            What Our Community Says
          </h2>
          {/* Mobile-only subtitle */}
          <p
            className="tm-subheading"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            Real stories from women who took control of their financial futures.
          </p>
        </div>

        {/* Cards */}
        <div
          className="tm-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            maxWidth: "1060px",
            margin: "0 auto 40px",
          }}
        >
          {visible.map((t, i) => (
            <div
              key={startIndex + i}
              className="tm-card"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "28px 24px 24px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <StarRating count={t.stars} />

              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.86rem",
                  color: "#4a5a4a",
                  lineHeight: 1.75,
                  fontStyle: "italic",
                  marginBottom: "20px",
                  flex: 1,
                }}
              >
                {t.quote}
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                    backgroundColor: "#d0cfc8",
                  }}
                >
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      color: "#1a2e1a",
                      marginBottom: "2px",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.75rem",
                      color: "#8a9a8a",
                      lineHeight: 1.4,
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows — hidden on mobile */}
        <div className="tm-nav" style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <button
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Previous"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: `1.5px solid ${canPrev ? "#4a6741" : "#c8c8c0"}`,
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: canPrev ? "pointer" : "not-allowed",
              opacity: canPrev ? 1 : 0.45,
              transition: "background 0.2s, opacity 0.2s",
            }}
            onMouseEnter={(e) => { if (canPrev) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#eef2ed"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={canPrev ? "#4a6741" : "#a0a098"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Next"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: `1.5px solid ${canNext ? "#4a6741" : "#c8c8c0"}`,
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: canNext ? "pointer" : "not-allowed",
              opacity: canNext ? 1 : 0.45,
              transition: "background 0.2s, opacity 0.2s",
            }}
            onMouseEnter={(e) => { if (canNext) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#eef2ed"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={canNext ? "#4a6741" : "#a0a098"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}