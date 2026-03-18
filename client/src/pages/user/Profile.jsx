import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { BookOpen } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // FETCH LOGGED-IN USER COURSES
  const fetchMyCourses = async () => {
    try {
      const res = await api.get("/enrollment/my-courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.status) {
        setCourses(res.data.courses);
      }
    } catch (err) {
      console.log("Course fetch error:", err.response?.data || err);
    } finally {
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  return (
    <div className="max-w-4xl  mx-auto mt-10 space-y-8">

      {/* PROFILE CARD */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            User Profile
          </h3>
          <p className="text-sm text-gray-500">
            Personal details and enrolled courses.
          </p>
        </div>

        <div className="divide-y">
          <div className="px-6 py-4 flex justify-between">
            <span className="text-sm text-gray-500">Full Name</span>
            <span className="text-sm font-medium">{user?.name}</span>
          </div>

          <div className="px-6 py-4 flex justify-between bg-gray-50">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm font-medium">{user?.email}</span>
          </div>

          <div className="px-6 py-4 flex justify-between">
            <span className="text-sm text-gray-500">Role</span>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${user?.role === "admin"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
                }`}
            >
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* ENROLLED COURSES SECTION */}
      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold">My Courses</h3>
        </div>

        {loadingCourses ? (
          <p className="text-gray-500">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-500">You have not enrolled in any courses.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {courses.map((enroll) => (
              <div
                key={enroll._id}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <h4 className="font-semibold text-gray-800">
                  {enroll.course?.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {enroll.course?.description}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Enrolled on{" "}
                  {new Date(enroll.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
