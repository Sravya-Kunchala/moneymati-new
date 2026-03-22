"use client";

import { Dancing_Script, Playfair_Display, DM_Sans } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const testimonials = [
  {
    stars: 5,
    quote:
      "You are an inspiration in this field. Wishing you continued success and may the knowledge that you share result in better financial outcomes for those who are not very much into it.",
    name: "Prashantha Sawhney",
    role: "Small Business Owner",
    avatar: "/avatar1.svg",
  },
  {
    stars: 5,
    quote:
      "Truly inspiring work ... Real impact begins with awareness and action—more power to you and this mission",
    name: "Meenu Krishna",
    role: "Marketing Director",
    avatar: "/avatar2.svg",
  },
];

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
  return (
    <section
      className={`${dancingScript.variable} ${playfairDisplay.variable} ${dmSans.variable}`}
      style={{
        backgroundColor: "#F8F6F1",
        padding: "80px 24px",
        fontFamily: "var(--font-dm-sans), sans-serif",
      }}
    >
      {/* Heading */}
      <div className="text-center mb-12" style={{ maxWidth: "500px", margin: "0 auto 48px" }}>
        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 700,
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            color: "#1a2e1a",
            lineHeight: 1.3,
            marginBottom: "14px",
          }}
        >
          Women Who Transformed Their Finances
        </h2>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.9rem",
            color: "#6b7c6b",
          }}
        >
          Real stories from women who took control of their financial futures.
        </p>
      </div>

      {/* Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto"
        style={{ maxWidth: "860px" }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "28px 28px 24px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            }}
          >
            <StarRating count={t.stars} />

            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.88rem",
                color: "#4a5a4a",
                lineHeight: 1.75,
                fontStyle: "italic",
                marginBottom: "20px",
              }}
            >
              {t.quote}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
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
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "#1a2e1a",
                    marginBottom: "2px",
                  }}
                >
                  {t.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "0.78rem",
                    color: "#8a9a8a",
                  }}
                >
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}