"use client";

import React from "react";
import { Dancing_Script, Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
const dancing = Dancing_Script({ subsets: ["latin"], weight: ["700"], variable: "--font-dancing" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-inter" });

const stats = [
  { label: "FORUMS", value: "24", dot: false },
  { label: "TOPICS", value: "12.5k", dot: false },
  { label: "POSTS", value: "88.2k", dot: false },
  { label: "ONLINE", value: "1,402", dot: true },
  { label: "NEWEST", value: "Swathi", dot: false, isName: true },
];

export default function CommunityHero() {
  const router = useRouter();
  return (
    <section
      className={`${inter.variable} ${dancing.variable}`}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "300px",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "40px 48px 60px",
        boxSizing: "border-box",
        backgroundColor: "#0d2818",
      }}
    >
      {/* Golden blur decoration - top right */}
      <div
        style={{
          position: "absolute",
          width: "274px",
          height: "256px",
          top: "100px",
          right: "0px",
          borderRadius: "9999px",
          backgroundColor: "rgba(212, 175, 55, 0.17)",
          filter: "blur(120px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* BG image layer 1 - Rectangle 8 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="/Rectangle 8.svg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>

      {/* BG image layer 2 - svg (6) overlay lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Image
          src="/SVG (6).svg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* Dark green overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(4, 40, 28, 0.35)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "600px",
        }}
      >
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
  onClick={() => router.push("/")}
  style={{
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    color: "rgba(255,255,255,0.7)",
    cursor: "pointer",
  }}
>
  Home
</span>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>›</span>
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#D4AF37",
            }}
          >
            Forum
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            margin: 0,
            fontSize: "72px",
            lineHeight: "72px",
            letterSpacing: "-1.8px",
            color: "#ffffff",
            display: "flex",
            alignItems: "baseline",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 700,
            }}
          >
            The
          </span>
          <span
            style={{
              fontFamily: "var(--font-dancing), cursive",
              fontWeight: 700,
              color: "#D4AF37",
            }}
          >
            Community
          </span>
        </h1>

        {/* Description */}
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "29.25px",
            color: "rgba(209, 250, 229, 0.80)",
            maxWidth: "520px",
          }}
        >
          Exchange insights, discuss market trends, and grow your wealth with
          50,000+ members in our premium financial ecosystem.
        </p>
      </div>

      {/* Stats bar — floats below hero, overlapping next section */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          gap: "12px",
          marginTop: "32px",
          marginBottom: "-40px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              minWidth: 0,
              height: "80px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 20px",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.45)",
                marginBottom: "6px",
              }}
            >
              {stat.label}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {stat.dot && (
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#11D462",
                    flexShrink: 0,
                  }}
                />
              )}
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: stat.isName ? "18px" : "28px",
                  fontWeight: stat.isName ? 600 : 700,
                  color: "#004D40",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}