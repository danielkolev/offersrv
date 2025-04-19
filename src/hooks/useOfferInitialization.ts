
import { useState, useEffect, useCallback } from 'react';
import { useOffer } from '@/context/offer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { getLatestDraftFromDatabase } from '@/components/management/offers/draftOffersService';
import { supabase } from '@/integrations/supabase/client';

export const useOfferInitialization = (
  shouldLoadDraft: boolean = false,
  draftId?: string | null
) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const { resetOffer, setOffer, updateCompanyInfo } = useOffer();
  const [isInitializing, setIsInitializing] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  // Initialize company data for the offer
  const loadCompanyData = useCallback(async () => {
    if (!user) return null;
    
    try {
      // Get the selected company ID from localStorage
      const companyId = localStorage.getItem('selectedCompanyId');
      
      if (!companyId) return null;
      
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', companyId)
        .single();
        
      if (error) throw error;
      
      if (data) {
        return {
          id: data.id,
          name: data.name,
          nameEn: data.name_en || '',
          vatNumber: data.vat_number || '',
          eikNumber: data.company_id || '', // Now using company_id
          address: data.address || '',
          addressEn: data.address_en || '',
          city: data.city || '',
          cityEn: data.city_en || '',
          country: data.country || '',
          countryEn: data.country_en || '',
          phone: data.phone || '',
          email: data.email || '',
          website: data.website || '',
          logo_url: data.logo_url || null,
          logo_url_en: data.logo_url_en || null,
          slogan: data.slogan || '',
          slogan_en: data.slogan_en || '',
          conclusion_text: data.conclusion_text || '',
          conclusion_text_en: data.conclusion_text_en || ''
        };
      }
      
      return null;
    } catch (err) {
      console.error('Error loading company data:', err);
      return null;
    }
  }, [user]);

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
            
            // Try to load company data for a new offer
            const companyData = await loadCompanyData();
            if (companyData) {
              updateCompanyInfo(companyData);
            }
          }
        } else {
          console.log('useOfferInitialization: No draft found, using default state');
          await resetOffer();
          
          // Try to load company data for a new offer
          const companyData = await loadCompanyData();
          if (companyData) {
            updateCompanyInfo(companyData);
          }
        }
      } else {
        // Обычная инициализация - сброс к начальному состоянию
        console.log('useOfferInitialization: Normal initialization, resetting offer state');
        await resetOffer();
        
        // Try to load company data for a new offer
        const companyData = await loadCompanyData();
        if (companyData) {
          updateCompanyInfo(companyData);
        }
      }
      
      setHasInitialized(true);
    } catch (error: any) {
      console.error('useOfferInitialization: Error during offer initialization:', error);
      setInitError(error.message);
      resetOffer();
    } finally {
      setIsInitializing(false);
    }
  }, [user, resetOffer, setOffer, hasInitialized, shouldLoadDraft, draftId, toast, t.offer.draftLoaded, t.offer.draftRestoredDescription, isInitializing, loadCompanyData, updateCompanyInfo]);

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
