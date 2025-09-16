import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { usePreRegistration } from '../contexts/PreRegistrationContext';
import StepIndicator from '../components/PreRegistration/StepIndicator';
import Step1PersonalInfo from '../components/PreRegistration/Step1PersonalInfo';
import Step2AcademicInfo from '../components/PreRegistration/Step2AcademicInfo';
import Step3Summary from '../components/PreRegistration/Step3Summary';

const PreRegistration: React.FC = () => {
  const { currentStep, setCurrentStep, validateAndSetErrors } = usePreRegistration();

  const handleNext = () => {
    const isValid = validateAndSetErrors(currentStep);
    if (isValid) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo />;
      case 2:
        return <Step2AcademicInfo />;
      case 3:
        return <Step3Summary />;
      default:
        return <Step1PersonalInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-ucao-blue hover:text-ucao-blue-dark mb-4"
          >
            <Home className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-800">
            Pré-inscription UCAO
          </h1>
          <p className="text-gray-600 mt-2">
            Formulaire de pré-inscription en ligne - Étape {currentStep} sur 3
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {renderCurrentStep()}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <div>
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Précédent
              </button>
            )}
          </div>

          <div className="text-sm text-gray-500">
            Étape {currentStep} sur 3
          </div>

          <div>
            {currentStep < 3 && (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-ucao-blue text-white rounded-lg hover:bg-ucao-blue-dark transition-colors"
              >
                Suivant
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Besoin d'aide ? Contactez-nous à{' '}
            <a href="mailto:support@ecari-ucao.org" className="text-ucao-blue hover:text-ucao-blue-dark">
              support@ecari-ucao.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreRegistration;
