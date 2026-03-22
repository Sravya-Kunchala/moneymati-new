import Header from "@/components/header";
import Footer from "@/components/footer";
import TeamExperts from "@/components/home-expert";
import MeetTheTeamHero from "@/components/home-herosection";
import CTASection from "@/components/ctaabout";
import FinancialConfidence from "@/components/financialsection";

export default function Home() {
  return (
    <main>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(48px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }

        .anim-header    { animation: fadeInDown 0.6s ease 0.0s  both; }
        .anim-hero      { animation: fadeIn     0.9s ease 0.1s  both; }
        .anim-experts   { animation: fadeInUp   0.7s ease 0.25s both; }
        .anim-financial { animation: fadeInUp   0.7s ease 0.35s both; }
        .anim-cta       { animation: scaleIn    0.7s ease 0.45s both; }
        .anim-footer    { animation: fadeIn     0.6s ease 0.55s both; }
      `}</style>

      <div className="anim-header">
        <Header />
      </div>

      <div className="anim-hero">
        <MeetTheTeamHero />
      </div>

      <div className="anim-experts">
        <TeamExperts />
      </div>

      <div className="anim-financial">
        <FinancialConfidence />
      </div>

      <div className="anim-cta">
        <CTASection />
      </div>

      <div className="anim-footer">
        <Footer />
      </div>
    </main>
  );
}