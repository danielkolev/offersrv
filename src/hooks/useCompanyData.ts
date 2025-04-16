
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
  const retryCountRef = useRef(0);
  const fetchInProgressRef = useRef(false);
  const maxRetries = 3;

  // Set isMounted to false when component unmounts
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchCompanyData = useCallback(async (id: string) => {
    if (!id || fetchInProgressRef.current) return;
    
    fetchInProgressRef.current = true;
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
        console.log("useCompanyData: Company data loaded successfully");
        
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
        // Reset retry count on success
        retryCountRef.current = 0;
      }
    } catch (error: any) {
      // Check if component is still mounted before updating state
      if (!isMountedRef.current) return;
      
      console.error('Error fetching company data:', error);
      setError(error.message);

      // If it's a network error and we haven't reached max retries, try again
      if (error.message?.includes('Failed to fetch') && retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        console.log(`Attempt ${retryCountRef.current} failed:`, error);
        
        // Exponential backoff: wait longer between each retry
        const delay = Math.pow(2, retryCountRef.current) * 1000;
        
        // Schedule retry after delay
        setTimeout(() => {
          if (isMountedRef.current) {
            fetchInProgressRef.current = false;
            fetchCompanyData(id);
          }
        }, delay);
        
        return;
      }
      
      // Only show toast for terminal errors (after retries or non-network errors)
      if ((!error.message?.includes('Failed to fetch') || retryCountRef.current >= maxRetries) && isMountedRef.current) {
        toast({
          title: t.common.error,
          description: `Error loading company data: ${error.message}`,
          variant: 'destructive'
        });
      }
    } finally {
      // Check if component is still mounted before updating state
      if (isMountedRef.current && (retryCountRef.current >= maxRetries || !error)) {
        setIsLoading(false);
        fetchInProgressRef.current = false;
      }
    }
  }, [updateCompanyInfo, toast, t]);

  useEffect(() => {
    // Reset fetched status when company ID changes
    if (companyId !== previousCompanyId.current) {
      fetchedRef.current = false;
      retryCountRef.current = 0;
      fetchInProgressRef.current = false;
      previousCompanyId.current = companyId;
    }
    
    if (!companyId || fetchedRef.current || fetchInProgressRef.current) return;
    
    fetchCompanyData(companyId);
  }, [companyId, fetchCompanyData]);

  // Add a reset method to allow refetching in some cases
  const reset = useCallback(() => {
    fetchedRef.current = false;
    retryCountRef.current = 0;
    fetchInProgressRef.current = false;
    if (companyId) {
      fetchCompanyData(companyId);
    }
  }, [companyId, fetchCompanyData]);

  return { isLoading, error, reset, fetchCompanyData };
};
