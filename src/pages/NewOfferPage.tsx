
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import OfferAccordion from '@/components/wizard/OfferAccordion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const NewOfferPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoadingCompanyData, setIsLoadingCompanyData] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  // Fetch user's default company or first company on load - memoized to avoid unnecessary re-renders
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
        // Check localStorage for previously selected company
        const storedCompanyId = localStorage.getItem('selectedCompanyId');
        
        if (storedCompanyId && memberData.some(m => m.organization_id === storedCompanyId)) {
          setSelectedCompanyId(storedCompanyId);
        } else {
          setSelectedCompanyId(memberData[0].organization_id);
        }
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
  }, [user, toast, t.common.error]);

  // Only fetch default company on initial mount
  useEffect(() => {
    fetchDefaultCompany();
  }, []);  // Removed dependency on fetchDefaultCompany to prevent re-runs

  const handleSelectCompany = useCallback((companyId: string) => {
    setSelectedCompanyId(companyId);
    localStorage.setItem('selectedCompanyId', companyId);
  }, []);

  // Memoized unauthorized state to avoid unnecessary re-renders
  const unauthorizedState = useMemo(() => (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">{t.common.unauthorized}</h2>
        <p className="mt-2 text-gray-600">{t.auth.notAuthenticated}</p>
      </div>
    </div>
  ), [t.common.unauthorized, t.auth.notAuthenticated]);

  if (!user) {
    return unauthorizedState;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-offer-gray">
          {t.offer.createOffer}
        </h1>
      </div>
      
      <OfferAccordion 
        isLoadingCompanyData={isLoadingCompanyData}
        fetchError={fetchError}
        selectedCompanyId={selectedCompanyId}
        onSelectCompany={handleSelectCompany}
      />
    </div>
  );
};

export default React.memo(NewOfferPage);
