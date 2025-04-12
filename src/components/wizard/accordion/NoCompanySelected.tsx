
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const NoCompanySelected: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center py-8">
      {t?.company?.selectFirst || "Please select a company first"}
    </div>
  );
};

export default NoCompanySelected;
