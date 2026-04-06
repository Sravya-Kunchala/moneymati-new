"use client";

import { useMemo, useState } from "react";

type InstaPost = {
  id: string;
  image: string;
  caption: string;
  permalink?: string;
  timestamp?: string;
  username?: string;
};

const FALLBACK_POSTS: InstaPost[] = [
  {
    id: "fallback-1",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&q=80&auto=format&fit=crop",
    caption: "See the latest from @moneymati2022 on Instagram.",
    permalink: "https://www.instagram.com/moneymati2022/",
    username: "moneymati2022",
  },
  {
    id: "fallback-2",
    image: "https://images.unsplash.com/photo-1508387024700-9fe5c0b38f91?w=900&q=80&auto=format&fit=crop",
    caption: "Follow our journey empowering wealth creation for women.",
    permalink: "https://www.instagram.com/moneymati2022/",
    username: "moneymati2022",
  },
  {
    id: "fallback-3",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900&q=80&auto=format&fit=crop",
    caption: "Workshops, events, and community wins - live on Instagram.",
    permalink: "https://www.instagram.com/moneymati2022/",
    username: "moneymati2022",
  },
  {
    id: "fallback-4",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&q=80&auto=format&fit=crop",
    caption: "Tap to view the real-time feed once Instagram is connected.",
    permalink: "https://www.instagram.com/moneymati2022/",
    username: "moneymati2022",
  },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/moneymati/",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/moneymati2022/",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/MoneymatiOfficial/",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/imoneymati",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const formatDate = (timestamp?: string) => {
  if (!timestamp) return "Instagram";
  const d = new Date(timestamp);
  if (Number.isNaN(d.getTime())) return "Instagram";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

function SkeletonCard() {
  return (
    <div
      style={{
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        background: "#fff",
        height: "100%",
      }}
    >
      <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#e2e8f0" }} />
        <div style={{ width: "50%", height: 10, borderRadius: 6, background: "#e2e8f0" }} />
      </div>
      <div style={{ width: "100%", aspectRatio: "4/3", background: "#f1f5f9" }} />
      <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ height: 10, background: "#e2e8f0", borderRadius: 6, width: "90%" }} />
        <div style={{ height: 10, background: "#e2e8f0", borderRadius: 6, width: "70%" }} />
      </div>
    </div>
  );
}

export default function FinancialCommunity() {
  // Instagram API removed; show static preview posts only.
  const [posts] = useState<InstaPost[]>(FALLBACK_POSTS);
  const [hovered, setHovered] = useState<string | null>(null);
  const [error] = useState<string | null>(null);
  const loading = false;

  const displayedPosts = useMemo(() => posts, [posts]);
  const isFallback = true;

  return (
    <section
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#ffffff",
        width: "100%",
        padding: "56px 0 48px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "28px", padding: "0 16px" }}>
        <h2
          style={{
            fontSize: "clamp(1.9rem, 4vw, 2.7rem)",
            fontWeight: 800,
            color: "#0f172a",
            margin: "0 0 10px",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Join Our Financial Community
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#64748b",
            maxWidth: "520px",
            margin: "0 auto 18px",
            lineHeight: 1.6,
          }}
        >
          Live posts pulled from{" "}
          <a href="https://www.instagram.com/moneymati2022/" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 700 }}>
            @moneymati2022
          </a>{" "}
          - refreshed every few minutes.
        </p>
        {error && posts.length === 0 && (
          <div style={{ color: "#ef4444", fontSize: "0.9rem", marginBottom: "8px" }}>
            {error} Showing a preview grid instead.
          </div>
        )}

        <div style={{ display: "flex", gap: "18px", justifyContent: "center" }}>
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.href}
              title={s.name}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                color: "#1e293b",
                background: "#f8fafc",
                transition: "transform 0.2s, box-shadow 0.2s",
                textDecoration: "none",
                boxShadow: "0 0 0 1px #e2e8f0 inset",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              }}
            >
              {s.svg}
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          padding: "0 32px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={`skeleton-${idx}`} />)
          : displayedPosts.map((post) => (
              <div
                key={post.id}
                onMouseEnter={() => setHovered(post.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: hovered === post.id ? "0 6px 24px rgba(15,23,42,0.10)" : "none",
                  transform: hovered === post.id ? "translateY(-3px)" : "translateY(0)",
                  transition: "box-shadow 0.22s, transform 0.22s",
                  cursor: "pointer",
                  position: "relative",
                  minHeight: 320,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #f59e0b 0%, #92400e 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#fff",
                        flexShrink: 0,
                        border: "2px solid #fef3c7",
                      }}
                    >
                      M
                    </div>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e293b" }}>
                      @{post.username ?? "moneymati2022"}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#94a3b8" }}>
                    {formatDate(post.timestamp)}
                  </span>
                </div>

                <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                  <img
                    src={post.image}
                    alt={post.caption}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transform: hovered === post.id ? "scale(1.03)" : "scale(1)",
                      transition: "transform 0.4s ease",
                    }}
                    loading="lazy"
                  />
                  {post.permalink && (
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: hovered === post.id ? "rgba(0,0,0,0.35)" : "transparent",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: hovered === post.id ? 1 : 0,
                        transition: "opacity 0.2s ease, background 0.2s ease",
                        textDecoration: "none",
                        fontWeight: 700,
                        letterSpacing: "0.02em",
                      }}
                      aria-label="View on Instagram"
                    >
                      View on Instagram
                    </a>
                  )}
                </div>

                <div style={{ padding: "12px 14px 14px" }}>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#334155",
                      lineHeight: 1.55,
                      margin: "0 0 10px",
                      minHeight: "52px",
                    }}
                  >
                    {post.caption?.trim().length ? post.caption : "Tap to view this post on Instagram."}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "10px",
                      borderTop: "1px solid #f1f5f9",
                    }}
                  >
                    <span style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 600 }}>
                      {isFallback ? "Preview" : "Live"}
                    </span>
                    {post.permalink && (
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "#0ea5e9",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        Open
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M8 7h9v9" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
