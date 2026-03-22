"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhySection from "@/components/whysection";
import AboutHero from "@/components/abouthero";
import MissionVision from "@/components/missionvision";
import ValuesSection from "@/components/valuesection";
import ImpactSection from "@/components/impactsection";
import CommunitySection from "@/components/communitysection";
import FinancialConfidence from "@/components/financialsection";
import CTASection from "@/components/ctaabout";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .section-animate {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .section-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-in-up-1 { animation: fadeInUp 0.7s ease 0.1s forwards; opacity: 0; }
        .fade-in-up-2 { animation: fadeInUp 0.7s ease 0.2s forwards; opacity: 0; }
        .fade-in-up-3 { animation: fadeInUp 0.7s ease 0.3s forwards; opacity: 0; }
        .fade-in-up-4 { animation: fadeInUp 0.7s ease 0.4s forwards; opacity: 0; }
        .fade-in-up-5 { animation: fadeInUp 0.7s ease 0.5s forwards; opacity: 0; }
        .fade-in-up-6 { animation: fadeInUp 0.7s ease 0.6s forwards; opacity: 0; }
        .fade-in-up-7 { animation: fadeInUp 0.7s ease 0.7s forwards; opacity: 0; }
        .fade-in-up-8 { animation: fadeInUp 0.7s ease 0.8s forwards; opacity: 0; }
        .fade-in-up-9 { animation: fadeInUp 0.7s ease 0.9s forwards; opacity: 0; }
      `}</style>

      <div className="fade-in-up-1">
        <Header />
      </div>

      <div className={`fade-in-up-2`}>
        <AboutHero />
      </div>

      <div className="fade-in-up-3">
        <WhySection />
      </div>

      <div className="fade-in-up-4">
        <MissionVision />
      </div>

      <div className="fade-in-up-5">
        <ValuesSection />
      </div>

      <div className="fade-in-up-6">
        <ImpactSection />
      </div>

      <div className="fade-in-up-7">
        <CommunitySection />
      </div>

      <div className="fade-in-up-8">
        <FinancialConfidence />
      </div>

      <div className="fade-in-up-9">
        <CTASection />
      </div>

      <div className="fade-in-up-9">
        <Footer />
      </div>
    </main>
  );
}