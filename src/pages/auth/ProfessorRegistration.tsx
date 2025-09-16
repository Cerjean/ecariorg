import React, { useState } from 'react';
import { useProfessorRegistration } from '../../contexts/ProfessorRegistrationContext';
import { countries } from '../../data/countries';
import { Camera, Trash2, User as UserIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfessorRegistration: React.FC = () => {
  const { 
    formData, 
    updateFormData, 
    errors, 
    clearError, 
    validateAndSetErrors,
    submitRegistration,
    resetForm
  } = useProfessorRegistration();
  
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

  const civilities = ['Monsieur', 'Madame', 'Mlle'];
  const genders = ['Homme', 'Femme'];

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
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
    if (errors.photo) clearError('photo');
  };

  const removePhoto = () => {
    updateFormData({ photo: null });
    setPhotoPreview(null);
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus(null);
    
    if (!validateAndSetErrors()) return;

    setIsSubmitting(true);
    const success = await submitRegistration();
    setIsSubmitting(false);

    if (success) {
      setSubmissionStatus('success');
      resetForm();
      setPhotoPreview(null);
    } else {
      setSubmissionStatus('error');
    }
  };

  if (submissionStatus === 'success') {
    return (
      <div className="container mx-auto px-4 max-w-2xl py-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Inscription réussie !</h1>
          <p className="text-gray-600 mb-6">
            Merci pour votre inscription. Votre profil a été soumis et sera examiné par notre administration. Vous recevrez une confirmation par email.
          </p>
          <button 
            onClick={() => setSubmissionStatus(null)}
            className="bg-ucao-blue text-white px-6 py-2 rounded-md hover:bg-ucao-blue-dark transition-colors"
          >
            Effectuer une autre inscription
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-3xl py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Inscription des Professeurs</h1>
        <p className="text-gray-600 mt-2">
          Rejoignez notre corps professoral en remplissant le formulaire ci-dessous.
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="civility" className="block text-sm font-medium text-gray-700 mb-1">Civilité <span className="text-red-500">*</span></label>
            <select id="civility" name="civility" value={formData.civility} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${errors.civility ? 'border-red-300' : 'border-gray-300'}`}>
              <option value="">Sélectionnez</option>
              {civilities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.civility && <p className="mt-1 text-sm text-red-600">{errors.civility}</p>}
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Sexe <span className="text-red-500">*</span></label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${errors.gender ? 'border-red-300' : 'border-gray-300'}`}>
              <option value="">Sélectionnez</option>
              {genders.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom <span className="text-red-500">*</span></label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${errors.firstName ? 'border-red-300' : 'border-gray-300'}`} placeholder="Votre prénom" />
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom <span className="text-red-500">*</span></label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${errors.lastName ? 'border-red-300' : 'border-gray-300'}`} placeholder="Votre nom" />
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">Date de naissance <span className="text-red-500">*</span></label>
            <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${errors.birthDate ? 'border-red-300' : 'border-gray-300'}`} />
            {errors.birthDate && <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>}
          </div>
          <div>
            <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700 mb-1">Lieu de naissance <span className="text-red-500">*</span></label>
            <input type="text" id="birthPlace" name="birthPlace" value={formData.birthPlace} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${errors.birthPlace ? 'border-red-300' : 'border-gray-300'}`} placeholder="Ville de naissance" />
            {errors.birthPlace && <p className="mt-1 text-sm text-red-600">{errors.birthPlace}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse email <span className="text-red-500">*</span></label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${errors.email ? 'border-red-300' : 'border-gray-300'}`} placeholder="votre.email@exemple.com" />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone <span className="text-red-500">*</span></label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${errors.phone ? 'border-red-300' : 'border-gray-300'}`} placeholder="+225 XX XX XX XX" />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="countryOfResidence" className="block text-sm font-medium text-gray-700 mb-1">Pays de résidence <span className="text-red-500">*</span></label>
          <select id="countryOfResidence" name="countryOfResidence" value={formData.countryOfResidence} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ucao-yellow ${errors.countryOfResidence ? 'border-red-300' : 'border-gray-300'}`}>
            <option value="">Sélectionnez votre pays</option>
            {countries.map(country => <option key={country} value={country}>{country}</option>)}
          </select>
          {errors.countryOfResidence && <p className="mt-1 text-sm text-red-600">{errors.countryOfResidence}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo d'identité <span className="text-red-500">*</span></label>
          <div className="mt-2 flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {photoPreview ? <img src={photoPreview} alt="Aperçu" className="w-full h-full object-cover" /> : <UserIcon className="w-12 h-12 text-gray-400" />}
            </div>
            <div>
              <input type="file" id="photo" name="photo" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} className="hidden" />
              <label htmlFor="photo" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Camera className="w-4 h-4" />
                {photoPreview ? 'Changer la photo' : 'Choisir une photo'}
              </label>
              {photoPreview && <button type="button" onClick={removePhoto} className="mt-2 flex items-center gap-2 text-sm text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" />Supprimer</button>}
              <p className="text-xs text-gray-500 mt-2">PNG, JPG, JPEG jusqu'à 2Mo.</p>
            </div>
          </div>
          {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
        </div>

        {submissionStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-sm text-red-700">Une erreur est survenue lors de la soumission. Veuillez réessayer.</p>
          </div>
        )}

        <div className="pt-4">
          <button type="submit" disabled={isSubmitting} className="w-full bg-ucao-blue hover:bg-ucao-blue-dark disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed">
            {isSubmitting ? 'Soumission en cours...' : 'Soumettre mon inscription'}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default ProfessorRegistration;
