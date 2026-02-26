// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Home = () => {
//   const { user } = useAuth();

//   return (
//     <div className="text-center py-20">
//       <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
//         Course Platform <span className="text-blue-600"></span>
//       </h1>
//       <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//          A modern course platform where students can explore, enroll,
//         and learn new skills online.
//       </p>

//       <div className="space-x-4">
//         {user ? (
//           <Link 
//             to="/profile" 
//             className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             Go to Course
//           </Link>
//         ) : (
//           <>
//             <Link 
//               to="/register" 
//               className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
//             >
//               Get Started
//             </Link>
//             <Link 
//               to="/login" 
//               className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
//             >
//               Login
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;





// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Home = () => {
//   const { user } = useAuth();

//   return (
//     <div className="min-h-screen flex items-center justify-center 
//                     bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">

//       <div className="text-center bg-white/90 backdrop-blur-md 
//                       px-10 py-16 rounded-2xl shadow-2xl max-w-3xl">

//         <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
//           Course <span className="text-blue-600">Platform</span>
//         </h1>

//         <p className="text-xl text-gray-700 mb-10">
//         A modern course platform where students can explore, enroll,
//          and learn new skills online.  
//           <span className="font-semibold text-indigo-600">  </span>

//         </p>

//         <div className="space-x-4">
//           {user ? (
//             <Link
//               to="/courses"
//               className="bg-indigo-600 text-white px-8 py-3 rounded-lg 
//                          font-semibold hover:bg-indigo-700 transition"
//             >
//               Go to Courses
//             </Link>
//           ) : (
//             <>
//               <Link
//                 to="/register"
//                 className="bg-blue-600 text-white px-8 py-3 rounded-lg 
//                            font-semibold hover:bg-blue-700 transition"
//               >
//                 Get Started
//               </Link>

//               <Link
//                 to="/login"
//                 className="bg-white text-blue-600 border border-blue-600 
//                            px-8 py-3 rounded-lg font-semibold 
//                            hover:bg-blue-50 transition"
//               >
//                 Login
//               </Link>
//             </>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Home;




// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Home = () => {
//   const { user } = useAuth();

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">

//       {/* Hero Section */}
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center bg-white/90 backdrop-blur-md 
//                         px-10 py-16 rounded-2xl shadow-2xl max-w-3xl">

//           <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
//             Course <span className="text-blue-600">Platform</span>
//           </h1>

//           <p className="text-xl text-gray-700 mb-10">
//             A modern course platform where students can explore, enroll,
//             and learn new skills online.
//           </p>

//           <div className="space-x-4">
//             {user ? (
//               <Link
//                 to="/courses"
//                 className="bg-indigo-600 text-white px-8 py-3 rounded-lg 
//                            font-semibold hover:bg-indigo-700 transition"
//               >
//                 Go to Courses
//               </Link>
//             ) : (
//               <>
//                 <Link
//                   to="/register"
//                   className="bg-blue-600 text-white px-8 py-3 rounded-lg 
//                              font-semibold hover:bg-blue-700 transition"
//                 >
//                   Get Started
//                 </Link>

//                 <Link
//                   to="/login"
//                   className="bg-white text-blue-600 border border-blue-600 
//                              px-8 py-3 rounded-lg font-semibold 
//                              hover:bg-blue-50 transition"
//                 >
//                   Login
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Services Section */}
//       <section className="bg-white py-20">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
//             Our Services
//           </h2>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="p-8 rounded-xl shadow-lg text-center">
//               <h3 className="text-2xl font-semibold mb-4">Online Learning</h3>
//               <p className="text-gray-600">
//                 Learn anytime, anywhere with structured online courses.
//               </p>
//             </div>

//             <div className="p-8 rounded-xl shadow-lg text-center">
//               <h3 className="text-2xl font-semibold mb-4">Expert Mentors</h3>
//               <p className="text-gray-600">
//                 Get guidance from industry professionals and educators.
//               </p>
//             </div>

