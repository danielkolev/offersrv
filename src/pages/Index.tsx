
import React, { useState, useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import CompanyManager from '@/components/company/CompanyManager';
import { supabase } from '@/integrations/supabase/client';
import { Company } from '@/types/company';

const Index = () => {
  const [activeTab, setActiveTab] = useState('edit');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [isLoadingCompanyData, setIsLoadingCompanyData] = useState(false);
  const { t } = useLanguage();
  const { signOut, user } = useAuth();

  // Make updateCompanyInfo available globally for the Index component to use
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.updateCompanyInfo = (companyInfo) => {
        // This function will be defined by OfferContext when it's rendered
        console.log('Update company info called:', companyInfo);
      };
    }
  }, []);

  const handleSelectCompany = async (companyId: string) => {
    setSelectedCompanyId(companyId);
    if (companyId) {
      setIsLoadingCompanyData(true);
      try {
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .eq('id', companyId)
          .single();
          
        if (error) throw error;
        
        // Update the company info in the context
        if (data && window.updateCompanyInfo) {
          window.updateCompanyInfo({
            name: data.name,
            vatNumber: data.vat_number,
            address: data.address,
            // Supabase organizations table doesn't have city and country fields
            // Use empty strings as fallbacks
            city: '', 
            country: '', 
            phone: data.phone,
            email: data.email,
            // Supabase organizations table doesn't have website field
            // Use empty string as fallback
            website: '', 
            logo: data.logo_url
          });
        }
      } catch (error) {
        console.error('Error loading company data:', error);
      } finally {
        setIsLoadingCompanyData(false);
      }
    }
  };

  return (
    <OfferProvider>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-offer-gray">
            {t.offerTitle}
          </h1>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <CompanyManager onSelectCompany={handleSelectCompany} />
            <CurrencySwitcher />
            <LanguageSwitcher />
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut size={16} className="mr-1" />
              {t.auth.signOut}
            </Button>
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
