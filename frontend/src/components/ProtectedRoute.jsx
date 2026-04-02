import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const roleHierarchy = {
  Viewer: 1,
  Analyst: 2,
  Admin: 3
};

export default function ProtectedRoute({ roles = [] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">Loading session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.some((role) => roleHierarchy[user.role] >= roleHierarchy[role])) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}