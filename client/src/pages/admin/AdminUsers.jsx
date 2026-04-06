import { useEffect, useState } from "react";
import { Trash2, Eye, Users } from "lucide-react";
import api from "../../services/api";
import ViewEnrollmentsModal from "../../components/home/ViewEnrollmentsModal";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";

/* ── Skeleton shimmer ─────────────────────────────────────── */
const skeletonBase = {
  background: "linear-gradient(90deg, #323235 25%, #3a3a3e 50%, #323235 75%)",
  backgroundSize: "200% 100%",
  animation: "skeletonShimmer 1.6s ease-in-out infinite",
  borderRadius: 6,
};

const SkeletonUserRow = ({ i }) => (
  <tr
    style={{
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
    }}
  >
    <td style={{ padding: "1rem" }}>
      <div style={{ ...skeletonBase, width: 120, height: 13 }} />
    </td>
    <td style={{ padding: "1rem" }}>
      <div style={{ ...skeletonBase, width: 170, height: 12 }} />
    </td>
    <td style={{ padding: "1rem" }}>
      <div style={{ ...skeletonBase, width: 52, height: 22, borderRadius: 100 }} />
    </td>
    <td style={{ padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        <div style={{ ...skeletonBase, width: 18, height: 18, borderRadius: 4 }} />
        <div style={{ ...skeletonBase, width: 18, height: 18, borderRadius: 4 }} />
      </div>
    </td>
  </tr>
);

const AdminUsers = () => {
  const [users, setUsers]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [selected, setSelected]     = useState(null);   // currently targeted user
  const [enrollments, setEnrollments] = useState([]);
  const [viewOpen, setViewOpen]     = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loadingEnrollments, setLoadingEnrollments] = useState(false);

  /* ── Fetch users ── */
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/user/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = res.data.users || res.data;
      if (Array.isArray(userData)) setUsers(userData);
    } catch (err) {
      console.error("Fetch Users Error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Delete user (called by DeleteConfirmModal) ── */
  const deleteUser = async () => {
    if (!selected) return;
    try {
      const token = localStorage.getItem("token");
      const res = await api.delete(`/user/delete/${selected._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status || res.status === 200) {
        setUsers((prev) => prev.filter((u) => u._id !== selected._id));
        setDeleteOpen(false);
        setSelected(null);
      }
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  /* ── View enrollments (opens modal) ── */
  const openViewModal = async (user) => {
    setSelected(user);
    setLoadingEnrollments(true);
    setViewOpen(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/enrollment/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.enrollments || res.data;
      setEnrollments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("View Enrollments Error:", err);
      setEnrollments([]);
    } finally {
      setLoadingEnrollments(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background: "#18181b",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @keyframes skeletonShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .action-btn {
          background: none; border: none; cursor: pointer;
          padding: 5px; border-radius: 6px;
          transition: background 0.15s, transform 0.15s;
          display: flex; align-items: center;
        }
        .action-btn:hover { transform: scale(1.15); background: rgba(255,255,255,0.06); }
      `}</style>

      {/* ── Header ── */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 4 }}>
          Management
        </p>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 900, color: "#fafafa", display: "flex", alignItems: "center", gap: 10 }}>
          <Users size={26} style={{ color: "#f59e0b" }} /> Users
        </h1>
        <p style={{ fontSize: "0.8rem", color: "#52525b", marginTop: 4 }}>
          {users.length} user{users.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* ── Table ── */}
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          background: "#27272a",
          border: "1px solid rgba(245,158,11,0.15)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        }}
      >
        <table style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(245,158,11,0.08)", borderBottom: "1px solid rgba(245,158,11,0.2)" }}>
              {["Name", "Email", "Role", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "1rem",
                    fontWeight: 700,
                    fontSize: "0.68rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#f59e0b",
                    textAlign: h === "Actions" ? "center" : "left",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => <SkeletonUserRow key={i} i={i} />)
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "3rem", color: "#52525b", fontSize: "0.9rem" }}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr
                  key={user._id}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,158,11,0.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)")}
                >
                  {/* Name */}
                  <td style={{ padding: "1rem", fontWeight: 600, color: "#fafafa" }}>
                    {user.name}
                  </td>

                  {/* Email */}
                  <td style={{ padding: "1rem", color: "#a3a3a3", fontSize: "0.8rem" }}>
                    {user.email}
                  </td>

                  {/* Role badge */}
                  <td style={{ padding: "1rem" }}>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 100,
                        background:
                          user.role === "admin"
                            ? "rgba(245,158,11,0.15)"
                            : "rgba(52,211,153,0.12)",
                        color: user.role === "admin" ? "#f59e0b" : "#34d399",
                      }}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      {/* View Enrollments */}
                      <button
                        className="action-btn"
                        title="View Enrollments"
                        onClick={() => openViewModal(user)}
                        style={{ color: "#60a5fa", background: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.25)" }}
                      >
                        <Eye size={16} />
                      </button>

                      {/* Delete */}
                      <button
                        className="action-btn"
                        title="Delete User"
                        onClick={() => { setSelected(user); setDeleteOpen(true); }}
                        style={{ color: "#f87171" }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Modals ── */}
      <ViewEnrollmentsModal
        open={viewOpen}
        onClose={() => { setViewOpen(false); setSelected(null); setEnrollments([]); }}
        courses={enrollments}
        loading={loadingEnrollments}
        userName={selected?.name}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        onClose={() => { setDeleteOpen(false); setSelected(null); }}
        onDelete={deleteUser}
        title="Delete User?"
        description={`Are you sure you want to delete "${selected?.name}"? This action cannot be undone.`}
        confirmText="Delete User"
      />
    </div>
  );
};

export default AdminUsers;