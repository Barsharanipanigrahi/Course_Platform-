import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { BookOpen, IndianRupee, ArrowLeft, Tag, BarChart2 } from "lucide-react";

const LEVEL_COLORS = { Beginner: "#22c55e", Intermediate: "#f97316", Advanced: "#ef4444" };
const CAT_EMOJI = {
  "Computer Science": "💻", "Mathematics": "📐", "Electronics": "⚡",
  "Data Science": "📊", "Sciences": "🔬", "Humanities": "🌍",
  "Cybersecurity": "🛡️", "Design & UX": "🎨",
};

/* ── Skeleton shimmer ── */
const skeletonBase = {
  background: "linear-gradient(90deg,rgba(45,212,191,0.06) 25%,rgba(45,212,191,0.14) 50%,rgba(45,212,191,0.06) 75%)",
  backgroundSize: "200% 100%",
  animation: "cdShimmer 1.5s ease-in-out infinite",
  borderRadius: 8,
};

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  const fetchCourse = async () => {
    try {
      const res = await api.get("/course/get");
      if (res.data.status) {
        const found = res.data.courses.find((c) => c._id === id);
        setCourse(found);
      }
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCourse(); }, []);

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) { alert("Please login first to enroll!"); return; }
    setEnrolling(true);
    try {
      const res = await api.post(
        "/enrollment/enroll",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("Enrollment failed");
    } finally { setEnrolling(false); }
  };

  const catEmoji  = course?.category?.name ? (CAT_EMOJI[course.category.name] || "📖") : null;
  const lvlColor  = course?.level ? (LEVEL_COLORS[course.level] || "#2dd4bf") : null;
  const isFree    = !course?.price || course.price === "Free" || course.price === 0;

  return (
    <>
      <style>{`
        @keyframes cdShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes cdFadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .cd-enroll-btn { transition: background 0.2s, transform 0.15s, box-shadow 0.2s; }
        .cd-enroll-btn:hover:not(:disabled) { background:#ea6c0a !important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(249,115,22,0.4) !important; }
        .cd-back-btn { transition: color 0.15s, background 0.15s; }
        .cd-back-btn:hover { background:rgba(45,212,191,0.1) !important; color:#2dd4bf !important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0d3d39", fontFamily: "'DM Sans',sans-serif", padding: "3rem 1.5rem 5rem" }}>

        {/* Back button */}
        <div style={{ maxWidth: 780, margin: "0 auto 1.5rem" }}>
          <button
            className="cd-back-btn"
            onClick={() => navigate(-1)}
            style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 9, background: "rgba(45,212,191,0.07)", border: "1px solid rgba(45,212,191,0.18)", color: "rgba(226,250,248,0.6)", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}
          >
            <ArrowLeft size={14} /> Back to Courses
          </button>
        </div>

        {/* ── Skeleton ── */}
        {loading && (
          <div style={{ maxWidth: 780, margin: "0 auto", background: "#134e4a", border: "1px solid rgba(45,212,191,0.2)", borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
            {/* top banner skeleton */}
            <div style={{ background: "#0f2027", padding: "2rem 2.2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div style={{ ...skeletonBase, width: 56, height: 56, borderRadius: 14, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ ...skeletonBase, height: 22, width: "65%", marginBottom: 10 }} />
                  <div style={{ ...skeletonBase, height: 13, width: "40%" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ ...skeletonBase, height: 24, width: 90, borderRadius: 100 }} />
                <div style={{ ...skeletonBase, height: 24, width: 80, borderRadius: 100 }} />
              </div>
            </div>
            {/* body skeleton */}
            <div style={{ padding: "2rem 2.2rem" }}>
              {[100, 90, 75, 85, 60].map((w, i) => (
                <div key={i} style={{ ...skeletonBase, height: 13, width: `${w}%`, marginBottom: 12 }} />
              ))}
              <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ ...skeletonBase, height: 36, width: 100 }} />
                <div style={{ ...skeletonBase, height: 48, width: 160, borderRadius: 12 }} />
              </div>
            </div>
          </div>
        )}

        {/* ── Not found ── */}
        {!loading && !course && (
          <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", padding: "5rem 0", color: "rgba(226,250,248,0.45)", fontSize: "1rem" }}>
            Course not found.
          </div>
        )}

        {/* ── Course card ── */}
        {!loading && course && (
          <div style={{ maxWidth: 780, margin: "0 auto", animation: "cdFadeUp 0.4s ease both" }}>
            <div style={{ background: "#134e4a", border: "1px solid rgba(45,212,191,0.2)", borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>

              {/* ── Top banner ── */}
              <div style={{ background: "#0f2027", padding: "2rem 2.2rem", borderBottom: "1px solid rgba(45,212,191,0.12)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  {/* Icon */}
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22 }}>
                    {catEmoji ? catEmoji : <BookOpen size={22} color="#2dd4bf" />}
                  </div>
                  <div>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,3.5vw,2.1rem)", fontWeight: 900, color: "#e2faf8", lineHeight: 1.15, marginBottom: 8 }}>
                      {course.title}
                    </h1>
                    {/* Pills */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {course.category?.name && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.72rem", fontWeight: 700, padding: "3px 11px", borderRadius: 100, background: "rgba(45,212,191,0.12)", color: "#2dd4bf", border: "1px solid rgba(45,212,191,0.25)" }}>
                          <Tag size={10} /> {course.category.name}
                        </span>
                      )}
                      {course.level && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.72rem", fontWeight: 700, padding: "3px 11px", borderRadius: 100, background: `${lvlColor}18`, color: lvlColor, border: `1px solid ${lvlColor}30` }}>
                          <BarChart2 size={10} /> {course.level}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Body ── */}
              <div style={{ padding: "2rem 2.2rem" }}>
                <p style={{ color: "rgba(226,250,248,0.65)", fontSize: "0.97rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                  {course.description || "No description available."}
                </p>

                {/* Divider */}
                <div style={{ height: 1, background: "rgba(45,212,191,0.1)", marginBottom: "1.8rem" }} />

                {/* Price + CTA */}
                <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <IndianRupee size={22} color={isFree ? "#22c55e" : "#2dd4bf"} />
                    <span style={{ fontSize: "2rem", fontWeight: 900, color: isFree ? "#22c55e" : "#2dd4bf", lineHeight: 1 }}>
                      {isFree ? "Free" : course.price}
                    </span>
                  </div>

                  <button
                    className="cd-enroll-btn"
                    onClick={() => handleEnroll(course._id)}
                    disabled={enrolling}
                    style={{
                      padding: "13px 32px", borderRadius: 12,
                      background: "#f97316", color: "#fff",
                      fontSize: "0.95rem", fontWeight: 700,
                      border: "none", cursor: enrolling ? "wait" : "pointer",
                      fontFamily: "'DM Sans',sans-serif",
                      boxShadow: "0 8px 24px rgba(249,115,22,0.3)",
                      opacity: enrolling ? 0.7 : 1,
                    }}
                  >
                    {enrolling ? "Enrolling…" : "Enroll Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseDetails;