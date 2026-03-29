"use client";

import { useEffect, useRef } from "react";
import { Dancing_Script, Playfair_Display, DM_Sans } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const sections = [
  {
    id: "acceptance-of-terms",
    number: "01",
    title: "Acceptance of Terms",
    content: (
      <p className="pp-body">
        By using MoneyMati&apos;s website and services, you agree to comply with these Terms and
        Conditions. MoneyMati reserves the right to update or change these terms at any time. Your
        continued use of our services following any changes indicates your acceptance of the new terms.
      </p>
    ),
  },
  {
    id: "services-provided",
    number: "02",
    title: "Services Provided",
    content: (
      <p className="pp-body">
        MoneyMati offers financial education webinars, courses, resources, and related services to
        enhance your understanding of financial topics. These services are for informational purposes
        only and are not intended to replace professional financial, legal, or investment advice.
      </p>
    ),
  },
  {
    id: "user-responsibilities",
    number: "03",
    title: "User Responsibilities",
    content: (
      <>
        <p className="pp-body">By using MoneyMati&apos;s services, you agree to:</p>
        <ul className="pp-list">
          <li>Provide accurate information during registration.</li>
          <li>Use our services only for lawful purposes.</li>
          <li>Refrain from sharing, distributing, or reselling our content without prior permission.</li>
          <li>
            Respect other users and MoneyMati&apos;s team during live sessions, webinars, or any
            interactive platforms.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    number: "04",
    title: "Intellectual Property",
    content: (
      <p className="pp-body">
        All content on the MoneyMati website, including but not limited to text, graphics, videos, and
        course materials, is the property of MoneyMati and protected by intellectual property laws.
        Unauthorized reproduction, distribution, or use of this content is prohibited without prior
        written consent from MoneyMati.
      </p>
    ),
  },
  {
    id: "payments-and-refunds",
    number: "05",
    title: "Payments and Refunds",
    content: (
      <ul className="pp-list">
        <li>
          <strong>Payments:</strong> Fees for webinars and services must be paid in full before access
          is granted.
        </li>
        <li>
          <strong>Refunds:</strong> Refund policies will be outlined on specific service or event pages.
          Generally, refunds are not provided once a webinar or service has been accessed, but exceptions
          may apply.
        </li>
      </ul>
    ),
  },
  {
    id: "disclaimers",
    number: "06",
    title: "Disclaimers",
    content: (
      <p className="pp-body">
        MoneyMati provides financial education for informational purposes only and does not offer
        financial, legal, or tax advice. MoneyMati is not liable for any decisions you make based on
        the information provided in our webinars or materials. Always consult a professional before
        making any financial decisions.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    number: "07",
    title: "Limitation of Liability",
    content: (
      <p className="pp-body">
        To the fullest extent permitted by law, MoneyMati will not be liable for any damages arising
        from your use of, or inability to use, our services, including any indirect, incidental, or
        consequential damages.
      </p>
    ),
  },
  {
    id: "privacy-policy",
    number: "08",
    title: "Privacy Policy",
    content: (
      <p className="pp-body">
        Your use of MoneyMati is also governed by our Privacy Policy, which outlines how we collect,
        use, and protect your personal information. Please review it to understand our practices.
      </p>
    ),
  },
  {
    id: "termination-of-use",
    number: "09",
    title: "Termination of Use",
    content: (
      <p className="pp-body">
        MoneyMati reserves the right to terminate your access to our services at our discretion,
        without notice, for any reason, including violation of these Terms and Conditions.
      </p>
    ),
  },
  {
    id: "governing-law",
    number: "10",
    title: "Governing Law",
    content: (
      <p className="pp-body">
        These Terms and Conditions are governed by the laws of [Your Jurisdiction], without regard to
        conflict of law principles. Any disputes will be resolved in the courts located in [Your
        Jurisdiction].
      </p>
    ),
  },
];

const tocItems = [
  { label: "Acceptance of Terms", href: "#acceptance-of-terms" },
  { label: "Services Provided", href: "#services-provided" },
  { label: "User Responsibilities", href: "#user-responsibilities" },
  { label: "Intellectual Property", href: "#intellectual-property" },
  { label: "Payments and Refunds", href: "#payments-and-refunds" },
  { label: "Disclaimers", href: "#disclaimers" },
  { label: "Limitation of Liability", href: "#limitation-of-liability" },
  { label: "Privacy Policy", href: "#privacy-policy" },
  { label: "Termination of Use", href: "#termination-of-use" },
  { label: "Governing Law", href: "#governing-law" },
  { label: "Contact Us", href: "#contact" },
];

export default function TermsAndConditions() {
  const ref = useRef(null);

  useEffect(() => {
    const elements = ref.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el, i) => {
      const htmlEl = el;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(24px)";
      htmlEl.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
      requestAnimationFrame(() => {
        htmlEl.style.opacity = "1";
        htmlEl.style.transform = "translateY(0)";
      });
    });

    const sectionIds = tocItems.map((item) => item.href.replace("#", ""));
    const onScroll = () => {
      let current = sectionIds[0];
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      });
      document.querySelectorAll(".pp-toc-list a").forEach((a) => {
        const href = a.getAttribute("href")?.replace("#", "");
        a.classList.toggle("active", href === current);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={`${dancingScript.variable} ${playfairDisplay.variable} ${dmSans.variable}`}
      style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#f5f5f0" }}
    >
      <style>{`
        /* ── Hero ── */
        /* Figma specs: Width 1440px fixed, Height 417px hug, Top 100px, Padding top/bottom 128px */
        /* Colors: Linear gradient #102218 → #F6F8F7 */
        .pp-hero {
          position: relative;
          min-height: 417px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 128px 24px;
          overflow: hidden;
          background: #102218;
        }
        .pp-hero-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          opacity: 1;
        }
        .pp-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(16,34,24,0.45) 0%, rgba(246,248,247,0.08) 100%);
        }
        .pp-hero-content {
          position: relative;
          z-index: 10;
          max-width: 620px;
        }
        .pp-hero-title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 14px;
          line-height: 1.15;
        }
        .pp-hero-sub {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.8);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ── Layout ── */
        .pp-layout {
          max-width: 1100px;
          margin: -48px auto 0;
          padding: 0 24px 80px;
          display: flex;
          gap: 48px;
          align-items: flex-start;
          position: relative;
          z-index: 10;
        }
        @media (max-width: 767px) {
          .pp-layout { flex-direction: column; padding: 0 16px 60px; margin-top: -32px; }
          .pp-toc-wrap { width: 100% !important; position: static !important; }
        }

        /* ── TOC ── */
        .pp-toc-wrap {
          width: 220px;
          flex-shrink: 0;
          position: sticky;
          top: 24px;
          padding-top: 48px;
          align-self: flex-start;
        }
        .pp-toc {
          background: transparent;
          border-radius: 0;
          padding: 0;
          box-shadow: none;
          display: block;
        }
        .pp-toc-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1a7a4a;
          padding-bottom: 10px;
          margin-bottom: 16px;
          display: block;
          box-sizing: border-box;
          width: 220px;
        }
        .pp-toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .pp-toc-list li { counter-increment: toc; }
        .pp-toc-list a {
          display: flex;
          gap: 8px;
          font-size: 0.82rem;
          color: #9aab9a;
          text-decoration: none;
          padding: 6px 8px;
          border-radius: 7px;
          transition: color 0.2s;
          line-height: 1.4;
        }
        .pp-toc-list a:hover { color: #1a7a4a; }
        .pp-toc-list a.active { color: #1a7a4a; font-weight: 700; }
        .pp-toc-list a.active .pp-toc-num { color: #1a7a4a; }
        .pp-toc-num {
          font-weight: 600;
          color: #9aab9a;
          font-size: 0.78rem;
          flex-shrink: 0;
          transition: color 0.2s;
        }

        /* ── Main Content ── */
        .pp-main { flex: 1; min-width: 0; }

        .pp-date-badge-wrap { padding: 20px 28px 0; }
        .pp-date-badge {
          display: inline-flex;
          align-items: center;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1a7a4a;
          border: 1.5px solid #1a7a4a;
          border-radius: 9999px;
          padding: 4px 16px;
          background: rgba(14, 175, 80, 0.10);
        }

        .pp-notice {
          padding: 20px 28px;
          margin-bottom: 0;
          font-size: 0.82rem;
          color: #4a5568;
          line-height: 1.6;
          border-bottom: 1px solid #f0f4f0;
        }

        .pp-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }

        .pp-section {
          padding: 28px 28px;
          border-bottom: 1px solid #f0f4f0;
        }
        .pp-section:last-child { border-bottom: none; }
        .pp-section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .pp-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #1a7a4a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 0.72rem;
          font-weight: 700;
          color: #ffffff;
          font-family: var(--font-dm-sans), sans-serif;
          letter-spacing: 0.02em;
        }
        .pp-section-title {
          font-family: var(--font-playfair), serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #122B1F;
        }
        .pp-body {
          font-size: 0.875rem;
          color: #4a5568;
          line-height: 1.75;
          margin-bottom: 12px;
        }
        .pp-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pp-list li {
          font-size: 0.875rem;
          color: #4a5568;
          line-height: 1.7;
          padding-left: 20px;
          position: relative;
        }
        .pp-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1.8px solid #1a7a4a;
          background: transparent;
        }
        .pp-list strong { color: #2d3748; font-weight: 600; }

        /* ── Contact ── */
        .pp-contact {
          background: #102218;
          padding: 40px 36px;
          color: #fff;
          margin: 20px 20px 0;
          border-radius: 14px;
        }
        .pp-contact-title {
          font-family: var(--font-playfair), serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .pp-contact-sub {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.65);
          margin-bottom: 24px;
          line-height: 1.6;
        }
        .pp-contact-grid { display: flex; flex-wrap: wrap; gap: 32px; }
        .pp-contact-item { display: flex; flex-direction: column; gap: 4px; }
        .pp-contact-item-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #4ade80;
          margin-bottom: 2px;
        }
        .pp-contact-item-label svg { width: 13px; height: 13px; stroke: #4ade80; }
        .pp-contact-item-val {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.9);
          font-weight: 500;
        }
        .pp-contact-item-val a { color: rgba(255,255,255,0.9); text-decoration: none; }
        .pp-contact-item-val a:hover { text-decoration: underline; }

        .pp-footer-note {
          text-align: center;
          font-size: 0.75rem;
          color: #9aabb8;
          padding: 24px 28px;
          line-height: 1.6;
        }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      {/* 2.svg: 1440×417px, padding 128px top/bottom, gradient #102218 → #F6F8F7 */}
      <section className="pp-hero">
        <img src="/2.svg" alt="" className="pp-hero-bg" />
        <div className="pp-hero-overlay" />
        <div className="pp-hero-content" data-animate>
          <h1 className="pp-hero-title">Terms and Conditions</h1>
          <p className="pp-hero-sub">
            Welcome to MoneyMati. By accessing or using our services, you agree
            to these Terms and Conditions.
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="pp-layout">

        {/* TOC */}
        <aside className="pp-toc-wrap" data-animate>
          <div className="pp-toc">
            <div className="pp-toc-label">On This Page</div>
            <ol className="pp-toc-list">
              {tocItems.map((item, i) => (
                <li key={item.href}>
                  <a href={item.href}>
                    <span className="pp-toc-num">{i + 1}.</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        {/* Main */}
        <main className="pp-main">
          <div className="pp-card" data-animate>

            <div className="pp-date-badge-wrap">
              <span className="pp-date-badge">Effective Date: 06-11-2024</span>
            </div>

            <div className="pp-notice">
              Welcome to MoneyMati, a service provided under the registered proprietorship
              MoneyMati. By accessing or using our website and services, including financial
              webinars and educational content, you agree to these Terms and Conditions.
              Please read them carefully. If you do not agree to these terms, you should not use
              our services.
            </div>

            {sections.map((sec, i) => (
              <div key={sec.id} id={sec.id} className="pp-section">
                <div className="pp-section-header">
                  <div className="pp-icon">{String(i + 1).padStart(2, "0")}</div>
                  <h2 className="pp-section-title">{sec.title}</h2>
                </div>
                {sec.content}
              </div>
            ))}

            {/* Contact */}
            <div id="contact" className="pp-contact">
              <div className="pp-contact-title">Contact Us</div>
              <p className="pp-contact-sub">
                If you have questions, concerns, or requests regarding this Privacy Policy,
                please contact us at:
              </p>
              <div className="pp-contact-grid">
                <div className="pp-contact-item">
                  <span className="pp-contact-item-label">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                    Email
                  </span>
                  <span className="pp-contact-item-val">
                    <a href="mailto:support@moneymati.com">support@moneymati.com</a>
                  </span>
                </div>
                <div className="pp-contact-item">
                  <span className="pp-contact-item-label">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Phone
                  </span>
                  <span className="pp-contact-item-val">+91 7075529006</span>
                </div>
                <div className="pp-contact-item">
                  <span className="pp-contact-item-label">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    Address
                  </span>
                  <span className="pp-contact-item-val">Hyderabad, Telangana- 500009</span>
                </div>
              </div>
            </div>

            <p className="pp-footer-note">
              These Terms and Conditions ensure MoneyMati&apos;s commitment to quality financial education and user security.
            </p>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}