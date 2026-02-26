import React, { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Eye,
  Pencil,
  Trash2,
  PlusCircle,
  BookOpen,
} from "lucide-react";

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

  // FETCH COURSES
  const fetchCourses = async () => {
    try {
      const res = await api.get("/course/get");
      if (res.data.status) {
        setCourses(res.data.courses);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ADD COURSE
  const addCourse = async (data) => {
    const res = await api.post("/course/add", data);
    if (res.data.status) {
      setAddOpen(false);
      fetchCourses();
    }
  };

  // UPDATE COURSE
  const updateCourse = async (data) => {
    const res = await api.put(`/course/update/${data._id}`, data);
    if (res.data.status) {
      setEditOpen(false);
      fetchCourses();
    }
  };

  // DELETE COURSE
  const deleteCourse = async () => {
    const res = await api.delete(`/course/delete/${selected._id}`);
    if (res.data.status) {
      setDeleteOpen(false);
      fetchCourses();
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-800">
            Admin Courses
          </h1>
        </div>

        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white
                     px-4 py-2 rounded-lg shadow
                     hover:bg-blue-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Add Course
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-6 text-slate-500">
                  No courses found
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-3 font-medium text-slate-800">
                    {course.title}
                  </td>

                  <td className="p-3 text-slate-600">
                    ₹ {course.price}
                  </td>

                  <td className="p-3">
                    <div className="flex items-center justify-center gap-4">
                      {/* View */}
                      <button
                        title="View"
                        onClick={() => {
                          setSelected(course);
                          setViewOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                      {/* Edit */}
                      <button
                        title="Edit"
                        onClick={() => {
                          setSelected(course);
                          setEditOpen(true);
                        }}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>

                      {/* Delete */}
                      <button
                        title="Delete"
                        onClick={() => {
                          setSelected(course);
                          setDeleteOpen(true);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      <AddCourseModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={addCourse}
      />

      <EditCourseModal
        open={editOpen}
        course={selected}
        onClose={() => setEditOpen(false)}
        onUpdate={updateCourse}
      />

      <ViewCourseModal
        open={viewOpen}
        course={selected}
        onClose={() => setViewOpen(false)}
      />
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
