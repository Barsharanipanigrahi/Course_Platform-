import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { BookOpen, User, Mail, Shield, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const fetchMyCourses = async () => {
    try {
      const res = await api.get("/enrollment/my-courses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.status) setCourses(res.data.courses);
    } catch (err) { console.log("Course fetch error:", err.response?.data || err); }
    finally { setLoadingCourses(false); }
  };

  useEffect(() => { fetchMyCourses(); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        .pf { font-family:'DM Sans',sans-serif; min-height:100vh; background:#0d3d39; padding:0 0 4rem; }

        /* ── HERO BANNER ── */
        .pf-hero { background:#0f2027; padding:4.5rem 1.5rem 3.5rem; position:relative; overflow:hidden; }
        .pf-hero-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(249,115,22,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,0.04) 1px,transparent 1px); background-size:52px 52px; }
        .pf-hero-g1 { position:absolute; width:440px; height:440px; border-radius:50%; background:radial-gradient(circle,rgba(249,115,22,0.1),transparent 65%); top:-120px; right:-80px; }
        .pf-hero-g2 { position:absolute; width:300px; height:300px; border-radius:50%; background:radial-gradient(circle,rgba(45,212,191,0.07),transparent 65%); bottom:-80px; left:-60px; }

        .pf-hero-in { position:relative; z-index:1; max-width:900px; margin:0 auto; display:flex; align-items:center; gap:2rem; flex-wrap:wrap; }
        .pf-avatar { width:80px; height:80px; border-radius:50%; background:#f97316; display:flex; align-items:center; justify-content:center; font-family:'Playfair Display',serif; font-size:2.2rem; font-weight:900; color:#fff; flex-shrink:0; border:3px solid rgba(249,115,22,0.4); box-shadow:0 0 0 6px rgba(249,115,22,0.08); }
        .pf-hero-info { flex:1; }
        .pf-hero-lbl { font-size:0.68rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#f97316; margin-bottom:0.5rem; }
        .pf-hero-name { font-family:'Playfair Display',serif; font-size:clamp(1.8rem,4vw,2.6rem); font-weight:900; color:#fff; line-height:1.1; margin-bottom:0.4rem; }
        .pf-hero-email { font-size:0.9rem; color:rgba(255,255,255,0.45); margin-bottom:0.8rem; }
        .pf-role { display:inline-flex; align-items:center; gap:5px; padding:4px 12px; border-radius:100px; font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; }
        .pf-role-admin { background:rgba(239,68,68,0.15); color:#fca5a5; border:1px solid rgba(239,68,68,0.3); }
        .pf-role-user  { background:rgba(249,115,22,0.15); color:#fdba74; border:1px solid rgba(249,115,22,0.3); }

        /* ── STATS BAR ── */
        .pf-stats { background:#0a2e2b; border-top:1px solid rgba(45,212,191,0.15); border-bottom:1px solid rgba(45,212,191,0.15); padding:1.4rem 1.5rem; }
        .pf-stats-in { max-width:900px; margin:0 auto; display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; text-align:center; }
        .pf-stat-n { font-family:'Playfair Display',serif; font-size:1.7rem; font-weight:900; color:#f97316; }
        .pf-stat-l { font-size:0.68rem; color:#2dd4bf; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; margin-top:2px; }

        /* ── BODY ── */
        .pf-body { max-width:900px; margin:0 auto; padding:2.5rem 1.5rem 0; display:flex; flex-direction:column; gap:1.4rem; }

        /* ── CARDS ── */
        .pf-card { background:#134e4a; border:1px solid rgba(45,212,191,0.2); border-radius:16px; overflow:hidden; }
        .pf-card-hd { padding:1.2rem 1.6rem; border-bottom:1px solid rgba(45,212,191,0.12); display:flex; align-items:center; gap:10px; }
        .pf-card-hd-ic { width:36px; height:36px; background:rgba(45,212,191,0.12); border-radius:9px; display:flex; align-items:center; justify-content:center; color:#2dd4bf; flex-shrink:0; }
        .pf-card-hd-title { font-weight:700; font-size:0.97rem; color:#f0fdfa; }
        .pf-card-hd-sub { font-size:0.78rem; color:rgba(255,255,255,0.4); }

        /* ── INFO ROWS ── */
        .pf-row { display:flex; align-items:center; justify-content:space-between; padding:1rem 1.6rem; border-bottom:1px solid rgba(45,212,191,0.08); }
        .pf-row:last-child { border-bottom:none; }
        .pf-row:nth-child(even) { background:rgba(45,212,191,0.03); }
        .pf-row-key { font-size:0.86rem; color:rgba(255,255,255,0.45); font-weight:500; display:flex; align-items:center; gap:8px; }
        .pf-row-val { font-size:0.86rem; font-weight:600; color:#f0fdfa; }

        /* ── COURSE CARDS ── */
        .pf-courses-wrap { padding:1.4rem 1.6rem; }
        .pf-courses-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1rem; }
        @media(max-width:640px){ .pf-courses-grid{ grid-template-columns:1fr; } }

        .pf-crs-card { background:#0f2027; border:1px solid rgba(45,212,191,0.15); border-radius:13px; padding:1.2rem; transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
        .pf-crs-card:hover { transform:translateY(-4px); box-shadow:0 14px 32px rgba(0,0,0,0.35); border-color:rgba(45,212,191,0.4); }
        .pf-crs-top { display:flex; align-items:center; gap:10px; margin-bottom:0.7rem; }
        .pf-crs-ic { width:36px; height:36px; background:rgba(249,115,22,0.15); border-radius:9px; display:flex; align-items:center; justify-content:center; color:#f97316; flex-shrink:0; }
        .pf-crs-title { font-weight:700; font-size:0.9rem; color:#f0fdfa; line-height:1.3; }
        .pf-crs-desc { font-size:0.8rem; color:rgba(255,255,255,0.45); line-height:1.6; margin-bottom:0.8rem; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .pf-crs-footer { display:flex; align-items:center; justify-content:space-between; }
        .pf-crs-date { font-size:0.72rem; color:rgba(255,255,255,0.3); display:flex; align-items:center; gap:4px; }
        .pf-crs-badge { font-size:0.65rem; font-weight:700; padding:2px 8px; border-radius:100px; background:rgba(45,212,191,0.12); color:#2dd4bf; border:1px solid rgba(45,212,191,0.2); }

        .pf-empty { padding:2.5rem 1.6rem; color:rgba(255,255,255,0.35); font-size:0.9rem; text-align:center; }
        .pf-empty-hint { font-size:0.82rem; color:rgba(255,255,255,0.2); margin-top:0.4rem; }
        .pf-loading { padding:2rem 1.6rem; color:rgba(255,255,255,0.3); font-size:0.9rem; text-align:center; }

        .pf-browse-btn { display:inline-flex; align-items:center; gap:7px; background:#f97316; color:#fff; padding:9px 20px; border-radius:8px; font-size:0.84rem; font-weight:700; text-decoration:none; margin-top:1rem; transition:background 0.2s,transform 0.15s; box-shadow:0 4px 14px rgba(249,115,22,0.35); }
        .pf-browse-btn:hover { background:#ea6c0a; transform:translateY(-1px); }
      `}</style>

      <div className="pf">

        {/* Hero */}
        <div className="pf-hero">
          <div className="pf-hero-grid"/><div className="pf-hero-g1"/><div className="pf-hero-g2"/>
          <div className="pf-hero-in">
            <div className="pf-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
            <div className="pf-hero-info">
              <div className="pf-hero-lbl">My Account</div>
              <div className="pf-hero-name">{user?.name}</div>
              <div className="pf-hero-email">{user?.email}</div>
              <span className={`pf-role ${user?.role==='admin'?'pf-role-admin':'pf-role-user'}`}>
                <Shield size={10}/> {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="pf-stats">
          <div className="pf-stats-in">
            <div>
              <div className="pf-stat-n">{loadingCourses ? "—" : courses.length}</div>
              <div className="pf-stat-l">Enrolled Courses</div>
            </div>
            <div>
              <div className="pf-stat-n">{user?.role === "admin" ? "Admin" : "Student"}</div>
              <div className="pf-stat-l">Account Type</div>
            </div>
            <div>
              <div className="pf-stat-n">Active</div>
              <div className="pf-stat-l">Account Status</div>
            </div>
          </div>
        </div>

        <div className="pf-body">

          {/* User info card */}
          <div className="pf-card">
            <div className="pf-card-hd">
              <div className="pf-card-hd-ic"><User size={16}/></div>
              <div>
                <div className="pf-card-hd-title">User Profile</div>
                <div className="pf-card-hd-sub">Personal details and account info</div>
              </div>
            </div>
            <div className="pf-row">
              <span className="pf-row-key"><User size={13} style={{color:"rgba(255,255,255,0.25)"}}/>Full Name</span>
              <span className="pf-row-val">{user?.name}</span>
            </div>
            <div className="pf-row">
              <span className="pf-row-key"><Mail size={13} style={{color:"rgba(255,255,255,0.25)"}}/>Email Address</span>
              <span className="pf-row-val">{user?.email}</span>
            </div>
            <div className="pf-row">
              <span className="pf-row-key"><Shield size={13} style={{color:"rgba(255,255,255,0.25)"}}/>Role</span>
              <span className={`pf-role ${user?.role==='admin'?'pf-role-admin':'pf-role-user'}`}>{user?.role}</span>
            </div>
          </div>

          {/* Enrolled courses card */}
          <div className="pf-card">
            <div className="pf-card-hd">
              <div className="pf-card-hd-ic"><BookOpen size={16}/></div>
              <div>
                <div className="pf-card-hd-title">My Courses</div>
                <div className="pf-card-hd-sub">Courses you are enrolled in</div>
              </div>
            </div>

            {loadingCourses ? (
              <div className="pf-loading">Loading your courses...</div>
            ) : courses.length === 0 ? (
              <div className="pf-empty">
                <div>You haven't enrolled in any courses yet.</div>
                <div className="pf-empty-hint">Browse our catalogue and start learning today.</div>
                <Link to="/courses" className="pf-browse-btn">Browse Courses <ArrowRight size={13}/></Link>
              </div>
            ) : (
              <div className="pf-courses-wrap">
                <div className="pf-courses-grid">
                  {courses.map(enroll => (
                    <div className="pf-crs-card" key={enroll._id}>
                      <div className="pf-crs-top">
                        <div className="pf-crs-ic"><BookOpen size={16}/></div>
                        <div className="pf-crs-title">{enroll.course?.title}</div>
                      </div>
                      <div className="pf-crs-desc">{enroll.course?.description}</div>
                      <div className="pf-crs-footer">
                        <div className="pf-crs-date">
                          <Calendar size={10}/>
                          {new Date(enroll.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
                        </div>
                        {enroll.course?.category && (
                          <span className="pf-crs-badge">{enroll.course.category}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};
export default Profile;