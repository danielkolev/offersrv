
import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import OfferAccordion from '@/components/wizard/OfferAccordion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useOffer } from '@/context/offer';
import { supabase } from '@/integrations/supabase/client';
import { getLatestDraftFromDatabase } from '@/components/management/offers/draftOffersService';
import { useCompanyData } from '@/hooks/useCompanyData';

const NewOfferPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const { resetOffer, setOffer, offer } = useOffer();
  const [isLoadingCompanyData, setIsLoadingCompanyData] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isDraftLoading, setIsDraftLoading] = useState(false);
  
  // Използваме къстъм hook за зареждане на данните за компанията
  const { isLoading: isCompanyLoading } = useCompanyData(selectedCompanyId);

  // Check for draft and initialize the offer state
  useEffect(() => {
    const initializeOfferState = async () => {
      if (!user || hasInitialized) return;
      
      setIsDraftLoading(true);
      try {
        // First check if there's a draft to load
        const draftOffer = await getLatestDraftFromDatabase(user.id);
        
        // If there's a draft, load it instead of resetting
        if (draftOffer) {
          console.log('Зареждане на чернова от базата данни:', draftOffer);
          // Проверка за валидни данни
          if (draftOffer.client && draftOffer.products && draftOffer.details) {
            setOffer(draftOffer);
            
            // If the draft has a company selected, use that
            if (draftOffer.company) {
              const companyId = draftOffer.company.id || draftOffer.company.vatNumber;
              if (companyId) {
                setSelectedCompanyId(companyId);
                localStorage.setItem('selectedCompanyId', companyId);
              }
            }
          } else {
            console.error('Черновата има невалидни данни:', draftOffer);
            resetOffer();
          }
        } else {
          // No draft found, reset to default state
          console.log('Няма намерена чернова, ресетвам оферта');
          await resetOffer();
        }
        
        setHasInitialized(true);
      } catch (error) {
        console.error('Грешка при инициализация на офертата:', error);
        resetOffer();
        setHasInitialized(true);
      } finally {
        setIsDraftLoading(false);
      }
    };

    initializeOfferState();
  }, [user, resetOffer, setOffer, hasInitialized]);

  // Use the company selected in the main menu (stored in localStorage)
  useEffect(() => {
    if (hasInitialized && !selectedCompanyId) {
      const storedCompanyId = localStorage.getItem('selectedCompanyId');
      if (storedCompanyId) {
        console.log("Using company from localStorage:", storedCompanyId);
        setSelectedCompanyId(storedCompanyId);
      } else {
        // If no company is selected in the main menu, fetch the default company
        fetchDefaultCompany();
      }
    }
  }, [hasInitialized]);

  // Fetch user's default company or first company if none is selected
  const fetchDefaultCompany = useCallback(async () => {
    if (!user) return;
    
    setIsLoadingCompanyData(true);
    
    try {
      // Get companies the user is a member of through the organization_members table
      const { data: memberData, error: memberError } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', user.id);
        
      if (memberError) throw memberError;
      
      // If user has companies, select the first one as default
      if (memberData && memberData.length > 0) {
        const defaultCompanyId = memberData[0].organization_id;
        console.log("Setting default company ID:", defaultCompanyId);
        setSelectedCompanyId(defaultCompanyId);
        localStorage.setItem('selectedCompanyId', defaultCompanyId);
      }
      
      setFetchError(false);
    } catch (error: any) {
      console.error('Error fetching company data:', error);
      setFetchError(true);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoadingCompanyData(false);
    }
  }, [user, toast, t.common.error]);

  // Unauthorized state for users who aren't logged in
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
