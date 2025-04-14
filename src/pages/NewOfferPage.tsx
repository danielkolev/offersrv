
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import OfferAccordion from '@/components/wizard/OfferAccordion';
import { useAuth } from '@/context/AuthContext';
import { useCompanyData } from '@/hooks/useCompanyData';
import { useOfferInitialization } from '@/hooks/useOfferInitialization';
import { useCompanySelection } from '@/hooks/useCompanySelection';
import UnauthorizedState from '@/components/offer/UnauthorizedState';

const NewOfferPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  // Use our custom hooks to manage state
  const {
    selectedCompanyId,
    setSelectedCompanyId,
    isLoadingCompanyData,
    fetchError
  } = useCompanySelection(true);
  
  const { isDraftLoading } = useOfferInitialization(setSelectedCompanyId);
  
  // Fetch company data and automatically populate the offer
  const { isLoading: isCompanyLoading } = useCompanyData(selectedCompanyId);

  // Unauthorized state for users who aren't logged in
  if (!user) {
    return <UnauthorizedState />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-offer-gray">
          {t.offer.createOffer}
        </h1>
      </div>
      
      <OfferAccordion 
        isLoadingCompanyData={isLoadingCompanyData || isDraftLoading || isCompanyLoading}
        fetchError={fetchError}
        selectedCompanyId={selectedCompanyId}
      />
    </div>
  );
};

export default NewOfferPage;
