import React from 'react';
import { User } from 'lucide-react';

const ManageProfessors: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 flex items-center">
        <User className="w-8 h-8 mr-3 text-ucao-blue" />
        Gestion des Professeurs
      </h1>
      <p className="text-gray-600 mt-2">
        Cette section permettra de gérer la base de données des professeurs.
      </p>
      <div className="mt-8 p-8 bg-gray-200 rounded-lg text-center text-gray-500">
        Contenu à venir...
      </div>
    </div>
  );
};

export default ManageProfessors;
