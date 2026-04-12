import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import { BookOpen, ArrowRight, Search, X, Sparkles, Zap, Trophy, Clock } from "lucide-react";

const TAG_COLORS   = { Popular:"#f97316", Hot:"#ef4444", Trending:"#a78bfa", New:"#22c55e" };
const LEVEL_COLORS = { Beginner:"#22c55e", Intermediate:"#f97316", Advanced:"#ef4444" };
const LEVEL_BG     = { Beginner:"rgba(34,197,94,0.15)", Intermediate:"rgba(249,115,22,0.15)", Advanced:"rgba(239,68,68,0.15)" };

const CAT_EMOJI = {
  "Computer Science":"💻","Mathematics":"📐","Electronics":"⚡",
  "Data Science":"📊","Sciences":"🔬","Humanities":"🌍",
  "Cybersecurity":"🛡️","Design & UX":"🎨",
};

/* ── Skeleton Card ── */
const SkeletonCard = () => (
  <div className="cr-skeleton-card">
    <div className="cr-sk-top">
      <div className="cr-sk-ic shimmer" />
      <div style={{ flex: 1 }}>
        <div className="cr-sk-line shimmer" style={{ width: "80%", height: 14, marginBottom: 6 }} />
        <div className="cr-sk-line shimmer" style={{ width: "55%", height: 11 }} />
      </div>
    </div>
    <div className="cr-sk-body">
      <div className="cr-sk-line shimmer" style={{ width: "100%", height: 11, marginBottom: 6 }} />
      <div className="cr-sk-line shimmer" style={{ width: "90%", height: 11, marginBottom: 6 }} />
      <div className="cr-sk-line shimmer" style={{ width: "70%", height: 11, marginBottom: 14 }} />
      <div style={{ display: "flex", gap: 7 }}>
        <div className="cr-sk-pill shimmer" />
        <div className="cr-sk-pill shimmer" style={{ width: 64 }} />
      </div>
    </div>
    <div className="cr-sk-footer">
      <div className="cr-sk-line shimmer" style={{ width: 50, height: 18 }} />
      <div className="cr-sk-btn shimmer" />
    </div>
  </div>
);

