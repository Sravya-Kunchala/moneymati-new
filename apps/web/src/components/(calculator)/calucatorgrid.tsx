"use client";

import React from "react";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-dm-sans" });

interface Calculator {
  id: number;
  tag: string;
  title: string;
  description: string;
  cta: string;
  href?: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

const calculators: Calculator[] = [
  {
    id: 1,
    tag: "STRATEGY",
    title: "Goal Calculator",
    description: "Define your targets and let us map the path to achievement.",
    cta: "Try Now",
    href: "/goal-calucator",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.125 20C10.125 19.8958 8.4375 19.125 7.0625 17.6875C5.6875 16.25 5 14.5208 5 12.5C5 10.4167 5.72917 8.64583 7.1875 7.1875C8.64583 5.72917 10.4167 5 12.5 5C14.5208 5 16.25 5.6875 17.6875 7.0625C19.125 8.4375 19.8958 10.125 20 12.125L17.375 11.3438C17.1042 10.2188 16.5208 9.29688 15.625 8.57812C14.7292 7.85938 13.6875 7.5 12.5 7.5C11.125 7.5 9.94792 7.98958 8.96875 8.96875C7.98958 9.94792 7.5 11.125 7.5 12.5C7.5 13.6875 7.85938 14.7292 8.57812 15.625C9.29688 16.5208 10.2188 17.1042 11.3438 17.375L12.125 20ZM13.625 24.9375C13.4375 24.9792 13.25 25 13.0625 25C12.875 25 12.6875 25 12.5 25C10.7708 25 9.14583 24.6719 7.625 24.0156C6.10417 23.3594 4.78125 22.4688 3.65625 21.3438C2.53125 20.2188 1.64062 18.8958 0.984375 17.375C0.328125 15.8542 0 14.2292 0 12.5C0 10.7708 0.328125 9.14583 0.984375 7.625C1.64062 6.10417 2.53125 4.78125 3.65625 3.65625C4.78125 2.53125 6.10417 1.64062 7.625 0.984375C9.14583 0.328125 10.7708 0 12.5 0C14.2292 0 15.8542 0.328125 17.375 0.984375C18.8958 1.64062 20.2188 2.53125 21.3438 3.65625C22.4688 4.78125 23.3594 6.10417 24.0156 7.625C24.6719 9.14583 25 10.7708 25 12.5C25 12.6875 25 12.875 25 13.0625C25 13.25 24.9792 13.4375 24.9375 13.625L22.5 12.875V12.5C22.5 9.70833 21.5312 7.34375 19.5938 5.40625C17.6562 3.46875 15.2917 2.5 12.5 2.5C9.70833 2.5 7.34375 3.46875 5.40625 5.40625C3.46875 7.34375 2.5 9.70833 2.5 12.5C2.5 15.2917 3.46875 17.6562 5.40625 19.5938C7.34375 21.5312 9.70833 22.5 12.5 22.5C12.5625 22.5 12.625 22.5 12.6875 22.5C12.75 22.5 12.8125 22.5 12.875 22.5L13.625 24.9375ZM23.1562 25.625L17.8125 20.2812L16.25 25L12.5 12.5L25 16.25L20.2812 17.8125L25.625 23.1562L23.1562 25.625Z" fill="#0F172A"/>
      </svg>
    ),
  },
  {
    id: 2,
    tag: "SIP PLANNING",
    title: "SIP Calculator",
    description: "Determine the exact monthly contribution needed for your target.",
    cta: "Calculate",
    href: "/sipcalucator",
    icon: (
      <svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.03125 16.2812L0 14.8125L6.25 4.8125L10 9.1875L15 1.0625L18.75 6.6875L22.9688 0L25 1.46875L18.8125 11.2812L15.0938 5.6875L10.3438 13.4062L6.5625 9L2.03125 16.2812ZM16.875 21.25C17.75 21.25 18.4896 20.9479 19.0938 20.3438C19.6979 19.7396 20 19 20 18.125C20 17.25 19.6979 16.5104 19.0938 15.9062C18.4896 15.3021 17.75 15 16.875 15C16 15 15.2604 15.3021 14.6562 15.9062C14.0521 16.5104 13.75 17.25 13.75 18.125C13.75 19 14.0521 19.7396 14.6562 20.3438C15.2604 20.9479 16 21.25 16.875 21.25ZM23.25 26.25L19.875 22.875C19.4375 23.1667 18.9635 23.3854 18.4531 23.5312C17.9427 23.6771 17.4167 23.75 16.875 23.75C15.3125 23.75 13.9844 23.2031 12.8906 22.1094C11.7969 21.0156 11.25 19.6875 11.25 18.125C11.25 16.5625 11.7969 15.2344 12.8906 14.1406C13.9844 13.0469 15.3125 12.5 16.875 12.5C18.4375 12.5 19.7656 13.0469 20.8594 14.1406C21.9531 15.2344 22.5 16.5625 22.5 18.125C22.5 18.6667 22.4271 19.1927 22.2812 19.7031C22.1354 20.2135 21.9167 20.6875 21.625 21.125L25 24.5L23.25 26.25Z" fill="#0F172A"/>
      </svg>
    ),
  },
  {
    id: 3,
    tag: "FUTURE PROOF",
    title: "Retirement Calculator",
    description: "Secure your golden years with precise corpus estimation.",
    cta: "Plan Now",
    href: "/reteriment",
    icon: (
      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.75 22.5312L12.8125 14.5938L14.5625 12.8438L22.5 20.7812L20.75 22.5312ZM3.6875 21.6562C2.4375 20.4062 1.51042 19 0.90625 17.4375C0.302083 15.875 0 14.2812 0 12.6562C0 11.0312 0.302083 9.44792 0.90625 7.90625C1.51042 6.36458 2.4375 4.96875 3.6875 3.71875C4.9375 2.46875 6.33854 1.53646 7.89062 0.921875C9.44271 0.307292 11.0312 0 12.6562 0C14.2812 0 15.8698 0.307292 17.4219 0.921875C18.974 1.53646 20.375 2.46875 21.625 3.71875L3.6875 21.6562ZM3.9375 17.8438L5.625 16.1562C5.29167 15.7188 4.97396 15.2708 4.67188 14.8125C4.36979 14.3542 4.09375 13.8958 3.84375 13.4375C3.59375 12.9792 3.375 12.5208 3.1875 12.0625C3 11.6042 2.83333 11.1562 2.6875 10.7188C2.45833 11.9479 2.44271 13.1771 2.64062 14.4062C2.83854 15.6354 3.27083 16.7812 3.9375 17.8438ZM7.4375 14.4062L14.375 7.40625C13.4792 6.71875 12.5781 6.16146 11.6719 5.73438C10.7656 5.30729 9.91667 5.01562 9.125 4.85938C8.33333 4.70312 7.61979 4.67708 6.98438 4.78125C6.34896 4.88542 5.85417 5.11458 5.5 5.46875C5.14583 5.84375 4.91667 6.34896 4.8125 6.98438C4.70833 7.61979 4.73438 8.33854 4.89062 9.14062C5.04688 9.94271 5.33854 10.7917 5.76562 11.6875C6.19271 12.5833 6.75 13.4896 7.4375 14.4062ZM16.125 5.65625L17.875 3.96875C16.7708 3.30208 15.6042 2.86458 14.375 2.65625C13.1458 2.44792 11.9167 2.46875 10.6875 2.71875C11.1458 2.86458 11.6042 3.03125 12.0625 3.21875C12.5208 3.40625 12.9792 3.61979 13.4375 3.85938C13.8958 4.09896 14.349 4.36979 14.7969 4.67188C15.2448 4.97396 15.6875 5.30208 16.125 5.65625Z" fill="#0F172A"/>
      </svg>
    ),
  },
  {
    id: 4,
    tag: "SMALL SAVINGS",
    title: "Sukanya Samriddhi Calculator",
    description: "Calculate returns for the future of your daughter's education.",
    cta: "Calculate",
    href: "/sukanya",
    icon: (
      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.375 10.9375C13.9375 10.9375 13.5677 10.7865 13.2656 10.4844C12.9635 10.1823 12.8125 9.8125 12.8125 9.375C12.8125 8.9375 12.9635 8.56771 13.2656 8.26562C13.5677 7.96354 13.9375 7.8125 14.375 7.8125C14.8125 7.8125 15.1823 7.96354 15.4844 8.26562C15.7865 8.56771 15.9375 8.9375 15.9375 9.375C15.9375 9.8125 15.7865 10.1823 15.4844 10.4844C15.1823 10.7865 14.8125 10.9375 14.375 10.9375ZM8.125 10.9375C7.6875 10.9375 7.31771 10.7865 7.01562 10.4844C6.71354 10.1823 6.5625 9.8125 6.5625 9.375C6.5625 8.9375 6.71354 8.56771 7.01562 8.26562C7.31771 7.96354 7.6875 7.8125 8.125 7.8125C8.5625 7.8125 8.93229 7.96354 9.23438 8.26562C9.53646 8.56771 9.6875 8.9375 9.6875 9.375C9.6875 9.8125 9.53646 10.1823 9.23438 10.4844C8.93229 10.7865 8.5625 10.9375 8.125 10.9375ZM11.25 17.5C10 17.5 8.86979 17.1562 7.85938 16.4688C6.84896 15.7812 6.10417 14.875 5.625 13.75H16.875C16.3958 14.875 15.651 15.7812 14.6406 16.4688C13.6302 17.1562 12.5 17.5 11.25 17.5ZM11.25 22.5C9.6875 22.5 8.22396 22.2031 6.85938 21.6094C5.49479 21.0156 4.30729 20.2135 3.29688 19.2031C2.28646 18.1927 1.48438 17.0052 0.890625 15.6406C0.296875 14.276 0 12.8125 0 11.25C0 9.6875 0.296875 8.22396 0.890625 6.85938C1.48438 5.49479 2.28646 4.30729 3.29688 3.29688C4.30729 2.28646 5.49479 1.48438 6.85938 0.890625C8.22396 0.296875 9.6875 0 11.25 0C12.8125 0 14.276 0.296875 15.6406 0.890625C17.0052 1.48438 18.1927 2.28646 19.2031 3.29688C20.2135 4.30729 21.0156 5.49479 21.6094 6.85938C22.2031 8.22396 22.5 9.6875 22.5 11.25C22.5 12.8125 22.2031 14.276 21.6094 15.6406C21.0156 17.0052 20.2135 18.1927 19.2031 19.2031C18.1927 20.2135 17.0052 21.0156 15.6406 21.6094C14.276 22.2031 12.8125 22.5 11.25 22.5ZM11.25 20C13.6667 20 15.7292 19.1458 17.4375 17.4375C19.1458 15.7292 20 13.6667 20 11.25C20 8.83333 19.1458 6.77083 17.4375 5.0625C15.7292 3.35417 13.6667 2.5 11.25 2.5C11.125 2.5 11 2.5 10.875 2.5C10.75 2.5 10.625 2.52083 10.5 2.5625C10.375 2.6875 10.2917 2.82292 10.25 2.96875C10.2083 3.11458 10.1875 3.27083 10.1875 3.4375C10.1875 3.875 10.3385 4.24479 10.6406 4.54688C10.9427 4.84896 11.3125 5 11.75 5C11.9375 5 12.1094 4.96875 12.2656 4.90625C12.4219 4.84375 12.5833 4.8125 12.75 4.8125C13 4.8125 13.2083 4.90625 13.375 5.09375C13.5417 5.28125 13.625 5.5 13.625 5.75C13.625 6.22917 13.401 6.53646 12.9531 6.67188C12.5052 6.80729 12.1042 6.875 11.75 6.875C10.8125 6.875 10.0052 6.53646 9.32812 5.85938C8.65104 5.18229 8.3125 4.375 8.3125 3.4375C8.3125 3.375 8.3125 3.3125 8.3125 3.25C8.3125 3.1875 8.32292 3.10417 8.34375 3C6.61458 3.625 5.20833 4.67708 4.125 6.15625C3.04167 7.63542 2.5 9.33333 2.5 11.25C2.5 13.6667 3.35417 15.7292 5.0625 17.4375C6.77083 19.1458 8.83333 20 11.25 20Z" fill="#0F172A"/>
      </svg>
    ),
  },
  {
    id: 5,
    tag: "ANALYSIS",
    title: "CAGR Calculator",
    description: "Measure the compound annual growth rate of your investments.",
    cta: "Analyze",
    href: "/cgarcalucator",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    id: 6,
    tag: "",
    title: "More Coming Soon",
    description: "We're building more tools to help you manage your wealth effectively.",
    cta: "",
    comingSoon: true,
    icon: null,
  },
];

