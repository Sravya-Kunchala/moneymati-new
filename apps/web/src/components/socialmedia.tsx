"use client";

import { useEffect, useMemo, useState } from "react";
import { SOCIAL_POSTS } from "@/data/socialPosts";

type SocialPost = {
  id: string;
  image: string;
  caption: string;
  permalink?: string;
  timestamp?: string;
  username?: string;
  source?: string;
};

const PLATFORM_POSTS: SocialPost[] = SOCIAL_POSTS;

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
    href: "https://www.instagram.com/moneymatiofficial/",
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
];

const formatDate = (timestamp?: string) => {
  if (!timestamp) return "Today";
  const d = new Date(timestamp);
  if (Number.isNaN(d.getTime())) return "Today";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const proxySrc = (url: string | undefined) => {
  if (!url) return "";
  if (url.startsWith("/")) return url;
  return `/api/social/proxy?url=${encodeURIComponent(url)}`;
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
  // Show one post per platform using footer links; replaced by API when available.
  const [posts, setPosts] = useState<SocialPost[]>(PLATFORM_POSTS);
  const [hovered, setHovered] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/social/latest");
        if (!res.ok) throw new Error("Failed to load feed");
        const data = await res.json();
        if (cancelled) return;

        const items = Array.isArray(data?.items) ? data.items : [];
        if (items.length) {
          setPosts(items as SocialPost[]);
          setIsFallback(data?.source !== "live");
          setError(null);
        } else {
          setPosts(PLATFORM_POSTS);
          setIsFallback(true);
          setError("No posts returned; showing preview tiles.");
        }
      } catch (err) {
        if (cancelled) return;
        setPosts(PLATFORM_POSTS);
        setIsFallback(true);
        setError("Could not load live social posts; showing preview tiles.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    const poll = setInterval(load, 5 * 60 * 1000); // refresh every 5 minutes
    return () => {
      cancelled = true;
      clearInterval(poll);
    };
  }, []);

  const displayedPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => {
        const ta = a.timestamp ? new Date(a.timestamp).getTime() : -Infinity;
        const tb = b.timestamp ? new Date(b.timestamp).getTime() : -Infinity;
        if (!Number.isNaN(ta) && !Number.isNaN(tb) && ta !== tb) return tb - ta;
        return 0;
      })
      .slice(0, 4);
  }, [posts]);

  const detectSourceFromLink = (url?: string) => {
    if (!url) return undefined;
    if (url.includes("instagram.com")) return "Instagram";
    if (url.includes("linkedin.com")) return "LinkedIn";
    if (url.includes("facebook.com") || url.includes("fb.com")) return "Facebook";
    return undefined;
  };

  const displayName = (post: SocialPost) => {
    if (post.source === "instagram") return "Instagram";
    if (post.source === "linkedin") return "LinkedIn";
    if (post.source === "facebook") return "Facebook";
    const byLink = detectSourceFromLink(post.permalink);
    if (byLink) return byLink;
    return post.username ?? "moneymatiofficial";
  };

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
          Recent updates from{" "}
          <a href="https://www.instagram.com/moneymatiofficial/" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 700 }}>
            @moneymatiofficial
          </a>{" "}
          and our social channels.
        </p>
        {error && (
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
        {loading && displayedPosts.length === 0
          ? Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={`skeleton-${idx}`} />)
          : displayedPosts.map((post) => (
              <div
                key={post.id}
                onMouseEnter={() => setHovered(post.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("a")) return;
                  if (post.permalink) window.open(post.permalink, "_blank", "noopener,noreferrer");
                }}
                style={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: hovered === post.id ? "0 6px 24px rgba(15,23,42,0.10)" : "none",
                  transform: hovered === post.id ? "translateY(-3px)" : "translateY(0)",
                  transition: "box-shadow 0.22s, transform 0.22s",
                  cursor: post.permalink ? "pointer" : "default",
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
                      @{displayName(post)}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#94a3b8" }}>
                    {formatDate(post.timestamp)}
                  </span>
                </div>

                <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                  <img
                    src={proxySrc(post.image)}
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
                    referrerPolicy="no-referrer"
                  />
                  {post.permalink && (
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
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
                      aria-label={`View on ${displayName(post)}`}
                    >
                      View on {displayName(post)}
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
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
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
                    {post.permalink ? (
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
                        onClick={(e) => e.stopPropagation()}
                      >
                        Open
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M8 7h9v9" />
                        </svg>
                      </a>
                    ) : (
                      <span style={{ fontSize: "0.82rem", color: "#cbd5e1", fontWeight: 700 }}>No Link</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
