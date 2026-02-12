// const About = () => {
//   return (
//     <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
//       <p className="text-gray-600 leading-relaxed mb-4">
//    Course Platform is an online learning system designed
//         to help students explore, enroll, and manage courses easily.
//       </p>
//       <p className="text-gray-600 leading-relaxed">
//         Our mission is to simplify the Course Sdevelopment process 
// Our goal is to make learning simple, accessible, and effective.
//       </p>
//     </div>
//   );
// };

// export default About;


// const About = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center 
//                     bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      
//       <div className="max-w-4xl bg-white p-10 rounded-2xl shadow-2xl text-center">
        
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
//           About Us
//         </h1>

//         <p className="text-gray-700 leading-relaxed mb-4 text-lg">
//           Course Platform is an online learning system designed
//           to help students explore, enroll, and manage courses easily.
//         </p>

//         <p className="text-gray-700 leading-relaxed text-lg">
//           Our mission is to simplify the Course Sdevelopment process.
//           Our goal is to make learning simple, accessible, and effective.
//         </p>

//       </div>
//     </div>
//   );
// };

// export default About;

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 px-4">

      <div className="max-w-5xl bg-white/95 backdrop-blur-md 
                      p-12 rounded-3xl shadow-2xl text-center">

        <h1 className="text-5xl font-extrabold text-gray-900 mb-8">
          About <span className="text-indigo-600">Us</span>
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6 text-lg">
          <span className="font-semibold text-indigo-600">Course Platform</span> 
          is a modern online learning system built to help students explore,
          enroll, and manage courses with ease and flexibility.
        </p>

        <p className="text-gray-700 leading-relaxed mb-10 text-lg">
          Our mission is to simplify the course development and learning
          process while making education accessible, engaging, and effective
          for everyone.
        </p>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          
          <div className="p-6 rounded-xl bg-indigo-50 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600">
              To empower learners with practical knowledge and real-world skills.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-indigo-50 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To provide high-quality, structured courses for every learner.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-indigo-50 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Why Choose Us
            </h3>
            <p className="text-gray-600">
              Simple interface, expert content, and flexible learning paths.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;




