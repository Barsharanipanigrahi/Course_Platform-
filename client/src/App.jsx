import './App.css'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Profile from './pages/user/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCategories from './pages/admin/AdminCategories';
import AdminEnrollments from './pages/admin/AdminEnrollments';

// Route Guards
import ProtectedRoute from './route/ProtectedRoute';
import PublicRoute from './route/PublicRoute';
import Course from './pages/public/Course';
import Contact from './pages/public/Contact';
import AdminCourses from './pages/admin/AdminCourses';
import Mycourses from './pages/user/Mycourses';
import AdminContacts from './pages/admin/AdminContacts';
import CourseDetails from './components/home/CourseDetails';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReviews from './pages/admin/AdminReviews';

function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);

  return (
    <Routes>
      {/* Public Routes with Main Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="course" element={<Course />} />
        <Route path="courses" element={<Course />} />
        <Route path="course/:id" element={<CourseDetails />} />
        <Route path="contact" element={<Contact />} />

        <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />

        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="mycourses" element={<ProtectedRoute><Mycourses /></ProtectedRoute>} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="course" element={<AdminCourses />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="contact" element={<AdminContacts />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="enrollments" element={<AdminEnrollments />} />
        <Route path="reviews" element={<AdminReviews />} /> 
        
        
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;