const CalculatorCard: React.FC<{ calc: Calculator }> = ({ calc }) => {
  if (calc.comingSoon) {
    return (
      <div
        className="calc-card calc-card--soon"
        style={{
          backgroundColor: "#f0f0eb",
          borderRadius: "16px",
          padding: "32px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "10px",
          border: "2px dashed #c8c8b8",
          minHeight: "200px",
        }}
      >
        <div style={{ display: "flex", gap: "5px", marginBottom: "4px" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#11D462" }} />
          ))}
        </div>
        <h3
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 700,
            color: "#1a1a1a",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          {calc.title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            lineHeight: "20px",
            color: "#64748b",
            fontFamily: "var(--font-dm-sans), sans-serif",
            maxWidth: "200px",
          }}
        >
          {calc.description}
        </p>
      </div>
    );
  }

  return (
    <div
      className="calc-card"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        cursor: "pointer",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.09)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Icon */}
      <div
        className="calc-card__icon"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          backgroundColor: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "4px",
        }}
      >
        {calc.icon}
      </div>

      {/* Tag */}
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          color: "#64748b",
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        {calc.tag}
      </span>

      {/* Title */}
      <h3
        style={{
          margin: 0,
          fontSize: "18px",
          fontWeight: 700,
          color: "#1a1a1a",
          fontFamily: "var(--font-dm-sans), sans-serif",
          lineHeight: "24px",
        }}
      >
        {calc.title}
      </h3>

      {/* Description */}
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          lineHeight: "20px",
          color: "#64748b",
          fontFamily: "var(--font-dm-sans), sans-serif",
          flex: 1,
        }}
      >
        {calc.description}
      </p>

      {/* CTA */}
      <a
        href={calc.href || "#"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "14px",
          fontWeight: 600,
          color: "#004D40",
          textDecoration: "none",
          fontFamily: "var(--font-dm-sans), sans-serif",
          marginTop: "4px",
        }}
      >
        {calc.cta}
        <span style={{ fontSize: "16px" }}>→</span>
      </a>
    </div>
  );
};

export default function CalculatorGrid() {
  return (
    <section
      className={dmSans.variable}
      style={{
        backgroundColor: "#F8F6F1",
        padding: "48px",
      }}
    >
      <style>{`
        /* ── Mobile (≤ 640px) ── */
        @media (max-width: 640px) {
          .calc-section {
            padding: 24px 16px !important;
          }
          .calc-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .calc-card {
            padding: 20px 18px !important;
            gap: 6px !important;
            border-radius: 12px !important;
          }
          .calc-card__icon {
            width: 40px !important;
            height: 40px !important;
            border-radius: 10px !important;
            margin-bottom: 2px !important;
          }
          .calc-card--soon {
            padding: 24px 18px !important;
            min-height: 140px !important;
          }
        }
      `}</style>

      <div
        className="calc-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {calculators.map((calc) => (
          <CalculatorCard key={calc.id} calc={calc} />
        ))}
      </div>
    </section>
  );
}