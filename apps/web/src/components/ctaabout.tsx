import { Playfair_Display, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500"] });

export default function CTASection() {
  return (
    <section
      className="relative w-full py-24 px-8 flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #122B1F 0%, #1B3226 100%)",
        minHeight: "443px",
      }}
    >
      {/* Heading */}
      <h2
        className={`${playfair.variable} font-bold text-white leading-tight mb-6 relative z-10`}
        style={{ fontSize: "48px", lineHeight: "48px" }}
      >
        Your Financial Future <br />
        Starts{" "}
        <em className="italic text-[#C6A553]" style={{ fontWeight: 700 }}>
          Today
        </em>
      </h2>

      {/* Description */}
      <p
        className={`${dmSans.variable} relative z-10 max-w-md mb-10`}
        style={{
          fontSize: "16px",
          lineHeight: "26px",
          color: "#F8F6F1B3",
          fontWeight: 400,
        }}
      >
        Whether you're just starting your financial journey or looking to level up your
        wealth-building strategy, MoneyMati has the tools and community to help you succeed.
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-4 relative z-10">

        {/* Start Learning Now */}
        <button
          className={`${dmSans.variable} flex items-center justify-center`}
          style={{
            width: "207px",
            height: "54px",
            borderRadius: "9999px",
            backgroundColor: "#C6A553",
            color: "#1B3226",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          Start Learning Now
        </button>

        {/* Book a Consultation */}
        <button
          className={`${dmSans.variable} flex items-center justify-center`}
          style={{
            width: "217px",
            height: "54px",
            borderRadius: "9999px",
            backgroundColor: "transparent",
            border: "1px solid #F8F6F14D",
            color: "#F8F6F1",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          Book a Consultation
        </button>

      </div>
    </section>
  );
}