import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, BookOpen, MessageSquare, Users, LogOut, GraduationCap, Tag, ClipboardList } from 'lucide-react';

const SIDEBAR_LINKS = [
  { to: '/admin',             label: 'Dashboard',   icon: <LayoutDashboard size={17}/> },
  { to: '/admin/course',      label: 'Courses',     icon: <BookOpen size={17}/>        },
  { to: '/admin/categories',  label: 'Categories',  icon: <Tag size={17}/>             },
  { to: '/admin/enrollments', label: 'Enrollments', icon: <ClipboardList size={17}/>   },
  { to: '/admin/users',       label: 'Users',       icon: <Users size={17}/>           },
  
];

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const isActive = (path) =>
    path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(path);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=DM+Sans:wght@400;500;600;700&display=swap');
        .sb{width:240px;min-height:100vh;background:#18181b;display:flex;flex-direction:column;flex-shrink:0;position:relative;overflow:hidden;border-right:1px solid rgba(245,158,11,0.1);}
        .sb-bg{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(245,158,11,0.04) 1px,transparent 1px);background-size:20px 20px;pointer-events:none;}
        .sb-top{padding:1.5rem 1.3rem 1.2rem;border-bottom:1px solid rgba(245,158,11,0.1);position:relative;z-index:1;}
        .sb-logo{display:flex;align-items:center;gap:9px;text-decoration:none;}
        .sb-logo:hover .sb-logo-txt{color:#f59e0b;}
        .sb-logo-ic{width:34px;height:34px;background:#f59e0b;border-radius:9px;display:flex;align-items:center;justify-content:center;color:#18181b;flex-shrink:0;}
        .sb-logo-txt{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:800;color:#fafafa;line-height:1.1;transition:color 0.2s;}
        .sb-logo-sub{font-size:0.68rem;color:rgba(250,250,250,0.4);font-weight:500;margin-top:1px;}
        .sb-nav{flex:1;padding:1rem 0.8rem;display:flex;flex-direction:column;gap:3px;position:relative;z-index:1;}
        .sb-nav-lbl{font-size:0.63rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(245,158,11,0.35);padding:0 0.6rem;margin-bottom:4px;margin-top:8px;}
        .sb-link{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;text-decoration:none;font-size:0.86rem;font-weight:500;color:rgba(250,250,250,0.5);transition:color 0.2s,background 0.2s;}
        .sb-link:hover{color:#fafafa;background:rgba(250,250,250,0.06);}
        .sb-link.on{color:#fafafa;background:rgba(245,158,11,0.15);font-weight:600;}
        .sb-link.on .sb-link-ic{color:#f59e0b;}
        .sb-link-ic{display:flex;align-items:center;flex-shrink:0;}
        .sb-msg-link{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-radius:9px;text-decoration:none;font-size:0.86rem;font-weight:500;color:rgba(250,250,250,0.5);transition:color 0.2s,background 0.2s;margin-top:2px;}
        .sb-msg-link:hover{color:#fafafa;background:rgba(250,250,250,0.06);}
        .sb-msg-link.on{color:#fafafa;background:rgba(245,158,11,0.15);font-weight:600;}
        .sb-msg-link.on .sb-link-ic{color:#f59e0b;}
        .sb-msg-link.on .sb-msg-badge{background:#f59e0b;color:#18181b;}
        .sb-msg-left{display:flex;align-items:center;gap:10px;}
        .sb-msg-badge{display:inline-flex;align-items:center;justify-content:center;padding:2px 8px;border-radius:100px;font-size:0.6rem;font-weight:800;letter-spacing:0.04em;text-transform:uppercase;background:rgba(249,115,22,0.18);color:#f97316;border:1px solid rgba(249,115,22,0.25);transition:background 0.2s,color 0.2s;}
        .sb-divider{height:1px;background:rgba(245,158,11,0.08);margin:0.5rem 0;}
        .sb-back{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;text-decoration:none;font-size:0.84rem;font-weight:500;color:rgba(250,250,250,0.35);transition:color 0.2s,background 0.2s;}
        .sb-back:hover{color:rgba(250,250,250,0.7);background:rgba(250,250,250,0.04);}
        .sb-foot{padding:0.8rem;border-top:1px solid rgba(245,158,11,0.08);position:relative;z-index:1;}
        .sb-logout{width:100%;display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:9px;background:transparent;border:1px solid rgba(220,100,100,0.2);color:rgba(220,100,100,0.75);font-size:0.84rem;font-weight:600;cursor:pointer;transition:background 0.2s,color 0.2s;font-family:'DM Sans',sans-serif;}
        .sb-logout:hover{background:rgba(220,80,80,0.1);color:#f87171;}
      `}</style>

      <div className="sb">
        <div className="sb-bg"/>
        <div className="sb-top">
          <Link to="/" className="sb-logo">
            <div className="sb-logo-ic"><GraduationCap size={18}/></div>
            <div><div className="sb-logo-txt">Learnify</div><div className="sb-logo-sub">Admin Panel</div></div>
          </Link>
        </div>

        <nav className="sb-nav">
          <div className="sb-nav-lbl">Management</div>

          {SIDEBAR_LINKS.map(({ to, label, icon }) => (
            <Link key={to} to={to} className={`sb-link${isActive(to) ? ' on' : ''}`}>
              <span className="sb-link-ic">{icon}</span>{label}
            </Link>
          ))}

          <div className="sb-nav-lbl" style={{ marginTop: 12 }}>Communication</div>
          <Link
            to="/admin/contact"
            className={`sb-msg-link${isActive('/admin/contact') ? ' on' : ''}`}
          >
            <span className="sb-msg-left">
              <span className="sb-link-ic"><MessageSquare size={17}/></span>
              Messages
            </span>
            <span className="sb-msg-badge">New</span>
          </Link>

          <div className="sb-divider"/>
        </nav>

        <div className="sb-foot">
          <button onClick={logout} className="sb-logout"><LogOut size={15}/>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;