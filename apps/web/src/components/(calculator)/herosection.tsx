"use client";

import React from "react";
import { Dancing_Script, Inter } from "next/font/google";
import Image from "next/image";

const dancing = Dancing_Script({ subsets: ["latin"], weight: ["700"], variable: "--font-dancing" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

export default function FinancialCalculators() {
  return (
    <div className={`${inter.variable} ${dancing.variable}`} style={{ backgroundColor: "#f5f0e8" }}>

      {/* ── Hero + overlapping card wrapper ── */}
      <div style={{ position: "relative" }}>

        {/* Hero */}
        <section
          style={{
            position: "relative",
            width: "100%",
            minHeight: "200px",
            backgroundColor: "#0d2818",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "40px 48px 120px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* BG image */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image
              src="/financial-planning.svg"
              alt=""
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
          </div>

          {/* Dark overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(4, 40, 28, 0.5)", zIndex: 1 }} />

          {/* Text content */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: "560px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>Home</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>›</span>
              <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", fontWeight: 600, color: "#D4AF37" }}>Calculators</span>
            </div>

            {/* Title */}
            <h1 style={{ margin: 0, display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 800, fontSize: "52px", lineHeight: "56px", color: "#ffffff" }}>
                Financial
              </span>
              <span style={{ fontFamily: "var(--font-dancing), cursive", fontWeight: 700, fontSize: "52px", lineHeight: "56px", color: "#D4AF37" }}>
                Calculators
              </span>
            </h1>

            {/* Description */}
            <p style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "26px", color: "rgba(255,255,255,0.75)", maxWidth: "440px" }}>
              Precision tools designed for high-net-worth planning, wealth creation, and securing your financial future with absolute confidence.
            </p>
          </div>
        </section>

        {/* ── Floating card — positioned to straddle hero bottom ── */}
        <div
          style={{
            position: "absolute",
            bottom: "-140px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "680px",
            zIndex: 10,
            padding: "0 24px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              padding: "28px 56px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              textAlign: "center",
            }}
          >
            {/* Badge */}
            <span
              style={{
                padding: "4px 14px",
                borderRadius: "9999px",
                backgroundColor: "#f0fdf4",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#047857",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              Precision Planning
            </span>

            {/* Title */}
            <h2 style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "24px", lineHeight: "32px", color: "#1a1a1a" }}>
              Financial Planning Suite
            </h2>

            {/* Description */}
            <p style={{ margin: 0, fontFamily: "var(--font-inter), sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "22px", color: "#64748b", maxWidth: "380px" }}>
              Take control of your financial destiny with our suite of precision tools. Whether you're estimating returns, planning for retirement, or calculating long-term wealth growth, our algorithms provide the clarity you need.
            </p>
          </div>
        </div>
      </div>

      {/* ── Spacer for card overflow ── */}
      <div style={{ height: "180px", backgroundColor: "#f5f0e8" }} />

    </div>
  );
}