"use client";

import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["800"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter" });

const teamMembers = [
  { name: "Anita Sharma", role: "Financial Education Advisor", image: "/Image (1).svg" },
  { name: "Priya Singh", role: "Investment Strategist", image: "/Image (2).svg" },
  { name: "Meera Reddy", role: "Community Director", image: "/Image (3).svg" },
  { name: "Sonal Kapoor", role: "Wealth Coach", image: "/Image (4).svg" },
  { name: "Ananya Iyer", role: "Tech Lead", image: "/Image (5).svg" },
];

export default function TeamExperts() {
  return (
    <section
      className={`${playfair.variable} ${inter.variable}`}
      style={{ padding: "0 48px 80px", backgroundColor: "#f5f0e8" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 800,
            fontSize: 32,
            color: "#0d2818",
            margin: "0 0 8px",
          }}>
            The Experts Leading the Way
          </h2>
          <p style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: "rgba(6,78,59,0.70)",
            margin: 0,
            maxWidth: 340,
            lineHeight: 1.6,
          }}>
            A diverse group of financial specialists, educators, and community builders working for your prosperity.
          </p>
        </div>

        {/* Team Cards */}
        <div style={{
          display: "flex",
          gap: 16,
          alignItems: "flex-end",
          justifyContent: "center",
        }}>
          {teamMembers.map((member) => (
            <div
              key={member.name}
              style={{
                flex: "0 0 180px",
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                height: 260,
                border: "1px solid rgba(6,78,59,0.15)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              {/* Image */}
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Gradient overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(6,30,20,0.85) 0%, rgba(6,30,20,0.2) 50%, transparent 100%)",
              }} />

              {/* Name & Role */}
              <div style={{ position: "absolute", bottom: 16, left: 14, right: 14 }}>
                <p style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#ffffff",
                  margin: "0 0 2px",
                }}>
                  {member.name}
                </p>
                <p style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 400,
                  fontSize: 11,
                  color: "#D4AF37",
                  margin: 0,
                }}>
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}