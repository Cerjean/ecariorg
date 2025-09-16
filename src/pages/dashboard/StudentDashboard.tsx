import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FilePlus, BookOpen, DollarSign, User, CalendarOff } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  const isPreRegistrationOpen = () => {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-11 (Jan-Dec)
    // Période de pré-inscription: du 1er août (mois 7) au 31 octobre (mois 9)
    return currentMonth >= 7 && currentMonth <= 9;
  };

  const preRegistrationOpen = isPreRegistrationOpen();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Bienvenue, {user?.firstName}
        </h1>
        <p className="text-gray-600 mb-8">
          Votre espace personnel étudiant.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card for new pre-registration */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            {preRegistrationOpen ? (
              <FilePlus className="w-6 h-6 mr-3 text-ucao-blue" />
            ) : (
              <CalendarOff className="w-6 h-6 mr-3 text-gray-400" />
            )}
            Nouvelle Pré-inscription
          </h2>
          {preRegistrationOpen ? (
            <>
              <p className="text-gray-600 mb-4">
                Démarrez une nouvelle procédure de pré-inscription pour la prochaine année académique.
              </p>
              <Link
                to="/pre-inscription"
                className="inline-flex items-center justify-center px-4 py-2 bg-ucao-blue hover:bg-ucao-blue-dark text-white rounded-md transition-colors"
              >
                Commencer
              </Link>
            </>
          ) : (
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">
                Les pré-inscriptions sont actuellement fermées. Elles sont généralement ouvertes d'août à octobre.
              </p>
            </div>
          )}
        </motion.div>

        {/* Placeholder cards */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-ucao-blue" />
            Mes Notes
          </h2>
          <p className="text-gray-600">Consultez vos notes et résultats académiques. (Bientôt disponible)</p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="w-6 h-6 mr-3 text-ucao-blue" />
            Mes Paiements
          </h2>
          <p className="text-gray-600">Suivez l'état de vos paiements de scolarité. (Bientôt disponible)</p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="w-6 h-6 mr-3 text-ucao-blue" />
            Mon Profil
          </h2>
          <p className="text-gray-600">Mettez à jour vos informations personnelles. (Bientôt disponible)</p>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
