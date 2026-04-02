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
    id: "no-refunds",
    number: "01",
    title: "No Refunds",
    content: (
      <p className="rp-body">
        All sales are final. MoneyMati does not offer refunds or credits for any payments made for
        webinars, courses, or other digital educational services. Once access is granted to our
        content or events, refunds will not be provided under any circumstances.
      </p>
    ),
  },
  {
    id: "event-cancellations",
    number: "02",
    title: "Event Cancellations by MoneyMati",
    content: (
      <p className="rp-body">
        In the unlikely event that MoneyMati cancels a webinar or course, we will notify participants
        and offer a rescheduled date. If rescheduling is not possible, MoneyMati will provide a full
        refund to all registered participants.
      </p>
    ),
  },
];

const tocItems = [
  { label: "No Refunds", href: "#no-refunds" },
  { label: "Event Cancellations", href: "#event-cancellations" },
  { label: "Contact Us", href: "#contact" },
];

export default function RefundPolicy() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animations
    const elements = ref.current?.querySelectorAll<HTMLElement>("[data-animate]");
    elements?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(22px)";
      el.style.transition = `opacity 0.6s ease ${i * 0.09}s, transform 0.6s ease ${i * 0.09}s`;
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });

    const sectionIds = tocItems.map((item) => item.href.replace("#", ""));
    const dropdown = document.getElementById("rp-toc-dropdown") as HTMLSelectElement | null;

    // IntersectionObserver for accurate scroll spy (desktop TOC + mobile dropdown)
    const visibilityMap = new Map<string, boolean>();
    sectionIds.forEach((id) => visibilityMap.set(id, false));

    const updateActive = () => {
      const active = sectionIds.find((id) => visibilityMap.get(id)) ?? sectionIds[0];

      // Desktop TOC
      document.querySelectorAll<HTMLAnchorElement>(".rp-toc-list a").forEach((a) => {
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
      style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#f0f0eb" }}
    >
      <style>{`
        /* ── Hero ── */
        .rp-hero {
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
        .rp-hero-bg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center center;
          opacity: 0.8;
          display: block;
        }
        .rp-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(16,34,24,0.55) 0%, rgba(246,248,247,0.10) 100%);
        }
        .rp-hero-content {
          position: relative;
          z-index: 10;
          max-width: 580px;
        }
        .rp-hero-title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 14px;
          line-height: 1.12;
        }
        .rp-hero-sub {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.85);
          line-height: 1.72;
          max-width: 440px;
          margin: 0 auto;
        }

        /* ── Layout ── */
        .rp-layout {
          max-width: 1000px;
          margin: -44px auto 0;
          padding: 0 24px 80px;
          display: flex;
          gap: 40px;
          align-items: stretch;
          position: relative;
          z-index: 10;
        }

        /* ── Desktop TOC ── */
        .rp-toc-wrap {
          width: 180px;
          flex-shrink: 0;
          align-self: flex-start;
          position: sticky;
          top: 84px;
          padding-top: 60px;
        }
        .rp-toc-label {
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 14px;
          display: block;
        }
        .rp-toc-list {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .rp-toc-list a {
          font-size: 0.82rem;
          color: #888;
          text-decoration: none;
          padding: 4px 0;
          display: block;
          transition: color 0.2s;
          line-height: 1.4;
        }
        .rp-toc-list a:hover { color: #1a7a4a; }
        .rp-toc-list a.active { color: #1a7a4a; font-weight: 600; }

        /* ── Main ── */
        .rp-main { flex: 1; min-width: 0; }

        .rp-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 6px 32px rgba(18,43,31,0.09);
        }

        .rp-date-badge-wrap { padding: 24px 28px 0; }
        .rp-date-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #1a7a4a;
          border: 1.5px solid rgba(26,122,74,0.3);
          border-radius: 9999px;
          padding: 4px 14px;
          background: rgba(26,122,74,0.06);
        }
        .rp-notice {
          padding: 20px 28px 24px;
          font-size: 0.875rem;
          color: #444;
          line-height: 1.78;
          border-bottom: 1px solid #ebebeb;
        }
        .rp-section {
          padding: 30px 28px;
          border-bottom: 1px solid #ebebeb;
        }
        .rp-section:last-of-type { border-bottom: none; }
        .rp-section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }
        .rp-icon {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #1a7a4a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 0.7rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
          font-family: var(--font-dm-sans), sans-serif;
        }
        .rp-section-title {
          font-family: var(--font-playfair), serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #111;
        }
        .rp-body {
          font-size: 0.875rem;
          color: #444;
          line-height: 1.82;
          margin: 0;
        }

        /* ── Contact ── */
        .rp-contact-wrap { padding: 0 20px 20px; }
        .rp-contact {
          background: #122B1F;
          padding: 32px 28px;
          color: #fff;
          border-radius: 14px;
        }
        .rp-contact-title {
          font-family: var(--font-playfair), serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }
        .rp-contact-sub {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.6);
          margin-bottom: 20px;
          line-height: 1.65;
        }
        .rp-contact-grid { display: flex; flex-wrap: wrap; gap: 32px; }
        .rp-contact-item { display: flex; flex-direction: column; gap: 3px; }
        .rp-contact-item-label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: #4ade80;
          margin-bottom: 2px;
        }
        .rp-contact-item-label svg {
          width: 11px; height: 11px;
          stroke: #4ade80; fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .rp-contact-item-val { font-size: 0.88rem; color: rgba(255,255,255,0.9); font-weight: 500; }
        .rp-contact-item-val a { color: rgba(255,255,255,0.9); text-decoration: none; }
        .rp-contact-item-val a:hover { text-decoration: underline; }

        .rp-footer-note {
          text-align: center;
          font-size: 0.72rem;
          color: #aaa;
          padding: 18px 28px 22px;
          line-height: 1.6;
          border-top: 1px solid #ebebeb;
          margin: 0;
        }

        /* ── Mobile dropdown (hidden on desktop) ── */
        .rp-toc-mobile { display: none; }

        /* ══════════════════════════════════════
           MOBILE-ONLY  (max-width: 767px)
        ══════════════════════════════════════ */
        @media (max-width: 767px) {

          /* Hero */
          .rp-hero {
            min-height: 260px !important;
            padding: 72px 20px 52px !important;
          }
          .rp-hero-title {
            font-size: 1.7rem !important;
            margin-bottom: 10px !important;
          }
          .rp-hero-sub { font-size: 0.84rem !important; }

          /* Layout — stack vertically */
          .rp-layout {
            flex-direction: column !important;
            gap: 0 !important;
            padding: 16px 14px 48px !important;
            margin-top: -24px !important;
          }

          /* Hide desktop TOC */
          .rp-toc-wrap { display: none !important; }

          /* ── Sticky dropdown TOC ── */
          .rp-toc-mobile {
            display: block;
            position: sticky;
            top: 0;
            z-index: 999;
            background: #f0f0eb;
            box-shadow: 0 1px 10px rgba(0,0,0,0.09);
            padding: 10px 14px;
          }
          .rp-toc-mobile-inner {
            position: relative;
            width: 100%;
          }
          .rp-toc-mobile-inner::after {
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
          #rp-toc-dropdown {
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
          .rp-card {
            border-radius: 14px !important;
          }

          /* Date badge */
          .rp-date-badge-wrap { padding: 16px 16px 0 !important; }

          /* Notice */
          .rp-notice {
            padding: 14px 16px 18px !important;
            font-size: 0.81rem !important;
          }

          /* Sections */
          .rp-section { padding: 20px 16px !important; }
          .rp-section-title { font-size: 1.05rem !important; }
          .rp-body { font-size: 0.83rem !important; line-height: 1.72 !important; }

          /* Contact */
          .rp-contact-wrap { padding: 0 14px 16px !important; }
          .rp-contact {
            padding: 22px 18px !important;
            border-radius: 12px !important;
          }
          .rp-contact-title { font-size: 1.1rem !important; }
          .rp-contact-sub { font-size: 0.79rem !important; margin-bottom: 16px !important; }
          .rp-contact-grid { flex-direction: column !important; gap: 16px !important; }
          .rp-contact-item-val { font-size: 0.84rem !important; }

          /* Footer note */
          .rp-footer-note { padding: 14px 16px 18px !important; font-size: 0.7rem !important; }
        }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section className="rp-hero">
        <img src="/Header.svg" alt="" className="rp-hero-bg" />
        <div className="rp-hero-overlay" />
        <div className="rp-hero-content" data-animate>
          <h1 className="rp-hero-title">Return &amp; Refund Policy</h1>
          <p className="rp-hero-sub">
            Transparency in our commitment to your satisfaction and financial education.
          </p>
        </div>
      </section>

      {/* ── MOBILE STICKY DROPDOWN (mobile only) ── */}
      <div className="rp-toc-mobile">
        <div className="rp-toc-mobile-inner">
          <select id="rp-toc-dropdown" defaultValue="no-refunds">
            {tocItems.map((item, i) => (
              <option key={item.href} value={item.href.replace("#", "")}>
                {String(i + 1).padStart(2, "0")}. {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="rp-layout">

        {/* Desktop TOC */}
        <aside className="rp-toc-wrap">
          <span className="rp-toc-label">On This Page</span>
          <ol className="rp-toc-list">
            {tocItems.map((item, i) => (
              <li key={item.href}>
                <a href={item.href}>{i + 1}. {item.label}</a>
              </li>
            ))}
          </ol>
        </aside>

        {/* Main */}
        <main className="rp-main">
          <div className="rp-card" data-animate>

            <div className="rp-date-badge-wrap">
              <span className="rp-date-badge">Effective Date: 08-11-2024</span>
            </div>

            <div className="rp-notice">
              MoneyMati operates under the registered proprietorship MoneyMati. By purchasing our
              services, including webinars, courses, and other financial education offerings, you
              acknowledge and agree to the terms outlined in this Refund Policy.
            </div>

            {sections.map((sec) => (
              <div key={sec.id} id={sec.id} className="rp-section" data-animate>
                <div className="rp-section-header">
                  <div className="rp-icon">{sec.number}</div>
                  <h2 className="rp-section-title">{sec.title}</h2>
                </div>
                {sec.content}
              </div>
            ))}

            <div id="contact" data-animate>
              <div className="rp-contact-wrap">
                <div className="rp-contact">
                  <div className="rp-contact-title">Contact Us</div>
                  <p className="rp-contact-sub">
                    If you have questions, concerns, or requests regarding this Refund Policy,
                    please contact us at:
                  </p>
                  <div className="rp-contact-grid">
                    <div className="rp-contact-item">
                      <span className="rp-contact-item-label">
                        <svg viewBox="0 0 24 24">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m2 7 10 7 10-7" />
                        </svg>
                        Email
                      </span>
                      <span className="rp-contact-item-val">
                        <a href="mailto:support@moneymati.com">support@moneymati.com</a>
                      </span>
                    </div>
                    <div className="rp-contact-item">
                      <span className="rp-contact-item-label">
                        <svg viewBox="0 0 24 24">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        Phone
                      </span>
                      <span className="rp-contact-item-val">+91 7075529006</span>
                    </div>
                    <div className="rp-contact-item">
                      <span className="rp-contact-item-label">
                        <svg viewBox="0 0 24 24">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        Address
                      </span>
                      <span className="rp-contact-item-val">Hyderabad, Telangana– 500009</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="rp-footer-note">
              This Refund Policy ensures MoneyMati&apos;s commitment to transparency and quality financial education.
            </p>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}