import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Admission from './pages/public/Admission';
import Profile from './pages/user/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';

// Route Guards
import ProtectedRoute from './route/ProtectedRoute';
import PublicRoute from './route/PublicRoute';
import Course from './pages/public/Course';
import Contact from './pages/public/Contact';

import Mycourses from './pages/user/Mycourses';
import AdminContacts from './pages/admin/AdminContacts';
import AdminCourses from './pages/admin/AdminCourses';
import AdminAdmission from './pages/admin/AdminAdmission';


function App() {
  return (
    <Routes>
      {/* Public Routes with Main Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="admission" element={<Admission />} />
        <Route path="contact" element={<Contact />} />
        <Route path="course" element={<Course />} />
        <Route path="courses" element={<Course />} />
        {/* Only accessible if NOT logged in */}
        <Route 
          path="login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />

        <Route 
          path="register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />
        
        {/* Only accessible if logged in */}
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

<Route 
          path="mycourses" 
          element={
            <ProtectedRoute>
              <Mycourses/>
            </ProtectedRoute>
          } 
        />
      </Route>
      <Route
  path="admission"
  element={
    <ProtectedRoute>
      <Admission />
    </ProtectedRoute>
  }
/>
      

      {/* Admin Routes with Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path='course' element={<AdminCourses />} />
        <Route path='contact' element={<AdminContacts />} />
        <Route path='admission' element={<AdminAdmission />} />
        
       

      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;