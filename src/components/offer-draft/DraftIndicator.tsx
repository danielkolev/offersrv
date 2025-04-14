
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOffer } from '@/context/offer';
import { useAuth } from '@/context/AuthContext';
import { FileEdit } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { getLatestDraftFromDatabase } from '@/components/management/offers/draft';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const DraftIndicator = () => {
  const { hasUserInteracted, lastSaved } = useOffer();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasDraft, setHasDraft] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Don't show indicator on /saved-products page as it has its own OfferProvider
  if (location.pathname === '/saved-products') {
    return null;
  }
  
  // Check for draft presence when component loads
  useEffect(() => {
    const checkForDraft = async () => {
      if (!user) return;
      
      try {
        const draftOffer = await getLatestDraftFromDatabase(user.id);
        if (draftOffer) {
          console.log("DraftIndicator: Draft found with data");
          setHasDraft(true);
        } else {
          console.log("DraftIndicator: No draft found");
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
        console.log("DraftIndicator: Navigating to draft offer page");
        
        // Generate timestamp to ensure we get a fresh state
        const timestamp = new Date().getTime();
        
        // Navigate with clear state that we want to load this draft
        navigate('/new-offer', { 
          state: { 
            loadDraft: true,
            draftId: user.id,
            timestamp
          },
          replace: true
        });
      } else {
        // Just navigate to new offer page
        console.log("DraftIndicator: No draft or user, navigating to new offer page");
        navigate('/new-offer', { replace: true });
      }
    } catch (error) {
      console.error("Error in draft navigation:", error);
      // Fall back to starting a new offer
      navigate('/new-offer', { replace: true });
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
