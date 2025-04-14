
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOffer } from '@/context/offer';
import { useAuth } from '@/context/AuthContext';
import { FileEdit } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { getLatestDraftFromDatabase } from '@/components/management/offers/draftOffersService';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Helper to check if a draft has meaningful content
const hasMeaningfulContent = (draft: any): boolean => {
  if (!draft) return false;
  
  // Check if client has at least a name
  const hasClientInfo = draft.client?.name && draft.client.name.trim() !== '';
  
  // Check if there are any products
  const hasProducts = draft.products && draft.products.length > 0;
  
  // Check if there are meaningful offer details (notes, custom number, etc.)
  const hasOfferDetails = 
    (draft.details?.notes && draft.details.notes.trim() !== '') || 
    (draft.details?.offerNumber && 
     draft.details.offerNumber !== '00000' && 
     draft.details.offerNumber.trim() !== '');
  
  return hasClientInfo || hasProducts || hasOfferDetails;
};

export const DraftIndicator = () => {
  const { hasUserInteracted, lastSaved, setOffer, resetOffer } = useOffer();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [hasDraft, setHasDraft] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Check for draft presence when component loads
  useEffect(() => {
    const checkForDraft = async () => {
      if (!user) return;
      
      try {
        const draftOffer = await getLatestDraftFromDatabase(user.id);
        // Only set hasDraft to true if the draft has meaningful content
        if (draftOffer && hasMeaningfulContent(draftOffer)) {
          setHasDraft(true);
        } else {
          setHasDraft(false);
        }
      } catch (error) {
        console.error("Error checking for draft:", error);
      }
    };
    
    checkForDraft();
    
    // Re-check every 30 seconds in case a draft is created in another tab
    const interval = setInterval(checkForDraft, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // Don't show indicator if there's no draft and user hasn't interacted
  if ((!hasUserInteracted && !hasDraft) || !hasDraft) {
    return null;
  }

  const handleNavigateToOffer = async () => {
    if (isNavigating) return; // Prevent multiple clicks
    setIsNavigating(true);
    
    try {
      if (user && hasDraft) {
        console.log("DraftIndicator: Starting draft loading process");
        
        // First check if we can get the draft
        const draftOffer = await getLatestDraftFromDatabase(user.id);
        
        if (draftOffer && hasMeaningfulContent(draftOffer)) {
          console.log("DraftIndicator: Draft found with data:", draftOffer);
          
          // Navigate first, then we'll load the draft in NewOfferPage
          navigate('/new-offer', { 
            state: { 
              loadDraft: true,
              draftId: user.id // Use user ID as draft identifier
            } 
          });
        } else {
          console.log("DraftIndicator: No valid draft found, creating new offer");
          await resetOffer();
          navigate('/new-offer');
        }
      } else {
        // Just navigate to new offer page
        console.log("DraftIndicator: No user or draft, creating new offer");
        navigate('/new-offer');
      }
    } catch (error) {
      console.error("Error in draft navigation:", error);
      // Fall back to starting a new offer
      await resetOffer();
      navigate('/new-offer');
    } finally {
      setIsNavigating(false);
    }
  };

  const formatLastSaved = () => {
    if (!lastSaved) return t.offer.notSavedYet;
    
    // Simplified last saved info
    const now = new Date();
    const diffMs = now.getTime() - lastSaved.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) {
      return t.offer.saved;
    } else if (diffMins < 60) {
      return `${diffMins} ${language === 'bg' ? 'мин.' : 'min.'}`;
    } else {
      const diffHours = Math.round(diffMins / 60);
      return `${diffHours} ${language === 'bg' ? 'ч.' : 'hr.'}`;
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline" 
            className="cursor-pointer bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 flex items-center gap-1.5"
            onClick={handleNavigateToOffer}
          >
            <FileEdit size={14} />
            <span>{t.offer.draftInProgress}</span>
            <span className="text-xs bg-amber-100 px-1.5 py-0.5 rounded-full">
              {formatLastSaved()}
            </span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t.offer.returnToDraft}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DraftIndicator;
