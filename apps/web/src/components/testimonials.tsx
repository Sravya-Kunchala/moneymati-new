"use client";

import { useState, useRef, useEffect } from "react";
import { Dancing_Script, Playfair_Display, DM_Sans } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const testimonials = [
  {
    stars: 5,
    quote: "A wonderful session that taught me to be more confident to manage my investments through diverse mutual funds. I wish to learn more about equities, and how to plan my taxes.",
    name: "Maloncho Raychaudhuri",
    role: "Global Real Estate and Program Lead Workplace Experience @ JPMorganChase",
    avatar: "/image 14.svg",
  },
  {
    stars: 5,
    quote: "You are an inspiration in this field. Wishing you continued success and may the knowledge that you share result in better financial outcomes for those who are not very much into it.",
    name: "Prashantha Sawhney",
    role: "Scaleup CEOs",
    avatar: "/Sarah Johnson.svg",
  },
  {
    stars: 5,
    quote: "Truly inspiring work ... Real impact begins with awareness and action—more power to you and this mission",
    name: "Meenu Krishna",
    role: "Business Consultant",
    avatar: "/Amara Okafor.svg",
  },
  {
    stars: 5,
    quote: "This was a wonderful session on \"Money Matters for Women\" that covered various aspects on managing money, budgeting, prudent borrowing and rules for investing.",
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
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  const totalPages = testimonials.length - CARDS_VISIBLE + 1;
  const canPrev = startIndex > 0;
  const canNext = startIndex + CARDS_VISIBLE < testimonials.length;

  useEffect(() => {
    const updateCardWidth = () => {
      if (trackRef.current?.children[0]) {
        const card = trackRef.current.children[0] as HTMLElement;
        setCardWidth(card.offsetWidth + 20); // card width + gap
      }
    };
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const goTo = (index: number) => {
    if (isAnimating) return;
    const clamped = Math.max(0, Math.min(index, testimonials.length - CARDS_VISIBLE));
    setIsAnimating(true);
    setStartIndex(clamped);
    setTimeout(() => setIsAnimating(false), 480);
  };

  const handlePrev = () => { if (canPrev) goTo(startIndex - 1); };
  const handleNext = () => { if (canNext) goTo(startIndex + 1); };

  return (
    <>
      <style>{`
        .tm-track {
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        .dot-btn {
          width: 7px; height: 7px; border-radius: 50%;
          border: none; padding: 0; cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }
        @media (max-width: 768px) {
          .tm-section { padding: 40px 20px 40px !important; }
          .tm-heading { margin-bottom: 28px !important; }
          .tm-heading h2 { font-size: 28px !important; }
          .tm-card { flex: 0 0 85vw !important; }
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
        <div
          className="tm-heading"
          style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 48px" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              color: "#1a2e1a",
              lineHeight: 1.3,
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            What Our Community Says
          </h2>
        </div>

        {/* Viewport */}
        <div style={{ overflow: "hidden", maxWidth: "1060px", margin: "0 auto 40px" }}>
          <div
            ref={trackRef}
            className="tm-track"
            style={{
              display: "flex",
              gap: "20px",
              transform: `translateX(-${startIndex * cardWidth}px)`,
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="tm-card"
                style={{
                  flex: `0 0 calc(${100 / CARDS_VISIBLE}% - ${(20 * (CARDS_VISIBLE - 1)) / CARDS_VISIBLE}px)`,
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "28px 24px 24px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  boxSizing: "border-box",
                }}
              >
                <StarRating count={t.stars} />
                <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.86rem", color: "#4a5a4a", lineHeight: 1.75, fontStyle: "italic", marginBottom: "20px", flex: 1 }}>
                  {t.quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, backgroundColor: "#d0cfc8" }}>
                    <img src={t.avatar} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "0.88rem", color: "#1a2e1a", marginBottom: "2px" }}>{t.name}</p>
                    <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.75rem", color: "#8a9a8a", lineHeight: 1.4 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px" }}>
          <button
            onClick={handlePrev}
            disabled={!canPrev || isAnimating}
            aria-label="Previous"
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              border: `1.5px solid ${canPrev ? "#4a6741" : "#c8c8c0"}`,
              backgroundColor: "transparent", display: "flex",
              alignItems: "center", justifyContent: "center",
              cursor: canPrev ? "pointer" : "not-allowed",
              opacity: canPrev ? 1 : 0.45,
              transition: "background 0.2s, transform 0.15s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={canPrev ? "#4a6741" : "#a0a098"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: "6px" }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className="dot-btn"
                onClick={() => goTo(i)}
                style={{
                  background: i === startIndex ? "#4a6741" : "#c8c8c0",
                  transform: i === startIndex ? "scale(1.3)" : "scale(1)",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!canNext || isAnimating}
            aria-label="Next"
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              border: `1.5px solid ${canNext ? "#4a6741" : "#c8c8c0"}`,
              backgroundColor: "transparent", display: "flex",
              alignItems: "center", justifyContent: "center",
              cursor: canNext ? "pointer" : "not-allowed",
              opacity: canNext ? 1 : 0.45,
              transition: "background 0.2s, transform 0.15s",
            }}
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