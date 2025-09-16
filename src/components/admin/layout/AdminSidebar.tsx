import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  User,
  GraduationCap, 
  Building, 
  Library, 
  Settings, 
  Shield, 
  LogOut,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = "flex items-center px-4 py-2.5 text-gray-300 rounded-lg hover:bg-ucao-blue-dark hover:text-white transition-colors duration-200";
  const activeNavLinkClass = "bg-ucao-blue-dark text-white font-semibold";

  const menuItems = [
    { to: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, text: 'Tableau de bord', roles: ['super_admin', 'admin_ucao', 'admin_uu'] },
    { to: '/admin/pre-inscriptions', icon: <GraduationCap className="w-5 h-5" />, text: 'Pré-inscriptions', roles: ['super_admin', 'admin_ucao', 'admin_uu'] },
    { to: '/admin/etudiants', icon: <Users className="w-5 h-5" />, text: 'Étudiants', roles: ['super_admin', 'admin_ucao', 'admin_uu'] },
    { to: '/admin/professeurs', icon: <User className="w-5 h-5" />, text: 'Professeurs', roles: ['super_admin', 'admin_ucao', 'admin_uu'] },
    { to: '/admin/structure-academique', icon: <Building className="w-5 h-5" />, text: 'Structure Académique', roles: ['super_admin', 'admin_ucao'] },
    { to: '/admin/administrateurs', icon: <Shield className="w-5 h-5" />, text: 'Administrateurs', roles: ['super_admin'] },
    { to: '/admin/parametres', icon: <Settings className="w-5 h-5" />, text: 'Paramètres', roles: ['super_admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => user && item.roles.includes(user.role));

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}></div>
      <aside className={`flex flex-col w-64 bg-ucao-blue text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:relative h-full z-30`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-ucao-blue-dark">
          <span className="text-2xl font-bold text-white">ECARI <span className="text-ucao-yellow">Admin</span></span>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {filteredMenuItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span className="ml-3">{item.text}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-ucao-blue-dark">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2.5 text-gray-300 rounded-lg hover:bg-red-700 hover:text-white transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
