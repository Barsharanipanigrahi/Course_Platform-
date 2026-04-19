import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Eye, Pencil, Trash2, PlusCircle, BookOpen } from "lucide-react";
import ViewCourseModal from "../../components/course/ViewCourseModal";
import EditCourseModal from "../../components/course/EditCourseModal";
import AddCourseModal from "../../components/course/AddCourseModal";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";

const skeletonBase = {
  background: "linear-gradient(90deg, #323235 25%, #3a3a3e 50%, #323235 75%)",
  backgroundSize: "200% 100%",
  animation: "skeletonShimmer 1.6s ease-in-out infinite",
  borderRadius: 6,
};

const SkeletonCourseRow = ({ i }) => (
  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
    <td style={{ padding: "1rem" }}><div style={{ ...skeletonBase, width: 140, height: 13 }} /></td>
    <td style={{ padding: "1rem" }}><div style={{ ...skeletonBase, width: 200, height: 13 }} /></td>
    <td style={{ padding: "1rem" }}><div style={{ ...skeletonBase, width: 80, height: 24, borderRadius: 20 }} /></td>
    <td style={{ padding: "1rem" }}><div style={{ ...skeletonBase, width: 50, height: 13 }} /></td>
    <td style={{ padding: "1rem" }}><div style={{ display: "flex", justifyContent: "center", gap: 20 }}>{[0,1,2].map(j => <div key={j} style={{ ...skeletonBase, width: 18, height: 18, borderRadius: 4 }} />)}</div></td>
  </tr>
);

const getCatId = (course) => course.category ? typeof course.category === "object" ? course.category._id : course.category : null;

