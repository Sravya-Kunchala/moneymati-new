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
    <div
      className={inter.className}
      style={{
        backgroundColor: "#F8F6F1",
        padding: "40px 48px",
        width: "100%",
      }}
    >
      <section
        style={{
          backgroundColor: "#0e3d27",
          padding: "32px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          borderRadius: "20px",
          maxWidth: "1040px",
          margin: "0 auto",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {/* Left: Heading */}
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            lineHeight: "32px",
            color: "#ffffff",
            maxWidth: "260px",
            flexShrink: 0,
          }}
        >
          Get New Financial Guides Delivered To Your Inbox
        </h2>

        {/* Right: Form */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flex: 1,
            maxWidth: "560px",
          }}
        >
          {/* Inputs row */}
          <div style={{ display: "flex", gap: "12px" }}>
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{
                flex: 1,
                height: "58px",
                background: "rgba(255, 255, 255, 0.10)",
                border: "1px solid rgba(255, 255, 255, 0.20)",
                borderRadius: "16px",
                padding: "18px 24px 19px",
                fontSize: "14px",
                color: "#ffffff",
                fontFamily: "var(--font-inter), sans-serif",
                outline: "none",
              }}
            />

            {/* Email Address */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                height: "58px",
                background: "rgba(255, 255, 255, 0.10)",
                border: "1px solid rgba(255, 255, 255, 0.20)",
                borderRadius: "16px",
                padding: "18px 24px 19px",
                fontSize: "14px",
                color: "#ffffff",
                fontFamily: "var(--font-inter), sans-serif",
                outline: "none",
              }}
            />
          </div>

          {/* Subscribe button */}
          <button
            onClick={handleSubscribe}
            style={{
              width: "100%",
              height: "60px",
              background: "#ffffff",
              border: "none",
              borderRadius: "16px",
              fontSize: "15px",
              fontWeight: 700,
              color: "#0e3d27",
              fontFamily: "var(--font-inter), sans-serif",
              cursor: "pointer",
              boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            Subscribe Now
          </button>

          {/* Privacy note */}
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "11px",
              color: "rgba(255,255,255,0.4)",
              textAlign: "center",
            }}
          >
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}