import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 'admin') return <Navigate to="/" replace />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#111' }}>
      <Sidebar />
      {/* On mobile, Sidebar is fixed, so main content fills full width */}
      <div style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;