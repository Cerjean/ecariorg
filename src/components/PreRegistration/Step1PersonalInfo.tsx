import React, { useEffect, useState } from 'react';
import { usePreRegistration } from '../../contexts/PreRegistrationContext';
import { Camera, Trash2, User as UserIcon } from 'lucide-react';

const Step1PersonalInfo: React.FC = () => {
  const { formData, updateFormData, errors, clearError } = usePreRegistration();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const nationalities = [
    'Béninoise', 'Burkinabé', 'Ivoirienne', 'Guinéenne', 'Malienne', 
    'Nigérienne', 'Sénégalaise', 'Togolaise', 'Autre'
  ];

  const civilities = ['Monsieur', 'Madame', 'Mlle'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name]) {
      clearError(name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    updateFormData({ photo: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
    if (errors.photo) {
      clearError('photo');
    }
  };

  const removePhoto = () => {
    updateFormData({ photo: null });
    setPhotoPreview(null);
    // Reset file input value
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  useEffect(() => {
    updateFormData({ step: 1 });
  }, [updateFormData]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Informations Personnelles
        </h2>
        <p className="text-gray-600 mb-6">
          Veuillez renseigner vos informations personnelles avec précision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <label htmlFor="civility" className="block text-sm font-medium text-gray-700 mb-1">
            Civilité <span className="text-red-500">*</span>
          </label>
          <select
            id="civility"
            name="civility"
            value={formData.civility}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${
              errors.civility ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Sélectionnez</option>
            {civilities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.civility && (
            <p className="mt-1 text-sm text-red-600">{errors.civility}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${
              errors.firstName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Votre prénom"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${
              errors.lastName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Votre nom"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
            Date de naissance <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${
              errors.birthDate ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.birthDate && (
            <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700 mb-1">
            Lieu de naissance <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="birthPlace"
            name="birthPlace"
            value={formData.birthPlace}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${
              errors.birthPlace ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Ville de naissance"
          />
          {errors.birthPlace && (
            <p className="mt-1 text-sm text-red-600">{errors.birthPlace}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
          Nationalité <span className="text-red-500">*</span>
        </label>
        <select
          id="nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${
            errors.nationality ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">Sélectionnez votre nationalité</option>
          {nationalities.map(nationality => (
            <option key={nationality} value={nationality}>
              {nationality}
            </option>
          ))}
        </select>
        {errors.nationality && (
          <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Adresse email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="votre.email@exemple.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${
              errors.phone ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="+225 XX XX XX XX"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Photo d'identité <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {photoPreview ? (
              <img src={photoPreview} alt="Aperçu" className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="photo"
              className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              {photoPreview ? 'Changer la photo' : 'Choisir une photo'}
            </label>
            {photoPreview && (
              <button
                type="button"
                onClick={removePhoto}
                className="mt-2 flex items-center gap-2 text-sm text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            )}
            <p className="text-xs text-gray-500 mt-2">PNG, JPG, JPEG jusqu'à 2Mo.</p>
          </div>
        </div>
        {errors.photo && (
          <p className="mt-1 text-sm text-red-600">{errors.photo}</p>
        )}
      </div>
    </div>
  );
};

export default Step1PersonalInfo;
