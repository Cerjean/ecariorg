import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Check, X } from 'lucide-react';

interface Application {
  id: string;
  name: string;
  program: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
}

interface RecentApplicationsTableProps {
  applications: Application[];
}

const StatusBadge = ({ status }: { status: Application['status'] }) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-medium rounded-full inline-block";
  switch (status) {
    case 'approved':
      return <span className={`${baseClasses} bg-green-100 text-green-800`}>Approuvé</span>;
    case 'rejected':
      return <span className={`${baseClasses} bg-red-100 text-red-800`}>Rejeté</span>;
    case 'pending':
    default:
      return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>En attente</span>;
  }
};

const RecentApplicationsTable: React.FC<RecentApplicationsTableProps> = ({ applications }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-md h-full"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Derniers dossiers de pré-inscription</h3>
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="border-b border-gray-100 pb-3 last:border-b-0">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">{app.name}</p>
                <p className="text-sm text-gray-500">{app.program}</p>
              </div>
              <StatusBadge status={app.status} />
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-400">{app.date.toLocaleDateString('fr-FR')}</p>
              <div className="flex space-x-2">
                <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors"><Eye className="w-4 h-4" /></button>
                <button className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-100 rounded-full transition-colors"><Check className="w-4 h-4" /></button>
                <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"><X className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentApplicationsTable;
