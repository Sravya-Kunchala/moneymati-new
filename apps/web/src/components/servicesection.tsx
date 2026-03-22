import { GraduationCap, TrendingUp, ClipboardList, Video } from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Financial Education Courses",
    description:
      "Self-paced courses covering everything from budgeting basics to advanced investing strategies, designed specifically for women.",
  },
  {
    icon: TrendingUp,
    title: "Investment Guidance",
    description:
      "Navigate the world of investing with expert guidance, personalized portfolio recommendations, and real-time market insights.",
  },
  {
    icon: ClipboardList,
    title: "Financial Planning",
    description:
      "Comprehensive financial planning services to help you set goals, manage debt, and create a roadmap for your financial future.",
  },
  {
    icon: Video,
    title: "Webinars & Workshops",
    description:
      "Live and recorded webinars and workshops led by financial experts, covering a wide range of topics relevant to women's finances.",
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-[#f5f0e8] py-20 px-8 flex flex-col items-center relative overflow-hidden">

      {/* Background SVG */}
      {/* Background SVG — behind cards only */}
<div className="absolute left-0 right-0 pointer-events-none" style={{ top: "34%" }}>
  <svg
    width="100%"
    height="400"
    viewBox="0 0 993 504"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.00006 147.536C6.83339 96.2027 32.7001 -4.86396 89.5001 1.53604C160.5 9.53604 351.5 504.036 429.5 502.536C507.5 501.036 635 -17.964 720 1.53604C788 17.136 929.667 342.036 992 502.536" stroke="url(#paint0_linear_14_1513)" strokeOpacity="0.58" strokeWidth="2" strokeLinecap="round" strokeDasharray="21 21"/>
    <defs>
      <linearGradient id="paint0_linear_14_1513" x1="992" y1="503.036" x2="89.5001" y2="1.03614" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1B3226"/>
        <stop offset="1" stopColor="#529874"/>
      </linearGradient>
    </defs>
  </svg>
</div>

      {/* Heading */}
      <div className="text-center max-w-xl mb-12 relative z-10">
        <h2 className="text-3xl font-bold text-[#1a3a2a] leading-snug mb-4">
          Everything You Need to Master Your Money
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Our comprehensive suite of financial tools, education, and personalized guidance
          empowers you to build wealth with confidence.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-5 max-w-5xl w-full relative z-10">
        {services.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm"
          >
            {/* Icon */}
            <div className="bg-[#1a3a2a] p-3 rounded-xl w-fit">
              <Icon className="text-white w-5 h-5" />
            </div>

            {/* Text */}
            <h3 className="text-sm font-bold text-[#1a3a2a] leading-snug">
              {title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed flex-1">
              {description}
            </p>

            {/* Link */}
            <a
              href="#"
              className="text-xs font-semibold text-[#1a3a2a] hover:underline flex items-center gap-1"
            >
              Learn More →
            </a>
          </div>
        ))}
      </div>

    </section>
  );
}