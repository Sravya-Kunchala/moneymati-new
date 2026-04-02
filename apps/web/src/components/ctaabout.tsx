import { Playfair_Display, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500"] });

export default function CTASection() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #122B1F 0%, #1B3226 100%)",
        minHeight: "443px",
      }}
    >
      <style>{`
        /* ── MOBILE ── */
        .cta-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 28px;
          width: 100%;
          position: relative;
          z-index: 10;
        }

        .cta-heading {
          font-size: 32px;
          line-height: 42px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 20px;
        }

        .cta-body {
          font-size: 15px;
          line-height: 26px;
          color: rgba(248, 246, 241, 0.7);
          font-weight: 400;
          max-width: 300px;
          margin-bottom: 36px;
        }

        .cta-buttons {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          width: 100%;
          max-width: 320px;
        }

        .cta-btn-primary {
          width: 100%;
          height: 54px;
          border-radius: 9999px;
          background-color: #C6A553;
          color: #1B3226;
          font-size: 16px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
        }

        .cta-btn-primary:hover {
          background-color: #b8963e;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(198, 165, 83, 0.35);
        }

        .cta-btn-primary:active {
          transform: translateY(0px);
          box-shadow: none;
        }

        .cta-btn-secondary {
          width: 100%;
          height: 54px;
          border-radius: 9999px;
          background-color: transparent;
          border: 1px solid rgba(248, 246, 241, 0.3);
          color: #F8F6F1;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .cta-btn-secondary:hover {
          border-color: rgba(248, 246, 241, 0.7);
          background-color: rgba(248, 246, 241, 0.06);
        }

        /* ── DESKTOP ── */
        @media (min-width: 1024px) {
          .cta-inner {
            padding: 96px 32px;
          }

          .cta-heading {
            font-size: 48px;
            line-height: 48px;
            margin-bottom: 24px;
          }

          .cta-body {
            font-size: 16px;
            max-width: 448px;
            margin-bottom: 40px;
          }

          .cta-buttons {
            flex-direction: row;
            max-width: unset;
            width: auto;
            gap: 16px;
          }

          .cta-btn-primary {
            width: 207px;
          }

          .cta-btn-secondary {
            width: 217px;
          }
        }
      `}</style>

      <div className="cta-inner">
        {/* Heading */}
        <h2 className={`${playfair.className} cta-heading`}>
          Your Financial Future <br />
          Starts{" "}
          <em className="italic" style={{ color: "#C6A553", fontWeight: 700 }}>
            Today
          </em>
        </h2>

        {/* Description */}
        <p className={`${dmSans.className} cta-body`}>
          Whether you&rsquo;re just starting your financial journey or looking to level up your
          wealth-building strategy, MoneyMati has the tools and community to help you succeed.
        </p>

        {/* Buttons */}
        <div className="cta-buttons">
          <button className={`${dmSans.className} cta-btn-primary`}>
            Start Learning Now
          </button>
          <button className={`${dmSans.className} cta-btn-secondary`}>
            Book a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}