//             <div className="p-8 rounded-xl shadow-lg text-center">
//               <h3 className="text-2xl font-semibold mb-4">Certifications</h3>
//               <p className="text-gray-600">
//                 Earn certificates after successful course completion.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Courses Offered Section */}
//       <section className="bg-gray-100 py-20">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
//             Courses Offered
//           </h2>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h3 className="text-xl font-semibold mb-2">Web Development</h3>
//               <p className="text-gray-600">
//                 HTML, CSS, JavaScript, React, and backend development.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h3 className="text-xl font-semibold mb-2">Data Structures</h3>
//               <p className="text-gray-600">
//                 Master DSA concepts for interviews and problem solving.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h3 className="text-xl font-semibold mb-2">Java Programming</h3>
//               <p className="text-gray-600">
//                 Core Java, OOP concepts, and real-world projects.
//               </p>
//             </div>
//           </div>

//           <div className="text-center mt-10">
//             <Link
//               to="/courses"
//               className="bg-indigo-600 text-white px-8 py-3 rounded-lg 
//                          font-semibold hover:bg-indigo-700 transition"
//             >
//               View All Courses
//             </Link>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Home;


import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  GraduationCap,
  Users,
  BadgeCheck,
  Code,
  Database,
  Palette,
  Braces,
  Cpu,
} from "lucide-react";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">

      {/* ================= HERO SECTION ================= */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Learn Skills <br />
              <span className="text-yellow-300">Build Your Career</span>
            </h1>

            <p className="text-lg text-white/90 mb-10">
              A modern online course platform to explore, enroll, and master
              in-demand tech skills with expert guidance.
            </p>

            <div className="flex flex-wrap gap-4">
              {user ? (
                <Link
                  to="/courses"
                  className="bg-yellow-400 text-black px-8 py-3 rounded-xl 
                             font-semibold hover:bg-yellow-300 transition"
                >
                  Browse Courses
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-yellow-400 text-black px-8 py-3 rounded-xl 
                               font-semibold hover:bg-yellow-300 transition"
                  >
                    Get Started
                  </Link>

                  <Link
                    to="/login"
                    className="border border-white text-white px-8 py-3 rounded-xl 
                               font-semibold hover:bg-white hover:text-black transition"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Why Choose Us?
            </h3>

            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-3">
                <GraduationCap className="text-indigo-600" />
                Industry-focused curriculum
              </li>
              <li className="flex items-center gap-3">
                <Users className="text-indigo-600" />
                Expert instructors & mentors
              </li>
              <li className="flex items-center gap-3">
                <BadgeCheck className="text-indigo-600" />
                Certification after completion
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-14 text-gray-900">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap size={32} />,
                title: "Online Learning",
                desc: "Flexible learning with structured and guided courses.",
              },
              {
                icon: <Users size={32} />,
                title: "Expert Mentors",
                desc: "Learn directly from experienced industry professionals.",
              },
              {
                icon: <BadgeCheck size={32} />,
                title: "Certification",
                desc: "Earn certificates to boost your resume & confidence.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 shadow-lg border 
                           hover:-translate-y-2 transition text-center"
              >
                <div className="text-indigo-600 mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COURSES ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-14 text-gray-900">
            Courses Offered
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Web Development", icon: <Code /> },
              { name: "React & Frontend", icon: <Braces /> },
              { name: "Backend with Node.js", icon: <Cpu /> },
              { name: "Database & SQL", icon: <Database /> },
              { name: "Java Programming", icon: <Cpu /> },
              { name: "Python Programming", icon: <Cpu /> },
              { name: "UI / UX Design", icon: <Palette /> },
              { name: "Data Structures", icon: <Braces /> },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md 
                           hover:shadow-xl hover:-translate-y-1 
                           transition text-center"
              >
                <div className="text-indigo-600 mb-3 flex justify-center">
                  {course.icon}
                </div>
                <h4 className="font-semibold text-gray-800">
                  {course.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Start Learning Today 🚀
        </h2>
        <p className="mb-6 text-white/90">
          Join thousands of learners and upgrade your skills.
        </p>

        {!user && (
          <Link
            to="/register"
            className="bg-yellow-400 text-black px-10 py-3 rounded-xl 
                       font-semibold hover:bg-yellow-300 transition"
          >
            Create Free Account
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home;


