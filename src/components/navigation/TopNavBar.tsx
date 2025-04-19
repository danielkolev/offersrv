
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import NavbarUtilities from './NavbarUtilities';
import { SidebarTrigger } from '@/components/ui/sidebar';

const TopNavBar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-all duration-100",
        scrolled ? "shadow-sm" : ""
      )}
    >
      <div className="container flex h-14 items-center gap-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Logo />
        </div>
        <div className="flex-1 flex justify-end">
          <NavbarUtilities 
            isMobileMenuOpen={isMobileMenuOpen} 
            setIsMobileMenuOpen={setIsMobileMenuOpen} 
          />
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
