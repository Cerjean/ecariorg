import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { PreRegistrationData } from '../types';

interface PreRegistrationContextType {
  formData: PreRegistrationData;
  updateFormData: (data: Partial<PreRegistrationData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
  errors: { [key: string]: string };
  validateAndSetErrors: (step: number) => boolean;
  clearError: (fieldName: string) => void;
  submitPreRegistration: () => Promise<boolean>;
}

const PreRegistrationContext = createContext<PreRegistrationContextType | undefined>(undefined);

export const usePreRegistration = () => {
  const context = useContext(PreRegistrationContext);
  if (context === undefined) {
    throw new Error('usePreRegistration must be used within a PreRegistrationProvider');
  }
  return context;
};

interface PreRegistrationProviderProps {
  children: ReactNode;
}

const initialFormData: PreRegistrationData = {
  civility: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  birthPlace: '',
  nationality: '',
  photo: null,
  universityUnitId: '',
  facultyId: '',
  programId: '',
  previousInstitution: '',
  lastDiploma: '',
  step: 1,
  isComplete: false
};

export const PreRegistrationProvider: React.FC<PreRegistrationProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<PreRegistrationData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const updateFormData = useCallback((data: Partial<PreRegistrationData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const clearError = useCallback((fieldName: string) => {
    setErrors(prev => {
      if (!prev[fieldName]) return prev;
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setErrors({});
  }, []);

  const validateAndSetErrors = useCallback((step: number) => {
    const newErrors: { [key: string]: string } = {};

    const validateStep1 = () => {
      if (!formData.civility) newErrors.civility = 'La civilité est obligatoire';
      if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est obligatoire';
      if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est obligatoire';
      if (!formData.birthPlace.trim()) newErrors.birthPlace = 'Le lieu de naissance est obligatoire';
      if (!formData.email.trim()) {
        newErrors.email = 'L\'adresse email est obligatoire';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Veuillez saisir une adresse email valide';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Le numéro de téléphone est obligatoire';
      if (!formData.birthDate) newErrors.birthDate = 'La date de naissance est obligatoire';
      if (!formData.nationality.trim()) newErrors.nationality = 'La nationalité est obligatoire';
      if (!formData.photo) newErrors.photo = 'La photo d\'identité est obligatoire';
    };

    const validateStep2 = () => {
      if (!formData.universityUnitId) newErrors.universityUnitId = 'Veuillez sélectionner une unité universitaire';
      if (!formData.facultyId) newErrors.facultyId = 'Veuillez sélectionner une faculté';
      if (!formData.programId) newErrors.programId = 'Veuillez sélectionner un programme';
      if (!formData.previousInstitution.trim()) newErrors.previousInstitution = 'L\'établissement précédent est obligatoire';
      if (!formData.lastDiploma.trim()) newErrors.lastDiploma = 'Le dernier diplôme obtenu est obligatoire';
    };

    switch (step) {
      case 1:
        validateStep1();
        break;
      case 2:
        validateStep2();
        break;
      case 3:
        validateStep1();
        validateStep2();
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const submitPreRegistration = useCallback(async (): Promise<boolean> => {
    try {
      // Simulation d'envoi - à remplacer par l'appel API réel
      await new Promise(resolve => setTimeout(resolve, 2000));
      updateFormData({ isComplete: true });
      return true;
    } catch (error) {
      return false;
    }
  }, [updateFormData]);

  const value = {
    formData,
    updateFormData,
    currentStep,
    setCurrentStep,
    resetForm,
    errors,
    validateAndSetErrors,
    clearError,
    submitPreRegistration
  };

  return (
    <PreRegistrationContext.Provider value={value}>
      {children}
    </PreRegistrationContext.Provider>
  );
};
