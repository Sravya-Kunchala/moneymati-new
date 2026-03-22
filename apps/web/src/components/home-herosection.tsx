"use client";

import { Playfair_Display, Dancing_Script, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["800"], variable: "--font-playfair" });
const dancing = Dancing_Script({ subsets: ["latin"], weight: ["700"], variable: "--font-dancing" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter" });

export default function MeetTheTeamHero() {
  return (
    <section
      className={`${playfair.variable} ${dancing.variable} ${inter.variable}`}
      style={{
        minHeight: "400px",
        backgroundColor: "#f5f0e8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background SVG */}
      <img
        src="/SVG (7).svg"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.08,
        }}
      />

      {/* Decorative circles */}
      <div style={{
        position: "absolute", top: 20, right: 60, width: 180, height: 180,
        borderRadius: "50%", border: "1px solid rgba(6,78,59,0.12)", pointerEvents: "none", zIndex: 1,
      }} />
      <div style={{
        position: "absolute", top: 60, right: 20, width: 100, height: 100,
        borderRadius: "50%", border: "1px solid rgba(6,78,59,0.08)", pointerEvents: "none", zIndex: 1,
      }} />
      <div style={{
        position: "absolute", bottom: 40, left: 40, width: 160, height: 160,
        borderRadius: "50%", border: "1px solid rgba(6,78,59,0.1)", pointerEvents: "none", zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", padding: "6px 16px",
          borderRadius: 9999, backgroundColor: "rgba(212,175,55,0.10)", marginBottom: 24,
        }}>
          <span style={{
            fontFamily: "var(--font-inter), sans-serif", fontWeight: 600,
            fontSize: 11, letterSpacing: "0.8px", textTransform: "uppercase", color: "#D4AF37",
          }}>
            Visionary Leadership
          </span>
        </div>

        {/* Title */}
        <h1 style={{ margin: "0 0 20px", lineHeight: "60px", fontSize: 60 }}>
          <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 800, color: "#0d2818" }}>
            Meet the{" "}
          </span>
          <span style={{ fontFamily: "var(--font-dancing), cursive", fontWeight: 700, color: "#D4AF37" }}>
            Team Behind
          </span>
          <br />
          <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 800, color: "#0d2818" }}>
            MoneyMati
          </span>
        </h1>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-inter), sans-serif", fontWeight: 400,
          fontSize: 20, lineHeight: "28px", color: "rgba(6,78,59,0.70)",
          maxWidth: 480, margin: "0 0 36px",
        }}>
          Our team is dedicated to helping women gain financial confidence
          through education, guidance, and community support.
        </p>

        {/* Button */}
        <button style={{
          width: 321, height: 56, minWidth: 200, borderRadius: 59,
          backgroundColor: "#064E3B", border: "none", cursor: "pointer",
          fontFamily: "var(--font-inter), sans-serif", fontWeight: 600,
          fontSize: 14, color: "#ffffff",
        }}>
          Join Our Community
        </button>

      </div>
    </section>
  );
}