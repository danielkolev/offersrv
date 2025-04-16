
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

export const useCompanySelection = (hasInitialized: boolean) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [isLoadingCompanyData, setIsLoadingCompanyData] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const isFetchingRef = useRef(false);
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  // Find the user's company
  useEffect(() => {
    if (hasInitialized && !selectedCompanyId && user && !isFetchingRef.current) {
      fetchUserCompany();
    }
  }, [hasInitialized, user, selectedCompanyId]);

  // Fetch user's company with retry mechanism
  const fetchUserCompany = useCallback(async () => {
    if (!user || isFetchingRef.current) return;
    
    isFetchingRef.current = true;
    setIsLoadingCompanyData(true);
    
    try {
      console.log("useCompanySelection: Fetching user's company");
      
      // Try to find a company where the user is the owner
      const { data: ownedCompanies, error: ownedError } = await supabase
        .from('organizations')
        .select('id')
        .eq('owner_id', user.id)
        .limit(1);
        
      if (ownedError) throw ownedError;
      
      // If user has an owned company, use it
      if (ownedCompanies && ownedCompanies.length > 0) {
        const companyId = ownedCompanies[0].id;
        console.log("useCompanySelection: Found user's owned company:", companyId);
        setSelectedCompanyId(companyId);
        localStorage.setItem('selectedCompanyId', companyId);
        setFetchError(false);
        retryCountRef.current = 0;
        return;
      }
      
      setFetchError(false);
      retryCountRef.current = 0;
    } catch (error: any) {
      console.error('Error fetching company data:', error);
      
      // If network error and retries remain, try again
      if (error.message?.includes('Failed to fetch') && retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        console.log(`Attempt ${retryCountRef.current} failed. Retrying...`);
        
        // Exponential backoff: wait longer between each retry
        const delay = Math.pow(2, retryCountRef.current) * 1000;
        setTimeout(() => {
          isFetchingRef.current = false;
          fetchUserCompany();
        }, delay);
        
        return;
      }
      
      setFetchError(true);
      
      // Only show toast for terminal errors (after retries or non-network errors)
      if (!error.message?.includes('Failed to fetch') || retryCountRef.current >= maxRetries) {
        toast({
          title: t.common.error,
          description: error.message,
          variant: 'destructive'
        });
      }
    } finally {
      if (retryCountRef.current >= maxRetries || !isFetchingRef.current) {
        setIsLoadingCompanyData(false);
        isFetchingRef.current = false;
      }
    }
  }, [user, toast, t]);

  return {
    selectedCompanyId,
    setSelectedCompanyId,
    isLoadingCompanyData,
    fetchError,
    fetchUserCompany
  };
};
