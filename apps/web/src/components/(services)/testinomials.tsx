"use client";

import React from "react";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-dm-sans" });

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: '"The Investment Basics webinar was a game-changer. I went from being afraid of the stock market to making my first investment within a week."',
    name: "Priya R.",
    role: "Marketing Executive",
    avatar: "/Priya R..svg",
  },
  {
    id: 2,
    quote: '"MoneyMati provides the kind of clarity that banks don\'t. The community support is incredible and the experts are truly knowledgeable."',
    name: "Sarah J.",
    role: "Entrepreneur",
    avatar: "/Sarah J.svg",
  },
  {
    id: 3,
    quote: '"Finally, a financial platform that speaks my language. I feel empowered and for the first time, in control of my financial future."',
    name: "Elena M.",
    role: "Health Professional",
    avatar: "/Elena M..svg",
  },
];

const StarRating: React.FC = () => (
  <div style={{ display: "flex", gap: "2px" }}>
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div
    style={{
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "28px 24px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
      flex: 1,
    }}
  >
    <StarRating />

    <p
      style={{
        margin: 0,
        fontSize: "15px",
        lineHeight: "24px",
        color: "#334155",
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontWeight: 400,
        flex: 1,
      }}
    >
      {testimonial.quote}
    </p>

    {/* Author */}
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          backgroundColor: "#e2e8f0",
          overflow: "hidden",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          fill
          style={{ objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#1a1a1a",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          {testimonial.name}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#94a3b8",
            fontWeight: 400,
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          {testimonial.role}
        </div>
      </div>
    </div>
  </div>
);

export default function CommunityTestimonials() {
  return (
    <section
      className={`${playfair.variable} ${dmSans.variable}`}
      style={{
        backgroundColor: "#f5f0e8",
        padding: "64px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
        }}
      >
        {/* Heading */}
       <h2
  style={{
    margin: 0,
    textAlign: "center",
    fontSize: "30px",
    lineHeight: "36px",
    fontWeight: 700,
    color: "#004D40",
    fontFamily: "var(--font-playfair), serif",
    fontStyle: "normal",
    letterSpacing: "4px",
  }}
>
  What Our Community Says
</h2>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}