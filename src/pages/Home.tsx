import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Award, 
  ArrowRight, 
  Globe,
  GraduationCap
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-ucao-blue" />,
      title: "Formation d'Excellence",
      description: "Des programmes académiques reconnus internationalement"
    },
    {
      icon: <Users className="w-8 h-8 text-ucao-blue" />,
      title: "Communauté Diverse",
      description: "Étudiants de toute l'Afrique de l'Ouest"
    },
    {
      icon: <Award className="w-8 h-8 text-ucao-blue" />,
      title: "Diplômes Reconnus",
      description: "Certifications validées dans tous les pays membres"
    },
    {
      icon: <Globe className="w-8 h-8 text-ucao-blue" />,
      title: "Réseau International",
      description: "Partenariats avec des universités du monde entier"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-ucao-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Bienvenue à l'UCAO
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Université Catholique de l'Afrique de l'Ouest
              </p>
              <p className="text-lg mb-12 text-blue-200 max-w-2xl mx-auto">
                Rejoignez notre communauté académique d'excellence et construisez votre avenir 
                dans l'une de nos 8 unités universitaires réparties en Afrique de l'Ouest.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/pre-inscription"
                  className="bg-ucao-yellow hover:bg-ucao-yellow-dark text-ucao-blue-dark font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 inline-flex items-center justify-center"
                >
                  Commencer ma pré-inscription
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/verification"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-ucao-blue font-bold py-4 px-8 rounded-lg text-lg transition-colors"
                >
                  Vérifier mon statut
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Pourquoi choisir l'UCAO ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une université d'excellence au service de la formation et du développement de l'Afrique de l'Ouest
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl hover:-translate-y-2 transition-all"
              >
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Comment s'inscrire ?
            </h2>
            <p className="text-lg text-gray-600">
              Un processus simple et sécurisé en quelques étapes
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 top-5 h-0.5 w-full -translate-x-1/2 bg-gray-300" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {[
                  "Remplir le formulaire",
                  "Payer les frais",
                  "Recevoir la confirmation",
                  "Suivre le dossier"
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 bg-ucao-blue text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 z-10 border-4 border-gray-50">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-ucao-blue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-ucao-yellow" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à rejoindre l'UCAO ?
            </h2>
            <p className="text-xl mb-8 text-blue-200 max-w-2xl mx-auto">
              Commencez dès maintenant votre processus de pré-inscription et faites le premier pas 
              vers votre réussite académique.
            </p>
            <Link
              to="/pre-inscription"
              className="bg-ucao-yellow hover:bg-ucao-yellow-dark text-ucao-blue-dark font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 inline-flex items-center"
            >
              Démarrer ma pré-inscription
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
