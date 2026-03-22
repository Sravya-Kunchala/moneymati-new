import Header from "@/components/header";
import Footer from "@/components/footer";
import MoneyMatiHero from "@/components/(e-book)/herosection";
import FinancialResources from "@/components/(e-book)/financiale-book";
import NewsletterBanner from "@/components/(e-book)/newsletterbanner";

export default function Home() {
  return (
    <main>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }

        .anim-header      { animation: fadeInDown  0.6s ease 0.0s both; }
        .anim-hero        { animation: fadeIn       0.8s ease 0.2s both; }
        .anim-resources   { animation: fadeInUp     0.7s ease 0.3s both; }
        .anim-newsletter  { animation: scaleIn      0.7s ease 0.4s both; }
        .anim-footer      { animation: fadeIn       0.6s ease 0.5s both; }
      `}</style>

      <div className="anim-header">
        <Header />
      </div>

      <div className="anim-hero">
        <MoneyMatiHero />
      </div>

      <div className="anim-resources">
        <FinancialResources />
      </div>

      <div className="anim-newsletter">
        <NewsletterBanner />
      </div>

      <div className="anim-footer">
        <Footer />
      </div>
    </main>
  );
}