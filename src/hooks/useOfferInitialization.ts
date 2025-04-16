
import { useState, useEffect, useCallback } from 'react';
import { useOffer } from '@/context/offer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { getLatestDraftFromDatabase } from '@/components/management/offers/draftOffersService';

export const useOfferInitialization = (
  shouldLoadDraft: boolean = false,
  draftId?: string | null
) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const { resetOffer, setOffer } = useOffer();
  const [isInitializing, setIsInitializing] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  // Инициализация состояния оферты - загрузка черновика или сброс
  const initializeOfferState = useCallback(async () => {
    if (!user || hasInitialized || isInitializing) return;
    
    setIsInitializing(true);
    setInitError(null);
    
    try {
      console.log("useOfferInitialization: Initializing offer state, shouldLoadDraft:", shouldLoadDraft);
      
      if (shouldLoadDraft || draftId) {
        console.log("useOfferInitialization: Loading draft");
        const draftOffer = await getLatestDraftFromDatabase(user.id);
        
        if (draftOffer) {
          console.log('useOfferInitialization: Draft found with data:', draftOffer);
          
          // Убедимся, что данные оферты валидны перед установкой
          if (draftOffer.client && draftOffer.products && draftOffer.details) {
            // Сначала очистим предыдущее состояние
            await resetOffer();
            
            // Установим состояние с данными черновика
            setOffer(draftOffer);
            
            toast({
              title: t.offer.draftLoaded,
              description: t.offer.draftRestoredDescription,
            });
            
            console.log('useOfferInitialization: Draft loaded successfully');
          } else {
            console.error('useOfferInitialization: Draft has invalid data', draftOffer);
            await resetOffer();
          }
        } else {
          console.log('useOfferInitialization: No draft found, using default state');
          await resetOffer();
        }
      } else {
        // Обычная инициализация - сброс к начальному состоянию
        console.log('useOfferInitialization: Normal initialization, resetting offer state');
        await resetOffer();
      }
      
      setHasInitialized(true);
    } catch (error: any) {
      console.error('useOfferInitialization: Error during offer initialization:', error);
      setInitError(error.message);
      resetOffer();
    } finally {
      setIsInitializing(false);
    }
  }, [user, resetOffer, setOffer, hasInitialized, shouldLoadDraft, draftId, toast, t.offer.draftLoaded, t.offer.draftRestoredDescription, isInitializing]);

  // Запускаем инициализацию при монтировании компонента
  useEffect(() => {
    initializeOfferState();
  }, [initializeOfferState]);

  return {
    isInitializing,
    hasInitialized,
    initError,
    resetInitialization: () => setHasInitialized(false)
  };
};
