import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

const NAV_LINKS = [
  { to: '/',        label: 'Home'    },
  { to: '/about',   label: 'About'   },
  { to: '/course',  label: 'Courses' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        .nb{font-family:'DM Sans',sans-serif;position:sticky;top:0;z-index:1000;background:#0f2027;border-bottom:1px solid rgba(45,212,191,0.1);transition:box-shadow 0.3s;}
        .nb.sc{box-shadow:0 4px 24px rgba(0,0,0,0.5);}
        .nb-in{max-width:1200px;margin:0 auto;padding:0 1.5rem;height:64px;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;}
        .nb-logo{display:flex;align-items:center;gap:8px;text-decoration:none;flex-shrink:0;}
        .nb-logo img{height:40px;width:auto;}
        .nb-logo-txt{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:800;color:#fff;letter-spacing:-0.01em;}
        .nb-logo-txt span{color:#f97316;}
        .nb-links{display:flex;align-items:center;gap:2px;}
        .nb-lnk{position:relative;padding:6px 13px;border-radius:7px;font-size:0.87rem;font-weight:500;text-decoration:none;color:rgba(255,255,255,0.55);transition:color 0.2s,background 0.2s;}
        .nb-lnk:hover{color:#fff;background:rgba(255,255,255,0.07);}
        .nb-lnk.on{color:#fff;background:rgba(249,115,22,0.18);font-weight:600;}
        .nb-lnk.on::after{content:'';position:absolute;bottom:3px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:#f97316;}
        .nb-acts{display:flex;align-items:center;gap:7px;flex-shrink:0;}
        .nb-chip{display:flex;align-items:center;gap:7px;padding:3px 9px 3px 3px;background:rgba(249,115,22,0.12);border-radius:100px;border:1px solid rgba(249,115,22,0.22);}
        .nb-av{width:28px;height:28px;border-radius:50%;background:#f97316;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:700;color:#fff;flex-shrink:0;}
        .nb-uname{font-size:0.8rem;font-weight:600;color:#fff;max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
        .nb-ghost{padding:6px 13px;border-radius:7px;font-size:0.84rem;font-weight:500;text-decoration:none;background:transparent;color:rgba(255,255,255,0.65);border:none;cursor:pointer;transition:color 0.2s,background 0.2s;font-family:'DM Sans',sans-serif;}
        .nb-ghost:hover{color:#fff;background:rgba(255,255,255,0.07);}
        .nb-ghost.on{color:#fff;background:rgba(249,115,22,0.18);}
        .nb-admin{padding:4px 11px;border-radius:100px;font-size:0.72rem;font-weight:700;text-decoration:none;background:rgba(45,212,191,0.12);color:#2dd4bf;border:1px solid rgba(45,212,191,0.25);transition:background 0.2s;font-family:'DM Sans',sans-serif;}
        .nb-admin:hover{background:rgba(45,212,191,0.22);}
        .nb-admin.on{background:#0d9488;color:#fff;border-color:#0d9488;}
        .nb-logout{padding:6px 13px;border-radius:7px;font-size:0.84rem;font-weight:500;background:transparent;color:rgba(220,100,100,0.8);border:1px solid rgba(220,100,100,0.2);cursor:pointer;transition:background 0.2s,color 0.2s;font-family:'DM Sans',sans-serif;}
        .nb-logout:hover{background:rgba(220,80,80,0.1);color:#f87171;}
        .nb-login{padding:6px 13px;border-radius:7px;font-size:0.84rem;font-weight:500;text-decoration:none;color:rgba(255,255,255,0.65);transition:color 0.2s,background 0.2s;}
        .nb-login:hover{color:#fff;background:rgba(255,255,255,0.07);}
        .nb-reg{padding:7px 17px;border-radius:8px;font-size:0.84rem;font-weight:700;text-decoration:none;background:#f97316;color:#fff;transition:background 0.2s,transform 0.15s;box-shadow:0 3px 12px rgba(249,115,22,0.4);}
        .nb-reg:hover{background:#ea6c0a;transform:translateY(-1px);}
        @media(max-width:768px){.nb-links{display:none;}.nb-uname{display:none;}}
      `}</style>
      <nav className={`nb${scrolled ? ' sc' : ''}`}>
        <div className="nb-in">
        <Link to="/" className="text-xl font-bold">
  <span className="text-white">Learn</span>
  <span className="text-yellow-500">ify</span>
</Link>
          <div className="nb-links">
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className={`nb-lnk${isActive(to) ? ' on' : ''}`}>{label}</Link>
            ))}
          </div>
          <div className="nb-acts">
            {user ? (
              <>
                <div className="nb-chip">
                  <div className="nb-av">{user.name?.charAt(0).toUpperCase()}</div>
                  <span className="nb-uname">{user.name}</span>
                </div>
                <Link to="/profile" className={`nb-ghost${isActive('/profile') ? ' on' : ''}`}>Profile</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className={`nb-admin${isActive('/admin') ? ' on' : ''}`}>Admin</Link>
                )}
                <button onClick={logout} className="nb-logout">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nb-login">Login</Link>
                <Link to="/register" className="nb-reg">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;