import React, { useState } from 'react';
import { Search, Bell, Menu, User as UserIcon, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminHeaderProps {
  setSidebarOpen: (isOpen: boolean) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const getRoleName = (role: string) => {
    switch(role) {
      case 'super_admin': return 'Super Administrateur';
      case 'admin_ucao': return 'Admin UCAO';
      case 'admin_uu': return 'Admin Unité Universitaire';
      default: return 'Administrateur';
    }
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-gray-200">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative mx-4 lg:mx-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <input
            className="w-32 sm:w-64 form-input pl-10 pr-4 rounded-md focus:border-ucao-blue focus:ring focus:ring-ucao-blue/20"
            type="text"
            placeholder="Rechercher"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-ucao-blue focus:outline-none">
          <Bell className="w-6 h-6" />
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 relative z-10 block rounded-md focus:outline-none"
          >
            <div className="w-8 h-8 overflow-hidden rounded-full border-2 border-ucao-blue">
               <UserIcon className="w-full h-full text-gray-400 p-1" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-700">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-500">{user ? getRoleName(user.role) : ''}</p>
            </div>
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-20"
              >
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-ucao-blue hover:text-white">
                  <UserIcon className="w-4 h-4 mr-2" />
                  Mon Profil
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-ucao-blue hover:text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
