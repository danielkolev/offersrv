
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import AccountButton from '@/components/AccountButton';
import DraftIndicator from '@/components/offer-draft/DraftIndicator';
import { useIsMobile } from '@/hooks/use-mobile';

const TopNavBar = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Hide the draft indicator on the new offer page itself
  const shouldShowDraftIndicator = location.pathname !== '/new-offer';
  
  return (
    <>
      {/* Desktop navigation */}
      <div className="bg-background border-b py-2 px-4 hidden md:flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Left side is empty now */}
        </div>
        
        <div className="flex items-center gap-4">
          {shouldShowDraftIndicator && <DraftIndicator />}
          <LanguageSwitcher />
          <CurrencySwitcher />
          <AccountButton />
        </div>
      </div>
      
      {/* Mobile indicator - shown at the top when there's a draft */}
      {isMobile && shouldShowDraftIndicator && (
        <div className="md:hidden bg-amber-50 px-4 py-2 flex justify-center">
          <DraftIndicator />
        </div>
      )}
    </>
  );
};

export default TopNavBar;
