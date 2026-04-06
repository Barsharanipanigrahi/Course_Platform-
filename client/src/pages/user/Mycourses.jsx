import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { BookOpen, Calendar, ArrowRight, Search, X } from "lucide-react";
import { Link } from "react-router-dom";

const CAT_EMOJI = {
  "Computer Science": "💻", "Mathematics": "📐", "Electronics": "⚡",
  "Data Science": "📊", "Sciences": "🔬", "Humanities": "🌍",
  "Cybersecurity": "🛡️", "Design & UX": "🎨",
};

const LEVEL_COLORS = {
  Beginner: "#22c55e", Intermediate: "#f97316", Advanced: "#ef4444",
};

const skeletonBase = {
  background: "linear-gradient(90deg,rgba(45,212,191,0.06) 25%,rgba(45,212,191,0.14) 50%,rgba(45,212,191,0.06) 75%)",
  backgroundSize: "200% 100%",
  animation: "mcShimmer 1.5s ease-in-out infinite",
  borderRadius: 8,
};

const Mycourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await api.get("/enrollment/my-courses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.data.status) setCourses(res.data.courses);
      } catch (err) { console.log(err); }
      finally { setLoading(false); }
    };
    fetchMyCourses();
  }, []);

  const filtered = courses.filter(enroll =>
    enroll.course?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes mcShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes mcFadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .mc-card { animation: mcFadeUp 0.35s ease both; }
        .mc-card:hover { transform: translateY(-5px) !important; box-shadow: 0 20px 48px rgba(0,0,0,0.4) !important; border-color: rgba(45,212,191,0.45) !important; }
        .mc-enroll-btn:hover { background: #ea6c0a !important; transform: translateY(-1px); }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0d3d39", fontFamily: "'DM Sans',sans-serif" }}>

        {/* ── Hero ── */}
        <div style={{ background: "#0f2027", padding: "5rem 1.5rem 3.5rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(249,115,22,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
          <div style={{ position: "absolute", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,0.1),transparent 65%)", top: -120, right: -80 }} />
          <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,212,191,0.07),transparent 65%)", bottom: -80, left: -60 }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#f97316", marginBottom: "0.5rem" }}>
              My Learning
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, color: "#fff", marginBottom: "0.5rem", lineHeight: 1.1 }}>
              My Enrolled Courses
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.97rem", marginBottom: "1.8rem" }}>
              Welcome back, <strong style={{ color: "#2dd4bf" }}>{user?.name}</strong>! Continue your learning journey.
            </p>

            {/* Search */}
            <div style={{ position: "relative", maxWidth: 420 }}>
              <Search size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#2dd4bf", pointerEvents: "none" }} />
              <input
                type="text"
                placeholder="Search your courses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: "100%", padding: "11px 15px 11px 40px", background: "rgba(45,212,191,0.08)", border: "1px solid rgba(45,212,191,0.25)", borderRadius: 9, color: "#e2faf8", fontSize: "0.9rem", fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box" }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#2dd4bf", cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div style={{ background: "#0a2e2b", borderTop: "1px solid rgba(45,212,191,0.15)", borderBottom: "1px solid rgba(45,212,191,0.15)", padding: "1.2rem 1.5rem" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: "2rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 900, color: "#f97316" }}>
                {loading ? "—" : courses.length}
              </div>
              <div style={{ fontSize: "0.68rem", color: "#2dd4bf", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Enrolled
              </div>
            </div>
            <div style={{ height: 36, width: 1, background: "rgba(45,212,191,0.15)" }} />
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
              {loading ? "Loading..." : filtered.length < courses.length
                ? `Showing ${filtered.length} of ${courses.length} courses`
                : `All ${courses.length} course${courses.length !== 1 ? "s" : ""}`
              }
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "2.5rem 1.5rem 4rem" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>

            {/* Skeleton */}
            {loading && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.2rem" }}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} style={{ background: "#134e4a", border: "1px solid rgba(45,212,191,0.1)", borderRadius: 15, overflow: "hidden" }}>
                    <div style={{ background: "#0f2027", padding: "1.3rem 1.5rem", display: "flex", gap: 12 }}>
                      <div style={{ ...skeletonBase, width: 40, height: 40, borderRadius: 10, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ ...skeletonBase, height: 13, width: "75%", marginBottom: 8 }} />
                        <div style={{ ...skeletonBase, height: 10, width: "50%" }} />
                      </div>
                    </div>
                    <div style={{ padding: "1rem 1.5rem" }}>
                      <div style={{ ...skeletonBase, height: 11, width: "100%", marginBottom: 7 }} />
                      <div style={{ ...skeletonBase, height: 11, width: "80%", marginBottom: 16 }} />
                      <div style={{ ...skeletonBase, height: 32, width: "100%", borderRadius: 8 }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && courses.length === 0 && (
              <div style={{ textAlign: "center", padding: "5rem 0" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem" }}>
                  <BookOpen size={28} color="#2dd4bf" />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 800, color: "#e2faf8", marginBottom: "0.5rem" }}>
                  No courses yet
                </h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  You haven't enrolled in any courses. Browse our catalogue to get started.
                </p>
                <Link to="/courses" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#f97316", color: "#fff", padding: "11px 22px", borderRadius: 9, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", boxShadow: "0 4px 16px rgba(249,115,22,0.35)" }}>
                  Browse Courses <ArrowRight size={14} />
                </Link>
              </div>
            )}

            {/* No results from search */}
            {!loading && courses.length > 0 && filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "3rem 0", color: "rgba(255,255,255,0.4)", fontSize: "0.95rem" }}>
                No courses match "<strong style={{ color: "#2dd4bf" }}>{search}</strong>"
              </div>
            )}

            {/* Course grid */}
            {!loading && filtered.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.2rem" }}>
                {filtered.map((enroll, idx) => {
                  const course = enroll.course;
                  if (!course) return null;
                  const emoji = course.category?.name ? (CAT_EMOJI[course.category.name] || "📖") : null;
                  const lvlColor = course.level ? (LEVEL_COLORS[course.level] || "#2dd4bf") : null;
                  const isFree = !course.price || course.price === "Free" || course.price === 0;

                  return (
                    <div
                      key={enroll._id}
                      className="mc-card"
                      style={{ animationDelay: `${idx * 60}ms`, background: "#134e4a", border: "1px solid rgba(45,212,191,0.2)", borderRadius: 15, overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 0.25s,box-shadow 0.25s,border-color 0.25s" }}
                    >
                      {/* Card top */}
                      <div style={{ background: "#0f2027", padding: "1.3rem 1.5rem", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>
                          {emoji ? emoji : <BookOpen size={18} color="#2dd4bf" />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#e2faf8", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {course.title}
                          </div>
                          {course.category?.name && (
                            <div style={{ fontSize: "0.72rem", color: "#2dd4bf", marginTop: 3, fontWeight: 600 }}>
                              {course.category.name}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card body */}
                      <div style={{ padding: "1rem 1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                        {course.description && (
                          <p style={{ color: "rgba(226,250,248,0.55)", fontSize: "0.83rem", lineHeight: 1.65, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", margin: 0 }}>
                            {course.description}
                          </p>
                        )}

                        {/* Pills */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {course.level && (
                            <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "2px 9px", borderRadius: 100, background: `${lvlColor}18`, color: lvlColor, border: `1px solid ${lvlColor}30` }}>
                              {course.level}
                            </span>
                          )}
                          <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "2px 9px", borderRadius: 100, background: isFree ? "rgba(34,197,94,0.12)" : "rgba(45,212,191,0.1)", color: isFree ? "#22c55e" : "#2dd4bf", border: `1px solid ${isFree ? "rgba(34,197,94,0.25)" : "rgba(45,212,191,0.2)"}` }}>
                            {isFree ? "Free" : `₹${course.price}`}
                          </span>
                        </div>

                        {/* Enrolled date */}
                        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", marginTop: "auto" }}>
                          <Calendar size={10} />
                          Enrolled {new Date(enroll.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </div>

                        {/* CTA */}
                        <Link
                          to={`/course/${course._id}`}
                          className="mc-enroll-btn"
                          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#f97316", color: "#fff", padding: "9px 0", borderRadius: 8, fontWeight: 700, fontSize: "0.84rem", textDecoration: "none", boxShadow: "0 4px 14px rgba(249,115,22,0.3)", transition: "background 0.2s,transform 0.15s" }}
                        >
                          Continue Learning <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Mycourses;