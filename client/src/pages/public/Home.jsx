import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  GraduationCap, Users, BadgeCheck, Code, Database,
  Palette, Braces, Cpu, BookOpen, MonitorPlay, Briefcase, ArrowRight,
} from "lucide-react";

const Home = () => {
  const { user } = useAuth();

  const services = [
    { icon: <GraduationCap size={22}/>, title: "Online Learning",     desc: "Flexible learning with structured and guided courses." },
    { icon: <Users size={22}/>,         title: "Expert Mentors",      desc: "Learn directly from experienced industry professionals." },
    { icon: <BadgeCheck size={22}/>,    title: "Certification",       desc: "Earn certificates to boost your resume & confidence." },
    { icon: <BookOpen size={22}/>,      title: "Skill-Based Courses", desc: "Hands-on courses focused on real-world applications." },
    { icon: <MonitorPlay size={22}/>,   title: "Live Classes",        desc: "Interactive live sessions with doubt clearing support." },
    { icon: <Briefcase size={22}/>,     title: "Career Support",      desc: "Resume building, interview prep, and career guidance." },
  ];

  const courses = [
    { name: "Web Development",      icon: <Code size={18}/>,     tag: "Popular"  },
    { name: "React & Frontend",     icon: <Braces size={18}/>,   tag: "Trending" },
    { name: "Backend with Node.js", icon: <Cpu size={18}/>,      tag: "Hot"      },
    { name: "Database & SQL",       icon: <Database size={18}/>, tag: null       },
    { name: "Java Programming",     icon: <Cpu size={18}/>,      tag: null       },
    { name: "Python Programming",   icon: <Cpu size={18}/>,      tag: "Popular"  },
    { name: "UI / UX Design",       icon: <Palette size={18}/>,  tag: "New"      },
    { name: "Data Structures",      icon: <Braces size={18}/>,   tag: null       },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        .hm{font-family:'DM Sans',sans-serif;}

        /* ── HERO ── */
        .hm-hero{background:#0f2027;padding:7rem 1.5rem 5.5rem;position:relative;overflow:hidden;}
        .hm-hero-grid{position:absolute;inset:0;z-index:0;background-image:linear-gradient(rgba(249,115,22,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,0.04) 1px,transparent 1px);background-size:52px 52px;}
        .hm-hero-g1{position:absolute;z-index:0;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,0.12),transparent 65%);top:-140px;right:-100px;animation:hm-pulse 8s ease-in-out infinite;}
        .hm-hero-g2{position:absolute;z-index:0;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(45,212,191,0.08),transparent 65%);bottom:-80px;left:-80px;animation:hm-pulse 8s 4s ease-in-out infinite;}
        @keyframes hm-pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.1);opacity:0.7;}}
        @keyframes hm-up{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}

        .hm-hero-in{position:relative;z-index:1;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 390px;gap:4rem;align-items:center;}
        @media(max-width:900px){.hm-hero-in{grid-template-columns:1fr;gap:2.5rem;}}

        .hm-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,0.3);color:#fdba74;padding:5px 15px;border-radius:100px;font-size:0.73rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:1.6rem;animation:hm-up 0.5s ease both;}
        .hm-badge-dot{width:6px;height:6px;border-radius:50%;background:#f97316;}
        .hm-title{font-family:'Playfair Display',serif;font-size:clamp(3rem,6vw,4.8rem);font-weight:900;line-height:1.06;color:#fff;margin-bottom:1.3rem;animation:hm-up 0.5s 0.1s ease both;}
        .hm-title span{color:#f97316;display:block;}
        .hm-sub{font-size:1.02rem;color:rgba(255,255,255,0.5);line-height:1.75;max-width:460px;margin-bottom:2.2rem;animation:hm-up 0.5s 0.2s ease both;}
        .hm-btns{display:flex;gap:12px;flex-wrap:wrap;animation:hm-up 0.5s 0.3s ease both;}

        .hm-btn-p{display:inline-flex;align-items:center;gap:8px;background:#f97316;color:#fff;padding:12px 24px;border-radius:9px;font-weight:700;font-size:0.9rem;text-decoration:none;border:none;cursor:pointer;transition:background 0.2s,transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 18px rgba(249,115,22,0.45);font-family:'DM Sans',sans-serif;}
        .hm-btn-p:hover{background:#ea6c0a;transform:translateY(-2px);box-shadow:0 8px 26px rgba(249,115,22,0.55);}
        .hm-btn-g{display:inline-flex;align-items:center;gap:8px;background:transparent;color:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.2);padding:12px 24px;border-radius:9px;font-weight:500;font-size:0.9rem;text-decoration:none;cursor:pointer;transition:background 0.2s,border-color 0.2s;font-family:'DM Sans',sans-serif;}
        .hm-btn-g:hover{background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.35);}

        /* ── WHY CARD ── */
        .hm-why{background:#134e4a;border:1px solid rgba(45,212,191,0.25);border-radius:18px;padding:1.8rem;position:relative;overflow:hidden;animation:hm-up 0.5s 0.15s ease both;}
        .hm-why::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:#2dd4bf;}
        .hm-why-title{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:800;color:#fff;margin-bottom:1.3rem;}
        .hm-why-row{display:flex;align-items:center;gap:11px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.55);font-size:0.88rem;transition:color 0.2s;}
        .hm-why-row:last-child{border-bottom:none;}
        .hm-why-row:hover{color:#fff;}
        .hm-why-ic{width:30px;height:30px;flex-shrink:0;background:rgba(45,212,191,0.12);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#2dd4bf;}

        /* ── STATS ── */
        .hm-stats{background:#0a2e2b;border-top:1px solid rgba(45,212,191,0.18);border-bottom:1px solid rgba(45,212,191,0.18);padding:1.8rem 1.5rem;}
        .hm-stats-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;text-align:center;}
        @media(max-width:600px){.hm-stats-in{grid-template-columns:repeat(2,1fr);}}
        .hm-stat-n{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;color:#f97316;}
        .hm-stat-l{font-size:0.7rem;color:#2dd4bf;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-top:2px;}

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
        .hm-crs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}
        @media(max-width:800px){.hm-crs-grid{grid-template-columns:repeat(2,1fr);}}
        .hm-crs-card{background:#134e4a;border:1px solid rgba(45,212,191,0.15);border-radius:13px;padding:1.3rem 1rem;text-align:center;position:relative;transition:transform 0.2s,box-shadow 0.2s,background 0.2s;cursor:pointer;}
        .hm-crs-card:hover{background:#0d3d39;transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,0.3);}
        .hm-crs-ic{width:42px;height:42px;background:rgba(249,115,22,0.12);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#f97316;margin:0 auto 0.75rem;transition:background 0.2s;}
        .hm-crs-card:hover .hm-crs-ic{background:rgba(249,115,22,0.22);}
        .hm-crs-name{font-weight:700;font-size:0.85rem;color:#f0fdfa;}
        .hm-crs-tag{position:absolute;top:9px;right:9px;font-size:0.6rem;font-weight:700;padding:2px 7px;border-radius:100px;background:#f97316;color:#fff;letter-spacing:0.04em;text-transform:uppercase;}

        /* ── CTA ── */
        .hm-cta-dot{position:absolute;background-image:radial-gradient(circle,rgba(249,115,22,0.1) 1px,transparent 1px);background-size:22px 22px;inset:0;}
        .hm-cta-in{position:relative;z-index:1;max-width:660px;margin:0 auto;text-align:center;}
        .hm-cta-title{font-family:'Playfair Display',serif;font-size:clamp(1.9rem,4vw,3rem);font-weight:900;color:#f0fdfa;margin-bottom:0.9rem;}
        .hm-cta-title span{color:#f97316;}
        .hm-cta-sub{color:rgba(255,255,255,0.55);font-size:0.98rem;line-height:1.75;margin-bottom:2rem;}
        .hm-cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
      `}</style>

      <div className="hm">
        <section className="hm-hero">
          <div className="hm-hero-grid"/><div className="hm-hero-g1"/><div className="hm-hero-g2"/>
          <div className="hm-hero-in">
            <div>
              <div className="hm-badge"><span className="hm-badge-dot"/>Your Learning Journey Starts Here</div>
              <h1 className="hm-title">Learn Skills.<span>Build Your Career.</span></h1>
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
            <div className="hm-why">
              <div className="hm-why-title">Why Choose Us?</div>
              {[
                {icon:<GraduationCap size={14}/>,text:"Industry-focused curriculum"},
                {icon:<Users size={14}/>,text:"Expert instructors & mentors"},
                {icon:<BadgeCheck size={14}/>,text:"Certification after completion"},
                {icon:<BookOpen size={14}/>,text:"Skill-based course tracks"},
                {icon:<MonitorPlay size={14}/>,text:"Interactive live classes"},
                {icon:<Briefcase size={14}/>,text:"Career support & guidance"},
              ].map((it,i)=>(
                <div className="hm-why-row" key={i}><span className="hm-why-ic">{it.icon}</span>{it.text}</div>
              ))}
            </div>
          </div>
        </section>

        <div className="hm-stats">
          <div className="hm-stats-in">
            {[{num:"10K+",lbl:"Students Enrolled"},{num:"120+",lbl:"Expert Courses"},{num:"50+",lbl:"Industry Mentors"},{num:"95%",lbl:"Completion Rate"}].map((s,i)=>(
              <div key={i}><div className="hm-stat-n">{s.num}</div><div className="hm-stat-l">{s.lbl}</div></div>
            ))}
          </div>
        </div>

        <section className="hm-sec hm-sec-light">
          <div className="hm-sec-in">
            <div className="hm-sec-hd"><div className="hm-sec-lbl">What We Offer</div><h2 className="hm-sec-ttl">Our Services</h2></div>
            <div className="hm-svc-grid">
              {services.map((it,i)=>(
                <div className="hm-svc-card" key={i}>
                  <div className="hm-svc-ic">{it.icon}</div>
                  <div className="hm-svc-title">{it.title}</div>
                  <div className="hm-svc-desc">{it.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hm-sec hm-sec-dark">
          <div className="hm-sec-in">
            <div className="hm-sec-hd"><div className="hm-sec-lbl-lt">Explore Programs</div><h2 className="hm-sec-ttl-lt">Courses Offered</h2></div>
            <div className="hm-crs-grid">
              {courses.map((c,i)=>(
                <div className="hm-crs-card" key={i}>
                  {c.tag&&<span className="hm-crs-tag">{c.tag}</span>}
                  <div className="hm-crs-ic">{c.icon}</div>
                  <div className="hm-crs-name">{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hm-sec hm-sec-cta" style={{position:'relative',overflow:'hidden'}}>
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