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



import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600">
      
      {/* HERO SECTION */}
      <div className="flex items-center justify-center pt-24 px-4">
        <div className="text-center bg-white/95 backdrop-blur-md 
                        px-10 py-16 rounded-2xl shadow-2xl max-w-4xl">

          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Course <span className="text-indigo-600">Platform</span>
          </h1>

          <p className="text-xl text-gray-700 mb-10">
            A modern learning platform where students explore, enroll,
            and master new skills online.
          </p>

          <div className="space-x-4">
            {user ? (
              <Link
                to="/courses"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg 
                           font-semibold hover:bg-indigo-700 transition"
              >
                Go to Courses
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg 
                             font-semibold hover:bg-blue-700 transition"
                >
                  Get Started
                </Link>

                <Link
                  to="/login"
                  className="bg-white text-blue-600 border border-blue-600 
                             px-8 py-3 rounded-lg font-semibold 
                             hover:bg-blue-50 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div className="max-w-6xl mx-auto mt-24 px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">
              Online Learning
            </h3>
            <p className="text-gray-600">
              Learn anytime, anywhere with structured online courses.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">
              Expert Instructors
            </h3>
            <p className="text-gray-600">
              Courses taught by experienced and industry-ready mentors.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">
              Certification
            </h3>
            <p className="text-gray-600">
              Get certificates after successful course completion.
            </p>
          </div>
        </div>
      </div>

      {/* COURSES OFFERED SECTION */}
      <div className="max-w-6xl mx-auto mt-24 px-6 pb-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Courses Offered
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            'Web Development',
            'React & Frontend',
            'Backend with Node.js',
            'Database & SQL',
            'Java Programming',
            'Python Programming',
            'UI / UX Design',
            'Data Structures'
          ].map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 shadow-md 
                         text-center font-semibold text-gray-700
                         hover:scale-105 transition"
            >
              {course}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;

