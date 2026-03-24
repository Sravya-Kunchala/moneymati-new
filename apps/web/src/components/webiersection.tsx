import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

const webinars = [
  {
    date: "March 15, 2026",
    title: "Women of Wealth: Building Your First Investment Portfolio",
    description:
      "Learn how to build a diversified investment portfolio from scratch with expert guidance.",
    image: "/webinar1.svg",
  },
  {
    date: "March 22, 2026",
    title: "Conquering Your Finances: Does Your Money Work for You Enough?",
    description:
      "Discover strategies to make your money work harder and grow your wealth faster.",
    image: "/webinar2.svg",
  },
  {
    date: "April 5, 2026",
    title: "Stock Market Secrets: From Basics to Your First Trade",
    description:
      "A hands-on workshop to help you understand the stock market and make your first investment.",
    image: "/webinar3.svg",
  },
];

export default function WebinarsSection() {
  return (
    <section className={`${playfair.variable} w-full bg-[#f5f0e8] py-16 px-8`}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1a3a2a] leading-snug text-center">
  Upcoming Webinars &amp; <br /> Workshops
</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6">
          {webinars.map(({ date, title, description, image }) => (
            <div
              key={title}
              className="flex flex-col rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Image */}
              <div className="h-52">
                <Image
                  src={image}
                  alt={title}
                  width={400}
                  height={220}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="bg-[#1a3a2a] p-5 flex flex-col gap-3 flex-1">
                <span className="text-[#C6A553] text-xs">
                  {date}
                </span>
                <h3 className="text-sm font-bold text-white leading-snug">
                  {title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed flex-1">
                  {description}
                </p>
                <button className="bg-[#C6A553] text-[#1B3226] text-xs font-semibold px-5 py-2 rounded-full w-fit hover:bg-[#b8963e] transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}