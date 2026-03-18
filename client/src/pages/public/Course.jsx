import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { BookOpen, ArrowRight } from "lucide-react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await api.get("/course/get");
      if (res.data.status) {
        setCourses(res.data.courses);
      }
    } catch (error) {
      console.log("Error fetching courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-200 to-purple-200 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-black-600 max-w-2xl mx-auto">
            Learn job-ready skills with hands-on projects, expert guidance,
            and real-world experience.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-slate-500 text-lg">
            Loading courses...
          </p>
        )}

        {/* Empty State */}
        {!loading && courses.length === 0 && (
          <p className="text-center text-slate-500 text-lg">
            No courses available right now.
          </p>
        )}

        {/* Courses Grid */}
        {!loading && courses.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white hover:bg-yellow-200 rounded-2xl shadow-md
                           hover:shadow-xl transition duration-300
                           overflow-hidden group"
              >
                {/* Card Body */}
                <div className="p-6 flex flex-col h-full">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 bg-blue-100 rounded-xl
                                 flex items-center justify-center"
                    >
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-800">
                      {course.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-black-600 text-sm mb-6 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-600">
                      ₹ {course.price || "Free"}
                    </span>

                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="flex items-center gap-1 text-blue-600
                                 font-semibold group-hover:gap-2 transition"
                    >
                      View Course
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;
