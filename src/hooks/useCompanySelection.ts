
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

  // Fetch user's company
  const fetchUserCompany = useCallback(async () => {
    if (!user) return;
    
    setIsLoadingCompanyData(true);
    
    try {
      console.log("useCompanySelection: Fetching user's company");
      
      // First try to find a company where the user is the owner
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
      
      // If no owned company, look for companies the user is a member of
      const { data: memberData, error: memberError } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', user.id)
        .limit(1);
        
      if (memberError) throw memberError;
      
      // If user is a member of a company, use that one
      if (memberData && memberData.length > 0) {
        const companyId = memberData[0].organization_id;
        console.log("useCompanySelection: Found user's membership company:", companyId);
        setSelectedCompanyId(companyId);
        localStorage.setItem('selectedCompanyId', companyId);
      } else {
        // User has no companies yet
        console.log("useCompanySelection: User has no companies yet");
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
    fetchError,
    fetchUserCompany
  };
};
