"use client";

import { useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/herosection";
import AboutSection from "@/components/about";
import ServicesSection from "@/components/servicesection";
import FourSteps from "@/components/foursteps";
import ResourcesSection from "@/components/resourcesection";
import WebinarsSection from "@/components/webiersection";
import Testimonials from "@/components/testimonials";
import CTASection from "@/components/cta";
import Footer from "@/components/footer";
import MoneyMatiLaunch from "@/app/lauch/page"; // 👈 your launch screen component

export default function Home() {
  const [showLaunch, setShowLaunch] = useState(true);

  return (
    <>
      {/* Launch screen — sits on top, hidden after button click */}
      {showLaunch && (
        <MoneyMatiLaunch onEnter={() => setShowLaunch(false)} />
      )}

      {/* Home page — always rendered underneath */}
      <main style={{ visibility: showLaunch ? "hidden" : "visible" }}>
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in-up-1  { animation: fadeInUp 0.7s ease 0.1s  forwards; opacity: 0; }
          .fade-in-up-2  { animation: fadeInUp 0.7s ease 0.2s  forwards; opacity: 0; }
          .fade-in-up-3  { animation: fadeInUp 0.7s ease 0.3s  forwards; opacity: 0; }
          .fade-in-up-4  { animation: fadeInUp 0.7s ease 0.4s  forwards; opacity: 0; }
          .fade-in-up-5  { animation: fadeInUp 0.7s ease 0.5s  forwards; opacity: 0; }
          .fade-in-up-6  { animation: fadeInUp 0.7s ease 0.6s  forwards; opacity: 0; }
          .fade-in-up-7  { animation: fadeInUp 0.7s ease 0.7s  forwards; opacity: 0; }
          .fade-in-up-8  { animation: fadeInUp 0.7s ease 0.8s  forwards; opacity: 0; }
          .fade-in-up-9  { animation: fadeInUp 0.7s ease 0.9s  forwards; opacity: 0; }
          .fade-in-up-10 { animation: fadeInUp 0.7s ease 1.0s  forwards; opacity: 0; }
        `}</style>

        <div className="fade-in-up-1"><Header /></div>
        <div className="fade-in-up-2"><HeroSection /></div>
        <div className="fade-in-up-3"><AboutSection /></div>
        <div className="fade-in-up-4"><ServicesSection /></div>
        <div className="fade-in-up-5"><FourSteps /></div>
        <div className="fade-in-up-6"><ResourcesSection /></div>
        <div className="fade-in-up-7"><WebinarsSection /></div>
        <div className="fade-in-up-8"><Testimonials /></div>
        <div className="fade-in-up-9"><CTASection /></div>
        <div className="fade-in-up-10"><Footer /></div>
      </main>
    </>
  );
}
