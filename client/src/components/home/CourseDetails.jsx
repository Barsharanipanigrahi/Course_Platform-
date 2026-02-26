import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { BookOpen, IndianRupee } from "lucide-react";

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCourse = async () => {
        try {
            const res = await api.get("/course/get");
            if (res.data.status) {
                const found = res.data.courses.find((c) => c._id === id);
                setCourse(found);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    const handleEnroll = async (courseId) => {
        const token = localStorage.getItem("token"); // check token

        if (!token) {
            alert("Please login first to enroll in the course!");
            return; // stop execution
        }

        try {
            const res = await api.post(
                "/enrollment/enroll",
                { courseId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(res.data.message);
        } catch (err) {
            console.log(err);
            alert("Enrollment failed");
        }
    };


    if (loading) {
        return <p className="text-center mt-20">Loading course...</p>;
    }

    if (!course) {
        return <p className="text-center mt-20">Course not found</p>;
    }

    return (
        <section className="py-20 px-6 bg-slate-50">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <BookOpen className="text-blue-600 w-6 h-6" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900">
                        {course.title}
                    </h1>
                </div>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-6">
                    {course.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-8">
                    <IndianRupee className="text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                        {course.price || "Free"}
                    </span>
                </div>

                {/* Enroll Button */}
                <button
                    onClick={() => handleEnroll(course._id)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl
                     font-bold hover:bg-blue-700 transition"
                >
                    Enroll Now
                </button>
            </div>
        </section>
    );
};

export default CourseDetails;
