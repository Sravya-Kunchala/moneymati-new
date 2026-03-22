"use client";

import Header from "@/components/header";
import FinancialCalculators from "@/components/(calculator)/herosection";
import Footer from "@/components/footer";
import CalculatorGrid from "@/components/(calculator)/calucatorgrid";
import SIPCalculatorBanner from "@/components/(calculator)/calucatorbanner";
import FinancialCTABanner from "@/components/(calculator)/banner";
import WhyMoneyMati from "@/components/(calculator)/whysection";

export default function Home() {
  return (
    <main>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up-1 { animation: fadeInUp 0.7s ease 0.1s forwards; opacity: 0; }
        .fade-in-up-2 { animation: fadeInUp 0.7s ease 0.2s forwards; opacity: 0; }
        .fade-in-up-3 { animation: fadeInUp 0.7s ease 0.3s forwards; opacity: 0; }
        .fade-in-up-4 { animation: fadeInUp 0.7s ease 0.4s forwards; opacity: 0; }
        .fade-in-up-5 { animation: fadeInUp 0.7s ease 0.5s forwards; opacity: 0; }
        .fade-in-up-6 { animation: fadeInUp 0.7s ease 0.6s forwards; opacity: 0; }
        .fade-in-up-7 { animation: fadeInUp 0.7s ease 0.7s forwards; opacity: 0; }
      `}</style>

      <div className="fade-in-up-1">
        <Header />
      </div>

      <div className="fade-in-up-2">
        <FinancialCalculators />
      </div>

      <div className="fade-in-up-3">
        <CalculatorGrid />
      </div>

      <div className="fade-in-up-4">
        <SIPCalculatorBanner />
      </div>

      <div className="fade-in-up-5">
        <WhyMoneyMati />
      </div>

      <div className="fade-in-up-6">
        <FinancialCTABanner />
      </div>

      <div className="fade-in-up-7">
        <Footer />
      </div>
    </main>
  );
}