import { useEffect, useState } from "react";
import { ClipboardList, Search, X, BookOpen, Calendar, Mail, Award } from "lucide-react";
import api from "../../services/api";

/* ── Skeleton shimmer ─────────────────────────────────────── */
const skeletonBase = {
  background: "linear-gradient(90deg, #323235 25%, #3a3a3e 50%, #323235 75%)",
  backgroundSize: "200% 100%",
  animation: "skeletonShimmer 1.6s ease-in-out infinite",
  borderRadius: 6,
};

/* ── Skeleton Row ─────────────────────────────────────────── */
const SkeletonRow = ({ i }) => (
  <tr style={{
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
  }}>
    <td style={{ padding: "1rem" }}><div style={{ ...skeletonBase, width: 24, height: 13 }} /></td>
    <td style={{ padding: "1rem" }}><div style={{ ...skeletonBase, width: 120, height: 13 }} /></td>
    <td style={{ padding: "1rem" }}><div style={{ ...skeletonBase, width: 170, height: 12 }} /></td>
    <td style={{ padding: "1rem" }}><div style={{ ...skeletonBase, width: 150, height: 12 }} /></td>
    <td style={{ padding: "1rem" }}><div style={{ ...skeletonBase, width: 100, height: 12 }} /></td>
    <td style={{ padding: "1rem" }}><div style={{ ...skeletonBase, width: 60, height: 22, borderRadius: 100 }} /></td>
  </tr>
);

/* ── Skeleton Drawer Card ─────────────────────────────────── */
const SkeletonCard = () => (
  <div style={{
    background: "#1f1f23",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  }}>
    <div style={{ ...skeletonBase, height: 13, width: "70%" }} />
    <div style={{ ...skeletonBase, height: 10, width: "45%" }} />
    <div style={{ ...skeletonBase, height: 10, width: "55%" }} />
    <div style={{ ...skeletonBase, height: 20, width: 60, borderRadius: 100, marginTop: 4 }} />
  </div>
);

