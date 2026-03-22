"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";

const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const FinancialPlanningIcon = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13 9C12.1667 9 11.4583 8.70833 10.875 8.125C10.2917 7.54167 10 6.83333 10 6C10 5.16667 10.2917 4.45833 10.875 3.875C11.4583 3.29167 12.1667 3 13 3C13.8333 3 14.5417 3.29167 15.125 3.875C15.7083 4.45833 16 5.16667 16 6C16 6.83333 15.7083 7.54167 15.125 8.125C14.5417 8.70833 13.8333 9 13 9ZM6 12C5.45 12 4.97917 11.8042 4.5875 11.4125C4.19583 11.0208 4 10.55 4 10V2C4 1.45 4.19583 0.979167 4.5875 0.5875C4.97917 0.195833 5.45 0 6 0H20C20.55 0 21.0208 0.195833 21.4125 0.5875C21.8042 0.979167 22 1.45 22 2V10C22 10.55 21.8042 11.0208 21.4125 11.4125C21.0208 11.8042 20.55 12 20 12H6ZM8 10H18C18 9.45 18.1958 8.97917 18.5875 8.5875C18.9792 8.19583 19.45 8 20 8V4C19.45 4 18.9792 3.80417 18.5875 3.4125C18.1958 3.02083 18 2.55 18 2H8C8 2.55 7.80417 3.02083 7.4125 3.4125C7.02083 3.80417 6.55 4 6 4V8C6.55 8 7.02083 8.19583 7.4125 8.5875C7.80417 8.97917 8 9.45 8 10ZM19 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V3H2V14H19V16ZM6 10V2V10Z"
      fill="#004D40"
    />
  </svg>
);

const InvestmentBasicsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#004D40" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <polyline points="3 17 9 11 13 15 21 7" />
    <polyline points="17 7 21 7 21 11" />
  </svg>
);

const WealthBuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#004D40" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 3 9 21 9" />
  </svg>
);

const StockMarketIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 18V16L2 14V18H0ZM4 18V12L6 10V18H4ZM8 18V10L10 12.025V18H8ZM12 18V12.025L14 10.025V18H12ZM16 18V8L18 6V18H16ZM0 12.825V10L7 3L11 7L18 0V2.825L11 9.825L7 5.825L0 12.825Z"
      fill="#004D40"
    />
  </svg>
);

interface CategoryCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const categories: CategoryCard[] = [
  {
    icon: <FinancialPlanningIcon />,
    title: "Financial Planning",
    description: "Master your budget and future goals with structured expert guidance.",
  },
  {
    icon: <InvestmentBasicsIcon />,
    title: "Investment Basics",
    description: "Start your journey into the markets with confidence and clarity.",
  },
  {
    icon: <WealthBuildingIcon />,
    title: "Wealth Building",
    description: "Long-term growth strategies for your family assets and retirement.",
  },
  {
    icon: <StockMarketIcon />,
    title: "Stock Market",
    description: "Advanced insights into stock trading and portfolio management.",
  },
];

export default function WebinarCategories() {
  return (
    <section
      className={`${playfairDisplay.variable} ${dmSans.variable}`}
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 80px",
        boxSizing: "border-box",
      }}
    >
      {/* Heading */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "48px" }}>
        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 700,
            fontSize: "30px",
            lineHeight: "36px",
            color: "#004D40",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          Webinar Categories
        </h2>
        <div
          style={{
            width: "80px",
            height: "4px",
            borderRadius: "9999px",
            background: "#11D462",
          }}
        />
      </div>

      {/* Cards Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        style={{ maxWidth: "1280px" }}
      >
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "33px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              cursor: "default",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                backgroundColor: "#FDFBF7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {cat.icon}
            </div>

            <div>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#004D40",
                  marginBottom: "8px",
                }}
              >
                {cat.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "22.75px",
                  color: "#475569",
                  margin: 0,
                }}
              >
                {cat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}