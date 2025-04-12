
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import AccountButton from '@/components/AccountButton';

const TopNavBar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're on a page that should show the "Back to Offer" button
  const showBackButton = 
    location.pathname === '/settings' || 
    location.pathname === '/templates' ||
    location.pathname === '/saved-offers' ||
    location.pathname === '/saved-clients' ||
    location.pathname === '/saved-products' ||
    location.pathname === '/company-management';
    
  // Determine where to go back based on stored path or default to offer creation
  const handleBackToOffer = () => {
    const lastOfferPath = localStorage.getItem('lastOfferPath') || '/new-offer';
    navigate(lastOfferPath);
  };
  
  return (
    <div className="bg-background border-b py-2 px-4 hidden md:flex justify-between items-center">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBackToOffer}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.offer.backToOffer}
          </Button>
        )}
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
