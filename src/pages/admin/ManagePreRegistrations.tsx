import React from 'react';
import { GraduationCap } from 'lucide-react';

const ManagePreRegistrations: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 flex items-center">
        <GraduationCap className="w-8 h-8 mr-3 text-ucao-blue" />
        Gestion des Pré-inscriptions
      </h1>
      <p className="text-gray-600 mt-2">
        Cette section permettra de visualiser, traiter et gérer tous les dossiers de pré-inscription.
      </p>
      <div className="mt-8 p-8 bg-gray-200 rounded-lg text-center text-gray-500">
        Contenu à venir...
      </div>
    </div>
  );
};

export default ManagePreRegistrations;
