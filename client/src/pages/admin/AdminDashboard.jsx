import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Users, BookOpen, TrendingUp, Loader2, ArrowUpRight, Activity } from "lucide-react";
import api from "../../services/api";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

/* ─── Stat Card ──────────────────────────────────────────── */
const StatCard = ({ title, value, icon: Icon, accent, loading, subtitle }) => (
    <div
        className="relative overflow-hidden rounded-2xl p-6"
        style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${accent}30`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 ${accent}15`,
        }}
    >
        <div
            className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
            style={{ background: accent }}
        />
        <div className="relative z-10 flex items-start justify-between">
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
                    {title}
                </p>
                {loading ? (
                    <Loader2 size={22} className="mt-3 animate-spin" style={{ color: `${accent}80` }} />
                ) : (
                    <p className="text-4xl font-extrabold mt-2 tracking-tight" style={{ color: "#f1f5f9" }}>
                        {value}
                    </p>
                )}
                {subtitle && <p className="text-xs mt-1" style={{ color: "#64748b" }}>{subtitle}</p>}
            </div>
            <div className="rounded-xl p-3" style={{ background: `${accent}18` }}>
                <Icon size={20} style={{ color: accent }} />
            </div>
        </div>
    </div>
);

/* ─── Custom Tooltip ─────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div
                className="text-xs px-3 py-2 rounded-lg"
                style={{
                    background: "#0f172a",
                    border: "1px solid rgba(201,168,76,0.3)",
                    color: "#e2e8f0",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                }}
            >
                <p className="font-semibold mb-1">{label}</p>
                <p style={{ color: "#c9a84c" }}>{payload[0].value} enrollments</p>
            </div>
        );
    }
    return null;
};

/* ─── Main Component ─────────────────────────────────────── */
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

    const avatarAccents = ["#c9a84c", "#34d399", "#60a5fa", "#f87171", "#a78bfa"];

    return (
        <div
            className="min-h-screen p-8"
            style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)" }}
        >
            {/* Header */}
            <div className="mb-10">
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#c9a84c" }}>
                    Control Center
                </p>
                <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "#f1f5f9" }}>
                    Admin Dashboard
                </h1>
                <p className="text-sm mt-1" style={{ color: "#475569" }}>
                    Welcome back,{" "}
                    <span style={{ color: "#94a3b8", fontWeight: 600 }}>{user?.name}</span>
                </p>
                <div className="mt-3 h-px w-20" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                <StatCard title="Total Users" value={stats.totalUsers} icon={Users} accent="#c9a84c" loading={loading} subtitle="Registered accounts" />
                <StatCard title="Enrollments" value={stats.totalEnrollments} icon={TrendingUp} accent="#34d399" loading={loading} subtitle="Across all courses" />
                <StatCard title="Courses" value={stats.totalCourses} icon={BookOpen} accent="#60a5fa" loading={loading} subtitle="Published & active" />
            </div>

            {/* Chart + Recent Users */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Bar Chart */}
                <div
                    className="lg:col-span-3 rounded-2xl p-6"
                    style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(201,168,76,0.12)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                    }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-base font-bold" style={{ color: "#e2e8f0" }}>Enrollments per Course</h2>
                            <p className="text-xs mt-0.5" style={{ color: "#475569" }}>Top courses by enrollment count</p>
                        </div>
                        <Activity size={18} style={{ color: "#c9a84c" }} />
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-48">
                            <Loader2 size={28} className="animate-spin" style={{ color: "#c9a84c50" }} />
                        </div>
                    ) : chartData.length === 0 ? (
                        <p className="text-center text-sm h-48 flex items-center justify-center" style={{ color: "#475569" }}>
                            No enrollment data available
                        </p>
                    ) : (
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={chartData} barSize={28}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#475569" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11, fill: "#475569" }} axisLine={false} tickLine={false} allowDecimals={false} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(201,168,76,0.06)" }} />
                                <Bar dataKey="enrollments" fill="#c9a84c" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Recent Users */}
                <div
                    className="lg:col-span-2 rounded-2xl p-6"
                    style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(201,168,76,0.12)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                    }}
                >
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-base font-bold" style={{ color: "#e2e8f0" }}>Recent Users</h2>
                            <p className="text-xs mt-0.5" style={{ color: "#475569" }}>Latest 5 registered</p>
                        </div>
                        <ArrowUpRight size={18} style={{ color: "#c9a84c" }} />
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-48">
                            <Loader2 size={28} className="animate-spin" style={{ color: "#c9a84c50" }} />
                        </div>
                    ) : recentUsers.length === 0 ? (
                        <p className="text-center text-sm h-48 flex items-center justify-center" style={{ color: "#475569" }}>
                            No users found
                        </p>
                    ) : (
                        <ul className="space-y-3">
                            {recentUsers.map((u, i) => (
                                <li key={u._id} className="flex items-center gap-3">
                                    <div
                                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                        style={{
                                            background: `${avatarAccents[i % 5]}20`,
                                            border: `1px solid ${avatarAccents[i % 5]}40`,
                                            color: avatarAccents[i % 5],
                                        }}
                                    >
                                        {u.name?.charAt(0).toUpperCase() || "?"}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold truncate" style={{ color: "#e2e8f0" }}>{u.name}</p>
                                        <p className="text-xs truncate" style={{ color: "#475569" }}>{u.email}</p>
                                    </div>
                                    <span
                                        className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize flex-shrink-0"
                                        style={
                                            u.role === "admin"
                                                ? { background: "rgba(201,168,76,0.15)", color: "#c9a84c" }
                                                : { background: "rgba(52,211,153,0.12)", color: "#34d399" }
                                        }
                                    >
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