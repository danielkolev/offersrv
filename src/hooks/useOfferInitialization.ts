
import { useState, useEffect, useCallback } from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { getLatestDraftFromDatabase } from '@/components/management/offers/draft';
import { useLocation } from 'react-router-dom';

export const useOfferInitialization = (setSelectedCompanyId: (id: string | null) => void) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { resetOffer, setOffer } = useOffer();
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

  // Check for draft and initialize the offer state
  useEffect(() => {
    let isMounted = true;
    
    const initializeOfferState = async () => {
      if (!user || hasInitialized || !isMounted) return;
      
      setIsDraftLoading(true);
      try {
        console.log("useOfferInitialization: Initializing offer state, shouldLoadDraft:", shouldLoadDraft, 
                  "shouldLoadSavedOffer:", shouldLoadSavedOffer, "timestamp:", stateTimestamp);
        
        // First, always reset the offer to clear any previous state
        await resetOffer();
        
        // Small delay to ensure reset is complete
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (!isMounted) return;
        
        if (shouldLoadSavedOffer && savedOfferData) {
          console.log('useOfferInitialization: Loading saved offer with data:', savedOfferData);
          
          setOffer(savedOfferData);
          
          toast({
            title: t.savedOffers.offerLoaded,
            description: t.savedOffers.offerLoaded,
          });
          
          // If the saved offer has a company selected, use that
          if (savedOfferData.company && (savedOfferData.company.id || savedOfferData.company.vatNumber)) {
            const companyId = savedOfferData.company.id || savedOfferData.company.vatNumber;
            if (companyId) {
              console.log("useOfferInitialization: Setting company ID from saved offer:", companyId);
              setSelectedCompanyId(companyId);
              localStorage.setItem('selectedCompanyId', companyId);
            }
          }
        } else if (shouldLoadDraft && draftId) {
          console.log("useOfferInitialization: Should load draft with ID:", draftId);
          
          // Explicitly load the draft if we came from a "load draft" action
          const draftOffer = await getLatestDraftFromDatabase(user.id);
          
          if (draftOffer && isMounted) {
            console.log('useOfferInitialization: Loading draft with data:', draftOffer);
            
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
                console.log("useOfferInitialization: Setting company ID from draft:", companyId);
                setSelectedCompanyId(companyId);
                localStorage.setItem('selectedCompanyId', companyId);
              }
            }
          } else {
            console.log('useOfferInitialization: No draft found, preparing new offer');
            // No need to reset again, we already did it at the beginning
          }
        } else {
          // Normal initialization - clean state was already set with resetOffer
          console.log('useOfferInitialization: Normal initialization, starting with new offer');
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
  }, [user, resetOffer, setOffer, hasInitialized, shouldLoadDraft, shouldLoadSavedOffer, draftId, savedOfferId, savedOfferData, toast, t, stateTimestamp, setSelectedCompanyId]);

  return {
    hasInitialized,
    isDraftLoading
  };
};
