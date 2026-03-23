"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import CommunityHero from "@/components/(community)/herosection";
import RecentDiscussions from "@/components/(community)/recentdiscussions";
import CommunitySpotlight from "@/components/(community)/communitysoplight";

export default function Home() {
  return (
    <main>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up-1 { animation: fadeInUp 0.7s ease 0.1s forwards; opacity: 0; }
        .fade-in-up-3 { animation: fadeInUp 0.7s ease 0.3s forwards; opacity: 0; }
        .fade-in-up-4 { animation: fadeInUp 0.7s ease 0.4s forwards; opacity: 0; }
        .fade-in-up-5 { animation: fadeInUp 0.7s ease 0.5s forwards; opacity: 0; }
      `}</style>

      <div className="fade-in-up-1">
        <Header />
      </div>

      {/* No animation wrapper on CommunityHero — overflow:visible needs to work */}
      <CommunityHero />

      <div
        className="fade-in-up-3"
        style={{
          marginTop: "-40px",
          paddingTop: "80px",
          backgroundColor: "#F8F6F1",
          position: "relative",
          zIndex: 2,
        }}
      >
        <RecentDiscussions />
      </div>

      <div className="fade-in-up-4">
        <CommunitySpotlight />
      </div>

      <div className="fade-in-up-5">
        <Footer />
      </div>
    </main>
  );
}