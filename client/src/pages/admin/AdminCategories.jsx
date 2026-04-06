import React, { useState, useEffect, useCallback } from "react";
import { Tag, Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Check, Loader2, AlertCircle } from "lucide-react";

const API = "/api/category";
const HEX_RE = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;  // ← FIXED: was missing, caused the crash
const PRESET_COLORS = [
  "#f97316", "#f59e0b", "#10b981", "#3b82f6",
  "#8b5cf6", "#ec4899", "#ef4444", "#14b8a6",
];

/* ══════════════════════════════════════════════════════════════
   ADMIN CATEGORIES PAGE
══════════════════════════════════════════════════════════════ */
const AdminCategories = () => {
  const [categories, setCategories]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  // form state
  const [showForm, setShowForm]       = useState(false);
  const [editTarget, setEditTarget]   = useState(null);
  const [formData, setFormData]       = useState({ name: "", description: "", color: "#f97316" });
  const [formError, setFormError]     = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // delete confirm
  const [deleteId, setDeleteId]       = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // per-row toggle loading
  const [togglingId, setTogglingId]   = useState(null);

  /* ── fetch all (admin) ──────────────────────────────────── */
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`${API}/admin/all`);
      const data = await res.json();
      if (!data.status) throw new Error(data.message || "Failed to load");
      setCategories(data.categories);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  /* ── open form ──────────────────────────────────────────── */
  const openAdd = () => {
    setEditTarget(null);
    setFormData({ name: "", description: "", color: "#f97316" });
    setFormError(null);
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setEditTarget(cat);
    setFormData({ name: cat.name, description: cat.description || "", color: cat.color || "#f97316" });
    setFormError(null);
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setFormError(null); };

  /* ── submit (add / edit) ────────────────────────────────── */
  const handleSubmit = async () => {
    const { name, description, color } = formData;
    if (!name.trim()) return setFormError("Category name is required.");
    if (color && !HEX_RE.test(color)) return setFormError("Color must be a valid hex e.g. #f97316");

    setFormLoading(true);
    setFormError(null);
    try {
      const url    = editTarget ? `${API}/update/${editTarget._id}` : `${API}/add`;
      const method = editTarget ? "PUT" : "POST";
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim(), color }),
      });
      const data = await res.json();
      if (!data.status) throw new Error(data.message || "Operation failed");
      closeForm();
      fetchCategories();
    } catch (e) {
      setFormError(e.message);
    } finally {
      setFormLoading(false);
    }
  };

  /* ── delete ─────────────────────────────────────────────── */
  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      const res  = await fetch(`${API}/delete/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.status) throw new Error(data.message);
      setDeleteId(null);
      fetchCategories();
    } catch (e) {
      alert(e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  /* ── toggle ─────────────────────────────────────────────── */
  const handleToggle = async (id) => {
    setTogglingId(id);
    try {
      const res  = await fetch(`${API}/toggle/${id}`, { method: "PATCH" });
      const data = await res.json();
      if (!data.status) throw new Error(data.message);
      setCategories(prev =>
        prev.map(c => c._id === id ? { ...c, isActive: data.category.isActive } : c)
      );
    } catch (e) {
      alert(e.message);
    } finally {
      setTogglingId(null);
    }
  };

  /* ════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════ */
  return (
    <div style={styles.page}>
      {/* ── Header ── */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Categories</h1>
          <p style={styles.subtitle}>Manage course categories</p>
        </div>
        <button style={styles.addBtn} onClick={openAdd}>
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div style={styles.errorBanner}>
          <AlertCircle size={15} />
          {error}
          <button style={styles.retryBtn} onClick={fetchCategories}>Retry</button>
        </div>
      )}

      {/* ── Loading ── */}
      {loading && (
        <div style={styles.center}>
          <Loader2 size={24} style={{ animation: "spin 1s linear infinite", color: "#f97316" }} />
        </div>
      )}

      {/* ── Empty ── */}
      {!loading && !error && categories.length === 0 && (
        <div style={styles.empty}>
          <Tag size={32} style={{ color: "#3f3f46", marginBottom: 12 }} />
          <p style={{ color: "#52525b", margin: 0 }}>No categories yet. Add your first one!</p>
        </div>
      )}

      {/* ── Table ── */}
      {!loading && categories.length > 0 && (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Name", "Description", "Color", "Status", "Actions"].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr key={cat._id} style={{ ...styles.tr, animationDelay: `${i * 40}ms` }}>
                  {/* Name */}
                  <td style={styles.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <span style={{ ...styles.colorDot, background: cat.color || "#f97316" }} />
                      <span style={{ fontWeight: 600, color: "#e4e4e7" }}>{cat.name}</span>
                    </div>
                  </td>

                  {/* Description */}
                  <td style={{ ...styles.td, color: "#71717a", maxWidth: 260 }}>
                    {cat.description || <span style={{ color: "#3f3f46" }}>—</span>}
                  </td>

                  {/* Color */}
                  <td style={styles.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ ...styles.colorDot, width: 18, height: 18, background: cat.color || "#f97316" }} />
                      <code style={styles.hexCode}>{cat.color || "#f97316"}</code>
                    </div>
                  </td>

                  {/* Status */}
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      background: cat.isActive ? "rgba(16,185,129,0.12)" : "rgba(113,113,122,0.12)",
                      color: cat.isActive ? "#10b981" : "#52525b",
                      border: `1px solid ${cat.isActive ? "rgba(16,185,129,0.25)" : "rgba(113,113,122,0.2)"}`,
                    }}>
                      {cat.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={styles.td}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <ActionBtn
                        title={cat.isActive ? "Deactivate" : "Activate"}
                        color={cat.isActive ? "#10b981" : "#52525b"}
                        onClick={() => handleToggle(cat._id)}
                        loading={togglingId === cat._id}
                      >
                        {cat.isActive ? <ToggleRight size={15} /> : <ToggleLeft size={15} />}
                      </ActionBtn>

                      <ActionBtn title="Edit" color="#3b82f6" onClick={() => openEdit(cat)}>
                        <Pencil size={14} />
                      </ActionBtn>

                      <ActionBtn title="Delete" color="#ef4444" onClick={() => setDeleteId(cat._id)}>
                        <Trash2 size={14} />
                      </ActionBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ══ ADD / EDIT MODAL ══ */}
      {showForm && (
        <Modal onClose={closeForm}>
          <h2 style={styles.modalTitle}>
            {editTarget ? "Edit Category" : "Add Category"}
          </h2>

          <Field label="Name *">
            <input
              style={styles.input}
              placeholder="e.g. Web Development"
              value={formData.name}
              onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              autoFocus
            />
          </Field>

          <Field label="Description">
            <textarea
              style={{ ...styles.input, resize: "vertical", minHeight: 72 }}
              placeholder="Optional short description…"
              value={formData.description}
              onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
            />
          </Field>

          <Field label="Accent Color">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
              {PRESET_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, color: c }))}
                  style={{
                    width: 26, height: 26, borderRadius: "50%", background: c,
                    border: formData.color === c ? "3px solid #fff" : "3px solid transparent",
                    cursor: "pointer", transition: "border 0.15s",
                    boxShadow: formData.color === c ? `0 0 0 2px ${c}` : "none",
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 28, height: 28, borderRadius: 6, background: formData.color, flexShrink: 0, border: "1.5px solid rgba(255,255,255,0.1)" }} />
              <input
                style={{ ...styles.input, flex: 1, marginBottom: 0, fontFamily: "monospace" }}
                value={formData.color}
                onChange={e => setFormData(p => ({ ...p, color: e.target.value }))}
                placeholder="#f97316"
              />
            </div>
          </Field>

          {formError && (
            <div style={styles.formError}>
              <AlertCircle size={13} /> {formError}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button style={styles.cancelBtn} onClick={closeForm} disabled={formLoading}>
              Cancel
            </button>
            <button style={styles.submitBtn} onClick={handleSubmit} disabled={formLoading}>
              {formLoading
                ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                : <Check size={14} />}
              {editTarget ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </Modal>
      )}

      {/* ══ DELETE CONFIRM MODAL ══ */}
      {deleteId && (
        <Modal onClose={() => setDeleteId(null)} width={380}>
          <div style={{ textAlign: "center" }}>
            <div style={styles.deleteIcon}><Trash2 size={22} color="#ef4444" /></div>
            <h2 style={{ ...styles.modalTitle, marginBottom: 8 }}>Delete Category?</h2>
            <p style={{ color: "#71717a", fontSize: "0.87rem", marginBottom: 24 }}>
              This action cannot be undone. Categories with existing courses cannot be deleted.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button style={styles.cancelBtn} onClick={() => setDeleteId(null)} disabled={deleteLoading}>
                Cancel
              </button>
              <button style={{ ...styles.submitBtn, background: "#ef4444" }} onClick={handleDelete} disabled={deleteLoading}>
                {deleteLoading
                  ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                  : <Trash2 size={14} />}
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

/* ── Small reusable pieces ───────────────────────────────── */

const ActionBtn = ({ children, onClick, color, title, loading }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={loading}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 30, height: 30, borderRadius: 7,
        border: `1.5px solid ${hov ? color : "rgba(255,255,255,0.07)"}`,
        background: hov ? `${color}18` : "transparent",
        color: hov ? color : "#52525b",
        cursor: loading ? "wait" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s",
      }}
    >
      {loading ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : children}
    </button>
  );
};

const Modal = ({ children, onClose, width = 460 }) => (
  <div
    style={styles.overlay}
    onClick={e => e.target === e.currentTarget && onClose()}
  >
    <div style={{ ...styles.modal, maxWidth: width }}>
      <button style={styles.closeBtn} onClick={onClose}><X size={16} /></button>
      {children}
    </div>
  </div>
);

const Field = ({ label, children }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={styles.fieldLabel}>{label}</label>
    {children}
  </div>
);

/* ── Styles ──────────────────────────────────────────────── */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#09090b",
    padding: "36px 28px",
    fontFamily: "'DM Sans', sans-serif",
    color: "#e4e4e7",
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    marginBottom: 32,
  },
  title: {
    margin: 0, fontSize: "1.6rem", fontWeight: 800, color: "#fafafa",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    margin: "4px 0 0", fontSize: "0.83rem", color: "#52525b",
  },
  addBtn: {
    display: "inline-flex", alignItems: "center", gap: 7,
    padding: "9px 18px", borderRadius: 10, fontWeight: 700,
    fontSize: "0.83rem", cursor: "pointer",
    background: "#f97316", color: "#fff", border: "none",
    fontFamily: "'DM Sans', sans-serif",
    transition: "opacity 0.15s",
  },
  errorBanner: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "10px 14px", borderRadius: 9, marginBottom: 20,
    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
    color: "#f87171", fontSize: "0.85rem",
  },
  retryBtn: {
    marginLeft: "auto", background: "none", border: "none",
    color: "#f87171", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem",
  },
  center: {
    display: "flex", justifyContent: "center", padding: "60px 0",
  },
  empty: {
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "70px 0", borderRadius: 14,
    border: "1.5px dashed rgba(255,255,255,0.07)",
  },
  tableWrap: {
    borderRadius: 14, overflow: "hidden",
    border: "1.5px solid rgba(255,255,255,0.07)",
  },
  table: {
    width: "100%", borderCollapse: "collapse",
    background: "#111113",
  },
  th: {
    padding: "11px 16px", textAlign: "left",
    fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
    letterSpacing: "0.08em", color: "#52525b",
    borderBottom: "1.5px solid rgba(255,255,255,0.06)",
  },
  tr: {
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    animation: "fadeUp 0.3s ease both",
  },
  td: {
    padding: "13px 16px", fontSize: "0.85rem", verticalAlign: "middle",
  },
  colorDot: {
    width: 11, height: 11, borderRadius: "50%", flexShrink: 0, display: "inline-block",
  },
  hexCode: {
    fontSize: "0.75rem", color: "#71717a",
    background: "rgba(255,255,255,0.05)", padding: "2px 7px", borderRadius: 5,
  },
  badge: {
    display: "inline-block", padding: "3px 10px",
    borderRadius: 20, fontSize: "0.72rem", fontWeight: 700,
  },
  overlay: {
    position: "fixed", inset: 0, zIndex: 999,
    background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 20,
  },
  modal: {
    width: "100%", background: "#18181b",
    border: "1.5px solid rgba(255,255,255,0.08)",
    borderRadius: 16, padding: "32px 28px", position: "relative",
  },
  closeBtn: {
    position: "absolute", top: 14, right: 14,
    background: "none", border: "none", color: "#52525b",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    width: 28, height: 28, borderRadius: 7,
    transition: "color 0.15s",
  },
  modalTitle: {
    margin: "0 0 22px", fontSize: "1.1rem", fontWeight: 800,
    color: "#fafafa", letterSpacing: "-0.01em",
  },
  fieldLabel: {
    display: "block", fontSize: "0.71rem", fontWeight: 700,
    textTransform: "uppercase", letterSpacing: "0.07em",
    color: "#71717a", marginBottom: 7,
  },
  input: {
    width: "100%", padding: "9px 12px",
    background: "#09090b", border: "1.5px solid rgba(255,255,255,0.09)",
    borderRadius: 9, color: "#e4e4e7", fontSize: "0.87rem",
    fontFamily: "'DM Sans', sans-serif", outline: "none",
    boxSizing: "border-box", marginBottom: 0,
  },
  formError: {
    display: "flex", alignItems: "center", gap: 6,
    color: "#f87171", fontSize: "0.8rem", marginTop: 4,
  },
  cancelBtn: {
    flex: 1, padding: "9px 0", borderRadius: 9, fontWeight: 700,
    fontSize: "0.85rem", cursor: "pointer",
    background: "transparent", color: "#71717a",
    border: "1.5px solid rgba(255,255,255,0.09)",
    fontFamily: "'DM Sans', sans-serif",
  },
  submitBtn: {
    flex: 2, padding: "9px 0", borderRadius: 9, fontWeight: 700,
    fontSize: "0.85rem", cursor: "pointer",
    background: "#f97316", color: "#fff", border: "none",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
    fontFamily: "'DM Sans', sans-serif",
  },
  deleteIcon: {
    width: 52, height: 52, borderRadius: "50%",
    background: "rgba(239,68,68,0.1)", border: "1.5px solid rgba(239,68,68,0.2)",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 16px",
  },
};

export default AdminCategories;