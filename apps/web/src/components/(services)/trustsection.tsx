"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";

const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const features = [
  "Long Term Relationships",
  "Trust and Confidentiality",
  "Comprehensive Understanding",
  "Integrity and Expertise",
  "Client Centricity",
];

export default function TrustSection() {
  return (
    <section
      className={`${playfairDisplay.variable} ${dmSans.variable}`}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url('/Rectangle.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "24px 80px 0",
        minHeight: "auto",
      }}
    >
      {/* Content */}
      <div
        className="relative mx-auto flex flex-col items-center"
        style={{ maxWidth: "960px", zIndex: 10 }}
      >
        {/* Eyebrow badge */}
        <div
          style={{
            backgroundColor: "rgba(17,212,98,0.10)",
            borderRadius: "9999px",
            padding: "6px 16px",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "20px",
              letterSpacing: "0.7px",
              textTransform: "uppercase",
              color: "#11D462",
            }}
          >
            We build trust and maintaining a long lasting relations!
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 500,
            fontSize: "36px",
            lineHeight: "45px",
            letterSpacing: "3px",
            color: "#F1F5F9",
            textAlign: "center",
            marginBottom: "24px",
            maxWidth: "1000px",
          }}
        >
          Our specialist team understands the importance of a long lasting relationships with clients to deliver specific investment solutions.
        </h2>

        {/* Feature cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
          style={{ maxWidth: "900px" }}
        >
          {features.map((feature, i) => (
            <div
              key={feature}
              style={{
                backgroundColor: "rgba(15,23,42,0.40)",
                border: "1px solid rgba(30,41,59,0.50)",
                borderRadius: "16px",
                padding: "24px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                gridColumn: i === 4 ? "1 / 2" : undefined,
              }}
            >
              {/* Check icon box */}
              <div
                style={{
                  width: "38.73px",
                  height: "40px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(17,212,98,0.10)",
                  border: "1px solid rgba(17,212,98,0.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#11D462" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  lineHeight: "28px",
                  letterSpacing: "-0.45px",
                  color: "#F1F5F9",
                }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom waves */}
      <div
        style={{
          position: "relative",
          marginTop: "16px",
          lineHeight: 0,
          zIndex: 1,
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          height: "186px",
        }}
      >
        {/* Vector 6 — back wave, flush to bottom */}
        <svg
          width="100%"
          height="153"
          viewBox="0 0 1440 153"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 1,
            display: "block",
          }}
        >
          <path d="M627.59 90.5C450.658 78.1 135.642 127.667 0 150L1439.5 153V0C1333.93 17.6667 1095.24 60.5 985.044 90.5C847.301 128 848.756 106 627.59 90.5Z" fill="#1B3226"/>
        </svg>

        {/* Vector 7 — front wave, on top */}
        <svg
          width="100%"
          height="186"
          viewBox="0 0 1439 186"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 2,
            display: "block",
          }}
        >
          <path d="M627.09 90.5C450.158 78.1 135.642 163.667 0 186L1439 153V0C1333.43 17.6667 1094.74 60.5 984.544 90.5C846.801 128 848.256 106 627.09 90.5Z" fill="#214533" fillOpacity="0.29"/>
        </svg>
      </div>
    </section>
  );
}