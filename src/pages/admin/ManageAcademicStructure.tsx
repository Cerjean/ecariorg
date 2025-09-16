import React from 'react';
import { Building } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ManageAcademicStructure: React.FC = () => {
  const { user } = useAuth();

  if (user && user.role === 'admin_uu') {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 flex items-center">
        <Building className="w-8 h-8 mr-3 text-ucao-blue" />
        Gestion de la Structure Académique
      </h1>
      <p className="text-gray-600 mt-2">
        Gérez les unités universitaires, les facultés et les filières.
      </p>
      <div className="mt-8 p-8 bg-gray-200 rounded-lg text-center text-gray-500">
        Contenu à venir...
      </div>
    </div>
  );
};

export default ManageAcademicStructure;
