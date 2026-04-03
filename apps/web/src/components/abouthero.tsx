"use client";

import { useEffect, useRef } from "react";
import { Dancing_Script, Playfair_Display, DM_Sans } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export default function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = ref.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(20px)";
      htmlEl.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
      requestAnimationFrame(() => {
        htmlEl.style.opacity = "1";
        htmlEl.style.transform = "translateY(0)";
      });
    });
  }, []);

  return (
    <section
      ref={ref}
      className={`${dancingScript.variable} ${playfairDisplay.variable} ${dmSans.variable} relative overflow-hidden`}
      style={{
        backgroundColor: "#122B1F",
        fontFamily: "var(--font-dm-sans), sans-serif",
        minHeight: "480px",
      }}
    >
      <style>{`
        /* Mobile: text on top, image below */
        .about-hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 24px;
          min-height: 480px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 32px;
          position: relative;
          z-index: 10;
        }

        .about-hero-text {
          order: 1;
          width: 100%;
          max-width: 480px;
        }

        .about-hero-text button {
          width: 100% !important;
        }

        .about-hero-image {
          order: 2;
          width: 100%;
          flex-shrink: 0;
        }

        .about-hero-image-inner {
          width: 100%;
          height: clamp(260px, 70vw, 380px);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        /* Desktop: side by side — image left, text right */
        @media (min-width: 1024px) {
          .about-hero-inner {
            flex-direction: row !important;
            align-items: center !important;
            padding: 64px 64px;
            gap: 48px;
          }

          .about-hero-text {
            order: 2;
          }

          .about-hero-text button {
            width: auto !important;
          }

          .about-hero-image {
            order: 1;
            width: auto;
          }

          .about-hero-image-inner {
            width: clamp(260px, 32vw, 380px);
            height: clamp(300px, 36vw, 420px);
          }
        }
      `}</style>

      {/* Perspective Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/Perspective Grid.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
        }}
      />

      {/* Vector2 */}
      <img
        src="/Vector2.svg"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "243.44px",
          left: "11px",
          width: "1371.5px",
          height: "648.56px",
          opacity: 0.08,
          transform: "rotate(-180deg)",
          zIndex: 1,
        }}
      />

      {/* Vector3 */}
      <img
        src="/Vector3.svg"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "126.5px",
          left: "140px",
          width: "1169px",
          height: "723px",
          opacity: 0.08,
          zIndex: 1,
        }}
      />

      <div className="about-hero-inner">

        {/* TEXT — order 1 on mobile, order 2 on desktop */}
        <div className="about-hero-text" data-animate>
          <h1 className="mb-4" style={{ lineHeight: 1.2 }}>
            <span
              className="block font-bold"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#ffffff",
              }}
            >
              Empowering
            </span>
            <span
              className="block font-bold"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#ffffff",
              }}
            >
              Women Through
            </span>
            <span
              className="block"
              style={{
                fontFamily: "var(--font-dancing), cursive",
                fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
                color: "#d4a82a",
              }}
            >
              Financial Knowledge
            </span>
          </h1>

          <p
            data-animate
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.9rem",
              color: "#b8cdb8",
              lineHeight: 1.75,
              marginBottom: "32px",
            }}
          >
            MoneyMati helps women build confidence in managing money, investing
            wisely, and planning their financial future with tailored resources
            and expert guidance.
          </p>

          <div data-animate>
            <button
              className="px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "#d4a82a",
                color: "#1a3a2a",
                fontFamily: "var(--font-dm-sans), sans-serif",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(212,168,42,0.35)",
              }}
            >
              Join a Webinar
            </button>
          </div>
        </div>

        {/* IMAGE — order 2 on mobile, order 1 on desktop */}
        <div className="about-hero-image" data-animate>
          <div className="about-hero-image-inner">
            <img
              src="/about-hero.svg"
              alt="Empowering women through financial knowledge"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}