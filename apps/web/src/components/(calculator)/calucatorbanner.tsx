"use client";

import React from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

export default function SIPCalculatorBanner() {
  const router = useRouter();
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
          .sip-section {
            padding: 0 16px 32px !important;
          }
          .sip-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto !important;
            min-height: unset !important;
          }
          /* Image panel goes on top */
          .sip-image-panel {
            order: -1 !important;
            min-height: 160px !important;
          }
          .sip-content-panel {
            padding: 28px 20px !important;
          }
          .sip-title {
            font-size: 28px !important;
            line-height: 34px !important;
          }
          .sip-buttons {
            flex-direction: column !important;
          }
          .sip-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>

      <div
        className="sip-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          borderRadius: "24px",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "240px",
          backgroundColor: "#0e3d27",
        }}
      >
        {/* Left — content */}
        <div
          className="sip-content-panel"
          style={{
            backgroundColor: "#0e3d27",
            padding: "40px 44px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "16px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Blury background */}
          <Image
            src="/blury.svg"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
          />
          {/* Content above blur */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Badge */}
            <div style={{ alignSelf: "flex-start" }}>
              <span
                style={{
                  padding: "4px 14px",
                  borderRadius: "9999px",
                  backgroundColor: "#11D462",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                Most Popular
              </span>
            </div>

            {/* Title */}
            <h2
              className="sip-title"
              style={{
                margin: 0,
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 800,
                fontSize: "40px",
                lineHeight: "44px",
                color: "#ffffff",
              }}
            >
              SIP Calculator
            </h2>

            {/* Description */}
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 400,
                fontSize: "15px",
                lineHeight: "24px",
                color: "rgba(255,255,255,0.75)",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              Estimate how much your systematic investments will grow over time. Visualize the power of compounding and long-term wealth creation in seconds.
            </p>

            {/* Buttons */}
            <div className="sip-buttons" style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
              <button
                className="sip-btn"
                onClick={() => router.push("/sipcalucator")}
                style={{
                  padding: "17px 32px",
                  borderRadius: "16px",
                  backgroundColor: "#004D40",
                  border: "1px solid #FFFFFF",
                  cursor: "pointer",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#ffffff",
                  height: "58px",
                  boxSizing: "border-box",
                }}
              >
                Calculate Now
              </button>
              <button
                className="sip-btn"
                style={{
                  padding: "16px 32px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  cursor: "pointer",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#ffffff",
                  height: "58px",
                  boxSizing: "border-box",
                }}
              >
                View Methodology
              </button>
            </div>
          </div>
        </div>

        {/* Right — image */}
        <div className="sip-image-panel" style={{ position: "relative", minHeight: "240px" }}>
          <Image
            src="/financila-chart.svg"
            alt="SIP growth chart"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </div>
    </section>
  );
}