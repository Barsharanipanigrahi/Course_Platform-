import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { BookOpen, User, Mail, Shield, Calendar } from "lucide-react";

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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        .pf{font-family:'DM Sans',sans-serif;min-height:100vh;background:#fffbeb;padding:3rem 1.5rem;}
        .pf-in{max-width:900px;margin:0 auto;display:flex;flex-direction:column;gap:1.4rem;}

        .pf-banner{background:#18181b;border-radius:18px;padding:2.5rem;display:flex;align-items:center;gap:1.8rem;position:relative;overflow:hidden;}
        .pf-banner-bg{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(245,158,11,0.06) 1px,transparent 1px);background-size:22px 22px;}
        .pf-banner-glow{position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.1),transparent 65%);right:-60px;top:-60px;}
        .pf-avatar{position:relative;z-index:1;width:72px;height:72px;border-radius:50%;background:#f59e0b;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:2rem;font-weight:800;color:#18181b;flex-shrink:0;border:3px solid rgba(245,158,11,0.3);}
        .pf-banner-info{position:relative;z-index:1;}
        .pf-banner-name{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:800;color:#fafafa;margin-bottom:4px;}
        .pf-banner-email{font-size:0.88rem;color:rgba(250,250,250,0.5);margin-bottom:8px;}
        .pf-role{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:100px;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;}
        .pf-role-admin{background:rgba(239,68,68,0.15);color:#fca5a5;border:1px solid rgba(239,68,68,0.25);}
        .pf-role-user{background:rgba(245,158,11,0.15);color:#fcd34d;border:1px solid rgba(245,158,11,0.25);}

        .pf-card{background:#fff;border:1px solid rgba(252,211,77,0.4);border-radius:16px;overflow:hidden;box-shadow:0 2px 14px rgba(0,0,0,0.05);}
        .pf-card-hd{padding:1.3rem 1.6rem;border-bottom:1px solid rgba(252,211,77,0.3);display:flex;align-items:center;gap:10px;}
        .pf-card-hd-ic{width:34px;height:34px;background:#fef3c7;border-radius:9px;display:flex;align-items:center;justify-content:center;color:#d97706;}
        .pf-card-hd-title{font-weight:700;font-size:0.97rem;color:#18181b;}
        .pf-card-hd-sub{font-size:0.8rem;color:#6b7280;}

        .pf-row{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.6rem;border-bottom:1px solid rgba(252,211,77,0.2);}
        .pf-row:last-child{border-bottom:none;}
        .pf-row:nth-child(even){background:#fffbeb;}
        .pf-row-key{font-size:0.85rem;color:#6b7280;font-weight:500;display:flex;align-items:center;gap:8px;}
        .pf-row-key-ic{color:#d1d5db;}
        .pf-row-val{font-size:0.85rem;font-weight:600;color:#18181b;}

        .pf-courses-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;padding:1.4rem 1.6rem;}
        @media(max-width:640px){.pf-courses-grid{grid-template-columns:1fr;}}
        .pf-empty{padding:2rem 1.6rem;color:#6b7280;font-size:0.9rem;}
        .pf-loading{padding:2rem 1.6rem;color:#6b7280;font-size:0.9rem;}

        .pf-crs-card{border:1px solid rgba(252,211,77,0.4);border-radius:12px;padding:1.1rem;transition:transform 0.2s,box-shadow 0.2s,border-color 0.2s;}
        .pf-crs-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,0.07);border-color:rgba(245,158,11,0.4);}
        .pf-crs-title{font-weight:700;font-size:0.92rem;color:#18181b;margin-bottom:4px;}
        .pf-crs-desc{font-size:0.8rem;color:#6b7280;line-height:1.55;margin-bottom:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
        .pf-crs-date{font-size:0.73rem;color:#d1d5db;display:flex;align-items:center;gap:4px;}
      `}</style>

      <div className="pf">
        <div className="pf-in">
          <div className="pf-banner">
            <div className="pf-banner-bg"/><div className="pf-banner-glow"/>
            <div className="pf-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
            <div className="pf-banner-info">
              <div className="pf-banner-name">{user?.name}</div>
              <div className="pf-banner-email">{user?.email}</div>
              <span className={`pf-role ${user?.role==='admin'?'pf-role-admin':'pf-role-user'}`}>
                <Shield size={10}/> {user?.role}
              </span>
            </div>
          </div>

          <div className="pf-card">
            <div className="pf-card-hd">
              <div className="pf-card-hd-ic"><User size={16}/></div>
              <div><div className="pf-card-hd-title">User Profile</div><div className="pf-card-hd-sub">Personal details and account info</div></div>
            </div>
            <div className="pf-row"><span className="pf-row-key"><User size={13} className="pf-row-key-ic"/>Full Name</span><span className="pf-row-val">{user?.name}</span></div>
            <div className="pf-row"><span className="pf-row-key"><Mail size={13} className="pf-row-key-ic"/>Email</span><span className="pf-row-val">{user?.email}</span></div>
            <div className="pf-row"><span className="pf-row-key"><Shield size={13} className="pf-row-key-ic"/>Role</span><span className={`pf-role ${user?.role==='admin'?'pf-role-admin':'pf-role-user'}`}>{user?.role}</span></div>
          </div>

          <div className="pf-card">
            <div className="pf-card-hd">
              <div className="pf-card-hd-ic"><BookOpen size={16}/></div>
              <div><div className="pf-card-hd-title">My Courses</div><div className="pf-card-hd-sub">Courses you are enrolled in</div></div>
            </div>
            {loadingCourses ? (
              <div className="pf-loading">Loading courses...</div>
            ) : courses.length === 0 ? (
              <div className="pf-empty">You have not enrolled in any courses yet.</div>
            ) : (
              <div className="pf-courses-grid">
                {courses.map(enroll => (
                  <div className="pf-crs-card" key={enroll._id}>
                    <div className="pf-crs-title">{enroll.course?.title}</div>
                    <div className="pf-crs-desc">{enroll.course?.description}</div>
                    <div className="pf-crs-date"><Calendar size={10}/>Enrolled {new Date(enroll.createdAt).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;