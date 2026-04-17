import { useEffect, useState, useCallback } from "react";
import api from "../../services/api";
import {
  Star, Trash2, Search, RefreshCw, X, AlertTriangle,
  MessageSquare, TrendingUp, ChevronDown, ChevronRight,
  BookOpen, Calendar, User, BarChart2,
} from "lucide-react";

/* ─── helpers ─────────────────────────────────────────── */
const StarRow = ({ value, size = 12 }) => (
  <span style={{ display: "inline-flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={size} style={{
        fill: s <= value ? "#f59e0b" : "transparent",
        color: s <= value ? "#f59e0b" : "rgba(245,158,11,0.18)",
        flexShrink: 0,
      }} />
    ))}
  </span>
);

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

const RATING_LABEL = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

const skBase = {
  background: "linear-gradient(90deg,#323235 25%,#3a3a3e 50%,#323235 75%)",
  backgroundSize: "200% 100%",
  animation: "arShimmer 1.5s ease-in-out infinite",
  borderRadius: 8,
};

/* ═══════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════ */
const AdminReviews = () => {
  const [groups,   setGroups]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("all");
  const [expanded, setExpanded] = useState({});
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast,    setToast]    = useState(null);

  /* ── fetch ── */
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const coursesRes = await api.get("/course/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!coursesRes.data.status) throw new Error("Failed to load courses");

      const courses = coursesRes.data.courses || [];

      const built = await Promise.all(
        courses.map(async (course) => {
          try {
            // ✅ FIXED: updated to new route pattern /:courseId/reviews
            const res = await api.get(`/course/${course._id}/reviews`, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            const reviews = (res.data.reviews || []).map((r) => ({
              ...r,
              courseTitle: r.courseTitle || course.title,
              courseId: course._id,
            }));
            return { courseId: course._id, courseTitle: course.title, reviews };
          } catch {
            return { courseId: course._id, courseTitle: course.title, reviews: [] };
          }
        })
      );

      const sorted = built
        .map((g) => ({
          ...g,
          reviews: [...g.reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        }))
        .sort((a, b) => b.reviews.length - a.reviews.length);

      setGroups(sorted);

      const initExpanded = {};
      sorted.forEach((g) => { if (g.reviews.length > 0) initExpanded[g.courseId] = true; });
      setExpanded(initExpanded);
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  /* ── delete review ── */
  const handleDelete = async () => {
    if (!toDelete) return;

    const reviewId = toDelete._id || toDelete.id;
    const courseId = toDelete.courseId;

    if (!reviewId) {
      showToast("error", "Could not identify the review. Please refresh and try again.");
      return;
    }
    if (!courseId) {
      showToast("error", "Could not identify the course. Please refresh and try again.");
      return;
    }

    setDeleting(true);
    try {
      // ✅ FIXED: correct nested route
      const res = await api.delete(`/course/${courseId}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const succeeded =
        res.data?.status === true ||
        res.data?.success === true ||
        res.status === 200 ||
        res.status === 204;

      if (succeeded) {
        setGroups((prev) =>
          prev.map((g) =>
            g.courseId === courseId
              ? { ...g, reviews: g.reviews.filter((r) => (r._id || r.id) !== reviewId) }
              : g
          )
        );
        showToast("success", "Review deleted successfully.");
      } else {
        showToast("error", res.data?.message || "Delete failed. Please try again.");
      }
    } catch (err) {
      console.error("Delete error:", err?.response?.status, err?.response?.data);
      if (err?.response?.status === 404) {
        showToast("error", "Review not found. It may have already been deleted.");
      } else if (err?.response?.status === 401 || err?.response?.status === 403) {
        showToast("error", "Not authorized to delete this review.");
      } else {
        showToast("error", err?.response?.data?.message || "Delete failed. Please try again.");
      }
    } finally {
      setDeleting(false);
      setToDelete(null);
    }
  };

  /* ── derived data ── */
  const allReviews = groups.flatMap((g) => g.reviews);

  const avgRating = allReviews.length
    ? (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1)
    : null;

  const starCounts = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: allReviews.filter((r) => r.rating === s).length,
  }));

  const filteredGroups = groups
    .map((g) => ({
      ...g,
      reviews: g.reviews.filter((r) => {
        const matchStar   = filter === "all" || r.rating === Number(filter);
        const matchSearch =
          !search ||
          r.name?.toLowerCase().includes(search.toLowerCase()) ||
          r.comment?.toLowerCase().includes(search.toLowerCase()) ||
          g.courseTitle?.toLowerCase().includes(search.toLowerCase());
        return matchStar && matchSearch;
      }),
    }))
    .filter((g) => g.reviews.length > 0 || (!search && filter === "all"));

  const toggleExpand = (courseId) =>
    setExpanded((prev) => ({ ...prev, [courseId]: !prev[courseId] }));

  /* ════════════════════════════════════ RENDER */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;900&display=swap');
        @keyframes arShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes arFadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes arSlideIn { from{opacity:0;transform:translateY(-18px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes arToast   { 0%{opacity:0;transform:translateY(18px)} 10%{opacity:1;transform:translateY(0)} 85%{opacity:1} 100%{opacity:0} }
        .ar-course-row { transition:background .18s,border-color .18s; }
        .ar-course-row:hover { background:rgba(245,158,11,.08) !important; border-color:rgba(245,158,11,.3) !important; }
        .ar-rev-card   { transition:background .18s; }
        .ar-rev-card:hover { background:rgba(245,158,11,.06) !important; }
        .ar-del-btn    { transition:background .18s,color .18s,transform .12s; }
        .ar-del-btn:hover { background:rgba(239,68,68,.18) !important; color:#f87171 !important; transform:scale(1.08); }
        .ar-confirm-del { transition:background .18s,transform .12s; }
        .ar-confirm-del:hover:not(:disabled) { background:#b91c1c !important; transform:translateY(-1px); }
        .ar-cancel-btn { transition:background .18s; }
        .ar-cancel-btn:hover { background:rgba(245,158,11,.1) !important; }
        .ar-filter-btn { transition:background .18s,color .18s,border-color .18s; }
        .ar-filter-btn:hover { border-color:rgba(245,158,11,.4) !important; color:#fafafa !important; }
        .ar-refresh    { transition:color .18s; }
        .ar-refresh:hover { color:#f59e0b !important; }
        .ar-search-wrap input:focus { outline:none; border-color:rgba(245,158,11,.45) !important; box-shadow:0 0 0 3px rgba(245,158,11,.07); }
        .ar-overlay { position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(3px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:1rem; }
        .ar-modal   { animation:arSlideIn .22s ease both; }
        .ar-toast   { position:fixed;bottom:1.8rem;right:1.8rem;z-index:2000;padding:12px 20px;border-radius:12px;font-size:.85rem;font-weight:600;display:flex;align-items:center;gap:9px;animation:arToast 3.5s ease forwards;font-family:'DM Sans',sans-serif; }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#18181b", fontFamily:"'DM Sans',sans-serif", padding:"2rem 1.5rem 5rem" }}>
        <div style={{ maxWidth:920, margin:"0 auto" }}>

          {/* PAGE HEADER */}
          <div style={{ marginBottom:"2.5rem", animation:"arFadeUp .35s ease both" }}>
            <p style={{ fontSize:".68rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"#f59e0b", marginBottom:4 }}>
              Admin Panel
            </p>
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
              <div>
                <h1 style={{ fontSize:"1.875rem", fontWeight:900, color:"#fafafa", letterSpacing:"-0.02em", margin:0 }}>
                  Student Reviews
                </h1>
                <p style={{ fontSize:".875rem", marginTop:4, color:"#71717a" }}>
                  Grouped by course — click a course name to expand its reviews
                </p>
              </div>
              <button className="ar-refresh" onClick={fetchReviews}
                style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"8px 16px", borderRadius:9, background:"rgba(245,158,11,.08)", border:"1px solid rgba(245,158,11,.2)", color:"rgba(250,250,250,.5)", fontSize:".82rem", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                <RefreshCw size={14} /> Refresh
              </button>
            </div>
            <div style={{ marginTop:12, height:2, width:64, background:"linear-gradient(90deg,#f59e0b,transparent)", borderRadius:2 }} />
          </div>

          {/* STAT CARDS */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"1.25rem", marginBottom:"1.5rem", animation:"arFadeUp .4s ease .05s both" }}>
            {[
              { icon:<MessageSquare size={20} color="#f59e0b"/>, label:"Total Reviews",   value:allReviews.length,                                             accent:"#f59e0b", sub:"Across all courses" },
              { icon:<TrendingUp    size={20} color="#34d399"/>, label:"Avg Rating",      value:avgRating ? `${avgRating} / 5` : "—",                          accent:"#34d399", sub:"Overall average"   },
              { icon:<BookOpen      size={20} color="#60a5fa"/>, label:"Courses Rated",   value:groups.filter(g=>g.reviews.length>0).length,                   accent:"#60a5fa", sub:"Have ≥1 review"     },
              { icon:<Star          size={20} color="#a78bfa" style={{fill:"#a78bfa"}}/>, label:"5-Star Reviews", value:allReviews.filter(r=>r.rating===5).length, accent:"#a78bfa", sub:"Top rated" },
            ].map((card) => (
              <div key={card.label} style={{ background:"#27272a", border:`1px solid ${card.accent}30`, borderRadius:16, padding:"1.4rem", position:"relative", overflow:"hidden", boxShadow:`0 8px 32px rgba(0,0,0,.35), inset 0 1px 0 ${card.accent}15` }}>
                <div style={{ position:"absolute", top:-32, right:-32, width:100, height:100, borderRadius:"50%", background:card.accent, opacity:0.07 }} />
                <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:".66rem", fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:card.accent, marginBottom:4 }}>{card.label}</p>
                    <p style={{ fontSize:"2rem", fontWeight:900, color:"#fafafa", lineHeight:1.1, marginTop:8 }}>{card.value}</p>
                    <p style={{ fontSize:".73rem", marginTop:4, color:"#71717a" }}>{card.sub}</p>
                  </div>
                  <div style={{ background:`${card.accent}18`, borderRadius:12, padding:"0.7rem" }}>{card.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* STAR BREAKDOWN */}
          {allReviews.length > 0 && (
            <div style={{ background:"#27272a", border:"1px solid rgba(245,158,11,.12)", borderRadius:16, padding:"1.4rem 1.6rem", marginBottom:"1.5rem", boxShadow:"0 8px 32px rgba(0,0,0,.35)", animation:"arFadeUp .4s ease .1s both" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"1rem" }}>
                <BarChart2 size={14} color="#f59e0b" />
                <p style={{ fontSize:".68rem", fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:"#f59e0b", margin:0 }}>Rating Breakdown</p>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                {starCounts.map(({ star, count }) => (
                  <div key={star} style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:".72rem", fontWeight:700, color:"#71717a", width:14, textAlign:"right", flexShrink:0 }}>{star}</span>
                    <Star size={11} style={{ fill:"#f59e0b", color:"#f59e0b", flexShrink:0 }} />
                    <div style={{ flex:1, height:6, background:"rgba(245,158,11,.08)", borderRadius:100, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:allReviews.length ? `${(count/allReviews.length)*100}%` : "0%", background:star>=4?"#22c55e":star===3?"#f59e0b":"#ef4444", borderRadius:100, transition:"width .5s ease" }} />
                    </div>
                    <span style={{ fontSize:".72rem", color:"#52525b", width:22, flexShrink:0 }}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEARCH + FILTER */}
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:"1.4rem", animation:"arFadeUp .4s ease .15s both" }}>
            <div className="ar-search-wrap" style={{ flex:1, minWidth:200, display:"flex", alignItems:"center", gap:9, background:"#27272a", border:"1px solid rgba(245,158,11,.15)", borderRadius:10, padding:"0 12px" }}>
              <Search size={14} color="rgba(245,158,11,.5)" style={{ flexShrink:0 }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by student, course or keyword…"
                style={{ flex:1, background:"transparent", border:"none", color:"#fafafa", fontSize:".86rem", fontFamily:"'DM Sans',sans-serif", padding:"10px 0" }} />
              {search && (
                <button onClick={() => setSearch("")} style={{ background:"none", border:"none", cursor:"pointer", color:"#52525b", padding:0, display:"flex" }}>
                  <X size={13} />
                </button>
              )}
            </div>
            {["all","5","4","3","2","1"].map((f) => (
              <button key={f} className="ar-filter-btn" onClick={() => setFilter(f)}
                style={{ padding:"8px 14px", borderRadius:9, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:".78rem", fontWeight:700, background:filter===f?"rgba(245,158,11,.18)":"rgba(245,158,11,.05)", border:filter===f?"1px solid rgba(245,158,11,.45)":"1px solid rgba(245,158,11,.12)", color:filter===f?"#f59e0b":"#52525b", display:"inline-flex", alignItems:"center", gap:5 }}>
                {f==="all" ? "All Stars" : <>{f}<Star size={10} style={{ fill:"#f59e0b", color:"#f59e0b" }}/></>}
              </button>
            ))}
          </div>

          {/* ── COURSE GROUPS ── */}
          {loading ? (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[1,2,3].map((i) => <div key={i} style={{ ...skBase, height:72, borderRadius:14 }} />)}
            </div>
          ) : filteredGroups.length === 0 ? (
            <div style={{ textAlign:"center", padding:"4rem 1rem", color:"#52525b", animation:"arFadeUp .3s ease both" }}>
              <MessageSquare size={38} style={{ color:"rgba(245,158,11,.18)", display:"block", margin:"0 auto 10px" }} />
              <p style={{ margin:0, fontSize:".9rem" }}>
                {allReviews.length === 0 ? "No reviews yet across all courses." : "No reviews match your filter."}
              </p>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:12, animation:"arFadeUp .4s ease .2s both" }}>
              {filteredGroups.map((group) => {
                const isOpen = !!expanded[group.courseId];
                const groupAvg = group.reviews.length
                  ? (group.reviews.reduce((s,r)=>s+r.rating,0)/group.reviews.length).toFixed(1)
                  : null;

                return (
                  <div key={group.courseId} style={{ background:"#27272a", border:"1px solid rgba(245,158,11,.12)", borderRadius:16, overflow:"hidden", boxShadow:"0 4px 16px rgba(0,0,0,.25)" }}>

                    {/* ── Course header row ── */}
                    <button
                      className="ar-course-row"
                      onClick={() => toggleExpand(group.courseId)}
                      style={{ width:"100%", background:"transparent", border:"none", cursor:"pointer", padding:"1.1rem 1.3rem", display:"flex", alignItems:"center", gap:12, fontFamily:"'DM Sans',sans-serif", textAlign:"left" }}
                    >
                      <div style={{ width:28, height:28, borderRadius:8, background:"rgba(245,158,11,.1)", border:"1px solid rgba(245,158,11,.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        {isOpen ? <ChevronDown size={14} color="#f59e0b" /> : <ChevronRight size={14} color="#f59e0b" />}
                      </div>

                      <div style={{ width:38, height:38, borderRadius:10, background:"rgba(245,158,11,.1)", border:"1px solid rgba(245,158,11,.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <BookOpen size={16} color="#f59e0b" />
                      </div>

                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontWeight:800, fontSize:".95rem", color:"#fafafa", margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                          {group.courseTitle}
                        </p>
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:3, flexWrap:"wrap" }}>
                          <span style={{ fontSize:".72rem", color:"#71717a" }}>
                            {group.reviews.length} review{group.reviews.length !== 1 ? "s" : ""}
                          </span>
                          {groupAvg && (
                            <>
                              <span style={{ fontSize:".72rem", color:"#3f3f46" }}>·</span>
                              <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:".72rem", color:"#f59e0b", fontWeight:700 }}>
                                <Star size={10} style={{ fill:"#f59e0b", color:"#f59e0b" }} />
                                {groupAvg} avg
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <span style={{ padding:"4px 12px", borderRadius:100, background:"rgba(245,158,11,.12)", border:"1px solid rgba(245,158,11,.25)", fontSize:".75rem", fontWeight:800, color:"#f59e0b", flexShrink:0 }}>
                        {group.reviews.length}
                      </span>
                    </button>

                    {/* ── Expanded review list ── */}
                    {isOpen && (
                      <div style={{ borderTop:"1px solid rgba(245,158,11,.1)", padding:"0.8rem 1.3rem 1.1rem" }}>
                        {group.reviews.length === 0 ? (
                          <p style={{ textAlign:"center", color:"#52525b", fontSize:".84rem", padding:"1rem 0", margin:0 }}>
                            No reviews for this course yet.
                          </p>
                        ) : (
                          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                            {group.reviews.map((rev) => (
                              <div key={rev._id || rev.id} className="ar-rev-card"
                                style={{ background:"rgba(245,158,11,.03)", border:"1px solid rgba(245,158,11,.08)", borderRadius:12, padding:"0.9rem 1.1rem" }}>
                                <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                                  {/* Avatar */}
                                  <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(245,158,11,.1)", border:"1px solid rgba(245,158,11,.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                                    <User size={14} color="#f59e0b" />
                                  </div>

                                  {/* Body */}
                                  <div style={{ flex:1, minWidth:0 }}>
                                    <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:4 }}>
                                      <span style={{ fontWeight:700, fontSize:".86rem", color:"#fafafa" }}>
                                        {rev.name || "Anonymous"}
                                      </span>
                                      <span style={{ background:"rgba(245,158,11,.14)", border:"1px solid rgba(245,158,11,.24)", borderRadius:7, padding:"2px 8px", fontSize:".73rem", fontWeight:800, color:"#f59e0b" }}>
                                        {rev.rating}/5
                                      </span>
                                      <StarRow value={rev.rating} />
                                      <span style={{ fontSize:".7rem", color:"#71717a", fontWeight:600 }}>
                                        {RATING_LABEL[rev.rating]}
                                      </span>
                                      <span style={{ marginLeft:"auto", fontSize:".68rem", color:"#52525b", display:"inline-flex", alignItems:"center", gap:4 }}>
                                        <Calendar size={9} /> {fmtDate(rev.createdAt)}
                                      </span>
                                    </div>
                                    {rev.comment && (
                                      <p style={{ color:"#a1a1aa", fontSize:".84rem", lineHeight:1.7, margin:0 }}>
                                        {rev.comment}
                                      </p>
                                    )}
                                  </div>

                                  {/* Delete button */}
                                  <button
                                    className="ar-del-btn"
                                    onClick={() => setToDelete({ ...rev, courseId: group.courseId })}
                                    title="Delete review"
                                    style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:"rgba(239,68,68,.08)", border:"1px solid rgba(239,68,68,.18)", color:"rgba(239,68,68,.6)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Results count */}
          {!loading && allReviews.length > 0 && (
            <p style={{ textAlign:"right", fontSize:".72rem", color:"#3f3f46", marginTop:14 }}>
              Showing {filteredGroups.reduce((s,g)=>s+g.reviews.length,0)} of {allReviews.length} review{allReviews.length!==1?"s":""}
            </p>
          )}
        </div>
      </div>

      {/* ══ DELETE CONFIRMATION MODAL ══ */}
      {toDelete && (
        <div className="ar-overlay" onClick={() => !deleting && setToDelete(null)}>
          <div className="ar-modal" onClick={(e) => e.stopPropagation()}
            style={{ background:"#27272a", border:"1px solid rgba(239,68,68,.3)", borderRadius:18, padding:"2rem", maxWidth:440, width:"100%", boxShadow:"0 32px 72px rgba(0,0,0,.6)" }}>
            <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(239,68,68,.12)", border:"1px solid rgba(239,68,68,.25)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.2rem" }}>
              <AlertTriangle size={22} color="#f87171" />
            </div>
            <h2 style={{ fontSize:"1.25rem", fontWeight:900, color:"#fafafa", textAlign:"center", margin:"0 0 .6rem", letterSpacing:"-0.01em" }}>
              Delete Review?
            </h2>
            <p style={{ textAlign:"center", color:"#71717a", fontSize:".86rem", lineHeight:1.65, margin:"0 0 1.4rem" }}>
              This will permanently remove{" "}
              <strong style={{ color:"#fafafa" }}>{toDelete.name || "Anonymous"}'s</strong>{" "}
              review from <strong style={{ color:"#f59e0b" }}>{toDelete.courseTitle}</strong>.
              <br />This cannot be undone and will reflect immediately on the course page.
            </p>
            <div style={{ background:"rgba(0,0,0,.3)", border:"1px solid rgba(239,68,68,.15)", borderRadius:10, padding:"10px 14px", marginBottom:"1.4rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                <StarRow value={toDelete.rating} size={11} />
                <span style={{ fontSize:".75rem", color:"#f59e0b", fontWeight:700 }}>{toDelete.rating}/5</span>
              </div>
              <p style={{ color:"#71717a", fontSize:".82rem", lineHeight:1.5, margin:0, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
                {toDelete.comment || "No comment."}
              </p>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="ar-cancel-btn" onClick={() => !deleting && setToDelete(null)} disabled={deleting}
                style={{ flex:1, padding:"11px 0", borderRadius:10, cursor:"pointer", background:"rgba(245,158,11,.07)", border:"1px solid rgba(245,158,11,.2)", color:"#a1a1aa", fontSize:".88rem", fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>
                Cancel
              </button>
              <button className="ar-confirm-del" onClick={handleDelete} disabled={deleting}
                style={{ flex:1, padding:"11px 0", borderRadius:10, cursor:deleting?"wait":"pointer", background:"#dc2626", border:"none", color:"#fff", fontSize:".88rem", fontWeight:700, fontFamily:"'DM Sans',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:7, opacity:deleting?0.7:1 }}>
                <Trash2 size={14} /> {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ TOAST ══ */}
      {toast && (
        <div className="ar-toast" style={{ background:toast.type==="success"?"rgba(22,101,52,.95)":"rgba(127,29,29,.95)", border:`1px solid ${toast.type==="success"?"rgba(34,197,94,.35)":"rgba(239,68,68,.35)"}`, color:toast.type==="success"?"#4ade80":"#f87171", boxShadow:"0 8px 32px rgba(0,0,0,.4)" }}>
          {toast.type==="success"
            ? <Star size={14} style={{ fill:"#4ade80", color:"#4ade80" }} />
            : <AlertTriangle size={14} />}
          {toast.text}
        </div>
      )}
    </>
  );
};

export default AdminReviews;