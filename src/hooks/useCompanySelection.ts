
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

  // Use the company selected in the main menu (stored in localStorage)
  useEffect(() => {
    if (hasInitialized && !selectedCompanyId) {
      const storedCompanyId = localStorage.getItem('selectedCompanyId');
      if (storedCompanyId) {
        console.log("useCompanySelection: Using company from localStorage:", storedCompanyId);
        setSelectedCompanyId(storedCompanyId);
      } else {
        // If no company is selected in the main menu, fetch the default company
        fetchDefaultCompany();
      }
    }
  }, [hasInitialized]);

  // Fetch user's default company or first company if none is selected
  const fetchDefaultCompany = useCallback(async () => {
    if (!user) return;
    
    setIsLoadingCompanyData(true);
    
    try {
      // Get companies the user is a member of through the organization_members table
      const { data: memberData, error: memberError } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', user.id);
        
      if (memberError) throw memberError;
      
      // If user has companies, select the first one as default
      if (memberData && memberData.length > 0) {
        const defaultCompanyId = memberData[0].organization_id;
        console.log("useCompanySelection: Setting default company ID:", defaultCompanyId);
        setSelectedCompanyId(defaultCompanyId);
        localStorage.setItem('selectedCompanyId', defaultCompanyId);
      }
      
      setFetchError(false);
    } catch (error: any) {
      console.error('Error fetching company data:', error);
      setFetchError(true);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoadingCompanyData(false);
    }
  }, [user, toast, t]);

  return {
    selectedCompanyId,
    setSelectedCompanyId,
    isLoadingCompanyData,
    fetchError
  };
};
