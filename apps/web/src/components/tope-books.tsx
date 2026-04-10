"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BOOKS } from "@/app/lib/books";

type EbookCard = {
  id: number | string;
  title: string;
  badge: string;
  badgeColor: string;
  file: string;
  filename: string;
  image: string;
  featured?: boolean;
  status?: string;
};

const featuredIds = [5, 1, 2]; // Navratri, Investing Mistakes, Gov Schemes
const defaultEbooks: EbookCard[] = featuredIds
  .map((id) => BOOKS.find((b) => b.id === id))
  .filter(Boolean)
  .map((b) => ({
    id: b!.id,
    title: `${b!.title}${b!.subtitle ? " " + b!.subtitle : ""}`.trim(),
    badge: b!.category || "E-BOOK",
    badgeColor: b!.categoryColor || "#0d3d20",
    file: b!.pdf,
    filename: (b!.pdf || "").split("/").pop() || "ebook.pdf",
    image: b!.cardImage || b!.cover || "/placeholder.svg",
  }));


export default function TopEbooks() {
  const [wishlisted, setWishlisted] = useState<string[]>([]);
  const [ebooks, setEbooks] = useState<EbookCard[]>(defaultEbooks);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let storedFeaturedId: string | null = null;
        try { storedFeaturedId = localStorage.getItem("featuredEbookId"); } catch {}

        const res = await fetch("/api/admin/ebooks", { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];

        const resolveId = (item: any, idx: number) => {
          if (Number.isFinite(Number(item?.id))) return Number(item.id);
          const pdfMatch = (item?.href ?? "").match(/ebook(\d+)\.pdf/i);
          if (pdfMatch) return Number(pdfMatch[1]);
          const isNav = (item?.title ?? "").toLowerCase().includes("navratri") || (item?.href ?? "").toLowerCase().includes("flip-book");
          if (isNav) return 5;
          return item?.id ?? `temp-${idx}`;
        };

        const mapped: EbookCard[] = items
          .map((item: any, idx: number) => {
            const resolvedId = resolveId(item, idx + 1000);
            const isNav = String(resolvedId) === "5" ||
              (item?.title ?? "").toLowerCase().includes("navratri") ||
              (item?.href ?? "").toLowerCase().includes("flip-book");

            const fallbackImg =
              Number.isFinite(Number(resolvedId)) ? `/ebooks/ebook${resolvedId}.jpg` : "/placeholder.svg";

            return {
              id: resolvedId,
              title: item?.title || "E-Book",
              badge: item?.category || (isNav ? "INVESTING" : "E-BOOK"),
              badgeColor: item?.categoryColor || "#0d3d20",
              file: item?.href || `/ebooks/${resolvedId}.pdf`,
              filename: (item?.href || "").split("/").pop() || "ebook.pdf",
              image: item?.cardImage || item?.cover || item?.coverUrl || (isNav ? "/navatri.svg" : fallbackImg),
              featured: Boolean(item?.featured) || isNav,
              status: item?.status,
            };
          })
          .filter((b) => {
            if (!b.file) return false;
            // Allow featured cards through even if status is Draft
            if (b.featured) return true;
            return (b.status ?? "Published") !== "Draft";
          });

        const featuredPool: EbookCard[] = [];
        mapped.forEach((b) => { if (b.featured) featuredPool.push(b); });

        // If admin marked a featured ebook, keep it pinned even if backend ignores the flag.
        if (storedFeaturedId) {
          const manual = mapped.find((b) => String(b.id) === storedFeaturedId);
          if (manual && !featuredPool.some((f) => String(f.id) === String(manual.id))) {
            featuredPool.unshift({ ...manual, featured: true });
          }
        }

        // Always fill the grid with up to 3 cards: featured first, then the rest.
        const nonFeatured = mapped.filter((b) => !featuredPool.some((f) => String(f.id) === String(b.id)));
        const ordered = [...featuredPool, ...nonFeatured];

        // Ensure we always show three cards: top from API, then fill from defaults without dupes.
        const fillPool = [...ordered];
        if (fillPool.length < 3) {
          defaultEbooks.forEach((d) => {
            if (fillPool.length >= 3) return;
            const exists = fillPool.some((b) => String(b.id) === String(d.id));
            if (!exists) fillPool.push(d);
          });
        }

        const chosen = fillPool.slice(0, 3);
        if (!cancelled && chosen.length) setEbooks(chosen);
      } catch (err) {
        console.warn("TopEbooks: failed to load featured ebooks, using defaults", err);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const toggleWishlist = (book: EbookCard) => {
    const key = String(book.id);
    setWishlisted((prev) => {
      const exists = prev.includes(key);
      const next = exists ? prev.filter((x) => x !== key) : [...prev, key];

      if (typeof window !== "undefined") {
        const storageKey = "savedResources";
        const current = (() => {
          try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); }
          catch { return []; }
        })();

        const cleaned = Array.isArray(current) ? current.filter((item) => item && item.id) : [];
        const updated = exists
          ? cleaned.filter((item) => String(item.id) !== key)
          : [{ id: book.id, title: book.title, file: book.file, filename: book.filename, badge: book.badge, badgeColor: book.badgeColor }, ...cleaned.filter((item) => String(item.id) !== key)];

        localStorage.setItem(storageKey, JSON.stringify(updated));
      }

      return next;
    });
  };

  const openBook = (id: number | string) => {
    router.push(`/e-book/${encodeURIComponent(String(id))}`);
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
          <div
            key={book.id}
            className="ebook-card"
            onClick={() => openBook(book.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") openBook(book.id); }}
          >

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
                className={`ebook-wishlist-btn${wishlisted.includes(String(book.id)) ? " active" : ""}`}
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
                onClick={(e) => { e.stopPropagation(); openBook(book.id); }}
              >
                View E-Book
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#11803a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
