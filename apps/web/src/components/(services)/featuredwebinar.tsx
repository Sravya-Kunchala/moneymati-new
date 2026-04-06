"use client";

import Image from "next/image";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import PersonalizeModal from "@/components/confrimation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const STORAGE_KEY = "personalize_submitted";

type Webinar = {
  tag: string;
  image: string;
  imageFallbackBg: string;
  imageFallbackText: string;
  date: string;
  time: string;
  title: string;
  description: string;
  avatar: string;
  speaker: string;
  role: string;
  href?: string;
};

const webinars: Webinar[] = [
  {
    tag: "LIVE WORKSHOP",
    image: "/s1.svg",
    imageFallbackBg: "#111827",
    imageFallbackText: "MASTERING\nYOUR\nPORTFOLIO",
    date: "APR 24, 2026",
    time: "6:00 PM IST",
    title: "Mastering Your Portfolio",
    description:
      "Expert strategies for diversifying assets and optimizing long-term returns in a volatile market.",
    avatar: "/o1.svg",
    speaker: "Sarah",
    role: "CFA, SENIOR WEALTH ADVISOR",
    href: "#",
  },
  {
    tag: "INTERACTIVE WEBINAR",
    image: "/s2.svg",
    imageFallbackBg: "#1e3a5f",
    imageFallbackText: "",
    date: "MAY 05, 2026",
    time: "7:30 PM IST",
    title: "Financial Independence for Women",
    description:
      "Navigating unique financial challenges and building a roadmap to early retirement and freedom.",
    avatar: "/o2.svg",
    speaker: "Sarah",
    role: "RETIREMENT STRATEGIST",
    href: "#",
  },
  {
    tag: "EXPERT SESSION",
    image: "/s3.svg",
    imageFallbackBg: "#0f1a12",
    imageFallbackText: "TAX\nOPTIMIZATION",
    date: "JUN 18, 2026",
    time: "5:00 PM IST",
    title: "Tax Optimization 101",
    description:
      "Learn how to legally minimize your tax liability and keep more of your hard-earned wealth.",
    avatar: "/o3.svg",
    speaker: "Sarah",
    role: "TAX SPECIALIST & CPA",
    href: "#",
  },
];

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function UpcomingWebinars() {
  const fontFamily = dmSans.style?.fontFamily ?? "var(--font-dm-sans), sans-serif";
  const serifFamily = playfair.style?.fontFamily ?? "var(--font-playfair), serif";
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingLink, setPendingLink] = useState<string | undefined>(undefined);
  const [links, setLinks] = useState<Webinar[]>(webinars);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/webinars");
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        const items = Array.isArray(data?.items) ? data.items : [];
        const mapped: Webinar[] = items.map((w: any, idx: number) => ({
          tag: (w.status ?? "WEBINAR").toString().toUpperCase(),
          image: "/s1.svg",
          imageFallbackBg: "#1e293b",
          imageFallbackText: "",
          date: new Date(w.scheduledAt ?? w.createdAt ?? Date.now()).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          time: new Date(w.scheduledAt ?? Date.now()).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
          title: w.title ?? `Webinar ${idx + 1}`,
          description: w.description ?? "Join us for an expert-led finance session.",
          avatar: "/o1.svg",
          speaker: w.host ?? "MoneyMati Expert",
          role: "GUEST SPEAKER",
          href: w.link ?? "#",
        }));
        // Ensure exactly 3 items: prefer API, then pad with defaults, then trim extras.
        const padded = [...mapped];
        for (const seed of webinars) {
          if (padded.length >= 3) break;
          padded.push(seed);
        }
        setLinks(padded.slice(0, 3));
      } catch (err) {
        console.error("featured webinars load error", err);
        if (!cancelled) setLinks(webinars);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section
      id="featured-webinars"
      className={`${playfair.variable} ${dmSans.variable}`}
      style={{ backgroundColor: "#f5f3ee", padding: "72px 24px", fontFamily }}
    >
      <style>{`
        .uw-wrap { max-width: 1100px; margin: 0 auto; }

        .uw-header { text-align: center; margin-bottom: 48px; }

        .uw-title {
          font-family: '${serifFamily}', Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 800;
          color: #111;
          margin: 0 0 12px;
        }

        .uw-subtitle {
          font-family: '${fontFamily}', sans-serif;
          font-size: 0.95rem;
          color: #555;
          line-height: 1.65;
          max-width: 520px;
          margin: 0 auto 20px;
        }

        .uw-divider {
          width: 48px; height: 3px;
          background: #22c55e;
          border-radius: 2px;
          margin: 0 auto;
        }

        .uw-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 700px) { .uw-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1000px) { .uw-grid { grid-template-columns: repeat(3, 1fr); } }

        .uw-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .uw-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.13);
        }

        .uw-thumb {
          position: relative;
          height: 195px;
          overflow: hidden;
        }

        .uw-thumb-fallback-text {
          font-family: '${serifFamily}', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 900;
          color: #fff;
          text-align: center;
          line-height: 1.15;
          white-space: pre-line;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          text-shadow: 0 2px 12px rgba(0,0,0,0.5);
        }

        .uw-tag {
          position: absolute;
          top: 12px; left: 12px;
          background: #22c55e;
          color: #fff;
          font-family: '${fontFamily}', sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
          z-index: 2;
        }

        .uw-body {
          padding: 18px 18px 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 9px;
        }

        .uw-date-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: '${fontFamily}', sans-serif;
          font-size: 0.76rem;
          color: #444;
          font-weight: 500;
        }

        .uw-card-title {
          font-family: '${serifFamily}', Georgia, serif;
          font-size: 1.1rem;
          font-weight: 800;
          color: #111;
          margin: 0;
          line-height: 1.3;
        }

        .uw-card-desc {
          font-family: '${fontFamily}', sans-serif;
          font-size: 0.83rem;
          color: #666;
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }

        .uw-speaker {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
        }
        .uw-avatar-wrap {
          width: 36px; height: 36px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          background: #d1d5db;
          position: relative;
        }
        .uw-speaker-name {
          font-family: '${fontFamily}', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #111;
          margin: 0;
          line-height: 1.2;
        }
        .uw-speaker-role {
          font-family: '${fontFamily}', sans-serif;
          font-size: 0.66rem;
          color: #888;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin: 0;
        }

        .uw-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #22c55e;
          color: #fff;
          font-family: '${fontFamily}', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          padding: 13px 20px;
          border-radius: 10px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          margin-top: 6px;
        }
        .uw-btn:hover { background: #16a34a; transform: scale(0.98); }
      `}</style>

      <div className="uw-wrap">
        {/* Header */}
        <div className="uw-header">
          <h2 className="uw-title">Upcoming Webinars</h2>
          <p className="uw-subtitle">
            Join our live sessions led by industry experts to deepen your financial knowledge and
            connect with the community.
          </p>
          <div className="uw-divider" />
        </div>

        {/* Cards */}
        <div className="uw-grid">
          {links.map((w, i) => (
            <div className="uw-card" key={i}>

              {/* Thumbnail */}
              <div className="uw-thumb" style={{ background: w.imageFallbackBg }}>
                <Image
                  src={w.image}
                  alt={w.title}
                  fill
                  style={{ objectFit: "cover", zIndex: 1 }}
                />
                {w.imageFallbackText && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 0 }}>
                    <span className="uw-thumb-fallback-text">{w.imageFallbackText}</span>
                  </div>
                )}
                <span className="uw-tag">{w.tag}</span>
              </div>

              {/* Body */}
              <div className="uw-body">
                <div className="uw-date-row">
                  <CalendarIcon />
                  <span>{w.date} &bull; {w.time}</span>
                </div>

                <h3 className="uw-card-title">{w.title}</h3>
                <p className="uw-card-desc">{w.description}</p>

                <div className="uw-speaker">
                  <div className="uw-avatar-wrap">
                    <Image src={w.avatar} alt={w.speaker} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div>
                    <p className="uw-speaker-name">{w.speaker}</p>
                    <p className="uw-speaker-role">{w.role}</p>
                  </div>
                </div>

                <button
                  className="uw-btn"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) === "1") {
                      if (w.href) window.open(w.href, "_blank", "noopener,noreferrer");
                      return;
                    }
                    setPendingLink(w.href);
                    setShowConfirm(true);
                  }}
                >
                  Register Now <ArrowIcon />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
      {showConfirm && (
        <PersonalizeModal
          onClose={() => {
            setShowConfirm(false);
            if (pendingLink && typeof window !== "undefined") {
              const done = window.localStorage.getItem(STORAGE_KEY) === "1";
              if (done) {
                window.open(pendingLink, "_blank", "noopener,noreferrer");
                setPendingLink(undefined);
              }
            }
          }}
          onSuccess={() => {
            if (pendingLink) {
              window.open(pendingLink, "_blank", "noopener,noreferrer");
              setPendingLink(undefined);
            }
            setShowConfirm(false);
          }}
        />
      )}
    </section>
  );
}
