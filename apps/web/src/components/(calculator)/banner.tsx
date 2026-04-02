"use client";

import React from "react";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

export default function FinancialCTABanner() {
  return (
    <section
      className={inter.className}
      style={{
        backgroundColor: "#f5f0e8",
        padding: "0 48px 48px",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .cta-section {
            padding: 0 20px 32px !important;
          }
          .cta-content {
            padding: 36px 24px !important;
            gap: 14px !important;
          }
          .cta-title {
            font-size: 26px !important;
            line-height: 34px !important;
            max-width: 100% !important;
          }
          .cta-desc {
            font-size: 14px !important;
            line-height: 22px !important;
            max-width: 100% !important;
          }
          .cta-btn {
            width: auto !important;
            padding: 14px 36px !important;
            font-size: 15px !important;
            white-space: nowrap !important;
            align-self: center !important;
          }
        }
      `}</style>

      <div
        className="cta-section"
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
          className="cta-content"
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
            className="cta-title"
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
            className="cta-desc"
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
            className="cta-btn"
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