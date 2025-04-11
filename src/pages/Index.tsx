
import React, { useState } from 'react';
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

const Index = () => {
  const [activeTab, setActiveTab] = useState('edit');
  const { t } = useLanguage();

  return (
    <OfferProvider>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-offer-gray">
            {t.offerTitle}
          </h1>
          <div className="flex items-center gap-4">
            <CurrencySwitcher />
            <LanguageSwitcher />
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
