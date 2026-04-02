"use client";

import { useRouter } from "next/navigation";
import { Playfair_Display, Dancing_Script, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["900"], variable: "--font-playfair" });
const dancing = Dancing_Script({ subsets: ["latin"], weight: ["700"], variable: "--font-dancing" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "700", "800"], variable: "--font-dm-sans" });

interface FeaturedArticleCardProps {
  bgImage?: "bg-image.svg" | "bg-blue.svg";
}

const FeaturedArticleCard: React.FC<FeaturedArticleCardProps> = ({
  bgImage = "bg-image.svg",
}) => {
  const router = useRouter();
  const isBlue = bgImage === "bg-blue.svg";

  return (
    <section
      className={`${playfair.variable} ${dancing.variable} ${dmSans.variable}`}
      style={{
        backgroundColor: "#ffffff",
        padding: "24px 16px",
      }}
    >
      {/* Inject responsive styles */}
      <style>{`
        .featured-card-wrapper {
          position: relative;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          min-height: 520px;
        }

        .featured-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          z-index: 0;
        }

        .featured-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .featured-content {
          position: relative;
          z-index: 2;
          padding: 60px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 18px;
          max-width: 720px;
        }

        .featured-title {
          margin: 0;
          font-size: 42px;
          line-height: 52px;
          color: #ffffff;
        }

        .featured-desc {
          margin: 0;
          font-family: var(--font-dm-sans), sans-serif;
          font-weight: 400;
          font-size: 15px;
          line-height: 24px;
          color: #CBD5E1;
        }

        .featured-cta-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .featured-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 49px;
          background-color: #004D40;
          border: none;
          cursor: pointer;
          font-family: var(--font-dm-sans), sans-serif;
          font-weight: 800;
          font-size: 14px;
          line-height: 20px;
          color: #FFFFFF;
        }

        /* ── Mobile overrides (≤ 640px) ── */
        @media (max-width: 640px) {
          .featured-card-wrapper {
            border-radius: 12px;
            min-height: unset;
          }

          /* Hide the background image on mobile */
          .featured-bg {
            display: none;
          }

          /* Solid dark background on mobile instead of gradient */
          .featured-overlay {
            background: ${isBlue ? "rgba(0,30,80,1)" : "#0d1f2d"} !important;
          }

          .featured-content {
            padding: 28px 20px;
            gap: 14px;
            max-width: 100%;
            width: 100%;
          }

          .featured-title {
            font-size: 26px;
            line-height: 36px;
          }

          .featured-desc {
            font-size: 13px;
            line-height: 21px;
          }

          .featured-cta-btn {
            padding: 12px 20px;
            font-size: 13px;
            border-radius: 40px;
          }

          .featured-cta-row {
            gap: 12px;
          }
        }
      `}</style>

      <div className="featured-card-wrapper">
        {/* Background image */}
        <div
          className="featured-bg"
          style={{
            backgroundImage: `url('/${bgImage}')`,
          }}
        />

        {/* Overlay */}
        <div
          className="featured-overlay"
          style={{
            background: isBlue
              ? "linear-gradient(90deg, rgba(0,30,80,0.92) 0%, rgba(0,30,80,0.85) 45%, rgba(0,30,80,0.5) 65%, rgba(0,30,80,0.05) 100%)"
              : "linear-gradient(90deg, #0d1f2d 0%, #0d1f2d 45%, rgba(13,31,45,0.6) 65%, rgba(13,31,45,0.1) 100%)",
          }}
        />

        {/* Content */}
        <div className="featured-content">
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              alignItems: "center",
              padding: "4px 12px",
              borderRadius: "9999px",
              backgroundColor: "rgba(17, 212, 98, 0.20)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                lineHeight: "16px",
                letterSpacing: "0.6px",
                textTransform: "uppercase",
                color: "#11D462",
              }}
            >
              Featured Article
            </span>
          </div>

          {/* Title */}
          <h2 className="featured-title">
            <span
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 900,
              }}
            >
              NPS: The Game Changer for{" "}
            </span>
            <span
              style={{
                fontFamily: "var(--font-dancing), cursive",
                fontWeight: 700,
                color: "#F5A623",
              }}
            >
              100% Equity Retirement Planning
            </span>
          </h2>

          {/* Description */}
          <p className="featured-desc">
            Discover why the National Pension System is becoming the preferred
            retirement tool for women in India, offering long-term security and
            tax benefits.
          </p>

          {/* CTA Row */}
          <div className="featured-cta-row">
            <button
              className="featured-cta-btn"
              onClick={() => router.push("/sepblog")}
            >
              Read Featured Article
              <span>→</span>
            </button>

            <span
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "20px",
                color: "#94A3B8",
              }}
            >
              8 min read
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticleCard;