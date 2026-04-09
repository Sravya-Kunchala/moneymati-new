"use client";

import { useEffect, useState } from "react";
import SideNav from "@/components/sidenav";
import TopNav from "@/components/topnav";
import { testimonialsData } from "@/components/testimonials";

interface Review {
  id: number;
  name: string;
  company: string;
  avatar: string;
  rating: number;
  date: string;
  testimonial: string;
  status: "verified" | "pending" | "flagged";
}

const todayStr = new Date().toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const mockReviews: Review[] = testimonialsData.map((t, idx) => ({
  id: idx + 1,
  name: t.name,
  company: t.role,
  avatar: t.avatar || "https://i.pravatar.cc/48?img=25",
  rating: t.stars ?? 5,
  date: todayStr,
  testimonial: t.quote,
  status: "verified",
}));

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-emerald-500" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function InteractiveStarRating({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(s)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            (hovered || rating) >= s
              ? "bg-emerald-500 shadow-md shadow-emerald-200"
              : "bg-gray-200"
          }`}
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: Review["status"] }) {
  const styles: Record<Review["status"], string> = {
    verified: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    flagged: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full border ${styles[status]} capitalize`}
    >
      {status}
    </span>
  );
}

function ReviewRow({
  review,
  onEdit,
  onDelete,
}: {
  review: Review;
  onEdit: (review: Review) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors group">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <img
              src={review.avatar}
              alt={review.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 leading-tight">{review.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{review.company}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <StarRating rating={review.rating} />
        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {review.date}
        </p>
      </td>
      <td className="py-4 px-4 max-w-xs">
        <p className="text-sm text-gray-600 italic line-clamp-2 leading-relaxed">
          "{review.testimonial}"
        </p>
      </td>
      <td className="py-4 px-4">
        <StatusBadge status={review.status} />
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(review)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(review.id)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ─────────────────────────────────────────
   EDIT MODAL  (matches the screenshot)
───────────────────────────────────────── */
function EditReviewModal({
  review,
  onClose,
  onSave,
}: {
  review: Review;
  onClose: () => void;
  onSave: (updated: Review) => void;
}) {
  const [draft, setDraft] = useState<Review>({ ...review });
  const [saving, setSaving] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setDraft((p) => ({ ...p, avatar: url }));
    }
  };

  const handleSave = () => {
    if (!draft.name.trim() || !draft.testimonial.trim()) return;
    setSaving(true);

    const payload = {
      name: draft.name.trim(),
      role: draft.company.trim(),
      avatar: draft.avatar.trim(),
      rating: draft.rating,
      testimonial: draft.testimonial.trim(),
    };

    fetch(`/api/reviews/${review.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(() => onSave(draft))
      .catch(() => onSave(draft)) // optimistic update even on error
      .finally(() => setSaving(false));
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="bg-[#f0f0f0] rounded-[28px] shadow-2xl w-full max-w-md overflow-hidden"
        style={{ animation: "modalIn 0.2s ease" }}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.95) translateY(8px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200/60">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.18em] mb-1">
            Editing Entry
          </p>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Edit Review</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Avatar + name row */}
          <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-4 border border-gray-100 shadow-sm">
            <img
              src={draft.avatar || "https://i.pravatar.cc/80?img=20"}
              alt={draft.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-100 flex-shrink-0"
            />
            <div>
              <p className="text-base font-bold text-gray-900">{draft.name || "Reviewer Name"}</p>
              <label className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600 cursor-pointer hover:text-emerald-700 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                UPDATE PROFILE IMAGE
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>
          </div>

          {/* Name + Role */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Reviewer Name
              </label>
              <input
                value={draft.name}
                onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                placeholder="Full name"
                className="w-full h-11 rounded-2xl border border-gray-200 bg-white px-3.5 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Occupation/Role
              </label>
              <input
                value={draft.company}
                onChange={(e) => setDraft((p) => ({ ...p, company: e.target.value }))}
                placeholder="CEO @ Company"
                className="w-full h-11 rounded-2xl border border-gray-200 bg-white px-3.5 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition shadow-sm"
              />
            </div>
          </div>

          {/* Star rating */}
          <div className="bg-white rounded-2xl px-4 py-3 border border-gray-100 shadow-sm">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
              Satisfaction Rating
            </label>
            <InteractiveStarRating
              rating={draft.rating}
              onChange={(r) => setDraft((p) => ({ ...p, rating: r }))}
            />
          </div>

          {/* Testimonial */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Testimonial Insight
            </label>
            <textarea
              value={draft.testimonial}
              onChange={(e) => setDraft((p) => ({ ...p, testimonial: e.target.value }))}
              rows={4}
              placeholder="Share the specific feedback or review text here..."
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition shadow-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Footer buttons */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-sm font-bold shadow-md shadow-emerald-200 transition-all disabled:opacity-70"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-full bg-white border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [currentPage, setCurrentPage] = useState(1);

  // Add modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<{
    name: string;
    company: string;
    testimonial: string;
    rating: number;
    avatar: string;
  }>({ name: "", company: "", testimonial: "", rating: 5, avatar: "" });

  // Edit modal
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const resetDraft = () =>
    setDraft({ name: "", company: "", testimonial: "", rating: 5, avatar: "" });

  const totalPages = Math.max(1, Math.ceil(reviews.length / 10));

  const fetchReviews = () => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data?.items) ? data.items : [];
        const mapped: Review[] = items.map((r: any) => ({
          id: r.id,
          name: r.name,
          company: r.role || "—",
          avatar: r.avatar || "https://i.pravatar.cc/48?img=20",
          rating: r.rating || 5,
          date: new Date(r.created_at || Date.now()).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          testimonial: r.testimonial,
          status: "verified",
        }));
        setReviews([...mapped, ...mockReviews]);
      })
      .catch(() => setReviews(mockReviews));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = (id: number) => {
    fetch(`/api/reviews/${id}`, { method: "DELETE" })
      .catch((err) => console.error("Failed to delete review", err))
      .finally(() => fetchReviews());
  };

  const handleEditOpen = (review: Review) => {
    setEditingReview(review);
  };

  const handleEditSave = (updated: Review) => {
    setReviews((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setEditingReview(null);
  };

  const handleAdd = () => {
    if (!draft.name.trim() || !draft.testimonial.trim()) return;
    setSaving(true);
    const payload = {
      name: draft.name.trim(),
      role: draft.company.trim(),
      avatar: draft.avatar.trim(),
      rating: draft.rating,
      testimonial: draft.testimonial.trim(),
    };
    fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        const item = data?.item;
        if (item) {
          const normalized: Review = {
            id: item.id,
            name: item.name,
            company: item.role || "—",
            avatar: item.avatar || "https://i.pravatar.cc/48?img=20",
            rating: item.rating || 5,
            date: new Date(item.created_at || Date.now()).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            testimonial: item.testimonial,
            status: "verified",
          };
          setReviews((prev) => [normalized, ...prev]);
          window.dispatchEvent(new Event("admin-reviews-updated"));
        }
      })
      .catch((err) => console.error("Failed to add review", err))
      .finally(() => {
        setSaving(false);
        setShowAddModal(false);
        resetDraft();
      });
  };

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  const pageNumbers = (): (number | "...")[] => [1, 2, 3, "...", totalPages];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6f4" }}>
      <div className="sidenav-wrapper" style={{ flexShrink: 0 }}>
        <SideNav />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopNav />
        <div
          className="min-h-screen bg-gray-50/50 p-6 font-sans"
          style={{ flex: 1, overflowY: "auto" }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">
                Management Terminal
              </p>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reviews Manager</h1>
              <p className="text-sm text-gray-500 mt-1">
                Oversee customer feedback, maintain brand integrity, and respond to platform testimonials.
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-emerald-200 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add New Review
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                Average Rating
              </p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-gray-900 leading-none">{averageRating}</span>
                <div className="mb-0.5">
                  <StarRating rating={Math.round(parseFloat(averageRating))} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                Total Reviews
              </p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-gray-900 leading-none">{reviews.length}</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mb-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  +12% this month
                </span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider py-3 px-4">
                    Reviewer Details
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider py-3 px-4">
                    Rating & Date
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider py-3 px-4">
                    Testimonial Insight
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider py-3 px-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider py-3 px-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, idx) => (
                  <ReviewRow
                    key={`${review.id}-${idx}`}
                    review={review}
                    onEdit={handleEditOpen}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                Showing 1–{reviews.length} of {reviews.length} Reviews
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {pageNumbers().map((page, i) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="w-7 h-7 flex items-center justify-center text-xs text-gray-400"
                    >
                      ···
                    </span>
                  ) : (
                    <button
                      key={`page-${page}-${i}`}
                      onClick={() => setCurrentPage(page as number)}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                        currentPage === page
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── ADD REVIEW MODAL ── */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-4xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Review</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start mb-8">
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-xs font-semibold text-emerald-700 uppercase tracking-[0.2em]">
                      Reviewer Info
                    </p>
                    <label className="w-32 h-36 rounded-2xl border-2 border-dashed border-emerald-300 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-emerald-500 transition-colors bg-emerald-50/40">
                      {draft.avatar ? (
                        <img
                          src={draft.avatar}
                          alt="Avatar preview"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          <span className="text-xs font-semibold text-emerald-700">Upload</span>
                          <span className="text-[10px] text-gray-500 text-center leading-tight">
                            PNG or JPG (Max 5MB)
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setDraft((p) => ({ ...p, avatar: url }));
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">
                        Reviewer Name
                      </label>
                      <input
                        value={draft.name}
                        onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                        type="text"
                        placeholder="Sharma"
                        className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition placeholder-gray-500 text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">
                        Occupation/Role
                      </label>
                      <input
                        value={draft.company}
                        onChange={(e) => setDraft((p) => ({ ...p, company: e.target.value }))}
                        type="text"
                        placeholder="CEO @Company"
                        className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition placeholder-gray-500 text-gray-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
                    Review Content
                  </p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={`modal-star-${s}`}
                        type="button"
                        onClick={() => setDraft((p) => ({ ...p, rating: s }))}
                        className={`p-1 ${draft.rating >= s ? "text-emerald-500" : "text-gray-300"}`}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Testimonial Insight
                  </label>
                  <textarea
                    value={draft.testimonial}
                    onChange={(e) => setDraft((p) => ({ ...p, testimonial: e.target.value }))}
                    rows={5}
                    placeholder="Share the specific feedback or review text here..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition placeholder-gray-500 text-gray-800"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                  <button
                    onClick={handleAdd}
                    disabled={saving}
                    className="flex-1 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold shadow-sm shadow-emerald-200 transition-colors disabled:opacity-70"
                  >
                    {saving ? "Saving..." : "Add Review"}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      resetDraft();
                    }}
                    className="flex-1 h-12 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── EDIT REVIEW MODAL ── */}
          {editingReview && (
            <EditReviewModal
              review={editingReview}
              onClose={() => setEditingReview(null)}
              onSave={handleEditSave}
            />
          )}
        </div>
      </div>
    </div>
  );
}