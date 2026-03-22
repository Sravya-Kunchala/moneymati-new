import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function CTASection() {
  return (
    <section
      className={`${playfair.className} w-full py-24 px-8 flex flex-col items-center justify-center text-center relative`}
      style={{
        backgroundImage: "url('/ctabg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Heading */}
      <h2 className="text-4xl font-bold text-white leading-snug mb-6">
        Your Financial Future <br />
        Starts{" "}
        <em className="text-[#C6A553] italic">Today</em>
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-300 leading-relaxed max-w-md mb-10">
        Whether you're just starting your financial journey or looking to level up your
        wealth-building strategy, MoneyMati has the tools and community to help you succeed.
      </p>

      {/* Button */}
      <button className="border border-white text-white text-sm font-semibold px-20 py-4 rounded-full hover:bg-white hover:text-[#1a3a2a] transition-colors">
        Book an Appointment
      </button>

    </section>
  );
}