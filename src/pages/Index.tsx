
import React from 'react';
import { OfferProvider } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import HomeContent from '@/pages/HomeContent';

const Index = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <OfferProvider>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-offer-gray">
            {t.common.welcome}
          </h1>
        </div>
        
        <HomeContent />
      </div>
    </OfferProvider>
  );
};

export default Index;
