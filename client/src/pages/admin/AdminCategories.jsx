import React, { useState, useEffect, useCallback } from "react";
import { Tag, Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Check, Loader2, AlertCircle } from "lucide-react";

const API = "/api/category";
const HEX_RE = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
const PRESET_COLORS = ["#f97316","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899","#ef4444","#14b8a6"];

const AdminCategories = () => {
  const [categories, setCategories]     = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [showForm, setShowForm]         = useState(false);
  const [editTarget, setEditTarget]     = useState(null);
  const [formData, setFormData]         = useState({ name: "", description: "", color: "#f97316" });
  const [formError, setFormError]       = useState(null);
  const [formLoading, setFormLoading]   = useState(false);
  const [deleteId, setDeleteId]         = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [togglingId, setTogglingId]     = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res  = await fetch(`${API}/admin/all`);
      const data = await res.json();
      if (!data.status) throw new Error(data.message || "Failed to load");
      setCategories(data.categories);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const openAdd = () => { setEditTarget(null); setFormData({ name: "", description: "", color: "#f97316" }); setFormError(null); setShowForm(true); };
  const openEdit = (cat) => { setEditTarget(cat); setFormData({ name: cat.name, description: cat.description || "", color: cat.color || "#f97316" }); setFormError(null); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setFormError(null); };

  const handleSubmit = async () => {
    const { name, description, color } = formData;
    if (!name.trim()) return setFormError("Category name is required.");
    if (color && !HEX_RE.test(color)) return setFormError("Color must be a valid hex e.g. #f97316");
    setFormLoading(true); setFormError(null);
    try {
      const url    = editTarget ? `${API}/update/${editTarget._id}` : `${API}/add`;
      const method = editTarget ? "PUT" : "POST";
      const res    = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim(), description: description.trim(), color }) });
      const data   = await res.json();
      if (!data.status) throw new Error(data.message || "Operation failed");
      closeForm(); fetchCategories();
    } catch (e) { setFormError(e.message); }
    finally { setFormLoading(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      const res  = await fetch(`${API}/delete/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.status) throw new Error(data.message);
      setDeleteId(null); fetchCategories();
    } catch (e) { alert(e.message); }
    finally { setDeleteLoading(false); }
  };

  const handleToggle = async (id) => {
    setTogglingId(id);
    try {
      const res  = await fetch(`${API}/toggle/${id}`, { method: "PATCH" });
      const data = await res.json();
      if (!data.status) throw new Error(data.message);
      setCategories(prev => prev.map(c => c._id === id ? { ...c, isActive: data.category.isActive } : c));
    } catch (e) { alert(e.message); }
    finally { setTogglingId(null); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#09090b", padding: "1.25rem", fontFamily: "'DM Sans', sans-serif", color: "#e4e4e7" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .table-scroll { overflow-x:auto; -webkit-overflow-scrolling:touch; border-radius:14px; border:1.5px solid rgba(255,255,255,0.07); }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800, color: "#fafafa", letterSpacing: "-0.02em" }}>Categories</h1>
          <p style={{ margin: "4px 0 0", fontSize: "0.83rem", color: "#52525b" }}>Manage course categories</p>
        </div>
        <button onClick={openAdd} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 10, fontWeight: 700, fontSize: "0.83rem", cursor: "pointer", background: "#f97316", color: "#fff", border: "none", fontFamily: "'DM Sans', sans-serif" }}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 9, marginBottom: 20, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", fontSize: "0.85rem" }}>
          <AlertCircle size={15} />{error}
          <button onClick={fetchCategories} style={{ marginLeft: "auto", background: "none", border: "none", color: "#f87171", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem" }}>Retry</button>
        </div>
      )}

      {loading && <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}><Loader2 size={24} style={{ animation: "spin 1s linear infinite", color: "#f97316" }} /></div>}

      {!loading && !error && categories.length === 0 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "70px 0", borderRadius: 14, border: "1.5px dashed rgba(255,255,255,0.07)" }}>
          <Tag size={32} style={{ color: "#3f3f46", marginBottom: 12 }} />
          <p style={{ color: "#52525b", margin: 0 }}>No categories yet. Add your first one!</p>
        </div>
      )}

      {!loading && categories.length > 0 && (
        <div className="table-scroll">
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#111113", minWidth: 520 }}>
            <thead>
              <tr>
                {["Name", "Description", "Color", "Status", "Actions"].map(h => (
                  <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#52525b", borderBottom: "1.5px solid rgba(255,255,255,0.06)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr key={cat._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", animation: "fadeUp 0.3s ease both", animationDelay: `${i * 40}ms` }}>
                  <td style={{ padding: "13px 16px", fontSize: "0.85rem", verticalAlign: "middle" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <span style={{ width: 11, height: 11, borderRadius: "50%", flexShrink: 0, display: "inline-block", background: cat.color || "#f97316" }} />
                      <span style={{ fontWeight: 600, color: "#e4e4e7" }}>{cat.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: "0.85rem", verticalAlign: "middle", color: "#71717a", maxWidth: 200 }}>
                    {cat.description || <span style={{ color: "#3f3f46" }}>—</span>}
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: "0.85rem", verticalAlign: "middle" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, display: "inline-block", background: cat.color || "#f97316" }} />
                      <code style={{ fontSize: "0.75rem", color: "#71717a", background: "rgba(255,255,255,0.05)", padding: "2px 7px", borderRadius: 5 }}>{cat.color || "#f97316"}</code>
                    </div>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: "0.85rem", verticalAlign: "middle" }}>
                    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 700, background: cat.isActive ? "rgba(16,185,129,0.12)" : "rgba(113,113,122,0.12)", color: cat.isActive ? "#10b981" : "#52525b", border: `1px solid ${cat.isActive ? "rgba(16,185,129,0.25)" : "rgba(113,113,122,0.2)"}` }}>
                      {cat.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: "0.85rem", verticalAlign: "middle" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <ActionBtn title={cat.isActive ? "Deactivate" : "Activate"} color={cat.isActive ? "#10b981" : "#52525b"} onClick={() => handleToggle(cat._id)} loading={togglingId === cat._id}>
                        {cat.isActive ? <ToggleRight size={15} /> : <ToggleLeft size={15} />}
                      </ActionBtn>
                      <ActionBtn title="Edit" color="#3b82f6" onClick={() => openEdit(cat)}><Pencil size={14} /></ActionBtn>
                      <ActionBtn title="Delete" color="#ef4444" onClick={() => setDeleteId(cat._id)}><Trash2 size={14} /></ActionBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <Modal onClose={closeForm}>
          <h2 style={{ margin: "0 0 22px", fontSize: "1.1rem", fontWeight: 800, color: "#fafafa" }}>{editTarget ? "Edit Category" : "Add Category"}</h2>
          <Field label="Name *">
            <input style={inputStyle} placeholder="e.g. Web Development" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleSubmit()} autoFocus />
          </Field>
          <Field label="Description">
            <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 72 }} placeholder="Optional short description…" value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} />
          </Field>
          <Field label="Accent Color">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
              {PRESET_COLORS.map(c => (
                <button key={c} type="button" onClick={() => setFormData(p => ({ ...p, color: c }))} style={{ width: 26, height: 26, borderRadius: "50%", background: c, border: formData.color === c ? "3px solid #fff" : "3px solid transparent", cursor: "pointer", boxShadow: formData.color === c ? `0 0 0 2px ${c}` : "none" }} />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 28, height: 28, borderRadius: 6, background: formData.color, flexShrink: 0, border: "1.5px solid rgba(255,255,255,0.1)" }} />
              <input style={{ ...inputStyle, flex: 1, marginBottom: 0, fontFamily: "monospace" }} value={formData.color} onChange={e => setFormData(p => ({ ...p, color: e.target.value }))} placeholder="#f97316" />
            </div>
          </Field>
          {formError && <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#f87171", fontSize: "0.8rem", marginTop: 4 }}><AlertCircle size={13} /> {formError}</div>}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button style={cancelBtnStyle} onClick={closeForm} disabled={formLoading}>Cancel</button>
            <button style={submitBtnStyle} onClick={handleSubmit} disabled={formLoading}>
              {formLoading ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Check size={14} />}
              {editTarget ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <Modal onClose={() => setDeleteId(null)} width={380}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(239,68,68,0.1)", border: "1.5px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Trash2 size={22} color="#ef4444" /></div>
            <h2 style={{ margin: "0 0 8px", fontSize: "1.1rem", fontWeight: 800, color: "#fafafa" }}>Delete Category?</h2>
            <p style={{ color: "#71717a", fontSize: "0.87rem", marginBottom: 24 }}>This action cannot be undone. Categories with existing courses cannot be deleted.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button style={cancelBtnStyle} onClick={() => setDeleteId(null)} disabled={deleteLoading}>Cancel</button>
              <button style={{ ...submitBtnStyle, background: "#ef4444" }} onClick={handleDelete} disabled={deleteLoading}>
                {deleteLoading ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Trash2 size={14} />} Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const ActionBtn = ({ children, onClick, color, title, loading }) => {
  const [hov, setHov] = useState(false);
  return (
    <button title={title} onClick={onClick} disabled={loading} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: 30, height: 30, borderRadius: 7, border: `1.5px solid ${hov ? color : "rgba(255,255,255,0.07)"}`, background: hov ? `${color}18` : "transparent", color: hov ? color : "#52525b", cursor: loading ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
      {loading ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : children}
    </button>
  );
};

const Modal = ({ children, onClose, width = 460 }) => (
  <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={e => e.target === e.currentTarget && onClose()}>
    <div style={{ width: "100%", maxWidth: width, background: "#18181b", border: "1.5px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "32px 28px", position: "relative" }}>
      <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", color: "#52525b", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 7 }}><X size={16} /></button>
      {children}
    </div>
  </div>
);

const Field = ({ label, children }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: "0.71rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#71717a", marginBottom: 7 }}>{label}</label>
    {children}
  </div>
);

const inputStyle = { width: "100%", padding: "9px 12px", background: "#09090b", border: "1.5px solid rgba(255,255,255,0.09)", borderRadius: 9, color: "#e4e4e7", fontSize: "0.87rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" };
const cancelBtnStyle = { flex: 1, padding: "9px 0", borderRadius: 9, fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", background: "transparent", color: "#71717a", border: "1.5px solid rgba(255,255,255,0.09)", fontFamily: "'DM Sans', sans-serif" };
const submitBtnStyle = { flex: 2, padding: "9px 0", borderRadius: 9, fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", background: "#f97316", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: "'DM Sans', sans-serif" };

export default AdminCategories;