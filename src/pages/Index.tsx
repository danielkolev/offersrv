
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OfferProvider } from '@/context/OfferContext';
import CompanyInfoForm from '@/components/CompanyInfoForm';
import ClientInfoForm from '@/components/ClientInfoForm';
import OfferDetailsForm from '@/components/OfferDetailsForm';
import ProductsForm from '@/components/ProductsForm';
import OfferPreview from '@/components/OfferPreview';

const Index = () => {
  const [activeTab, setActiveTab] = useState('edit');

  return (
    <OfferProvider>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-offer-gray">
          Professional Offer Template
        </h1>
        
        <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="edit">Edit Offer</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
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
                Preview Offer
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
                Back to Edit
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </OfferProvider>
  );
};

export default Index;