const AdminCourses = () => {
  const [courses, setCourses]         = useState([]);
  const [categories, setCategories]   = useState([]);
  const [selected, setSelected]       = useState(null);
  const [loading, setLoading]         = useState(true);
  const [addOpen, setAddOpen]         = useState(false);
  const [editOpen, setEditOpen]       = useState(false);
  const [viewOpen, setViewOpen]       = useState(false);
  const [deleteOpen, setDeleteOpen]   = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/course/get");
      if (res.data.status) setCourses(res.data.courses);
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category/get");
      if (res.data.status) setCategories(res.data.categories);
    } catch {
      try {
        const res2 = await api.get("/category/admin/all");
        if (res2.data.status) setCategories(res2.data.categories.filter(c => c.isActive));
      } catch (_) {}
    }
  };

  useEffect(() => { fetchCourses(); fetchCategories(); }, []);

  const addCourse    = async (data) => { const res = await api.post("/course/add", data); if (res.data.status) { setAddOpen(false); fetchCourses(); } };
  const updateCourse = async (data) => { const res = await api.put(`/course/update/${data._id}`, data); if (res.data.status) { setEditOpen(false); fetchCourses(); } };
  const deleteCourse = async ()      => { const res = await api.delete(`/course/delete/${selected._id}`); if (res.data.status) { setDeleteOpen(false); fetchCourses(); } };

  const getCategoryObj   = (course) => { const id = getCatId(course); if (!id) return null; return categories.find(c => c._id === id) || null; };
  const filteredCourses  = activeCategory ? courses.filter(c => String(getCatId(c)) === String(activeCategory)) : courses;

  return (
    <div style={{ minHeight: "100vh", padding: "1.25rem", background: "#18181b", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @keyframes skeletonShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .text-truncate { display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden; text-overflow:ellipsis; max-width:200px; }
        .filter-btn { padding:6px 14px; border-radius:20px; font-size:0.75rem; font-weight:700; border:1px solid rgba(245,158,11,0.25); background:transparent; color:#a1a1aa; cursor:pointer; transition:all 0.18s; font-family:'DM Sans',sans-serif; white-space:nowrap; }
        .filter-btn:hover { border-color:rgba(245,158,11,0.6); color:#fafafa; background:rgba(245,158,11,0.06); }
        .filter-btn.active { background:#f59e0b; border-color:#f59e0b; color:#18181b; }
        .action-btn { background:none; border:none; cursor:pointer; padding:5px; border-radius:6px; transition:background 0.15s,transform 0.15s; display:flex; align-items:center; }
        .action-btn:hover { transform:scale(1.15); background:rgba(255,255,255,0.06); }
        .table-scroll { overflow-x:auto; -webkit-overflow-scrolling:touch; border-radius:16px; border:1px solid rgba(245,158,11,0.15); box-shadow:0 8px 40px rgba(0,0,0,0.4); }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#f59e0b", marginBottom: 4 }}>Catalogue</p>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#fafafa", display: "flex", alignItems: "center", gap: 10 }}>
            <BookOpen size={24} style={{ color: "#f59e0b" }} /> Courses
          </h1>
          <p style={{ fontSize: "0.8rem", color: "#52525b", marginTop: 4 }}>
            {filteredCourses.length} of {courses.length} course{courses.length !== 1 ? "s" : ""}{activeCategory ? " in selected category" : " total"}
          </p>
        </div>
        <button onClick={() => setAddOpen(true)}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 10, background: "#f59e0b", color: "#18181b", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.9rem" }}
          onMouseEnter={e => e.currentTarget.style.background = "#fcd34d"}
          onMouseLeave={e => e.currentTarget.style.background = "#f59e0b"}
        >
          <PlusCircle size={16} /> Add Course
        </button>
      </div>

      {/* Filter Bar */}
      {!loading && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.25rem" }}>
          <button className={`filter-btn${activeCategory === null ? " active" : ""}`} onClick={() => setActiveCategory(null)}>All ({courses.length})</button>
          {categories.map(cat => {
            const count    = courses.filter(c => String(getCatId(c)) === String(cat._id)).length;
            const isActive = String(activeCategory) === String(cat._id);
            return (
              <button key={cat._id} className={`filter-btn${isActive ? " active" : ""}`} onClick={() => setActiveCategory(isActive ? null : cat._id)}
                style={isActive ? {} : { borderColor: `${cat.color || "#f59e0b"}50`, color: cat.color || "#f59e0b" }}>
                <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: isActive ? "#18181b" : (cat.color || "#f59e0b"), marginRight: 6, verticalAlign: "middle" }} />
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="table-scroll">
          <div style={{ background: "#27272a", minWidth: 600 }}>
            <table style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(245,158,11,0.08)", borderBottom: "1px solid rgba(245,158,11,0.2)" }}>
                  {["Title","Description","Category","Duration","Price","Actions"].map(h => (
                    <th key={h} style={{ padding: "1rem", fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase", color: "#f59e0b", textAlign: h === "Actions" ? "center" : "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{[...Array(6)].map((_, i) => <SkeletonCourseRow key={i} i={i} />)}</tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="table-scroll">
          <div style={{ background: "#27272a", minWidth: 600 }}>
            <table style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(245,158,11,0.08)", borderBottom: "1px solid rgba(245,158,11,0.2)" }}>
                  {["Title","Description","Category","Duration","Price","Actions"].map(h => (
                    <th key={h} style={{ padding: "1rem", fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#f59e0b", textAlign: h === "Actions" ? "center" : "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCourses.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: "3rem", color: "#52525b", fontSize: "0.9rem" }}>No courses found{activeCategory ? " for this category" : ""}</td></tr>
                ) : filteredCourses.map((course, i) => {
                  const cat = getCategoryObj(course);
                  return (
                    <tr key={course._id}
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.04)"}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)"}
                    >
                      <td style={{ padding: "1rem", fontWeight: 600, color: "#fafafa" }}>{course.title}</td>
                      <td style={{ padding: "1rem", color: "#a1a1aa", fontSize: "0.8rem" }}>
                        <div className="text-truncate" title={course.description}>{course.description || "No description provided"}</div>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        {cat ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, background: `${cat.color}18`, border: `1px solid ${cat.color}40`, fontSize: "0.75rem", fontWeight: 700, color: cat.color }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: cat.color }} />{cat.name}
                          </span>
                        ) : <span style={{ color: "#3f3f46" }}>—</span>}
                      </td>
                      <td style={{ padding: "1rem", color: "#a78bfa", fontWeight: 700 }}>{course.duration || "—"}</td>
                      <td style={{ padding: "1rem", fontWeight: 700, color: course.price === 0 ? "#22c55e" : "#f59e0b" }}>
                        {course.price === 0 ? "FREE" : `₹ ${course.price}`}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                          <button className="action-btn" title="View" onClick={() => { setSelected(course); setViewOpen(true); }} style={{ color: "#60a5fa" }}><Eye size={16} /></button>
                          <button className="action-btn" title="Edit" onClick={() => { setSelected(course); setEditOpen(true); }} style={{ color: "#34d399" }}><Pencil size={16} /></button>
                          <button className="action-btn" title="Delete" onClick={() => { setSelected(course); setDeleteOpen(true); }} style={{ color: "#f87171" }}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AddCourseModal    open={addOpen}    onClose={() => setAddOpen(false)}    onSave={addCourse}      categories={categories} />
      <EditCourseModal   open={editOpen}   onClose={() => setEditOpen(false)}   onUpdate={updateCourse} categories={categories} course={selected} />
      <ViewCourseModal   open={viewOpen}   onClose={() => setViewOpen(false)}   categories={categories} course={selected} />
      <DeleteConfirmModal open={deleteOpen} onClose={() => setDeleteOpen(false)} onDelete={deleteCourse} title="Delete Course?" description="Are you sure you want to delete this course? This action cannot be undone." confirmText="Delete Course" />
    </div>
  );
};

export default AdminCourses;