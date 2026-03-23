"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";

const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

// ─── CONFIGURE ALL YOUR LINKS HERE ───────────────────────────────────────────

const companyLinks = [
  { label: "About Us",  href: "/About" },
  { label: "FAQ",       href: "/FAQ" },
  { label: "Our Team",  href: "/hometeams" },
  { label: "Contact",   href: "/home-contact" },
];

const resourceLinks = [
  { label: "Blog",      href: "/Blog" },
  { label: "Courses",   href: "/Courses" },
  { label: "Webinars",  href: "/Webinars" },
];

const legalLinks = [
  { label: "Privacy Policy",            href: "#" },
  { label: "Terms and Conditions",      href: "#" },
  { label: "Pricing Policy",            href: "#" },
  { label: "Refund and Return Policy",  href: "#" },
  { label: "Cancellation Policy",       href: "#" },
];

const socialLinks = {
  linkedin:  "#",
  instagram: "#",
  facebook:  "#",
  twitter:   "#",
};

const contactInfo = {
  email: "support@moneymati.com",
  phone: "+91 78426 99006",
  views: "12,085 Views",
};

// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer
      className={`${playfairDisplay.variable} ${dmSans.variable}`}
      style={{
        backgroundColor: "#214533",
        fontFamily: "var(--font-dm-sans), sans-serif",
        color: "#c8d8c8",
      }}
    >
      {/* Main footer content */}
      <div
        className="mx-auto px-6 lg:px-12 py-14 grid grid-cols-1 md:grid-cols-4 gap-10"
        style={{ maxWidth: "1100px" }}
      >
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <div
            style={{
              width: "100px",
              height: "100px",
              overflow: "hidden",
              backgroundColor: "#ffffff",
              marginBottom: "8px",
            }}
          >
            <img
              src="/best new moneymati logo.svg"
              alt="MoneyMati"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "#a8c4a8", maxWidth: "200px" }}>
            Empowering women to build wealth with confidence, clarity, and community.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-2" style={{ fontSize: "0.82rem", color: "#ffffff" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>{contactInfo.views}</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2" style={{ fontSize: "0.82rem", color: "#ffffff" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <a
              href={`mailto:${contactInfo.email}`}
              style={{ color: "inherit", textDecoration: "none" }}
              className="hover:opacity-75 transition-opacity"
            >
              {contactInfo.email}
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2" style={{ fontSize: "0.82rem", color: "#ffffff" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              style={{ color: "inherit", textDecoration: "none" }}
              className="hover:opacity-75 transition-opacity"
            >
              {contactInfo.phone}
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4 mt-1">
            {/* LinkedIn */}
            <a href={socialLinks.linkedin} style={{ color: "#ffffff" }} className="hover:opacity-75 transition-opacity">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* Instagram */}
            <a href={socialLinks.instagram} style={{ color: "#ffffff" }} className="hover:opacity-75 transition-opacity">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* Facebook */}
            <a href={socialLinks.facebook} style={{ color: "#ffffff" }} className="hover:opacity-75 transition-opacity">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a href={socialLinks.twitter} style={{ color: "#ffffff" }} className="hover:opacity-75 transition-opacity">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Company
          </h4>
          <ul className="flex flex-col gap-3">
            {companyLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  style={{ fontSize: "0.85rem", color: "#a8c4a8" }}
                  className="hover:text-white transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Resources
          </h4>
          <ul className="flex flex-col gap-3">
            {resourceLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  style={{ fontSize: "0.85rem", color: "#a8c4a8" }}
                  className="hover:text-white transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Legal
          </h4>
          <ul className="flex flex-col gap-3">
            {legalLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  style={{ fontSize: "0.85rem", color: "#a8c4a8" }}
                  className="hover:text-white transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} />

      {/* Bottom bar */}
      <div
        className="mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-2"
        style={{ maxWidth: "1100px" }}
      >
        <p style={{ fontSize: "0.8rem", color: "#7a9a7a" }}>
          © 2026 MoneyMati. All rights reserved.
        </p>
        <p style={{ fontSize: "0.8rem", color: "#7a9a7a" }}>
          Brought to you by{" "}
          <span style={{ fontWeight: 700, color: "#a8c4a8" }}>Zipnom</span>
        </p>
      </div>
    </footer>
  );
}