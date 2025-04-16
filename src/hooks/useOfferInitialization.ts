
import { useState, useEffect } from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { useToast } from './use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useCompanyData } from './useCompanyData';

export const useOfferInitialization = (
  shouldLoadDraft: boolean = false,
  draftId?: string
) => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  const { updateCompanyInfo } = useOffer();
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    const initializeOffer = async () => {
      setIsInitializing(true);
      setInitError(null);

      try {
        // Get selected company ID from localStorage
        const selectedCompanyId = localStorage.getItem('selectedCompanyId');
        
        if (selectedCompanyId) {
          // Fetch company data
          const { data: companyData, error } = await supabase
            .from('organizations')
            .select('*')
            .eq('id', selectedCompanyId)
            .single();

          if (error) throw error;

          if (companyData) {
            // Update offer with company data
            updateCompanyInfo({
              id: companyData.id,
              name: companyData.name || '',
              vatNumber: companyData.vat_number || '',
              address: companyData.address || '',
              city: companyData.city || '',
              country: companyData.country || '',
              phone: companyData.phone || '',
              email: companyData.email || '',
              website: companyData.website || '',
              logo: companyData.logo_url || null,
              slogan: companyData.slogan || ''
            });
          }
        }

      } catch (error: any) {
        console.error('Error initializing offer:', error);
        setInitError(error.message);
        toast({
          title: t.common.error,
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsInitializing(false);
      }
    };

    initializeOffer();
  }, [updateCompanyInfo, toast, t.common.error]);

  return {
    isInitializing,
    initError
  };
};
