"use client";

import { useState } from "react";

const ebooks = [
  {
    id: 1,
    title: "Navratri Financial Empowerment Flip Book",
    badge: "SPECIAL EDITION",
    badgeColor: "#e05a2b",
    file: "/FLIP-BOOK.pdf",
    filename: "FLIP-BOOK.pdf",
    image: "/navatri.svg",  // ← add this
  },
  {
    id: 2,
    title: "5 Investing Mistakes You Must Avoid",
    badge: "INVESTMENT",
    badgeColor: "#0d3d20",
    file: "/ebook1.pdf",
    filename: "ebook1.pdf",
    image: "/guide-investing-mistakes.svg",   // ← add this
  },
  {
    id: 3,
    title: "Top Government Saving Schemes",
    badge: "GOVERNMENT",
    badgeColor: "#0d3d20",
    file: "/ebook2.pdf",
    filename: "ebook2.pdf",
    image: "/piggybank.svg",   // ← add this
  },
];


export default function TopEbooks() {
  const [wishlisted, setWishlisted] = useState<number[]>([]);

  const toggleWishlist = (book: typeof ebooks[number]) => {
    setWishlisted((prev) => {
      const exists = prev.includes(book.id);
      const next = exists ? prev.filter((x) => x !== book.id) : [...prev, book.id];

      if (typeof window !== "undefined") {
        const storageKey = "savedResources";
        const current = (() => {
          try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); }
          catch { return []; }
        })();

        const cleaned = Array.isArray(current) ? current.filter((item) => item && typeof item.id === "number") : [];
        const updated = exists
          ? cleaned.filter((item) => item.id !== book.id)
          : [{ id: book.id, title: book.title, file: book.file, filename: book.filename, badge: book.badge, badgeColor: book.badgeColor }, ...cleaned.filter((item) => item.id !== book.id)];

        localStorage.setItem(storageKey, JSON.stringify(updated));
      }

      return next;
    });
  };

  const handleDownload = (file: string, filename: string) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section style={{ background: "#f5f0e8", padding: "48px 72px 56px", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .ebook-section-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; }
        .ebook-section-title { font-size: 28px; font-weight: 800; color: #0d1f0d; margin: 0 0 6px; letter-spacing: -0.5px; }
        .ebook-section-sub { font-size: 13.5px; color: #888; margin: 0; font-weight: 400; }
        .ebook-view-all { display: flex; align-items: center; gap: 6px; font-size: 13.5px; font-weight: 600; color: #11803a; text-decoration: none; white-space: nowrap; margin-top: 4px; transition: gap 0.2s ease; }
        .ebook-view-all:hover { gap: 10px; }
        .ebook-view-all svg { transition: transform 0.2s ease; }
        .ebook-view-all:hover svg { transform: translateX(3px); }

        .ebook-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

        .ebook-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          cursor: pointer;
        }
        .ebook-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.11);
        }

        .ebook-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .ebook-thumb img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .ebook-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #fff;
          z-index: 2;
        }

        .ebook-wishlist-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px;
          height: 32px;
          background: rgba(255,255,255,0.9);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2;
          transition: background 0.15s ease, transform 0.15s ease;
          backdrop-filter: blur(4px);
        }
        .ebook-wishlist-btn:hover { background: #fff; transform: scale(1.1); }
        .ebook-wishlist-btn.active svg path { fill: #e05a2b; stroke: #e05a2b; }

        .ebook-info { padding: 16px 18px 18px; }
        .ebook-title { font-size: 14.5px; font-weight: 700; color: #0d1f0d; margin: 0 0 12px; line-height: 1.45; }

        .ebook-download-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0;
          background: none;
          border: none;
          font-size: 13px;
          font-weight: 600;
          color: #11803a;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: gap 0.15s ease;
        }
        .ebook-download-btn:hover { gap: 9px; }
        .ebook-download-btn svg { flex-shrink: 0; }

        @media (max-width: 768px) {
          .ebook-grid { grid-template-columns: 1fr; gap: 16px; }
          section { padding: 32px 24px 40px !important; }
          .ebook-section-title { font-size: 22px !important; }
        }
        @media (min-width: 769px) and (max-width: 1023px) {
          .ebook-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* Header */}
      <div className="ebook-section-header">
        <div>
          <h2 className="ebook-section-title">Top Featuring Ebooks</h2>
          <p className="ebook-section-sub">Expert insights and strategic blueprints for the sophisticated investor.</p>
        </div>
        <a href="/e-book" className="ebook-view-all">
          View All
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#11803a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Grid */}
      <div className="ebook-grid">
        {ebooks.map((book) => (
          <div key={book.id} className="ebook-card">

            {/* Thumbnail */}
            <div className="ebook-thumb">
              {/*
                ── HOW TO ADD COVER IMAGES ──
                Place your cover images inside /public/ebooks/ and name them:
                  navatri.svg  (or .png / .webp)
                  ebook2.jpg
                  ebook3.jpg
                Then replace the grey placeholder div below with:
                  <img src={`/ebooks/ebook${book.id}.jpg`} alt={book.title} />
              */} 
              <img src={book.image} alt={book.title} />


              {/* Wishlist toggle */}
              <button
                className={`ebook-wishlist-btn${wishlisted.includes(book.id) ? " active" : ""}`}
                onClick={(e) => { e.stopPropagation(); toggleWishlist(book); }}
                aria-label="Add to wishlist"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z"
                    stroke="#555"
                    strokeWidth="1.8"
                    fill="none"
                  />
                </svg>
              </button>

              {/* Category badge */}
              <span className="ebook-badge" style={{ background: book.badgeColor }}>
                {book.badge}
              </span>
            </div>

            {/* Info + download */}
            <div className="ebook-info">
              <p className="ebook-title">{book.title}</p>
              <button
                className="ebook-download-btn"
                onClick={() => handleDownload(book.file, book.filename)}
              >
                Download PDF
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v8M5 7l3 3 3-3" stroke="#11803a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 13h10" stroke="#11803a" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
