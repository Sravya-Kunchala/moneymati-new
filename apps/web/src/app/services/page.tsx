import Header from "@/components/header";
import WebinarCategories from "@/components/(services)/webinarsection";
import TrustSection from "@/components/(services)/trustsection";
import Footer from "@/components/footer";
import FeaturedWebinar from "@/components/(services)/featuredwebinar";
import HeroSection from "@/components/(services)/herosection";
import CommunityTestimonials from "@/components/(services)/testinomials";

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
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .anim-header        { animation: fadeInDown  0.6s ease 0.0s  both; }
        .anim-hero          { animation: fadeIn      0.9s ease 0.1s  both; }
        .anim-categories    { animation: fadeInUp    0.7s ease 0.2s  both; }
        .anim-featured      { animation: scaleIn     0.7s ease 0.3s  both; }
        .anim-trust         { animation: fadeInUp    0.7s ease 0.35s both; }
        .anim-testimonials  { animation: slideInLeft 0.7s ease 0.4s  both; }
        .anim-footer        { animation: fadeIn      0.6s ease 0.5s  both; }
      `}</style>

      <div className="anim-header">
        <Header />
      </div>

      <div className="anim-hero">
        <HeroSection />
      </div>

      <div className="anim-categories">
        <WebinarCategories />
      </div>

      <div className="anim-featured">
        <FeaturedWebinar />
      </div>

      <div className="anim-trust">
        <TrustSection />
      </div>

      <div className="anim-testimonials">
        <CommunityTestimonials />
      </div>

      <div className="anim-footer">
        <Footer />
      </div>
    </main>
  );
}