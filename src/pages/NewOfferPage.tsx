
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import OfferAccordion from '@/components/wizard/OfferAccordion';
import { useAuth } from '@/context/AuthContext';
import { useCompanyData } from '@/hooks/useCompanyData';
import { useOfferInitialization } from '@/hooks/useOfferInitialization';
import { useCompanySelection } from '@/hooks/useCompanySelection';
import UnauthorizedState from '@/components/offer/UnauthorizedState';
import { Button } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Loader2, Building } from 'lucide-react';

const NewOfferPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Use our custom hooks to manage state
  const {
    selectedCompanyId,
    setSelectedCompanyId,
    isLoadingCompanyData,
    fetchError,
    fetchUserCompany
  } = useCompanySelection(true);
  
  const { isDraftLoading, hasInitialized } = useOfferInitialization(setSelectedCompanyId);
  
  // Fetch company data and automatically populate the offer
  const { isLoading: isCompanyLoading, error: companyError } = useCompanyData(selectedCompanyId);

  // Debug logs to track loading state
  useEffect(() => {
    console.log('NewOfferPage: Loading states', {
      isLoadingCompanyData,
      isDraftLoading,
      isCompanyLoading,
      hasInitialized,
      selectedCompanyId
    });
  }, [isLoadingCompanyData, isDraftLoading, isCompanyLoading, hasInitialized, selectedCompanyId]);

  // Unauthorized state for users who aren't logged in
  if (!user) {
    return <UnauthorizedState />;
  }

  // Determine if we're in a loading state
  const isLoading = isLoadingCompanyData || isDraftLoading || isCompanyLoading;

  // Show a company creation prompt when no company exists
  if (!selectedCompanyId && !isLoadingCompanyData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">{t.offer.createOffer}</h1>
          <p className="mb-4">{t.company.selectFirst}</p>
          
          <div className="flex flex-col items-center justify-center py-8">
            <Building className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-lg font-medium mb-2">{t.company.noCompany}</p>
            <p className="text-gray-500 mb-6">{t.company.createFirst}</p>
            
            <Button 
              onClick={() => navigate('/company-management')}
              className="px-6"
            >
              {t.company.createCompany}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Show a loading state when initializing
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-offer-gray">
            {t.offer.createOffer}
          </h1>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg">{t.common.loading}</p>
          <p className="text-sm text-muted-foreground mt-2">{t.offer.preparingOffer}</p>
        </div>
      </div>
    );
  }

  // Show an error state if there was a problem
  if (fetchError || companyError) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-offer-gray">
            {t.offer.createOffer}
          </h1>
        </div>
        
        <Card className="p-6 border-red-200 bg-red-50">
          <h2 className="text-xl font-semibold text-red-700 mb-2">{t.common.error}</h2>
          <p className="mb-4 text-red-600">{t.offer.errorLoading}</p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
            >
              {t.common.back}
            </Button>
            <Button 
              onClick={() => {
                fetchUserCompany();
              }}
            >
              {t.common.retry}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-offer-gray">
          {t.offer.createOffer}
        </h1>
        
        <div className="text-sm flex items-center gap-2 text-muted-foreground">
          <Building className="h-4 w-4" />
          <span>{t.company.singleCompanyMode}</span>
        </div>
      </div>
      
      <OfferAccordion 
        isLoadingCompanyData={isLoading}
        fetchError={fetchError || companyError ? true : false}
        selectedCompanyId={selectedCompanyId}
      />
    </div>
  );
};

export default NewOfferPage;
