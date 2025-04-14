
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import DraftIndicator from '@/components/offer-draft/DraftIndicator';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import AccountButton from '@/components/AccountButton';
import MobileNavToggle from './MobileNavToggle';

interface NavbarUtilitiesProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const NavbarUtilities = ({ isMobileMenuOpen, setIsMobileMenuOpen }: NavbarUtilitiesProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-4">
      {/* Draft indicator */}
      {user && <DraftIndicator />}

      {/* Language Switcher */}
      <LanguageSwitcher />
      
      {/* Account Management */}
      {user ? (
        <AccountButton />
      ) : (
        <Button asChild variant="default" size="sm">
          <Link to="/login">{t.auth.signIn}</Link>
        </Button>
      )}

      {/* Mobile Menu */}
      <MobileNavToggle 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
    </div>
  );
};

export default NavbarUtilities;
