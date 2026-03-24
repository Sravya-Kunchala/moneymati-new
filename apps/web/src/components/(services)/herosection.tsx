import { Playfair_Display, Dancing_Script, Inter } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "900" });
const dancing = Dancing_Script({ subsets: ["latin"], weight: "700" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-visible px-16 py-28 flex items-center justify-center gap-20"
      style={{
        backgroundImage: "url('/Section (5).svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "600px",
         opacity: 0.8,
      }}
    >

      {/* bg-image.png layered on top of Section 5 svg */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/bg-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
          zIndex: 0,
        }}
      />

      {/* Left Content */}
      <div className="flex flex-col gap-5 max-w-md z-10">

        {/* Heading */}
        <h1
          className={`${playfair.variable} text-white`}
          style={{ fontSize: "42px", lineHeight: "52px", letterSpacing: "-1px", fontWeight: 900 }}
        >
          Learn Finance <br />
          Through{" "}
          <span className="text-[#10B981]" style={{ fontWeight: 900 }}>
            Expert-<br />Led{" "}
          </span>
          <span
            className={`${dancing.variable} text-[#FFB600]`}
            style={{ fontSize: "48px", lineHeight: "52px", fontWeight: 700 }}
          >
            Webinars
          </span>
        </h1>

        {/* Description */}
        <p
          className={`${inter.className}`}
          style={{ fontSize: "15px", lineHeight: "26px", color: "#CBD5E1", fontWeight: 400 }}
        >
          Join MoneyMati's expert webinars designed to help women
          understand investing, financial planning, and wealth building with
          confidence.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            className={`${inter.className}`}
            style={{
              height: "48px",
              borderRadius: "92px",
              padding: "12px 20px",
              backgroundColor: "#FFB600",
              color: "#004D40",
              fontSize: "14px",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            Browse Upcoming Webinars →
          </button>

          <button
            className={`${inter.className}`}
            style={{
              height: "48px",
              borderRadius: "61px",
              padding: "12px 20px",
              backgroundColor: "transparent",
              border: "1px solid #FFFFFF82",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            Register for Next Session
          </button>
        </div>

      </div>

      {/* Right — Image Card */}
      <div className="relative flex-shrink-0 z-10" style={{ width: "440px", height: "380px" }}>

        {/* Main image card */}
        <div
          className="relative overflow-hidden"
          style={{
            width: "440px",
            height: "320px",
            borderRadius: "24px",
            border: "1px solid #FFFFFF1A",
            transform: "rotate(2deg)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          }}
        >
          <Image
            src="/hero.svg"
            alt="Expert Webinar"
            fill
            className="object-cover scale-110"
          />
        </div>

        {/* Badge */}
        <div
          className="absolute flex items-center gap-3"
          style={{
            bottom: "30px",
            left: "-10px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "16px 20px",
            transform: "rotate(-2deg)",
            boxShadow: "0 8px 10px -6px rgba(0,0,0,0.10), 0 20px 25px -5px rgba(0,0,0,0.10)",
            zIndex: 10,
          }}
        >
          <div style={{ backgroundColor: "#11D46233", borderRadius: "9999px", padding: "10px" }}>
            <svg width="25" height="13" viewBox="0 0 25 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.418718 12.8303L0.363752 11.2562C0.33874 10.54 0.684826 9.94424 1.40201 9.46892C2.11919 8.9936 3.07742 8.735 4.27668 8.69312C4.49322 8.68556 4.70157 8.68246 4.90174 8.6838C5.10191 8.68515 5.29419 8.69928 5.47857 8.7262C5.25759 9.08413 5.0955 9.45668 4.99228 9.84385C4.88906 10.231 4.84472 10.6328 4.85927 11.0492L4.91598 12.6732L0.418718 12.8303ZM6.41506 12.6209L6.35835 10.9969C6.33974 10.4639 6.46847 9.97158 6.74455 9.52C7.02062 9.06842 7.41935 8.66676 7.94072 8.31502C8.4621 7.96328 9.09048 7.69118 9.82588 7.49873C10.5613 7.30628 11.362 7.19494 12.2282 7.16469C13.111 7.13386 13.9259 7.18879 14.6729 7.32947C15.42 7.47015 16.0658 7.69775 16.6104 8.01227C17.1551 8.32678 17.5767 8.6998 17.8753 9.13131C18.1738 9.56282 18.3324 10.0451 18.351 10.5781L18.4078 12.2021L6.41506 12.6209ZM19.9068 12.1497L19.8501 10.5257C19.835 10.0927 19.7666 9.68647 19.645 9.30715C19.5233 8.92783 19.3484 8.57539 19.1203 8.24982C19.3023 8.21011 19.489 8.18274 19.6802 8.16773C19.8715 8.15271 20.0671 8.14171 20.2669 8.13473C21.4662 8.09285 22.44 8.27982 23.1883 8.69562C23.9366 9.11142 24.3235 9.68577 24.3491 10.4187L24.4041 11.9927L19.9068 12.1497ZM8.46897 10.5479L16.2392 10.2766C16.061 9.94929 15.5886 9.67394 14.822 9.45056C14.0554 9.22718 13.2141 9.13148 12.298 9.16347C11.3819 9.19546 10.5493 9.34961 9.8001 9.62593C9.05096 9.90224 8.60725 10.2096 8.46897 10.5479ZM4.24179 7.69373C3.69212 7.71293 3.21474 7.53365 2.80964 7.15589C2.40454 6.77813 2.1924 6.31441 2.1732 5.76475C2.15343 5.19843 2.33256 4.71688 2.71061 4.32011C3.08866 3.92335 3.55252 3.71536 4.10219 3.69617C4.66851 3.67639 5.14991 3.85136 5.54639 4.22109C5.94286 4.59081 6.15099 5.05883 6.17077 5.62515C6.18996 6.17482 6.01484 6.65205 5.64541 7.05686C5.27598 7.46166 4.80811 7.67396 4.24179 7.69373ZM20.232 7.13534C19.6824 7.15454 19.205 6.97525 18.7999 6.59749C18.3948 6.21973 18.1827 5.75602 18.1635 5.20636C18.1437 4.64004 18.3228 4.15849 18.7009 3.76172C19.0789 3.36495 19.5428 3.15697 20.0924 3.13778C20.6588 3.118 21.1402 3.29297 21.5366 3.66269C21.9331 4.03242 22.1412 4.50044 22.161 5.06676C22.1802 5.61642 22.0051 6.09366 21.6357 6.49847C21.2662 6.90327 20.7984 7.11556 20.232 7.13534ZM12.202 6.41515C11.3692 6.44423 10.6511 6.17746 10.0478 5.61484C9.44443 5.05222 9.12822 4.3545 9.09914 3.52167C9.06948 2.67219 9.3361 1.94994 9.89901 1.35494C10.4619 0.759928 11.1598 0.447883 11.9926 0.4188C12.8421 0.389135 13.5642 0.651594 14.1589 1.20618C14.7536 1.76076 15.0658 2.46279 15.0955 3.31227C15.1246 4.1451 14.862 4.86304 14.3077 5.46608C13.7534 6.06913 13.0515 6.38548 12.202 6.41515ZM12.1322 4.41636C12.4154 4.40648 12.6494 4.30241 12.8342 4.10417C13.0191 3.90593 13.1066 3.66523 13.0967 3.38207C13.0868 3.09891 12.9828 2.8649 12.7845 2.68004C12.5863 2.49518 12.3456 2.40769 12.0624 2.41758C11.7793 2.42747 11.5452 2.53153 11.3604 2.72977C11.1755 2.92801 11.088 3.16871 11.0979 3.45187C11.1078 3.73503 11.2119 3.96904 11.4101 4.15391C11.6084 4.33877 11.8491 4.42625 12.1322 4.41636Z" fill="#11D462"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className={`${inter.className} text-[12px] text-gray-400`}>
              Join over
            </span>
            <span
              className={`${inter.className} font-bold text-[#004D40]`}
              style={{ fontSize: "20px", lineHeight: "28px" }}
            >
              5,000+ Women's
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}