import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { universityUnits, faculties, programs } from '../../data/universityUnits';
import { BookOpen, ChevronRight, GraduationCap } from 'lucide-react';

interface UniversityUnitDetailsProps {
  selectedUnitId: string;
}

const UniversityUnitDetails: React.FC<UniversityUnitDetailsProps> = ({ selectedUnitId }) => {
  const unit = universityUnits.find(u => u.id === selectedUnitId);
  const unitFaculties = faculties.filter(f => f.university_unit_id === selectedUnitId);

  if (!unit) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <p className="text-gray-600">Veuillez sélectionner une unité universitaire pour voir les détails.</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={unit.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        {/* Description de l'unité */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-ucao-blue mb-4">{unit.name}</h2>
          <p className="text-gray-600 leading-relaxed">{unit.description}</p>
        </div>

        {/* Facultés et filières */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Facultés et filières</h3>
          
          {unitFaculties.length > 0 ? (
            <div className="space-y-6">
              {unitFaculties.map(faculty => {
                const facultyPrograms = programs.filter(p => p.faculty_id === faculty.id);
                return (
                  <div key={faculty.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 flex items-center">
                      <BookOpen className="w-6 h-6 mr-3 text-ucao-blue" />
                      <h4 className="text-lg font-semibold text-gray-700">{faculty.name}</h4>
                    </div>
                    {facultyPrograms.length > 0 ? (
                      <ul className="p-4 space-y-3">
                        {facultyPrograms.map(program => (
                          <li key={program.id} className="flex items-start">
                            <GraduationCap className="w-5 h-5 mr-3 mt-1 text-ucao-yellow flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">{program.name}</p>
                              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{program.level}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="p-4 text-sm text-gray-500">Aucune filière disponible pour cette faculté.</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              Aucune faculté n'est actuellement listée pour cette unité universitaire.
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UniversityUnitDetails;
