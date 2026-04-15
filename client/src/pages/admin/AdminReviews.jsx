import { useEffect, useState, useCallback } from "react";
import api from "../../services/api";
import {
  Star, Trash2, Search, RefreshCw, X, AlertTriangle,
  MessageSquare, TrendingUp, User, BookOpen, Calendar,
} from "lucide-react";

/* ─── tiny helpers ─────────────────────────────────────── */
const StarRow = ({ value, size = 12 }) => (
  <span style={{ display: "inline-flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={size}
        style={{
          fill: s <= value ? "#f97316" : "transparent",
          color: s <= value ? "#f97316" : "rgba(45,212,191,0.22)",
          flexShrink: 0,
        }}
      />
    ))}
  </span>
);

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

const RATING_LABEL = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

/* ─── skeleton ──────────────────────────────────────────── */
const skBase = {
  background:
    "linear-gradient(90deg,rgba(45,212,191,0.05) 25%,rgba(45,212,191,0.13) 50%,rgba(45,212,191,0.05) 75%)",
  backgroundSize: "200% 100%",
  animation: "arShimmer 1.5s ease-in-out infinite",
  borderRadius: 8,
};

/* ═══════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════ */
const AdminReviews = () => {
  const [reviews, setReviews]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search,  setSearch]        = useState("");
  const [filter,  setFilter]        = useState("all"); // all | 1..5
  const [toDelete, setToDelete]     = useState(null);  // review obj
  const [deleting, setDeleting]     = useState(false);
  const [toast,    setToast]        = useState(null);  // { type, text }

  /* ── fetch all reviews across all courses ── */
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/course/reviews/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.status) setReviews(res.data.reviews || []);
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  /* ── toast helper ── */
  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  /* ── delete confirmed ── */
  const handleDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const res = await api.delete(`/course/reviews/${toDelete._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.status) {
        setReviews((prev) => prev.filter((r) => r._id !== toDelete._id));
        showToast("success", "Review deleted successfully.");
      } else {
        showToast("error", res.data.message || "Delete failed.");
      }
    } catch (err) {
      showToast("error", err?.response?.data?.message || "Delete failed.");
    } finally {
      setDeleting(false);
      setToDelete(null);
    }
  };

  /* ── derived ── */
  const filtered = reviews.filter((r) => {
    const matchStar   = filter === "all" || r.rating === Number(filter);
    const matchSearch =
      !search ||
      r.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.comment?.toLowerCase().includes(search.toLowerCase()) ||
      r.courseTitle?.toLowerCase().includes(search.toLowerCase());
    return matchStar && matchSearch;
  });

  const avgRating =
    reviews.length
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  const starCounts = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviews.filter((r) => r.rating === s).length,
  }));

  /* ════════════════════════════════════ RENDER */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes arShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes arFadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes arSlideIn { from{opacity:0;transform:translateY(-18px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes arToast   { 0%{opacity:0;transform:translateY(18px)} 10%{opacity:1;transform:translateY(0)} 85%{opacity:1} 100%{opacity:0} }
        .ar-card    { transition:background .18s,border-color .18s; }
        .ar-card:hover { background:rgba(45,212,191,.07) !important; border-color:rgba(45,212,191,.22) !important; }
        .ar-del-btn { transition:background .18s,color .18s,transform .12s; }
        .ar-del-btn:hover { background:rgba(239,68,68,.18) !important; color:#f87171 !important; transform:scale(1.08); }
        .ar-confirm-del { transition:background .18s,transform .12s; }
        .ar-confirm-del:hover:not(:disabled) { background:#b91c1c !important; transform:translateY(-1px); }
        .ar-cancel-btn  { transition:background .18s; }
        .ar-cancel-btn:hover { background:rgba(45,212,191,.1) !important; }
        .ar-filter-btn  { transition:background .18s,color .18s,border-color .18s; }
        .ar-filter-btn:hover { border-color:rgba(45,212,191,.4) !important; color:#e2faf8 !important; }
        .ar-refresh { transition:color .18s,transform .3s; }
        .ar-refresh:hover { color:#2dd4bf !important; transform:rotate(180deg); }
        .ar-search-wrap input:focus { outline:none; border-color:rgba(45,212,191,.45) !important; box-shadow:0 0 0 3px rgba(45,212,191,.07); }
        .ar-overlay { position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(3px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:1rem; }
        .ar-modal   { animation:arSlideIn .22s ease both; }
        .ar-toast   { position:fixed;bottom:1.8rem;right:1.8rem;z-index:2000;padding:12px 20px;border-radius:12px;font-size:.85rem;font-weight:600;display:flex;align-items:center;gap:9px;animation:arToast 3.5s ease forwards;font-family:'DM Sans',sans-serif; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#0d3d39",
          fontFamily: "'DM Sans',sans-serif",
          padding: "2.5rem 1.5rem 5rem",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* ── PAGE HEADER ── */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: "2rem",
              animation: "arFadeUp .35s ease both",
            }}
          >
            <div>
              <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(45,212,191,.55)", margin: "0 0 4px" }}>
                Admin Panel
              </p>
              <h1
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(1.6rem,3vw,2.2rem)",
                  fontWeight: 900,
                  color: "#e2faf8",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Student Reviews
              </h1>
            </div>
            <button
              className="ar-refresh"
              onClick={fetchReviews}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "8px 16px", borderRadius: 9,
                background: "rgba(45,212,191,.08)",
                border: "1px solid rgba(45,212,191,.2)",
                color: "rgba(226,250,248,.5)",
                fontSize: ".82rem", fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              <RefreshCw size={14} /> Refresh
            </button>
          </div>

          {/* ── STAT CARDS ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
              gap: 12,
              marginBottom: "1.6rem",
              animation: "arFadeUp .4s ease .05s both",
            }}
          >
            {[
              {
                icon: <MessageSquare size={18} color="#2dd4bf" />,
                label: "Total Reviews",
                value: reviews.length,
                accent: "rgba(45,212,191,.12)",
              },
              {
                icon: <TrendingUp size={18} color="#f97316" />,
                label: "Avg Rating",
                value: avgRating ? `${avgRating} / 5` : "—",
                accent: "rgba(249,115,22,.12)",
              },
              {
                icon: <Star size={18} color="#f59e0b" style={{ fill: "#f59e0b" }} />,
                label: "5-Star Reviews",
                value: reviews.filter((r) => r.rating === 5).length,
                accent: "rgba(245,158,11,.12)",
              },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  background: "#134e4a",
                  border: "1px solid rgba(45,212,191,.15)",
                  borderRadius: 14,
                  padding: "1.1rem 1.3rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: card.accent,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <p style={{ fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(226,250,248,.35)", margin: "0 0 3px" }}>
                    {card.label}
                  </p>
                  <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#e2faf8", margin: 0, lineHeight: 1 }}>
                    {card.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── STAR BREAKDOWN BAR ── */}
          {reviews.length > 0 && (
            <div
              style={{
                background: "#134e4a",
                border: "1px solid rgba(45,212,191,.15)",
                borderRadius: 14,
                padding: "1.1rem 1.5rem",
                marginBottom: "1.6rem",
                animation: "arFadeUp .4s ease .1s both",
              }}
            >
              <p style={{ fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(45,212,191,.5)", margin: "0 0 .9rem" }}>
                Rating Breakdown
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {starCounts.map(({ star, count }) => (
                  <div key={star} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: ".72rem", fontWeight: 700, color: "rgba(226,250,248,.45)", width: 14, textAlign: "right", flexShrink: 0 }}>
                      {star}
                    </span>
                    <Star size={11} style={{ fill: "#f97316", color: "#f97316", flexShrink: 0 }} />
                    <div style={{ flex: 1, height: 6, background: "rgba(45,212,191,.1)", borderRadius: 100, overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: reviews.length ? `${(count / reviews.length) * 100}%` : "0%",
                          background: star >= 4 ? "#22c55e" : star === 3 ? "#f97316" : "#ef4444",
                          borderRadius: 100,
                          transition: "width .5s ease",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: ".72rem", color: "rgba(226,250,248,.4)", width: 22, flexShrink: 0 }}>
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SEARCH + FILTER ── */}
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: "1.4rem",
              animation: "arFadeUp .4s ease .15s both",
            }}
          >
            {/* Search */}
            <div
              className="ar-search-wrap"
              style={{
                flex: 1, minWidth: 200,
                display: "flex", alignItems: "center", gap: 9,
                background: "#134e4a",
                border: "1px solid rgba(45,212,191,.18)",
                borderRadius: 10, padding: "0 12px",
              }}
            >
              <Search size={14} color="rgba(45,212,191,.5)" style={{ flexShrink: 0 }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by student, course or keyword…"
                style={{
                  flex: 1, background: "transparent", border: "none",
                  color: "#e2faf8", fontSize: ".86rem", fontFamily: "'DM Sans',sans-serif",
                  padding: "10px 0",
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(226,250,248,.35)", padding: 0, display: "flex" }}
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Star filter pills */}
            {["all", "5", "4", "3", "2", "1"].map((f) => (
              <button
                key={f}
                className="ar-filter-btn"
                onClick={() => setFilter(f)}
                style={{
                  padding: "8px 14px", borderRadius: 9, cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif", fontSize: ".78rem", fontWeight: 700,
                  background: filter === f ? "rgba(249,115,22,.18)" : "rgba(45,212,191,.06)",
                  border: filter === f ? "1px solid rgba(249,115,22,.45)" : "1px solid rgba(45,212,191,.15)",
                  color: filter === f ? "#f97316" : "rgba(226,250,248,.45)",
                  display: "inline-flex", alignItems: "center", gap: 5,
                }}
              >
                {f === "all" ? (
                  "All Stars"
                ) : (
                  <>
                    {f}
                    <Star size={10} style={{ fill: "#f97316", color: "#f97316" }} />
                  </>
                )}
              </button>
            ))}
          </div>

          {/* ── REVIEWS LIST ── */}
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ ...skBase, height: 96, borderRadius: 14 }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center", padding: "4rem 1rem",
                color: "rgba(226,250,248,.3)", animation: "arFadeUp .3s ease both",
              }}
            >
              <MessageSquare
                size={38}
                style={{ color: "rgba(45,212,191,.18)", display: "block", margin: "0 auto 10px" }}
              />
              <p style={{ margin: 0, fontSize: ".9rem" }}>
                {reviews.length === 0
                  ? "No reviews yet across all courses."
                  : "No reviews match your filter."}
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "arFadeUp .4s ease .2s both" }}>
              {filtered.map((rev) => (
                <div
                  key={rev._id}
                  className="ar-card"
                  style={{
                    background: "rgba(45,212,191,.03)",
                    border: "1px solid rgba(45,212,191,.12)",
                    borderRadius: 14,
                    padding: "1.1rem 1.3rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    {/* Avatar */}
                    <div
                      style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: "rgba(45,212,191,.12)",
                        border: "1px solid rgba(45,212,191,.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <User size={16} color="#2dd4bf" />
                    </div>

                    {/* Body */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex", alignItems: "center",
                          gap: 8, flexWrap: "wrap", marginBottom: 4,
                        }}
                      >
                        <span style={{ fontWeight: 700, fontSize: ".88rem", color: "#e2faf8" }}>
                          {rev.name || "Anonymous"}
                        </span>

                        {/* Rating badge */}
                        <span
                          style={{
                            background: "rgba(249,115,22,.12)",
                            border: "1px solid rgba(249,115,22,.22)",
                            borderRadius: 8, padding: "2px 9px",
                            fontSize: ".75rem", fontWeight: 800, color: "#f97316",
                          }}
                        >
                          {rev.rating}/5
                        </span>
                        <StarRow value={rev.rating} />
                        <span style={{ fontSize: ".72rem", color: "rgba(45,212,191,.55)", fontWeight: 600 }}>
                          {RATING_LABEL[rev.rating]}
                        </span>

                        <span style={{ marginLeft: "auto", fontSize: ".7rem", color: "rgba(226,250,248,.28)", display: "inline-flex", alignItems: "center", gap: 5 }}>
                          <Calendar size={10} /> {fmtDate(rev.createdAt)}
                        </span>
                      </div>

                      {/* Course name */}
                      {rev.courseTitle && (
                        <div
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            fontSize: ".72rem", fontWeight: 600,
                            color: "rgba(45,212,191,.65)",
                            marginBottom: 6,
                          }}
                        >
                          <BookOpen size={10} /> {rev.courseTitle}
                        </div>
                      )}

                      {rev.comment && (
                        <p
                          style={{
                            color: "rgba(226,250,248,.6)",
                            fontSize: ".86rem", lineHeight: 1.7, margin: 0,
                          }}
                        >
                          {rev.comment}
                        </p>
                      )}
                    </div>

                    {/* Delete button */}
                    <button
                      className="ar-del-btn"
                      onClick={() => setToDelete(rev)}
                      title="Delete review"
                      style={{
                        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                        background: "rgba(239,68,68,.09)",
                        border: "1px solid rgba(239,68,68,.2)",
                        color: "rgba(239,68,68,.65)",
                        cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results count */}
          {!loading && filtered.length > 0 && (
            <p
              style={{
                textAlign: "right", fontSize: ".72rem",
                color: "rgba(226,250,248,.25)", marginTop: 12,
              }}
            >
              Showing {filtered.length} of {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {/* ════════ DELETE CONFIRMATION MODAL ════════ */}
      {toDelete && (
        <div className="ar-overlay" onClick={() => !deleting && setToDelete(null)}>
          <div
            className="ar-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#134e4a",
              border: "1px solid rgba(239,68,68,.3)",
              borderRadius: 18,
              padding: "2rem",
              maxWidth: 440,
              width: "100%",
              boxShadow: "0 32px 72px rgba(0,0,0,.6)",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 52, height: 52, borderRadius: "50%",
                background: "rgba(239,68,68,.12)",
                border: "1px solid rgba(239,68,68,.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.2rem",
              }}
            >
              <AlertTriangle size={22} color="#f87171" />
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.25rem", fontWeight: 900,
                color: "#e2faf8", textAlign: "center", margin: "0 0 .6rem",
              }}
            >
              Delete Review?
            </h2>
            <p
              style={{
                textAlign: "center", color: "rgba(226,250,248,.5)",
                fontSize: ".86rem", lineHeight: 1.65, margin: "0 0 1.4rem",
              }}
            >
              This will permanently remove{" "}
              <strong style={{ color: "#e2faf8" }}>
                {toDelete.name || "Anonymous"}'s
              </strong>{" "}
              review and it will no longer appear on the course page.
              <br />This action cannot be undone.
            </p>

            {/* Preview of review being deleted */}
            <div
              style={{
                background: "rgba(0,0,0,.2)",
                border: "1px solid rgba(239,68,68,.15)",
                borderRadius: 10, padding: "10px 14px", marginBottom: "1.4rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <StarRow value={toDelete.rating} size={11} />
                <span style={{ fontSize: ".75rem", color: "#f97316", fontWeight: 700 }}>
                  {toDelete.rating}/5
                </span>
              </div>
              <p
                style={{
                  color: "rgba(226,250,248,.45)", fontSize: ".82rem",
                  lineHeight: 1.5, margin: 0,
                  overflow: "hidden", display: "-webkit-box",
                  WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                }}
              >
                {toDelete.comment || "No comment."}
              </p>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="ar-cancel-btn"
                onClick={() => !deleting && setToDelete(null)}
                disabled={deleting}
                style={{
                  flex: 1, padding: "11px 0", borderRadius: 10, cursor: "pointer",
                  background: "rgba(45,212,191,.07)",
                  border: "1px solid rgba(45,212,191,.2)",
                  color: "rgba(226,250,248,.6)",
                  fontSize: ".88rem", fontWeight: 600,
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                className="ar-confirm-del"
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  flex: 1, padding: "11px 0", borderRadius: 10, cursor: deleting ? "wait" : "pointer",
                  background: "#dc2626",
                  border: "none",
                  color: "#fff",
                  fontSize: ".88rem", fontWeight: 700,
                  fontFamily: "'DM Sans',sans-serif",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                  opacity: deleting ? .7 : 1,
                }}
              >
                <Trash2 size={14} />
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════ TOAST ════════ */}
      {toast && (
        <div
          className="ar-toast"
          style={{
            background: toast.type === "success" ? "rgba(22,101,52,.95)" : "rgba(127,29,29,.95)",
            border: `1px solid ${toast.type === "success" ? "rgba(34,197,94,.35)" : "rgba(239,68,68,.35)"}`,
            color: toast.type === "success" ? "#4ade80" : "#f87171",
            boxShadow: "0 8px 32px rgba(0,0,0,.4)",
          }}
        >
          {toast.type === "success" ? (
            <Star size={14} style={{ fill: "#4ade80", color: "#4ade80" }} />
          ) : (
            <AlertTriangle size={14} />
          )}
          {toast.text}
        </div>
      )}
    </>
  );
};

export default AdminReviews;