import React from 'react';
import { motion } from 'framer-motion';
import { universityUnits } from '../../data/universityUnits';

interface UniversityUnitSidebarProps {
  selectedUnitId: string;
  setSelectedUnitId: (id: string) => void;
}

const UniversityUnitSidebar: React.FC<UniversityUnitSidebarProps> = ({ selectedUnitId, setSelectedUnitId }) => {
  return (
    <nav className="bg-white p-4 rounded-lg shadow-md">
      <ul className="space-y-2">
        {universityUnits.map(unit => (
          <li key={unit.id}>
            <button
              onClick={() => setSelectedUnitId(unit.id)}
              className={`w-full text-left px-4 py-2.5 rounded-md text-sm transition-all duration-200 flex items-center justify-between ${
                selectedUnitId === unit.id
                  ? 'bg-ucao-blue text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-ucao-blue'
              }`}
            >
              <span>{unit.name}</span>
              {selectedUnitId === unit.id && (
                <motion.div
                  layoutId="active-unit-indicator"
                  className="w-2 h-2 bg-ucao-yellow rounded-full"
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UniversityUnitSidebar;
