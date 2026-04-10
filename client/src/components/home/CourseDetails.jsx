import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { BookOpen, IndianRupee, ArrowLeft, Tag, BarChart2, Star, Send, User } from "lucide-react";

const LEVEL_COLORS = { Beginner: "#22c55e", Intermediate: "#f97316", Advanced: "#ef4444" };
const CAT_EMOJI = {
  "Computer Science": "💻", "Mathematics": "📐", "Electronics": "⚡",
  "Data Science": "📊", "Sciences": "🔬", "Humanities": "🌍",
  "Cybersecurity": "🛡️", "Design & UX": "🎨",
};

const skeletonBase = {
  background: "linear-gradient(90deg,rgba(45,212,191,0.06) 25%,rgba(45,212,191,0.14) 50%,rgba(45,212,191,0.06) 75%)",
  backgroundSize: "200% 100%",
  animation: "cdShimmer 1.5s ease-in-out infinite",
  borderRadius: 8,
};

const StarDisplay = ({ value, size = 14 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={size}
        style={{ fill: s <= value ? "#f97316" : "transparent", color: s <= value ? "#f97316" : "rgba(45,212,191,0.25)" }}
      />
    ))}
  </div>
);

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course,         setCourse]         = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [enrolling,      setEnrolling]      = useState(false);
  const [reviews,        setReviews]        = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [submitting,     setSubmitting]     = useState(false);
  const [hoverStar,      setHoverStar]      = useState(0);
  const [newRating,      setNewRating]      = useState(0);
  const [newComment,     setNewComment]     = useState("");
  const [formMsg,        setFormMsg]        = useState({ type: "", text: "" });

  const fetchCourse = async () => {
    try {
      const res = await api.get("/course/get");
      if (res.data.status) setCourse(res.data.courses.find((c) => c._id === id));
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const res = await api.get(`/course/reviews/${id}`);
      if (res.data.status) setReviews(res.data.reviews || []);
    } catch (err) { console.log(err); }
    finally { setReviewsLoading(false); }
  };

  useEffect(() => { fetchCourse(); fetchReviews(); }, []);

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) { alert("Please login first to enroll!"); return; }
    setEnrolling(true);
    try {
      const res = await api.post("/enrollment/enroll", { courseId }, { headers: { Authorization: `Bearer ${token}` } });
      alert(res.data.message);
    } catch (err) { console.log(err); alert("Enrollment failed"); }
    finally { setEnrolling(false); }
  };

  const handleSubmitReview = async () => {
    setFormMsg({ type: "", text: "" });
    const token = localStorage.getItem("token");
    if (!token)             return setFormMsg({ type: "error", text: "Please login to submit a review." });
    if (newRating === 0)    return setFormMsg({ type: "error", text: "Please select a star rating." });
    if (!newComment.trim()) return setFormMsg({ type: "error", text: "Please write a comment." });

    setSubmitting(true);
    try {
      const res = await api.post(
        "/course/reviews/add",
        { courseId: id, rating: newRating, comment: newComment.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status) {
        setFormMsg({ type: "success", text: "Review submitted successfully!" });
        setNewRating(0);
        setNewComment("");
        fetchReviews();
      } else {
        setFormMsg({ type: "error", text: res.data.message || "Failed to submit." });
      }
    } catch (err) {
      setFormMsg({ type: "error", text: err?.response?.data?.message || "Failed to submit." });
    } finally { setSubmitting(false); }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";

  const catEmoji = course?.category?.name ? (CAT_EMOJI[course.category.name] || "📖") : null;
  const lvlColor = course?.level ? (LEVEL_COLORS[course.level] || "#2dd4bf") : null;
  const isFree   = !course?.price || course.price === "Free" || course.price === 0;

  return (
    <>
      <style>{`
        @keyframes cdShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes cdFadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .cd-enroll-btn { transition:background .2s,transform .15s,box-shadow .2s; }
        .cd-enroll-btn:hover:not(:disabled) { background:#ea6c0a !important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(249,115,22,.4) !important; }
        .cd-back-btn { transition:color .15s,background .15s; }
        .cd-back-btn:hover { background:rgba(45,212,191,.1) !important; color:#2dd4bf !important; }
        .cd-star { cursor:pointer; transition:transform .12s; }
        .cd-star:hover { transform:scale(1.2); }
        .cd-textarea { transition:border-color .2s,box-shadow .2s; }
        .cd-textarea:focus { outline:none; border-color:rgba(45,212,191,.5) !important; box-shadow:0 0 0 3px rgba(45,212,191,.08); }
        .cd-submit-btn { transition:background .2s,transform .15s; }
        .cd-submit-btn:hover:not(:disabled) { background:#0f766e !important; transform:translateY(-1px); }
        .cd-rev-card { transition:background .18s; }
        .cd-rev-card:hover { background:rgba(45,212,191,.06) !important; }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#0d3d39", fontFamily:"'DM Sans',sans-serif", padding:"3rem 1.5rem 5rem" }}>

        {/* Back */}
        <div style={{ maxWidth:780, margin:"0 auto 1.5rem" }}>
          <button className="cd-back-btn" onClick={() => navigate(-1)}
            style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"7px 14px", borderRadius:9, background:"rgba(45,212,191,.07)", border:"1px solid rgba(45,212,191,.18)", color:"rgba(226,250,248,.6)", fontSize:".82rem", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
            <ArrowLeft size={14}/> Back to Courses
          </button>
        </div>

        {/* Skeleton */}
        {loading && (
          <div style={{ maxWidth:780, margin:"0 auto", background:"#134e4a", border:"1px solid rgba(45,212,191,.2)", borderRadius:20, overflow:"hidden", boxShadow:"0 24px 64px rgba(0,0,0,.4)" }}>
            <div style={{ background:"#0f2027", padding:"2rem 2.2rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20 }}>
                <div style={{ ...skeletonBase, width:56, height:56, borderRadius:14, flexShrink:0 }}/>
                <div style={{ flex:1 }}>
                  <div style={{ ...skeletonBase, height:22, width:"65%", marginBottom:10 }}/>
                  <div style={{ ...skeletonBase, height:13, width:"40%" }}/>
                </div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <div style={{ ...skeletonBase, height:24, width:90, borderRadius:100 }}/>
                <div style={{ ...skeletonBase, height:24, width:80, borderRadius:100 }}/>
              </div>
            </div>
            <div style={{ padding:"2rem 2.2rem" }}>
              {[100,90,75,85,60].map((w,i) => <div key={i} style={{ ...skeletonBase, height:13, width:`${w}%`, marginBottom:12 }}/>)}
              <div style={{ marginTop:32, display:"flex", gap:12 }}>
                <div style={{ ...skeletonBase, height:36, width:100 }}/>
                <div style={{ ...skeletonBase, height:48, width:160, borderRadius:12 }}/>
              </div>
            </div>
          </div>
        )}

        {/* Not found */}
        {!loading && !course && (
          <div style={{ maxWidth:780, margin:"0 auto", textAlign:"center", padding:"5rem 0", color:"rgba(226,250,248,.45)" }}>
            Course not found.
          </div>
        )}

        {/* Course + Reviews */}
        {!loading && course && (
          <div style={{ maxWidth:780, margin:"0 auto", animation:"cdFadeUp .4s ease both" }}>

            {/* ── Main course card ── */}
            <div style={{ background:"#134e4a", border:"1px solid rgba(45,212,191,.2)", borderRadius:20, overflow:"hidden", boxShadow:"0 24px 64px rgba(0,0,0,.4)", marginBottom:"1.6rem" }}>

              {/* Top banner */}
              <div style={{ background:"#0f2027", padding:"2rem 2.2rem", borderBottom:"1px solid rgba(45,212,191,.12)" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:16 }}>
                  <div style={{ width:56, height:56, borderRadius:14, background:"rgba(45,212,191,.12)", border:"1px solid rgba(45,212,191,.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:22 }}>
                    {catEmoji || <BookOpen size={22} color="#2dd4bf"/>}
                  </div>
                  <div style={{ flex:1 }}>
                    <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.5rem,3.5vw,2.1rem)", fontWeight:900, color:"#e2faf8", lineHeight:1.15, marginBottom:8 }}>
                      {course.title}
                    </h1>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom: avgRating ? 10 : 0 }}>
                      {course.category?.name && (
                        <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:".72rem", fontWeight:700, padding:"3px 11px", borderRadius:100, background:"rgba(45,212,191,.12)", color:"#2dd4bf", border:"1px solid rgba(45,212,191,.25)" }}>
                          <Tag size={10}/> {course.category.name}
                        </span>
                      )}
                      {course.level && (
                        <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:".72rem", fontWeight:700, padding:"3px 11px", borderRadius:100, background:`${lvlColor}18`, color:lvlColor, border:`1px solid ${lvlColor}30` }}>
                          <BarChart2 size={10}/> {course.level}
                        </span>
                      )}
                    </div>
                    {avgRating && (
                      <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(249,115,22,.1)", border:"1px solid rgba(249,115,22,.22)", borderRadius:100, padding:"4px 12px" }}>
                        <StarDisplay value={Math.round(Number(avgRating))} size={12}/>
                        <span style={{ fontSize:".78rem", fontWeight:700, color:"#f97316" }}>{avgRating}</span>
                        <span style={{ fontSize:".7rem", color:"rgba(226,250,248,.35)" }}>({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding:"2rem 2.2rem" }}>
                <p style={{ color:"rgba(226,250,248,.65)", fontSize:".97rem", lineHeight:1.8, marginBottom:"2rem" }}>
                  {course.description || "No description available."}
                </p>
                <div style={{ height:1, background:"rgba(45,212,191,.1)", marginBottom:"1.8rem" }}/>
                <div style={{ display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <IndianRupee size={22} color={isFree ? "#22c55e" : "#2dd4bf"}/>
                    <span style={{ fontSize:"2rem", fontWeight:900, color:isFree ? "#22c55e" : "#2dd4bf", lineHeight:1 }}>
                      {isFree ? "Free" : course.price}
                    </span>
                  </div>
                  <button className="cd-enroll-btn" onClick={() => handleEnroll(course._id)} disabled={enrolling}
                    style={{ padding:"13px 32px", borderRadius:12, background:"#f97316", color:"#fff", fontSize:".95rem", fontWeight:700, border:"none", cursor:enrolling ? "wait" : "pointer", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 8px 24px rgba(249,115,22,.3)", opacity:enrolling ? .7 : 1 }}>
                    {enrolling ? "Enrolling…" : "Enroll Now"}
                  </button>
                </div>
              </div>
            </div>

            {/* ════════════════════════
                REVIEWS SECTION
            ════════════════════════ */}
            <div style={{ background:"#134e4a", border:"1px solid rgba(45,212,191,.2)", borderRadius:20, overflow:"hidden", boxShadow:"0 24px 64px rgba(0,0,0,.4)" }}>

              {/* Header */}
              <div style={{ background:"#0f2027", padding:"1.3rem 2.2rem", borderBottom:"1px solid rgba(45,212,191,.12)", display:"flex", alignItems:"center", gap:10 }}>
                <Star size={17} style={{ fill:"#f97316", color:"#f97316" }}/>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.15rem", fontWeight:800, color:"#e2faf8", margin:0 }}>
                  Student Reviews
                </h2>
                {avgRating && (
                  <span style={{ marginLeft:"auto", display:"inline-flex", alignItems:"center", gap:6, fontSize:".8rem", fontWeight:700, color:"#f97316" }}>
                    <StarDisplay value={Math.round(Number(avgRating))} size={13}/>
                    {avgRating} / 5
                  </span>
                )}
              </div>

              <div style={{ padding:"1.8rem 2.2rem" }}>

                {/* ── Add Review Form ── */}
                <div style={{ background:"#0f2027", borderRadius:14, padding:"1.4rem 1.5rem", marginBottom:"1.8rem", border:"1px solid rgba(45,212,191,.12)" }}>
                  <p style={{ fontSize:".72rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#2dd4bf", margin:"0 0 1rem" }}>
                    Leave a Review
                  </p>

                  {/* Star picker */}
                  <div style={{ marginBottom:"1rem" }}>
                    <div style={{ fontSize:".76rem", color:"rgba(226,250,248,.4)", marginBottom:6 }}>Your Rating</div>
                    <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={28} className="cd-star"
                          onMouseEnter={() => setHoverStar(s)}
                          onMouseLeave={() => setHoverStar(0)}
                          onClick={() => setNewRating(s)}
                          style={{ fill: s <= (hoverStar || newRating) ? "#f97316" : "transparent", color: s <= (hoverStar || newRating) ? "#f97316" : "rgba(45,212,191,.25)", transition:"all .15s" }}
                        />
                      ))}
                      {newRating > 0 && (
                        <span style={{ marginLeft:8, fontSize:".78rem", color:"rgba(226,250,248,.4)" }}>
                          {["","Poor","Fair","Good","Very Good","Excellent"][newRating]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Comment */}
                  <textarea className="cd-textarea" value={newComment} onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your experience with this course…" rows={3}
                    style={{ width:"100%", resize:"vertical", background:"rgba(45,212,191,.05)", border:"1px solid rgba(45,212,191,.18)", borderRadius:10, color:"#e2faf8", fontSize:".88rem", fontFamily:"'DM Sans',sans-serif", padding:"11px 13px", boxSizing:"border-box", lineHeight:1.7, marginBottom:"1rem" }}
                  />

                  {/* Feedback */}
                  {formMsg.text && (
                    <div style={{ borderRadius:8, padding:"8px 13px", fontSize:".8rem", marginBottom:".8rem",
                      background: formMsg.type === "error" ? "rgba(239,68,68,.1)" : "rgba(34,197,94,.1)",
                      border: `1px solid ${formMsg.type === "error" ? "rgba(239,68,68,.25)" : "rgba(34,197,94,.25)"}`,
                      color: formMsg.type === "error" ? "#f87171" : "#4ade80",
                    }}>
                      {formMsg.text}
                    </div>
                  )}

                  <button className="cd-submit-btn" onClick={handleSubmitReview} disabled={submitting}
                    style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"10px 22px", borderRadius:10, background:"#0d9488", color:"#fff", fontSize:".86rem", fontWeight:700, border:"none", cursor:submitting ? "wait" : "pointer", fontFamily:"'DM Sans',sans-serif", opacity:submitting ? .7 : 1 }}>
                    <Send size={13}/> {submitting ? "Submitting…" : "Submit Review"}
                  </button>
                </div>

                {/* ── Reviews list ── */}
                {reviewsLoading ? (
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {[1,2,3].map((i) => <div key={i} style={{ ...skeletonBase, height:88, borderRadius:12 }}/>)}
                  </div>
                ) : reviews.length === 0 ? (
                  <div style={{ textAlign:"center", padding:"2.5rem 1rem" }}>
                    <Star size={34} style={{ color:"rgba(45,212,191,.18)", display:"block", margin:"0 auto 10px" }}/>
                    <p style={{ color:"rgba(226,250,248,.3)", fontSize:".88rem", margin:0 }}>
                      No reviews yet — be the first to share your experience!
                    </p>
                  </div>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                    {reviews.map((rev, idx) => (
                      <div key={rev._id || idx} className="cd-rev-card"
                        style={{ background:"rgba(45,212,191,.03)", border:"1px solid rgba(45,212,191,.1)", borderRadius:14, padding:"1.1rem 1.3rem" }}>
                        <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                          {/* Avatar */}
                          <div style={{ width:38, height:38, borderRadius:"50%", background:"rgba(45,212,191,.15)", border:"1px solid rgba(45,212,191,.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            <User size={15} color="#2dd4bf"/>
                          </div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:5 }}>
                              <span style={{ fontWeight:700, fontSize:".88rem", color:"#e2faf8" }}>
                                {rev.name || "Anonymous"}
                              </span>
                              <StarDisplay value={rev.rating} size={12}/>
                              <span style={{ fontSize:".7rem", color:"rgba(226,250,248,.3)", marginLeft:"auto" }}>
                                {fmtDate(rev.createdAt)}
                              </span>
                            </div>
                            {rev.comment && (
                              <p style={{ color:"rgba(226,250,248,.6)", fontSize:".86rem", lineHeight:1.7, margin:0 }}>
                                {rev.comment}
                              </p>
                            )}
                          </div>
                          {/* Badge */}
                          <div style={{ background:"rgba(249,115,22,.12)", border:"1px solid rgba(249,115,22,.22)", borderRadius:8, padding:"3px 9px", fontSize:".8rem", fontWeight:800, color:"#f97316", flexShrink:0 }}>
                            {rev.rating}/5
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
};

export default CourseDetails;