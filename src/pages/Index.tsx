
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import HomeContent from '@/pages/HomeContent';

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-offer-gray">
          {t.common.welcome}
        </h1>
      </div>
      
      <HomeContent />
    </div>
  );
};

export default Index;
