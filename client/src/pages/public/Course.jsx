import { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Dummy data (replace with API later)
    setCourses([
      { id: 1, title: "Web Development", description: "HTML, CSS, JavaScript & React" },
      { id: 2, title: "React & Frontend", description: "A JavaScript library for building user interfaces and front-end apps" },
      { id: 3, title: "Backend with Node.js", description: "Server-side logic, APIs, and databases using JavaScript runtime " },
      { id: 3, title: "Database & SQL", description: "Stores data, SQL is a language to manage and query relational databases like MySQL" },
      { id: 3, title: "Java Programming", description: "Learn Java from basics" },
      { id: 3, title: "Python", description: "Beginner to Advanced Python" },
      { id: 3, title: "UI/UX Design", description: "Crafting user-friendly and visually appealing interfaces and experiences" },
      { id: 3, title: "Data Structure", description: " Ways to organize and manage data efficiently in code, like arrays, stacks, etc." },
    ]);
  }, []);

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">
        Available Courses
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              {course.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {course.description}
            </p>
            <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;




