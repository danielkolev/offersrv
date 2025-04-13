
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { OfferProvider, useOffer } from '@/context/offer';
import OfferAccordion from '@/components/wizard/OfferAccordion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DraftStatusIndicator from '@/components/offer-draft/DraftStatusIndicator';

const OfferContent = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    isDirty, 
    isAutoSaving, 
    lastSaved, 
    autoSaveEnabled, 
    saveDraft, 
    toggleAutoSave,
    hasUserInteracted 
  } = useOffer();
  
  const [isLoadingCompanyData, setIsLoadingCompanyData] = React.useState(false);
  const [fetchError, setFetchError] = React.useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      // This could fetch company data as in the Index component
      setSelectedCompanyId('default'); // Using a default value for now
    }
  }, [user]);

  // This is a placeholder for the actual company selection handler
  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">{t.common.unauthorized}</h2>
          <p className="mt-2 text-gray-600">{t.auth.notAuthenticated}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-offer-gray">
          {t.offer.createOffer}
        </h1>
        
        {/* Показва индикатора само ако потребителят е взаимодействал с офертата */}
        {hasUserInteracted && (
          <DraftStatusIndicator 
            isDirty={isDirty}
            isAutoSaving={isAutoSaving}
            lastSaved={lastSaved}
            autoSaveEnabled={autoSaveEnabled}
            onSaveDraft={saveDraft}
            onToggleAutoSave={toggleAutoSave}
          />
        )}
      </div>
      
      <OfferAccordion 
        isLoadingCompanyData={isLoadingCompanyData}
        fetchError={fetchError}
        selectedCompanyId={selectedCompanyId}
        onSelectCompany={handleSelectCompany}
      />
    </div>
  );
};

const NewOfferPage = () => {
  return (
    <OfferProvider>
      <OfferContent />
    </OfferProvider>
  );
};

export default NewOfferPage;
