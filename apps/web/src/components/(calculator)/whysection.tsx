"use client";

import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const features = [
  {
    title: "Goal Planning",
    description:
      "Align your investments with real-life milestones like home buying, education, or world travel.",
    icon: (
      <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 27V22.5H13.5V7.5H10.5V12H0V0H10.5V4.5H19.5V0H30V12H19.5V7.5H16.5V19.5H19.5V15H30V27H19.5ZM3 3V9V3ZM22.5 18V24V18ZM22.5 3V9V3ZM22.5 9H27V3H22.5V9ZM22.5 24H27V18H22.5V24ZM3 9H7.5V3H3V9Z" fill="#11D462"/>
      </svg>
    ),
  },
  {
    title: "Investment Estimation",
    description:
      "Get accurate projections of your future portfolio value based on custom expected returns.",
    icon: (
      <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 21H9V10.5H6V21ZM12 21H15V6H12V21ZM18 21H21V15H18V21ZM3 27C2.175 27 1.46875 26.7062 0.88125 26.1187C0.29375 25.5312 0 24.825 0 24V3C0 2.175 0.29375 1.46875 0.88125 0.88125C1.46875 0.29375 2.175 0 3 0H24C24.825 0 25.5312 0.29375 26.1187 0.88125C26.7062 1.46875 27 2.175 27 3V24C27 24.825 26.7062 25.5312 26.1187 26.1187C25.5312 26.7062 24.825 27 24 27H3ZM3 24H24V3H3V24ZM3 3V24V3Z" fill="#11D462"/>
      </svg>
    ),
  },
  {
    title: "Retirement Ready",
    description:
      "Calculate exactly how much you need to maintain your lifestyle after you stop working.",
    icon: (
      <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 13.5C21.425 13.5 21.7812 13.3563 22.0688 13.0688C22.3563 12.7812 22.5 12.425 22.5 12C22.5 11.575 22.3563 11.2188 22.0688 10.9312C21.7812 10.6437 21.425 10.5 21 10.5C20.575 10.5 20.2188 10.6437 19.9312 10.9312C19.6437 11.2188 19.5 11.575 19.5 12C19.5 12.425 19.6437 12.7812 19.9312 13.0688C20.2188 13.3563 20.575 13.5 21 13.5ZM9 10.5H16.5V7.5H9V10.5ZM3.75 28.5C2.9 25.65 2.0625 22.8062 1.2375 19.9688C0.4125 17.1313 0 14.225 0 11.25C0 8.95 0.8 7 2.4 5.4C4 3.8 5.95 3 8.25 3H15.75C16.475 2.05 17.3562 1.3125 18.3937 0.7875C19.4312 0.2625 20.55 0 21.75 0C22.375 0 22.9062 0.21875 23.3438 0.65625C23.7812 1.09375 24 1.625 24 2.25C24 2.4 23.9813 2.55 23.9438 2.7C23.9062 2.85 23.8625 2.9875 23.8125 3.1125C23.7125 3.3875 23.6187 3.66875 23.5312 3.95625C23.4438 4.24375 23.375 4.5375 23.325 4.8375L26.7375 8.25H30V18.7125L25.7625 20.1L23.25 28.5H15V25.5H12V28.5H3.75ZM6 25.5H9V22.5H18V25.5H21L23.325 17.775L27 16.5375V11.25H25.5L20.25 6C20.25 5.5 20.2812 5.01875 20.3438 4.55625C20.4062 4.09375 20.5 3.625 20.625 3.15C19.9 3.35 19.2625 3.69375 18.7125 4.18125C18.1625 4.66875 17.7625 5.275 17.5125 6H8.25C6.8 6 5.5625 6.5125 4.5375 7.5375C3.5125 8.5625 3 9.8 3 11.25C3 13.7 3.3375 16.0938 4.0125 18.4312C4.6875 20.7687 5.35 23.125 6 25.5Z" fill="#11D462"/>
      </svg>
    ),
  },
];

export default function WhyMoneyMati() {
  return (
    <section
      className={inter.className}
      style={{
        backgroundColor: "#f5f0e8",
        padding: "48px 48px 64px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Heading */}
        <h2
          style={{
            margin: "0 0 48px",
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            lineHeight: "30px",
            color: "#0e3d27",
            textAlign: "center",
          }}
        >
          Why use MoneyMati tools?
        </h2>

        {/* Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "40px",
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "14px",
              }}
            >
              {/* Icon */}
              <div>{feature.icon}</div>

              {/* Title */}
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  lineHeight: "22px",
                  color: "#0e3d27",
                }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 400,
                  fontSize: "13.5px",
                  lineHeight: "21px",
                  color: "rgba(14,61,39,0.55)",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}