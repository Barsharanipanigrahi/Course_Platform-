// import { useEffect, useState } from "react";

// const Courses = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     // Dummy data (replace with API later)
//     setCourses([
//       { id: 1, title: "Web Development", description: "HTML, CSS, JavaScript & React" },
//       { id: 2, title: "React & Frontend", description: "A JavaScript library for building user interfaces and front-end apps" },
//       { id: 3, title: "Backend with Node.js", description: "Server-side logic, APIs, and databases using JavaScript runtime " },
//       { id: 3, title: "Database & SQL", description: "Stores data, SQL is a language to manage and query relational databases like MySQL" },
//       { id: 3, title: "Java Programming", description: "Learn Java from basics" },
//       { id: 3, title: "Python", description: "Beginner to Advanced Python" },
//       { id: 3, title: "UI/UX Design", description: "Crafting user-friendly and visually appealing interfaces and experiences" },
//       { id: 3, title: "Data Structure", description: " Ways to organize and manage data efficiently in code, like arrays, stacks, etc." },
//     ]);
//   }, []);

//   return (
//     <div className="py-16 px-6 max-w-6xl mx-auto">
//       <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">
//         Available Courses
//       </h2>

//       <div className="grid md:grid-cols-3 gap-8">
//         {courses.map((course) => (
//           <div
//             key={course.id}
//             className="border rounded-xl p-6 shadow hover:shadow-lg transition"
//           >
//             <h3 className="text-xl font-semibold text-blue-600 mb-2">
//               {course.title}
//             </h3>
//             <p className="text-gray-600 mb-4">
//               {course.description}
//             </p>
//             <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
//               View Course
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Courses;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {Navigate } from 'react-router-dom';
// import { useAuth } from "../../context/AuthContext";
// const Courses=()=>{
//   const {user}=useAuth();
//   if (!user){
//     return<Navigate to="/login"/>;
//   }
// }


// const AdminCourses = () => {
//   const url = import.meta.env.VITE_BACKEND_URL;
//   const [courses, setCourses] = useState([]);

//   const fetchCourses = async () => {
//     const url = import.meta.env.VITE_BACKEND_URL;
//     try {
//       const geturl = url + '/course/get'
//       const res = await axios.get(geturl)
//       if (res.data.courses) {
//         setCourses(res.data.courses)
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }
//   useEffect(() => {
//     fetchCourses()
//   }, []);
//   return (
//     <div className="min-h-screen bg-blue-500 p-6">
//       <div className="grid grid-cols-5 gap-4">
//         {courses?.length > 0 && courses.map((ele) => (
//           <div
//             key={ele._id}
//             className="bg-white border rounded p-4 shadow"
//           >
//             <p className="font-semibold">{ele?.title}</p>
//             <p>{ele?.description}</p>
//             <p>₹ {ele?.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
  
// }
// export default AdminCourses


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Courses = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
};

const AdminCourses = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [courses, setCourses] = useState([]);

  // Admission form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    courseId: "",
  });

  const fetchCourses = async () => {
    try {
      const res = await axios.get(url + "/course/get");
      if (res.data.courses) {
        setCourses(res.data.courses);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admission Form Data:", formData);
    alert("Admission form submitted!");
  };

  return (
    <div className="min-h-screen bg-blue-500 p-6 space-y-8">

      {/* Admission Form */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Admission Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
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
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            Submit Admission
          </button>
        </form>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-5 gap-4">
        {courses?.length > 0 &&
          courses.map((ele) => (
            <div
              key={ele._id}
              className="bg-white border rounded p-4 shadow"
            >
              <p className="font-semibold">{ele?.title}</p>
              <p>{ele?.description}</p>
              <p>₹ {ele?.price}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminCourses;
