
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import OfferAccordion from '@/components/wizard/OfferAccordion';
import { useAuth } from '@/context/AuthContext';
import { useCompanyData } from '@/hooks/useCompanyData';
import { useOfferInitialization } from '@/hooks/useOfferInitialization';
import { useCompanySelection } from '@/hooks/useCompanySelection';
import UnauthorizedState from '@/components/offer/UnauthorizedState';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CompanySelector } from '@/components/company/CompanySelector';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewOfferPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Use our custom hooks to manage state
  const {
    selectedCompanyId,
    setSelectedCompanyId,
    isLoadingCompanyData,
    fetchError
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

  // Handle creating new company
  const handleCreateCompany = () => {
    navigate('/company-management');
  };

  // Determine if we're in a loading state
  const isLoading = isLoadingCompanyData || isDraftLoading || isCompanyLoading;

  // Show a better company selector screen when no company is selected
  if (!selectedCompanyId && !isLoadingCompanyData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">{t.offer.createOffer}</h1>
          <p className="mb-4">{t.common.selectCompanyToContinue}</p>
          
          <CompanySelector 
            onSelectCompany={(id) => {
              if (id) {
                console.log("NewOfferPage: Selected company ID:", id);
                setSelectedCompanyId(id);
                localStorage.setItem('selectedCompanyId', id);
                
                // Notify the user that the company was selected
                toast({
                  title: t.company.companySelected,
                  description: t.company.offerPreparation,
                });
              }
            }}
            onCreateCompany={handleCreateCompany}
            selectedCompanyId={null}
          />
          
          <div className="mt-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
            >
              {t.common.back}
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
              onClick={() => window.location.reload()}
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
        
        {selectedCompanyId && (
          <CompanySelector 
            onSelectCompany={(id) => {
              if (id) {
                console.log("NewOfferPage: Changed company ID to:", id);
                setSelectedCompanyId(id);
                localStorage.setItem('selectedCompanyId', id);
                
                // Notify the user that the company was changed
                toast({
                  title: t.company.companyChanged,
                  description: t.company.updatingOffer,
                });
              }
            }}
            onCreateCompany={handleCreateCompany}
            selectedCompanyId={selectedCompanyId}
          />
        )}
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
