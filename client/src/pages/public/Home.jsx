import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  GraduationCap, Users, BadgeCheck, Code, Database,
  Palette, Braces, Cpu, BookOpen, MonitorPlay, Briefcase, ArrowRight,Sparkles,
} from "lucide-react";

const Home = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("All");

  const services = [
    { icon: <GraduationCap size={22}/>, title: "Online Learning",     desc: "Flexible learning with structured and guided courses." },
    { icon: <Users size={22}/>,         title: "Expert Mentors",      desc: "Learn directly from experienced industry professionals." },
    { icon: <BadgeCheck size={22}/>,    title: "Certification",       desc: "Earn certificates to boost your resume & confidence." },
    { icon: <BookOpen size={22}/>,      title: "Skill-Based Courses", desc: "Hands-on courses focused on real-world applications." },
    { icon: <MonitorPlay size={22}/>,   title: "Live Classes",        desc: "Interactive live sessions with doubt clearing support." },
    { icon: <Briefcase size={22}/>,     title: "Career Support",      desc: "Resume building, interview prep, and career guidance." },
  ];

  const courses = [
    { name: "Web Development",  icon: <Code size={18}/>,     tag: "Beginner",     prof: "Dr. Arjun Mehta"   },
    { name: "Programming",      icon: <Braces size={18}/>,   tag: "Beginner",     prof: "Prof. Sneha Iyer"  },
    { name: "Data Science",     icon: <Cpu size={18}/>,      tag: "Advanced",     prof: "Dr. Rohan Verma"   },
    { name: "Cybersecurity",    icon: <Database size={18}/>, tag: "Intermediate", prof: "Prof. Kiran Das"   },
    { name: "Cloud Computing",  icon: <Cpu size={18}/>,      tag: "Intermediate", prof: "Dr. Priya Nair"    },
    { name: "DevOps",           icon: <Cpu size={18}/>,      tag: "Advanced",     prof: "Prof. Amit Sharma" },
    { name: "UI / UX Design",   icon: <Palette size={18}/>,  tag: "Beginner",     prof: "Dr. Meera Pillai"  },
  ];

  const filters = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses =
    activeFilter === "All"
      ? courses
      : courses.filter((c) => c.tag === activeFilter);

  const tagColors = {
    Beginner:     { bg: "rgba(45,212,191,0.15)",  color: "#2dd4bf"  },
    Intermediate: { bg: "rgba(249,115,22,0.15)",  color: "#f97316"  },
    Advanced:     { bg: "rgba(220,38,38,0.15)",   color: "#f87171"  },
  };

  const statsData = [
    { num: "10K+", lbl: "Students Enrolled" },
    { num: "120+", lbl: "Expert Courses" },
    { num: "50+",  lbl: "Industry Mentors" },
    { num: "95%",  lbl: "Completion Rate" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        .hm{font-family:'DM Sans',sans-serif;}

     
/* ── HERO ── */
        .hm-hero{background:#0f2027;padding:7rem 1.5rem 5.5rem;text-align:center;position:relative;overflow:hidden;}
        .hm-hero-mesh{
          position:absolute;inset:0;
          background-image:
            radial-gradient(circle at 20% 50%,rgba(45,212,191,0.07) 0%,transparent 50%),
            radial-gradient(circle at 80% 50%,rgba(249,115,22,0.07) 0%,transparent 50%),
            radial-gradient(circle,rgba(249,115,22,0.05) 1px,transparent 1px);
          background-size:100% 100%,100% 100%,28px 28px;
        }
        .hm-hero-ring{
          position:absolute;width:700px;height:700px;border-radius:50%;
          border:1px solid rgba(45,212,191,0.06);
          top:50%;left:50%;transform:translate(-50%,-50%);
          animation:hm-spin 35s linear infinite;pointer-events:none;
        }
        .hm-hero-ring2{
          position:absolute;width:450px;height:450px;border-radius:50%;
          border:1px solid rgba(249,115,22,0.07);
          top:50%;left:50%;transform:translate(-50%,-50%);
          animation:hm-spin 22s linear infinite reverse;pointer-events:none;
        }
        .hm-hero-glow{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,0.1),transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;}
        .hm-hero-dot{position:absolute;border-radius:50%;animation:hm-pulse 3s ease-in-out infinite;pointer-events:none;}
        .hm-hero-in{position:relative;z-index:2;max-width:680px;margin:0 auto;}

        .hm-lbl{
          display:inline-flex;align-items:center;gap:6px;
          font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;
          color:#f97316;margin-bottom:1rem;
          background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.25);
          padding:5px 14px;border-radius:100px;
          animation:hm-up 0.5s ease both;
        }
        .hm-title{
          font-family:'Playfair Display',serif;font-size:clamp(2.8rem,6vw,4.4rem);
          font-weight:900;line-height:1.06;color:#fff;margin-bottom:1.2rem;
          animation:hm-up 0.5s 0.1s ease both;
        }
        .hm-title span{
          color:transparent;
          background:linear-gradient(135deg,#f97316,#fb923c);
          -webkit-background-clip:text;background-clip:text;
          display:block;
        }
        .hm-hero-underline{
          display:block;height:3px;margin:0.5rem auto 0;
          background:linear-gradient(90deg,#f97316,#2dd4bf);border-radius:2px;
          width:0;animation:hm-line 1s 0.7s ease both;max-width:60px;
        }
        .hm-sub{font-size:1rem;color:rgba(255,255,255,0.5);line-height:1.75;margin-bottom:2.2rem;animation:hm-up 0.5s 0.2s ease both;}
        .hm-btns{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;animation:hm-up 0.5s 0.3s ease both;}
        .hm-btn-p{display:inline-flex;align-items:center;gap:8px;background:#f97316;color:#fff;padding:12px 24px;border-radius:9px;font-weight:700;font-size:0.9rem;text-decoration:none;border:none;cursor:pointer;transition:background 0.2s,transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 18px rgba(249,115,22,0.45);font-family:'DM Sans',sans-serif;}
        .hm-btn-p:hover{background:#ea6c0a;transform:translateY(-2px);box-shadow:0 8px 26px rgba(249,115,22,0.55);}
        .hm-btn-g{display:inline-flex;align-items:center;gap:8px;background:transparent;color:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.2);padding:12px 24px;border-radius:9px;font-weight:500;font-size:0.9rem;text-decoration:none;cursor:pointer;transition:background 0.2s,border-color 0.2s;font-family:'DM Sans',sans-serif;}

        /* ── WHY CHOOSE US ── */
        .hm-why-section{position:relative;padding:8rem 1.5rem;overflow:hidden;background:#0f2027;display:flex;align-items:center;}
        .hm-why-bg-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;}
        .hm-why-overlay{position:absolute;inset:0;background:linear-gradient(to right,rgba(15,32,39,0.9) 30%,rgba(15,32,39,0.4));z-index:1;}
        .hm-why-content{position:relative;z-index:2;max-width:1200px;margin:0 auto;width:100%;}
        .hm-why-text-wrapper{max-width:550px;background:transparent;}
        .hm-why-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,2.8rem);font-weight:800;color:#fff;margin-bottom:2.5rem;text-shadow:0 2px 10px rgba(0,0,0,0.3);}
        .hm-why-list{display:flex;flex-direction:column;gap:1.2rem;}
        .hm-why-row{display:flex;align-items:center;gap:18px;color:rgba(255,255,255,0.9);font-size:1.1rem;font-weight:500;transition:transform 0.2s ease;}
        .hm-why-row:hover{transform:translateX(8px);color:#f97316;}
        .hm-why-ic{color:#f97316;flex-shrink:0;display:flex;align-items:center;}
        @media(max-width:768px){.hm-why-overlay{background:rgba(15,32,39,0.8);}.hm-why-text-wrapper{text-align:center;margin:0 auto;}.hm-why-row{justify-content:center;}}

        /* ── STATS ── */
        .hm-stats{background:#0a2e2b;border-top:1px solid rgba(45,212,191,0.18);border-bottom:1px solid rgba(45,212,191,0.18);padding:2rem 0;overflow:hidden;}
        .hm-stats-track{display:flex;gap:0;width:max-content;animation:statsScroll 18s linear infinite;}
        .hm-stats-track:hover{animation-play-state:paused;}
        .hm-stat-item{display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:220px;padding:0.5rem 1rem;border-right:1px solid rgba(45,212,191,0.15);flex-shrink:0;transition:transform 0.3s ease;}
        .hm-stat-item:hover{transform:scale(1.08);}
        .hm-stat-n{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;color:#f97316;line-height:1.1;}
        .hm-stat-l{font-size:0.72rem;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:0.1em;margin-top:5px;opacity:0.85;}
        @keyframes statsScroll{0%{transform:translateX(0);}100%{transform:translateX(-25%);}}

        /* ── SECTIONS ── */
        .hm-sec{padding:5rem 1.5rem;}
        .hm-sec-light{background:#0d3d39;}
        .hm-sec-dark{background:#0f2027;}
        .hm-sec-cta{background:#134e4a;}
        .hm-sec-in{max-width:1200px;margin:0 auto;}
        .hm-sec-hd{text-align:center;margin-bottom:2.8rem;}
        .hm-sec-lbl{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#2dd4bf;margin-bottom:0.5rem;}
        .hm-sec-lbl-lt{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#2dd4bf;margin-bottom:0.5rem;}
        .hm-sec-ttl{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:800;color:#f0fdfa;}
        .hm-sec-ttl-lt{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:800;color:#f0fdfa;}

        /* ── SERVICES ── */
        .hm-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem;}
        @media(max-width:860px){.hm-svc-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:520px){.hm-svc-grid{grid-template-columns:1fr;}}
        .hm-svc-card{background:rgba(255,255,255,0.05);border:1px solid rgba(45,212,191,0.2);border-radius:14px;padding:1.5rem;transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s,background 0.25s;}
        .hm-svc-card:hover{transform:translateY(-5px);box-shadow:0 16px 36px rgba(0,0,0,0.3);border-color:rgba(45,212,191,0.5);background:rgba(45,212,191,0.08);}
        .hm-svc-ic{width:44px;height:44px;background:rgba(45,212,191,0.15);border-radius:11px;display:flex;align-items:center;justify-content:center;color:#2dd4bf;margin-bottom:0.9rem;}
        .hm-svc-title{font-weight:700;font-size:0.95rem;color:#f0fdfa;margin-bottom:0.35rem;}
        .hm-svc-desc{color:rgba(255,255,255,0.5);font-size:0.85rem;line-height:1.6;}

        /* ── COURSES ── */
        .hm-filter-bar{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:2rem;}
        .hm-crs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}
        @media(max-width:800px){.hm-crs-grid{grid-template-columns:repeat(2,1fr);}}
        .hm-crs-card{background:#134e4a;border:1px solid rgba(45,212,191,0.15);border-radius:13px;padding:1.3rem 1rem;text-align:center;transition:transform 0.2s,box-shadow 0.2s,background 0.2s;cursor:pointer;}
        .hm-crs-card:hover{background:#0d3d39;transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,0.3);}
        .hm-crs-ic{width:42px;height:42px;background:rgba(249,115,22,0.12);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#f97316;margin:0 auto 0.75rem;transition:background 0.2s;}
        .hm-crs-card:hover .hm-crs-ic{background:rgba(249,115,22,0.22);}
        .hm-crs-name{font-weight:700;font-size:0.85rem;color:#f0fdfa;margin-bottom:0.5rem;}
        .hm-crs-tag{display:inline-block;font-size:0.62rem;font-weight:700;padding:3px 9px;border-radius:100px;letter-spacing:0.04em;text-transform:uppercase;margin-top:4px;}
        .hm-crs-prof {margin-top: 10px;font-size: 0.72rem;color: #f0fdfa; font-weight: 700; display: flex;align-items: center;justify-content: center;gap: 5px;border-top: 1px solid rgba(45,212,191,0.15);
        padding-top: 10px;letter-spacing: 0.03em;text-shadow: 0 0 10px rgba(45,212,191,0.4);  }
        .hm-crs-prof-dot { width: 5px; height: 5px; border-radius: 50%; background: #2dd4bf; flex-shrink: 0;}

        /* ── CTA ── */
        .hm-cta-dot{position:absolute;background-image:radial-gradient(circle,rgba(249,115,22,0.1) 1px,transparent 1px);background-size:22px 22px;inset:0;}
        .hm-cta-in{position:relative;z-index:1;max-width:660px;margin:0 auto;text-align:center;}
        .hm-cta-title{font-family:'Playfair Display',serif;font-size:clamp(1.9rem,4vw,3rem);font-weight:900;color:#f0fdfa;margin-bottom:0.9rem;}
        .hm-cta-title span{color:#f97316;}
        .hm-cta-sub{color:rgba(255,255,255,0.55);font-size:0.98rem;line-height:1.75;margin-bottom:2rem;}
        .hm-cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
        .hm-empty{text-align:center;padding:3rem 1rem;color:rgba(255,255,255,0.35);font-size:0.9rem;}
      `}</style>

      <div className="hm">

        {/* ── HERO ── */}
        <section className="hm-hero">
          <div className="hm-hero-mesh"/>
          <div className="hm-hero-ring"/><div className="hm-hero-ring2"/>
          <div className="hm-hero-glow"/>
          {[
            {top:"18%",left:"9%", size:8, color:"rgba(249,115,22,0.4)",  delay:"0s"  },
            {top:"72%",left:"6%", size:5, color:"rgba(45,212,191,0.5)",  delay:"1s"  },
            {top:"22%",right:"8%",size:6, color:"rgba(45,212,191,0.4)",  delay:"0.5s"},
            {top:"68%",right:"10%",size:9,color:"rgba(249,115,22,0.3)",  delay:"1.5s"},
          ].map((d,i)=>(
            <div key={i} className="hm-hero-dot" style={{
              top:d.top,left:d.left,right:d.right,
              width:d.size,height:d.size,background:d.color,animationDelay:d.delay,
            }}/>
          ))}

          <div className="hm-hero-in">
            <div className="hm-lbl"><Sparkles size={20}/> Your Learning Journey Starts Here</div>
            <h1 className="hm-title">
              Learn Skills.
              <span>Build Your Career.</span>
              <span className="hm-hero-underline"/>
            </h1>
            <p className="hm-sub">A modern online course platform to explore, enroll, and master in-demand tech skills with expert guidance.</p>
            <div className="hm-btns">
              {user ? (
                <Link to="/courses" className="hm-btn-p">Browse Courses <ArrowRight size={15}/></Link>
              ) : (
                <>
                  <Link to="/register" className="hm-btn-p">Get Started Free <ArrowRight size={15}/></Link>
                  <Link to="/login" className="hm-btn-g">Login</Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="hm-why-section">
          <img
            className="hm-why-bg-img"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
            alt="Students learning background"
          />
          <div className="hm-why-overlay" />
          <div className="hm-why-content">
            <div className="hm-why-card">
              <div className="hm-why-title">Why Choose Us?</div>
              {[
                { icon: <GraduationCap size={16}/>, text: "Industry-focused curriculum"     },
                { icon: <Users size={16}/>,         text: "Expert instructors & mentors"    },
                { icon: <BadgeCheck size={16}/>,    text: "Certification after completion"  },
                { icon: <BookOpen size={16}/>,      text: "Skill-based course tracks"       },
                { icon: <MonitorPlay size={16}/>,   text: "Interactive live classes"        },
                { icon: <Briefcase size={16}/>,     text: "Career support & guidance"       },
              ].map((it, i) => (
                <div className="hm-why-row" key={i}>
                  <span className="hm-why-ic">{it.icon}</span>
                  {it.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="hm-stats">
          <div className="hm-stats-track">
            {[...statsData, ...statsData, ...statsData, ...statsData].map((s, i) => (
              <div className="hm-stat-item" key={i}>
                <div className="hm-stat-n">{s.num}</div>
                <div className="hm-stat-l">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="hm-sec hm-sec-light">
          <div className="hm-sec-in">
            <div className="hm-sec-hd">
              <div className="hm-sec-lbl">What We Offer</div>
              <h2 className="hm-sec-ttl">Our Services</h2>
            </div>
            <div className="hm-svc-grid">
              {services.map((it, i) => (
                <div className="hm-svc-card" key={i}>
                  <div className="hm-svc-ic">{it.icon}</div>
                  <div className="hm-svc-title">{it.title}</div>
                  <div className="hm-svc-desc">{it.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COURSES WITH FILTER ── */}
        <section className="hm-sec hm-sec-dark">
          <div className="hm-sec-in">
            <div className="hm-sec-hd">
              <div className="hm-sec-lbl-lt">Explore Programs</div>
              <h2 className="hm-sec-ttl-lt">Courses Offered</h2>
            </div>
            <div className="hm-filter-bar">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    padding: "7px 20px",
                    borderRadius: "100px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    border: activeFilter === f ? "1px solid #f97316" : "1px solid rgba(45,212,191,0.3)",
                    background: activeFilter === f ? "#f97316" : "transparent",
                    color: activeFilter === f ? "#fff" : "rgba(255,255,255,0.5)",
                    boxShadow: activeFilter === f ? "0 4px 14px rgba(249,115,22,0.4)" : "none",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {filteredCourses.length > 0 ? (
              <div className="hm-crs-grid">
                {filteredCourses.map((c, i) => (
                  <div className="hm-crs-card" key={i}>
                    <div className="hm-crs-ic">{c.icon}</div>
                    <div className="hm-crs-name">{c.name}</div>
                    {c.tag && (
                      <span
                        className="hm-crs-tag"
                        style={{ background: tagColors[c.tag]?.bg, color: tagColors[c.tag]?.color }}
                      >
                        {c.tag}
                      </span>
                    )}
                    {c.prof && (
                      <div className="hm-crs-prof">
                        <span className="hm-crs-prof-dot" />
                        {c.prof}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="hm-empty">No courses found for this filter.</div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="hm-sec hm-sec-cta" style={{ position: "relative", overflow: "hidden" }}>
          <div className="hm-cta-dot"/>
          <div className="hm-cta-in">
            <h2 className="hm-cta-title">Ready to Start <span>Learning?</span></h2>
            <p className="hm-cta-sub">Join thousands of learners building real skills, earning certifications, and launching careers they love.</p>
            <div className="hm-cta-btns">
              {user ? (
                <Link to="/courses" className="hm-btn-p">View All Courses <ArrowRight size={15}/></Link>
              ) : (
                <>
                  <Link to="/register" className="hm-btn-p">Create Free Account <ArrowRight size={15}/></Link>
                  <Link to="/login" className="hm-btn-g">Already a member? Login</Link>
                </>
              )}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;