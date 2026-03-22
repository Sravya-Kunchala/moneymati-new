"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Playfair_Display, Dancing_Script } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-playfair",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-dancing",
});

export default function MoneyMatiHero() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      console.log("Searching for:", query);
    }
  };

  return (
    <section
      className={`${playfair.variable} ${dancing.variable}`}
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
      }}
    >
      {/* Background */}
      <Image
        src="/hero-bg.svg"
        alt=""
        fill
        priority
        style={{ objectFit: "cover", zIndex: 0 }}
      />

      {/* Vector line 1 */}
      <Image
        src="/vector1.svg"
        alt=""
        fill
        style={{ objectFit: "cover", zIndex: 1, pointerEvents: "none" }}
      />

      {/* Vector line 2 */}
      <Image
        src="/vector12.svg"
        alt=""
        fill
        style={{ objectFit: "cover", zIndex: 1, pointerEvents: "none" }}
      />

      {/* Title */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "8px",
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 900,
            fontSize: "72px",
            lineHeight: "72px",
            letterSpacing: "-1.8px",
            color: "#ffffff",
          }}
        >
          MoneyMati
        </span>
        <span
          style={{
            fontFamily: "var(--font-dancing), cursive",
            fontWeight: 700,
            fontSize: "72px",
            lineHeight: "72px",
            letterSpacing: "-1.8px",
            color: "#f5a623",
          }}
        >
          E-Book
        </span>
      </div>

      {/* Search bar */}
      <div
        style={{
          position: "relative",
          width: "672px",
          height: "71px",
          background: "rgba(255, 255, 255, 0.02)",
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          padding: "0 8px 0 20px",
          gap: "12px",
          boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          zIndex: 3,
        }}
      >
        {/* Search icon */}
        <svg
          style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        {/* Input */}
        <input
          type="text"
          placeholder="Search for financial Insights..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: "15px",
            color: "rgba(255, 255, 255, 0.7)",
            fontFamily: "sans-serif",
          }}
        />

        {/* Search button */}
        <button
          onClick={handleSearch}
          style={{
            background: "#11D462",
            color: "#fff",
            fontWeight: 700,
            fontSize: "14px",
            border: "none",
            borderRadius: "16px",
            padding: "12px 32px",
            height: "48px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            letterSpacing: "0.2px",
            fontFamily: "sans-serif",
          }}
        >
          Search
        </button>
      </div>
    </section>
  );
}