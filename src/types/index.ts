export interface UniversityUnit {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface Faculty {
  id: string;
  name: string;
  university_unit_id: string;
}

export interface Program {
  id: string;
  name: string;
  faculty_id: string;
  level: string;
}

export interface PreRegistrationData {
  // Étape 1: Informations Personnelles
  civility: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  birthPlace: string;
  nationality: string;
  photo: File | null;
  
  // Étape 2: Cursus Académique
  universityUnitId: string;
  facultyId: string;
  programId: string;
  previousInstitution: string;
  lastDiploma: string;
  
  // Métadonnées
  step: number;
  isComplete: boolean;
}

export interface ProfessorRegistrationData {
  civility: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  birthDate: string;
  birthPlace: string;
  countryOfResidence: string;
  photo: File | null;
}

export interface User {
  id: string;
  email: string;
  role: 'student' | 'professor' | 'admin_uu' | 'admin_ucao' | 'super_admin';
  firstName: string;
  lastName: string;
}

export type UserRole = 'visitor' | 'student' | 'professor' | 'admin_uu' | 'admin_ucao' | 'super_admin';
