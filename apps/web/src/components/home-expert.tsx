"use client";

import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["800"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter" });

const teamMembers = [
  { name: "Anjali Bhatt Manda", role: "Founder", image: "/image 7.svg" },
  { name: "CA Diksha Chainwala Surana", role: "Insurance & Tax Consultant", image: "/image 6.svg" },
  { name: "Anu Khetan", role: "Partner - Markets", image: "/image 5.svg" },
  { name: "Jyothi Dt", role: "Consultant - Legal (Wills, Estate Planning)", image: "/image 4.svg" },
  { name: "Anushka Goyal", role: "Consultant - Technology", image: "/image 3.svg" },
  { name: "Dilip Singh", role: "Consultant - Technology", image: "/image 2.svg" },
];

export default function TeamExperts() {
  return (
    <section
      className={`${playfair.variable} ${inter.className}`}
      style={{ padding: "0 48px 80px", backgroundColor: "#f5f0e8" }}
    >
      <style>{`
        @media (max-width: 767px) {
          .team-section-wrap {
            padding: 0 20px 56px !important;
          }
          .team-header {
            margin-bottom: 24px !important;
          }
          .team-header h2 {
            font-size: 24px !important;
          }
          .team-header p {
            max-width: 100% !important;
          }
          .team-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 14px !important;
            align-items: stretch !important;
            justify-content: unset !important;
          }
          .team-card {
            flex: unset !important;
            width: 100% !important;
            height: 320px !important;
            border-radius: 16px !important;
          }
          .team-card img {
            object-fit: cover !important;
            object-position: top center !important;
            width: 100% !important;
            height: 100% !important;
          }
          .team-card-name {
            font-size: 15px !important;
          }
          .team-card-role {
            font-size: 12px !important;
          }
          .team-card-text {
            bottom: 14px !important;
            left: 14px !important;
            right: 14px !important;
          }
        }
      `}</style>

      <div
        className="team-section-wrap"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {/* Header */}
        <div className="team-header" style={{ marginBottom: 40 }}>
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
        <div
          className="team-grid"
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="team-card"
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
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
              />

              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(6,30,20,0.85) 0%, rgba(6,30,20,0.2) 50%, transparent 100%)",
              }} />

              <div
                className="team-card-text"
                style={{ position: "absolute", bottom: 16, left: 14, right: 14 }}
              >
                <p
                  className="team-card-name"
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#ffffff",
                    margin: "0 0 2px",
                  }}
                >
                  {member.name}
                </p>
                <p
                  className="team-card-role"
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 400,
                    fontSize: 11,
                    color: "#D4AF37",
                    margin: 0,
                  }}
                >
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