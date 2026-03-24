import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function CTASection() {
  return (
    <section
      className={`${playfair.variable} w-full py-24 px-8 flex flex-col items-center justify-center text-center relative`}
      style={{
        backgroundImage: "url('/ctabg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity:"50px"
      }}
    >
      {/* Dark overlay to increase bg opacity */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content (above overlay) */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-white leading-snug mb-6">
          Your Financial Future <br />
          Starts{" "}
          <em style={{ color: "#FFB600" }} className="italic">Today</em>
        </h2>

        {/* Description */}
        <p
          className="mb-10 text-center mx-auto"
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "26px",
            color: "#F8F6F1B3",
            maxWidth: "570px",
          }}
        >
          Whether you're just starting your financial journey or looking to level up your
          wealth-building strategy, MoneyMati has the tools and community to help you succeed.
        </p>

        {/* Button */}
        <button
          className="border border-white text-white font-semibold text-base rounded-full hover:bg-white hover:text-[#1a3a2a] transition-colors"
          style={{ paddingTop: "14px", paddingBottom: "14px", paddingLeft: "150px", paddingRight: "150px" }}
        >
          Book an Appointment
        </button>
      </div>

    </section>
  );
}