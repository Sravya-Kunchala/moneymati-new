import Image from "next/image";
import { TrendingUp, BookOpen, Users, Target } from "lucide-react";

const features = [
  { icon: TrendingUp, label: "Cash Flow Management" },
  { icon: BookOpen, label: "Financial Education" },
  { icon: Users, label: "Community Support" },
  { icon: Target, label: "Goal Setting" },
];

export default function AboutSection() {
  return (
    <section className="w-full bg-[#F8F6F1] py-24 px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full flex items-center gap-48">

        {/* Left — Image Card */}
        {/* Left — Image Card */}
<div className="relative flex-shrink-0">
  <div className="bg-[#1a3a2a] rounded-2xl overflow-hidden w-72 p-3">
    <div className="relative rounded-xl overflow-hidden">
      <Image
        src="/Financial planning.svg"
        alt="Financial Confidence"
        width={280}
        height={340}
        className="object-cover w-full h-96"
      />

      {/* Footer overlaid on image bottom */}
      <div className="absolute bottom-3 left-3 right-3 bg-white rounded-xl px-3 py-3">
        <p className="text-gray-800 text-xs font-medium mb-2">
          Financial Confidence for Every Woman
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
            <div className="bg-[#c9a84c] h-1.5 rounded-full w-[96%]" />
          </div>
          <p className="text-gray-700 text-xs font-semibold">96%</p>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Right — Content */}
        <div className="flex-1">
          <h2 className="text-3xl font-serif text-[#1a3a2a] leading-snug mb-4">
            Money is a Tool —{" "}
            <em className="italic">Learn to Wield It Well</em>
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-md">
            Our MoneyMati platform is designed to help women build confidence in
            managing their finances. With expert-led courses, personalized guidance,
            and a supportive community, we empower you to take control of your
            financial future.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-3">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm"
              >
                <div className="bg-[#1a3a2a] p-2 rounded-lg">
                  <Icon className="text-white w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}