import React, { useState } from "react";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const TAGS   = ["None", "Popular", "Hot", "Trending", "New"];

const AddCourseModal = ({ open, onClose, onSave, categories = [] }) => {
  const [form, setForm] = useState({
    title: "", description: "", price: "",
    category: "",duration:"", level: "", tag: "",
    
  });

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const toggle = (field, value) =>
    setForm(f => ({ ...f, [field]: f[field] === value ? "" : value }));

  const handleSubmit = () => {
    if (!form.title.trim()) { alert("Please enter a course title."); return; }
    onSave({
      ...form,
      price: form.price === "" ? 0 : Number(form.price),
      tag: form.tag === "None" || form.tag === "" ? null : form.tag,
    });
    setForm({ title: "", description: "", price: "", category: "", level: "", tag: "",duration:"", });
    onClose();
  };

  const inp = {
    width: "100%", padding: "10px 13px",
    background: "#27272a", border: "1.5px solid rgba(255,255,255,0.08)",
    borderRadius: 9, color: "#fafafa", fontSize: "0.9rem",
    fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box",
  };
  const focusAmber = (e) => e.target.style.borderColor = "rgba(245,158,11,0.5)";
  const blurAmber  = (e) => e.target.style.borderColor = "rgba(255,255,255,0.08)";

  const lbl = (text, required) => (
    <label style={{ display:"block", fontSize:"0.72rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:"#a1a1aa", marginBottom:6 }}>
      {text}{required && <span style={{ color:"#f59e0b", marginLeft:4 }}>*</span>}
    </label>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .acm-scroll::-webkit-scrollbar{width:4px;}
        .acm-scroll::-webkit-scrollbar-track{background:transparent;}
        .acm-scroll::-webkit-scrollbar-thumb{background:rgba(245,158,11,0.3);border-radius:4px;}
        @keyframes acm-in{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
      `}</style>

      <div
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(4px)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}
      >
        <div className="acm-scroll"
          style={{ background:"#1c1c1f", border:"1px solid rgba(245,158,11,0.2)", borderRadius:18, width:"100%", maxWidth:480, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 24px 64px rgba(0,0,0,0.7)", fontFamily:"'DM Sans',sans-serif", animation:"acm-in 0.2s ease" }}
        >

          {/* Header */}
          <div style={{ padding:"1.3rem 1.6rem", borderBottom:"1px solid rgba(245,158,11,0.1)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontWeight:800, fontSize:"1.1rem", color:"#fafafa" }}>Add New Course</div>
              <div style={{ fontSize:"0.78rem", color:"#52525b", marginTop:2 }}>Fill in the course details below</div>
            </div>
            <button onClick={onClose}
              style={{ width:30, height:30, borderRadius:8, background:"rgba(255,255,255,0.06)", border:"none", cursor:"pointer", color:"#71717a", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}
              onMouseEnter={e => e.currentTarget.style.color = "#f87171"}
              onMouseLeave={e => e.currentTarget.style.color = "#71717a"}
            >✕</button>
          </div>

          {/* Body */}
          <div style={{ padding:"1.6rem", display:"flex", flexDirection:"column", gap:"1.1rem" }}>

            {/* Title */}
            <div>
              {lbl("Course Title", true)}
              <input name="title" type="text" placeholder="e.g. Full Stack Web Development"
                value={form.title} onChange={handleChange}
                style={inp} onFocus={focusAmber} onBlur={blurAmber}
              />
            </div>

            {/* Description */}
            <div>
              {lbl("Description")}
              <textarea name="description" rows={3} placeholder="Brief course description..."
                value={form.description} onChange={handleChange}
                style={{ ...inp, resize:"vertical", minHeight:80 }}
                onFocus={focusAmber} onBlur={blurAmber}
              />
            </div>

            {/* Price */}
            <div>
              {lbl("Price (₹)")}
              <input name="price" type="number" placeholder="0"
                value={form.price} onChange={handleChange}
                style={inp} onFocus={focusAmber} onBlur={blurAmber}
              />
              <label style={{ display:"flex", alignItems:"center", gap:7, marginTop:7, cursor:"pointer", width:"fit-content" }}>
                <input type="checkbox" style={{ accentColor:"#f59e0b", cursor:"pointer" }}
                  checked={form.price === 0 || form.price === "0"}
                  onChange={e => setForm(f => ({ ...f, price: e.target.checked ? 0 : "" }))}
                />
                <span style={{ fontSize:"0.78rem", color:"#71717a" }}>Free course</span>
              </label>
            </div>
            <div style={{ height:1, background:"rgba(255,255,255,0.06)" }} />
            {/* {duration} */}
            <div>
                {lbl("Duration")}
                <input
                  name="duration"
                  type="text"
                  placeholder="e.g. 3 months / 40 hours"
                  value={form.duration}
                  onChange={handleChange}
                  style={inp}
                  onFocus={focusAmber}
                  onBlur={blurAmber}
                />
            </div>

            {/* Category */}
            <div>
              {lbl("Category")}
              {categories.length === 0 ? (
                <div style={{ background:"rgba(245,158,11,0.06)", border:"1px solid rgba(245,158,11,0.15)", borderRadius:9, padding:"10px 14px", fontSize:"0.82rem", color:"#71717a" }}>
                  No categories yet.{" "}
                  <a href="/admin/categories" target="_blank" style={{ color:"#f59e0b", textDecoration:"underline", fontWeight:600 }}>Add categories first →</a>
                </div>
              ) : (
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {categories.map(cat => {
                    const active = form.category === cat._id;
                    return (
                      <button key={cat._id} type="button" onClick={() => toggle("category", cat._id)}
                        style={{
                          display:"flex", alignItems:"center", gap:6,
                          padding:"6px 13px", borderRadius:100, fontSize:"0.78rem", fontWeight:600,
                          cursor:"pointer", transition:"all 0.18s", fontFamily:"'DM Sans',sans-serif",
                          border:`1.5px solid ${active ? (cat.color||"#f59e0b") : "rgba(255,255,255,0.1)"}`,
                          background: active ? `${cat.color||"#f59e0b"}18` : "transparent",
                          color: active ? (cat.color||"#f59e0b") : "rgba(255,255,255,0.5)",
                          boxShadow: active ? `0 0 0 3px ${cat.color||"#f59e0b"}18` : "none",
                        }}
                      >
                        <span style={{ fontSize:13 }}>{cat.icon || "📖"}</span>
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div style={{ height:1, background:"rgba(255,255,255,0.06)" }} />

            {/* Level */}
            <div>
              {lbl("Difficulty Level")}
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {LEVELS.map(lvl => {
                  const active = form.level === lvl;
                  const clr = { Beginner:"#22c55e", Intermediate:"#f97316", Advanced:"#ef4444" }[lvl];
                  return (
                    <button key={lvl} type="button" onClick={() => toggle("level", lvl)}
                      style={{
                        padding:"6px 16px", borderRadius:100, fontSize:"0.78rem", fontWeight:600,
                        cursor:"pointer", transition:"all 0.18s", fontFamily:"'DM Sans',sans-serif",
                        border:`1.5px solid ${active ? clr : "rgba(255,255,255,0.1)"}`,
                        background: active ? `${clr}18` : "transparent",
                        color: active ? clr : "rgba(255,255,255,0.5)",
                        boxShadow: active ? `0 0 0 3px ${clr}18` : "none",
                      }}
                    >{lvl}</button>
                  );
                })}
              </div>
            </div>

            {/* Tag */}
            <div>
              {lbl("Badge / Tag")}
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {TAGS.map(tag => {
                  const isSelected = (tag === "None" && !form.tag) || form.tag === tag;
                  const tagClr = { Popular:"#f97316", Hot:"#ef4444", Trending:"#a78bfa", New:"#22c55e" }[tag] || "#f59e0b";
                  return (
                    <button key={tag} type="button"
                      onClick={() => setForm(f => ({ ...f, tag: tag === "None" ? "" : (f.tag === tag ? "" : tag) }))}
                      style={{
                        padding:"6px 13px", borderRadius:100, fontSize:"0.78rem", fontWeight:600,
                        cursor:"pointer", transition:"all 0.18s", fontFamily:"'DM Sans',sans-serif",
                        border:`1.5px solid ${isSelected ? tagClr : "rgba(255,255,255,0.1)"}`,
                        background: isSelected ? `${tagClr}${tag === "None" ? "0d" : "18"}` : "transparent",
                        color: isSelected ? tagClr : "rgba(255,255,255,0.5)",
                        boxShadow: isSelected ? `0 0 0 3px ${tagClr}18` : "none",
                      }}
                    >{tag}</button>
                  );
                })}
              </div>
            </div>
            {/* Duration */}
            <div>
              {lbl("Duration")}
              <input
                name="duration"
                type="text"
                placeholder="e.g. 3 months / 40 hours"
                value={form.duration}
                onChange={handleChange}
                style={inp}
                onFocus={focusAmber}
                onBlur={blurAmber}
              />
            </div>

          </div>

          {/* Footer */}
          <div style={{ padding:"1rem 1.6rem 1.4rem", display:"flex", gap:10, justifyContent:"flex-end", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
            <button onClick={onClose}
              style={{ padding:"9px 18px", borderRadius:9, background:"transparent", border:"1px solid rgba(255,255,255,0.1)", color:"#a1a1aa", fontSize:"0.86rem", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >Cancel</button>
            <button onClick={handleSubmit}
              style={{ padding:"9px 22px", borderRadius:9, background:"#f59e0b", color:"#18181b", fontSize:"0.86rem", fontWeight:700, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 16px rgba(245,158,11,0.35)" }}
              onMouseEnter={e => e.currentTarget.style.background = "#fcd34d"}
              onMouseLeave={e => e.currentTarget.style.background = "#f59e0b"}
            >Save Course</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default AddCourseModal;