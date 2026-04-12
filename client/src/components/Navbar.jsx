import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React, { useState, useEffect } from 'react';
import { GraduationCap } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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
        .nb-logo-txt{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:800;color:#fff;letter-spacing:-0.01em;}
        .nb-logo-txt span{color:#f97316;}
.nb-logo-ic {
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(249, 115, 22, 0.4);
}

.nb-logo-ic svg {
  color: #111; 
}
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

        .nb-burger{display:none;flex-direction:column;justify-content:center;align-items:center;width:40px;height:40px;border:none;background:rgba(255,255,255,0.06);border-radius:8px;cursor:pointer;gap:5px;transition:background 0.2s;padding:0;flex-shrink:0;}
        .nb-burger:hover{background:rgba(255,255,255,0.12);}
        .nb-burger span{display:block;width:20px;height:2px;background:#fff;border-radius:2px;transition:transform 0.3s ease,opacity 0.3s ease,width 0.3s ease;}
        .nb-burger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
        .nb-burger.open span:nth-child(2){opacity:0;width:0;}
        .nb-burger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}

        .nb-drawer{position:fixed;top:64px;left:0;right:0;bottom:0;z-index:999;display:flex;flex-direction:column;background:#0d1b22;transform:translateX(100%);transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);overflow-y:auto;}
        .nb-drawer.open{transform:translateX(0);}

        .nb-backdrop{position:fixed;inset:0;top:64px;z-index:998;background:rgba(0,0,0,0.6);backdrop-filter:blur(3px);opacity:0;pointer-events:none;transition:opacity 0.3s;}
        .nb-backdrop.open{opacity:1;pointer-events:all;}

        .nb-drawer-body{padding:1.5rem 1.25rem;display:flex;flex-direction:column;gap:4px;flex:1;}
        .nb-m-lnk{display:flex;align-items:center;gap:12px;padding:13px 16px;border-radius:10px;font-size:0.95rem;font-weight:500;text-decoration:none;color:rgba(255,255,255,0.6);transition:background 0.2s,color 0.2s;}
        .nb-m-lnk:hover{color:#fff;background:rgba(255,255,255,0.06);}
        .nb-m-lnk.on{color:#fff;background:rgba(249,115,22,0.15);font-weight:600;}
        .nb-m-lnk .dot{width:6px;height:6px;border-radius:50%;background:#f97316;opacity:0;transition:opacity 0.2s;flex-shrink:0;}
        .nb-m-lnk.on .dot{opacity:1;}

        .nb-m-divider{height:1px;background:rgba(255,255,255,0.07);margin:8px 0;}

        .nb-m-user{padding:16px;margin:0 0 4px;background:rgba(249,115,22,0.08);border-radius:12px;border:1px solid rgba(249,115,22,0.15);display:flex;align-items:center;gap:12px;}
        .nb-m-av{width:38px;height:38px;border-radius:50%;background:#f97316;display:flex;align-items:center;justify-content:center;font-size:0.9rem;font-weight:700;color:#fff;flex-shrink:0;}
        .nb-m-uinfo{display:flex;flex-direction:column;gap:2px;min-width:0;}
        .nb-m-uname{font-size:0.9rem;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .nb-m-role{font-size:0.72rem;color:rgba(255,255,255,0.45);}

        .nb-m-footer{padding:1rem 1.25rem 2rem;display:flex;flex-direction:column;gap:8px;}
        .nb-m-logout{width:100%;padding:12px;border-radius:10px;font-size:0.9rem;font-weight:600;background:rgba(220,80,80,0.08);color:#f87171;border:1px solid rgba(220,80,80,0.2);cursor:pointer;font-family:'DM Sans',sans-serif;transition:background 0.2s;}
        .nb-m-logout:hover{background:rgba(220,80,80,0.15);}
        .nb-m-login{display:block;text-align:center;padding:12px;border-radius:10px;font-size:0.9rem;font-weight:600;text-decoration:none;color:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.1);transition:background 0.2s;}
        .nb-m-login:hover{background:rgba(255,255,255,0.06);color:#fff;}
        .nb-m-reg{display:block;text-align:center;padding:12px;border-radius:10px;font-size:0.9rem;font-weight:700;text-decoration:none;background:#f97316;color:#fff;box-shadow:0 4px 14px rgba(249,115,22,0.35);transition:background 0.2s;}
        .nb-m-reg:hover{background:#ea6c0a;}
        .nb-m-admin{display:block;text-align:center;padding:10px;border-radius:10px;font-size:0.82rem;font-weight:700;text-decoration:none;background:rgba(45,212,191,0.1);color:#2dd4bf;border:1px solid rgba(45,212,191,0.25);transition:background 0.2s;}
        .nb-m-admin:hover{background:rgba(45,212,191,0.18);}

        @media(max-width:768px){
          .nb-links{display:none;}
          .nb-acts{display:none;}
          .nb-burger{display:flex;}
        }
        @media(min-width:769px){
          .nb-drawer,.nb-backdrop{display:none!important;}
        }
      `}</style>

      <nav className={`nb${scrolled ? ' sc' : ''}`}>
        <div className="nb-in">
          <Link to="/" className="nb-logo">
          <div className ="nb-logo-ic"><GraduationCap size={18}/></div>
            <span className="nb-logo-txt">Learn<span>ify</span></span>
          </Link>

          <div className="nb-links">
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className={`nb-lnk${isActive(to) ? ' on' : ''}`}>
                {label}
              </Link>
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

          <button
            className={`nb-burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div
        className={`nb-backdrop${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`nb-drawer${menuOpen ? ' open' : ''}`}
        inert={!menuOpen || undefined}
      >
        <div className="nb-drawer-body">
          {user && (
            <>
              <div className="nb-m-user">
                <div className="nb-m-av">{user.name?.charAt(0).toUpperCase()}</div>
                <div className="nb-m-uinfo">
                  <span className="nb-m-uname">{user.name}</span>
                  <span className="nb-m-role">{user.role === 'admin' ? 'Administrator' : 'Student'}</span>
                </div>
              </div>
              <div className="nb-m-divider" />
            </>
          )}

          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className={`nb-m-lnk${isActive(to) ? ' on' : ''}`}>
              <span className="dot" />{label}
            </Link>
          ))}

          {user && (
            <>
              <div className="nb-m-divider" />
              <Link to="/profile" className={`nb-m-lnk${isActive('/profile') ? ' on' : ''}`}>
                <span className="dot" />Profile
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className={`nb-m-lnk${isActive('/admin') ? ' on' : ''}`}>
                  <span className="dot" />Admin Panel
                </Link>
              )}
            </>
          )}
        </div>

        <div className="nb-m-footer">
          {user ? (
            <button className="nb-m-logout" onClick={() => { logout(); setMenuOpen(false); }}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login"    className="nb-m-login">Login</Link>
              <Link to="/register" className="nb-m-reg">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;