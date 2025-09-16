import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Clock, XCircle, Mail, FileText } from 'lucide-react';

interface RegistrationStatus {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: 'pending' | 'approved' | 'rejected' | 'payment_pending';
  submissionDate: string;
  university: string;
  program: string;
}

const StatusCheck: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<RegistrationStatus | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setError('Veuillez saisir votre adresse email ou numéro de référence');
      return;
    }

    setIsSearching(true);
    setError('');
    setSearchResult(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResult: RegistrationStatus = {
        id: 'REF-2025-001234',
        email: searchQuery,
        firstName: 'Jean',
        lastName: 'Dupont',
        status: 'pending',
        submissionDate: '2025-01-15',
        university: 'Unité Universitaire à Abidjan',
        program: 'Licence en Économie'
      };
      
      setSearchResult(mockResult);
    } catch (error) {
      setError('Aucune pré-inscription trouvée avec ces informations');
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock className="w-6 h-6" />,
          text: 'En cours de traitement',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      case 'approved':
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          text: 'Approuvée',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'rejected':
        return {
          icon: <XCircle className="w-6 h-6" />,
          text: 'Rejetée',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      case 'payment_pending':
        return {
          icon: <Clock className="w-6 h-6" />,
          text: 'En attente de paiement',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200'
        };
      default:
        return {
          icon: <Clock className="w-6 h-6" />,
          text: 'Statut inconnu',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Vérifier le statut de ma pré-inscription
        </h1>
        <p className="text-gray-600 mt-2">
          Saisissez votre adresse email ou numéro de référence pour consulter l'état de votre dossier.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <form onSubmit={handleSearch} className="space-y-6">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse email ou numéro de référence
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow focus:border-ucao-yellow"
                placeholder="exemple@email.com ou REF-2025-001234"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="w-full bg-ucao-blue hover:bg-ucao-blue-dark disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {isSearching ? 'Recherche en cours...' : 'Vérifier mon statut'}
          </button>
        </form>
      </motion.div>

      {searchResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Résultat de la recherche
          </h2>

          <div className="space-y-6">
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${getStatusInfo(searchResult.status).bgColor} ${getStatusInfo(searchResult.status).borderColor} border`}>
              <span className={getStatusInfo(searchResult.status).color}>
                {getStatusInfo(searchResult.status).icon}
              </span>
              <span className={`ml-2 font-medium ${getStatusInfo(searchResult.status).color}`}>
                {getStatusInfo(searchResult.status).text}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Informations candidat</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Nom complet:</span> {searchResult.firstName} {searchResult.lastName}</p>
                  <p><span className="font-medium">Email:</span> {searchResult.email}</p>
                  <p><span className="font-medium">Référence:</span> {searchResult.id}</p>
                  <p><span className="font-medium">Date de soumission:</span> {new Date(searchResult.submissionDate).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Formation demandée</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Université:</span> {searchResult.university}</p>
                  <p><span className="font-medium">Programme:</span> {searchResult.program}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              {searchResult.status === 'pending' && (
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">Dossier en cours de traitement</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Votre dossier est actuellement examiné par nos équipes. Vous recevrez une notification par email dès qu'une décision sera prise.
                    </p>
                  </div>
                </div>
              )}

              {searchResult.status === 'payment_pending' && (
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-orange-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">Paiement requis</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Votre dossier a été pré-validé. Veuillez effectuer le paiement pour finaliser votre inscription.
                    </p>
                    <button className="mt-2 bg-ucao-yellow hover:bg-ucao-yellow-dark text-ucao-blue-dark px-4 py-2 rounded text-sm transition-colors">
                      Effectuer le paiement
                    </button>
                  </div>
                </div>
              )}

              {searchResult.status === 'approved' && (
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">Félicitations ! Votre pré-inscription a été approuvée</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Vous recevrez bientôt les instructions pour finaliser votre inscription définitive.
                    </p>
                  </div>
                </div>
              )}

              {searchResult.status === 'rejected' && (
                <div className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">Dossier non retenu</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Votre dossier n'a pas été retenu pour cette session. Vous pouvez nous contacter pour plus d'informations.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 bg-ucao-blue hover:bg-ucao-blue-dark text-white rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Accéder à mon espace
              </Link>
              
              <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="w-5 h-5 mr-2" />
                Télécharger le dossier
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="mt-8 text-center">
        <div className="bg-ucao-blue-light rounded-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-2">Besoin d'aide ?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Si vous ne trouvez pas votre dossier ou si vous rencontrez des difficultés, 
            notre équipe support est là pour vous aider.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@ecari-ucao.org"
              className="inline-flex items-center justify-center px-4 py-2 bg-ucao-blue hover:bg-ucao-blue-dark text-white rounded text-sm transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contacter le support
            </a>
            <Link
              to="/pre-inscription"
              className="inline-flex items-center justify-center px-4 py-2 border border-ucao-blue text-ucao-blue hover:bg-ucao-blue/10 rounded text-sm transition-colors"
            >
              Nouvelle pré-inscription
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCheck;
