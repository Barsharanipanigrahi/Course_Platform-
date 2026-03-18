
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Home.css";
import {
  GraduationCap,
  Users,
  BadgeCheck,
  Code,
  Database,
  Palette,
  Braces,
  Cpu,
  BookOpen,
  MonitorPlay,
  Briefcase  
} from "lucide-react";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-purple-200 ">

      {/* ================= HERO SECTION ================= */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="text-indigo-500">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Learn Skills <br />
              <span className="text-yellow-300">Build Your Career</span>
            </h1>

            <p className="text-lg text-black/90 mb-10">
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
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:bg-yellow-200">
            <h3 className="text-2xl font-bold mb-6 text-blue-800">
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
              <li className="flex items-center gap-3">
                <BookOpen className="text-indigo-600" />
                Skill-Based Courses
              </li>
              <li className="flex items-center gap-3">
                <MonitorPlay className="text-indigo-600" />
                Live Classes
              </li>
              
              <li className="flex items-center gap-3">
              <Briefcase className="text-indigo-600" />
                Career Support
              </li>
            
            </ul>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="bg-from-indigo-200 via-purple-100 to-pink-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-14 text-indigo-900">
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
  {
    icon: <BookOpen size={32} />,
    title: "Skill-Based Courses",
    desc: "Hands-on courses focused on real-world applications.",
  },
  {
    icon: <MonitorPlay size={32} />,
    title: "Live Classes",
    desc: "Interactive live sessions with doubt clearing support.",
  },
  {
    icon: <Briefcase size={32} />,
    title: "Career Support",
    desc: "Resume building, interview prep, and career guidance.",
  },
].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 hover:bg-yellow-200 shadow-lg border 
                           hover:-translate-y-2 transition text-center bg-white"
              >
                <div className="text-yellow-600 mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl  text-indigo-500 font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COURSES ================= */}
      <section className="py-20 bg-from-indigo-100 via-purple-100 to-pink-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-14 text-indigo-900">
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
                           transition text-center hover:bg-yellow-200"
              >
                <div className="text-yellow-600 mb-3 flex justify-center">
                  {course.icon}
                </div>
                <h4 className="font-semibold text-indigo-800">
                  {course.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="py-16 text-center text-white">
        <h2 className="text-3xl text-indigo-400 font-bold mb-4">
          Start Learning Today 🚀
        </h2>
        <p className="mb-8 text-blue-400">
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


