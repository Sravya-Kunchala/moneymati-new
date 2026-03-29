import Image from "next/image";
import { Playfair_Display, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export default function WhySection() {
  return (
    <section
      className={`${playfair.variable} ${dmSans.variable}`}
      style={{ width: "100%", backgroundColor: "#fff", fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <style>{`
        .why-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 64px 24px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .why-image-col {
          position: relative;
          width: 100%;
          padding-bottom: 90%;
          flex-shrink: 0;
        }

        .why-blob {
          position: absolute;
          top: -16px;
          left: -16px;
          width: calc(100% + 8px);
          height: calc(100% + 8px);
          z-index: 0;
          border-radius: 24px;
          background: #ECFDF5;
          transform: rotate(-3deg);
        }

        .why-image-wrap {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 0px;
          bottom: 0px;
          border-radius: 20px;
          overflow: hidden;
          z-index: 1;
        }

        .why-quote {
          position: absolute;
          bottom: -8px;
          right: -8px;
          background: #fff;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          border-radius: 12px;
          padding: 10px 14px;
          max-width: 180px;
          z-index: 2;
          border-left: 4px solid #1a3a2a;
        }

        .why-text-col {
          width: 100%;
          min-width: 0;
        }

        /* ── Unified paragraph color & width ── */
        .why-text-col p,
        .about-paragraph {
          color: #4B5563;
          max-width: 650px;
          width: 100%;
        }

        @media (min-width: 1024px) {
          .why-inner {
            flex-direction: row;
            align-items: center;
            gap: 64px;
            padding: 96px 64px;
          }

          .why-image-col {
            width: 480px;
            padding-bottom: 0;
            height: 540px;
            flex-shrink: 0;
          }

          .why-image-wrap {
            top: 30px;
            left: 30px;
            right: 0;
            bottom: 0;
          }

          .why-quote {
            bottom: 30px;
            right: -12px;
            max-width: 200px;
          }

          .why-text-col {
            flex: 1;
          }
        }
      `}</style>

      <div className="why-inner">

        {/* ── Image ── */}
        <div className="why-image-col">
          <div className="why-blob" />

          <div className="why-image-wrap">
            <Image
              src="/img.svg"
              alt="Why MoneyMati"
              fill
              className="object-cover"
            />
          </div>

          <div className="why-quote">
            <p style={{ fontSize: "0.72rem", color: "#1a3a2a", fontWeight: 600, fontStyle: "italic", margin: 0, lineHeight: 1.5 }}>
              "Confidence starts with clarity."
            </p>
          </div>
        </div>

        {/* ── Text ── */}
        <div className="why-text-col">
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(1.6rem, 4vw, 2rem)", fontWeight: 700, color: "#1a3a2a", lineHeight: 1.3, margin: 0 }}>
            Why MoneyMati
          </h2>
          <em style={{ fontFamily: "var(--font-playfair), serif", color: "#C6A553", fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)", display: "block", marginBottom: 20, fontStyle: "italic" }}>
            Exists
          </em>

          <p className="about-paragraph">
            MoneyMati was born out of a simple observation: the financial world
often speaks a language that feels exclusive. We decided to change that
narrative. Our mission is to simplify complex financial concepts and put
the tools of wealth creation directly into the hands of women.
          </p>
          

          <p className="about-paragraph">
            We believe that when women are financially secure, entire communities
            thrive. We aren't just teaching math; we're building confidence,
            independence, and a legacy for the future.
          </p>
        </div>

      </div>
    </section>
  );
}