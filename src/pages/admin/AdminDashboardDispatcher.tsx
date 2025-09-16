import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import { Navigate } from 'react-router-dom';

const AdminDashboardDispatcher: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/admin/connexion" />;
  }
  
  // For now, all admin roles see the same dashboard.
  // This can be expanded later to show different dashboards.
  switch (user.role) {
    case 'super_admin':
    case 'admin_ucao':
    case 'admin_uu':
      return <AdminDashboard />;
    default:
      // If a user with a non-admin role somehow gets here, redirect them.
      return <Navigate to="/" />;
  }
};

export default AdminDashboardDispatcher;
