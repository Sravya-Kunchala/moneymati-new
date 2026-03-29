import { TrendingUp, BookOpen, Users, Target } from "lucide-react";

const features = [
  { icon: TrendingUp, label: "Wealth Management" },
  { icon: BookOpen, label: "Financial Education" },
  { icon: Users, label: "Community Support" },
  { icon: Target, label: "Financial Setting" },
];

export default function AboutSection() {
  return (
    <section className="w-full bg-[#F8F6F1] py-24 px-8 flex items-center justify-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Playfair+Display:wght@600&display=swap');

        .about-paragraph {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 21px;
          line-height: 26px;
          color: #000000;
        }

        /* ── Video Card ── */
        .video-card-wrapper {
          position: relative;
          flex-shrink: 0;
          width: 576px;
        }

        .video-card {
          background: #1a3a2a;
          border-radius: 16px;
          padding: 11px;
          overflow: hidden;
          width: 576px;
          height: 302px;
          box-shadow: 0 8px 32px rgba(26,58,42,0.18);
        }

        .video-card video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 8px;
        }

        @media (max-width: 767px) {
          .about-inner {
            flex-direction: column !important;
            gap: 32px !important;
            align-items: center !important;
          }
          .video-card-wrapper {
            width: 100% !important;
            max-width: 576px !important;
          }
          .video-card {
            width: 100% !important;
            height: auto !important;
            min-height: 200px !important;
          }
          .about-content {
            width: 100% !important;
            text-align: center !important;
          }
          .about-paragraph {
            text-align: center !important;
            font-size: 17px !important;
            line-height: 22px !important;
          }
          .about-feature-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="about-inner max-w-6xl w-full flex items-center gap-16">

        {/* Left — Video Card */}
        <div className="video-card-wrapper">
          <div className="video-card">
            <video
              src="/INTRO.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </div>
        </div>

        {/* Right — Content */}
        <div className="about-content flex-1">
          <div className="about-paragraphs mb-8 w-full flex flex-col gap-5">
            <p className="about-paragraph">
              Women often face unique career and financial challenges from pay gaps and career breaks due to responsibilities of home and child and care, to the lack of independent financial decision-making. At times, they also fall prey to mis-selling and cyber frauds in the absence of credible guidance and safe financial platforms.
            </p>
            <p className="about-paragraph">
              Moneymati was born to change that narrative. We're building a safe, reliable, and inclusive wealth platform designed exclusively for women helping them learn, stay informed, and invest with confidence.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="about-feature-grid grid grid-cols-2 gap-3 max-w-lg ml-20">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-[#EBE7E0] rounded-xl px-4 py-3 shadow-sm"
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