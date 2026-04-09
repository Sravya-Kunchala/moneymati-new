"use client";

import { useState } from "react";
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
  instagram: "https://www.instagram.com/moneymatiofficial?igsh=b3UzZG94bnZkY24y&utm_source=qr",
  facebook:  "https://www.facebook.com/MoneymatiOfficial/",
};

const contactInfo = { email: "support@moneymati.com", phone: "+91 78426 99006", views: "12,085 Views" };

export default function Footer() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setError(null);
    if (!(formData.name.trim() && formData.email.trim())) {
      setError("Name and email are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/personalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          occupation: "subscriber",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data?.duplicate) {
          setError("You are already subscribed.");
        } else {
          setError(data?.error || "Subscription failed. Please retry.");
        }
      } else {
        setSubscribed(true);
        setFormData({ name: "", email: "", phone: "" });
        setError(null);
        setTimeout(() => setSubscribed(false), 3000);
      }
    } catch (err) {
      console.error("subscribe fetch error", err);
      setError("Network error. Saved locally; will sync when online.");
    } finally {
      setLoading(false);
    }
  };

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
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 24px;
        }

        /* ── MOBILE layout (default) ── */
        .mm-footer-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          width: 100%;
        }

        /* Brand col: centered on mobile */
        .mm-brand-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          width: 100%;
          text-align: center;
        }

        .mm-brand-desc {
          font-size: 0.85rem;
          line-height: 1.7;
          color: #a8c4a8;
          max-width: 220px;
          margin: 0;
          /* Force 2 lines on mobile */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

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

        /* Company + Legal side by side on mobile */
        .mm-nav-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          width: 100%;
        }

        .mm-resources-col {
          display: none;
        }

        .mm-legal-col {
          width: 100%;
          text-align: left;
        }

        /* ── Newsletter card ── */
        .mm-digest-card {
          width: 100%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .mm-digest-icon {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.08);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .mm-digest-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 100px;
          border: none;
          outline: none;
          background: #fff;
          font-size: 0.85rem;
          color: #333;
          font-family: var(--font-dm-sans), sans-serif;
        }
        .mm-digest-input::placeholder { color: #aaa; }

        .mm-digest-btn {
          width: 100%;
          padding: 13px 16px;
          border-radius: 100px;
          border: none;
          background: #0d2818;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-dm-sans), sans-serif;
          transition: background 0.2s, transform 0.1s;
        }
        .mm-digest-btn:hover  { background: #0a1f12; }
        .mm-digest-btn:active { transform: scale(0.98); }
        .mm-digest-btn.subscribed { background: #1a6636; }

        /* ── DESKTOP layout (768px+) ── */
        @media (min-width: 768px) {
          .mm-footer-inner { padding: 56px 48px; }

          .mm-footer-grid {
            display: grid !important;
            grid-template-columns: 2fr 1fr 1fr 1.6fr !important;
            align-items: start !important;
            gap: 40px;
            flex-direction: unset;
          }

          /* Brand col: left-aligned on desktop */
          .mm-brand-col {
            align-items: flex-start;
            text-align: left;
          }

          .mm-brand-desc {
            -webkit-line-clamp: unset;
            overflow: visible;
            display: block;
          }

          .mm-nav-cols {
            display: contents;
          }

          .mm-resources-col {
            display: none !important;
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

          .mm-digest-card {
            width: 100%;
          }
        }

        .mm-footer-bar {
          max-width: 1200px;
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

        .mm-link:hover    { opacity: 0.75; }
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
            <a href="/" style={{ display: "block", width: 100, height: 100, overflow: "hidden", backgroundColor: "#fff", flexShrink: 0 }}>
              <img
                src="/best new moneymati logo.svg"
                alt="MoneyMati"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </a>

            <p className="mm-brand-desc">
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
            </div>
          </div>

          {/* ── 2 & 3. Company + Legal ── */}
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

            {/* Resources — hidden */}
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

            {/* Legal */}
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

          {/* ── 4. Weekly Digest card ── */}
          <div className="mm-digest-card">
            <div className="mm-digest-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>
                Join the Weekly Digest
              </h4>
              <p style={{ fontSize: "0.82rem", color: "#a8c4a8", lineHeight: 1.6, margin: 0 }}>
                Get expert financial tips and market insights delivered straight to your inbox every Monday.
              </p>
            </div>

            <input
              type="text"
              className="mm-digest-input"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input
              type="email"
              className="mm-digest-input"
              placeholder="Your email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            />

            <input
              type="tel"
              className="mm-digest-input"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            />

            <button
              className={`mm-digest-btn${subscribed ? " subscribed" : ""}`}
              onClick={handleSubscribe}
              disabled={loading}
              style={{ opacity: loading ? 0.85 : 1, cursor: loading ? "wait" : "pointer" }}
            >
              {loading ? "Submitting..." : subscribed ? "✓ Subscribed!" : "Subscribe Now"}
            </button>
            {error && (
              <p style={{ fontSize: "0.75rem", color: "#fca5a5", margin: "6px 0 0", textAlign: "center" }}>
                {error}
              </p>
            )}

            <p style={{ fontSize: "0.72rem", color: "#7a9a7a", margin: 0, textAlign: "center" }}>
              We respect your privacy. Unsubscribe at any time.
            </p>
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
