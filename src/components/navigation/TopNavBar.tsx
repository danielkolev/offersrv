
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, X, LogOut, User, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import DraftIndicator from '@/components/offer-draft/DraftIndicator';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import AccountButton from '@/components/AccountButton';

const TopNavBar = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: t.auth.signOut,
        description: t.auth.signOutSuccess,
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: t.common.error,
        description: t.auth.signOutError,
        variant: 'destructive',
      });
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-all duration-100",
        scrolled ? "shadow-sm" : ""
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="font-bold text-xl hidden md:inline-block">OfferFlow</span>
          </Link>
        </div>

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

          {/* Mobile Menu - Now this only toggles the sidebar */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[80%] max-w-[280px]">
              {/* The sidebar content will be rendered here through MainSidebar */}
              <div className="h-full">
                <MainSidebar isMobile={true} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

// Import at the top
import MainSidebar from './MainSidebar';

export default TopNavBar;
