import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Informations Personnelles' },
    { number: 2, title: 'Cursus Académique' },
    { number: 3, title: 'Résumé et Paiement' }
  ];

  return (
    <div className="mb-12">
      <div className="flex items-start">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center w-1/3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ${
                  currentStep > step.number
                    ? 'bg-ucao-yellow border-ucao-yellow text-ucao-blue-dark'
                    : currentStep === step.number
                    ? 'bg-ucao-blue border-ucao-blue text-white'
                    : 'bg-gray-200 border-gray-300 text-gray-500'
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="w-6 h-6" />
                ) : (
                  step.number
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={`text-xs md:text-sm font-medium transition-colors duration-300 ${
                    currentStep >= step.number ? 'text-ucao-blue' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mt-5 transition-all duration-500 ${
                  currentStep > step.number ? 'bg-ucao-yellow' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
