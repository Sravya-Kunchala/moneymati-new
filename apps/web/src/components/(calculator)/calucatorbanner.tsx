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
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "240px",
          backgroundColor: "#0e3d27",
        }}
      >
        {/* Left — content */}
        <div
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
          <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
           <button
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
        <div style={{ position: "relative", minHeight: "240px" }}>
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