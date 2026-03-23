"use client";

import { useEffect, useRef } from "react";
import { Dancing_Script, Playfair_Display, DM_Sans } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", style: ["normal", "italic"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(24px)";
      htmlEl.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
      requestAnimationFrame(() => {
        htmlEl.style.opacity = "1";
        htmlEl.style.transform = "translateY(0)";
      });
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className={`relative overflow-hidden ${dancingScript.variable} ${playfairDisplay.variable} ${dmSans.variable}`}
      style={{
        backgroundImage: "url('/Rectangle 5.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "var(--font-dm-sans), sans-serif",
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

      {/* Gradient overlay bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(20,50,35,0.6), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-8 flex flex-col lg:flex-row items-center gap-10" style={{ minHeight: "600px" }}>
        {/* LEFT: Text Content */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">

          {/* Eyebrow */}
          <p
            data-animate
            className="mb-6"
            style={{
              color: "#C6A553",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "20px",
              letterSpacing: "0.7px",
              textTransform: "uppercase",
              verticalAlign: "middle",
            }}
          >
            Empowering Women to Take Control of Their Finances
          </p>

          {/* Headline */}
          <h1
            data-animate
            className="mb-6"
            style={{ color: "#ffffff" }}
          >
            <span
              className="block font-bold"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.15,
                fontFamily: "var(--font-playfair), serif",
              }}
            >
              Build Wealth
            </span>
            <span
              className="block font-bold"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.15,
                fontFamily: "var(--font-playfair), serif",
              }}
            >
              With{" "}
              <em
                style={{
                  color: "#ffffff",
                  fontStyle: "italic",
                  fontFamily: "var(--font-playfair), serif",
                }}
              >
                Confidence
              </em>
            </span>

            {/* & Clarity — updated to match design specs */}
            <span
              className="block"
              style={{
                fontSize: "72px",
                lineHeight: "72px",
                letterSpacing: "0",
                fontFamily: "var(--font-dancing), cursive",
                fontWeight: 700,
                color: "#C6A553",
              }}
            >
              &amp; Clarity
            </span>
          </h1>

          {/* Subtext */}
          <p
            data-animate
            className="mb-10 leading-relaxed"
            style={{
              color: "#b8cdb8",
              fontSize: "0.95rem",
              fontFamily: "var(--font-dm-sans), sans-serif",
              maxWidth: "380px",
            }}
          >
            Expert guidance, practical tools, and a supportive community to help
            you navigate your financial journey with confidence, purpose, and
            clarity.
          </p>

          {/* CTA Buttons */}
          <div data-animate className="flex flex-wrap gap-4 mb-14">

            {/* Book a Free Appointment */}
            <button
              className="transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                width: "243px",
                height: "50px",
                borderRadius: "9999px",
                backgroundColor: "#FFB600",
                color: "#1a3a2a",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(255,182,0,0.35)",
              }}
            >
              Book a Free Appointment
            </button>

            <button
              className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-white/10"
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                fontFamily: "var(--font-dm-sans), sans-serif",
                border: "1.5px solid rgba(255,255,255,0.5)",
                cursor: "pointer",
              }}
            >
              Register for Webinar
            </button>
          </div>

          {/* Stats */}
          <div data-animate className="flex gap-10">
            {[
              { value: "5,200+", label: "Women Empowered" },
              { value: "8,191", label: "Resources Shared" },
              { value: "360+", label: "Success Stories" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-bold"
                  style={{
                    color: "#ffffff",
                    fontSize: "1.4rem",
                    fontFamily: "var(--font-playfair), serif",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    color: "#8aad8a",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Image Card */}
        <div data-animate className="flex-1 flex justify-center lg:justify-end items-center relative" style={{ minHeight: "560px" }}>

          {/* Financial chart — moved down */}
          <img
            src="/Financial chart.svg"
            alt="Financial chart"
            className="absolute"
            style={{
              bottom: "-60px",
              left: "-10px",
              width: "65%",
              zIndex: 1,
              borderRadius: "12px",
            }}
          />

          {/* Advisor image — on top, shifted right */}
          <div
            className="absolute rounded-3xl overflow-hidden"
            style={{
              top: "0",
              right: "0",
              width: "75%",
              height: "85%",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              zIndex: 2,
            }}
          >
            <img
              src="/Financial advisor.svg"
              alt="Financial advisor"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}