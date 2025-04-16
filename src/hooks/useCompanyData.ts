
import { useState, useEffect, useRef, useCallback } from 'react';
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
  const fetchedRef = useRef(false);
  const previousCompanyId = useRef<string | null>(null);
  const isMountedRef = useRef(true);

  // Set isMounted to false when component unmounts
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchCompanyData = useCallback(async (id: string) => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("useCompanyData: Fetching company data for ID:", id);
      
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      // Check if component is still mounted before updating state
      if (!isMountedRef.current) return;
      
      if (data) {
        console.log("useCompanyData: Company data loaded successfully:", data);
        
        // Update the offer context with company data
        updateCompanyInfo({
          id: data.id,
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
        
        // Mark data as fetched
        fetchedRef.current = true;
      }
    } catch (err: any) {
      // Check if component is still mounted before updating state
      if (!isMountedRef.current) return;
      
      console.error('Error fetching company data:', err);
      setError(err.message);
      toast({
        title: t.common.error,
        description: `Error loading company data: ${err.message}`,
        variant: 'destructive'
      });
    } finally {
      // Check if component is still mounted before updating state
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [updateCompanyInfo, toast, t]);

  useEffect(() => {
    // Reset fetched status when company ID changes
    if (companyId !== previousCompanyId.current) {
      fetchedRef.current = false;
      previousCompanyId.current = companyId;
    }
    
    if (!companyId || fetchedRef.current) return;
    
    fetchCompanyData(companyId);
  }, [companyId, fetchCompanyData]);

  // Add a reset method to allow refetching in some cases
  const reset = useCallback(() => {
    fetchedRef.current = false;
    if (companyId) {
      fetchCompanyData(companyId);
    }
  }, [companyId, fetchCompanyData]);

  return { isLoading, error, reset, fetchCompanyData };
};
