
import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useOffer } from '@/context/offer/OfferContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

// Cache for storing company data
const companyCache = new Map<string, any>();

export const useCompanyData = (companyId: string | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateCompanyInfo } = useOffer();
  const { toast } = useToast();
  const { t } = useLanguage();
  const fetchedRef = useRef(false);
  const previousCompanyId = useRef<string | null>(null);
  const isMountedRef = useRef(true);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 3;
  const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Clear component state when unmounting
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Check cache validity
  const isValidCache = useCallback((cacheEntry: { data: any, timestamp: number }) => {
    const now = Date.now();
    return (now - cacheEntry.timestamp) < CACHE_EXPIRY_TIME;
  }, [CACHE_EXPIRY_TIME]);

  const fetchCompanyData = useCallback(async (id: string) => {
    if (!id) return;
    
    // Check cache first
    const cachedData = companyCache.get(id);
    if (cachedData && isValidCache(cachedData)) {
      console.log("useCompanyData: Using cached company data");
      updateCompanyInfo({
        id: cachedData.data.id,
        name: cachedData.data.name || '',
        nameEn: cachedData.data.name_en || '',
        vatNumber: cachedData.data.vat_number || '',
        eikNumber: cachedData.data.company_id || '',
        address: cachedData.data.address || '',
        addressEn: cachedData.data.address_en || '',
        city: cachedData.data.city || '',
        cityEn: cachedData.data.city_en || '',
        country: cachedData.data.country || '',
        countryEn: cachedData.data.country_en || '',
        phone: cachedData.data.phone || '',
        email: cachedData.data.email || '',
        website: cachedData.data.website || '',
        logo_url: cachedData.data.logo_url || null,
        logo_url_en: cachedData.data.logo_url_en || null,
        slogan: cachedData.data.slogan || '',
        slogan_en: cachedData.data.slogan_en || '',
        conclusion_text: cachedData.data.conclusion_text || '',
        conclusion_text_en: cachedData.data.conclusion_text_en || ''
      });
      fetchedRef.current = true;
      return;
    }
    
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
      
      // Check component is still mounted
      if (!isMountedRef.current) return;
      
      if (data) {
        console.log("useCompanyData: Company data loaded successfully");
        
        // Update company info in the offer context
        updateCompanyInfo({
          id: data.id,
          name: data.name || '',
          nameEn: data.name_en || '',
          vatNumber: data.vat_number || '',
          eikNumber: data.company_id || '',
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
        });
        
        // Store in cache with timestamp
        companyCache.set(id, {
          data,
          timestamp: Date.now()
        });
        
        fetchedRef.current = true;
        retryCountRef.current = 0;
      }
    } catch (err: any) {
      if (!isMountedRef.current) return;
      
      console.error('Error fetching company data:', err);
      setError(err.message);
      
      const isNetworkError = err.message?.includes('fetch') || 
                             err.message?.includes('network') ||
                             err.message?.includes('failed');
      
      if (isNetworkError && retryCountRef.current < MAX_RETRIES) {
        retryCountRef.current += 1;
        const retryDelay = Math.min(1000 * Math.pow(2, retryCountRef.current), 10000);
        
        console.log(`useCompanyData: Network error, retry ${retryCountRef.current}/${MAX_RETRIES} in ${retryDelay}ms`);
        
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
        }
        
        retryTimeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            fetchCompanyData(id);
          }
        }, retryDelay);
      } else if (retryCountRef.current >= MAX_RETRIES) {
        toast({
          title: t.common.error,
          description: `${t.common.loadingError}: ${err.message}`,
          variant: 'destructive'
        });
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [updateCompanyInfo, toast, t.common.error, t.common.loadingError, isValidCache]);

  useEffect(() => {
    if (companyId !== previousCompanyId.current) {
      fetchedRef.current = false;
      previousCompanyId.current = companyId;
      retryCountRef.current = 0;
      
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    }
    
    if (!companyId || fetchedRef.current) return;
    
    fetchCompanyData(companyId);
  }, [companyId, fetchCompanyData]);

  // Function to manually clear cache for a specific company or all companies
  const clearCache = useCallback((specificCompanyId?: string) => {
    if (specificCompanyId) {
      companyCache.delete(specificCompanyId);
    } else {
      companyCache.clear();
    }
  }, []);

  // Method to manually refresh data
  const refetch = useCallback(() => {
    if (companyId) {
      fetchedRef.current = false;
      retryCountRef.current = 0;
      // Clear the cache for this specific company
      companyCache.delete(companyId);
      fetchCompanyData(companyId);
    }
  }, [companyId, fetchCompanyData]);

  return { 
    isLoading, 
    error, 
    refetch,
    clearCache,
    fetchCompanyData 
  };
};
