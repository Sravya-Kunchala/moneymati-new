"use client";

import Header from "@/components/header";
import LatestArticles from "@/components/(Blog)/latestarticles";
import Footer from "@/components/footer";
import FeaturedArticleCard from "@/components/(Blog)/herosections";

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
      `}</style>

      <div className="fade-in-up-1">
        <Header />
      </div>

      <div className="fade-in-up-2">
        <FeaturedArticleCard />
      </div>

      <div className="fade-in-up-3">
        <LatestArticles />
      </div>

      <div className="fade-in-up-4">
        <Footer />
      </div>
    </main>
  );
}