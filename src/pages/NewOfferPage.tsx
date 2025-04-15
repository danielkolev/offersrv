
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

const NewOfferPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
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

  // Show a better company selector screen when no company is selected
  if (!selectedCompanyId && !isLoadingCompanyData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">{t.offer.createOffer}</h1>
          <p className="mb-4">{t.common.selectCompanyToContinue}</p>
          
          <CompanySelector 
            onCompanySelect={(id) => {
              if (id) {
                setSelectedCompanyId(id);
                localStorage.setItem('selectedCompanyId', id);
              }
            }}
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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-offer-gray">
          {t.offer.createOffer}
        </h1>
        
        {selectedCompanyId && (
          <CompanySelector 
            onCompanySelect={(id) => {
              if (id) {
                setSelectedCompanyId(id);
                localStorage.setItem('selectedCompanyId', id);
              }
            }}
            selectedCompanyId={selectedCompanyId}
          />
        )}
      </div>
      
      {(isLoadingCompanyData || isDraftLoading || isCompanyLoading) ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>{t.common.loading}</p>
        </div>
      ) : (
        <OfferAccordion 
          isLoadingCompanyData={isLoadingCompanyData || isDraftLoading || isCompanyLoading}
          fetchError={fetchError}
          selectedCompanyId={selectedCompanyId}
        />
      )}
    </div>
  );
};

export default NewOfferPage;
