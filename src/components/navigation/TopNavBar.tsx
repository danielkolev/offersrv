
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import AccountButton from '@/components/AccountButton';
import DraftIndicator from '@/components/offer-draft/DraftIndicator';

const TopNavBar = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-background border-b py-2 px-4 hidden md:flex justify-between items-center">
      <div className="flex items-center gap-4">
        <DraftIndicator />
      </div>
      
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <CurrencySwitcher />
        <AccountButton />
      </div>
    </div>
  );
};

export default TopNavBar;
