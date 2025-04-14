
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import DraftIndicator from '@/components/offer-draft/DraftIndicator';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import AccountButton from '@/components/AccountButton';
import MobileNavToggle from './MobileNavToggle';

interface NavbarUtilitiesProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  showInMobile?: boolean;
}

const NavbarUtilities = ({ isMobileMenuOpen, setIsMobileMenuOpen, showInMobile = false }: NavbarUtilitiesProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className={`flex ${showInMobile ? 'flex-col' : 'items-center'} gap-4`}>
      {/* Draft indicator */}
      {user && <DraftIndicator />}

      {/* Language and Currency Switchers */}
      <div className={`${showInMobile ? 'flex flex-col' : 'flex items-center'} gap-3`}>
        <LanguageSwitcher />
        <CurrencySwitcher />
      </div>
      
      {/* Account Management */}
      {user ? (
        <AccountButton />
      ) : (
        <Button asChild variant="default" size="sm">
          <Link to="/login">{t.auth.signIn}</Link>
        </Button>
      )}

      {/* Mobile Menu - only show when not in mobile view */}
      {!showInMobile && (
        <div className="md:hidden">
          <MobileNavToggle 
            isMobileMenuOpen={isMobileMenuOpen} 
            setIsMobileMenuOpen={setIsMobileMenuOpen} 
          />
        </div>
      )}
    </div>
  );
};

export default NavbarUtilities;
