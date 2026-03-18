import { useEffect, useState } from "react";
import { Trash2, Eye, Users } from "lucide-react";
import api from "../../services/api";
import ViewEnrollmentsModal from "../../components/home/ViewEnrollmentsModal";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [enrollments, setEnrollments] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/user/get", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            if (res.data.status) setUsers(res.data.users);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) return;
        try {
            const res = await api.delete(`/user/delete/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            if (res.data.status) setUsers((prev) => prev.filter((u) => u._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const viewEnrollments = async (userId) => {
        try {
            const res = await api.get(`/enrollment/user/${userId}`);
            if (res.data.status) { setEnrollments(res.data.enrollments); setOpenModal(true); }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    return (
        <div
            className="p-8 min-h-screen"
            style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)" }}
        >
            {/* Header */}
            <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#c9a84c" }}>
                    Management
                </p>
                <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3" style={{ color: "#f1f5f9" }}>
                    <Users className="w-7 h-7" style={{ color: "#c9a84c" }} />
                    Users
                </h1>
                <div className="mt-2 h-px w-16" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
            </div>

            {loading ? (
                <p style={{ color: "#475569" }}>Loading users...</p>
            ) : (
                <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(201,168,76,0.15)",
                        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                    }}
                >
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ background: "rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
                                {["Name", "Email", "Role", "Action"].map((h) => (
                                    <th
                                        key={h}
                                        className={`p-4 font-semibold text-xs uppercase tracking-widest ${h === "Action" ? "text-center" : "text-left"}`}
                                        style={{ color: "#c9a84c" }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr
                                    key={user._id}
                                    className="transition-colors duration-150"
                                    style={{
                                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                                        background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.05)"}
                                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)"}
                                >
                                    <td className="p-4 font-medium" style={{ color: "#e2e8f0" }}>{user.name}</td>
                                    <td className="p-4" style={{ color: "#94a3b8" }}>{user.email}</td>
                                    <td className="p-4">
                                        <span
                                            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize"
                                            style={
                                                user.role === "admin"
                                                    ? { background: "rgba(201,168,76,0.15)", color: "#c9a84c" }
                                                    : { background: "rgba(52,211,153,0.12)", color: "#34d399" }
                                            }
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-5">
                                            <button
                                                onClick={() => viewEnrollments(user._id)}
                                                style={{ color: "#60a5fa" }}
                                                onMouseEnter={e => e.currentTarget.style.color = "#93c5fd"}
                                                onMouseLeave={e => e.currentTarget.style.color = "#60a5fa"}
                                            >
                                                <Eye size={17} />
                                            </button>
                                            <button
                                                onClick={() => deleteUser(user._id)}
                                                style={{ color: "#f87171" }}
                                                onMouseEnter={e => e.currentTarget.style.color = "#fca5a5"}
                                                onMouseLeave={e => e.currentTarget.style.color = "#f87171"}
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ViewEnrollmentsModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                courses={enrollments}
            />
        </div>
    );
};

export default AdminUsers;