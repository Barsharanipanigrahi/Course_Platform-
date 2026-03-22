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
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const res = await api.delete(`/user/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.status) setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) { console.log(err); }
  };

  const viewEnrollments = async (userId) => {
    try {
      const res = await api.get(`/enrollment/user/${userId}`);
      if (res.data.status) { setEnrollments(res.data.enrollments); setOpenModal(true); }
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const rowHoverEnter = (e) => { e.currentTarget.style.background = "rgba(245,158,11,0.05)"; };
  const rowHoverLeave = (e, i) => { e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)"; };

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", background: "#18181b", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#f59e0b", marginBottom: 4 }}>
          Management
        </p>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 900, color: "#fafafa", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 10 }}>
          <Users size={26} style={{ color: "#f59e0b" }} />
          Users
        </h1>
        <div style={{ marginTop: 10, height: 2, width: 56, background: "linear-gradient(90deg, #f59e0b, transparent)", borderRadius: 2 }} />
      </div>

      {loading ? (
        <p style={{ color: "#71717a", fontSize: "0.9rem" }}>Loading users...</p>
      ) : (
        <div style={{
          borderRadius: 16, overflow: "hidden",
          background: "#27272a",
          border: "1px solid rgba(245,158,11,0.15)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        }}>
          <table style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(245,158,11,0.08)", borderBottom: "1px solid rgba(245,158,11,0.2)" }}>
                {["Name", "Email", "Role", "Action"].map((h) => (
                  <th key={h} style={{
                    padding: "1rem", fontWeight: 700, fontSize: "0.68rem",
                    textTransform: "uppercase", letterSpacing: "0.12em",
                    color: "#f59e0b", textAlign: h === "Action" ? "center" : "left",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "2.5rem", color: "#52525b", fontSize: "0.875rem" }}>
                    No users found
                  </td>
                </tr>
              ) : users.map((user, i) => (
                <tr
                  key={user._id}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)", transition: "background 0.15s" }}
                  onMouseEnter={rowHoverEnter}
                  onMouseLeave={e => rowHoverLeave(e, i)}
                >
                  <td style={{ padding: "1rem", fontWeight: 600, color: "#fafafa" }}>{user.name}</td>
                  <td style={{ padding: "1rem", color: "#a3a3a3" }}>{user.email}</td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{
                      fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: 100, textTransform: "capitalize",
                      ...(user.role === "admin"
                        ? { background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.25)" }
                        : { background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" })
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
                      <button
                        onClick={() => viewEnrollments(user._id)}
                        style={{ color: "#60a5fa", background: "none", border: "none", cursor: "pointer", transition: "color 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#93c5fd"}
                        onMouseLeave={e => e.currentTarget.style.color = "#60a5fa"}
                      >
                        <Eye size={17} />
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        style={{ color: "#f87171", background: "none", border: "none", cursor: "pointer", transition: "color 0.15s" }}
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