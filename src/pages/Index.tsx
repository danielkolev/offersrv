
import React from 'react';
import { OfferProvider } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import { useAuth } from '@/context/AuthContext';
import AccountButton from '@/components/AccountButton';
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
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <CurrencySwitcher />
            <LanguageSwitcher />
            <AccountButton />
          </div>
        </div>
        
        <HomeContent />
      </div>
    </OfferProvider>
  );
};

export default Index;
