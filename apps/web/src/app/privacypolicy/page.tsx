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
    id: "information-we-collect",
    number: "01",
    title: "Information We Collect",
    content: (
      <>
        <p className="pp-body">
          To provide you with valuable financial education, MoneyMati collects specific information as
          outlined below:
        </p>
        <ul className="pp-list">
          <li>
            <strong>Personal Information:</strong> This includes your full name, email address, contact
            number, and location details you provide when registering for webinars, courses, or other events.
          </li>
          <li>
            <strong>Financial Information:</strong> You may share income ranges or financial interests, which
            help us personalize our content. MoneyMati does not collect sensitive financial data such as bank
            details.
          </li>
          <li>
            <strong>Usage and Device Data:</strong> Information about your interactions with our services, such
            as pages visited, browser type, device data, and the actions you take while using our platform.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> We use cookies to enhance your experience,
            improve website performance, and analyze engagement with our websites and content.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    number: "02",
    title: "How We Use Information",
    content: (
      <>
        <p className="pp-body">MoneyMati uses the information we collect for the following purposes:</p>
        <ul className="pp-list">
          <li>
            <strong>To Provide Services:</strong> We use your information to deliver, maintain, personalize
            our educational, and business support.
          </li>
          <li>
            <strong>For Communication:</strong> To send you updates, event reminders, promotional offers, and
            financial insights tailored to your interests.
          </li>
          <li>
            <strong>To Improve Our Offerings:</strong> We use collected data to add to our webinars, services,
            and website, to actively improve our releases.
          </li>
          <li>
            <strong>Legal Compliance:</strong> To comply with legal obligations and protect MoneyMati&apos;s
            rights and the interests of our users.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing-your-information",
    number: "03",
    title: "Sharing Your Information",
    content: (
      <>
        <p className="pp-body">
          MoneyMati respects your privacy and does not sell your information. However, information may be
          shared in the following cases:
        </p>
        <ul className="pp-list">
          <li>
            <strong>Service Providers:</strong> We may share information with trusted service providers who
            assist us in hosting webinars, processing payments, and delivering our services.
          </li>
          <li>
            <strong>Legal Compliance:</strong> We may disclose your information to comply with applicable laws,
            regulations, or court orders, or to protect MoneyMati&apos;s rights and the safety of our users.
          </li>
          <li>
            <strong>Business Transactions:</strong> In the event of a merger, acquisition, or business
            transfer, your information may be transferred to relevant parties as part of the transaction.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "protecting-your-information",
    number: "04",
    title: "Protecting Your Information",
    content: (
      <p className="pp-body">
        We implement industry-standard measures to safeguard your information from unauthorized access or
        disclosure. However, no data transmission over the internet can be guaranteed as completely secure;
        we encourage you to take steps to protect your data as well.
      </p>
    ),
  },
  {
    id: "your-choices-and-rights",
    number: "05",
    title: "Your Choices and Rights",
    content: (
      <ul className="pp-list">
        <li>
          <strong>Access and Update:</strong> You may access, update, or correct your personal information by
          contacting us directly.
        </li>
        <li>
          <strong>Opt-Out:</strong> You may opt out of receiving promotional emails at any time by following
          the unsubscribe instructions in the emails.
        </li>
        <li>
          <strong>Data Deletion:</strong> You can request the deletion of your information, subject to legal
          and contractual requirements.
        </li>
      </ul>
    ),
  },
  {
    id: "childrens-privacy",
    number: "06",
    title: "Children's Privacy",
    content: (
      <p className="pp-body">
        MoneyMati&apos;s services, including webinars and financial education content, are not intended for
        children under 13. We do not knowingly collect information from children under 13. If we become
        aware of such data, we will delete it promptly.
      </p>
    ),
  },
  {
    id: "changes-to-policy",
    number: "07",
    title: "Changes to This Privacy Policy",
    content: (
      <p className="pp-body">
        MoneyMati may update this Privacy Policy periodically. Any changes will be posted on this page, and
        if they are significant, we will notify you by email or through our website.
      </p>
    ),
  },
];

const tocItems = [
  { label: "Information We Collect", href: "#information-we-collect" },
  { label: "How We Use Information", href: "#how-we-use-information" },
  { label: "Sharing Your Information", href: "#sharing-your-information" },
  { label: "Protecting Your Information", href: "#protecting-your-information" },
  { label: "Your Choices and Rights", href: "#your-choices-and-rights" },
  { label: "Children's Privacy", href: "#childrens-privacy" },
  { label: "Changes to Policy", href: "#changes-to-policy" },
  { label: "Contact Us", href: "#contact" },
];

export default function PrivacyPolicy() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = ref.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(24px)";
      htmlEl.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
      requestAnimationFrame(() => {
        htmlEl.style.opacity = "1";
        htmlEl.style.transform = "translateY(0)";
      });
    });

    const sectionIds = tocItems.map((item) => item.href.replace("#", ""));
    const dropdown = document.getElementById("pp-priv-toc-dropdown") as HTMLSelectElement | null;

    // IntersectionObserver for accurate scroll spy (desktop TOC + mobile dropdown)
    const visibilityMap = new Map<string, boolean>();
    sectionIds.forEach((id) => visibilityMap.set(id, false));

    const updateActive = () => {
      const active = sectionIds.find((id) => visibilityMap.get(id)) ?? sectionIds[0];

      // Desktop TOC
      document.querySelectorAll<HTMLAnchorElement>(".pp-toc-list a").forEach((a) => {
        const href = a.getAttribute("href")?.replace("#", "");
        a.classList.toggle("active", href === active);
      });

      // Mobile dropdown
      if (dropdown && window.innerWidth <= 767) {
        dropdown.value = active;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap.set(entry.target.id, entry.isIntersecting);
        });
        updateActive();
      },
      { rootMargin: "-10% 0px -60% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Mobile dropdown → smooth scroll
    const handleDropdownChange = () => {
      if (!dropdown) return;
      const target = document.getElementById(dropdown.value);
      if (target) window.scrollTo({ top: target.offsetTop - 64, behavior: "smooth" });
    };
    dropdown?.addEventListener("change", handleDropdownChange);

    return () => {
      observer.disconnect();
      dropdown?.removeEventListener("change", handleDropdownChange);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${dancingScript.variable} ${playfairDisplay.variable} ${dmSans.variable}`}
      style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#f5f5f0" }}
    >
      <style>{`
        /* ── Hero ── */
        .pp-hero {
          position: relative;
          width: 100%;
          min-height: 435px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin-top: 0;
          padding: 128px 24px;
          overflow: hidden;
          background: linear-gradient(180deg, #102218 0%, #F6F8F7 100%);
          box-sizing: border-box;
        }
        .pp-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          opacity: 0.8;
          display: block;
        }
        .pp-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(16,34,24,0.55) 0%, rgba(246,248,247,0.10) 100%);
        }
        .pp-hero-content {
          position: relative;
          z-index: 10;
          max-width: 600px;
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
          color: rgba(255,255,255,0.85);
          line-height: 1.7;
          max-width: 460px;
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
        .pp-toc-list li {
          counter-increment: toc;
        }
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
        .pp-toc-list a.active {
          color: #1a7a4a;
          font-weight: 700;
        }
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
        .pp-notice strong { color: #122B1F; }

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
          background: #122B1F;
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

        /* ── Mobile sticky dropdown TOC (hidden on desktop) ── */
        .pp-toc-mobile { display: none; }

        /* ══════════════════════════════════════
           MOBILE-ONLY  (max-width: 767px)
        ══════════════════════════════════════ */
        @media (max-width: 767px) {

          /* Hero */
          .pp-hero {
            min-height: 260px !important;
            padding: 72px 20px 52px !important;
          }
          .pp-hero-title {
            font-size: 1.7rem !important;
            margin-bottom: 10px !important;
          }
          .pp-hero-sub { font-size: 0.84rem !important; }

          /* Layout — stack vertically */
          .pp-layout {
            flex-direction: column !important;
            gap: 0 !important;
            padding: 16px 14px 48px !important;
            margin-top: -24px !important;
          }

          /* Hide desktop TOC */
          .pp-toc-wrap { display: none !important; }

          /* ── Sticky dropdown TOC ── */
          .pp-toc-mobile {
            display: block;
            position: sticky;
            top: 0;
            z-index: 999;
            background: #f5f5f0;
            box-shadow: 0 1px 10px rgba(0,0,0,0.09);
            padding: 10px 14px;
          }
          .pp-toc-mobile-inner {
            position: relative;
            width: 100%;
          }
          .pp-toc-mobile-inner::after {
            content: '';
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            width: 0; height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 6px solid #1a7a4a;
            pointer-events: none;
          }
          #pp-priv-toc-dropdown {
            width: 100%;
            appearance: none;
            -webkit-appearance: none;
            background: #ffffff;
            border: 1.5px solid #1a7a4a;
            border-radius: 9999px;
            padding: 9px 40px 9px 18px;
            font-size: 0.82rem;
            font-weight: 600;
            color: #1a7a4a;
            cursor: pointer;
            outline: none;
            font-family: inherit;
          }

          /* Card */
          .pp-card {
            border-radius: 14px !important;
          }

          /* Date badge */
          .pp-date-badge-wrap { padding: 16px 16px 0 !important; }

          /* Notice */
          .pp-notice {
            padding: 14px 16px 18px !important;
            font-size: 0.81rem !important;
          }

          /* Sections */
          .pp-section { padding: 20px 16px !important; }
          .pp-section-title { font-size: 1.05rem !important; }
          .pp-body { font-size: 0.83rem !important; line-height: 1.72 !important; }
          .pp-list li { font-size: 0.83rem !important; }

          /* Contact */
          .pp-contact {
            margin: 14px 14px 0 !important;
            padding: 22px 18px !important;
            border-radius: 12px !important;
          }
          .pp-contact-title { font-size: 1.1rem !important; }
          .pp-contact-sub { font-size: 0.79rem !important; margin-bottom: 16px !important; }
          .pp-contact-grid { flex-direction: column !important; gap: 16px !important; }
          .pp-contact-item-val { font-size: 0.84rem !important; }

          /* Footer note */
          .pp-footer-note { padding: 14px 16px 18px !important; font-size: 0.7rem !important; }
        }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section className="pp-hero">
        <img src="/Header.svg" alt="" className="pp-hero-bg" />
        <div className="pp-hero-overlay" />
        <div className="pp-hero-content" data-animate>
          <h1 className="pp-hero-title">Privacy Policy</h1>
          <p className="pp-hero-sub">
            Your privacy matters to us. At MoneyMati, we are committed to being
            the sovereign architect of your data security and personal trust.
          </p>
        </div>
      </section>

      {/* ── MOBILE STICKY DROPDOWN (mobile only) ── */}
      <div className="pp-toc-mobile">
        <div className="pp-toc-mobile-inner">
          <select id="pp-priv-toc-dropdown" defaultValue="information-we-collect">
            {tocItems.map((item, i) => (
              <option key={item.href} value={item.href.replace("#", "")}>
                {String(i + 1).padStart(2, "0")}. {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="pp-layout">

        {/* TOC (desktop only) */}
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
              This Privacy Policy of MoneyMati, filed under the registered proprietorship
              MoneyMati, aims to clarify MoneyMati&apos;s approach to protecting your privacy as
              you engage with our webinars, financial education content, and related services.
              By using our services, you agree to the practices described below.
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

            <div id="contact">
              <div className="pp-contact">
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
            </div>

            <p className="pp-footer-note" data-animate>
              This Privacy Policy secures MoneyMati&apos;s commitment to privacy and data protection. For full compliance, consult with legal
              professionals to meet applicable regulations.
            </p>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}