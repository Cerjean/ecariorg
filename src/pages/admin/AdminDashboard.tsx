import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { GraduationCap, Users, User, DollarSign } from 'lucide-react';
import StatsCard from '../../components/admin/dashboard/StatsCard';
import InscriptionChart from '../../components/admin/dashboard/InscriptionChart';
import RecentApplicationsTable from '../../components/admin/dashboard/RecentApplicationsTable';
import { getAdminStats, getInscriptionChartData, getRecentApplications } from '../../data/adminMockData';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const stats = getAdminStats();
  const chartData = getInscriptionChartData();
  const applications = getRecentApplications();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-600 mt-1">Bonjour {user?.firstName}, bienvenue sur votre espace d'administration.</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <StatsCard 
          title="Nouveaux Dossiers" 
          value={stats.newApplications.value.toString()} 
          change={stats.newApplications.change}
          icon={<GraduationCap className="w-8 h-8 text-white" />}
          color="bg-blue-500"
        />
        <StatsCard 
          title="Étudiants Inscrits" 
          value={stats.totalStudents.value.toString()} 
          change={stats.totalStudents.change}
          icon={<Users className="w-8 h-8 text-white" />}
          color="bg-green-500"
        />
        <StatsCard 
          title="Professeurs" 
          value={stats.totalProfessors.value.toString()} 
          change={stats.totalProfessors.change}
          icon={<User className="w-8 h-8 text-white" />}
          color="bg-yellow-500"
        />
        <StatsCard 
          title="Frais Collectés (FCFA)" 
          value={stats.collectedFees.value.toLocaleString()} 
          change={stats.collectedFees.change}
          icon={<DollarSign className="w-8 h-8 text-white" />}
          color="bg-indigo-500"
        />
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <InscriptionChart data={chartData.data} labels={chartData.labels} />
        </div>
        <div className="lg:col-span-1">
          <RecentApplicationsTable applications={applications} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
