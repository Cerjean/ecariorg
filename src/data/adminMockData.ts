import { faker } from '@faker-js/faker';

faker.seed(42);

export const getAdminStats = () => ({
  newApplications: {
    value: faker.number.int({ min: 50, max: 200 }),
    change: faker.number.float({ min: -15, max: 25, precision: 1 }),
  },
  totalStudents: {
    value: faker.number.int({ min: 1500, max: 3000 }),
    change: faker.number.float({ min: 1, max: 5, precision: 1 }),
  },
  totalProfessors: {
    value: faker.number.int({ min: 150, max: 300 }),
    change: faker.number.float({ min: -2, max: 4, precision: 1 }),
  },
  collectedFees: {
    value: faker.number.int({ min: 5000000, max: 15000000 }),
    change: faker.number.float({ min: 5, max: 30, precision: 1 }),
  },
});

export const getInscriptionChartData = () => {
  const labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  const data = labels.map(() => faker.number.int({ min: 50, max: 400 }));
  return { labels, data };
};

export const getRecentApplications = (count = 5) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    program: faker.helpers.arrayElement(['Licence en Économie', 'Master en Droit', 'Licence en Informatique', 'Doctorat en Théologie']),
    date: faker.date.recent({ days: 30 }),
    status: faker.helpers.arrayElement(['pending', 'approved', 'rejected'] as const),
  }));
};
