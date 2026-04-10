"use client";

import { useEffect, useState } from "react";
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
import FinancialCommunity from "@/components/socialmedia";
import TopEbooks from "@/components/tope-books";
import PersonalizeModal from "@/components/confrimation";

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const loadSession = async () => {
      try {
        const res = await fetch("/api/auth/get-session", { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json();
        const hasUser = Boolean(data?.user);
        setIsLoggedIn(hasUser);

        if (hasUser) {
          const already = window.localStorage.getItem("personalize_submitted") === "1";
          if (!already) {
            timer = setTimeout(() => setShowConfirm(true), 5000);
          }
        }
      } catch {
        // ignore
      }
    };

    loadSession();
    return () => { if (timer) clearTimeout(timer); };
  }, []);

  const scrollToTop = () => {
    document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
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

        .scroll-top-btn {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 44px;
          height: 44px;
          background: #11803a;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 999;
          box-shadow: 0 4px 14px rgba(0,0,0,0.2);
          transition: opacity 0.3s ease, transform 0.3s ease, background 0.2s;
        }
        .scroll-top-btn:hover {
          background: #0d6830;
          transform: translateY(-3px);
        }
        .scroll-top-btn.hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateY(10px);
        }
        .scroll-top-btn.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
      `}</style>

      <div id="hero-section" className="fade-in-up-1"><Header /></div>
      <div className="fade-in-up-2"><HeroSection /></div>
      <div className="fade-in-up-3"><AboutSection /></div>
      <div className="fade-in-up-4"><ServicesSection /></div>
      <div className="fade-in-up-5"><FourSteps /></div>
      <div className="fade-in-up-6"><ResourcesSection /></div>
      <div className="fade-in-up-8"><TopEbooks /></div>
      <div className="fade-in-up-7"><WebinarsSection /></div>
      <div className="fade-in-up-8"><FinancialCommunity /></div>
      <div className="fade-in-up-8"><Testimonials /></div>
      <div className="fade-in-up-9"><CTASection /></div>
      <div className="fade-in-up-10"><Footer /></div>
      {showConfirm && (
        <PersonalizeModal
          onClose={() => setShowConfirm(false)}
          onSuccess={() => setShowConfirm(false)}
        />
      )}

      {/* Scroll to top button */}
      <button
        className={`scroll-top-btn ${showScroll ? "visible" : "hidden"}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </main>
  );
}
