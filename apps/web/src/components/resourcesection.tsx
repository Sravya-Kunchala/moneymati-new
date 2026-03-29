import Image from "next/image";

const resources = [
  {
    category: "BUDGETING",
    title: "The Beginner's Guide to Your First Financial Plan",
    description:
      "Learn the essential steps to creating a financial plan that works for your unique goals and lifestyle.",
    image: "/blog1.svg",
  },
  {
    category: "INVESTING",
    title: "How To Start Investing in Your 20s & 30s: A Beginner's Guide",
    description:
      "Discover the key principles of investing early and building a portfolio that grows with you.",
    image: "/blog2.svg",
  },
  {
    category: "MARKETS",
    title: "Everything You Need to Know About Investing in Stocks for Beginners",
    description:
      "A comprehensive guide to understanding the stock market and making informed investment decisions.",
    image: "/blog3.svg",
  },
];

export default function ResourcesSection() {
  return (
    <section className="w-full bg-[#1a3a2a] py-16 px-8">
      <style>{`
        @media (max-width: 767px) {
          .resources-header {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 16px !important;
          }
          .resources-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="resources-header flex items-start justify-between mb-10">
          <h2 className="text-3xl font-bold text-white leading-snug">
            Resources to{" "}
            <em className="text-[#c9a84c] italic font-serif">Grow</em>
            <br />
            Your Knowledge
          </h2>
          <button className="border border-white text-white text-sm px-5 py-2 rounded-full hover:bg-white hover:text-[#1a3a2a] transition-colors mt-2">
            View All Resources
          </button>
        </div>

        {/* Cards */}
        <div className="resources-grid grid grid-cols-3 gap-6">
          {resources.map(({ category, title, description, image }) => (
            <div
              key={title}
              className="bg-white rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  width={400}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-2">
                <span className="text-[#c9a84c] text-xs font-semibold tracking-widest">
                  {category}
                </span>
                <h3 className="text-sm font-bold text-[#1a3a2a] leading-snug">
                  {title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}