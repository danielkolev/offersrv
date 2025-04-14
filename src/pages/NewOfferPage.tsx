
import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import OfferAccordion from '@/components/wizard/OfferAccordion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useOffer } from '@/context/offer';
import { supabase } from '@/integrations/supabase/client';
import { getLatestDraftFromDatabase } from '@/components/management/offers/draftOffersService';
import { useCompanyData } from '@/hooks/useCompanyData';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  
  // Check if we should load a draft based on navigation state
  const shouldLoadDraft = location.state?.loadDraft === true;
  const draftId = location.state?.draftId;
  const stateTimestamp = location.state?.timestamp || 0;
  
  // Should we load a saved offer?
  const shouldLoadSavedOffer = location.state?.loadSavedOffer === true;
  const savedOfferId = location.state?.savedOfferId;
  const savedOfferData = location.state?.offerData;
  
  // Use custom hook for loading company data
  const { isLoading: isCompanyLoading } = useCompanyData(selectedCompanyId);

  // Check for draft and initialize the offer state
  useEffect(() => {
    let isMounted = true;
    
    const initializeOfferState = async () => {
      if (!user || hasInitialized || !isMounted) return;
      
      setIsDraftLoading(true);
      try {
        console.log("NewOfferPage: Initializing offer state, shouldLoadDraft:", shouldLoadDraft, 
                  "shouldLoadSavedOffer:", shouldLoadSavedOffer, "timestamp:", stateTimestamp);
        
        // First, always reset the offer to clear any previous state
        await resetOffer();
        
        // Small delay to ensure reset is complete
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (!isMounted) return;
        
        if (shouldLoadSavedOffer && savedOfferData) {
          console.log('NewOfferPage: Loading saved offer with data:', savedOfferData);
          
          setOffer(savedOfferData);
          
          toast({
            title: t.savedOffers.offerLoaded,
            description: t.savedOffers.offerLoaded,
          });
          
          // If the saved offer has a company selected, use that
          if (savedOfferData.company && (savedOfferData.company.id || savedOfferData.company.vatNumber)) {
            const companyId = savedOfferData.company.id || savedOfferData.company.vatNumber;
            if (companyId) {
              console.log("NewOfferPage: Setting company ID from saved offer:", companyId);
              setSelectedCompanyId(companyId);
              localStorage.setItem('selectedCompanyId', companyId);
            }
          }
        } else if (shouldLoadDraft && draftId) {
          console.log("NewOfferPage: Should load draft with ID:", draftId);
          
          // Explicitly load the draft if we came from a "load draft" action
          const draftOffer = await getLatestDraftFromDatabase(user.id);
          
          if (draftOffer && isMounted) {
            console.log('NewOfferPage: Loading draft with data:', draftOffer);
            
            // Now set the offer with the draft data
            setOffer(draftOffer);
            
            toast({
              title: t.offer.draftLoaded,
              description: t.offer.draftRestoredDescription,
            });
            
            // If the draft has a company selected, use that
            if (draftOffer.company && (draftOffer.company.id || draftOffer.company.vatNumber)) {
              const companyId = draftOffer.company.id || draftOffer.company.vatNumber;
              if (companyId) {
                console.log("NewOfferPage: Setting company ID from draft:", companyId);
                setSelectedCompanyId(companyId);
                localStorage.setItem('selectedCompanyId', companyId);
              }
            }
          } else {
            console.log('NewOfferPage: No draft found, preparing new offer');
            // No need to reset again, we already did it at the beginning
          }
        } else {
          // Normal initialization - clean state was already set with resetOffer
          console.log('NewOfferPage: Normal initialization, starting with new offer');
        }
        
        if (isMounted) setHasInitialized(true);
      } catch (error) {
        console.error('Error during offer initialization:', error);
        if (isMounted) {
          toast({
            title: t.common.error,
            description: "Error initializing offer",
            variant: 'destructive'
          });
          setHasInitialized(true);
        }
      } finally {
        if (isMounted) setIsDraftLoading(false);
      }
    };

    initializeOfferState();
    
    return () => {
      isMounted = false;
    };
  }, [user, resetOffer, setOffer, hasInitialized, shouldLoadDraft, shouldLoadSavedOffer, draftId, savedOfferId, savedOfferData, toast, t, stateTimestamp]);

  // Use the company selected in the main menu (stored in localStorage)
  useEffect(() => {
    if (hasInitialized && !selectedCompanyId) {
      const storedCompanyId = localStorage.getItem('selectedCompanyId');
      if (storedCompanyId) {
        console.log("NewOfferPage: Using company from localStorage:", storedCompanyId);
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
        console.log("NewOfferPage: Setting default company ID:", defaultCompanyId);
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
