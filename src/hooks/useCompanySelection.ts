
import { useState, useEffect, useCallback } from 'react';
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

  // Find the user's company
  useEffect(() => {
    if (hasInitialized && !selectedCompanyId && user) {
      fetchUserCompany();
    }
  }, [hasInitialized, user]);

  // Fetch user's company with retry mechanism
  const fetchUserCompany = useCallback(async () => {
    if (!user) return;
    
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
        return;
      }
      
      setFetchError(false);
    } catch (error: any) {
      console.error('Error fetching company data:', error);
      setFetchError(true);
      
      // Don't show toast error for network issues - they're common and annoying
      if (!error.message?.includes('Failed to fetch')) {
        toast({
          title: t.common.error,
          description: error.message,
          variant: 'destructive'
        });
      }
    } finally {
      setIsLoadingCompanyData(false);
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
