
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { NoCompanySelectedProps } from './types';

const NoCompanySelected: React.FC<NoCompanySelectedProps> = ({ message }) => {
  const { t } = useLanguage();
  const displayMessage = message || t?.company?.selectFirst || "Please select a company first";

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center py-8">
      {displayMessage}
    </div>
  );
};

export default NoCompanySelected;
