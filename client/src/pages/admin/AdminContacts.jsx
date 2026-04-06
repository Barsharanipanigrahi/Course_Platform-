import React, { useEffect, useState } from "react";
import { Trash2, Mail } from "lucide-react";
import api from "../../services/api";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";

/* ── Skeleton shimmer ─────────────────────────────────────── */
const skeletonBase = {
  background: "linear-gradient(90deg, #323235 25%, #3a3a3e 50%, #323235 75%)",
  backgroundSize: "200% 100%",
  animation: "skeletonShimmer 1.6s ease-in-out infinite",
  borderRadius: 6,
};

const SkeletonContactRow = ({ i }) => (
  <tr style={{
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
  }}>
    {/* Name */}
    <td style={{ padding: "1rem" }}>
      <div style={{ ...skeletonBase, width: 100, height: 13 }} />
    </td>
    {/* Email */}
    <td style={{ padding: "1rem" }}>
      <div style={{ ...skeletonBase, width: 150, height: 12 }} />
    </td>
    {/* Phone */}
    <td style={{ padding: "1rem" }}>
      <div style={{ ...skeletonBase, width: 90, height: 12 }} />
    </td>
    {/* Message */}
    <td style={{ padding: "1rem" }}>
      <div style={{ ...skeletonBase, width: "85%", height: 12 }} />
    </td>
    {/* Action */}
    <td style={{ padding: "1rem", textAlign: "center" }}>
      <div style={{ ...skeletonBase, width: 20, height: 20, borderRadius: 4, margin: "0 auto" }} />
    </td>
  </tr>
);

const SkeletonTable = () => (
  <div style={{
    borderRadius: 16, overflow: "hidden",
    background: "#27272a",
    border: "1px solid rgba(245,158,11,0.15)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
  }}>
    <table style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "rgba(245,158,11,0.08)", borderBottom: "1px solid rgba(245,158,11,0.2)" }}>
          {["Name", "Email", "Phone", "Message", "Action"].map((h) => (
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
        {[...Array(6)].map((_, i) => <SkeletonContactRow key={i} i={i} />)}
      </tbody>
    </table>
  </div>
);

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/contact/get");
      // handle both 'Contacts' and 'contacts' from backend
      const data = res.data.contacts || res.data.Contacts || [];
      if (res.data.status && Array.isArray(data)) {
        setContacts(data);
      } else {
        setContacts([]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => { setSelectedId(id); setShowModal(true); };

  const confirmDelete = async () => {
    try {
      const res = await api.delete(`/contact/delete/${selectedId}`);
      if (res.data.status) setContacts((prev) => prev.filter((c) => c._id !== selectedId));
    } catch (err) { console.log(err); }
    finally { setShowModal(false); setSelectedId(null); }
  };

  useEffect(() => { fetchContacts(); }, []);

  const rowHoverEnter = (e) => { e.currentTarget.style.background = "rgba(245,158,11,0.05)"; };
  const rowHoverLeave = (e, i) => { e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)"; };

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", background: "#18181b", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @keyframes skeletonShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#f59e0b", marginBottom: 4 }}>
          Inbox
        </p>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 900, color: "#fafafa", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 10 }}>
          <Mail size={26} style={{ color: "#f59e0b" }} />
          Contact Enquiries
        </h1>
        <div style={{ marginTop: 10, height: 2, width: 56, background: "linear-gradient(90deg, #f59e0b, transparent)", borderRadius: 2 }} />
      </div>

      {/* Skeleton while loading */}
      {loading && <SkeletonTable />}

      {/* Empty state */}
      {!loading && contacts.length === 0 && (
        <div style={{
          background: "#27272a", border: "1px solid rgba(245,158,11,0.12)",
          borderRadius: 16, padding: "3rem", textAlign: "center",
          color: "#52525b", fontSize: "0.9rem",
        }}>
          No contact enquiries found.
        </div>
      )}

      {/* Data table */}
      {!loading && contacts.length > 0 && (
        <div style={{
          borderRadius: 16, overflow: "hidden",
          background: "#27272a",
          border: "1px solid rgba(245,158,11,0.15)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        }}>
          <table style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(245,158,11,0.08)", borderBottom: "1px solid rgba(245,158,11,0.2)" }}>
                {["Name", "Email", "Phone", "Message", "Action"].map((h) => (
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
              {contacts.map((c, i) => (
                <tr
                  key={c._id}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)", transition: "background 0.15s" }}
                  onMouseEnter={rowHoverEnter}
                  onMouseLeave={e => rowHoverLeave(e, i)}
                >
                  <td style={{ padding: "1rem", fontWeight: 600, color: "#fafafa" }}>{c.name}</td>
                  <td style={{ padding: "1rem", color: "#a3a3a3" }}>{c.email}</td>
                  <td style={{ padding: "1rem", color: "#a3a3a3" }}>{c.phone}</td>
                  <td style={{ padding: "1rem", color: "#a3a3a3", maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.message}</td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <button
                      onClick={() => openDeleteModal(c._id)}
                      style={{ color: "#f87171", background: "none", border: "none", cursor: "pointer", transition: "color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#fca5a5"}
                      onMouseLeave={e => e.currentTarget.style.color = "#f87171"}
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteConfirmModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onDelete={confirmDelete}
        title="Delete Contact?"
        description="This contact message will be permanently removed."
        confirmText="Delete"
      />
    </div>
  );
};

export default AdminContacts;