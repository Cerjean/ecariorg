import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { University, Building2 } from 'lucide-react';
import UniversityUnitSidebar from '../components/UcaoPresentation/UniversityUnitSidebar';
import UniversityUnitDetails from '../components/UcaoPresentation/UniversityUnitDetails';
import { universityUnits } from '../data/universityUnits';

const UcaoPresentation: React.FC = () => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(universityUnits[0].id);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* En-tête de la page */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <University className="w-16 h-16 mx-auto text-ucao-blue mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">
            Découvrir l'UCAO
          </h1>
          <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
            Explorez nos unités universitaires, facultés et filières à travers l'Afrique de l'Ouest.
          </p>
        </motion.div>

        {/* Contenu principal avec barre latérale */}
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4 lg:w-1/5">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-ucao-blue" />
                Nos Unités
              </h2>
              <UniversityUnitSidebar
                selectedUnitId={selectedUnitId}
                setSelectedUnitId={setSelectedUnitId}
              />
            </div>
          </aside>

          <main className="flex-1">
            <UniversityUnitDetails
              selectedUnitId={selectedUnitId}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default UcaoPresentation;
