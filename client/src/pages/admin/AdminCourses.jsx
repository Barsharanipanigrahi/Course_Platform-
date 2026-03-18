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
        } catch (err) {
            console.log(err);
        }
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

    return (
        <div
            className="p-8 min-h-screen"
            style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)" }}
        >
            {/* Header */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#c9a84c" }}>
                        Catalogue
                    </p>
                    <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3" style={{ color: "#f1f5f9" }}>
                        <BookOpen className="w-7 h-7" style={{ color: "#c9a84c" }} />
                        Courses
                    </h1>
                    <div className="mt-2 h-px w-16" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
                </div>

                <button
                    onClick={() => setAddOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                        background: "linear-gradient(135deg, #c9a84c, #a8872a)",
                        color: "#0f172a",
                        boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 28px rgba(201,168,76,0.55)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,168,76,0.35)"}
                >
                    <PlusCircle className="w-4 h-4" />
                    Add Course
                </button>
            </div>

            {/* Table */}
            <div
                className="rounded-2xl overflow-hidden"
                style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                }}
            >
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ background: "rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
                            {["Title", "Price", "Actions"].map((h) => (
                                <th
                                    key={h}
                                    className={`p-4 font-semibold text-xs uppercase tracking-widest ${h === "Actions" ? "text-center" : "text-left"}`}
                                    style={{ color: "#c9a84c" }}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {courses.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center p-10" style={{ color: "#475569" }}>
                                    No courses found
                                </td>
                            </tr>
                        ) : (
                            courses.map((course, i) => (
                                <tr
                                    key={course._id}
                                    className="transition-colors duration-150"
                                    style={{
                                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                                        background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.05)"}
                                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)"}
                                >
                                    <td className="p-4 font-medium" style={{ color: "#e2e8f0" }}>{course.title}</td>
                                    <td className="p-4 font-semibold" style={{ color: "#c9a84c" }}>₹ {course.price}</td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-5">
                                            <button title="View" onClick={() => { setSelected(course); setViewOpen(true); }}
                                                style={{ color: "#60a5fa" }}
                                                onMouseEnter={e => e.currentTarget.style.color = "#93c5fd"}
                                                onMouseLeave={e => e.currentTarget.style.color = "#60a5fa"}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button title="Edit" onClick={() => { setSelected(course); setEditOpen(true); }}
                                                style={{ color: "#34d399" }}
                                                onMouseEnter={e => e.currentTarget.style.color = "#6ee7b7"}
                                                onMouseLeave={e => e.currentTarget.style.color = "#34d399"}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button title="Delete" onClick={() => { setSelected(course); setDeleteOpen(true); }}
                                                style={{ color: "#f87171" }}
                                                onMouseEnter={e => e.currentTarget.style.color = "#fca5a5"}
                                                onMouseLeave={e => e.currentTarget.style.color = "#f87171"}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <AddCourseModal open={addOpen} onClose={() => setAddOpen(false)} onSave={addCourse} />
            <EditCourseModal open={editOpen} course={selected} onClose={() => setEditOpen(false)} onUpdate={updateCourse} />
            <ViewCourseModal open={viewOpen} course={selected} onClose={() => setViewOpen(false)} />
            <DeleteConfirmModal
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onDelete={deleteCourse}
                title="Delete Course?"
                description="Are you sure you want to delete this course? This action cannot be undone."
                confirmText="Delete Course"
            />
        </div>
    );
};

export default AdminCourses;