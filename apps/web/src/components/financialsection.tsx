"use client";

import { Dancing_Script, Playfair_Display, DM_Sans } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing", weight: ["700"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export default function FinancialConfidence() {
  return (
    <section
      className={`${dancingScript.variable} ${playfairDisplay.variable} ${dmSans.variable}`}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(ellipse at center, #2d5a3d 0%, #1a3a2a 50%, #0f2218 100%)",
        minHeight: "260px",
      }}
    >
      {/* Group 4 — Vector 12 (rotation 180°) z-index 1 */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 1, lineHeight: 0 }}>
        <svg width="100%" height="80" viewBox="0 0 1440 299" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)" }}>
          <path d="M691.642 147.795C1059.45 207.882 1343.8 74.3013 1440 6.10352e-05L0 6.10352e-05V298.013C77.2952 222.904 323.837 87.7079 691.642 147.795Z" fill="#214533"/>
        </svg>
      </div>

      {/* Group 4 — Vector 11 (rotation 180°) z-index 2 */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 2, lineHeight: 0 }}>
        <svg width="100%" height="60" viewBox="0 0 1440 201" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)" }}>
          <path d="M691.642 99.6247C1059.45 140.128 1343.8 50.0845 1440 0L0 0V200.883C77.2952 150.254 323.837 59.1216 691.642 99.6247Z" fill="#1B3226"/>
          <path d="M691.642 99.6247C1059.45 140.128 1343.8 50.0845 1440 0L0 0V200.883C77.2952 150.254 323.837 59.1216 691.642 99.6247Z" fill="url(#g4_v11_grad)"/>
          <defs>
            <linearGradient id="g4_v11_grad" x1="706.01" y1="181.653" x2="707.663" y2="-0.112218" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1B3226"/>
              <stop offset="1" stopColor="#214533"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Group 3 — Vector 12 z-index 3 */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", zIndex: 3, lineHeight: 0 }}>
        <svg width="100%" height="80" viewBox="0 0 1440 299" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M748.358 150.218C380.554 90.1306 96.2008 223.711 0 298.013H1440V0C1362.7 75.1089 1116.16 210.305 748.358 150.218Z" fill="#214533"/>
        </svg>
      </div>

      {/* Group 3 — Vector 11 z-index 4 */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", zIndex: 4, lineHeight: 0 }}>
        <svg width="100%" height="60" viewBox="0 0 1440 201" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M748.358 101.258C380.554 60.7547 96.2008 150.798 0 200.883H1440V0C1362.7 50.6289 1116.16 141.761 748.358 101.258Z" fill="url(#g3_v11_grad)"/>
          <defs>
            <linearGradient id="g3_v11_grad" x1="733.99" y1="19.2298" x2="732.337" y2="200.995" gradientUnits="userSpaceOnUse">
              <stop stopColor="#214533"/>
              <stop offset="1" stopColor="#122B1F"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div
        className="relative text-center mx-auto px-6"
        style={{ maxWidth: "760px", padding: "48px 24px", zIndex: 10 }}
      >
        {/* Heading */}
        <h2 style={{ marginBottom: "16px", lineHeight: "48px" }}>
          <span
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 800,
              fontSize: "48px",
              color: "#ffffff",
            }}
          >
            Financial Confidence{" "}
          </span>
          <span
            style={{
              fontFamily: "var(--font-dancing), cursive",
              fontWeight: 700,
              fontSize: "48px",
              color: "#d4a82a",
            }}
          >
            Changes
          </span>
          <br />
          <span
            style={{
              fontFamily: "var(--font-dancing), cursive",
              fontWeight: 700,
              fontSize: "48px",
              color: "#d4a82a",
            }}
          >
            Everything
          </span>
        </h2>

        {/* Underline */}
        <div
          style={{
            width: "48px",
            height: "3px",
            backgroundColor: "#10B981",
            margin: "0 auto 24px",
            borderRadius: "2px",
          }}
        />

        {/* Body */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "29.25px",
            color: "#D1FAE5",
            textAlign: "center",
          }}
        >
          It's not just about the money in the bank. It's about the freedom to choose your path,
          the peace of mind to sleep at night, and the power to impact the world.
        </p>
      </div>
    </section>
  );
}