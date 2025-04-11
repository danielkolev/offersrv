
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { OfferProvider } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import { useAuth } from '@/context/AuthContext';
import AccountButton from '@/components/AccountButton';
import CompanyManager from '@/components/company/CompanyManager';
import ManagePanel from '@/components/management/ManagePanel';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import OfferWizard from '@/components/wizard/OfferWizard';

const Index = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [isLoadingCompanyData, setIsLoadingCompanyData] = useState(false);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fetchRetryCount = useRef(0);
  const MAX_RETRIES = 3;

  // Make updateCompanyInfo available globally for the Index component to use
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.updateCompanyInfo = (companyInfo) => {
        // This function will be defined by OfferContext when it's rendered
        console.log('Update company info called:', companyInfo);
      };
    }
  }, []);

  const handleSelectCompany = useCallback(async (companyId: string) => {
    if (!companyId) return;
    
    setSelectedCompanyId(companyId);
    setIsLoadingCompanyData(true);
    setFetchError(false);
    
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', companyId)
        .single();
        
      if (error) {
        console.error('Error loading company data:', error);
        setFetchError(true);
        
        // If repeated errors happen, show a toast notification
        if (fetchRetryCount.current >= MAX_RETRIES) {
          toast({
            title: t.common.error,
            description: error.message,
            variant: 'destructive'
          });
        }
        
        fetchRetryCount.current++;
        return;
      }
      
      fetchRetryCount.current = 0;
      
      // Update the company info in the context
      if (data && window.updateCompanyInfo) {
        window.updateCompanyInfo({
          name: data.name || '',
          vatNumber: data.vat_number || '',
          address: data.address || '',
          city: data.city || '', 
          country: data.country || '', 
          phone: data.phone || '',
          email: data.email || '',
          website: data.website || '', 
          logo: data.logo_url || null
        });
      }
    } catch (error: any) {
      console.error('Error loading company data:', error);
      setFetchError(true);
      
      // If repeated errors happen, show a toast notification
      if (fetchRetryCount.current >= MAX_RETRIES) {
        toast({
          title: t.common.error,
          description: error.message,
          variant: 'destructive'
        });
      }
      
      fetchRetryCount.current++;
    } finally {
      setIsLoadingCompanyData(false);
    }
  }, [t, toast]);

  return (
    <OfferProvider>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
          <div className="flex items-center">
            <img 
              src="/logo.svg" 
              alt="Offer Forge Logo" 
              className="h-8 mr-3" 
            />
            <h1 className="text-3xl font-bold text-offer-gray">
              {t.offerTitle}
            </h1>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <CurrencySwitcher />
            <LanguageSwitcher />
            <AccountButton />
          </div>
        </div>
        
        {user && <ManagePanel />}
        
        <OfferWizard 
          isLoadingCompanyData={isLoadingCompanyData}
          fetchError={fetchError}
          selectedCompanyId={selectedCompanyId}
          onSelectCompany={handleSelectCompany}
        />
      </div>
    </OfferProvider>
  );
};

export default Index;