/* ── Student Drawer ───────────────────────────────────────── */
const StudentDrawer = ({ student, onClose, onStatusChange }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student) return;
    setLoading(true);
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/enrollment/user/${student.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.enrollments || res.data;
        setCourses(Array.isArray(data) ? data : []);
      } catch (_) {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [student]);

  const formatDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  };

  const handleDrawerStatusToggle = async (e, course) => {
    e.stopPropagation();
    const newStatus = course.status === "active" ? "inactive" : "active";
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/enrollment/${course._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourses((prev) =>
        prev.map((c) => c._id === course._id ? { ...c, status: newStatus } : c)
      );
      // Sync status back to parent table
      onStatusChange(course._id, newStatus);
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  if (!student) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(3px)",
          zIndex: 40,
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Drawer Panel */}
      <div style={{
        position: "fixed", top: 0, right: 0,
        width: 420, height: "100vh",
        background: "#18181b",
        borderLeft: "1px solid rgba(245,158,11,0.15)",
        boxShadow: "-20px 0 60px rgba(0,0,0,0.6)",
        zIndex: 50,
        display: "flex", flexDirection: "column",
        animation: "slideIn 0.25s cubic-bezier(0.4,0,0.2,1)",
        overflowY: "auto",
      }}>

        {/* Drawer Header */}
        <div style={{
          padding: "1.5rem",
          borderBottom: "1px solid rgba(245,158,11,0.1)",
          background: "rgba(245,158,11,0.04)",
          position: "sticky", top: 0, zIndex: 1,
          backdropFilter: "blur(10px)",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <p style={{
                fontSize: "0.65rem", fontWeight: 700, color: "#f59e0b",
                textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6,
              }}>
                Student Dashboard
              </p>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fafafa", margin: 0 }}>
                {student.userName}
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, padding: 6, cursor: "pointer",
                color: "#a1a1aa", display: "flex", alignItems: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
            >
              <X size={16} />
            </button>
          </div>

          {/* Student Info Pills */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Mail size={13} style={{ color: "#71717a", flexShrink: 0 }} />
              <span style={{ fontSize: "0.78rem", color: "#a3a3a3" }}>{student.userEmail}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <BookOpen size={13} style={{ color: "#71717a", flexShrink: 0 }} />
              <span style={{ fontSize: "0.78rem", color: "#a3a3a3" }}>
                {loading ? "Loading..." : `${courses.length} course${courses.length !== 1 ? "s" : ""} enrolled`}
              </span>
            </div>
          </div>

          {/* Stats Row */}
          {!loading && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
              {[
                { label: "Total Courses", value: courses.length, color: "#f59e0b" },
                {
                  label: "Active",
                  value: courses.filter((c) => (c.status || "active") === "active").length,
                  color: "#34d399",
                },
              ].map(({ label, value, color }) => (
                <div key={label} style={{
                  background: "#27272a",
                  border: `1px solid ${color}20`,
                  borderRadius: 10, padding: "0.75rem",
                  textAlign: "center",
                }}>
                  <p style={{ fontSize: "1.4rem", fontWeight: 900, color, margin: 0 }}>{value}</p>
                  <p style={{
                    fontSize: "0.65rem", color: "#71717a", marginTop: 2,
                    fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em",
                  }}>{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Course Cards */}
        <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{
            fontSize: "0.7rem", fontWeight: 700, color: "#52525b",
            textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4,
          }}>
            Enrolled Courses
          </p>

          {loading ? (
            [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
          ) : courses.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "2.5rem 1rem",
              color: "#52525b", fontSize: "0.875rem",
              border: "1px dashed rgba(255,255,255,0.08)",
              borderRadius: 12,
            }}>
              No courses enrolled yet
            </div>
          ) : (
            courses.map((c, i) => {
              const accentColors = ["#f59e0b", "#34d399", "#60a5fa", "#a78bfa", "#f87171"];
              const accent = accentColors[i % accentColors.length];
              const status = c.status || "active";
              const title = c.course?.title || c.courseTitle || "Untitled Course";
              const enrolledAt = c.createdAt || c.enrolledAt || null;

              return (
                <div
                  key={c._id || i}
                  style={{
                    background: "#27272a",
                    border: `1px solid ${accent}18`,
                    borderRadius: 12,
                    padding: "1rem",
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${accent}40`;
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${accent}18`;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Glow blob */}
                  <div style={{
                    position: "absolute", top: -20, right: -20,
                    width: 80, height: 80, borderRadius: "50%",
                    background: accent, opacity: 0.05, pointerEvents: "none",
                  }} />

                  {/* Course number badge */}
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    width: 24, height: 24, borderRadius: "50%",
                    background: `${accent}18`,
                    border: `1px solid ${accent}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.6rem", fontWeight: 800, color: accent,
                  }}>
                    {i + 1}
                  </div>

                  {/* Title */}
                  <p style={{
                    fontSize: "0.9rem", fontWeight: 700,
                    color: "#fafafa", marginBottom: 8,
                    paddingRight: 32, lineHeight: 1.3,
                  }}>
                    {title}
                  </p>

                  {/* Meta */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Calendar size={11} style={{ color: "#71717a", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.72rem", color: "#71717a" }}>
                        Enrolled {formatDate(enrolledAt)}
                      </span>
                    </div>
                    {c.course?.category && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Award size={11} style={{ color: "#71717a", flexShrink: 0 }} />
                        <span style={{ fontSize: "0.72rem", color: "#71717a" }}>
                          {c.course.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Status toggle badge */}
                  <div style={{ marginTop: 10 }}>
                    <button
                      onClick={(e) => handleDrawerStatusToggle(e, c)}
                      title="Click to toggle status"
                      style={{
                        fontSize: "0.62rem", fontWeight: 700,
                        padding: "3px 10px", borderRadius: 100,
                        textTransform: "capitalize", cursor: "pointer",
                        background: status === "active"
                          ? "rgba(52,211,153,0.12)"
                          : "rgba(248,113,113,0.12)",
                        color: status === "active" ? "#34d399" : "#f87171",
                        border: `1px solid ${status === "active" ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}`,
                        transition: "all 0.2s",
                      }}
                    >
                      {status}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

/* ══════════════════════════════════════════════════════════ */
/*  Main Page                                                 */
/* ══════════════════════════════════════════════════════════ */
const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchAllEnrollments = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const usersRes = await api.get("/user/get", { headers });
        const users = usersRes.data.users || usersRes.data || [];

        const allEnrollments = [];
        await Promise.allSettled(
          users.map(async (user) => {
            try {
              const res = await api.get(`/enrollment/user/${user._id}`, { headers });
              const data = res.data.enrollments || res.data;
              if (Array.isArray(data)) {
                data.forEach((enrollment) => {
                  allEnrollments.push({
                    _id:         enrollment._id,
                    userId:      user._id,
                    userName:    user.name,
                    userEmail:   user.email,
                    courseTitle: enrollment.course?.title || "N/A",
                    enrolledAt:  enrollment.createdAt || enrollment.enrolledAt || null,
                    status:      enrollment.status || "active",
                  });
                });
              }
            } catch (_) {}
          })
        );

        allEnrollments.sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt));
        setEnrollments(allEnrollments);
      } catch (err) {
        console.error("Fetch Enrollments Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEnrollments();
  }, []);

  const handleStatusToggle = async (e, enrollment) => {
    e.stopPropagation();
    const newStatus = enrollment.status === "active" ? "inactive" : "active";
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/enrollment/${enrollment._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEnrollments((prev) =>
        prev.map((en) =>
          en._id === enrollment._id ? { ...en, status: newStatus } : en
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // Called from drawer to sync status back to table
  const handleDrawerStatusSync = (enrollmentId, newStatus) => {
    setEnrollments((prev) =>
      prev.map((en) =>
        en._id === enrollmentId ? { ...en, status: newStatus } : en
      )
    );
  };

  const filtered = enrollments.filter((e) =>
    e.userName.toLowerCase().includes(search.toLowerCase()) ||
    e.userEmail.toLowerCase().includes(search.toLowerCase()) ||
    e.courseTitle.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  };

  return (
    <div style={{
      minHeight: "100vh", padding: "2rem",
      background: "#18181b", fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @keyframes skeletonShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        .enroll-search::placeholder { color: #52525b; }
        .enroll-search:focus { outline: none; border-color: rgba(245,158,11,0.5) !important; }
        .enroll-tr { transition: background 0.15s; cursor: pointer; }
        .enroll-tr:hover { background: rgba(245,158,11,0.06) !important; }
        .status-btn:hover { filter: brightness(1.2); transform: scale(1.04); }
      `}</style>

      {/* ── Header ── */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{
          fontSize: "0.68rem", fontWeight: 700, color: "#f59e0b",
          textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 4,
        }}>
          Management
        </p>
        <h1 style={{
          fontSize: "1.875rem", fontWeight: 900, color: "#fafafa",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <ClipboardList size={26} style={{ color: "#f59e0b" }} /> Enrollments
        </h1>
        <p style={{ fontSize: "0.8rem", color: "#52525b", marginTop: 4 }}>
          {loading
            ? "Loading..."
            : `${enrollments.length} enrollment${enrollments.length !== 1 ? "s" : ""} total — click any row to view student dashboard`}
        </p>
      </div>

      {/* ── Search Bar ── */}
      <div style={{ marginBottom: "1.25rem", position: "relative", maxWidth: 360 }}>
        <Search size={15} style={{
          position: "absolute", left: 12, top: "50%",
          transform: "translateY(-50%)", color: "#52525b", pointerEvents: "none",
        }} />
        <input
          className="enroll-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by user, email or course…"
          style={{
            width: "100%",
            padding: "9px 12px 9px 36px",
            background: "#27272a",
            border: "1px solid rgba(245,158,11,0.15)",
            borderRadius: 10,
            color: "#fafafa",
            fontSize: "0.85rem",
            fontFamily: "'DM Sans', sans-serif",
            boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
        />
      </div>

      {/* ── Table ── */}
      <div style={{
        borderRadius: 16,
        overflow: "hidden",
        background: "#27272a",
        border: "1px solid rgba(245,158,11,0.15)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
      }}>
        <table style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{
              background: "rgba(245,158,11,0.08)",
              borderBottom: "1px solid rgba(245,158,11,0.2)",
            }}>
              {["#", "User", "Email", "Course", "Enrolled On", "Status"].map((h) => (
                <th key={h} style={{
                  padding: "1rem",
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#f59e0b",
                  textAlign: "left",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              [...Array(6)].map((_, i) => <SkeletonRow key={i} i={i} />)
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="6" style={{
                  textAlign: "center", padding: "3rem",
                  color: "#52525b", fontSize: "0.9rem",
                }}>
                  {search ? "No results match your search" : "No enrollments found"}
                </td>
              </tr>
            ) : (
              filtered.map((e, i) => (
                <tr
                  key={e._id || i}
                  className="enroll-tr"
                  onClick={() => setSelectedStudent(e)}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    background: selectedStudent?.userId === e.userId
                      ? "rgba(245,158,11,0.07)"
                      : i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                  }}
                >
                  {/* # */}
                  <td style={{ padding: "1rem", color: "#52525b", fontSize: "0.75rem", fontWeight: 600 }}>
                    {i + 1}
                  </td>

                  {/* User */}
                  <td style={{ padding: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                        background: "rgba(245,158,11,0.15)",
                        border: "1px solid rgba(245,158,11,0.25)",
                        color: "#f59e0b",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.7rem", fontWeight: 800,
                      }}>
                        {e.userName?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <span style={{ fontWeight: 600, color: "#fafafa" }}>{e.userName}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td style={{ padding: "1rem", color: "#a3a3a3", fontSize: "0.8rem" }}>
                    {e.userEmail}
                  </td>

                  {/* Course */}
                  <td style={{ padding: "1rem", color: "#d4d4d8", fontSize: "0.83rem" }}>
                    {e.courseTitle}
                  </td>

                  {/* Enrolled On */}
                  <td style={{ padding: "1rem", color: "#71717a", fontSize: "0.78rem" }}>
                    {formatDate(e.enrolledAt)}
                  </td>

                  {/* Status Toggle */}
                  <td style={{ padding: "1rem" }}>
                    <button
                      className="status-btn"
                      onClick={(ev) => handleStatusToggle(ev, e)}
                      title={`Click to mark as ${e.status === "active" ? "inactive" : "active"}`}
                      style={{
                        fontSize: "0.65rem", fontWeight: 700,
                        padding: "4px 12px", borderRadius: 100,
                        textTransform: "capitalize", cursor: "pointer",
                        background: e.status === "active"
                          ? "rgba(52,211,153,0.12)"
                          : "rgba(248,113,113,0.12)",
                        color: e.status === "active" ? "#34d399" : "#f87171",
                        border: `1px solid ${e.status === "active"
                          ? "rgba(52,211,153,0.25)"
                          : "rgba(248,113,113,0.25)"}`,
                        transition: "all 0.2s",
                      }}
                    >
                      {e.status}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Student Drawer ── */}
      <StudentDrawer
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onStatusChange={handleDrawerStatusSync}
      />
    </div>
  );
};

export default AdminEnrollments;