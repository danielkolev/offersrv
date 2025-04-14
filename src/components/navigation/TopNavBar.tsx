
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, X, LogOut, User, Settings, Home, BarChart2, Building, FileEdit } from 'lucide-react';
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

  const navLinks = [
    { href: '/', label: t.navigation.home, icon: <Home className="h-4 w-4 mr-2" /> },
    { href: '/new-offer', label: t.navigation.newOffer, icon: <FileEdit className="h-4 w-4 mr-2" /> },
    { href: '/companies', label: t.navigation.companies, icon: <Building className="h-4 w-4 mr-2" /> },
    { href: '/analytics', label: t.navigation.analytics, icon: <BarChart2 className="h-4 w-4 mr-2" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 ml-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
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

          {/* Mobile Menu */}
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
            <SheetContent side="left" className="pr-0">
              <div className="px-7">
                <Link to="/" className="flex items-center gap-2 mb-6">
                  <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
                  <span className="font-bold text-xl">OfferFlow</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4 px-7">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "flex items-center py-2 text-base font-medium transition-colors hover:text-primary",
                      isActive(link.href)
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
                <div className="h-px bg-border my-4" />
                {user ? (
                  <>
                    <div className="flex items-center gap-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ''} />
                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium truncate max-w-[200px]">
                          {user.user_metadata?.full_name || user.email}
                        </span>
                        <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {user.email}
                        </span>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center py-2 text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {t.navigation.profile}
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center py-2 text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {t.navigation.settings}
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center py-2 text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t.auth.signOut}
                    </button>
                  </>
                ) : (
                  <Button asChild variant="default" className="w-full">
                    <Link to="/login">{t.auth.signIn}</Link>
                  </Button>
                )}
                <div className="h-px bg-border my-4" />
                {/* Language switcher in mobile menu */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t.common.language}</span>
                  <LanguageSwitcher />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
