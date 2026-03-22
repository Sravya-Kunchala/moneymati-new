import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function WhySection() {
  return (
    <section className={`${playfair.className} w-full bg-white py-32 px-8 flex items-center justify-center`}>
      <div className="max-w-5xl w-full flex items-center gap-16">

        {/* Left — Image */}
        <div
          className="relative flex-shrink-0"
          style={{ width: "620px", height: "620px", background: "transparent" }}
        >

          {/* Background blob SVG */}
          <div className="absolute" style={{ top: -30, left: -30, zIndex: 0 }}>
            <svg width="587" height="587" viewBox="0 0 587 587" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="-1.22253" y="28.0856" width="560" height="560" rx="24" transform="rotate(-3 -1.22253 28.0856)" fill="#ECFDF5"/>
            </svg>
          </div>

          {/* Image */}
          <div
            className="absolute overflow-hidden"
            style={{
              width: "520px",
              height: "580px",
              borderRadius: "24px",
              top: "40px",
              left: "40px",
              zIndex: 1,
            }}
          >
            <Image
              src="/img.svg"
              alt="Why MoneyMati"
              fill
              className="object-cover"
            />
          </div>

          {/* Quote Badge */}
          <div
            className="absolute bg-white shadow-md rounded-xl px-4 py-3"
            style={{
              bottom: "40px",
              right: "0px",
              maxWidth: "200px",
              zIndex: 2,
              borderLeft: "4px solid #1a3a2a",
            }}
          >
            <p className="text-xs text-[#1a3a2a] font-semibold italic">
              "Confidence starts with clarity."
            </p>
          </div>

        </div>

        {/* Right — Content */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-[#1a3a2a] leading-snug">
            Why MoneyMati
          </h2>
          <em className="text-[#C6A553] text-2xl italic block mb-6">
            Exists
          </em>

          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            MoneyMati was born out of a simple observation: the financial world
            often speaks a language that feels exclusive. We decided to change that
            narrative. Our mission is to simplify complex financial concepts and put
            the tools of wealth creation directly into the hands of women.
          </p>

          <p className="text-sm text-gray-600 leading-relaxed">
            We believe that when women are financially secure, entire communities
            thrive. We aren't just teaching math; we're building confidence,
            independence, and a legacy for the future.
          </p>
        </div>

      </div>
    </section>
  );
}