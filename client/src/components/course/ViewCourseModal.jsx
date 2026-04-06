import React from "react";
import { X, BookOpen, Tag, BarChart2, IndianRupee } from "lucide-react";

const CAT_EMOJI = {
  "Computer Science": "💻", "Mathematics": "📐", "Electronics": "⚡",
  "Data Science": "📊", "Sciences": "🔬", "Humanities": "🌍",
  "Cybersecurity": "🛡️", "Design & UX": "🎨",
};

const LEVEL_COLORS = {
  Beginner: "#22c55e", Intermediate: "#f97316", Advanced: "#ef4444",
};

const TAG_COLORS = {
  Popular: "#f97316", Hot: "#ef4444", Trending: "#a78bfa", New: "#22c55e",
};

const ViewCourseModal = ({ open, course, onClose, categories = [] }) => {
  if (!open || !course) return null;

  const getCat = () => {
    if (!course.category) return null;
    const id = typeof course.category === "object" ? course.category._id : course.category;
    return categories.find(c => c._id === id) || course.category;
  };

  const cat      = getCat();
  const catName  = typeof cat === "object" ? cat?.name  : cat;
  const catColor = typeof cat === "object" ? cat?.color : "#2dd4bf";
  const emoji    = catName ? (CAT_EMOJI[catName] || "📖") : null;
  const lvlColor = course.level ? (LEVEL_COLORS[course.level] || "#2dd4bf") : null;
  const tagColor = course.tag   ? (TAG_COLORS[course.tag]     || "#f59e0b") : null;
  const isFree   = !course.price || course.price === "Free" || course.price === 0;

  const row = (label, content) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#52525b" }}>{label}</div>
      {content}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes vcm-in { from{opacity:0;transform:scale(0.96) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .vcm-close:hover { background: rgba(255,255,255,0.1) !important; color: #f87171 !important; }
        .vcm-scroll::-webkit-scrollbar{width:4px;}
        .vcm-scroll::-webkit-scrollbar-track{background:transparent;}
        .vcm-scroll::-webkit-scrollbar-thumb{background:rgba(245,158,11,0.3);border-radius:4px;}
      `}</style>

      <div
        onClick={e => e.target === e.currentTarget && onClose()}
        style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(4px)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem", fontFamily:"'DM Sans',sans-serif" }}
      >
        <div
          className="vcm-scroll"
          style={{ background:"#1c1c1f", border:"1px solid rgba(245,158,11,0.2)", borderRadius:18, width:"100%", maxWidth:500, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 24px 64px rgba(0,0,0,0.7)", animation:"vcm-in 0.22s ease", overflow:"hidden" }}
        >

          {/* Header */}
          <div style={{ background:"#18181b", padding:"1.3rem 1.6rem", borderBottom:"1px solid rgba(245,158,11,0.1)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:"rgba(245,158,11,0.12)", border:"1px solid rgba(245,158,11,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>
                {emoji ? emoji : <BookOpen size={18} color="#f59e0b" />}
              </div>
              <div>
                <div style={{ fontWeight:800, fontSize:"1rem", color:"#fafafa", lineHeight:1.2 }}>Course Details</div>
                <div style={{ fontSize:"0.75rem", color:"#52525b", marginTop:2 }}>Full information</div>
              </div>
            </div>
            <button className="vcm-close" onClick={onClose}
              style={{ width:32, height:32, borderRadius:8, background:"rgba(255,255,255,0.05)", border:"none", cursor:"pointer", color:"#71717a", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s,color 0.15s" }}
            ><X size={16} /></button>
          </div>

          {/* Body */}
          <div style={{ padding:"1.6rem", display:"flex", flexDirection:"column", gap:"1.3rem" }}>

            {/* Title */}
            {row("Course Title",
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.3rem", fontWeight:900, color:"#fafafa", lineHeight:1.2, margin:0 }}>
                {course.title}
              </h2>
            )}

            <div style={{ height:1, background:"rgba(255,255,255,0.06)" }} />

            {/* Badges */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {catName && (
                <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:"0.72rem", fontWeight:700, padding:"4px 11px", borderRadius:100, background:`${catColor||"#2dd4bf"}18`, color:catColor||"#2dd4bf", border:`1px solid ${catColor||"#2dd4bf"}30` }}>
                  <Tag size={10} /> {catName}
                </span>
              )}
              {course.level && (
                <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:"0.72rem", fontWeight:700, padding:"4px 11px", borderRadius:100, background:`${lvlColor}18`, color:lvlColor, border:`1px solid ${lvlColor}30` }}>
                  <BarChart2 size={10} /> {course.level}
                </span>
              )}
              {course.tag && (
                <span style={{ fontSize:"0.72rem", fontWeight:700, padding:"4px 11px", borderRadius:100, background:`${tagColor}18`, color:tagColor, border:`1px solid ${tagColor}30` }}>
                  {course.tag}
                </span>
              )}
            </div>

            <div style={{ height:1, background:"rgba(255,255,255,0.06)" }} />

            {/* Description */}
            {row("Description",
              <p style={{ color:"rgba(250,250,250,0.6)", fontSize:"0.9rem", lineHeight:1.75, margin:0 }}>
                {course.description || <span style={{ color:"#3f3f46", fontStyle:"italic" }}>No description provided.</span>}
              </p>
            )}

            <div style={{ height:1, background:"rgba(255,255,255,0.06)" }} />

            {/* Price */}
            {row("Price",
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                {!isFree && <IndianRupee size={16} color="#f59e0b" />}
                <span style={{ fontSize:"1.2rem", fontWeight:900, color: isFree ? "#22c55e" : "#f59e0b" }}>
                  {isFree ? "Free" : course.price}
                </span>
              </div>
            )}
          </div>

          {/* {duration} */}
          {course.duration && (
                    <>
                      <div style={{ height:1, background:"rgba(255,255,255,0.06)" }} />
                      {row("Duration",
                        <span style={{
                          fontSize:"1rem",
                          fontWeight:700,
                          color:"#a78bfa"
                        }}>
                          {course.duration}
                        </span>
                      )}
                    </>
          )}

          {/* Footer */}
          <div style={{ padding:"1rem 1.6rem 1.4rem", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", justifyContent:"flex-end" }}>
            <button onClick={onClose}
              style={{ padding:"9px 22px", borderRadius:9, background:"#f59e0b", color:"#18181b", fontSize:"0.86rem", fontWeight:700, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 16px rgba(245,158,11,0.3)" }}
              onMouseEnter={e => e.currentTarget.style.background = "#fcd34d"}
              onMouseLeave={e => e.currentTarget.style.background = "#f59e0b"}
            >Close</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ViewCourseModal;