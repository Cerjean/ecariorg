import { UniversityUnit, Faculty, Program } from '../types';
import { faker } from '@faker-js/faker';

faker.seed(123); // Pour des résultats cohérents

export const universityUnits: UniversityUnit[] = [
  { id: '1', name: 'Unité Universitaire à Abidjan', code: 'UUA', description: faker.lorem.paragraphs(2) },
  { id: '2', name: 'Unité Universitaire à Bamako', code: 'UUBa', description: faker.lorem.paragraphs(2) },
  { id: '3', name: 'Unité Universitaire à Bobo Dioulasso', code: 'UUB', description: faker.lorem.paragraphs(2) },
  { id: '4', name: 'Unité Universitaire à Conakry', code: 'UUCo', description: faker.lorem.paragraphs(2) },
  { id: '5', name: 'Unité Universitaire à Cotonou', code: 'UUC', description: faker.lorem.paragraphs(2) },
  { id: '6', name: 'Unité Universitaire à Lomé', code: 'UUT', description: faker.lorem.paragraphs(2) },
  { id: '7', name: 'Unité Universitaire à Yamoussoukro', code: 'UUY', description: faker.lorem.paragraphs(2) },
  { id: '8', name: 'Unité Universitaire à Zinguinchor', code: 'UUZ', description: faker.lorem.paragraphs(2) }
];

export const faculties: Faculty[] = [
  { id: '1', name: 'Faculté de Théologie', university_unit_id: '1' },
  { id: '2', name: 'Faculté de Philosophie', university_unit_id: '1' },
  { id: '3', name: 'Faculté des Sciences Sociales', university_unit_id: '1' },
  { id: '4', name: 'Faculté des Sciences Économiques et de Gestion', university_unit_id: '1' },
  { id: '5', name: 'Faculté de Théologie', university_unit_id: '2' },
  { id: '6', name: 'Faculté de Philosophie', university_unit_id: '2' },
  { id: '7', name: 'Faculté des Sciences Sociales', university_unit_id: '2' },
  { id: '8', name: 'Faculté des Sciences Économiques et de Gestion', university_unit_id: '2' },
  // Adding more faculties for other units for better demonstration
  { id: '9', name: 'Faculté des Sciences et Technologies', university_unit_id: '3' },
  { id: '10', name: 'Faculté de Droit', university_unit_id: '3' },
  { id: '11', name: 'Faculté de Médecine', university_unit_id: '4' },
  { id: '12', name: 'Faculté des Lettres et Langues', university_unit_id: '5' },
  { id: '13', name: 'Faculté d\'Agronomie', university_unit_id: '6' },
  { id: '14', name: 'Institut Polytechnique', university_unit_id: '7' },
  { id: '15', name: 'Faculté des Sciences de l\'Éducation', university_unit_id: '8' },
];

export const programs: Program[] = [
  { id: '1', name: 'Licence en Théologie', faculty_id: '1', level: 'Licence' },
  { id: '2', name: 'Master en Théologie', faculty_id: '1', level: 'Master' },
  { id: '3', name: 'Licence en Philosophie', faculty_id: '2', level: 'Licence' },
  { id: '4', name: 'Master en Philosophie', faculty_id: '2', level: 'Master' },
  { id: '5', name: 'Licence en Sociologie', faculty_id: '3', level: 'Licence' },
  { id: '6', name: 'Master en Sociologie', faculty_id: '3', level: 'Master' },
  { id: '7', name: 'Licence en Économie', faculty_id: '4', level: 'Licence' },
  { id: '8', name: 'Master en Gestion', faculty_id: '4', level: 'Master' },
  // Adding more programs
  { id: '9', name: 'Licence en Informatique', faculty_id: '9', level: 'Licence' },
  { id: '10', name: 'Master en Génie Logiciel', faculty_id: '9', level: 'Master' },
  { id: '11', name: 'Licence en Droit des Affaires', faculty_id: '10', level: 'Licence' },
  { id: '12', name: 'Première Année Commune des Études de Santé', faculty_id: '11', level: 'Licence' },
  { id: '13', name: 'Licence en Lettres Modernes', faculty_id: '12', level: 'Licence' },
  { id: '14', name: 'Ingénieur Agronome', faculty_id: '13', level: 'Master' },
  { id: '15', name: 'Génie Civil', faculty_id: '14', level: 'Licence' },
  { id: '16', name: 'Master en Sciences de l\'Éducation', faculty_id: '15', level: 'Master' },
];
