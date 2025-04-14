
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOffer } from '@/context/offer/OfferContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { SavedOffer } from '@/types/database';

export const useOfferNavigation = () => {
  const navigate = useNavigate();
  const { resetOffer } = useOffer();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleOpenDraftOffer = async () => {
    if (isNavigating) return;
    setIsNavigating(true);
    
    try {
      console.log("SavedOffersContent: Opening draft offer");
      
      // Navigate with state that indicates we're loading a draft
      navigate('/new-offer', {
        state: { 
          loadDraft: true,
          timestamp: new Date().getTime()
        },
        replace: true
      });
    } catch (error) {
      console.error("Error opening draft:", error);
      toast({
        title: t.common.error,
        description: "Error opening draft offer",
        variant: 'destructive'
      });
      await resetOffer();
      navigate('/new-offer', { replace: true });
    } finally {
      setIsNavigating(false);
    }
  };

  const handleCreateNewOffer = async () => {
    // Reset offer state before creating a new one
    await resetOffer();
    navigate('/new-offer', { replace: true });
  };

  const handleLoadOffer = async (savedOffer: SavedOffer) => {
    if (isNavigating) return; // Prevent multiple clicks
    setIsNavigating(true);
    
    try {
      console.log("SavedOffersContent: Loading offer with data:", savedOffer.offer_data);
      
      if (savedOffer.offer_data) {
        // Navigate with state that indicates we're loading a saved offer
        navigate('/new-offer', {
          state: { 
            loadSavedOffer: true,
            savedOfferId: savedOffer.id,
            offerData: savedOffer.offer_data,
            timestamp: new Date().getTime()
          },
          replace: true
        });
      } else {
        console.error("SavedOffersContent: Invalid offer data:", savedOffer);
        toast({
          title: t.common.error,
          description: "Invalid offer data",
          variant: 'destructive',
        });
        
        await resetOffer();
        navigate('/new-offer', { replace: true });
      }
    } catch (error) {
      console.error("SavedOffersContent: Error loading offer:", error);
      toast({
        title: t.common.error,
        description: "Failed to load offer data",
        variant: 'destructive',
      });
      
      await resetOffer();
      navigate('/new-offer', { replace: true });
    } finally {
      setIsNavigating(false);
    }
  };

  return {
    isNavigating,
    handleOpenDraftOffer,
    handleCreateNewOffer,
    handleLoadOffer
  };
};
