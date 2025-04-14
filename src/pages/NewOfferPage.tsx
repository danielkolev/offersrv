
import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import OfferAccordion from '@/components/wizard/OfferAccordion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useOffer } from '@/context/offer';
import { supabase } from '@/integrations/supabase/client';
import { getLatestDraftFromDatabase } from '@/components/management/offers/draftOffersService';

const NewOfferPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const { resetOffer, setOffer } = useOffer();
  const [isLoadingCompanyData, setIsLoadingCompanyData] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isDraftLoading, setIsDraftLoading] = useState(false);

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
          console.log('Loading draft offer from database', draftOffer);
          setOffer(draftOffer);
          // If the draft has a company selected, use that
          if (draftOffer.company && draftOffer.company.id) {
            setSelectedCompanyId(draftOffer.company.id);
            localStorage.setItem('selectedCompanyId', draftOffer.company.id);
          }
        } else {
          // No draft found, reset to default state
          console.log('No draft found, resetting offer');
          resetOffer();
        }
        
        setHasInitialized(true);
      } catch (error) {
        console.error('Error initializing offer state:', error);
        resetOffer();
        setHasInitialized(true);
      } finally {
        setIsDraftLoading(false);
      }
    };

    initializeOfferState();
  }, [user, resetOffer, setOffer, hasInitialized]);

  // Fetch user's default company or first company on load
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
        // Check localStorage for previously selected company
        const storedCompanyId = localStorage.getItem('selectedCompanyId');
        
        if (storedCompanyId && memberData.some(m => m.organization_id === storedCompanyId)) {
          setSelectedCompanyId(storedCompanyId);
        } else {
          setSelectedCompanyId(memberData[0].organization_id);
        }
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

  // Only fetch default company after checking for draft
  useEffect(() => {
    if (hasInitialized && !selectedCompanyId) {
      fetchDefaultCompany();
    }
  }, [hasInitialized, fetchDefaultCompany, selectedCompanyId]);

  const handleSelectCompany = useCallback((companyId: string) => {
    setSelectedCompanyId(companyId);
    localStorage.setItem('selectedCompanyId', companyId);
  }, []);

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
        isLoadingCompanyData={isLoadingCompanyData || isDraftLoading}
        fetchError={fetchError}
        selectedCompanyId={selectedCompanyId}
        onSelectCompany={handleSelectCompany}
      />
    </div>
  );
};

export default NewOfferPage;