const Courses = () => {
  const [courses, setCourses]               = useState([]);
  const [categories, setCategories]         = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingCats, setLoadingCats]       = useState(true);
  const [search, setSearch]                 = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard]       = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ── KEY FIX: re-run whenever the URL ?category param changes ──
  // This handles clicking footer links while already on /courses
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) {
      setActiveCategory(cat);
      setSearch(""); // clear search so the filter is clean
    } else {
      setActiveCategory("All");
    }
    // Scroll to top so user sees the filtered results
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.search]); // <-- was missing location.search as dependency

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/category/get");
        if (res.data.status) setCategories(res.data.categories);
      } catch (err) { console.error(err); }
      finally { setLoadingCats(false); }
    };
    const fetchCourses = async () => {
      try {
        const res = await api.get("/course/get");
        if (res.data.status) setCourses(res.data.courses);
      } catch (err) { console.error(err); }
      finally { setLoadingCourses(false); }
    };
    fetchCategories();
    fetchCourses();
  }, []);

  const catTabs = [
    { name:"All", emoji:"📚", color:"#2dd4bf" },
    ...categories.map(c => ({ name:c.name, emoji:CAT_EMOJI[c.name]||"📖", color:c.color||"#f97316" })),
  ];

  const filtered = courses.filter(c => {
    const matchSearch   = c.title?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || c.category?.name === activeCategory;
    return matchSearch && matchCategory;
  });

  const hasFilters = activeCategory !== "All" || search !== "";

  const clearFilters = () => {
    setActiveCategory("All");
    setSearch("");
    // Also clear the URL param so the address bar stays in sync
    navigate("/courses", { replace: true });
  };

  const loading = loadingCourses || loadingCats;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .cr{font-family:'DM Sans',sans-serif;min-height:100vh;background:#0d3d39;color:#e2faf8;}

        /* ── HERO ── */
        .cr-hero{background:#0f2027;padding:5.5rem 1.5rem 4rem;text-align:center;position:relative;overflow:hidden;}
        .cr-hero-dots{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(45,212,191,0.06) 1px,transparent 1px);background-size:28px 28px;}
        .cr-hero-glow{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,0.12),transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%);}
        .cr-hero-glow2{position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(45,212,191,0.07),transparent 65%);top:20%;right:10%;}
        .cr-hero-in{position:relative;z-index:1;max-width:720px;margin:0 auto;}

        @keyframes cr-up{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
        @keyframes cr-fade{from{opacity:0;}to{opacity:1;}}

        .cr-hero-badge{
          display:inline-flex;align-items:center;gap:6px;
          background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,0.3);
          color:#f97316;font-size:0.68rem;font-weight:700;letter-spacing:0.14em;
          text-transform:uppercase;padding:6px 16px;border-radius:100px;
          margin-bottom:1.2rem;animation:cr-up 0.5s ease both;
        }
        .cr-hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.4rem,5vw,3.8rem);font-weight:900;color:#e2faf8;line-height:1.08;margin-bottom:1rem;animation:cr-up 0.5s 0.1s ease both;}
        .cr-hero-title span{color:#f97316;}
        .cr-hero-sub{color:rgba(226,250,248,0.5);font-size:0.97rem;line-height:1.7;margin-bottom:2rem;animation:cr-up 0.5s 0.15s ease both;}

        .cr-hero-stats{display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap;margin-bottom:2.2rem;animation:cr-up 0.5s 0.2s ease both;}
        .cr-hero-stat{display:flex;align-items:center;gap:6px;font-size:0.8rem;color:rgba(226,250,248,0.55);font-weight:500;}
        .cr-hero-stat-ic{color:#2dd4bf;}

        .cr-search-wrap{max-width:480px;margin:0 auto;position:relative;animation:cr-up 0.5s 0.25s ease both;}
        .cr-search-ic{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#2dd4bf;pointer-events:none;}
        .cr-search{
          width:100%;padding:13px 18px 13px 46px;
          background:rgba(45,212,191,0.07);border:1.5px solid rgba(45,212,191,0.22);
          border-radius:12px;color:#e2faf8;font-size:0.9rem;font-family:'DM Sans',sans-serif;outline:none;
          transition:border-color 0.2s,box-shadow 0.2s,background 0.2s;
        }
        .cr-search:focus{border-color:#2dd4bf;box-shadow:0 0 0 4px rgba(45,212,191,0.1);background:rgba(45,212,191,0.1);}
        .cr-search::placeholder{color:rgba(226,250,248,0.25);}

        /* ── ACTIVE FILTER BANNER ── */
        .cr-filter-banner{
          background:rgba(249,115,22,0.08);border-bottom:1px solid rgba(249,115,22,0.18);
          padding:0.75rem 1.5rem;text-align:center;font-size:0.82rem;font-weight:600;
          color:#fb923c;display:flex;align-items:center;justify-content:center;gap:8px;
        }

        /* ── PANEL ── */
        .cr-panel{background:#0a2e2b;border-bottom:1px solid rgba(45,212,191,0.1);padding:1.6rem 1.5rem;}
        .cr-panel-in{max-width:1200px;margin:0 auto;}
        .cr-panel-label{font-size:0.65rem;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:rgba(45,212,191,0.45);margin-bottom:0.65rem;}
        .cr-pills{display:flex;flex-wrap:wrap;gap:8px;}
        .cr-pill-cat{
          display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:100px;
          font-size:0.82rem;font-weight:600;cursor:pointer;border:1px solid rgba(45,212,191,0.2);
          background:transparent;color:rgba(226,250,248,0.45);transition:all 0.18s;font-family:'DM Sans',sans-serif;
        }
        .cr-pill-cat:hover{color:rgba(226,250,248,0.8);border-color:rgba(45,212,191,0.4);background:rgba(45,212,191,0.06);}

        /* ── BODY ── */
        .cr-body{padding:2.5rem 1.5rem 5rem;}
        .cr-body-in{max-width:1200px;margin:0 auto;}
        .cr-toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.8rem;flex-wrap:wrap;gap:0.6rem;}
        .cr-count{font-size:0.82rem;color:rgba(226,250,248,0.4);}
        .cr-count strong{color:#2dd4bf;}
        .cr-clear{display:inline-flex;align-items:center;gap:5px;padding:5px 13px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.22);border-radius:100px;font-size:0.75rem;font-weight:600;color:#f87171;cursor:pointer;font-family:'DM Sans',sans-serif;transition:background 0.2s;}
        .cr-clear:hover{background:rgba(239,68,68,0.18);}

        /* ── GRID ── */
        .cr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:1.4rem;}

        /* ── COURSE CARD ── */
        .cr-card{
          background:#134e4a;border:1px solid rgba(45,212,191,0.15);
          border-radius:16px;overflow:hidden;display:flex;flex-direction:column;
          position:relative;transition:all 0.28s cubic-bezier(0.34,1.56,0.64,1);
          cursor:pointer;
        }
        .cr-card:hover{transform:translateY(-7px);box-shadow:0 24px 50px rgba(0,0,0,0.4);border-color:rgba(45,212,191,0.35);}
        .cr-card-shine{
          position:absolute;inset:0;z-index:0;pointer-events:none;
          background:linear-gradient(135deg,rgba(255,255,255,0.03) 0%,transparent 60%);
          opacity:0;transition:opacity 0.3s;
        }
        .cr-card:hover .cr-card-shine{opacity:1;}

        .cr-card-top{background:#0f2027;padding:1.3rem 1.4rem;display:flex;align-items:center;gap:12px;position:relative;z-index:1;}
        .cr-card-ic{
          width:46px;height:46px;background:rgba(45,212,191,0.14);border-radius:12px;
          display:flex;align-items:center;justify-content:center;color:#2dd4bf;font-size:20px;
          flex-shrink:0;transition:background 0.25s,transform 0.25s;
        }
        .cr-card:hover .cr-card-ic{background:rgba(45,212,191,0.25);transform:scale(1.1) rotate(-5deg);}
        .cr-card-title{font-weight:700;font-size:0.93rem;color:#e2faf8;line-height:1.3;flex:1;}

        .cr-card-body{padding:1rem 1.4rem;flex:1;position:relative;z-index:1;}
        .cr-card-desc{color:rgba(226,250,248,0.52);font-size:0.83rem;line-height:1.7;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:0.9rem;}
        .cr-card-meta{display:flex;align-items:center;gap:7px;flex-wrap:wrap;}
        .cr-card-cat{font-size:0.67rem;font-weight:700;padding:3px 10px;border-radius:100px;background:rgba(45,212,191,0.1);color:#2dd4bf;border:1px solid rgba(45,212,191,0.22);}
        .cr-card-lvl{font-size:0.67rem;font-weight:700;padding:3px 10px;border-radius:100px;}
        .cr-card-dur{display:inline-flex;align-items:center;gap:5px;margin-top:8px;font-size:0.75rem;font-weight:600;color:#fb923c;background:rgba(251,146,60,0.1);border:1px solid rgba(251,146,60,0.2);padding:3px 9px;border-radius:100px;}

        .cr-card-footer{
          padding:0.9rem 1.4rem 1.1rem;display:flex;align-items:center;justify-content:space-between;
          border-top:1px solid rgba(45,212,191,0.1);background:#0f2027;position:relative;z-index:1;
        }
        .cr-card-price{font-size:1.05rem;font-weight:800;color:#2dd4bf;}
        .cr-card-price.free{color:#22c55e;}
        .cr-card-btn{
          display:inline-flex;align-items:center;gap:5px;background:#f97316;color:#fff;
          padding:8px 16px;border-radius:8px;font-size:0.8rem;font-weight:700;border:none;cursor:pointer;
          font-family:'DM Sans',sans-serif;transition:background 0.2s,transform 0.2s,box-shadow 0.2s;
          box-shadow:0 3px 10px rgba(249,115,22,0.3);
        }
        .cr-card-btn:hover{background:#ea6c0a;transform:translateY(-1px);box-shadow:0 6px 16px rgba(249,115,22,0.45);}
        .cr-badge{position:absolute;top:11px;right:11px;font-size:0.6rem;font-weight:700;padding:3px 9px;border-radius:100px;color:#fff;text-transform:uppercase;z-index:2;letter-spacing:0.05em;}

        /* ── SKELETON ── */
        @keyframes shimmer{
          0%{background-position:-700px 0;}
          100%{background-position:700px 0;}
        }
        .shimmer{
          background:linear-gradient(90deg,rgba(45,212,191,0.06) 25%,rgba(45,212,191,0.13) 50%,rgba(45,212,191,0.06) 75%);
          background-size:700px 100%;
          animation:shimmer 1.6s infinite linear;
          border-radius:6px;
        }
        .cr-skeleton-card{
          background:#134e4a;border:1px solid rgba(45,212,191,0.1);
          border-radius:16px;overflow:hidden;display:flex;flex-direction:column;
          animation:cr-fade 0.4s ease both;
        }
        .cr-sk-top{background:#0f2027;padding:1.3rem 1.4rem;display:flex;align-items:center;gap:12px;}
        .cr-sk-ic{width:46px;height:46px;border-radius:12px;flex-shrink:0;}
        .cr-sk-body{padding:1rem 1.4rem;flex:1;}
        .cr-sk-line{border-radius:5px;}
        .cr-sk-pill{width:80px;height:22px;border-radius:100px;}
        .cr-sk-footer{
          padding:0.9rem 1.4rem 1.1rem;display:flex;align-items:center;
          justify-content:space-between;border-top:1px solid rgba(45,212,191,0.08);background:#0f2027;
        }
        .cr-sk-btn{width:100px;height:34px;border-radius:8px;}

        /* ── EMPTY STATE ── */
        .cr-empty{
          text-align:center;padding:5rem 1rem;
          display:flex;flex-direction:column;align-items:center;gap:1rem;
        }
        .cr-empty-ic{
          width:70px;height:70px;background:rgba(45,212,191,0.08);border-radius:50%;
          display:flex;align-items:center;justify-content:center;color:rgba(45,212,191,0.4);
        }
        .cr-empty-title{font-family:'Playfair Display',serif;font-size:1.3rem;color:#e2faf8;font-weight:700;}
        .cr-empty-sub{color:rgba(226,250,248,0.35);font-size:0.87rem;}

        /* ── FLOATING PARTICLES ── */
        .cr-particle{
          position:absolute;border-radius:50%;pointer-events:none;
          animation:cr-float var(--dur,6s) var(--delay,0s) ease-in-out infinite alternate;
        }
        @keyframes cr-float{
          0%{transform:translateY(0) scale(1);opacity:0.4;}
          100%{transform:translateY(-30px) scale(1.2);opacity:0.1;}
        }
      `}</style>

      <div className="cr">
        {/* ── HERO ── */}
        <div className="cr-hero">
          <div className="cr-hero-dots"/>
          <div className="cr-hero-glow"/>
          <div className="cr-hero-glow2"/>

          {[
            {top:"15%",left:"8%",size:8,dur:"5s",delay:"0s",color:"rgba(249,115,22,0.3)"},
            {top:"70%",left:"5%",size:5,dur:"7s",delay:"1s",color:"rgba(45,212,191,0.4)"},
            {top:"25%",right:"6%",size:6,dur:"6s",delay:"0.5s",color:"rgba(45,212,191,0.3)"},
            {top:"65%",right:"8%",size:9,dur:"8s",delay:"2s",color:"rgba(249,115,22,0.25)"},
          ].map((p,i)=>(
            <div key={i} className="cr-particle" style={{
              top:p.top,left:p.left,right:p.right,
              width:p.size,height:p.size,background:p.color,
              "--dur":p.dur,"--delay":p.delay,
            }}/>
          ))}

          <div className="cr-hero-in">
            <div className="cr-hero-badge"><Sparkles size={11}/> Browse Programs</div>
            <h1 className="cr-hero-title">Explore Our <span>Courses</span></h1>
            <p className="cr-hero-sub">Discover expert-led courses designed to build real skills and launch careers.</p>

            <div className="cr-hero-stats">
              <div className="cr-hero-stat"><Trophy size={13} className="cr-hero-stat-ic"/> 120+ Expert Courses</div>
              <div className="cr-hero-stat"><Zap size={13} className="cr-hero-stat-ic"/> Skill-Based Learning</div>
              <div className="cr-hero-stat"><Clock size={13} className="cr-hero-stat-ic"/> Learn at Your Pace</div>
            </div>

            <div className="cr-search-wrap">
              <Search size={15} className="cr-search-ic"/>
              <input
                className="cr-search"
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── ACTIVE FILTER BANNER ── shows which category is active */}
        {activeCategory !== "All" && (
          <div className="cr-filter-banner">
            Showing courses in: <strong style={{color:"#f97316"}}>{activeCategory}</strong>
          </div>
        )}

        {/* ── FILTER PANEL ── */}
        <div className="cr-panel">
          <div className="cr-panel-in">
            <div className="cr-panel-label">Filter by Category</div>
            <div className="cr-pills">
              {loadingCats
                ? [...Array(5)].map((_,i)=>(
                    <div key={i} className="shimmer" style={{width:90,height:36,borderRadius:100}}/>
                  ))
                : catTabs.map((tab,i)=>(
                    <button
                      key={i}
                      className="cr-pill-cat"
                      style={activeCategory===tab.name ? {
                        color:tab.color,borderColor:tab.color,background:`${tab.color}22`,
                      } : {}}
                      onClick={()=>{
                        setActiveCategory(tab.name);
                        // Keep URL in sync when clicking filter pills too
                        if (tab.name === "All") {
                          navigate("/courses", { replace: true });
                        } else {
                          navigate(`/courses?category=${encodeURIComponent(tab.name)}`, { replace: true });
                        }
                      }}
                    >
                      <span>{tab.emoji}</span> {tab.name}
                    </button>
                  ))
              }
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="cr-body">
          <div className="cr-body-in">
            <div className="cr-toolbar">
              <div className="cr-count">
                {loading
                  ? <span style={{color:"rgba(226,250,248,0.3)"}}>Loading courses...</span>
                  : <>Showing <strong>{filtered.length}</strong> {activeCategory !== "All" ? `${activeCategory} ` : ""}courses</>
                }
              </div>
              {hasFilters && !loading && (
                <button className="cr-clear" onClick={clearFilters}>
                  <X size={11}/> Clear Filters
                </button>
              )}
            </div>

            <div className="cr-grid">
              {loading
                ? [...Array(6)].map((_,i)=><SkeletonCard key={i}/>)
                : filtered.length > 0
                  ? filtered.map(course=>(
                      <div
                        className="cr-card"
                        key={course._id}
                        onMouseEnter={()=>setHoveredCard(course._id)}
                        onMouseLeave={()=>setHoveredCard(null)}
                        onClick={()=>navigate(`/course/${course._id}`)}
                      >
                        <div className="cr-card-shine"/>
                        {course.tag && (
                          <span className="cr-badge" style={{background:TAG_COLORS[course.tag]}}>
                            {course.tag}
                          </span>
                        )}
                        <div className="cr-card-top">
                          <div className="cr-card-ic">
                            {CAT_EMOJI[course.category?.name]||<BookOpen size={18}/>}
                          </div>
                          <div className="cr-card-title">{course.title}</div>
                        </div>
                        <div className="cr-card-body">
                          <div className="cr-card-desc">{course.description}</div>
                          <div className="cr-card-meta">
                            <span className="cr-card-cat">{course.category?.name}</span>
                            {course.level && (
                              <span className="cr-card-lvl" style={{
                                background:LEVEL_BG[course.level],
                                color:LEVEL_COLORS[course.level],
                                border:`1px solid ${LEVEL_COLORS[course.level]}35`,
                              }}>
                                {course.level}
                              </span>
                            )}
                          </div>
                          {course.duration && (
                            <div className="cr-card-dur">⏱ {course.duration}</div>
                          )}
                        </div>
                        <div className="cr-card-footer">
                          <div className={`cr-card-price ${(!course.price||course.price===0)?"free":""}`}>
                            {(!course.price||course.price===0)?"Free":`₹${course.price}`}
                          </div>
                          <button
                            className="cr-card-btn"
                            onClick={e=>{e.stopPropagation();navigate(`/course/${course._id}`);}}
                          >
                            View Course <ArrowRight size={12}/>
                          </button>
                        </div>
                      </div>
                    ))
                  : (
                      <div className="cr-empty" style={{gridColumn:"1/-1"}}>
                        <div className="cr-empty-ic"><BookOpen size={28}/></div>
                        <div className="cr-empty-title">No courses found</div>
                        <div className="cr-empty-sub">Try adjusting your filters or search term</div>
                        {hasFilters && (
                          <button className="cr-clear" onClick={clearFilters} style={{marginTop:4}}>
                            <X size={11}/> Clear Filters
                          </button>
                        )}
                      </div>
                    )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;