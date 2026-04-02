"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const faqs = [
  {
    question: "What is MoneyMati and how can it help me?",
    answer: "MoneyMati is a financial platform designed to help you take control of your financial future with clarity and confidence. We provide personalized financial education, investment strategies, and wealth-building tools tailored to your unique needs.",
  },
  {
    question: "Why is MoneyMati focused on women?",
    answer: "MoneyMati addresses the unique financial challenges women face, such as the gender pay gap and longer life expectancy, by providing tailored education and investment strategies to ensure long-term security.",
  },
  {
    question: "What financial services does MoneyMati offer?",
    answer: "MoneyMati offers a range of financial services including personalized investment advice, financial planning tools, educational resources, and community support to help you achieve your wealth-building goals.",
  },
  {
    question: "How does MoneyMati personalize financial advice for me?",
    answer: "MoneyMati uses your financial goals, risk tolerance, income, and life stage to create personalized recommendations and strategies that are uniquely suited to your situation.",
  },
  {
    question: "Is MoneyMati only for women?",
    answer: "While MoneyMati is primarily designed with women in mind, our platform is open to anyone who wants to build financial confidence and grow their wealth through smart, informed decisions.",
  },
  {
    question: "How does MoneyMati's fee structure work?",
    answer: "MoneyMati offers flexible pricing plans to suit different needs and budgets. We have a free tier with basic features and premium plans that unlock advanced tools, personalized advice, and exclusive community access.",
  },
  {
    question: "Can I start with just one financial service, or do I need to sign up for everything?",
    answer: "Absolutely! You can start with any single service that meets your current needs. MoneyMati is designed to be modular, so you can add more services as your financial journey evolves.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(1);

  return (
    <div className="w-full">
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
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes faqItemIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes answerExpand {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .anim-header     { animation: fadeInDown  0.6s ease 0.0s both; }
        .anim-hero       { animation: fadeIn      0.8s ease 0.2s both; }
        .anim-faq-header { animation: fadeInUp    0.7s ease 0.3s both; }
        .anim-faq-list   { animation: fadeInUp    0.7s ease 0.4s both; }
        .anim-banner     { animation: scaleIn     0.7s ease 0.5s both; }
        .anim-footer     { animation: fadeIn      0.6s ease 0.6s both; }
        .anim-answer     { animation: answerExpand 0.25s ease both; }

        .faq-item-0 { animation: faqItemIn 0.5s ease 0.40s both; }
        .faq-item-1 { animation: faqItemIn 0.5s ease 0.46s both; }
        .faq-item-2 { animation: faqItemIn 0.5s ease 0.52s both; }
        .faq-item-3 { animation: faqItemIn 0.5s ease 0.58s both; }
        .faq-item-4 { animation: faqItemIn 0.5s ease 0.64s both; }
        .faq-item-5 { animation: faqItemIn 0.5s ease 0.70s both; }
        .faq-item-6 { animation: faqItemIn 0.5s ease 0.76s both; }

        /* ── MOBILE ONLY ── */
        @media (max-width: 767px) {

          /* Hero */
          .faq-hero {
            min-height: 260px !important;
            padding: 80px 20px 56px !important;
          }
          .faq-hero-title {
            font-size: 44px !important;
            line-height: 52px !important;
            letter-spacing: -1px !important;
          }
          .faq-hero-sub {
            font-size: 14px !important;
            line-height: 23px !important;
          }

          /* FAQ section */
          .faq-section {
            padding: 40px 0 40px !important;
          }
          .faq-section-inner {
            padding: 0 14px !important;
          }

          /* Section heading */
          .faq-section-heading {
            font-size: 20px !important;
            line-height: 28px !important;
            margin-bottom: 20px !important;
          }

          /* Accordion items */
          .faq-accordion-item button {
            padding: 14px 14px !important;
            min-height: 58px !important;
          }
          .faq-question-text {
            font-size: 13px !important;
            line-height: 20px !important;
          }
          .faq-icon-btn {
            width: 28px !important;
            height: 28px !important;
          }
          .faq-answer-wrap {
            padding: 8px 14px 14px !important;
          }
          .faq-answer-text {
            font-size: 13px !important;
          }

          /* Banner */
          .faq-banner {
            padding: 40px 20px !important;
          }
          .faq-banner-title {
            font-size: 24px !important;
            line-height: 30px !important;
          }
          .faq-banner-sub {
            font-size: 13px !important;
            margin-bottom: 24px !important;
          }
          .faq-banner-btn {
            width: 100% !important;
            max-width: 320px !important;
            height: 50px !important;
            font-size: 14px !important;
          }
        }
      `}</style>

      <div className="anim-header">
        <Header />
      </div>

      {/* Hero Banner */}
      <div
        className="faq-hero anim-hero w-full flex flex-col items-center justify-center text-center px-6 py-16 md:py-20 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #004D40 5%, #064E3B)",
          minHeight: "410px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/Gradient.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            className="faq-hero-title text-white mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(48px, 6vw, 72px)",
              lineHeight: "72px",
              letterSpacing: "-1.8px",
              textAlign: "center",
            }}
          >
            FAQs
          </h1>
          <p
            className="faq-hero-sub text-white"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "29.25px",
              letterSpacing: "0px",
              textAlign: "center",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Take control of your financial future with clarity and confidence. We're here to answer your questions and guide your wealth-building journey.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div
        className="faq-section w-full py-16"
        style={{ background: "#F0F4F0" }}
      >
        <div className="faq-section-inner" style={{ maxWidth: "684px", margin: "0 auto", padding: "0 16px" }}>

          {/* Section Header */}
          <div className="anim-faq-header text-center mb-10">
            <h2
              className="faq-section-heading mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "30px",
                lineHeight: "36px",
                letterSpacing: "0px",
                textAlign: "center",
                color: "#0F172A",
              }}
            >
              Empowering your journey to investing success<br />
              through core financial beliefs.
            </h2>
            <div className="w-10 h-[3px] bg-green-600 mx-auto rounded-full" />
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-[6px]">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-accordion-item faq-item-${idx} bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-200 ${
                  openIdx === idx ? "border-2 border-gray-800" : "border border-gray-100"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left min-h-[72px]"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  <span
                    className="faq-question-text pr-4"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "15px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      color: "#1E293B",
                    }}
                  >
                    {faq.question}
                  </span>
                  <div
                    className="faq-icon-btn w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
                    style={{
                      backgroundColor: openIdx === idx ? "#0F172A" : "#E6F4F1",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`transition-transform duration-300 ${openIdx === idx ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke={openIdx === idx ? "#ffffff" : "#0d9488"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
                {openIdx === idx && (
                  <div className="faq-answer-wrap anim-answer px-6 pb-5 pt-2 border-t border-gray-100">
                    <p
                      className="faq-answer-text text-[14px] text-gray-500 leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Still Have Questions Banner */}
      <div
        className="faq-banner anim-banner w-full py-14 px-6 text-center"
        style={{ background: "#E8F0E8" }}
      >
        <h2
          className="faq-banner-title mb-3"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: "36px",
            lineHeight: "40px",
            letterSpacing: "0px",
            color: "#0F172A",
          }}
        >
          Still have questions?
        </h2>
        <p
          className="faq-banner-sub text-gray-600 text-[15px] mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Our financial experts are here to help you navigate your wealth-building journey.
        </p>
        <div className="flex justify-center">
          <button
            className="faq-banner-btn text-white font-semibold text-[15px] transition-colors duration-200"
            style={{
              width: "321px",
              height: "56px",
              minWidth: "200px",
              borderRadius: "59px",
              paddingLeft: "19.59px",
              paddingRight: "19.6px",
              backgroundColor: "#064E3B",
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#053d2e")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#064E3B")}
          >
            Join Our Community
          </button>
        </div>
      </div>

      <div className="anim-footer">
        <Footer />
      </div>
    </div>
  );
}