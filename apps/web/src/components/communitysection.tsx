"use client";

import { Dancing_Script, Playfair_Display, DM_Sans } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing", weight: ["700"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const features = [
  "Private Networking Groups",
  "Peer Mentorship Programs",
  "Exclusive Mastermind Sessions",
];

export default function CommunitySection() {
  return (
    <section
      className={`${dancingScript.variable} ${playfairDisplay.variable} ${dmSans.variable}`}
      style={{
        backgroundColor: "#f5f3ee",
        padding: "80px 24px",
        fontFamily: "var(--font-dm-sans), sans-serif",
      }}
    >
      <div
        className="mx-auto flex flex-col lg:flex-row items-center gap-12"
        style={{ maxWidth: "1100px" }}
      >
        {/* LEFT: Text */}
        <div className="flex-1" style={{ maxWidth: "480px" }}>
          {/* Heading */}
          <h2 className="mb-5" style={{ lineHeight: "40px" }}>
            <span
              style={{
                fontFamily: "var(--font-dancing), cursive",
                fontWeight: 700,
                fontSize: "36px",
                color: "#d4a82a",
                display: "inline",
              }}
            >
              A Community{" "}
            </span>
            <span
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 800,
                fontSize: "36px",
                color: "#1a3a2a",
                display: "inline",
              }}
            >
              That Grows
            </span>
            <br />
            <span
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 600,
                fontSize: "36px",
                color: "#1a3a2a",
                display: "inline",
              }}
            >
              Together
            </span>
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "26px",
              color: "#4a5a4a",
              marginBottom: "28px",
            }}
          >
            Education is only the first step. Our community offers a safe space for
            women to discuss investments, share wins, and navigate challenges without
            judgment. We host monthly meetups, mentorship circles, and interactive
            Q&A sessions.
          </p>

          {/* Feature list */}
          <ul className="flex flex-col gap-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                {/* Green check circle */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#10B981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#064E3B",
                  }}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: Image */}
        <div className="flex-1 flex justify-end">
          <div
            style={{
              width: "clamp(300px, 45vw, 520px)",
              height: "clamp(280px, 38vw, 420px)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            }}
          >
            <img
              src="/about1.svg"
              alt="Community of women"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}