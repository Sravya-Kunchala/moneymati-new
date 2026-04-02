"use client";

import { Dancing_Script, Playfair_Display, Inter } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing", weight: ["700"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function FinancialConfidence() {
  return (
    <section
      className={`${dancingScript.variable} ${playfairDisplay.variable} ${inter.className}`}
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "420px",
      }}
    >
      {/* Rectangle 3 — base background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/Rectangle 3.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* finac.svg — wave overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/finac.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
        }}
      />

      {/* SVG 1 — wide subtle curve */}
      <svg
        width="100%"
        height="96"
        viewBox="0 0 1441 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: "55%",
          left: 0,
          zIndex: 2,
          opacity: 0.03
        }}
      >
        <path d="M0.0931396 47.6235C288.093 -15.2931 576.093 -15.2931 864.093 47.6235C1152.09 110.54 1344.09 110.54 1440.09 47.6235" stroke="white" strokeWidth="0.87225"/>
      </svg>

      {/* SVG 2 — wider subtle curve */}
      <svg
        width="100%"
        height="119"
        viewBox="0 0 1441 119"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: "40%",
          left: 0,
          zIndex: 2,
          opacity: 0.03
        }}
      >
        <path d="M0.135498 59.2935C240.136 -19.1831 480.136 -19.1831 720.136 59.2935C960.136 137.77 1200.14 137.77 1440.14 59.2935" stroke="white" strokeWidth="0.87225"/>
      </svg>

      {/* SVG 3 — dashed diagonal, right side */}
      <svg
        width="1028"
        height="309"
        viewBox="0 0 1028 309"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: "0.025%",
          right: 0,
          zIndex: 2,
          opacity: 0.03
        }}
      >
        <path d="M0 307.77C8 307.77 688 102.909 1027 0.478516" stroke="white" strokeDasharray="22 22"/>
      </svg>

      {/* Content */}
      <div
        className="relative text-center mx-auto px-6"
        style={{ maxWidth: "760px", padding: "80px 24px", zIndex: 10 }}
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
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "29.25px",
            letterSpacing: "0px",
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