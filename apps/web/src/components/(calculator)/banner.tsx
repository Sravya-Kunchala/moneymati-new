"use client";

import React from "react";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

export default function FinancialCTABanner() {
  return (
    <section
      className={inter.variable}
      style={{
        backgroundColor: "#f5f0e8",
        padding: "0 48px 48px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          borderRadius: "24px",
          overflow: "hidden",
          position: "relative",
          minHeight: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* BG graph image */}
        <Image
          src="/graph.svg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
        />

        {/* Overlay */}
        <Image
          src="/overlay.svg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center", zIndex: 1 }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "16px",
            padding: "48px 40px",
          }}
        >
          {/* Title */}
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 800,
              fontSize: "40px",
              lineHeight: "48px",
              color: "#ffffff",
              maxWidth: "800px",
            }}
          >
            Plan Your Financial Future With Confidence
          </h2>

          {/* Description */}
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "rgba(255,255,255,0.75)",
              maxWidth: "440px",
            }}
          >
            Join thousands of smart investors using our platform to build long-term sustainable wealth.
          </p>

          {/* CTA Button */}
          <button
            style={{
              marginTop: "8px",
              padding: "16px 40px",
              borderRadius: "9999px",
              backgroundColor: "#11D462",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "#ffffff",
            }}
          >
            Start Planning Today
          </button>
        </div>
      </div>
    </section>
  );
}