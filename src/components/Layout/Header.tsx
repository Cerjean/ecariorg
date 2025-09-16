import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, User, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-ucao-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <GraduationCap className="w-10 h-10 text-ucao-yellow" />
            <div>
              <h1 className="text-2xl font-bold">ECARI</h1>
              <p className="text-sm text-blue-200">Université Catholique de l'Afrique de l'Ouest</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-ucao-yellow transition-colors">
              Accueil
            </Link>
            <Link to="/presentation-ucao" className="hover:text-ucao-yellow transition-colors">
              Présentation UCAO
            </Link>
            <Link to="/pre-inscription" className="hover:text-ucao-yellow transition-colors">
              Pré-inscription
            </Link>
            <Link to="/verification" className="hover:text-ucao-yellow transition-colors">
              Vérifier statut
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="text-sm">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/connexion')}
                className="bg-ucao-yellow hover:bg-ucao-yellow-dark text-ucao-blue-dark font-bold px-6 py-2 rounded-md transition-colors flex items-center space-x-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Connexion</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
