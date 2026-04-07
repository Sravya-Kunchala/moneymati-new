"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SideNav from "@/components/sidenav";
import TopNav from "@/components/topnav";
import { blogArticles } from "@/data/blogs";

type EditForm = {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  tags: string;
  published: boolean;
};

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const fallback = useMemo(
    () =>
      blogArticles.find((b) => String(b.id) === id || (b as any).slug === id) ?? {
        title: "Untitled post",
        content: "",
        excerpt: "",
        slug: id ?? "post",
        coverImage: "",
        tags: "",
        published: false,
      },
    [id]
  );

  const [form, setForm] = useState<EditForm>({
    title: fallback.title,
    content: (fallback as any).content ?? (fallback as any).excerpt ?? "",
    excerpt: fallback.excerpt ?? "",
    slug: fallback.slug ?? "",
    coverImage: (fallback as any).image ?? "",
    tags: Array.isArray((fallback as any).tags) ? (fallback as any).tags.join(", ") : "",
    published: Boolean((fallback as any).published),
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (res.ok) {
          const body = await res.json();
          const data = body?.data ?? {};
          setForm({
            title: data.title ?? "",
            content: data.content ?? data.excerpt ?? "",
            excerpt: data.excerpt ?? "",
            slug: data.slug ?? id,
            coverImage: data.coverImage ?? "",
            tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
            published: Boolean(data.published),
          });
        } else {
          setMessage("Using sample data; not connected to database.");
        }
      } catch (e) {
        setMessage("Using sample data; not connected to database.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const updateField = (key: keyof EditForm, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (publish: boolean) => {
    if (!form.title.trim() || !form.content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          excerpt: form.excerpt,
          coverImage: form.coverImage || null,
          slug: form.slug,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          published: publish,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body?.error || body?.warning || "Unable to save");
      }
      setMessage(body?.warning ?? "Changes saved");
      if (publish) {
        setMessage("Post published successfully");
      }
      // stay on page, or navigate back
    } catch (e: any) {
      setError(e?.message ?? "Unable to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", background: "#f4f6f4" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        .input { width: 100%; padding: 12px 14px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 13px; color: #1a3a22; outline: none; background: #fff; }
        .input:focus { border-color: #0e3d27; box-shadow: 0 0 0 2px rgba(14,61,39,0.08); }
        textarea.input { resize: vertical; min-height: 140px; }
        .label { font-size: 11px; font-weight: 700; letter-spacing: 0.05em; color: #64748b; margin-bottom: 6px; display: inline-block; }
        .btn { height: 40px; padding: 0 14px; border-radius: 10px; border: none; font-size: 13px; font-weight: 700; cursor: pointer; transition: opacity 0.15s, transform 0.05s; }
        .btn:active { transform: translateY(1px); }
        .btn-secondary { background: #e2e8f0; color: #1a3a22; }
        .btn-primary { background: #0e3d27; color: #fff; }
      `}</style>

      <div className="desktop-sidenav" style={{ minWidth: "240px", borderRight: "1px solid #e8ede9", background: "#fff" }}>
        <SideNav />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopNav />

        <main style={{ padding: "20px 24px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, color: "#7a9880", marginBottom: 4 }}>
                <span style={{ cursor: "pointer" }} onClick={() => router.push("/manageblog")}>Manage Blogs</span>
                <span style={{ margin: "0 8px", color: "#94a3b8" }}>›</span>
                <span style={{ color: "#1a3a22", fontWeight: 700 }}>Edit Blog</span>
              </div>
              <h1 style={{ margin: 0, fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 28, color: "#1a3a22" }}>
                Edit blog post
              </h1>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-secondary" onClick={() => router.push("/manageblog")}>Back</button>
              <button className="btn btn-primary" onClick={() => handleSave(true)} disabled={saving}>
                {saving ? "Saving..." : "Save & Publish"}
              </button>
            </div>
          </div>

          {(error || message || loading) && (
            <div style={{ marginBottom: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {loading && <span style={{ fontSize: 12.5, color: "#64748b" }}>Loading post…</span>}
              {message && <span style={{ padding: "8px 12px", background: "#f0fdf4", color: "#166534", borderRadius: 10, fontSize: 12.5 }}>{message}</span>}
              {error && <span style={{ padding: "8px 12px", background: "#fef2f2", color: "#b91c1c", borderRadius: 10, fontSize: 12.5 }}>{error}</span>}
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, alignItems: "start" }}>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8ede9", padding: 18 }}>
              <div style={{ marginBottom: 14 }}>
                <label className="label">TITLE</label>
                <input className="input" value={form.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Enter a strong headline" />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label className="label">CONTENT</label>
                <textarea className="input" value={form.content} onChange={(e) => updateField("content", e.target.value)} placeholder="Write or paste your article" />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label className="label">EXCERPT</label>
                <textarea className="input" value={form.excerpt} onChange={(e) => updateField("excerpt", e.target.value)} placeholder="Short summary for cards" rows={3} />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8ede9", padding: 16 }}>
                <label className="label">SLUG</label>
                <input className="input" value={form.slug} onChange={(e) => updateField("slug", e.target.value)} placeholder="friendly-url" />
              </div>

              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8ede9", padding: 16 }}>
                <label className="label">COVER IMAGE URL</label>
                <input className="input" value={form.coverImage} onChange={(e) => updateField("coverImage", e.target.value)} placeholder="https://..." />
              </div>

              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8ede9", padding: 16 }}>
                <label className="label">TAGS (comma separated)</label>
                <input className="input" value={form.tags} onChange={(e) => updateField("tags", e.target.value)} placeholder="finance, investing" />
              </div>

              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8ede9", padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#1a3a22", fontSize: 13 }}>Published</div>
                  <div style={{ fontSize: 12.5, color: "#64748b" }}>Toggle to hide/show on site</div>
                </div>
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => updateField("published", e.target.checked)}
                  style={{ width: 18, height: 18 }}
                />
              </div>

              <button className="btn btn-secondary" onClick={() => handleSave(form.published)} disabled={saving}>
                {saving ? "Saving…" : "Save Draft"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
