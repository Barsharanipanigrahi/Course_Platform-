import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Admission = () => {
  const { user, token } = useAuth();
  const url = import.meta.env.VITE_BACKEND_URL;

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    courseId: "",
  });

  /* ===== Redirect if not logged in ===== */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /* ===== Fetch courses ===== */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(url + "/course/get");
        setCourses(res.data.courses || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCourses();
  }, []);

  /* ===== Handle input ===== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ===== Submit admission ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        url + "/admission",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("🎉 Admission submitted successfully!");
      setFormData({ name: "", email: "", courseId: "" });
    } catch (err) {
      setMessage("❌ Failed to submit admission");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Course Admission
        </h2>

        {message && (
          <p className="text-center mb-4 font-semibold">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Admission"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admission;
