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

import {
  Rocket,
  Target,
  Star,
  GraduationCap,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">

      {/* ================= HERO ================= */}
      <section className="pt-28 pb-20 px-6 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          About <span className="text-yellow-300">Us</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-white/90">
          We are building a modern learning platform that helps students grow,
          upskill, and succeed in the tech-driven world.
        </p>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
              Who We Are
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              <span className="font-semibold text-indigo-600">
                Course Platform
              </span>{" "}
              is a next-generation online learning system designed to simplify
              course discovery, enrollment, and progress tracking.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Our focus is on practical learning, real-world skills, and a
              seamless experience for both students and educators.
            </p>
          </div>

          {/* RIGHT HIGHLIGHT CARD */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 
                          p-10 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              What Makes Us Different
            </h3>

            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <GraduationCap className="text-indigo-600 mt-1" />
                Structured learning paths with real outcomes
              </li>
              <li className="flex items-start gap-3">
                <Star className="text-indigo-600 mt-1" />
                Industry-relevant and beginner-friendly courses
              </li>
              <li className="flex items-start gap-3">
                <Rocket className="text-indigo-600 mt-1" />
                Built for growth, speed, and scalability
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-14 text-gray-900">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Rocket size={34} />,
                title: "Our Vision",
                desc: "Empower learners with practical knowledge and confidence.",
              },
              {
                icon: <Target size={34} />,
                title: "Our Mission",
                desc: "Deliver high-quality courses accessible to everyone.",
              },
              {
                icon: <Star size={34} />,
                title: "Why Choose Us",
                desc: "Clean design, expert content, and flexible learning.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg 
                           hover:-translate-y-2 hover:shadow-xl transition"
              >
                <div className="text-indigo-600 mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Learn. Build. Grow. 🚀
        </h2>
        <p className="text-white/90 mb-8">
          Join us and take the next step in your learning journey.
        </p>
      </section>
    </div>
  );
};

export default About;





