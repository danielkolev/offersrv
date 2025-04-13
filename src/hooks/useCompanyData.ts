
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useOffer } from '@/context/offer/OfferContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

export const useCompanyData = (companyId: string | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateCompanyInfo } = useOffer();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    if (!companyId) return;
    
    const fetchCompanyData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .eq('id', companyId)
          .single();
        
        if (error) throw error;
        
        if (data) {
          // Update the offer context with company data
          updateCompanyInfo({
            name: data.name || '',
            vatNumber: data.vat_number || '',
            address: data.address || '',
            city: data.city || '',
            country: data.country || '',
            phone: data.phone || '',
            email: data.email || '',
            website: data.website || '',
            logo: data.logo_url || null,
            slogan: data.slogan || ''
          });
        }
      } catch (err: any) {
        console.error('Error fetching company data:', err);
        setError(err.message);
        toast({
          title: t.common.error,
          description: `Error loading company data: ${err.message}`,
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompanyData();
  }, [companyId, updateCompanyInfo, toast, t]);

  return { isLoading, error };
};
