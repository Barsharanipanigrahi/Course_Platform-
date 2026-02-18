import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddCourses({ fetchCourses, setShowForm, editCourses, setEditCourses }) {
  const [courseData, setCourseData] = useState({
    title: "",
    price: "",
    description: "",
    image: ""
  });

  // Fill form when editing
  useEffect(() => {
    if (editCourses) {
      setCourseData({
        title: editCourses.title || "",
        price: editCourses.price || "",
        description: editCourses.description || "",
        image: editCourses.image || "",
      });
    }
  }, [editCourses]);

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editCourses) {
        // ✅ UPDATE API
        await axios.put(
          import.meta.env.VITE_BACKEND_URL + `/course/edit/${editCourses._id}`,
          courseData
        );
        alert("Course Updated Successfully");
        setEditCourses(null);
      } else {
        // ✅ ADD API
        await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/course/add",
          courseData
        );
        alert("Course Added Successfully");
      }

      fetchCourses(); // refresh list
      setShowForm(false);
      setCourseData({ title: "", price: "", description: ""}); // reset form

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">{editCourses ? "Edit Course" : "Add New Course"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <input
          type="text"
          name="title"
          value={courseData.title}
          placeholder="Course Name"
          onChange={handleChange}
          required
          className="border p-2"
        />

        <input
          type="number"
          name="price"
          value={courseData.price}
          placeholder="Course Price"
          onChange={handleChange}
          required
          className="border p-2"
        />

        <textarea
          name="description"
          value={courseData.description}
          placeholder="Description"
          onChange={handleChange}
          className="border p-2"
        />

        

        <button type="submit" className="bg-yellow-500 text-white p-2">
          {editCourses ? "Update Course" : "Add Course"}
        </button>

      </form>
    </div>
  );
}
