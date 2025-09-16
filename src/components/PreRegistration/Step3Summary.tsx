import React, { useState, useEffect } from 'react';
import { usePreRegistration } from '../../contexts/PreRegistrationContext';
import { universityUnits, faculties, programs } from '../../data/universityUnits';
import { CreditCard, Banknote, Shield, User as UserIcon } from 'lucide-react';

const Step3Summary: React.FC = () => {
  const { formData, updateFormData, submitPreRegistration, validateAndSetErrors } = usePreRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const selectedUnit = universityUnits.find(unit => unit.id === formData.universityUnitId);
  const selectedFaculty = faculties.find(faculty => faculty.id === formData.facultyId);
  const selectedProgram = programs.find(program => program.id === formData.programId);

  const registrationFee = 15000; // Frais en FCFA
  const processingFee = 2500; // Frais de traitement ECARI
  const totalAmount = registrationFee + processingFee;

  useEffect(() => {
    if (formData.photo) {
      const url = URL.createObjectURL(formData.photo);
      setPhotoPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [formData.photo]);

  const handleSubmit = async () => {
    setSubmitError('');
    if (!acceptTerms) {
      setSubmitError('Vous devez accepter les conditions générales.');
      return;
    }

    const isValid = validateAndSetErrors(3);
    if (!isValid) {
      setSubmitError('Veuillez corriger les erreurs dans les étapes précédentes. Cliquez sur "Précédent" pour les voir.');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await submitPreRegistration();
      if (success) {
        updateFormData({ isComplete: true, step: 4 });
      } else {
        setSubmitError('Une erreur est survenue lors de la soumission. Veuillez réessayer.');
      }
    } catch (error) {
      setSubmitError('Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    updateFormData({ step: 3 });
  }, [updateFormData]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Résumé et Paiement
        </h2>
        <p className="text-gray-600 mb-6">
          Vérifiez vos informations et procédez au paiement pour finaliser votre pré-inscription.
        </p>
      </div>

      {/* Résumé des informations */}
      <div className="bg-ucao-blue-light rounded-lg p-6">
        <h3 className="text-lg font-semibold text-ucao-blue-dark mb-4">
          Résumé de votre candidature
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-ucao-blue mb-3">Informations personnelles</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Nom complet:</span> {formData.civility} {formData.firstName} {formData.lastName}</p>
                <p><span className="font-medium">Date de naissance:</span> {formData.birthDate ? new Date(formData.birthDate).toLocaleDateString('fr-FR') : 'N/A'}</p>
                <p><span className="font-medium">Lieu de naissance:</span> {formData.birthPlace}</p>
                <p><span className="font-medium">Nationalité:</span> {formData.nationality}</p>
                <p><span className="font-medium">Email:</span> {formData.email}</p>
                <p><span className="font-medium">Téléphone:</span> {formData.phone}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-ucao-blue mb-3">Cursus académique</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Unité:</span> {selectedUnit?.name}</p>
                <p><span className="font-medium">Faculté:</span> {selectedFaculty?.name}</p>
                <p><span className="font-medium">Programme:</span> {selectedProgram?.name}</p>
                <p><span className="font-medium">Établissement:</span> {formData.previousInstitution}</p>
                <p><span className="font-medium">Diplôme:</span> {formData.lastDiploma}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-medium text-ucao-blue mb-3">Photo d'identité</h4>
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
              {photoPreview ? (
                <img src={photoPreview} alt="Candidat" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-16 h-16 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Détail des frais */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-ucao-blue" />
          Détail des frais
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700">Frais de pré-inscription</span>
            <span className="font-medium">{registrationFee.toLocaleString()} FCFA</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700">Frais de traitement ECARI</span>
            <span className="font-medium">{processingFee.toLocaleString()} FCFA</span>
          </div>
          
          <div className="flex justify-between items-center py-3 font-bold text-lg border-t-2 border-gray-200">
            <span>Total à payer</span>
            <span className="text-ucao-blue">{totalAmount.toLocaleString()} FCFA</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-ucao-blue-light rounded-lg">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-ucao-blue mt-0.5 mr-2" />
            <div className="text-sm text-ucao-blue-dark">
              <p className="font-medium mb-1">Paiement sécurisé</p>
              <p>Votre paiement est traité de manière sécurisée via Wave CI. Vous recevrez une confirmation par email.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Méthodes de paiement */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Banknote className="w-5 h-5 mr-2 text-green-600" />
          Méthodes de paiement
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-2 rounded-lg p-4 bg-orange-50 border-ucao-yellow shadow-md cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-2xl">W</span>
              </div>
              <h4 className="font-medium text-gray-800">Wave</h4>
              <p className="text-sm text-gray-600 mt-1">Paiement mobile sécurisé</p>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-gray-800">Carte bancaire</h4>
              <p className="text-sm text-gray-600 mt-1">Bientôt disponible</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conditions générales */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-start">
          <input
            id="acceptTerms"
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="h-4 w-4 text-ucao-blue focus:ring-ucao-yellow border-gray-300 rounded mt-1"
          />
          <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-700">
            Je certifie que les informations fournies sont exactes et j'accepte les{' '}
            <a href="/conditions-generales" target="_blank" className="text-ucao-blue hover:text-ucao-blue-dark underline">
              conditions générales
            </a>{' '}
            de pré-inscription à l'UCAO.
          </label>
        </div>
      </div>

      {/* Erreur de soumission */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      {/* Bouton de paiement */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !acceptTerms}
          className="bg-ucao-yellow hover:bg-ucao-yellow-dark disabled:bg-gray-400 text-ucao-blue-dark font-bold py-4 px-8 rounded-lg text-lg transition-colors disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Traitement en cours...' : `Payer ${totalAmount.toLocaleString()} FCFA`}
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Vous serez redirigé vers la plateforme de paiement sécurisée
        </p>
      </div>
    </div>
  );
};

export default Step3Summary;
