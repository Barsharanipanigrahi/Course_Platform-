import React, { useEffect, useState } from "react";
import { Trash2, Mail, Reply, X, Send, Loader2 } from "lucide-react";
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
    <td style={{ padding: "1rem" }}><div style={{ ...skeletonBase, width: 100, height: 13 }} /></td>
    <td style={{ padding: "1rem" }}><div style={{ ...skeletonBase, width: 150, height: 12 }} /></td>
    <td style={{ padding: "1rem" }}><div style={{ ...skeletonBase, width: 90, height: 12 }} /></td>
    <td style={{ padding: "1rem" }}><div style={{ ...skeletonBase, width: "85%", height: 12 }} /></td>
    <td style={{ padding: "1rem", textAlign: "center" }}>
      <div style={{ ...skeletonBase, width: 60, height: 20, borderRadius: 4, margin: "0 auto" }} />
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
          {["Name", "Email", "Phone", "Message", "Actions"].map((h) => (
            <th key={h} style={{
              padding: "1rem", fontWeight: 700, fontSize: "0.68rem",
              textTransform: "uppercase", letterSpacing: "0.12em",
              color: "#f59e0b", textAlign: h === "Actions" ? "center" : "left",
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(6)].map((_, i) => <SkeletonContactRow key={i} i={i} />)}
      </tbody>
    </table>
  </div>
);

/* ── Reply Modal ─────────────────────────────────────────── */
const ReplyModal = ({ open, contact, onClose }) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill subject when contact changes
  useEffect(() => {
    if (contact) {
      setSubject(`Re: Your enquiry – ${contact.name}`);
      setBody("");
      setSent(false);
      setError("");
    }
  }, [contact]);

  if (!open || !contact) return null;

  const handleSend = async () => {
    if (!body.trim()) { setError("Reply message cannot be empty."); return; }
    setSending(true);
    setError("");
    try {
      // POST to your backend email-reply endpoint
      await api.post("/contact/reply", {
        to: contact.email,
        subject,
        message: body,
        contactId: contact._id,
      });
      setSent(true);
    } catch (err) {
      // Fallback: open mailto in a new tab if backend call fails
      const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailto, "_blank");
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)", zIndex: 1000,
          animation: "fadeIn 0.15s ease",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1001, width: "min(560px, 95vw)",
        background: "#1c1c1f",
        border: "1px solid rgba(245,158,11,0.25)",
        borderRadius: 18,
        boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,158,11,0.08)",
        overflow: "hidden",
        animation: "slideUp 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* Modal header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.1rem 1.4rem",
          background: "rgba(245,158,11,0.06)",
          borderBottom: "1px solid rgba(245,158,11,0.15)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Reply size={17} style={{ color: "#f59e0b" }} />
            <span style={{ fontWeight: 700, color: "#fafafa", fontSize: "0.95rem" }}>Reply to Enquiry</span>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(250,250,250,0.4)", display: "flex", alignItems: "center",
            transition: "color 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#fafafa"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(250,250,250,0.4)"}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "1.4rem" }}>

          {/* To field (read-only) */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>To</label>
            <div style={{
              padding: "0.6rem 0.9rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 9, color: "#a3a3a3", fontSize: "0.875rem",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <Mail size={13} style={{ color: "#f59e0b", flexShrink: 0 }} />
              <span style={{ color: "#d4d4d8" }}>{contact.name}</span>
              <span style={{ color: "#71717a" }}>·</span>
              <span>{contact.email}</span>
            </div>
          </div>

          {/* Original message (collapsed reference) */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Their Message</label>
            <div style={{
              padding: "0.65rem 0.9rem",
              background: "rgba(245,158,11,0.04)",
              border: "1px solid rgba(245,158,11,0.12)",
              borderRadius: 9, color: "#78716c", fontSize: "0.8rem",
              fontStyle: "italic", lineHeight: 1.5,
              maxHeight: 64, overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}>
              "{contact.message}"
            </div>
          </div>

          {/* Subject */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Subject</label>
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = "rgba(245,158,11,0.5)"}
              onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>

          {/* Reply body */}
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={labelStyle}>Your Reply</label>
            <textarea
              rows={6}
              placeholder="Type your reply here…"
              value={body}
              onChange={e => { setBody(e.target.value); setError(""); }}
              style={{ ...inputStyle, resize: "vertical", minHeight: 130, lineHeight: 1.6 }}
              onFocus={e => e.currentTarget.style.borderColor = "rgba(245,158,11,0.5)"}
              onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
            />
            {error && (
              <p style={{ marginTop: 5, fontSize: "0.75rem", color: "#f87171" }}>{error}</p>
            )}
          </div>

          {/* Success state */}
          {sent ? (
            <div style={{
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 10, padding: "0.75rem 1rem",
              color: "#4ade80", fontSize: "0.875rem", fontWeight: 600,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span>✓</span> Reply sent to {contact.email}
            </div>
          ) : (
            /* Action buttons */
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                onClick={onClose}
                style={{
                  padding: "0.6rem 1.2rem", borderRadius: 9,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(250,250,250,0.5)", fontSize: "0.875rem",
                  fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "#fafafa"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(250,250,250,0.5)"; }}
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={sending}
                style={{
                  padding: "0.6rem 1.4rem", borderRadius: 9,
                  background: sending ? "rgba(245,158,11,0.5)" : "#f59e0b",
                  border: "none", color: "#18181b",
                  fontSize: "0.875rem", fontWeight: 700,
                  cursor: sending ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", gap: 7,
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "background 0.15s",
                  boxShadow: sending ? "none" : "0 4px 14px rgba(245,158,11,0.35)",
                }}
                onMouseEnter={e => { if (!sending) e.currentTarget.style.background = "#fbbf24"; }}
                onMouseLeave={e => { if (!sending) e.currentTarget.style.background = "#f59e0b"; }}
              >
                {sending
                  ? <><Loader2 size={15} style={{ animation: "spin 0.8s linear infinite" }} /> Sending…</>
                  : <><Send size={14} /> Send Reply</>
                }
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const labelStyle = {
  display: "block", marginBottom: 6,
  fontSize: "0.7rem", fontWeight: 700,
  textTransform: "uppercase", letterSpacing: "0.1em",
  color: "rgba(245,158,11,0.7)",
};

const inputStyle = {
  width: "100%", padding: "0.65rem 0.9rem",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 9, color: "#fafafa",
  fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif",
  outline: "none", transition: "border-color 0.15s",
  boxSizing: "border-box",
};

/* ── Main Component ──────────────────────────────────────── */
const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Reply modal
  const [replyContact, setReplyContact] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/contact/get");
      const data = res.data.contacts || res.data.Contacts || [];
      setContacts(res.data.status && Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Fetch error:", err);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => { setSelectedId(id); setShowDeleteModal(true); };
  const openReplyModal  = (contact) => { setReplyContact(contact); setShowReplyModal(true); };

  const confirmDelete = async () => {
    try {
      const res = await api.delete(`/contact/delete/${selectedId}`);
      if (res.data.status) setContacts((prev) => prev.filter((c) => c._id !== selectedId));
    } catch (err) { console.log(err); }
    finally { setShowDeleteModal(false); setSelectedId(null); }
  };

  useEffect(() => { fetchContacts(); }, []);

  const rowHoverEnter = (e) => { e.currentTarget.style.background = "rgba(245,158,11,0.05)"; };
  const rowHoverLeave = (e, i) => { e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)"; };

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", background: "#18181b", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @keyframes skeletonShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, -46%); } to { opacity: 1; transform: translate(-50%, -50%); } }
        @keyframes spin    { to { transform: rotate(360deg); } }
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

      {loading && <SkeletonTable />}

      {!loading && contacts.length === 0 && (
        <div style={{
          background: "#27272a", border: "1px solid rgba(245,158,11,0.12)",
          borderRadius: 16, padding: "3rem", textAlign: "center",
          color: "#52525b", fontSize: "0.9rem",
        }}>
          No contact enquiries found.
        </div>
      )}

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
                {["Name", "Email", "Phone", "Message", "Actions"].map((h) => (
                  <th key={h} style={{
                    padding: "1rem", fontWeight: 700, fontSize: "0.68rem",
                    textTransform: "uppercase", letterSpacing: "0.12em",
                    color: "#f59e0b", textAlign: h === "Actions" ? "center" : "left",
                  }}>{h}</th>
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
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>

                      {/* Reply button */}
                      <button
                        onClick={() => openReplyModal(c)}
                        title="Reply to this enquiry"
                        style={{
                          display: "flex", alignItems: "center", gap: 5,
                          color: "#f59e0b", background: "rgba(245,158,11,0.1)",
                          border: "1px solid rgba(245,158,11,0.2)",
                          borderRadius: 7, padding: "4px 10px",
                          cursor: "pointer", fontSize: "0.75rem", fontWeight: 700,
                          fontFamily: "'DM Sans', sans-serif",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,158,11,0.22)"; e.currentTarget.style.borderColor = "rgba(245,158,11,0.45)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(245,158,11,0.1)"; e.currentTarget.style.borderColor = "rgba(245,158,11,0.2)"; }}
                      >
                        <Reply size={13} /> Reply
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => openDeleteModal(c._id)}
                        title="Delete this enquiry"
                        style={{
                          color: "#f87171", background: "none", border: "none",
                          cursor: "pointer", display: "flex", alignItems: "center",
                          transition: "color 0.15s", padding: 4,
                        }}
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

      {/* Reply Modal */}
      <ReplyModal
        open={showReplyModal}
        contact={replyContact}
        onClose={() => setShowReplyModal(false)}
      />

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={confirmDelete}
        title="Delete Contact?"
        description="This contact message will be permanently removed."
        confirmText="Delete"
      />
    </div>
  );
};

export default AdminContacts;