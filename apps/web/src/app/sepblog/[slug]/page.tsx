"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

type BlogPayload = {
  id?: string;
  title?: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  image?: string;
  author?: string;
  publishedAt?: string;
  tags?: string[] | string;
};

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blog, setBlog] = useState<BlogPayload | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/blog?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data?.data) {
          setError("Not found");
          return;
        }
        setBlog(data.data);
      })
      .catch(() => setError("Unable to load blog"))
      .finally(() => setLoading(false));
  }, [slug]);

  const paragraphs = useMemo(() => {
    const body = blog?.content || blog?.excerpt;
    if (!body) return [];
    return body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  }, [blog]);

  const heroImage = blog?.coverImage || blog?.image || "/bg-image.svg";

  return (
    <>
      <Header />
      <main style={{ background: "#f5f3ee", minHeight: "80vh", padding: "24px 0 56px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 22px" }}>
          <button
            onClick={() => router.back()}
            style={{
              border: "none",
              background: "transparent",
              color: "#1f4b2e",
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: 14,
              fontSize: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
            aria-label="Go back"
          >
            <span style={{ fontSize: 16 }}>←</span> Back
          </button>

          {loading && (
            <div style={{ padding: "40px 0", color: "#334155", fontWeight: 600 }}>Loading blog...</div>
          )}
          {error && !loading && (
            <div style={{ padding: "40px 0", color: "#b91c1c", fontWeight: 700 }}>
              {error}. Try again later.
            </div>
          )}
          {!loading && !error && blog && (
            <article
              style={{
                background: "#ffffff",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 10px 32px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  padding: "28px 32px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  maxWidth: 760,
                  margin: "0 auto",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
                  <span
                    style={{
                      background: "rgba(17,212,98,0.14)",
                      color: "#0f5132",
                      padding: "6px 14px",
                      borderRadius: 9999,
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: 0.2,
                    }}
                  >
                    {Array.isArray(blog.tags)
                      ? blog.tags[0]
                      : typeof blog.tags === "string"
                        ? blog.tags.split(",")[0]
                        : "BLOG"}
                  </span>
                  {blog.publishedAt && (
                    <span style={{ color: "#475569", fontSize: 12, fontWeight: 600 }}>
                      {new Date(blog.publishedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                  {blog.author && (
                    <span style={{ color: "#0f172a", fontSize: 13, fontWeight: 700 }}>by {blog.author}</span>
                  )}
                </div>

                <h1
                  style={{
                    margin: 0,
                    fontSize: "32px",
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                  }}
                  >
                    {blog.title}
                  </h1>

                <div
                  style={{
                    height: 1,
                    background: "linear-gradient(90deg, rgba(226,232,240,0), rgba(226,232,240,1), rgba(226,232,240,0))",
                    margin: "6px 0 18px",
                  }}
                />
              </div>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 320,
                  background: "#e2e8f0",
                  overflow: "hidden",
                }}
              >
                <img
                  src={heroImage}
                  alt={blog.title || "Blog cover"}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              <div
                style={{
                  padding: "26px 32px 36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  maxWidth: 760,
                  margin: "0 auto",
                }}
              >
                {paragraphs.length === 0 && (
                  <p style={{ margin: 0, color: "#475569" }}>No content available for this post yet.</p>
                )}

                {paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    style={{
                      margin: "0 0 12px",
                      color: "#1e293b",
                      lineHeight: 1.75,
                      fontSize: 15,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
