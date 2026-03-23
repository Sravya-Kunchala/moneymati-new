import { Playfair_Display, Dancing_Script } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const dancing = Dancing_Script({ subsets: ["latin"], weight: "700" });

const stats = [
  { value: "25k+", label: "WOMEN EMPOWERED" },
  { value: "500+", label: "RESOURCES SHARED" },
  { value: "120+", label: "WEBINARS HOSTED" },
  { value: "1.2k", label: "SUCCESS STORIES" },
];

export default function ImpactSection() {
  return (
    <section
      className="relative w-full bg-[#1a3a2a] py-16 px-8 flex flex-col items-center overflow-hidden"
      style={{ minHeight: "280px" }}
    >
      {/* Wave 2 — behind, largest */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ zIndex: 1 }}>
        <svg width="100%" height="auto" viewBox="0 0 1439 250" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
          <path d="M510.34 210.657C275.166 192.442 72.1241 253.963 0 287L1439 284.991C1436.5 179.339 1439 2.55932 1439 1.23075C1439 -18.7068 1180.35 210.657 1113.2 177.844C1046.05 145.03 804.308 233.426 510.34 210.657Z" fill="#214533"/>
        </svg>
      </div>

      {/* Wave 1 — on top of Wave 2, increased height */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ zIndex: 2 }}>
        <svg width="100%" height="auto" viewBox="0 0 1439 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
          <path d="M510.34 158.488C275.166 144.784 72.1241 191.069 0 215.925L1439 214.413C1436.5 134.926 1439 1.92551 1439 0.925955C1439 -14.074 1180.35 158.488 1113.2 133.801C1046.05 109.113 804.308 175.618 510.34 158.488Z" fill="#064E3B"/>
        </svg>
      </div>

      {/* Heading */}
      <div className="text-center mb-10 relative z-10">
        <h2
          className="text-3xl text-white"
          style={{ fontFamily: playfair.style.fontFamily, fontWeight: 600 }}
        >
          The Impact We Are{" "}
          <span
            className={`${dancing.className} text-[#C6A553]`}
            style={{ fontWeight: 700 }}
          >
            Creating
          </span>
        </h2>
      </div>

      {/* Stats */}
      {/* Stats */}
<div className="grid grid-cols-4 gap-6 max-w-6xl w-full relative z-10">
  {stats.map(({ value, label }) => (
    <div
      key={label}
      className="bg-[#ECFDF5] rounded-xl px-10 py-5 flex flex-col gap-2 justify-center items-center text-center"
    >
      <span className="text-2xl font-extrabold text-[#1a3a2a]">
        {value}
      </span>
      <span className="text-[9px] text-[#1a3a2a] tracking-widest font-semibold uppercase">
        {label}
      </span>
    </div>
  ))}
</div>

    </section>
  );
}