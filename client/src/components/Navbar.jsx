import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/course', label: 'Course' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img className="h-16 w-30" src={logo} alt="Logo" />
          </Link>

          {/* Nav Links */}
          <div className="flex items-center space-x-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive(to)
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                {label}
                {isActive(to) && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 mr-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-500 font-medium hidden sm:block">
                    {user.name}
                  </span>
                </div>

                <Link
                  to="/profile"
                  className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors duration-200 ${
                    isActive('/profile')
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  Profile
                </Link>

                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors duration-200 ${
                      isActive('/admin')
                        ? 'bg-violet-600 text-white'
                        : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                    }`}
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="text-sm font-medium text-red-500 border border-red-200 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors duration-200 ${
                    isActive('/login')
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;