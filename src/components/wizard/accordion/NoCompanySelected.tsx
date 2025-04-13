
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { NoCompanySelectedProps } from './types';
import { Building2, ArrowUp } from 'lucide-react';

const NoCompanySelected: React.FC<NoCompanySelectedProps> = ({ message }) => {
  const { t } = useLanguage();
  const displayMessage = message || t?.company?.selectFirst || "Please select a company from the dropdown above.";

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-gray-100 rounded-full p-4">
          <Building2 className="h-8 w-8 text-gray-500" />
        </div>
        <p className="text-lg font-medium">{displayMessage}</p>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <ArrowUp className="h-4 w-4 mr-1 animate-bounce" />
          <span>{t?.company?.useSelector || "Use the company selector above to continue"}</span>
        </div>
      </div>
    </div>
  );
};

export default NoCompanySelected;
