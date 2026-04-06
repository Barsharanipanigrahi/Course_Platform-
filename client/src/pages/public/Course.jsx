import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import { BookOpen, ArrowRight, Search, X } from "lucide-react";

const TAG_COLORS   = { Popular:"#f97316", Hot:"#ef4444", Trending:"#a78bfa", New:"#22c55e" };
const LEVEL_COLORS = { Beginner:"#22c55e", Intermediate:"#f97316", Advanced:"#ef4444" };
const LEVEL_BG     = { Beginner:"rgba(34,197,94,0.15)", Intermediate:"rgba(249,115,22,0.15)", Advanced:"rgba(239,68,68,0.15)" };

const CAT_EMOJI = {
  "Computer Science":"💻","Mathematics":"📐","Electronics":"⚡",
  "Data Science":"📊","Sciences":"🔬","Humanities":"🌍",
  "Cybersecurity":"🛡️","Design & UX":"🎨",
};

const Courses = () => {
  const [courses, setCourses]               = useState([]);
  const [categories, setCategories]         = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingCats, setLoadingCats]       = useState(true);
  const [search, setSearch]                 = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) setActiveCategory(cat);
  }, [location.search]);

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

  // Updated filter logic: Removed activeLevel check
  const filtered = courses.filter(c => {
    const matchSearch   = c.title?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || c.category?.name === activeCategory;
    return matchSearch && matchCategory;
  });

  const hasFilters = activeCategory !== "All" || search !== "";
  const clearFilters = () => { setActiveCategory("All"); setSearch(""); };
  const loading = loadingCourses || loadingCats;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .cr{font-family:'DM Sans',sans-serif;min-height:100vh;background:#0d3d39;color:#e2faf8;}

        .cr-hero{background:#0f2027;padding:5rem 1.5rem 3.5rem;text-align:center;position:relative;overflow:hidden;}
        .cr-hero-dots{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(45,212,191,0.06) 1px,transparent 1px);background-size:28px 28px;}
        .cr-hero-glow{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,0.1),transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%);}
        .cr-hero-in{position:relative;z-index:1;max-width:680px;margin:0 auto;}
        .cr-hero-badge{display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#f97316;margin-bottom:0.8rem;}
        .cr-hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;color:#e2faf8;line-height:1.08;margin-bottom:0.9rem;}
        .cr-hero-title span{color:#f97316;}
        .cr-hero-sub{color:rgba(226,250,248,0.5);font-size:0.97rem;line-height:1.7;margin-bottom:2rem;}
        
        .cr-search-wrap{max-width:460px;margin:0 auto;position:relative;}
        .cr-search-ic{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#2dd4bf;pointer-events:none;}
        .cr-search{width:100%;padding:12px 16px 12px 44px;background:rgba(45,212,191,0.08);border:1px solid rgba(45,212,191,0.25);border-radius:10px;color:#e2faf8;font-size:0.9rem;font-family:'DM Sans',sans-serif;outline:none;}
        
        .cr-panel{background:#0a2e2b;border-bottom:1px solid rgba(45,212,191,0.1);padding:1.6rem 1.5rem;}
        .cr-panel-in{max-width:1200px;margin:0 auto;}
        .cr-panel-label{font-size:0.65rem;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:rgba(45,212,191,0.45);margin-bottom:0.65rem;}
        .cr-pills{display:flex;flex-wrap:wrap;gap:8px;}

        .cr-pill-cat{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:100px;font-size:0.82rem;font-weight:600;cursor:pointer;border:1px solid rgba(45,212,191,0.2);background:transparent;color:rgba(226,250,248,0.45);transition:all 0.18s;}
        
        .cr-body{padding:2.5rem 1.5rem 4rem;}
        .cr-body-in{max-width:1200px;margin:0 auto;}
        .cr-toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:0.6rem;}
        .cr-count{font-size:0.82rem;color:rgba(226,250,248,0.4);}
        .cr-clear{display:inline-flex;align-items:center;gap:5px;padding:5px 13px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.22);border-radius:100px;font-size:0.75rem;font-weight:600;color:#f87171;cursor:pointer;}

        .cr-grid{display:grid;grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:1.3rem;}
        .cr-card{background:#134e4a;border:1px solid rgba(45,212,191,0.18);border-radius:15px;overflow:hidden;display:flex;flex-direction:column;position:relative;transition:all 0.22s;}
        .cr-card:hover{transform:translateY(-5px);box-shadow:0 18px 44px rgba(0,0,0,0.35);}
        .cr-card-top{background:#0f2027;padding:1.3rem 1.4rem;display:flex;align-items:center;gap:12px;}
        .cr-card-ic{width:42px;height:42px;background:rgba(45,212,191,0.14);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#2dd4bf;font-size:18px;}
        .cr-card-title{font-weight:700;font-size:0.92rem;color:#e2faf8;line-height:1.3;flex:1;}
        .cr-card-body{padding:1rem 1.4rem;flex:1;}
        .cr-card-desc{color:rgba(226,250,248,0.52);font-size:0.83rem;line-height:1.65;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:0.8rem;}
        .cr-card-meta{display:flex;align-items:center;gap:7px;}
        .cr-card-cat{font-size:0.67rem;font-weight:700;padding:3px 9px;border-radius:100px;background:rgba(45,212,191,0.1);color:#2dd4bf;border:1px solid rgba(45,212,191,0.22);}
        .cr-card-lvl{font-size:0.67rem;font-weight:700;padding:3px 9px;border-radius:100px;}
        .cr-card-footer{padding:0.9rem 1.4rem 1.1rem;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(45,212,191,0.1);background:#0f2027;}
        .cr-card-price{font-size:1rem;font-weight:800;color:#2dd4bf;}
        .cr-card-price.free{color:#22c55e;}
        .cr-card-btn{display:inline-flex;align-items:center;gap:5px;background:#f97316;color:#fff;padding:7px 14px;border-radius:7px;font-size:0.8rem;font-weight:700;border:none;cursor:pointer;}
        .cr-badge{position:absolute;top:10px;right:10px;font-size:0.6rem;font-weight:700;padding:2px 8px;border-radius:100px;color:#fff;text-transform:uppercase;}
      `}</style>

      <div className="cr">
        <div className="cr-hero">
          <div className="cr-hero-dots"/>
          <div className="cr-hero-glow"/>
          <div className="cr-hero-in">
            <div className="cr-hero-badge">Browse Programs</div>
            <h1 className="cr-hero-title">Explore Our <span>Courses</span></h1>
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

        {/* Filter Panel (Only Category remains) */}
        <div className="cr-panel">
          <div className="cr-panel-in">
            <div className="cr-panel-label">Category</div>
            <div className="cr-pills">
              {loadingCats ? <span>Loading...</span> : 
                catTabs.map((tab, i) => (
                  <button
                    key={i}
                    className="cr-pill-cat"
                    style={activeCategory === tab.name ? {
                      color: tab.color,
                      borderColor: tab.color,
                      background: `${tab.color}22`,
                    } : {}}
                    onClick={() => setActiveCategory(tab.name)}
                  >
                    <span>{tab.emoji}</span> {tab.name}
                  </button>
                ))
              }
            </div>
          </div>
        </div>

        <div className="cr-body">
          <div className="cr-body-in">
            <div className="cr-toolbar">
              <div className="cr-count">
                Showing <strong>{filtered.length}</strong> courses
              </div>
              {hasFilters && (
                <button className="cr-clear" onClick={clearFilters}>
                  <X size={11}/> Clear Filters
                </button>
              )}
            </div>

            <div className="cr-grid">
              {filtered.map(course => (
                <div className="cr-card" key={course._id}>
                  {course.tag && (
                    <span className="cr-badge" style={{ background: TAG_COLORS[course.tag] }}>
                      {course.tag}
                    </span>
                  )}
                  <div className="cr-card-top">
                    <div className="cr-card-ic">
                      {CAT_EMOJI[course.category?.name] || <BookOpen size={18}/>}
                    </div>
                    <div className="cr-card-title">{course.title}</div>
                  </div>
                  <div className="cr-card-body">
                    <div className="cr-card-desc">{course.description}</div>
                    <div className="cr-card-meta">
  <span className="cr-card-cat">{course.category?.name}</span>
  {course.level && (
    <span className="cr-card-lvl" style={{
      background: LEVEL_BG[course.level],
      color: LEVEL_COLORS[course.level],
      border: `1px solid ${LEVEL_COLORS[course.level]}35`
    }}>
      {course.level}
    </span>
  )}
</div>

{course.duration && (
  <div style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#fb923c",
    background: "rgba(167,139,250,0.1)",
    border: "1px solid rgba(167,139,250,0.2)",
    padding: "3px 9px",
    borderRadius: 100,
  }}>
    ⏱ {course.duration}
  </div>
)}
                  </div>
                  <div className="cr-card-footer">
                    <div className={`cr-card-price ${(!course.price || course.price === 0) ? "free" : ""}`}>
                      {(!course.price || course.price === 0) ? "Free" : `₹${course.price}`}
                    </div>
                    <button className="cr-card-btn" onClick={() => navigate(`/course/${course._id}`)}>
                      View Course <ArrowRight size={12}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;