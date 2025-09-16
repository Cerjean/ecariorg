import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ucao-blue-dark text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-ucao-yellow">ECARI</h3>
            <p className="text-gray-300 text-sm">
              Plateforme de pré-inscription pour l'Université Catholique de l'Afrique de l'Ouest
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/pre-inscription" className="hover:text-ucao-yellow">Pré-inscription Étudiant</Link></li>
              <li><Link to="/inscription-professeur" className="hover:text-ucao-yellow">Inscription Professeur</Link></li>
              <li><Link to="/verification" className="hover:text-ucao-yellow">Vérification de statut</Link></li>
              <li><Link to="/connexion" className="hover:text-ucao-yellow">Espace personnel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-ucao-yellow" />
                <span>contact@ecari-ucao.org</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-ucao-yellow" />
                <span>+225 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-ucao-yellow" />
                <span>Abidjan, Côte d'Ivoire</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Informations légales</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <Link to="/mentions-legales" className="block hover:text-ucao-yellow">Mentions légales</Link>
              <Link to="/confidentialite" className="block hover:text-ucao-yellow">Confidentialité</Link>
              <Link to="/admin/connexion" className="block hover:text-ucao-yellow text-xs text-gray-400 mt-4">
                Administration
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 ECARI - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
