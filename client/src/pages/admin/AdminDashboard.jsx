import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Users, BookOpen, TrendingUp, Loader2, ArrowUpRight, Activity } from "lucide-react";
import api from "../../services/api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

/* ─── Stat Card ─────────────────────────────────────────── */
const StatCard = ({ title, value, icon: Icon, accent, loading, subtitle }) => (
  <div
    style={{
      background: "#27272a",
      border: `1px solid ${accent}30`,
      borderRadius: 16,
      padding: "1.5rem",
      position: "relative",
      overflow: "hidden",
      boxShadow: `0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 ${accent}15`,
    }}
  >
    <div style={{
      position: "absolute", top: -32, right: -32,
      width: 120, height: 120, borderRadius: "50%",
      background: accent, opacity: 0.07,
    }} />
    <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <div>
        <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: accent, marginBottom: 4 }}>
          {title}
        </p>
        {loading ? (
          <Loader2 size={22} style={{ marginTop: 12, color: `${accent}80`, animation: "spin 1s linear infinite" }} />
        ) : (
          <p style={{ fontSize: "2.2rem", fontWeight: 900, color: "#fafafa", lineHeight: 1.1, marginTop: 8 }}>{value}</p>
        )}
        {subtitle && <p style={{ fontSize: "0.75rem", marginTop: 4, color: "#71717a" }}>{subtitle}</p>}
      </div>
      <div style={{ background: `${accent}18`, borderRadius: 12, padding: "0.75rem" }}>
        <Icon size={20} style={{ color: accent }} />
      </div>
    </div>
  </div>
);

/* ─── Custom Tooltip ────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: "#18181b", border: "1px solid rgba(245,158,11,0.3)",
        color: "#fafafa", borderRadius: 10, padding: "8px 14px",
        fontSize: "0.78rem", boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }}>
        <p style={{ fontWeight: 700, marginBottom: 4 }}>{label}</p>
        <p style={{ color: "#f59e0b" }}>{payload[0].value} enrollments</p>
      </div>
    );
  }
  return null;
};

/* ─── Main ──────────────────────────────────────────────── */
const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, totalEnrollments: 0, totalCourses: 0 });
  const [recentUsers, setRecentUsers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
        const [usersRes, coursesRes] = await Promise.allSettled([
          api.get("/user/get", { headers }),
          api.get("/course/get", { headers }),
        ]);
        const users = usersRes.status === "fulfilled" && usersRes.value.data.status ? usersRes.value.data.users : [];
        const courses = coursesRes.status === "fulfilled" && coursesRes.value.data.status ? coursesRes.value.data.courses : [];

        let totalEnrollments = 0;
        const enrollmentCountMap = {};
        await Promise.allSettled(
          users.map(async (u) => {
            try {
              const res = await api.get(`/enrollment/user/${u._id}`);
              if (res.data.status && Array.isArray(res.data.enrollments)) {
                totalEnrollments += res.data.enrollments.length;
                res.data.enrollments.forEach((e) => {
                  const id = e.course?._id || e.course;
                  if (id) enrollmentCountMap[id] = (enrollmentCountMap[id] || 0) + 1;
                });
              }
            } catch (_) {}
          })
        );

        setStats({ totalUsers: users.length, totalEnrollments, totalCourses: courses.length });
        setRecentUsers([...users].reverse().slice(0, 5));

        if (courses.length) {
          setChartData(
            courses
              .map((c) => ({
                name: c.title?.length > 14 ? c.title.slice(0, 14) + "…" : c.title || "Course",
                enrollments: enrollmentCountMap[c._id] || 0,
              }))
              .sort((a, b) => b.enrollments - a.enrollments)
              .slice(0, 6)
          );
        }
      } catch (err) {
        console.error("Dashboard stats error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const avatarAccents = ["#f59e0b", "#34d399", "#60a5fa", "#f87171", "#a78bfa"];

  const panelStyle = {
    background: "#27272a",
    border: "1px solid rgba(245,158,11,0.12)",
    borderRadius: 16,
    padding: "1.5rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
  };

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", background: "#18181b", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#f59e0b", marginBottom: 4 }}>
          Control Center
        </p>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 900, color: "#fafafa", letterSpacing: "-0.02em" }}>
          Admin Dashboard
        </h1>
        <p style={{ fontSize: "0.875rem", marginTop: 4, color: "#71717a" }}>
          Welcome back,{" "}
          <span style={{ color: "#a3a3a3", fontWeight: 600 }}>{user?.name}</span>
        </p>
        <div style={{ marginTop: 12, height: 2, width: 64, background: "linear-gradient(90deg, #f59e0b, transparent)", borderRadius: 2 }} />
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "1.5rem" }}>
        <StatCard title="Total Users"   value={stats.totalUsers}        icon={Users}      accent="#f59e0b" loading={loading} subtitle="Registered accounts" />
        <StatCard title="Enrollments"   value={stats.totalEnrollments}  icon={TrendingUp} accent="#34d399" loading={loading} subtitle="Across all courses"  />
        <StatCard title="Courses"       value={stats.totalCourses}      icon={BookOpen}   accent="#60a5fa" loading={loading} subtitle="Published & active"   />
      </div>

      {/* Chart + Recent Users */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "1.5rem" }}>

        {/* Bar Chart */}
        <div style={panelStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "0.97rem", fontWeight: 700, color: "#fafafa" }}>Enrollments per Course</h2>
              <p style={{ fontSize: "0.75rem", marginTop: 2, color: "#71717a" }}>Top courses by enrollment count</p>
            </div>
            <Activity size={18} style={{ color: "#f59e0b" }} />
          </div>

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
              <Loader2 size={28} style={{ color: "rgba(245,158,11,0.4)" }} />
            </div>
          ) : chartData.length === 0 ? (
            <p style={{ textAlign: "center", color: "#52525b", fontSize: "0.875rem", height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
              No enrollment data available
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,158,11,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#52525b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#52525b" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(245,158,11,0.06)" }} />
                <Bar dataKey="enrollments" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Recent Users */}
        <div style={panelStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <h2 style={{ fontSize: "0.97rem", fontWeight: 700, color: "#fafafa" }}>Recent Users</h2>
              <p style={{ fontSize: "0.75rem", marginTop: 2, color: "#71717a" }}>Latest 5 registered</p>
            </div>
            <ArrowUpRight size={18} style={{ color: "#f59e0b" }} />
          </div>

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
              <Loader2 size={28} style={{ color: "rgba(245,158,11,0.4)" }} />
            </div>
          ) : recentUsers.length === 0 ? (
            <p style={{ textAlign: "center", color: "#52525b", fontSize: "0.875rem" }}>No users found</p>
          ) : (
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {recentUsers.map((u, i) => (
                <li key={u._id} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    background: `${avatarAccents[i % 5]}20`,
                    border: `1px solid ${avatarAccents[i % 5]}40`,
                    color: avatarAccents[i % 5],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.75rem", fontWeight: 700,
                  }}>
                    {u.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fafafa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "#71717a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</p>
                  </div>
                  <span style={{
                    fontSize: "0.65rem", fontWeight: 700, padding: "2px 10px", borderRadius: 100, textTransform: "capitalize", flexShrink: 0,
                    ...(u.role === "admin"
                      ? { background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.25)" }
                      : { background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" })
                  }}>
                    {u.role}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;