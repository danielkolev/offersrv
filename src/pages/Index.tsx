
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OfferProvider } from '@/context/OfferContext';
import CompanyInfoForm from '@/components/CompanyInfoForm';
import ClientInfoForm from '@/components/ClientInfoForm';
import OfferDetailsForm from '@/components/OfferDetailsForm';
import ProductsForm from '@/components/ProductsForm';
import OfferPreview from '@/components/OfferPreview';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import { useAuth } from '@/context/AuthContext';
import AccountButton from '@/components/AccountButton';
import CompanyManager from '@/components/company/CompanyManager';
import { supabase } from '@/integrations/supabase/client';
import { Company } from '@/types/company';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('edit');
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
          city: '', // Fallback for missing fields
          country: '', // Fallback for missing fields
          phone: data.phone || '',
          email: data.email || '',
          website: '', // Fallback for missing fields
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
            <CompanyManager onSelectCompany={handleSelectCompany} />
            <CurrencySwitcher />
            <LanguageSwitcher />
            <AccountButton />
          </div>
        </div>
        
        <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="edit">{t.common.edit}</TabsTrigger>
              <TabsTrigger value="preview">{t.common.preview}</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="edit" className="space-y-6">
            {selectedCompanyId ? (
              isLoadingCompanyData ? (
                <div className="text-center py-4">{t.common.loading}</div>
              ) : fetchError ? (
                <div className="text-center py-4 text-red-500">
                  {t.common.error}
                </div>
              ) : (
                <>
                  <CompanyInfoForm />
                  <ClientInfoForm />
                  <OfferDetailsForm />
                  <ProductsForm />
                  
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setActiveTab('preview')}
                      className="px-6 py-2 bg-offer-blue text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      {t.common.previewOffer}
                    </button>
                  </div>
                </>
              )
            ) : (
              <div className="text-center py-8">
                {t.company.selectFirst}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="preview">
            <OfferPreview />
            
            <div className="flex justify-center mt-8 no-print">
              <button
                onClick={() => setActiveTab('edit')}
                className="px-6 py-2 border border-offer-gray text-offer-gray rounded-md hover:bg-gray-100 transition-colors"
              >
                {t.common.backToEdit}
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </OfferProvider>
  );
};

export default Index;
