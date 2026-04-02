"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";

const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const companyLinks = [
  { label: "About Us",  href: "/About" },
  { label: "FAQ",       href: "/FAQ" },
  { label: "Our Team",  href: "/hometeams" },
  { label: "Contact",   href: "/home-contact" },
];

const resourcesLinks = [
  { label: "Blog",      href: "/blog" },
  { label: "Courses",   href: "/courses" },
  { label: "Webinars",  href: "/webinars" },
];

const legalLinks = [
  { label: "Privacy Policy",            href: "/privacypolicy" },
  { label: "Terms and Conditions",      href: "/termsandconditions" },
  { label: "Pricing Policy",            href: "/pricingpolicy" },
  { label: "Refund and Return Policy",  href: "/refund" },
  { label: "Cancellation Policy",       href: "/cancellationpolicy" },
];

const socialLinks = {
  linkedin:  "https://www.linkedin.com/company/moneymati/",
  instagram: "https://www.instagram.com/moneymati2022/",
  facebook:  "https://www.facebook.com/MoneymatiOfficial/",
  twitter:   "https://x.com/imoneymati",
};

const contactInfo = { email: "support@moneymati.com", phone: "+91 78426 99006", views: "12,085 Views" };

export default function Footer() {
  return (
    <footer
      className={`${playfairDisplay.variable} ${dmSans.variable}`}
      style={{ backgroundColor: "#214533", fontFamily: "var(--font-dm-sans), sans-serif", color: "#c8d8c8" }}
    >
      <style>{`
        .mm-footer-inner,
        .mm-footer-inner * {
          box-sizing: border-box;
        }

        .mm-footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 56px 24px;
        }

        /* ── MOBILE layout (default) ── */
        .mm-footer-grid {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 32px;
          width: 100%;
        }

        .mm-brand-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
          width: 100%;
          text-align: left;
        }

        /* Center contact rows and socials on mobile */
        .mm-contact-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #fff;
          width: 100%;
          justify-content: center;
        }

        .mm-socials-row {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          justify-content: center;
        }

        /* Company only on mobile — single column */
        .mm-nav-cols {
          display: flex;
          flex-direction: column;
          
          gap: 24px;
          width: 100%;
        }

        /* Resources column HIDDEN on mobile */
        .mm-resources-col {
          display: none;
        }

        /* Legal spans full width on mobile */
        .mm-legal-col {
          width: 100%;
          text-align: left;
        }

        /* ── DESKTOP layout (768px+) ── */
        @media (min-width: 768px) {
          .mm-footer-inner { padding: 56px 48px; }

          /* 3-column desktop grid: brand | company | legal */
          .mm-footer-grid {
            display: grid !important;
            grid-template-columns: 2fr 1fr 1fr !important;
            align-items: start !important;
            gap: 40px;
            flex-direction: unset;
          }

          /* Unwrap nav-cols so company becomes a direct grid child */
          .mm-nav-cols {
            display: contents;
          }

          /* Keep Resources hidden on desktop too */
          .mm-resources-col {
            display: none !important;
          }

          .mm-brand-col {
            text-align: left;
          }

          .mm-contact-row {
            justify-content: flex-start;
          }

          .mm-socials-row {
            justify-content: flex-start;
          }

          .mm-legal-col {
            width: auto;
          }
        }

        .mm-footer-bar {
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-align: center;
        }
        @media (min-width: 768px) {
          .mm-footer-bar {
            flex-direction: row;
            justify-content: space-between;
            padding: 20px 48px;
          }
        }

        .mm-link:hover  { opacity: 0.75; }
        .mm-navlink:hover { color: #fff !important; }

        .mm-col-heading {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          font-size: 1rem;
          color: #fff;
          margin-bottom: 20px;
          margin-top: 0;
          text-align: left;
        }

        .mm-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      `}</style>

      <div className="mm-footer-inner">
        <div className="mm-footer-grid">

          {/* ── 1. Brand ── */}
          <div className="mm-brand-col">
            <div style={{ width: 100, height: 100, overflow: "hidden", backgroundColor: "#fff" }}>
              <img
                src="/best new moneymati logo.svg"
                alt="MoneyMati"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "#a8c4a8", maxWidth: 220, margin: 0 }}>
              Empowering women to build wealth with confidence, clarity, and community.
            </p>

            <div className="mm-contact-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span>{contactInfo.views}</span>
            </div>

            <div className="mm-contact-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <a href={`mailto:${contactInfo.email}`} className="mm-link" style={{ color: "inherit", textDecoration: "none" }}>
                {contactInfo.email}
              </a>
            </div>

            <div className="mm-contact-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="mm-link" style={{ color: "inherit", textDecoration: "none" }}>
                {contactInfo.phone}
              </a>
            </div>

            {/* Socials */}
            <div className="mm-socials-row">
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="mm-link" style={{ color: "#fff", display: "flex" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="mm-link" style={{ color: "#fff", display: "flex" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="mm-link" style={{ color: "#fff", display: "flex" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="mm-link" style={{ color: "#fff", display: "flex" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── Mobile: Company only (Resources hidden) | Desktop: Company alone (via display:contents) ── */}
          <div className="mm-nav-cols">

            {/* Company */}
            <div>
              <h4 className="mm-col-heading">Company</h4>
              <ul className="mm-link-list">
                {companyLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="mm-navlink" style={{ fontSize: "0.85rem", color: "#a8c4a8", textDecoration: "none" }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources — hidden on both mobile and desktop */}
            <div className="mm-resources-col">
              <h4 className="mm-col-heading">Resources</h4>
              <ul className="mm-link-list">
                {resourcesLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="mm-navlink" style={{ fontSize: "0.85rem", color: "#a8c4a8", textDecoration: "none" }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>


            {/* ── Legal — inside nav-cols so it stacks below Company on mobile ── */}
            <div className="mm-legal-col">
              <h4 className="mm-col-heading">Legal</h4>
              <ul className="mm-link-list">
                {legalLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="mm-navlink" style={{ fontSize: "0.85rem", color: "#a8c4a8", textDecoration: "none" }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} />

      <div className="mm-footer-bar">
        <p style={{ fontSize: "0.8rem", color: "#7a9a7a", margin: 0 }}>© 2026 MoneyMati. All rights reserved.</p>
        <p style={{ fontSize: "0.8rem", color: "#7a9a7a", margin: 0 }}>
          Brought to you by <span style={{ fontWeight: 700, color: "#a8c4a8" }}>Zipnom</span>
        </p>
      </div>
    </footer>
  );
}