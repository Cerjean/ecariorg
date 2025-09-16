import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ProfessorRegistrationData } from '../types';

interface ProfessorRegistrationContextType {
  formData: ProfessorRegistrationData;
  updateFormData: (data: Partial<ProfessorRegistrationData>) => void;
  resetForm: () => void;
  errors: { [key: string]: string };
  validateAndSetErrors: () => boolean;
  clearError: (fieldName: string) => void;
  submitRegistration: () => Promise<boolean>;
}

const ProfessorRegistrationContext = createContext<ProfessorRegistrationContextType | undefined>(undefined);

export const useProfessorRegistration = () => {
  const context = useContext(ProfessorRegistrationContext);
  if (context === undefined) {
    throw new Error('useProfessorRegistration must be used within a ProfessorRegistrationProvider');
  }
  return context;
};

interface ProfessorRegistrationProviderProps {
  children: ReactNode;
}

const initialFormData: ProfessorRegistrationData = {
  civility: '',
  firstName: '',
  lastName: '',
  gender: '',
  phone: '',
  email: '',
  birthDate: '',
  birthPlace: '',
  countryOfResidence: '',
  photo: null,
};

export const ProfessorRegistrationProvider: React.FC<ProfessorRegistrationProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<ProfessorRegistrationData>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const updateFormData = useCallback((data: Partial<ProfessorRegistrationData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const clearError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
  }, []);

  const validateAndSetErrors = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.civility) newErrors.civility = 'La civilité est obligatoire';
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est obligatoire';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est obligatoire';
    if (!formData.gender) newErrors.gender = 'Le sexe est obligatoire';
    if (!formData.birthPlace.trim()) newErrors.birthPlace = 'Le lieu de naissance est obligatoire';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'adresse email est obligatoire';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Veuillez saisir une adresse email valide';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Le numéro de téléphone est obligatoire';
    if (!formData.birthDate) newErrors.birthDate = 'La date de naissance est obligatoire';
    if (!formData.countryOfResidence) newErrors.countryOfResidence = 'Le pays de résidence est obligatoire';
    if (!formData.photo) newErrors.photo = 'La photo d\'identité est obligatoire';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const submitRegistration = useCallback(async (): Promise<boolean> => {
    try {
      // Simulation d'envoi - à remplacer par l'appel API réel
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Professor registration submitted:', formData);
      return true;
    } catch (error) {
      console.error('Professor registration failed:', error);
      return false;
    }
  }, [formData]);

  const value = {
    formData,
    updateFormData,
    resetForm,
    errors,
    validateAndSetErrors,
    clearError,
    submitRegistration,
  };

  return (
    <ProfessorRegistrationContext.Provider value={value}>
      {children}
    </ProfessorRegistrationContext.Provider>
  );
};
