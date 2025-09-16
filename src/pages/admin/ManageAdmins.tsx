import React from 'react';
import { Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ManageAdmins: React.FC = () => {
  const { user } = useAuth();

  if (user && user.role !== 'super_admin') {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 flex items-center">
        <Shield className="w-8 h-8 mr-3 text-ucao-blue" />
        Gestion des Administrateurs
      </h1>
      <p className="text-gray-600 mt-2">
        Créez, modifiez et supprimez les comptes administrateurs.
      </p>
      <div className="mt-8 p-8 bg-gray-200 rounded-lg text-center text-gray-500">
        Contenu à venir...
      </div>
    </div>
  );
};

export default ManageAdmins;
