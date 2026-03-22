import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { BookOpen, ArrowRight, Search } from "lucide-react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await api.get("/course/get");
      if (res.data.status) setCourses(res.data.courses);
    } catch (error) { console.log("Error fetching courses", error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCourses(); }, []);
  const filtered = courses.filter(c => c.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        .cr{font-family:'DM Sans',sans-serif;min-height:100vh;background:#0d3d39;}
        .cr-hdr{background:#0f2027;padding:5rem 1.5rem 4rem;text-align:center;position:relative;overflow:hidden;}
        .cr-hdr-bg{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(249,115,22,0.05) 1px,transparent 1px);background-size:28px 28px;}
        .cr-hdr-glow{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,0.1),transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%);}
        .cr-hdr-in{position:relative;z-index:1;max-width:680px;margin:0 auto;}
        .cr-hdr-lbl{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#f97316;margin-bottom:0.8rem;}
        .cr-hdr-title{font-family:'Playfair Display',serif;font-size:clamp(2.4rem,5vw,3.8rem);font-weight:900;color:#fff;margin-bottom:0.9rem;line-height:1.08;}
        .cr-hdr-title span{color:#f97316;}
        .cr-hdr-sub{color:rgba(255,255,255,0.5);font-size:0.97rem;line-height:1.7;margin-bottom:1.8rem;}
        .cr-search-wrap{max-width:460px;margin:0 auto;position:relative;}
        .cr-search-ic{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:#f97316;pointer-events:none;}
        .cr-search{width:100%;padding:11px 15px 11px 42px;background:rgba(249,115,22,0.08);border:1px solid rgba(249,115,22,0.25);border-radius:9px;color:#fff;font-size:0.9rem;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.2s,background 0.2s;}
        .cr-search::placeholder{color:rgba(255,255,255,0.35);}
        .cr-search:focus{border-color:rgba(249,115,22,0.5);background:rgba(249,115,22,0.12);}
        .cr-body{padding:3.5rem 1.5rem;}
        .cr-body-in{max-width:1200px;margin:0 auto;}
        .cr-status{text-align:center;color:rgba(255,255,255,0.4);font-size:0.97rem;padding:3.5rem 0;}
        .cr-count{font-size:0.8rem;color:rgba(255,255,255,0.45);margin-bottom:1.8rem;}
        .cr-count strong{color:#2dd4bf;}
        .cr-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.3rem;}
        @media(max-width:900px){.cr-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:560px){.cr-grid{grid-template-columns:1fr;}}
        .cr-card{background:#134e4a;border:1px solid rgba(45,212,191,0.2);border-radius:15px;overflow:hidden;transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s;display:flex;flex-direction:column;}
        .cr-card:hover{transform:translateY(-6px);box-shadow:0 20px 48px rgba(0,0,0,0.35);border-color:rgba(45,212,191,0.45);}
        .cr-card-top{background:#0f2027;padding:1.6rem;display:flex;align-items:center;gap:13px;}
        .cr-card-ic{width:46px;height:46px;background:rgba(249,115,22,0.2);border-radius:11px;display:flex;align-items:center;justify-content:center;color:#f97316;flex-shrink:0;}
        .cr-card-title{font-weight:700;font-size:0.97rem;color:#fff;line-height:1.3;}
        .cr-card-body{padding:1.3rem 1.5rem;flex:1;background:#134e4a;}
        .cr-card-desc{color:rgba(255,255,255,0.55);font-size:0.86rem;line-height:1.65;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:1rem;}
        .cr-card-footer{padding:0.9rem 1.5rem 1.3rem;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(45,212,191,0.15);background:#134e4a;}
        .cr-card-price{font-size:1.05rem;font-weight:800;color:#2dd4bf;}
        .cr-card-btn{display:inline-flex;align-items:center;gap:5px;background:#f97316;color:#fff;padding:7px 14px;border-radius:7px;font-size:0.8rem;font-weight:700;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;transition:background 0.2s,transform 0.15s;}
        .cr-card-btn:hover{background:#ea6c0a;transform:translateY(-1px);}
      `}</style>
      <div className="cr">
        <div className="cr-hdr">
          <div className="cr-hdr-bg"/><div className="cr-hdr-glow"/>
          <div className="cr-hdr-in">
            <div className="cr-hdr-lbl">Browse Programs</div>
            <h1 className="cr-hdr-title">Explore Our <span>Courses</span></h1>
            <p className="cr-hdr-sub">Learn job-ready skills with hands-on projects, expert guidance, and real-world experience.</p>
            <div className="cr-search-wrap">
              <Search size={15} className="cr-search-ic"/>
              <input className="cr-search" type="text" placeholder="Search courses..." value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className="cr-body">
          <div className="cr-body-in">
            {loading && <div className="cr-status">Loading courses...</div>}
            {!loading && courses.length === 0 && <div className="cr-status">No courses available right now.</div>}
            {!loading && courses.length > 0 && filtered.length === 0 && <div className="cr-status">No courses match your search.</div>}
            {!loading && filtered.length > 0 && (
              <>
                <div className="cr-count">Showing <strong>{filtered.length}</strong> course{filtered.length!==1?'s':''}</div>
                <div className="cr-grid">
                  {filtered.map(course=>(
                    <div className="cr-card" key={course._id}>
                      <div className="cr-card-top"><div className="cr-card-ic"><BookOpen size={20}/></div><div className="cr-card-title">{course.title}</div></div>
                      <div className="cr-card-body"><div className="cr-card-desc">{course.description}</div></div>
                      <div className="cr-card-footer">
                        <div className="cr-card-price">₹{course.price||"Free"}</div>
                        <button className="cr-card-btn" onClick={()=>navigate(`/course/${course._id}`)}>View Course <ArrowRight size={12}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Courses;