import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Eye, Pencil, Trash2, PlusCircle, BookOpen } from "lucide-react";

import ViewCourseModal from "../../components/course/ViewCourseModal";
import EditCourseModal from "../../components/course/EditCourseModal";
import AddCourseModal from "../../components/course/AddCourseModal";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/course/get");
      if (res.data.status) setCourses(res.data.courses);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchCourses(); }, []);

  const addCourse = async (data) => {
    const res = await api.post("/course/add", data);
    if (res.data.status) { setAddOpen(false); fetchCourses(); }
  };

  const updateCourse = async (data) => {
    const res = await api.put(`/course/update/${data._id}`, data);
    if (res.data.status) { setEditOpen(false); fetchCourses(); }
  };

  const deleteCourse = async () => {
    const res = await api.delete(`/course/delete/${selected._id}`);
    if (res.data.status) { setDeleteOpen(false); fetchCourses(); }
  };

  const rowHoverEnter = (e, i) => { e.currentTarget.style.background = "rgba(245,158,11,0.05)"; };
  const rowHoverLeave = (e, i) => { e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)"; };

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", background: "#18181b", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#f59e0b", marginBottom: 4 }}>
            Catalogue
          </p>
          <h1 style={{ fontSize: "1.875rem", fontWeight: 900, color: "#fafafa", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 10 }}>
            <BookOpen size={26} style={{ color: "#f59e0b" }} />
            Courses
          </h1>
          <div style={{ marginTop: 10, height: 2, width: 56, background: "linear-gradient(90deg, #f59e0b, transparent)", borderRadius: 2 }} />
        </div>

        <button
          onClick={() => setAddOpen(true)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 20px", borderRadius: 10,
            background: "#f59e0b", color: "#18181b",
            fontSize: "0.87rem", fontWeight: 700, border: "none", cursor: "pointer",
            boxShadow: "0 4px 20px rgba(245,158,11,0.35)",
            transition: "background 0.2s, transform 0.15s",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#fcd34d"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#f59e0b"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <PlusCircle size={16} /> Add Course
        </button>
      </div>

      {/* Table */}
      <div style={{
        borderRadius: 16, overflow: "hidden",
        background: "#27272a",
        border: "1px solid rgba(245,158,11,0.15)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
      }}>
        <table style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(245,158,11,0.08)", borderBottom: "1px solid rgba(245,158,11,0.2)" }}>
              {["Title", "Price", "Actions"].map((h) => (
                <th key={h} style={{
                  padding: "1rem", fontWeight: 700, fontSize: "0.68rem",
                  textTransform: "uppercase", letterSpacing: "0.12em",
                  color: "#f59e0b", textAlign: h === "Actions" ? "center" : "left",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: "2.5rem", color: "#52525b", fontSize: "0.875rem" }}>
                  No courses found
                </td>
              </tr>
            ) : courses.map((course, i) => (
              <tr
                key={course._id}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)", cursor: "default", transition: "background 0.15s" }}
                onMouseEnter={e => rowHoverEnter(e, i)}
                onMouseLeave={e => rowHoverLeave(e, i)}
              >
                <td style={{ padding: "1rem", fontWeight: 600, color: "#fafafa" }}>{course.title}</td>
                <td style={{ padding: "1rem", fontWeight: 700, color: "#f59e0b" }}>₹ {course.price}</td>
                <td style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
                    <button title="View"
                      onClick={() => { setSelected(course); setViewOpen(true); }}
                      style={{ color: "#60a5fa", background: "none", border: "none", cursor: "pointer", transition: "color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#93c5fd"}
                      onMouseLeave={e => e.currentTarget.style.color = "#60a5fa"}
                    >
                      <Eye size={16} />
                    </button>
                    <button title="Edit"
                      onClick={() => { setSelected(course); setEditOpen(true); }}
                      style={{ color: "#34d399", background: "none", border: "none", cursor: "pointer", transition: "color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#6ee7b7"}
                      onMouseLeave={e => e.currentTarget.style.color = "#34d399"}
                    >
                      <Pencil size={16} />
                    </button>
                    <button title="Delete"
                      onClick={() => { setSelected(course); setDeleteOpen(true); }}
                      style={{ color: "#f87171", background: "none", border: "none", cursor: "pointer", transition: "color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#fca5a5"}
                      onMouseLeave={e => e.currentTarget.style.color = "#f87171"}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddCourseModal open={addOpen} onClose={() => setAddOpen(false)} onSave={addCourse} />
      <EditCourseModal open={editOpen} course={selected} onClose={() => setEditOpen(false)} onUpdate={updateCourse} />
      <ViewCourseModal open={viewOpen} course={selected} onClose={() => setViewOpen(false)} />
      <DeleteConfirmModal
        open={deleteOpen} onClose={() => setDeleteOpen(false)} onDelete={deleteCourse}
        title="Delete Course?" description="Are you sure you want to delete this course? This action cannot be undone." confirmText="Delete Course"
      />
    </div>
  );
};

export default AdminCourses;