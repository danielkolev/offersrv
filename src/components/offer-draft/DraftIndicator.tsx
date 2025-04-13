
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

export const DraftIndicator = () => {
  const { hasUserInteracted, lastSaved, setOffer } = useOffer();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [hasDraft, setHasDraft] = useState(false);
  
  // Проверка за наличие на чернова при зареждане на компонента
  useEffect(() => {
    const checkForDraft = async () => {
      if (!user) return;
      
      try {
        const draftOffer = await getLatestDraftFromDatabase(user.id);
        if (draftOffer) {
          setHasDraft(true);
        }
      } catch (error) {
        console.error("Error checking for draft:", error);
      }
    };
    
    checkForDraft();
  }, [user]);

  // Не показваме индикатора, ако няма чернова или потребителят не е правил промени
  if (!hasUserInteracted && !hasDraft) {
    return null;
  }

  const handleNavigateToOffer = async () => {
    if (user && hasDraft) {
      try {
        const draftOffer = await getLatestDraftFromDatabase(user.id);
        if (draftOffer) {
          // Зареждаме чернова директно в контекста
          setOffer(draftOffer);
        }
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
    // Навигиране към страницата за нова оферта
    navigate('/new-offer');
  };

  const formatLastSaved = () => {
    if (!lastSaved) return t.offer.notSavedYet;
    
    // Опростена информация за последното запазване
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
