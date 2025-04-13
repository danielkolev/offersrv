
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOffer } from '@/context/offer';
import { FilePenLine, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const DraftIndicator = () => {
  const { hasUserInteracted, lastSaved } = useOffer();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Don't show indicator if there's no draft
  if (!hasUserInteracted) {
    return null;
  }

  const handleNavigateToOffer = () => {
    // Get the last offer path from localStorage, defaulting to /new-offer
    const lastOfferPath = localStorage.getItem('lastOfferPath') || '/new-offer';
    navigate(lastOfferPath);
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
    <div className="fixed bottom-4 right-4 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={handleNavigateToOffer}
              className="bg-primary text-white shadow-lg flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-primary/90"
            >
              <FilePenLine size={18} />
              <span className="text-sm font-medium">{t.offer.draftInProgress}</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {formatLastSaved()}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t.offer.returnToDraft}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DraftIndicator;
