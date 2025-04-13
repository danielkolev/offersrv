
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOffer } from '@/context/offer';
import { FileEdit } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';
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
    // Navigate directly to the new-offer page
    navigate('/new-offer');
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
