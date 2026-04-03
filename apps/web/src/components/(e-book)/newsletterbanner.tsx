"use client";

import React, { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function NewsletterBanner() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (fullName.trim() && email.trim()) {
      console.log("Subscribing:", { fullName, email });
    }
  };

  return (
    <>
      <style>{`
        .nl-section {
          background-color: #0e3d27;
          padding: 32px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          border-radius: 20px;
          max-width: 1040px;
          margin: 0 auto;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .nl-heading {
          margin: 0;
          font-family: var(--font-inter), sans-serif;
          font-weight: 700;
          font-size: 22px;
          line-height: 32px;
          color: #ffffff;
          max-width: 260px;
          flex-shrink: 0;
        }

        .nl-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
          max-width: 560px;
        }

        .nl-inputs-row {
          display: flex;
          gap: 12px;
        }

        .nl-input {
          flex: 1;
          height: 58px;
          background: rgba(255, 255, 255, 0.10);
          border: 1px solid rgba(255, 255, 255, 0.20);
          border-radius: 16px;
          padding: 18px 24px 19px;
          font-size: 14px;
          color: #ffffff;
          font-family: var(--font-inter), sans-serif;
          outline: none;
        }

        .nl-input::placeholder {
          color: rgba(255,255,255,0.5);
        }

        .nl-btn {
          width: 100%;
          height: 60px;
          background: #ffffff;
          border: none;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 700;
          color: #0e3d27;
          font-family: var(--font-inter), sans-serif;
          cursor: pointer;
          box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .nl-privacy {
          margin: 0;
          font-family: var(--font-inter), sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          text-align: center;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .nl-section {
            flex-direction: column;
            align-items: stretch;
            padding: 28px 20px;
            gap: 20px;
            border-radius: 16px;
          }

          .nl-heading {
            max-width: 100%;
            font-size: 18px;
            line-height: 27px;
            text-align: center;
          }

          .nl-form {
            max-width: 100%;
          }

          .nl-inputs-row {
            flex-direction: column;
            gap: 10px;
          }

          .nl-input {
            height: 52px;
            padding: 14px 18px;
          }

          .nl-btn {
            height: 52px;
            font-size: 14px;
          }
        }
      `}</style>

      <div
        className={inter.className}
        style={{ backgroundColor: "#f5f0e8", padding: "40px 48px", width: "100%" }}
      >
        <section className="nl-section">
          {/* Left: Heading */}
          <h2 className="nl-heading">
            Get New Financial Guides Delivered To Your Inbox
          </h2>

          {/* Right: Form */}
          <div className="nl-form">
            {/* Inputs row */}
            <div className="nl-inputs-row">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="nl-input"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="nl-input"
              />
            </div>

            {/* Subscribe button */}
            <button onClick={handleSubscribe} className="nl-btn">
              Subscribe Now
            </button>

            {/* Privacy note */}
            <p className="nl-privacy">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}