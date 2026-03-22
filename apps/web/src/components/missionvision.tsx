"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";

const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const cards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="#FFB600" />
      </svg>
    ),
    title: "Our Mission",
    description:
      "To provide accessible, high-quality financial education that empowers women to take control of their economic destiny and bridge the gender wealth gap.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Our Vision",
    description:
      "A world where every woman possesses the knowledge, tools, and confidence to build lasting wealth and financial security for herself and her family.",
  },
];

export default function MissionVision() {
  return (
    <section
      className={`${playfairDisplay.variable} ${dmSans.variable}`}
      style={{
        backgroundColor: "#f5f3ee",
        paddingTop: "0px",
        paddingBottom: "0",
        fontFamily: "var(--font-dm-sans), sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Cards */}
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6 lg:px-16"
        style={{ maxWidth: "1100px", position: "relative", zIndex: 3, marginTop: "40px" }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#1a3a2a",
              borderRadius: "16px",
              padding: "36px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            {/* Icon box */}
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                backgroundColor: "#677E73",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              {card.icon}
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#ffffff",
                marginBottom: "12px",
              }}
            >
              {card.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.875rem",
                color: "#a8c4a8",
                lineHeight: 1.75,
              }}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Wave dividers */}
      <div style={{ position: "relative", height: "130px", marginTop: "16px", lineHeight: 0, overflow: "hidden", width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
        {/* Back wave */}
        <svg
          width="100%"
          height="130"
          viewBox="0 0 1440 153"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
        >
          <rect x="0" y="142" width="1440" height="11" fill="#D9D9D9" />
          <path
            d="M628.09 90.5C451.158 78.1 135.642 119.667 0 142L1440 153V0C1334.43 17.6667 1095.74 60.5 985.544 90.5C847.801 128 849.256 106 628.09 90.5Z"
            fill="#D9D9D9"
          />
        </svg>
        {/* Front wave */}
        <svg
          width="100%"
          height="110"
          viewBox="0 0 1438 177"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", bottom: 0, left: 0, zIndex: 2 }}
        >
          <rect x="0" y="153" width="1438" height="24" fill="#E0E0E0" />
          <path
            d="M625.59 90.5C448.658 78.1 135.642 154.167 0 176.5L1437.5 153V0C1331.93 17.6667 1093.24 60.5 983.044 90.5C845.301 128 846.756 106 625.59 90.5Z"
            fill="#E0E0E0"
          />
        </svg>
      </div>
    </section>
  );
}