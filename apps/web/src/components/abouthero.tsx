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
        minHeight: "650px",
      }}
    >
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
      <svg
        width="1374"
        height="558"
        viewBox="0 0 1374 558"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute pointer-events-none"
        style={{
          top: "150px",
          left: "11px",
          opacity: 0.3,
          zIndex: 15,
        }}
      >
        <path
          d="M1372.45 649.556C1332.12 551.556 1200.05 357.156 994.45 363.556C737.45 371.556 695.532 224.639 650.95 180.056C615.45 144.556 118.45 -131.944 36.9497 80.5564C-28.2503 250.556 9.78304 459.056 36.9497 542.056"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
          strokeDasharray="49 49"
        />
      </svg>

      {/* Vector3 */}
      <img
        src="/vector3.svg"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "-40px",
          left: "140px",
          width: "1169px",
          height: "723px",
          opacity: 0.6,
          zIndex: 15,
        }}
      />

      <div
        className="relative z-10 mx-auto px-6 lg:px-16 py-20 flex flex-col lg:flex-row items-center gap-12"
        style={{ maxWidth: "1100px", minHeight: "650px" }}
      >
        {/* LEFT: Image — stays below vectors */}
        <div data-animate className="flex-shrink-0" style={{ zIndex: 10 }}>
          <div
            style={{
              width: "clamp(260px, 32vw, 380px)",
              height: "clamp(300px, 36vw, 420px)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <img
              src="/about-hero.svg"
              alt="Empowering women through financial knowledge"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* RIGHT: Text — above vectors */}
        <div className="flex flex-col justify-center" style={{ maxWidth: "480px", zIndex: 20 }}>
          {/* Heading */}
          <h1
            data-animate
            className="mb-4"
            style={{ lineHeight: 1.2 }}
          >
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

          {/* Description */}
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

          {/* CTA */}
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
      </div>
    </section>
  );
}