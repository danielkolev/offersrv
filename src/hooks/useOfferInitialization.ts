
import { useState, useEffect, useCallback, useRef } from 'react';
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
  
  // Create a ref to track initialization
  const initializationInProgress = useRef(false);
  
  // Check if we should load data based on navigation state
  const shouldLoadDraft = location.state?.loadDraft === true;
  const draftId = location.state?.draftId;
  const shouldLoadSavedOffer = location.state?.loadSavedOffer === true;
  const savedOfferId = location.state?.savedOfferId;
  const savedOfferData = location.state?.offerData;

  // Check for draft and initialize the offer state
  useEffect(() => {
    if (!user || hasInitialized || initializationInProgress.current) return;
    
    const initializeOfferState = async () => {
      // Set the ref to prevent duplicate initializations
      initializationInProgress.current = true;
      setIsDraftLoading(true);
      
      try {
        console.log("useOfferInitialization: Initializing offer state");
        
        // First, always reset the offer to clear any previous state
        await resetOffer();
        
        // Small delay to ensure reset is complete
        await new Promise(resolve => setTimeout(resolve, 150));
        
        if (shouldLoadSavedOffer && savedOfferData) {
          console.log('useOfferInitialization: Loading saved offer with data');
          
          setOffer(savedOfferData);
          
          toast({
            title: t.savedOffers.offerLoaded,
            description: t.savedOffers.offerLoaded,
          });
          
          // If the saved offer has a company selected, use that
          if (savedOfferData.company && savedOfferData.company.id) {
            const companyId = savedOfferData.company.id;
            if (companyId) {
              console.log("useOfferInitialization: Setting company ID from saved offer:", companyId);
              setSelectedCompanyId(companyId);
              localStorage.setItem('selectedCompanyId', companyId);
            }
          }
        } else if (shouldLoadDraft && draftId) {
          console.log("useOfferInitialization: Should load draft with ID:", draftId);
          
          try {
            // Explicitly load the draft if we came from a "load draft" action
            const draftOffer = await getLatestDraftFromDatabase(user.id);
            
            if (draftOffer) {
              console.log('useOfferInitialization: Loading draft');
              
              // Now set the offer with the draft data
              setOffer(draftOffer);
              
              toast({
                title: t.offer.draftLoaded,
                description: t.offer.draftRestoredDescription,
              });
              
              // If the draft has a company selected, use that
              if (draftOffer.company && draftOffer.company.id) {
                const companyId = draftOffer.company.id;
                if (companyId) {
                  console.log("useOfferInitialization: Setting company ID from draft:", companyId);
                  setSelectedCompanyId(companyId);
                  localStorage.setItem('selectedCompanyId', companyId);
                }
              }
            } else {
              console.log('useOfferInitialization: No draft found, preparing new offer');
            }
          } catch (draftError) {
            console.error("Error loading draft:", draftError);
          }
        } else {
          // Normal initialization - clean state was already set with resetOffer
          console.log('useOfferInitialization: Normal initialization, starting with new offer');
        }
        
        setHasInitialized(true);
      } catch (error) {
        console.error('Error during offer initialization:', error);
        toast({
          title: t.common.error,
          description: "Error initializing offer",
          variant: 'destructive'
        });
        setHasInitialized(true);
      } finally {
        setIsDraftLoading(false);
      }
    };

    initializeOfferState();
    
    return () => {
      // Reset the ref when component unmounts
      initializationInProgress.current = false;
    };
  }, [user, resetOffer, setOffer, shouldLoadDraft, shouldLoadSavedOffer, draftId, savedOfferId, savedOfferData, toast, t, setSelectedCompanyId]);

  return {
    hasInitialized,
    isDraftLoading
  };
};
