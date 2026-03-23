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
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          minHeight: "520px",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('/${bgImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isBlue
              ? "linear-gradient(90deg, rgba(0,30,80,0.92) 0%, rgba(0,30,80,0.85) 45%, rgba(0,30,80,0.5) 65%, rgba(0,30,80,0.05) 100%)"
              : "linear-gradient(90deg, #0d1f2d 0%, #0d1f2d 45%, rgba(13,31,45,0.6) 65%, rgba(13,31,45,0.1) 100%)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "60px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "18px",
            maxWidth: "720px",
          }}
        >
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
          <h2
            style={{
              margin: 0,
              fontSize: "42px",
              lineHeight: "52px",
              color: "#ffffff",
            }}
          >
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
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 400,
              fontSize: "15px",
              lineHeight: "24px",
              color: "#CBD5E1",
            }}
          >
            Discover why the National Pension System is becoming the preferred
            retirement tool for women in India, offering long-term security and
            tax benefits.
          </p>

          {/* CTA Row */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => router.push("/sepblog")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "49px",
                backgroundColor: "#004D40",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 800,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#FFFFFF",
              }}
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