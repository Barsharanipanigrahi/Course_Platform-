import {
  Rocket,
  Target,
  Star,
  GraduationCap,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-purple-200  text-black-400">

      {/* ================= HERO ================= */}
      <section className="pt-28 pb-20 px-6 text-center">
        <h1 className="text-5xl text-indigo-600 md:text-6xl  font-extrabold mb-6">
          Know Us <span className="text-yellow-300">Better</span> !
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-blue/80">
          We are building a modern learning platform that helps students grow,
          upskill, and succeed in the tech-driven world.
        </p>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl text-indigo-600 font-extrabold mb-6">
              Who We Are
            </h2>

            <p className="text-black-300 text-lg leading-relaxed mb-6">
              <span className="font-semibold text-blue-600">
                Course Platform
              </span>{" "}
              is a next-generation online learning system designed to simplify
              course discovery, enrollment, and progress tracking.
            </p>

            <p className="text-blue/80 text-lg leading-relaxed">
              Our focus is on practical learning, real-world skills, and a
              seamless experience for both <span className="text-blue-600">students and educators.</span>
            </p>
          </div>

          {/* RIGHT HIGHLIGHT CARD */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:bg-blue-400">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">
              What Makes Us Different
            </h3>

            <ul className="space-y-4 text-indigo-600">
              <li className="flex items-start gap-3">
                <GraduationCap className="text-yellow-300 mt-1" />
                Structured learning paths with real outcomes
              </li>
              <li className="flex items-start gap-3">
                <Star className="text-yellow-300 mt-1" />
                Industry-relevant and beginner-friendly courses
              </li>
              <li className="flex items-start gap-3">
                <Rocket className="text-yellow-300 mt-1" />
                Built for growth, speed, and scalability
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-20 bg-indigo-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl text-indigo-600 font-extrabold mb-14 text-indigo-100">
            Our Core Values
          </h2>

          <div className="grid bg-white-600 md:grid-cols-3 gap-8">
          {[
  {
    icon: <Rocket size={34} className="text-blue-600" />,
    title: "Our Vision",
    desc: "Empower learners with practical knowledge and confidence.",
  },
  {
    icon: <Target size={34} className="text-blue-600" />,
    title: "Our Mission",
    desc: "Deliver high-quality courses accessible to everyone.",
  },
  {
    icon: <Star size={34} className="text-blue-600" />,
    title: "Why Choose Us",
    desc: "Clean design, expert content, and flexible learning.",
  },
  {
    icon: <GraduationCap size={34} className="text-blue-600" />,
    title: "Student First",
    desc: "We prioritize learner success through guided paths and support.",
  },
  {
    icon: <Rocket size={34} className="text-blue-600" />,
    title: "Skill-Oriented",
    desc: "Courses designed to match real industry requirements.",
  },
  {
    icon: <Star size={34} className="text-blue-600" />,
    title: "Continuous Growth",
    desc: "We evolve constantly to keep learning relevant and modern.",
  },
]
            .map((item, index) => (
              <div
                key={index}
                className="rounded-2xl  backdrop-blur-md rounded-2xl p-8 shadow-lg 
                           hover:-translate-y-2 hover:shadow-xl transition bg-white hover:bg-blue-400"
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-yellow-300 ">{item.title}</h3>
                <p className="text-blue/80 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
<section className="py-20 bg-indigo-50">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl text-yellow-300 font-extrabold mb-14">
      Our Impact So Far
    </h2>

    <div className="grid md:grid-cols-4 gap-8">
      {[
        { number: "10K+", label: "Students Enrolled" },
        { number: "120+", label: "Expert Courses" },
        { number: "50+", label: "Industry Mentors" },
        { number: "95%", label: "Learner Satisfaction" },
      ].map((stat, index) => (
        <div
          key={index}
          className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-4xl font-extrabold text-indigo-500 mb-2">
            {stat.number}
          </h3>
          <p className="text-blue/80 text-lg">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ================= TRUST ================= */}
<section className="py-20">
  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

    {/* LEFT */}
    <div>
      <h2 className="text-4xl text-indigo-500 font-extrabold mb-6">
        Why Students Trust Us
      </h2>

      <p className="text-blue/80 text-lg leading-relaxed mb-6">
        We believe learning should be simple, practical, and accessible.
        That’s why thousands of learners choose our platform to build
        real-world skills and grow their careers.
      </p>

      <ul className="space-y-4 text-blue/80">
        <li className="flex items-center gap-3">
          <Star className="text-yellow-400" />
          Learn at your own pace, anytime
        </li>
        <li className="flex items-center gap-3">
          <GraduationCap className="text-yellow-400" />
          Certificates that add value to your resume
        </li>
        <li className="flex items-center gap-3">
          <Rocket className="text-yellow-400" />
          Career-focused learning paths
        </li>
      </ul>
    </div>

    {/* RIGHT */}
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:bg-blue-300">
      <h3 className="text-2xl font-bold mb-4 text-yellow-400">
        Our Promise
      </h3>
      <p className="text-blue/80 text-lg leading-relaxed">
        We are committed to delivering quality education, continuous
        improvement, and learner success — every step of the way.
      </p>
    </div>

  </div>
</section>

      {/* ================= CTA ================= */}
      <section className="py-20 text-center text-blue-400">
        <h2 className="text-3xl font-bold mb-4">
          Learn. Build. Grow. 🚀
        </h2>
        <p className="text-black/90 mb-8">
          Join us and take the next step in your learning journey.
        </p>
      </section>
    </div>
  );
};

export default About;


