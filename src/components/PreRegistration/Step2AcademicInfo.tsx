import React, { useEffect } from 'react';
import { usePreRegistration } from '../../contexts/PreRegistrationContext';
import { universityUnits, faculties, programs } from '../../data/universityUnits';

const Step2AcademicInfo: React.FC = () => {
  const { formData, updateFormData, errors, clearError } = usePreRegistration();

  const availableFaculties = faculties.filter(
    faculty => faculty.university_unit_id === formData.universityUnitId
  );

  const availablePrograms = programs.filter(
    program => program.faculty_id === formData.facultyId
  );

  const diplomas = [
    'Baccalauréat',
    'Licence/Bachelor',
    'Master',
    'Doctorat',
    'Autre'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Reset dependent fields when parent selection changes
    if (name === 'universityUnitId') {
      updateFormData({ 
        [name]: value, 
        facultyId: '', 
        programId: '' 
      });
    } else if (name === 'facultyId') {
      updateFormData({ 
        [name]: value, 
        programId: '' 
      });
    } else {
      updateFormData({ [name]: value });
    }
    
    if (errors[name]) {
      clearError(name);
    }
  };

  useEffect(() => {
    updateFormData({ step: 2 });
  }, [updateFormData]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Cursus Académique
        </h2>
        <p className="text-gray-600 mb-6">
          Renseignez les informations concernant votre parcours académique souhaité.
        </p>
      </div>

      <div>
        <label htmlFor="universityUnitId" className="block text-sm font-medium text-gray-700 mb-1">
          Unité Universitaire <span className="text-red-500">*</span>
        </label>
        <select
          id="universityUnitId"
          name="universityUnitId"
          value={formData.universityUnitId}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${
            errors.universityUnitId ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">Sélectionnez une unité universitaire</option>
          {universityUnits.map(unit => (
            <option key={unit.id} value={unit.id}>
              {unit.name} ({unit.code})
            </option>
          ))}
        </select>
        {errors.universityUnitId && (
          <p className="mt-1 text-sm text-red-600">{errors.universityUnitId}</p>
        )}
      </div>

      <div>
        <label htmlFor="facultyId" className="block text-sm font-medium text-gray-700 mb-1">
          Faculté <span className="text-red-500">*</span>
        </label>
        <select
          id="facultyId"
          name="facultyId"
          value={formData.facultyId}
          onChange={handleInputChange}
          disabled={!formData.universityUnitId}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow disabled:bg-gray-100 disabled:cursor-not-allowed ${
            errors.facultyId ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">
            {formData.universityUnitId ? 'Sélectionnez une faculté' : 'Sélectionnez d\'abord une unité universitaire'}
          </option>
          {availableFaculties.map(faculty => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.name}
            </option>
          ))}
        </select>
        {errors.facultyId && (
          <p className="mt-1 text-sm text-red-600">{errors.facultyId}</p>
        )}
      </div>

      <div>
        <label htmlFor="programId" className="block text-sm font-medium text-gray-700 mb-1">
          Programme d'études <span className="text-red-500">*</span>
        </label>
        <select
          id="programId"
          name="programId"
          value={formData.programId}
          onChange={handleInputChange}
          disabled={!formData.facultyId}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow disabled:bg-gray-100 disabled:cursor-not-allowed ${
            errors.programId ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">
            {formData.facultyId ? 'Sélectionnez un programme' : 'Sélectionnez d\'abord une faculté'}
          </option>
          {availablePrograms.map(program => (
            <option key={program.id} value={program.id}>
              {program.name} ({program.level})
            </option>
          ))}
        </select>
        {errors.programId && (
          <p className="mt-1 text-sm text-red-600">{errors.programId}</p>
        )}
      </div>

      <div>
        <label htmlFor="previousInstitution" className="block text-sm font-medium text-gray-700 mb-1">
          Établissement précédent <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="previousInstitution"
          name="previousInstitution"
          value={formData.previousInstitution}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${
            errors.previousInstitution ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Nom de votre dernier établissement"
        />
        {errors.previousInstitution && (
          <p className="mt-1 text-sm text-red-600">{errors.previousInstitution}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastDiploma" className="block text-sm font-medium text-gray-700 mb-1">
          Dernier diplôme obtenu <span className="text-red-500">*</span>
        </label>
        <select
          id="lastDiploma"
          name="lastDiploma"
          value={formData.lastDiploma}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${
            errors.lastDiploma ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">Sélectionnez votre dernier diplôme</option>
          {diplomas.map(diploma => (
            <option key={diploma} value={diploma}>
              {diploma}
            </option>
          ))}
        </select>
        {errors.lastDiploma && (
          <p className="mt-1 text-sm text-red-600">{errors.lastDiploma}</p>
        )}
      </div>
    </div>
  );
};

export default Step2AcademicInfo;
