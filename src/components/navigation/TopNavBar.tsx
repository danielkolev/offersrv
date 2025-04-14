
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import NavbarUtilities from './NavbarUtilities';
import MobileNavToggle from './MobileNavToggle';

const TopNavBar = () => {
  const location = useLocation();
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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-all duration-100",
        scrolled ? "shadow-sm" : ""
      )}
    >
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-4 w-full justify-between md:justify-start">
          <div className="md:hidden">
            <MobileNavToggle 
              isMobileMenuOpen={isMobileMenuOpen} 
              setIsMobileMenuOpen={setIsMobileMenuOpen} 
            />
          </div>
          <Logo />
          <div className="hidden md:flex md:flex-1 md:justify-end">
            <NavbarUtilities 
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
