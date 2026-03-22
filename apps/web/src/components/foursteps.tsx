"use client";

import { Dancing_Script, Playfair_Display, DM_Sans } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const steps = [
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="15" y2="11" />
      </svg>
    ),
    title: "Learn the Basics",
    description: "Start with foundational financial literacy courses and resources.",
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: "Define Your Goals",
    description: "Set clear financial goals tailored to your life and aspirations.",
    active: true,
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 9a7 7 0 1 0-13.33 3H4l1 5h1l.5 2h9l.5-2H17l1-5h-1.67A7 7 0 0 0 19 9z" />
        <path d="M12 6v3l2 1" />
        <circle cx="19" cy="9" r="1" fill="currentColor" />
      </svg>
    ),
    title: "Set Smart Habits",
    description: "Build sustainable money management habits that work for you.",
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: "Build & Grow",
    description: "Invest wisely and watch your wealth grow over time with confidence.",
  },
];

export default function FourSteps() {
  return (
    <section
      className={`${dancingScript.variable} ${playfairDisplay.variable} ${dmSans.variable}`}
      style={{
        backgroundColor: "#F8F6F1",
        padding: "80px 24px",
        fontFamily: "var(--font-dm-sans), sans-serif",
      }}
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <h2
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            color: "#1a2e1a",
            marginBottom: "12px",
            lineHeight: 1.3,
          }}
        >
          <span style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}>
            Four Steps to Financial{" "}
          </span>
          <span
            style={{
              fontFamily: "var(--font-dancing), cursive",
              color: "#d4a82a",
              fontWeight: 400,
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            }}
          >
            Freedom
          </span>
        </h2>
        <p
          style={{
            color: "#6b7c6b",
            fontSize: "0.95rem",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          A proven path to help you build confidence, security, and lasting wealth.
        </p>
      </div>

      {/* Steps */}
      <div
        className="relative mx-auto"
        style={{ maxWidth: "900px" }}
      >
        {/* Connecting line */}
        <div
          className="absolute"
          style={{
            top: "36px",
            left: "calc(12.5% + 36px)",
            right: "calc(12.5% + 36px)",
            height: "1.5px",
            background: "linear-gradient(to right, #2d5a3d, #d4a82a, #2d5a3d)",
            zIndex: 0,
          }}
        />

        <div className="grid grid-cols-4 gap-4 relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {/* Icon circle */}
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  backgroundColor: "#e8e5de",
                  border: "none",
                  boxShadow: step.active
                    ? "0 0 0 4px #f5f3ee, 0 4px 20px rgba(45,90,61,0.18)"
                    : "0 0 0 4px #f5f3ee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2d5a3d",
                  marginBottom: "20px",
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <p
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "#1a2e1a",
                  marginBottom: "10px",
                }}
              >
                {step.title}
              </p>

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.82rem",
                  color: "#6b7c6b",
                  lineHeight: 1.6,
                  maxWidth: "160px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}